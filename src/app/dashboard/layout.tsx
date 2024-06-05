import Sidebar from "@/components/Sidebar";
import { createCustomerIfNull, hasSubscription } from "@/libs/stripe";
import { auth } from "@/server/auth";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const stripeCustomerId = await createCustomerIfNull();
  const hasSub = await hasSubscription("" + stripeCustomerId);

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <Sidebar hasSub={hasSub} />
      <div className="flex h-full flex-1 justify-center overflow-auto px-5 py-10 lg:py-16">
        {children}
      </div>
    </div>
  );
};

export default layout;
