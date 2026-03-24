"use client";

import React, { useState } from "react";
import { DropDownIcon } from "../../../../public/Icons";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  leadingIcon?: React.ReactNode;
};

export default function AccountSelectField({
  label,
  value,
  options,
  onChange,
  leadingIcon,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const active = value.length > 0 || isFocused;

  return (
    <div className="relative flex h-14 items-end border border-border-primary bg-bg-base px-3 pb-2.5 pt-2 transition-colors hover:bg-bg-surface">
      <label
        className={[
          "pointer-events-none absolute text-text-secondary transition-all duration-300",
          leadingIcon ? "left-9" : "left-3",
          active
            ? "top-2 font-XS-600"
            : "top-1/2 -translate-y-1/2 font-M-500",
        ].join(" ")}
      >
        {label}
      </label>

      {leadingIcon ? (
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
          {leadingIcon}
        </div>
      ) : null}

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={[
          "absolute bottom-2.5 bg-transparent font-M-500 text-text-primary outline-none appearance-none",
          leadingIcon ? "left-9 right-9" : "left-3 right-9",
        ].join(" ")}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <DropDownIcon className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-text-secondary" />
    </div>
  );
}