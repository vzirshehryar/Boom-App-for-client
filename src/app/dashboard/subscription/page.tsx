import React from "react";
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/libs/stripe";
import Link from "next/link";
import { auth } from "@/server/auth";
import { calculateDaysDifference } from "@/libs/utils";

const Page = async () => {
  const session = await auth();
  const stripeCustomerId = await createCustomerIfNull();
  const hasSub = await hasSubscription("" + stripeCustomerId);
  const manageLink = await generateCustomerPortalLink("" + stripeCustomerId);
  // @ts-ignore
  const days = calculateDaysDifference(session.user.createdAt);
  const checkoutLinkSolo = await createCheckoutLink(
    "" + stripeCustomerId,
    "solo",
    session?.user?.id,
  );
  const checkoutLinkFreelance = await createCheckoutLink(
    "" + stripeCustomerId,
    "freelancer",
    session?.user?.id,
  );
  const checkoutLinkAgency = await createCheckoutLink(
    "" + stripeCustomerId,
    "agency",
    session?.user?.id,
  );

  return (
    <div>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="px-4 text-center">
          {hasSub !== "inactive" ? (
            <>
              <h2 className="text-center">Thank you for Subscribing</h2>

              <h6 className="mt-11 text-slate-300 ">
                Thank you for subscribing to our app. Please feel free to manage
                your subscription or jump to the dashboard. If you want a
                refund, please email us with your registered email address.
              </h6>
              <Link
                className="mx-auto mt-10 flex w-max rounded-xl bg-primary px-10 py-3 text-white"
                href={"" + manageLink}
              >
                Manage subscription
              </Link>
            </>
          ) : (
            <>
              <h2 className="text-center">
                {session?.user?.trialClaimed
                  ? "Your Trial is Over"
                  : "Thank you for signing up"}
              </h2>
              <h6 className="mt-11 text-slate-300 ">
                {session?.user?.trialClaimed
                  ? "To continue using our app, please subscribe to our plan. You can cancel anytime."
                  : "Your One week trial has started. Enjoy the app. Your trial will end in " +
                    (7 - days) +
                    " days."}
              </h6>
              <div className="mx-auto mt-10 flex flex-wrap justify-center gap-5">
                <Link
                  className="flex w-max rounded-xl bg-primary px-10 py-3 text-white"
                  href={"" + checkoutLinkSolo}
                >
                  Subscribe for Solo Plan
                </Link>{" "}
                <Link
                  className="flex w-max rounded-xl bg-primary px-10 py-3 text-white"
                  href={"" + checkoutLinkFreelance}
                >
                  Subscribe for Freelancer Plan
                </Link>{" "}
                <Link
                  className="flex w-max rounded-xl bg-primary px-10 py-3 text-white"
                  href={"" + checkoutLinkAgency}
                >
                  Subscribe for Agency Plan
                </Link>{" "}
              </div>
              <Link
                href={"https://penpulseai.com"}
                className="mt-10 text-blue-400 underline"
              >
                Learn more about the Subscription Plans
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
