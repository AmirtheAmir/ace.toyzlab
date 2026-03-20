"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navigation from "@/app/components/organisms/Navigation";
import FooterContaienr from "@/app/components/organisms/FooterContaienr";

type Props = {
  children: React.ReactNode;
};

const POLICY_PATHS = [
  "/refund-policy",
  "/privacy-policy",
  "/shipping-policy",
  "/terms-of-services",
  "/cookie-preferences",
  "/contact-information",
];

export default function AppShell({ children }: Props) {
  const pathname = usePathname();

  const isPolicyPage = POLICY_PATHS.includes(pathname);

  return (
    <main
      className={[
        "w-full flex justify-center",
        isPolicyPage ? "bg-brand-primary" : "bg-bg-base",
      ].join(" ")}
    >
      <div className="max-w-7xl  w-full min-h-screen flex flex-col gap-2">
        <Navigation />
        <div className="flex-1">{children}</div>
        <FooterContaienr />
      </div>
    </main>
  );
}
