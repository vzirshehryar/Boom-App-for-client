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

  const formSchema = z
    .object({
      email: z.string().email({
        message: "Please enter a valid email address",
      }),
      password: z.string().min(8, {
        message: "At least 8 characters long",
      }),
      confirmPassword: z.string().optional(),
      website: z.string().optional(),
      company: z.string().optional(),
    })
    .refine(
      (values) => {
        return values.password === values.confirmPassword;
      },
      {
        message: "Passwords must match!",
        path: ["confirmPassword"],
      },
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      website: "",
      company: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // register user send post request to /api/auth/register
    const data = {
      email: values.email,
      password: values.password,
      website: values.website,
      company: values.company,
    };

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData: CustomResponse = await response.json();

    if (response.status === 201) {
      await toast({
        title: resData.msg,
      });
      form.reset();
      await signIn("credentials", {
        email: values.email,
        password: values.password,
      });
    } else {
      await toast({
        title: resData.msg,
        icon: "error",
      });
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
      <p className="my-5 text-center text-xl">Sign up for an account</p>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      id="website"
                      placeholder="Website"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      id="company"
                      placeholder="Company's Name"
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
              Sign up
            </button>

            <SocialLogin isLoading={isLoading} />

            <p className="flex items-center justify-center gap-2 text-center font-jakarta_sans text-sm font-medium leading-[24px] ">
              Already have an account?
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
