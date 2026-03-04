// src/app/components/molecules/NavLeft.tsx
import React from "react";
import NavButton from "../Atoms/NavButton";

type Props = {
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
};

export default function NavLeft({ openMenu, setOpenMenu }: Props) {
  const toggle = (key: string) => setOpenMenu(openMenu === key ? null : key);

  return (
    <div className="flex items-stretch">
      <NavButton label="All" onClick={() => setOpenMenu(null)} />

      <div className="relative">
        <NavButton
          label="Watches"
          hasDropdown
          active={openMenu === "watches"}
          onClick={() => toggle("watches")}
          className="-ml-px"
        />

        {openMenu === "watches" && (
          <div className="absolute left-0 top-full z-50 w-56 border border-black/30 bg-white">
            {["Classic", "Tactical"].map((item) => (
              <button
                key={item}
                type="button"
                className="w-full text-left px-6 py-3 text-[14px] text-black/60 hover:underline hover:underline-offset-4"
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
          className="-ml-px"
        />

        {openMenu === "accessories" && (
          <div className="absolute left-0 top-full z-50 w-56 border border-black/30 bg-white">
            {["Glasses", "Lighter"].map((item) => (
              <button
                key={item}
                type="button"
                className="w-full text-left px-6 py-3 text-[14px] text-black/60 hover:underline hover:underline-offset-4"
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      <NavButton label="AGGREGAT" onClick={() => setOpenMenu(null)} className="-ml-px" />
    </div>
  );
}