"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Icons } from "./Icons";

const SocialLogin = ({ isLoading }: { isLoading?: boolean }) => {
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const disabled = isGoogleLoading || isGitHubLoading || isLoading;
  return (
    <div>
      <button
        onClick={ async() => {
          setIsGoogleLoading(true);
          await signIn("google");
        }}
        disabled={disabled}
        className="group mx-auto !mt-5 flex items-center gap-4 rounded-xl  bg-primary  text-white pr-5 overflow-hidden "
      >
        <span className=" p-3 bg-white">
          {isGoogleLoading ? (
            <Icons.spinner className="h-6 w-6 animate-spin transition-colors duration-500 group-hover:stroke-white" />
          ) : (
            <Icons.google />
          )}{" "}
        </span>
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
