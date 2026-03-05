export type Currency = {
  country: string;
  code: string;
  symbol: string;
};

export const CURRENCIES: Currency[] = [
  { country: "United States", code: "USD", symbol: "$" },
  { country: "Canada", code: "CAD", symbol: "$" },
  { country: "Finland", code: "EUR", symbol: "€" },
  { country: "United Kingdom", code: "GBP", symbol: "£" },
  { country: "Australia", code: "AUD", symbol: "$" },
  { country: "Germany", code: "EUR", symbol: "€" },
  { country: "Japan", code: "JPY", symbol: "¥" },
  { country: "Switzerland", code: "CHF", symbol: "Fr" },
  { country: "Sweden", code: "SEK", symbol: "kr" },
];