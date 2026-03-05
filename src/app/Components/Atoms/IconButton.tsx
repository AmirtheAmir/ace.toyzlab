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
      className=" hover:cursor-pointer"
    >
      <span className="sr-only">{label}</span>
      {children}
    </button>
  );
}