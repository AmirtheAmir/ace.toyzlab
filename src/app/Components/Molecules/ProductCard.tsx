"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import ItemTitle from "../atoms/ProductTitle";
import ItemPrice from "../atoms/ProductPrice";
import SoldOutBadge from "../atoms/ProductSoldOutBadge";
import { useCurrency } from "@/context/CurrencyContext";
import { getProductImageUrl } from "@/lib/storage";

type ProductCardProps = {
  slug: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  soldOut?: boolean;
  showPrice?: boolean;
  showBadge?: boolean;
  compact?: boolean;
  className?: string;
};

export default function ProductCard({
  slug,
  name,
  image,
  price,
  oldPrice,
  soldOut = false,
  showPrice = true,
  showBadge = true,
  compact = false,
  className = "",
}: ProductCardProps) {
  const { selectedCurrency, convertFromBase } = useCurrency();

  const convertedPrice = convertFromBase(price);
  const convertedOldPrice =
    typeof oldPrice === "number" ? convertFromBase(oldPrice) : undefined;

  const imageUrl = getProductImageUrl(image);

  return (
    <Link
      href={`/product/${slug}`}
      className={[
        compact
          ? "flex items-center gap-3 group hover:bg-bg-subtle p-2 rounded-md"
          : "flex flex-col gap-2 group",
        className,
      ].join(" ")}
    >
      <article
        className={compact ? "flex items-center gap-3 w-full" : "flex flex-col"}
      >
        {/* Image */}
        <div className="relative flex flex-col">
          <div
            className={[
              "relative overflow-hidden bg-transparent transition-all duration-300 group-hover:ring-border-primary",
              compact
                ? "w-[88px] h-[88px]"
                : "w-full aspect-417/417 ring-1 ring-transparent",
            ].join(" ")}
          >
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-contain"
              sizes={compact ? "88px" : "(max-width: 768px) 100vw, 33vw"}
            />
          </div>

          {soldOut && showBadge && !compact && (
            <div className="absolute bottom-2 left-2">
              <SoldOutBadge />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <ItemTitle className="group-hover:underline">{name}</ItemTitle>

          {showPrice && !compact && (
            <ItemPrice
              price={convertedPrice}
              oldPrice={convertedOldPrice}
              currencySymbol={selectedCurrency.symbol}
              currencyCode={selectedCurrency.code}
            />
          )}
        </div>
      </article>
    </Link>
  );
}