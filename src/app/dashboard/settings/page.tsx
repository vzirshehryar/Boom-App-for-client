import SettingsForm from "@/components/SettingsForm";
import { auth } from "@/server/auth";
import React from "react";

const Page = async () => {
  const session = await auth();
  return (
    <div className="w-full max-w-4xl">
      <h3>App Settings</h3>
      <div className=" mt-10 pb-20 ">
        <SettingsForm user={session?.user} />
      </div>
    </div>
  );
};

export default Page;
