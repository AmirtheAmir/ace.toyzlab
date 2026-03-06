import React from "react";

type ItemTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ItemTitle({
  children,
  className = "",
}: ItemTitleProps) {
  return (
    <h3
      className={[
        "font-XS-500 text-text-primary",
        className,
      ].join(" ")}
    >
      {children}
    </h3>
  );
}