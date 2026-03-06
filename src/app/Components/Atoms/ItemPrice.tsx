import React from "react";

type ItemPriceProps = {
  price: number;
  oldPrice?: number;
  currencySymbol?: string;
  currencyCode?: string;
  className?: string;
};

function formatPrice(value: number) {
  return value.toLocaleString("en-US");
}

export default function ItemPrice({
  price,
  oldPrice,
  currencySymbol = "€",
  currencyCode = "EUR",
  className = "",
}: ItemPriceProps) {
  const hasDiscount = typeof oldPrice === "number";

  return (
    <div className={["flex items-center gap-2 flex-wrap", className].join(" ")}>
      {hasDiscount && (
        <p className="font-S-500-lined text-text-primary">
          {currencySymbol}
          {formatPrice(oldPrice!)} {currencyCode}
        </p>
      )}

      <p className="font-M-500 text-text-primary">
        {currencySymbol}
        {formatPrice(price)} {currencyCode}
      </p>
    </div>
  );
}