import Sidebar from "@/components/Sidebar";
import { createCustomerIfNull, hasSubscription } from "@/libs/stripe";
import { calculateDaysDifference } from "@/libs/utils";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const stripeCustomerId = await createCustomerIfNull();
  const hasSub = await hasSubscription("" + stripeCustomerId);
  const session = await auth();
  if (session.user.trialClaimed === false) {
    // @ts-ignore
    const days = calculateDaysDifference(session.user.createdAt);
    if (days > 7) {
      await db.user.update({
        where: {
          id: session?.user?.id,
        },
        data: {
          trialClaimed: true,
        },
      });
      session.user.trialClaimed = true;
    }
  }

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <Sidebar hasSub={hasSub} trialClaimed={session.user.trialClaimed} />
      <div className="flex h-full flex-1 justify-center overflow-auto px-5 py-10 lg:py-16">
        {children}
      </div>
    </div>
  );
};

export default layout;
