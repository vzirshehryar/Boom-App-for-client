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
  return subscriptions.data.length > 0;
}

export async function createCheckoutLink(
  customer: string,
  trialClaimed: boolean,
) {
  const trialAllowed = env.STRIPE_ALLOW_TRIAL === "true";
  const trialDays = Number(env.STRIPE_TRIAL_DAYS || 7);

  let subscriptionData: any = {};
  if (trialAllowed && !trialClaimed) {
    subscriptionData["trial_period_days"] = trialDays;
    subscriptionData["trial_settings"] = {
      end_behavior: {
        missing_payment_method: "cancel",
      },
    };
  }

  const checkout = await stripe.checkout.sessions.create({
    success_url: env.NEXTAUTH_URL + "/dashboard/subscription?success=true",
    cancel_url: env.NEXTAUTH_URL + "/dashboard/subscription?canceled=true",
    customer: customer,
    line_items: [
      {
        price: env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],

    subscription_data: subscriptionData,
    payment_method_collection: "if_required",
    mode: "subscription",
  });

  return checkout.url;
}

export async function generateCustomerPortalLink(customerId: string) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: env.NEXTAUTH_URL + "/dashboard/subscription",
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
