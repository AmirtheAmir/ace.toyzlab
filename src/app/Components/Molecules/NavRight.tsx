// src/app/components/molecules/NavRight.tsx
import React, { useMemo, useState } from "react";
import IconButton from "../Atoms/IconButton";
import NavButton from "../Atoms/NavButton";
import FloatingSearchInput from "../Atoms/FloatingSearchInput";
import { CartIcon, PersonIcon, SearchIcon } from "../../../../public/Icons";

type Currency = { country: string; code: string; symbol: string };

const CURRENCIES: Currency[] = [
  { country: "United States", code: "USD", symbol: "$" },
  { country: "Canada", code: "CAD", symbol: "$" },
  { country: "Finland", code: "EUR", symbol: "€" },
  { country: "United Kingdom", code: "GBP", symbol: "£" },
  { country: "Australia", code: "AUD", symbol: "$" },
  { country: "Germany", code: "EUR", symbol: "€" },
];

type Props = {
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
};

export default function NavRight({ openMenu, setOpenMenu }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Currency>(CURRENCIES[2]); // Finland / EUR default

  const toggle = (key: string) => setOpenMenu(openMenu === key ? null : key);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      (c) =>
        c.country.toLowerCase().includes(q) || c.code.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="flex items-stretch">
      <IconButton label="Search">
        <SearchIcon className="w-4.5 h-4.5" />
      </IconButton>

      <IconButton label="Account">
        <PersonIcon className="w-4.5 h-4.5" />
      </IconButton>

      <IconButton label="Cart">
        <CartIcon className="w-4.5 h-4.5" />
      </IconButton>

      <div className="relative">
        <NavButton
          label={`${selected.country} | ${selected.code} ${selected.symbol}`}
          hasDropdown
          active={openMenu === "currency"}
          onClick={() => toggle("currency")}
          className="-ml-px min-w-[220px] justify-between"
        />

        {openMenu === "currency" && (
          <div className="absolute right-0 top-full z-50 w-[320px] border border-black/30 bg-white p-3">
            <FloatingSearchInput
              label="Search"
              value={query}
              onChange={setQuery}
            />

            <div className="mt-3 max-h-[240px] overflow-auto pr-1">
              {filtered.map((c) => {
                const isActive =
                  c.country === selected.country && c.code === selected.code;

                return (
                  <button
                    key={`${c.country}-${c.code}`}
                    type="button"
                    onClick={() => setSelected(c)}
                    className="w-full flex items-center justify-between px-2 py-2 text-[14px]"
                  >
                    <span
                      className={
                        isActive
                          ? "text-black font-medium underline underline-offset-4"
                          : "text-black/55"
                      }
                    >
                      {c.country}
                    </span>
                    <span
                      className={
                        isActive ? "text-black font-medium" : "text-black/55"
                      }
                    >
                      {c.code} {c.symbol}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
