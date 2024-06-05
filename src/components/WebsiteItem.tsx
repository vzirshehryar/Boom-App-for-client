"use client";
import { Trash } from "lucide-react";
import React from "react";
import toast from "./toast";

const WebsiteItem = ({ website }: any) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/wordpress`, {
        method: "DELETE",
        body: JSON.stringify({ id: website.id }),
      });

      if (res.ok) {
        toast({
          title: "Website Deleted",
        });
        document.getElementById(website.id)?.remove();
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      toast({
        title: error.message,
        icon: "error",
      });
    }
  };

  return (
    <div
      className="relative flex w-full flex-col items-center justify-between gap-3 rounded-lg bg-secondary p-5 lg:flex-row"
      id={website.id}
    >
      <h5>{website.websiteName}</h5>
      <div className=" flex h-full items-center justify-center gap-5 bg-secondary px-5">
        {/* <Link
          href={`/dashboard/blog?id=${website.id}`}
          className="rounded-md bg-border p-1"
          title="Reuse"
        >
          <Redo size={24} />
        </Link> */}
        <button
          className="rounded-md bg-border p-1"
          title="Delete"
          onClick={handleDelete}
        >
          <Trash size={24} />
        </button>
      </div>
    </div>
  );
};

export default WebsiteItem;
