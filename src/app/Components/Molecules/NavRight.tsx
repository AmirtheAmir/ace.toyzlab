import React, { useMemo, useState } from "react";
import IconButton from "../Atoms/IconButton";
import CurrencyNavButton from "../Atoms/CurrencyNavButton";
import FloatingSearchInput from "../Atoms/FloatingSearchInput";
import { CartIcon, PersonIcon, SearchIcon } from "../../../../public/Icons";
import { CURRENCIES, type Currency } from "../../../Data/currencies";
import styles  from "./Styles.module.css"
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
    <div className="flex ring ring-border-primary">
      <div className="flex flew-row gap-4 bg-bg-base items-center justify-center px-4 text-text-primary">
        <IconButton label="Search">
          <SearchIcon />
        </IconButton>
        <IconButton label="Account">
          <PersonIcon />
        </IconButton>
        <IconButton label="Cart">
          <CartIcon />
        </IconButton>
      </div>

      <div className="relative">
        <CurrencyNavButton
          country={selected.country}
          code={selected.code}
          symbol={selected.symbol}
          active={openMenu === "currency"}
          onClick={() => toggle("currency")}
        />

        {openMenu === "currency" && (
          <div className="absolute right-0 top-12.25 gap-2 p-3 flex flex-col z-50 w-84 bg-bg-base ring ring-border-primary">
            <FloatingSearchInput
              label="Search"
              value={query}
              onChange={setQuery}
            />

            <div className={`mt-2 max-h-45.5 flex flex-col gap-2 overflow-y-auto ${styles["scrollbar-clean"]}`}>
              {filtered.map((c) => {
                const isActive =
                  c.country === selected.country && c.code === selected.code;

                return (
                  <button
                    key={`${c.country}-${c.code}`}
                    type="button"
                    onClick={() => setSelected(c)}
                    className="w-full flex items-center justify-between pl-3 font-S-500"
                  >
                    <span
                      className={
                        isActive
                          ? "text-text-primary font-S-500 underline underline-offset-4"
                          : "text-text-secondary hover:underline hover:underline-offset-4 hover:text-text-primary transition-colors duration-200 ease-in"
                      }
                    >
                      {c.country}
                    </span>
                    <span
                      className={
                        isActive
                          ? "text-text-primary font-S-500"
                          : "text-text-secondary"
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
