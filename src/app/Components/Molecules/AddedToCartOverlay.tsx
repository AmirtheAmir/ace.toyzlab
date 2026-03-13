"use client";

import Image from "next/image";
import React from "react";
import { getProductImageUrl } from "@/lib/storage";
import { Check12Icon } from "../../../../public/Icons";

type Props = {
  open: boolean;
  name: string;
  image: string;
  quantity: number;
};

export default function AddedToCartOverlay({
  open,
  name,
  image,
  quantity,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed top-14 right-78 z-100 w-84  bg-bg-surface p-2 ring ring-border-primary flex flex-col gap-6">
      <p className="font-XS-600 flex flex-row gap-1 w-full justify-center text-brand-primary items-center">
        <Check12Icon/>
        Item added to your cart successfully
      </p>

      <div className="flex flex-row gap-4">
        <div className="relative w-22 h-22 shrink-0">
          <Image
            src={getProductImageUrl(image)}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-2 justify-center">
          <p className="font-S-500">{name}</p>
          <p className="font-XS-600 gap-1 text-text-primary">
            Quantity: {quantity}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button className="py-3.5 w-full ring font-M-500 ring-border-primary">View Cart ({quantity})</button>
        <button className="py-3.5 w-full font-M-600 bg-brand-primary text-text-primary">
          Checkout
        </button>
        <button className="w-full font-S-500">Continue Shopping</button>
      </div>
    </div>
  );
}