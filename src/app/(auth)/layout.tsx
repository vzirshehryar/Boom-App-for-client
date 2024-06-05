import React from "react";
import { Suspense } from "react";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-secondary p-10">
          {children}
        </div>
      </div>
    </Suspense>
  );
};

export default layout;
