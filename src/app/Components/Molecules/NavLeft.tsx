import NavButton from "../Atoms/NavButton";

type Props = {
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
};

export default function NavLeft({ openMenu, setOpenMenu }: Props) {
  const toggle = (key: string) => setOpenMenu(openMenu === key ? null : key);

  return (
    <div className="flex ring ring-border-primary ">
      <NavButton label="All" />

      <div className="relative">
        <NavButton
          label="Watches"
          hasDropdown
          active={openMenu === "watches"}
          onClick={() => toggle("watches")}
          className=""
        />

        {openMenu === "watches" && (
          <div className="absolute left-0 top-12.25 gap-3 p-3 flex flex-col z-50 w-45 bg-bg-base ring ring-border-primary">
            {["Classic", "Tactical"].map((item) => (
              <button
                key={item}
                type="button"
                className="w-full text-left font-S-500 text-text-secondary hover:underline hover:underline-offset-4 hover:text-text-primary transition-colors duration-200 ease-in"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <NavButton
          label="Accessories"
          hasDropdown
          active={openMenu === "accessories"}
          onClick={() => toggle("accessories")}
          className=""
        />

        {openMenu === "accessories" && (
          <div className="absolute left-0 top-12.25 gap-3 p-3 flex flex-col z-50 w-45 bg-bg-base ring ring-border-primary">
            {["Glasses", "Lighter"].map((item) => (
              <button
                key={item}
                type="button"
                className="w-full text-left font-S-500 text-text-secondary hover:underline hover:underline-offset-4 hover:text-text-primary transition-colors duration-200 ease-in"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      <NavButton
        label="AGGREGAT"
        exclusive
        onClick={() => setOpenMenu(null)}
        className=""
      />
    </div>
  );
}
