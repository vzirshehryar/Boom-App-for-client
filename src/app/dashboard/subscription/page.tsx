import React from "react";
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from "@/libs/stripe";
import Link from "next/link";
import { auth } from "@/server/auth";
import Success from "./_handleSuccess";

const Page = async () => {
  const session = await auth();
    const stripeCustomerId = await createCustomerIfNull();
  const hasSub = await hasSubscription("" + stripeCustomerId);
  const manageLink = await generateCustomerPortalLink("" + stripeCustomerId);
  const checkoutLink = await createCheckoutLink(
    "" + stripeCustomerId,
    session?.user?.trialClaimed,
  );

  return (
    <div>
      <Success user={session?.user} />
      <div className="flex h-full flex-col items-center justify-center">
        <div className="px-4 text-center lg:w-1/2">
          {hasSub ? (
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
                  : "To continue using our app, please subscribe to our plan. We offer a one week  You can cancel anytime."}
              </h6>
              <Link
                className="mx-auto mt-10 flex w-max rounded-xl bg-primary px-10 py-3 text-white"
                href={"" + checkoutLink}
              >
                Subscribe Now
              </Link>{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
