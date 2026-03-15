"use client";

import React, { useEffect, useState } from "react";
import { ProductItem } from "@/data/ItemData";
import QuantitySelector from "../atoms/QuantitySelector";
import AddedToCartOverlay from "./AddedToCartOverlay";
import { useCurrency } from "@/context/CurrencyContext";
import styles from "../Molecules/Styles.module.css";

type Props = {
  product: ProductItem;
};

export default function ProductInfo({ product }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [showOverlay, setShowOverlay] = useState(false);

  const { selectedCurrency, convertFromBase } = useCurrency();

  const price = convertFromBase(product.price);
  const oldPrice =
    typeof product.oldPrice === "number"
      ? convertFromBase(product.oldPrice)
      : undefined;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(price);

  const formattedOldPrice =
    typeof oldPrice === "number"
      ? new Intl.NumberFormat("en-US", {
          maximumFractionDigits: 0,
        }).format(oldPrice)
      : undefined;

  const handleAddToCart = () => {
    if (product.soldOut) return;
    setShowOverlay(true);
  };

  useEffect(() => {
    if (!showOverlay) return;

    const timeout = setTimeout(() => {
      setShowOverlay(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [showOverlay]);

  return (
    <>
      <div className="flex h-174 max-w-104 flex-col justify-between gap-6">
        <div className="flex shrink-0 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="font-XL-500 select-none text-text-primary">
              {product.name}
            </h1>

            <div className="flex items-center gap-2">
              {formattedOldPrice && (
                <span className="font-M-500 text-text-secondary line-through">
                  {selectedCurrency.symbol}
                  {formattedOldPrice}
                </span>
              )}

              <span className="flex flex-row gap-1 font-L-500 select-none">
                <p>{selectedCurrency.symbol}</p>
                {formattedPrice}
              </span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-4">
            <span className="font-M-500 text-text-secondary">Quantity</span>

            <QuantitySelector
              quantity={quantity}
              onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
              onIncrease={() => setQuantity((prev) => prev + 1)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={product.soldOut}
              className="w-full px-9 py-3.5 font-M-600 text-text-primary ring ring-border-primary transition-colors hover:bg-bg-surface disabled:cursor-not-allowed disabled:text-text-secondary disabled:ring-border-secondary"
            >
              {product.soldOut ? "Sold Out" : "Add To Cart"}
            </button>

            <p className="font-S-500 select-none text-text-secondary">
              Shipping, Taxes and Discounts To Be Calculated At Checkout
            </p>
          </div>
        </div>

        <div
          className={`min-h-0 flex-1 overflow-y-auto pr-2 ${styles["scrollbar-clean"]}`}
        >
          <div className="flex flex-col gap-4 select-none">
            <p className="font-M-500 whitespace-pre-line text-text-primary">
              {product.description}
            </p>

            {product.features && product.features.length > 0 && (
              <ul className="flex list-disc flex-col gap-1 pl-5 select-none">
                {product.features.map((feature) => (
                  <li key={feature} className="font-M-500 text-text-primary">
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            {product.postdescription && (
              <p className="font-M-500 whitespace-pre-line text-text-primary select-none">
                {product.postdescription}
              </p>
            )}
          </div>
        </div>
      </div>

      <AddedToCartOverlay
        open={showOverlay}
        name={product.name}
        image={product.mainImage}
        quantity={quantity}
      />
    </>
  );
}