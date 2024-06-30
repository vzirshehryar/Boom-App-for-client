"use client";
import { Redo, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "./toast";

const HistoryItem = ({ history }: any) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const again = localStorage.getItem("again");
    if (again !== "true") {
      setShowModal(true);
      localStorage.setItem("again", "true");
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

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
    <>
      <Modal show={showModal} handleClose={handleClose} />
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
    </>
  );
};

export default HistoryItem;

function Modal({ show, handleClose }) {
  const showHideClassName = show ? "flex" : "hidden";

  return (
    <div
      className={`fixed left-0 top-0 z-20 h-screen w-screen overflow-hidden bg-[#00000040] ${showHideClassName} items-center justify-center`}
    >
      <section className="flex h-[400px] w-[400px] flex-col border-[1px] border-[#888] bg-[#fefefe] px-5 py-4 text-black">
        <div className="flex h-[80%] flex-col items-center justify-center">
          <h2 className="text-black">Welcome!</h2>
          <p className="text-black">You are on your Trial Period</p>
        </div>
        <button
          onClick={handleClose}
          className="w-full rounded-md bg-primary p-2 text-white"
        >
          Okay
        </button>
      </section>
    </div>
  );
}
