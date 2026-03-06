import React from "react";

type Props = {
  label?: string;
  onClick?: () => void;
  className?: string;
};

export default function ViewAllButton({
  label = "View All",
  onClick,
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-9 py-3.5 mx-auto",
        "flex items-center justify-center",
        "bg-brand-primary",
        "hover:ring-1 hover:ring-border-primary",
        "font-M-600 text-text-primary",
        "transition-all duration-300",
        "hover:cursor-pointer",
        className,
      ].join(" ")}
    >
      {label}
    </button>
  );
}