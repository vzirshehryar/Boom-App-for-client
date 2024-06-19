"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [verifying, setVerifying] = useState<boolean>(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    const verifyEmail = async (token: string) => {
      const res = await fetch(`/api/auth/verify-email?token=${token}`);
      if (res.status === 201) {
        redirect("/login");
      }
      setVerifying(false);
    };
    if (token) {
      verifyEmail(token);
    }
  }, []);

  return verifying ? (
    <div>Verifying...</div>
  ) : (
    <div>Email Verification Failed</div>
  );
};

export default page;
