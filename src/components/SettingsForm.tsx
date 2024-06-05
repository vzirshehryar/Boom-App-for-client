"use client";
import React, { useState } from "react";
import Input from "./Input";
import toast from "./toast";
import { Icons } from "./Icons";
import { Eye, EyeOff } from "lucide-react";

const SettingsForm = ({ user }: { user: any }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setShow] = useState({
    openaiApiKey: false,
    wpPassword: false,
  });
  const [formData, setFormData] = useState({
    openaiApiKey: user.openaiApiKey,
    niche: user.niche,
    country: user.country,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.openaiApiKey === "" ||
      formData.openaiApiKey === null ||
      formData.openaiApiKey === undefined
    ) {
      toast({
        title: "OpenAI API key is required",
        icon: "error",
      });
      return;
    }
    setIsLoading(true);

    const response = await fetch("/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const resData = await response.json();

    if (response.status === 201) {
      toast({
        title: resData.msg,
      });
    } else {
      toast({
        title: resData.msg,
        icon: "error",
      });
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-x-10 max-lg:flex-col">
        {/* Left Content */}
        <div className="flex-shrink-0 text-sm  lg:w-32 lg:text-end">
          <label htmlFor="email" className="text-muted">
            Your Email
          </label>
        </div>
        {/* End Left Content */}
        {/* Icon */}
        <div className=" relative after:absolute after:bottom-0 after:start-3.5 after:top-7 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 last:after:hidden max-lg:hidden dark:after:bg-gray-700">
          <div className="relative z-10 flex size-7 items-center justify-center">
            <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600" />
          </div>
        </div>
        {/* End Icon */}
        {/* Right Content */}
        <div className=" grow pb-8 pt-0.5 max-lg:mt-2">
          <div className="flex-1 lg:max-w-[600px]">
            <Input
              type="text"
              disabled
              placeholder="Enter your email address"
              value={user.email}
            />
          </div>
        </div>
        {/* End Right Content */}
      </div>
      <div className="flex gap-x-10 max-lg:flex-col">
        {/* Left Content */}
        <div className="flex-shrink-0 text-sm  lg:w-32 lg:text-end  ">
          <label htmlFor="email" className="text-muted">
            OpenAI API Key *
          </label>
        </div>
        {/* End Left Content */}
        {/* Icon */}
        <div className="relative after:absolute after:bottom-0 after:start-3.5 after:top-7 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 last:after:hidden max-lg:hidden dark:after:bg-gray-700">
          <div className="relative z-10 flex size-7 items-center justify-center">
            <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600" />
          </div>
        </div>
        {/* End Icon */}
        {/* Right Content */}
        <div className="grow pb-8 pt-0.5 max-lg:mt-2">
          <div className="flex-1 lg:max-w-[600px]">
            <div className="relative">
              <Input
                type={show.openaiApiKey ? "text" : "password"}
                name="openaiApiKey"
                placeholder="Enter your openai api key"
                value={formData.openaiApiKey || ""}
                onChange={onChange}
              />
              <button
                type="button"
                onClick={() =>
                  setShow({ ...show, openaiApiKey: !show.openaiApiKey })
                }
                className="absolute right-0 top-1/2 h-full -translate-y-1/2 transform px-2"
              >
                {show.openaiApiKey ? <EyeOff /> : <Eye />}
              </button>
            </div>
            <p className=" text flex-wrap pt-5 text-xs text-yellow-600">
              Note: We encrypt your API key before it's stored, so nobody, not
              even we can know what your API key is. Moreover, your API is
              secured by RLS policies, so nobody can get the hashed version and
              try to decrypt it.
            </p>
          </div>
        </div>
        {/* End Right Content */}
      </div>
      <div className="flex gap-x-10 max-lg:flex-col">
        {/* Left Content */}
        <div className="flex-shrink-0 text-sm  lg:w-32 lg:text-end  ">
          <label htmlFor="email" className="text-muted">
            Niche
          </label>
        </div>
        {/* End Left Content */}
        {/* Icon */}
        <div className="relative after:absolute after:bottom-0 after:start-3.5 after:top-7 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 last:after:hidden max-lg:hidden dark:after:bg-gray-700">
          <div className="relative z-10 flex size-7 items-center justify-center">
            <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600" />
          </div>
        </div>
        {/* End Icon */}
        {/* Right Content */}
        <div className="grow pb-8 pt-0.5 max-lg:mt-2">
          <div className="flex-1 lg:max-w-[600px]">
            <Input
              type="text"
              placeholder="Enter your blog niche"
              value={formData.niche || ""}
              onChange={onChange}
              name="niche"
            />
          </div>
        </div>
        {/* End Right Content */}
      </div>
      <div className="flex gap-x-10 max-lg:flex-col">
        {/* Left Content */}
        <div className="flex-shrink-0 text-sm  lg:w-32 lg:text-end  ">
          <label htmlFor="email" className="text-muted">
            Target Country
          </label>
        </div>
        {/* End Left Content */}
        {/* Icon */}
        <div className="relative after:absolute after:bottom-0 after:start-3.5 after:top-7 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 last:after:hidden max-lg:hidden dark:after:bg-gray-700">
          <div className="relative z-10 flex size-7 items-center justify-center">
            <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600" />
          </div>
        </div>
        {/* End Icon */}
        {/* Right Content */}
        <div className="grow pb-8 pt-0.5 max-lg:mt-2">
          <div className="flex-1 lg:max-w-[600px]">
            <Input
              type="text"
              placeholder="Enter your target country"
              value={formData.country || ""}
              onChange={onChange}
              name="country"
            />
          </div>
        </div>
        {/* End Right Content */}
      </div>

      <div className="mt-10 ">
        <button
          type="submit"
          className="mx-auto flex items-center gap-4 rounded-xl bg-primary px-10 py-3 text-white"
          disabled={isLoading}
        >
          {isLoading && (
            <Icons.spinner className="h-6 w-6 animate-spin stroke-white transition-colors duration-500" />
          )}{" "}
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
