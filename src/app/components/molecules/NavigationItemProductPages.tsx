import Link from "next/link";
import NavigationLink from "../atoms/NavigationLink";

type Props = {
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
  onNavigateStart?: (href: string) => void;
};

export default function NavigationItemProductPages({
  openMenu,
  setOpenMenu,
  onNavigateStart,
}: Props) {
  const toggle = (key: string) => setOpenMenu(openMenu === key ? null : key);

  const handleNavigate = (href: string) => {
    onNavigateStart?.(href);
    setOpenMenu(null);
  };

  return (
    <div className="flex  ">
      <Link href="/collection/all" onClick={() => handleNavigate("/collection/all")}>
        <NavigationLink label="All" />
      </Link>

      <div className="relative">
        <NavigationLink
          label="Collectors"
          hasDropdown
          active={openMenu === "collectors"}
          onClick={() => toggle("collectors")}
        />

        {openMenu === "collectors" && (
          <div className="absolute left-0 top-12.25 z-50 flex w-45 flex-col gap-3 bg-bg-base p-3 ring ring-border-primary">
            <Link
              href="/collection/speed_racer"
              onClick={() => handleNavigate("/collection/speed_racer")}
              className="w-full text-left font-S-500 text-text-secondary transition-colors duration-200 ease-in hover:text-text-primary hover:underline hover:underline-offset-4"
            >
              Speed Racer
            </Link>

            <Link
              href="/collection/batman"
              onClick={() => handleNavigate("/collection/batman")}
              className="w-full text-left font-S-500 text-text-secondary transition-colors duration-200 ease-in hover:text-text-primary hover:underline hover:underline-offset-4"
            >
              Batman
            </Link>
          </div>
        )}
      </div>

      <div className="relative">
        <NavigationLink
          label="Motorsports"
          hasDropdown
          active={openMenu === "motorsports"}
          onClick={() => toggle("motorsports")}
        />

        {openMenu === "motorsports" && (
          <div className="absolute left-0 top-12.25 z-50 flex w-45 flex-col gap-3 bg-bg-base p-3 ring ring-border-primary">
            <Link
              href="/collection/classics"
              onClick={() => handleNavigate("/collection/classics")}
              className="w-full text-left font-S-500 text-text-secondary transition-colors duration-200 ease-in hover:text-text-primary hover:underline hover:underline-offset-4"
            >
              Classics
            </Link>

            <Link
              href="/collection/modern"
              onClick={() => handleNavigate("/collection/modern")}
              className="w-full text-left font-S-500 text-text-secondary transition-colors duration-200 ease-in hover:text-text-primary hover:underline hover:underline-offset-4"
            >
              Modern
            </Link>
          </div>
        )}
      </div>
      <Link
        href="/collection/ferrari"
        onClick={() => handleNavigate("/collection/ferrari")}
        className="ml-auto flex flex-1 border-none "
      >
        <NavigationLink label="FERRARI" exclusive className="w-full" />
      </Link>
    </div>
  );
}
