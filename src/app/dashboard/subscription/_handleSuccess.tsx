"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Success = ({ user }) => {
  const params = useSearchParams();
  const successParam = params.get("success");

  useEffect(() => {
    const updateUser = async () => {
      const data = {
        trialClaimed: true,
      };

      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    };

    if (
      successParam &&
      successParam === "true" &&
      user.trialClaimed === false
    ) {
      updateUser();
    }
  });

  return null;
};

export default Success;
