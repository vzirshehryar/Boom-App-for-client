"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "@/components/toast";
import Input from "@/components/Input";
import Link from "next/link";
import SocialLogin from "@/components/SocialLogin";
import { Icons } from "@/components/Icons";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
const Page = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(8, {
      message: "At least 8 characters long",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const response = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (response?.status !== 200) {
      await toast({
        title: response?.error ?? "",
        icon: "error",
      });
    } else {
      // redirect to response.url
      router.push("/dashboard");
    }
    setIsLoading(false);
  }
  const searchParams = useSearchParams();

  useEffect(() => {
    const callbackError = searchParams?.get("error");

    if (callbackError === "OAuthAccountNotLinked") {
      toast({
        title: "whoops, there may already be an account with that email",
        icon: "error",
      });
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [searchParams]);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Boom</h1>
      <p className="my-5 text-center text-xl">Login to your account</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2 ">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      id="password"
                      placeholder="At least 8 character"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              type="submit"
              className="!mt-5  flex w-full items-center justify-center gap-4 rounded-xl bg-primary px-10 py-3 text-white"
            >
              {isLoading && (
                <Icons.spinner className="h-6 w-6 animate-spin stroke-white transition-colors duration-500" />
              )}{" "}
              Login
            </button>

            <SocialLogin isLoading={isLoading} />

            <p className="flex items-center justify-center gap-2 text-center font-jakarta_sans text-sm font-medium leading-[24px] ">
              Don&apos;t have an account?
              <Link href="/register" className="text-primary">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
