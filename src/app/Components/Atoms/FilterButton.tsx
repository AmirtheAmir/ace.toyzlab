"use client";

import React from "react";
import { DropDownIcon } from "../../../../public/Icons";

type Props = {
  label: string;
  isOpen: boolean;
  onClick: () => void;
};

export default function FilterSelectButton({
  label,
  isOpen,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex select-none hover:cursor-pointer items-center gap-2 ring ring-border-primary bg-bg-base py-3 pl-5 pr-3 font-S-500 text-text-primary"
    >
      <span>{label}</span>
      <DropDownIcon
        className={[
          "transition-transform duration-300",
          isOpen ? "rotate-180" : "",
        ].join(" ")}
      />
    </button>
  );
}