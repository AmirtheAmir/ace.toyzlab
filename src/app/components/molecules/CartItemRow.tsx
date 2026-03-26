"use client";

import React from "react";
import Image from "next/image";
import { getProductImageUrl } from "@/lib/storage";
import type { CartSessionItem } from "@/lib/cart";
import QuantitySelector from "../atoms/QuantitySelector";
import { DeleteIcon } from "../../../../public/Icons";

type Props = {
  item: CartSessionItem;
  currencySymbol?: string;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
};

export default function CartItemRow({
  item,
  currencySymbol = "€",
  onDecrease,
  onIncrease,
  onRemove,
}: Props) {
  const itemTotal = item.unitPrice * item.quantity;

  const formattedItemTotal = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(itemTotal);

  return (
    <div className="flex sm:flex-row flex-col items-center justify-between sm:pb-0 pb-6 border-b border-border-secondary">
      <div className="flex flex-row items-center gap-4 max-w-2xl">
        <div className="relative w-44 h-44 shrink-0">
          <Image
            src={getProductImageUrl(item.image)}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>
        <p className="font-M-500 text-text-primary">{item.name}</p>
      </div>
      <div className="flex flex-row gap-20">
        <div>
          <QuantitySelector
            quantity={item.quantity}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
        </div>
        <div className="flex flex-row gap-6 items-center">
          <p className="font-M-500 text-text-primary">
            {currencySymbol}
            {formattedItemTotal}
          </p>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${item.name}`}
            className="text-text-primary hover:text-text-secondary transition-colors cursor-pointer duration-300"
          >
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
