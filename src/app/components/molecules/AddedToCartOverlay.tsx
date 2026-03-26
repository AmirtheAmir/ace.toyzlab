"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getProductImageUrl } from "@/lib/storage";
import { Check12Icon } from "../../../../public/Icons";

type Props = {
  open: boolean;
  name: string;
  image: string;
  quantity: number;
  cartCount: number;
  onClose?: () => void;
};

export default function AddedToCartOverlay({
  open,
  name,
  image,
  quantity,
  cartCount,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed top-14.25 right-135 z-100 w-80 bg-bg-surface px-2 pt-4 pb-2 ring ring-border-primary flex flex-col gap-4">
      <p className="font-XS-600 flex flex-row gap-1 w-full justify-center text-brand-primary items-center">
        <Check12Icon />
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
        <Link
          href="/cart"
          className="py-3.5 w-full ring font-M-500 hover:bg-brand-tertiary transition-colors duration-300 ring-border-primary text-center"
        >
          View Cart ({cartCount})
        </Link>

        <Link
          href="/checkout"
          className="py-3.5 w-full text-center font-M-600 bg-brand-primary text-text-primary"
        >
          Checkout
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="w-full font-S-500"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
