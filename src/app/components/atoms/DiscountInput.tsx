"use client";

import React, { FormEvent } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onApply: () => void;
};

export default function DiscountInput({ value, onChange, onApply }: Props) {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onApply();
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-[1fr_6.5rem] ring p-1 ring-border-secondary">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter Discount code or Gift card"
        className="w-full bg-bg-surface px-3 py-1 font-M-500 text-text-primary placeholder:text-text-tertiary outline-none"
      />

      <button
        type="submit"
        className="ring border-border-primary px-7 py-3.5 bg-bg-base font-M-600 text-text-primary transition-colors duration-300 hover:bg-bg-inverted hover:text-text-inverted hover:cursor-pointer"
      >
        Apply
      </button>
    </form>
  );
}

