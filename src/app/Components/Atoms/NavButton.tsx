// src/app/components/atoms/NavButton.tsx
import React from "react";
import { DropDownIcon } from "../../../../public/Icons";

type Props = {
  label: string;
  active?: boolean; // dropdown open
  hasDropdown?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function NavButton({
  label,
  active = false,
  hasDropdown = false,
  onClick,
  className = "",
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-12 px-5 border border-black/40 bg-white",
        "flex items-center gap-2",
        "text-[13px] tracking-[0.02em] text-black/80",
        active ? "underline underline-offset-4" : "hover:underline hover:underline-offset-4",
        className,
      ].join(" ")}
    >
      <span>{label}</span>

      {hasDropdown && (
        <DropDownIcon
          className={[
            "w-3.5 h-3.5 transition-transform duration-200",
            active ? "rotate-180" : "rotate-0",
          ].join(" ")}
        />
      )}
    </button>
  );
}