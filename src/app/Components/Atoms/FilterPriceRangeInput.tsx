"use client";

import React from "react";

type Props = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export default function NumberFilterInput({
  placeholder,
  value,
  onChange,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numbersOnly = e.target.value.replace(/\D/g, "");
    onChange(numbersOnly);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="
        w-full bg-bg-surface px-5 text-center py-3 outline-none
        font-S-500 text-text-primary placeholder:text-text-secondary
        [appearance:textfield]
        [&::-webkit-inner-spin-button]:appearance-none
        [&::-webkit-outer-spin-button]:appearance-none
      "
    />
  );
}