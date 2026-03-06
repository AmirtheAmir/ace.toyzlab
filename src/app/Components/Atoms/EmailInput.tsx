import React from "react";
import { RightArrowIcon } from "../../../../public/Icons";
type Props = {
  placeholder?: string;
  className?: string;
};

export default function EmailInput({
  placeholder = "Email",
  className = "",
}: Props) {
  return (
    <div
      className={[
        "flex items-center justify-between",
        "w-104 ",
        "border border-border-primary",
        "p-3.5",
        className,
      ].join(" ")}
    >
      <input
        type="email"
        placeholder={placeholder}
        className="
          w-full bg-transparent outline-none
          font-M-500 text-text-primary
          placeholder:text-text-secondary
        "
      />

      <span className="text-text-secondary "><RightArrowIcon /></span>
    </div>
  );
}