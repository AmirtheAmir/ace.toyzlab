import { DropDownIcon } from "../../../../public/Icons";

type Props = {
  label: string;
  active?: boolean; // dropdown open
  hasDropdown?: boolean;
  exclusive?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function NavButton({
  label,
  active = false,
  hasDropdown = false,
  exclusive = false,
  onClick,
  className = "",
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        " border bg-bg-base border-none ringed-navbutton ",
        "flex hover:cursor-pointer select-none items-center gap-2",
        "font-S-500 text-text-primary",
          exclusive ? "hover:bg-brand-primary transition-colors duration-300 ease-in" : "",
        hasDropdown ? "py-4 pl-6 pr-4" : "py-4 px-6",
        active
          ? "underline underline-offset-4"
          : "hover:underline hover:underline-offset-4",
        className,
      ].join(" ")}
    >
      <span>{label}</span>
      {hasDropdown && (
        <DropDownIcon
          className={[
            "transition-transform duration-300 ease-in",
            active ? "-rotate-180" : "rotate-0",
          ].join(" ")}
        />
      )}
    </button>
  );
}
