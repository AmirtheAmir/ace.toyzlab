import React from "react";
import ProductCard from "../Molecules/ProductCard";
import { itemData } from "@/data/ItemData";

export default function ProductGrid() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {itemData.slice(0, 9).map((item) => (
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