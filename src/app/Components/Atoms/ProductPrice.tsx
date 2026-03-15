import React from "react";

type ItemPriceProps = {
  price: number;
  oldPrice?: number;
  currencySymbol?: string;
  currencyCode?: string;
  className?: string;
};

function formatPrice(value: number) {
  const rounded = Math.round(value);

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rounded);
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
        <p className="font-XS-500 text-text-primary line-through">
          {currencySymbol}
          {formatPrice(oldPrice!)} {currencyCode}
        </p>
      )}

      <p className="font-S-500 text-text-primary">
        {currencySymbol}
        {formatPrice(price)} {currencyCode}
      </p>
    </div>
  );
}
