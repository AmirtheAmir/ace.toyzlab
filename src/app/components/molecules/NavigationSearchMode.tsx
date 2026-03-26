"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "../atoms/SearchInput";
import NavigationIconButton from "../atoms/NavigationIconButton";
import CurrencyButton from "../atoms/CurrencyButton";
import SearchResultOverlay from "../organisms/SearchResultOverlay";
import { CartIcon, CloseIcon, PersonIcon } from "../../../../public/Icons";
import { CURRENCIES } from "@/data/currencies";
import { useCurrency } from "@/context/CurrencyContext";
import styles from "./Styles.module.css";
import { getSupabase } from "@/lib/supabase";

type Props = {
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
  onCloseSearch: () => void;
};

export default function NavigationSearchMode({
  openMenu,
  setOpenMenu,
  onCloseSearch,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [currencyQuery, setCurrencyQuery] = useState("");
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  const filteredCurrencies = useMemo(() => {
    const q = currencyQuery.trim().toLowerCase();
    if (!q) return CURRENCIES;

    return CURRENCIES.filter(
      (c) =>
        c.country.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
    );
  }, [currencyQuery]);

  const handleSearchSubmit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    onCloseSearch();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="relative w-full caret-text-primary bg-bg-base ring ring-border-primary">
      <div className="relative z-60 flex w-full bg-bg-base ring ring-border-primary">
        <div className="min-w-0 flex-1">
          <div className="flex h-full w-full items-center">
            <SearchInput
              label="Search"
              value={query}
              onChange={setQuery}
              onSearchClick={handleSearchSubmit}
              onEnterPress={handleSearchSubmit}
              autoFocus
            />
          </div>
        </div>

        <div className="flex gap-2 sm:gap-4 px-3 sm:px-4 text-text-primary ringed-currencynavbuttonl">
          <NavigationIconButton label="Close Search" onClick={onCloseSearch}>
            <CloseIcon />
          </NavigationIconButton>

          <NavigationIconButton
            label="Account"
            onClick={async () => {
              onCloseSearch();
              const supabase = getSupabase();
              if (!supabase) {
                router.push("/auth");
                return;
              }

              const { data, error } = await supabase.auth.getSession();
              if (error || !data.session) {
                router.push("/auth");
                return;
              }

              router.push("/account");
            }}
          >
            <PersonIcon />
          </NavigationIconButton>

          <NavigationIconButton
            label="Cart"
            onClick={() => {
              onCloseSearch();
              router.push("/cart");
            }}
          >
            <CartIcon />
          </NavigationIconButton>
        </div>

        <div className="relative">
          <CurrencyButton
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
              <SearchInput
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
                      className="flex w-full items-center justify-between pl-3 font-S-500"
                    >
                      <span
                        className={
                          isActive
                            ? "font-S-500 text-text-primary underline underline-offset-4"
                            : "text-text-secondary transition-colors duration-200 ease-in hover:text-text-primary hover:underline hover:underline-offset-4"
                        }
                      >
                        {c.country}
                      </span>

                      <span
                        className={
                          isActive
                            ? "font-S-500 text-text-primary"
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
        onCloseOverlay={onCloseSearch}
      />
    </div>
  );
}

