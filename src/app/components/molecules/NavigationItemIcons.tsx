"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NavigationIconButton from "../atoms/NavigationIconButton";
import CurrencyButton from "../atoms/CurrencyButton";
import CartLinkButton from "../atoms/CartLinkButton";
import { PersonIcon, SearchIcon } from "../../../../public/Icons";
import { CURRENCIES } from "@/data/currencies";
import { useCurrency } from "@/context/CurrencyContext";
import styles from "./Styles.module.css";
import CurrencySearchInput from "../atoms/CurrencySearchInput";
import { getCartItemCount } from "@/lib/cart";
import { getSupabase } from "@/lib/supabase";

type NavMode = "default" | "search";

type Props = {
  openMenu: string | null;
  setOpenMenu: (v: string | null) => void;
  setNavMode: (v: NavMode) => void;
};

export default function NavigationItemIcons({
  openMenu,
  setOpenMenu,
  setNavMode,
}: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  const toggleCurrency = () => {
    const next = openMenu === "currency" ? null : "currency";
    if (next === null) setQuery("");
    setOpenMenu(next);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;

    return CURRENCIES.filter(
      (c) =>
        c.country.toLowerCase().includes(q) || c.code.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    const updateCartCount = () => {
      setCartCount(getCartItemCount());
    };

    updateCartCount();

    window.addEventListener("cart-updated", updateCartCount);

    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  return (
    <div className="flex ring ring-border-primary">
      <div className="flex flex-row gap-2 sm:gap-4 bg-bg-base items-center justify-center px-4 text-text-primary">
        <NavigationIconButton
          label="Search"
          onClick={() => {
            setNavMode("search");
            setOpenMenu(null);
            setQuery("");
          }}
        >
          <SearchIcon />
        </NavigationIconButton>

        <NavigationIconButton
          label="Account"
          onClick={async () => {
            setOpenMenu(null);
            setQuery("");
            const supabase = getSupabase();
            if (!supabase) return;

            const { data } = await supabase.auth.getSession();

            if (data.session) {
              router.push("/account?tab=profile");
            } else {
              setOpenMenu(null);
              router.push("/auth");
            }
          }}
        >
          <PersonIcon />
        </NavigationIconButton>

        <CartLinkButton count={cartCount} href="/cart" />
      </div>

      <div className="relative">
        <CurrencyButton
          country={selectedCurrency.country}
          code={selectedCurrency.code}
          symbol={selectedCurrency.symbol}
          active={openMenu === "currency"}
          onClick={toggleCurrency}
        />

        {openMenu === "currency" && (
          <div className="absolute right-0 top-12.25 gap-2 p-3 flex flex-col z-50 w-63 sm:w-71 bg-bg-base ring ring-border-primary">
            <CurrencySearchInput
              label="Search"
              value={query}
              onChange={setQuery}
            />

            <div
              className={`mt-2 max-h-45.5 flex flex-col gap-3 overflow-y-auto ${styles["scrollbar-clean"]}`}
            >
              {filtered.map((c) => {
                const isActive =
                  c.country === selectedCurrency.country &&
                  c.code === selectedCurrency.code;

                return (
                  <button
                    key={`${c.country}-${c.code}`}
                    type="button"
                    onClick={() => {
                      setSelectedCurrency(c);
                      setQuery("");
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
  );
}
