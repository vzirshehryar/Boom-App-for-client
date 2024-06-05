import Wordpress from "@/components/Wordpress";
import { auth } from "@/server/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  return (
    <div className="w-full max-w-4xl">
      <h3>Add Wordpress Website</h3>
      <div className=" mt-10 pb-20 ">
        <Wordpress user={session?.user} />
      </div>
    </div>
  );
};

export default page;
