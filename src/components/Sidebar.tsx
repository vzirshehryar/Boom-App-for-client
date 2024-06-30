"use client";
import { navLinks, settingsLinks } from "@/libs/config";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import toast from "./toast";

const Sidebar = ({
  hasSub,
  trialClaimed,
}: {
  hasSub: string;
  trialClaimed: boolean;
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (hasSub === "inactive" && trialClaimed === true) {
    if (!pathname.includes("/subscription")) {
      redirect("/dashboard/subscription");
    }
  }

  return (
    <div
      className={`relative justify-between bg-secondary transition-all  max-lg:flex max-lg:items-start max-lg:overflow-hidden max-lg:px-5 lg:h-full lg:w-80 lg:py-8
    ${isOpen ? `h-[400px]` : "max-lg:h-[80px]"}
    `}
    >
      <div className="flex w-full justify-between max-lg:pt-5 lg:mx-auto lg:w-max">
        <h3 className="text-center ">PenPulse AI</h3>
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-foreground "
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
      <div
        className="max-lg: top-0 mt-20 px-6 max-lg:absolute max-lg:left-0 max-lg:w-full max-lg:border-t max-lg:bg-secondary max-lg:py-5"
        ref={dropdownRef}
      >
        <h6 className="font-extrabold">📝 Contents</h6>
        <ul className="relative mt-3 before:absolute before:left-2 before:h-full before:w-px before:bg-muted  ">
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className={`relative pl-5  transition-colors before:absolute before:left-2 before:h-full before:w-px before:bg-foreground  before:transition-colors hover:before:opacity-100
                ${pathname === link.href ? "text-primary before:opacity-100" : "text-muted before:opacity-0 hover:text-foreground"}
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <h6 className="mt-10 font-extrabold">⚙️ Settings</h6>
        <ul className="relative mt-3 before:absolute before:left-2 before:h-full before:w-px before:bg-muted  ">
          {settingsLinks.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className={`relative pl-5  transition-colors before:absolute before:left-2 before:h-full before:w-px before:bg-foreground  before:transition-colors  hover:before:opacity-100
                ${pathname === link.href ? "text-primary before:opacity-100" : "text-muted before:opacity-0 hover:text-foreground"}
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("again");
                signOut({ callbackUrl: "/" });
              }}
              className={`relative pl-5  text-muted transition-colors before:absolute before:left-2 before:h-full before:w-px  before:bg-foreground before:opacity-0 before:transition-colors hover:text-foreground  hover:before:opacity-100`}
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
