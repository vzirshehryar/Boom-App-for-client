import HistoryItem from "@/components/HistoryItem";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import React from "react";

const Page = async () => {
  const session = await auth();
  const history = await db.history.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="w-full max-w-5xl ">
      <h3>Recently Generated Blogs</h3>
      <div className="mt-10 w-full space-y-5">
        {history.map((h) => (
          <HistoryItem key={h.id} history={h} />
        ))}
      </div>
    </div>
  );
};

export default Page;
