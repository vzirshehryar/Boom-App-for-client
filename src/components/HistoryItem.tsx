"use client";
import { Redo, Trash } from "lucide-react";
import Link from "next/link";
import toast from "./toast";

const HistoryItem = ({ history }: any) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/history`, {
        method: "DELETE",
        body: JSON.stringify({ id: history.id }),
      });

      if (res.ok) {
        toast({
          title: "History Deleted",
        });
        document.getElementById(history.id)?.remove();
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
      id={history.id}
    >
      <h5>{history.title}</h5>
      <div className=" flex h-full items-center justify-center gap-5 bg-secondary px-5">
        <Link
          href={`/dashboard/blog?id=${history.id}`}
          className="rounded-md bg-border p-1"
          title="Reuse"
        >
          <Redo size={24} />
        </Link>
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

export default HistoryItem;
