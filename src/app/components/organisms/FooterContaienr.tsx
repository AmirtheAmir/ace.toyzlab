"use client";

import React from "react";
import FooterPolicyLinks from "../molecules/FooterPolicyLinks";
import { usePathname } from "next/navigation";

export default function FooterContaienr() {
  const pathname = usePathname();

  const isPolicyPage =
    pathname.includes("policy") ||
    pathname.includes("contact") ||
    pathname.includes("terms") ||
    pathname.includes("cookie");

  return (
    <footer
      className={[
        "w-full py-4 sm:py-6 mt-6 border-t",
        isPolicyPage ? "border-border-primary" : "border-border-secondary",
      ].join(" ")}
    >
      <div className="flex items-center justify-center w-full mx-auto">
        <FooterPolicyLinks />
      </div>
    </footer>
  );
}
