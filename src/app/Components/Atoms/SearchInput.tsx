"use client";

import { SearchIcon } from "../../../../public/Icons";
import { useState } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onSearchClick?: () => void;
  onEnterPress?: () => void;
  autoFocus?: boolean;
};

export default function FloatingSearchInput({
  label,
  value,
  onChange,
  onSearchClick = () => {},
  onEnterPress = () => {},
  autoFocus = false,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const active = value.length > 0 || isFocused;

  return (
    <div className="relative h-full w-full caret-text-primary px-3.5 flex items-center justify-between gap-3 ringed-navbutton">
      <div className="relative flex-1 h-full flex items-end">
        <label
          className={[
            "absolute left-0 pointer-events-none text-text-secondary transition-all duration-300",
            active
              ? "top-1.5 font-S-500"
              : "top-1/2 -translate-y-1/2 font-S-500",
          ].join(" ")}
        >
          {label}
        </label>

        <input
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onEnterPress();
            }
          }}
          className="absolute left-0 right-0 bottom-1.5 w-full bg-transparent outline-none font-M-500 text-text-primary caret-text-primary"
        />
      </div>

      <button
        type="button"
        aria-label="Search"
        onClick={onSearchClick}
        className="shrink-0 cursor-pointer text-text-primary transition-colors duration-300 hover:text-text-secondary"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
