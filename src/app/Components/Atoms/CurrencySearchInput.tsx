type Props = { label: string; value: string; onChange: (v: string) => void };
export default function FloatingSearchInputCurrency({
  label,
  value,
  onChange,
}: Props) {
  const active = value.length > 0;
  return (
    <div className="relative border border-border-secondary bg-bg-base h-10 px-3 flex items-center">
      {" "}
      <label
        className={[
          "absolute transition-all duration-150 pointer-events-none",
          active
            ? "top-1.5 font-XS-500 text-text-secondary"
            : " font-S-500 text-text-secondary",
        ].join(" ")}
      >
        {" "}
        {label}{" "}
      </label>{" "}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "w-full outline-none absolute font-S-500 text-text-primary ",
          active ? "bottom-1.5" : "pt-0",
        ].join(" ")}
      />{" "}
    </div>
  );
}
