import Stripe from "stripe";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { env } from "@/env";

export const stripe = new Stripe(String(env.STRIPE_SECRET_KEY), {
  apiVersion: "2023-10-16",
});

export async function hasSubscription(customer: string) {
  const subscriptions = await stripe.subscriptions.list({
    customer: customer,
  });
  return subscriptions.data.length > 0
    ? subscriptions.data[0].status
    : "inactive";
}

export async function createCheckoutLink(
  customer: string,
  trialClaimed: boolean,
  plan: "solo" | "freelancer" | "agency",
  userId: string,
) {
  const trialAllowed = env.STRIPE_ALLOW_TRIAL === "true";
  const trialDays = Number(env.STRIPE_TRIAL_DAYS || 7);

  let subscriptionData: any = {};
  if (trialAllowed && !trialClaimed && plan === "solo") {
    subscriptionData["trial_period_days"] = trialDays;
    subscriptionData["trial_settings"] = {
      end_behavior: {
        missing_payment_method: "cancel",
      },
    };
  }

  const return_url =
    env.NEXTAUTH_URL[5] === "/"
      ? env.NEXTAUTH_URL
      : "https://" + env.NEXTAUTH_URL;

  let priceId: string;
  switch (plan) {
    case "solo":
      priceId = env.STRIPE_PRICE_ID_SOLO_PLAN; // Replace with your Basic plan price ID
      break;
    case "freelancer":
      priceId = env.STRIPE_PRICE_ID_FREELANCE_PLAN; // Replace with your Standard plan price ID
      break;
    case "agency":
      priceId = env.STRIPE_PRICE_ID_AGENCY_PLAN; // Replace with your Premium plan price ID
      break;
    default:
      priceId = env.STRIPE_PRICE_ID_SOLO_PLAN; // Replace with your Basic plan price ID
  }

  const checkout = await stripe.checkout.sessions.create({
    success_url: return_url + "/dashboard/subscription?success=true",
    cancel_url: return_url + "/dashboard/subscription?canceled=true",
    customer: customer,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      plan: plan,
      user_id: userId,
    },
    subscription_data: subscriptionData,
    payment_method_collection: "if_required",
    mode: "subscription",
  });

  return checkout.url;
}

export async function generateCustomerPortalLink(customerId: string) {
  try {
    const return_url =
      env.NEXTAUTH_URL[5] === "/"
        ? env.NEXTAUTH_URL
        : "https://" + env.NEXTAUTH_URL;
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: return_url + "/dashboard/subscription",
    });

    return portalSession.url;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function createCustomerIfNull() {
  const session = await auth();

  if (!session?.user?.stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: String(session?.user?.email),
    });

    await db.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        stripeCustomerId: customer.id,
      },
    });

    return customer.id;
  }
  return session?.user?.stripeCustomerId;
}
