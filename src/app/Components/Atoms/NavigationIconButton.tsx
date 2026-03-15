import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function IconButton({
  label,
  children,
  onClick,
  className = "",
}: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={[
        " flex items-center justify-center hover:cursor-pointer",
        "text-text-primary hover:text-text-secondary transition-colors duration-300",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}