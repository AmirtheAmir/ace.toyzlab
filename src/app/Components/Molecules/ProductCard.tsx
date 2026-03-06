import Image from "next/image";
import React from "react";
import ItemTitle from "../Atoms/ItemTitle";
import ItemPrice from "../Atoms/ItemPrice";
import SoldOutBadge from "../Atoms/SoldOutBadge";

type ProductCardProps = {
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  soldOut?: boolean;
  currencySymbol?: string;
  currencyCode?: string;
  className?: string;
};

export default function ProductCard({
  name,
  image,
  price,
  oldPrice,
  soldOut = false,
  currencySymbol = "€",
  currencyCode = "EUR",
  className = "",
}: ProductCardProps) {
  return (
    <article className={["flex flex-col gap-2 group ", className].join(" ")}>
      <div className="relative flex flex-col ">
        <div
          className="relative w-full aspect-417/417 overflow-hidden bg-transparent
        ring-1 ring-transparent
        group-hover:ring-border-primary group-hover:cursor-pointer
        transition-all duration-300"
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>
        {soldOut && (
          <div className="absolute bottom-2 left-2">
            <SoldOutBadge />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <ItemTitle className="group-hover:underline">{name}</ItemTitle>

        <ItemPrice
          price={price}
          oldPrice={oldPrice}
          currencySymbol={currencySymbol}
          currencyCode={currencyCode}
        />
      </div>
    </article>
  );
}
