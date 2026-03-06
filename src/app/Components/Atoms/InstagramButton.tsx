import React from "react";
import { InstagramIcon } from "../../../../public/Icons";

type Props = {
  label?: string;
  onClick?: () => void;
  className?: string;
};

export default function InstagramButton({
  label = "Follow us on Instagram",
  onClick,
  className = "",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={[
        "flex items-center gap-3",
        "pl-3.5 pr-6.5 py-3.5",
        "border border-border-primary",
        "font-M-500 text-text-primary",
        "transition-colors duration-300",
        "hover:bg-bg-hover",
        className,
      ].join(" ")}
    >
      <InstagramIcon className="text-text-primary" />
      {label}
    </button>
  );
}
