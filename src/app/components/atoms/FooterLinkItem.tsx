"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label: string;
  href?: string;
  className?: string;
};

const policyPages = [
  "/refund-policy",
  "/privacy-policy",
  "/shipping-policy",
  "/terms-of-services",
  "/cookie-preferences",
  "/contact-information",
];

export default function FooterLinkItem({
  label,
  href = "#",
  className = "",
}: Props) {
  const pathname = usePathname();
  const isPolicyPage = policyPages.includes(pathname);

  return (
    <Link
      href={href}
      className={[
        "font-XS-500 hover:underline transition-colors duration-300",
        isPolicyPage ? "text-text-primary" : "text-text-secondary",
        className,
      ].join(" ")}
    >
      {label}
    </Link>
  );
}