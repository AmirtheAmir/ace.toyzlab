"use client";

import React, { useCallback, useEffect, useState } from "react";
import { readCart, type CartSessionItem } from "@/lib/cart";
import CheckoutInfoDetail from "@/app/components/organisms/CheckoutInfoDetail";
import CheckoutProductsDetail from "@/app/components/organisms/CheckoutProductsDetail";
import type { CheckoutCountry } from "@/app/pages/Checkout/checkoutUtils";

type ShippingContext = {
  country: CheckoutCountry;
  hasCompleteAddress: boolean;
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartSessionItem[]>([]);
  const [shippingContext, setShippingContext] = useState<ShippingContext>({
    country: "Finland",
    hasCompleteAddress: false,
  });

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

  const handleShippingContextChange = useCallback((next: ShippingContext) => {
    setShippingContext(next);
  }, []);

  return (
    <main className="content-i flex justify-center py-6 mt-2">
      <section className="grid gap-4 sm:grid-cols-[minmax(0,26rem)_minmax(0,26rem)] items-start">
  
  {/* INFO */}
  <div className="order-2 sm:order-1">
    <CheckoutInfoDetail onShippingContextChange={handleShippingContextChange} />
  </div>

  {/* PRODUCTS */}
  <div className="order-1 sm:order-2">
    <CheckoutProductsDetail
      items={cartItems}
      shippingCountry={shippingContext.country}
    />
  </div>

</section>
    </main>
  );
}

