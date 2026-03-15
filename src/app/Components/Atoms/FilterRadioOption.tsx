"use client";

import React from "react";
import { RadioCheckedIcon, RadioUncheckedIcon } from "../../../../public/Icons";

type Props = {
  label: string;
  checked: boolean;
  onClick: () => void;
};

export default function RadioOption({ label, checked, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full hover:cursor-pointer items-center gap-1 text-left"
    >
      {checked ? <RadioCheckedIcon /> : <RadioUncheckedIcon />}

      <span className="font-S-500 text-text-primary">{label}</span>
    </button>
  );
}