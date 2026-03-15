import { DropDownIcon } from "../../../../public/Icons";

type Props = {
  country: string;
  code: string;
  symbol: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function CurrencyNavButton({
  country,
  code,
  symbol,
  active = false,
  onClick,
  className = "",
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "  bg-bg-base border-none select-none hover:cursor-pointer flex justify-center w-57",
        "flex items-center gap-2 ringed-currencynavbutton",
        "font-S-500 text-text-primary",
        "py-4 px-6 ",
        active
          ? "underline underline-offset-4"
          : "hover:underline hover:underline-offset-4",
        className,
      ].join(" ")}
    >
      <span>{`${country} | ${code} ${symbol}`}</span>
      <DropDownIcon
        className={[
          "transition-transform duration-300 ease-in",
          active ? "-rotate-180" : "rotate-0",
        ].join(" ")}
      />
    </button>
  );
}
