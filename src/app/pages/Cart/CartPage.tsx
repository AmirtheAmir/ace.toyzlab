"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  readCart,
  removeCartItem,
  updateCartItemQuantity,
  type CartSessionItem,
} from "@/lib/cart";
import CartItemRow from "@/app/components/molecules/CartItemRow";
import { useCurrency } from "@/context/CurrencyContext";
import NewsletterSubscribe from "@/app/components/organisms/NewsletterSubscribe";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartSessionItem[]>([]);
  const { selectedCurrency } = useCurrency();

  useEffect(() => {
    const syncCart = () => {
      setCartItems(readCart());
    };

    syncCart();
    window.addEventListener("cart-updated", syncCart);

    return () => {
      window.removeEventListener("cart-updated", syncCart);
    };
  }, []);

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );
  }, [cartItems]);

  const formattedTotal = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(total);

  const isEmpty = cartItems.length === 0;

  return (
    <main className="content-in py-2 flex flex-col ">
      <section className="flex flex-col py-6 gap-2 min-h-133">
        <h1 className="font-L-600 text-text-primary">
          {isEmpty ? "Your Cart Is Empty" : "Your Cart"}
        </h1>

        {isEmpty ? null : (
          <div className="flex flex-col gap-2">
            {cartItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                currencySymbol={selectedCurrency.symbol}
                onDecrease={() =>
                  updateCartItemQuantity(
                    item.id,
                    Math.max(1, item.quantity - 1),
                  )
                }
                onIncrease={() =>
                  updateCartItemQuantity(item.id, item.quantity + 1)
                }
                onRemove={() => removeCartItem(item.id)}
              />
            ))}

            <div className="flex flex-col items-end gap-6 mt-2">
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-6">
                  <span className="font-L-500 text-text-secondary">Total</span>
                  <span className="font-L-500 text-text-primary">
                    {selectedCurrency.symbol}
                    {formattedTotal}
                  </span>
                </div>
                <p className="font-M-500 text-text-secondary text-right">
                  Shipping, Taxes and Discounts To Be Calculated At Checkout
                </p>
              </div>

              <Link
                href="/checkout"
                className="px-9 py-3.5 bg-brand-primary text-text-primary font-M-600 hover:bg-brand-secondary hover:ring hover:ring-border-primary transition-all duration-300 cursor-pointer "
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </section>
      <NewsletterSubscribe/>
    </main>
  );
}
