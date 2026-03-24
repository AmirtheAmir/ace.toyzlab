"use client";

import React, { useState } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  type?: string;
  className?: string;
};

export default function AccountFloatingInput({
  label,
  value,
  onChange,
  autoComplete,
  type = "text",
  className = "",
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const active = value.length > 0 || isFocused;

  return (
    <div
      className={[
        "relative flex h-14 items-end border border-border-primary bg-bg-surface px-3.5 pb-2.5 pt-2 transition-colors hover:bg-bg-hover",
        className,
      ].join(" ")}
    >
      <label
        className={[
          "pointer-events-none absolute left-3 text-text-secondary transition-all duration-300",
          active
            ? "top-2 font-XS-600"
            : "top-1/2 -translate-y-1/2 font-M-500",
        ].join(" ")}
      >
        {label}
      </label>

      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent font-M-500 text-text-primary outline-none"
      />
    </div>
  );
}
