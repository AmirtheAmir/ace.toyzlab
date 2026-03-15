import Link from "next/link";
import NavButton from "../atoms/NavigationLink";

type Props = {
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
};

export default function NavLeft({ openMenu, setOpenMenu }: Props) {
  const toggle = (key: string) => setOpenMenu(openMenu === key ? null : key);

  return (
    <div className="flex ring ring-border-primary">
      <Link href="/collection/all" onClick={() => setOpenMenu(null)}>
        <NavButton label="All" />
      </Link>

      <div className="relative">
        <NavButton
          label="Watches"
          hasDropdown
          active={openMenu === "watches"}
          onClick={() => toggle("watches")}
        />

        {openMenu === "watches" && (
          <div className="absolute left-0 top-12.25 z-50 flex w-45 flex-col gap-3 bg-bg-base p-3 ring ring-border-primary">
            <Link
              href="/collection/classic"
              onClick={() => setOpenMenu(null)}
              className="w-full text-left font-S-500 text-text-secondary transition-colors duration-200 ease-in hover:text-text-primary hover:underline hover:underline-offset-4"
            >
              Classic
            </Link>

            <Link
              href="/collection/tactical"
              onClick={() => setOpenMenu(null)}
              className="w-full text-left font-S-500 text-text-secondary transition-colors duration-200 ease-in hover:text-text-primary hover:underline hover:underline-offset-4"
            >
              Tactical
            </Link>
          </div>
        )}
      </div>

      <div className="relative">
        <NavButton
          label="Accessories"
          hasDropdown
          active={openMenu === "accessories"}
          onClick={() => toggle("accessories")}
        />

        {openMenu === "accessories" && (
          <div className="absolute left-0 top-12.25 z-50 flex w-45 flex-col gap-3 bg-bg-base p-3 ring ring-border-primary">
            <Link
              href="/collection/glasses"
              onClick={() => setOpenMenu(null)}
              className="w-full text-left font-S-500 text-text-secondary transition-colors duration-200 ease-in hover:text-text-primary hover:underline hover:underline-offset-4"
            >
              Glasses
            </Link>

            <Link
              href="/collection/lighter"
              onClick={() => setOpenMenu(null)}
              className="w-full text-left font-S-500 text-text-secondary transition-colors duration-200 ease-in hover:text-text-primary hover:underline hover:underline-offset-4"
            >
              Lighter
            </Link>
          </div>
        )}
      </div>

      <Link href="/collection/aggregat" onClick={() => setOpenMenu(null)}>
        <NavButton label="AGGREGAT" exclusive />
      </Link>
    </div>
  );
}