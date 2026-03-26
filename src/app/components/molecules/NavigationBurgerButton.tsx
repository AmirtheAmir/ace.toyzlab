"use client";

import { MenuIcon } from "../../../../public/Icons";

type Props = {
  active?: boolean;
  onClick?: () => void;
};

export default function NavigationBurgerButton({
  active = false,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open navigation menu"
      className={[
        " bg-bg-base ",
        "flex hover:cursor-pointer select-none items-center gap-2",
        " text-text-primary ring ring-border-primary",
        "py-3.5 px-4",
        active
          ? "underline underline-offset-4 bg-bg-hover"
          : "hover:underline hover:underline-offset-4 hover:bg-bg-hover transition-colors duration-300 ease-in",
      ].join(" ")}
    >
      <MenuIcon className="text-text-primary" />
    </button>
  );
}