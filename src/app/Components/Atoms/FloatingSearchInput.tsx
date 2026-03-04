// src/app/components/atoms/FloatingSearchInput.tsx
import React from "react";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

export default function FloatingSearchInput({ label, value, onChange }: Props) {
  const active = value.length > 0;

  return (
    <div className="relative border border-black/30 bg-white h-12 px-3 flex items-center">
      <label
        className={[
          "absolute left-3 transition-all duration-150 pointer-events-none",
          active
            ? "top-1 text-[10px] text-black/50"
            : "top-1/2 -translate-y-1/2 text-[13px] text-black/40",
        ].join(" ")}
      >
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "w-full bg-transparent outline-none text-[13px] text-black/80",
          active ? "pt-3" : "",
        ].join(" ")}
      />
    </div>
  );
}