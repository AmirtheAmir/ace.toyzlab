import React from "react";
import ProductCard from "../Molecules/ProductCard";
import { itemData } from "../../../Data/ItemData";

export default function ProductGrid() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {itemData.map((item) => (
          <ProductCard
            key={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
            oldPrice={item.oldPrice}
            soldOut={item.soldOut}
            currencySymbol={item.currencySymbol}
            currencyCode={item.currencyCode}
          />
        ))}
      </div>
    </section>
  );
}