// src/app/components/atoms/IconButton.tsx
import React from "react";

type Props = {
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function IconButton({ label, onClick, children }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="h-12 w-12 border border-black/40 bg-white grid place-items-center hover:bg-black/[0.03]"
    >
      <span className="sr-only">{label}</span>
      {children}
    </button>
  );
}