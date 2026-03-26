"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import type { CartSessionItem } from "@/lib/cart";
import { useCurrency } from "@/context/CurrencyContext";
import { getProductImageUrl } from "@/lib/storage";
import DiscountInput from "@/app/components/atoms/DiscountInput";
import {
  ESTIMATED_TAX_RATE,
  formatMoney,
  formatMoneyAuto,
  getShippingDetails,
  type CheckoutCountry,
} from "@/app/pages/Checkout/checkoutUtils";

const DISCOUNT_CODES: Record<string, number> = {
  ACE10: 0.1,
  ACE15: 0.15,
  ACE20: 0.2,
};

type Props = {
  items: CartSessionItem[];
  shippingCountry: CheckoutCountry;
};

export default function CheckoutProductsDetail({
  items,
  shippingCountry,
}: Props) {
  const { selectedCurrency } = useCurrency();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscountRate, setAppliedDiscountRate] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");

  const shippingDetails = getShippingDetails(shippingCountry);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [items]);

  const discountAmount = subtotal * appliedDiscountRate;
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);
  const estimatedTax = subtotalAfterDiscount * ESTIMATED_TAX_RATE;
  const total = subtotalAfterDiscount + shippingDetails.price + estimatedTax;

  const onApplyDiscount = () => {
    const code = discountCode.trim().toUpperCase();
    if (!code) {
      setAppliedDiscountRate(0);
      setDiscountMessage("");
      return;
    }

    const discount = DISCOUNT_CODES[code];
    if (!discount) {
      setAppliedDiscountRate(0);
      setDiscountMessage("Invalid discount code.");
      return;
    }

    setAppliedDiscountRate(discount);
    setDiscountMessage(`${code} applied.`);
  };

  return (
    <section className="h-fit w-full ring ring-border-primary bg-bg-surface p-4">
      <div className="flex flex-col gap-6">
        {items.length === 0 ? (
          <p className="font-M-500 text-text-secondary">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-6 ">
            {items.map((item) => {
              const itemCurrencySymbol =
                item.currencySymbol ?? selectedCurrency.symbol;
              const itemCurrencyCode =
                item.currencyCode ?? selectedCurrency.code;

              return (
                <article
                  key={item.id}
                  className="flex items-center border-b border-border-secondary justify-between"
                >
                  <div className="flex max-w-2/3 items-center  gap-4">
                    <div className="relative w-32 aspect-square  shrink-0">
                      <Image
                        src={getProductImageUrl(item.image)}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <p className="font-S-500 text-text-primary">{item.name}</p>
                  </div>
                  <div className="shrink-0 w-full flex flex-col gap-1 h-full max-w-1/3 ">
                    <p className="font-S-500 flex flex-row w-full  justify-center text-text-primary">
                      {itemCurrencySymbol}
                      {formatMoneyAuto(item.unitPrice)} {itemCurrencyCode}
                    </p>
                    <p className="font-S-500 flex flex-row w-full gap-6 justify-center text-text-secondary">
                      Quantity{" "}
                      <span className="font-S-600 text-text-primary">
                        {" "}
                        {item.quantity}
                      </span>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <DiscountInput
            value={discountCode}
            onChange={setDiscountCode}
            onApply={onApplyDiscount}
          />

          {discountMessage ? (
            <p
              className={[
                "font-S-500",
                appliedDiscountRate > 0
                  ? "text-text-secondary"
                  : "text-brand-primary",
              ].join(" ")}
            >
              {discountMessage}
            </p>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-S-500 text-text-primary">Subtotal</span>
            <span className="font-S-500 text-text-primary">
              {shippingDetails.currencySymbol}
              {formatMoneyAuto(subtotal)}
            </span>
          </div>

          {appliedDiscountRate > 0 ? (
            <div className="flex items-center justify-between">
              <span className="font-S-500 text-text-primary">Discount</span>
              <span className="font-S-500 text-text-primary">
                -{shippingDetails.currencySymbol}
                {formatMoney(discountAmount)}
              </span>
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <span className="font-S-500 text-text-primary">Shipping</span>
            <span className="font-S-500 text-text-primary">
              {shippingDetails.currencySymbol}
              {formatMoney(shippingDetails.price)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-S-500 text-text-primary">Estimated Tax</span>
            <span className="font-S-500 text-text-primary">
              {shippingDetails.currencySymbol}
              {formatMoney(estimatedTax)}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-M-600 text-text-primary">Total</span>
          <span className="font-L-600 text-text-primary">
            {shippingDetails.currencySymbol}
            {formatMoney(total)}
          </span>
        </div>
      </div>
    </section>
  );
}
