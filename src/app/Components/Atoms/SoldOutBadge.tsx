import React from "react";

type SoldOutBadgeProps = {
  className?: string;
};

export default function SoldOutBadge({
  className = "",
}: SoldOutBadgeProps) {
  return (
    <div
      className={[
        "inline-flex items-center justify-center",
        "px-6 py-3",
        "border border-border-secondary",
        "bg-bg-surface",
        "font-S-600 text-brand-primary",
        className,
      ].join(" ")}
    >
      Sold Out
    </div>
  );
}