"use client";

import React, { useMemo, useState } from "react";
import FloatingSearchInput from "../Atoms/FloatingSearchInput";
import IconButton from "../Atoms/IconButton";
import CurrencyNavButton from "../Atoms/CurrencyNavButton";
import SearchResultOverlay from "../Organism/SearchResultOverlay";
import { CartIcon, CloseIcon, PersonIcon } from "../../../../public/Icons";
import { CURRENCIES } from "../../../Data/currencies";
import { useCurrency } from "@/Context/CurrencyContext";
import styles from "./Styles.module.css";

type Props = {
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
  onCloseSearch: () => void;
};

export default function SearchNavRow({
  openMenu,
  setOpenMenu,
  onCloseSearch,
}: Props) {
  const [query, setQuery] = useState("");
  const [currencyQuery, setCurrencyQuery] = useState("");
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  const filteredCurrencies = useMemo(() => {
    const q = currencyQuery.trim().toLowerCase();
    if (!q) return CURRENCIES;

    return CURRENCIES.filter(
      (c) =>
        c.country.toLowerCase().includes(q) || c.code.toLowerCase().includes(q),
    );
  }, [currencyQuery]);

  return (
    <div className="relative w-full ring ring-border-primary bg-bg-base">
      <div className="relative z-60 bg-bg-base ring ring-border-primary flex w-full">
        <div className="flex-1 min-w-0">
          <div className="flex h-full w-full items-center">
            <FloatingSearchInput
              label="Search"
              value={query}
              onChange={setQuery}
            />
          </div>
        </div>

        <div className="flex ringed-currencynavbuttonl gap-4 px-4 text-text-primary">
          <IconButton label="Close Search" onClick={onCloseSearch}>
            <CloseIcon />
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
            country={selectedCurrency.country}
            code={selectedCurrency.code}
            symbol={selectedCurrency.symbol}
            active={openMenu === "currency"}
            onClick={() => {
              const next = openMenu === "currency" ? null : "currency";
              if (next === null) setCurrencyQuery("");
              setOpenMenu(next);
            }}
          />

          {openMenu === "currency" && (
            <div className="absolute right-0 top-12.25 z-50 flex w-84 flex-col gap-2 bg-bg-base p-3 ring ring-border-primary">
              <FloatingSearchInput
                label="Search"
                value={currencyQuery}
                onChange={setCurrencyQuery}
              />

              <div
                className={`mt-2 max-h-45.5 flex flex-col gap-3 overflow-y-auto ${styles["scrollbar-clean"]}`}
              >
                {filteredCurrencies.map((c) => {
                  const isActive =
                    c.country === selectedCurrency.country &&
                    c.code === selectedCurrency.code;

                  return (
                    <button
                      key={`${c.country}-${c.code}`}
                      type="button"
                      onClick={() => {
                        setSelectedCurrency(c);
                        setCurrencyQuery("");
                        setOpenMenu(null);
                      }}
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

      <SearchResultOverlay
        query={query}
        onSuggestionClick={setQuery}
      />
    </div>
  );
}
