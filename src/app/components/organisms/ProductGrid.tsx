"use client";

import React from "react";
import ProductCard from "../molecules/ProductCard";
import type { ProductItem } from "@/types/product";

type ProductGridProps = {
  initialProducts: ProductItem[];
};

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const order = ["aggregat", "classic", "tactical", "glasses", "lighter"];

  const sortedProducts = [...initialProducts]
    .sort((a, b) => order.indexOf(a.collection) - order.indexOf(b.collection))
    .slice(0, 9);

  if (!sortedProducts.length) {
    return (
      <p className="font-M-500 text-text-primary">
        Products are unavailable right now.
      </p>
    );
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sortedProducts.map((item) => (
          <ProductCard
            key={item.id}
            slug={item.slug}
            name={item.name}
            image={item.mainImage}
            price={item.price}
            oldPrice={item.oldPrice}
            soldOut={item.soldOut}
          />
        ))}
      </div>
    </section>
  );
}
