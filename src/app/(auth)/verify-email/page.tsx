"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [verifying, setVerifying] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    const verifyEmail = async (token: string) => {
      const res = await fetch(`/api/auth/verify-email?token=${token}`);
      if (res.status === 201) {
        setVerifying(1);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else setVerifying(2);
    };
    if (token) {
      verifyEmail(token);
    }
  }, []);

  return verifying === 0 ? (
    <div>Verifying...</div>
  ) : verifying === 1 ? (
    <div className="text-green-500">
      Email Verification Successfull. Redirecting...
    </div>
  ) : (
    <div className="text-red-500">Email Verification Failed</div>
  );
};

export default page;
