"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { CURRENCIES, type Currency } from "../data/currencies";

type CurrencyContextType = {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  convertFromBase: (amount: number) => number;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

const CURRENCY_RATES: Record<string, number> = {
  EUR: 1,
  USD: 1.09,
  GBP: 0.85,
  SEK: 11.2,
  NOK: 11.6,
  DKK: 7.46,
  RUB: 98.5,
  GER:96.5,
  JPY: 150.3,
  CHF: 0.95,
  CAD: 1.4,
  AUD: 1.5,
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    CURRENCIES[2],
  );

  const value = useMemo(() => {
    function convertFromBase(amount: number) {
      const rate = CURRENCY_RATES[selectedCurrency.code] ?? 1;
      return amount * rate;
    }

    return {
      selectedCurrency,
      setSelectedCurrency,
      convertFromBase,
    };
  }, [selectedCurrency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used inside CurrencyProvider");
  }

  return context;
}
