import React from "react";

type Props = {
  label: string;
  href?: string;
  className?: string;
};

export default function FooterLink({
  label,
  href = "#",
  className = "",
}: Props) {
  return (
    <a
      href={href}
      className={[
        "font-XS-500 text-text-secondary",
        "hover:underline",
        "transition-colors duration-300",
        className,
      ].join(" ")}
    >
      {label}
    </a>
  );
}