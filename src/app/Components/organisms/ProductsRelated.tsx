import React from "react";
import { itemData } from "@/data/ItemData";
import ProductCard from "../molecules/ProductCard";

type Props = {
  currentProductId: string;
};

function shuffleArray<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function RelatedProducts({ currentProductId }: Props) {
  const randomProducts = shuffleArray(
    itemData.filter((item) => item.id !== currentProductId)
  ).slice(0, 3);

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-L-600 text-text-primary">You May Also Like</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {randomProducts.map((item) => (
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