"use client";

import { useMemo, useState } from "react";
import ProductCard from "../molecules/ProductCard";
import FilterBar from "./FilterContainer";
import { AvailabilityValue } from "../molecules/FilterAvailability";
import { SortValue } from "../molecules/FilterRelevance";
import { ProductItem } from "@/data/ItemData";

type Props = {
  slug: "all" | "classic" | "tactical" | "glasses" | "lighter" | "aggregat";
  initialProducts: ProductItem[];
};

const titles: Record<Props["slug"], string> = {
  all: "ALL Collection",
  classic: "CLASSIC Collection",
  tactical: "TACTICAL Collection",
  glasses: "GLASSES Collection",
  lighter: "LIGHTER Collection",
  aggregat: "AGGREGAT Collection",
};

export default function CollectionPageView({
  slug,
  initialProducts,
}: Props) {
  const [availability, setAvailability] = useState<AvailabilityValue>(null);
  const [sortValue, setSortValue] = useState<SortValue>("relevance");

  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const counts = useMemo(() => {
    const inStock = initialProducts.filter((item) => !item.soldOut).length;
    const outOfStock = initialProducts.filter((item) => item.soldOut).length;

    return {
      all: initialProducts.length,
      inStock,
      outOfStock,
    };
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (availability === "in-stock") {
      result = result.filter((item) => !item.soldOut);
    }

    if (availability === "out-of-stock") {
      result = result.filter((item) => item.soldOut);
    }

    if (sortValue === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [initialProducts, availability, sortValue]);

  return (
    <section className="flex flex-col gap-2 py-8">
      <h1 className="text-center py-6 select-none font-L-600 text-text-primary uppercase">{titles[slug]}</h1>

      <FilterBar
        showPrice={false}
        availabilityValue={availability}
        priceValue={{ from: "", to: "" }}
        sortValue={sortValue}
        availabilityOpen={isAvailabilityOpen}
        priceOpen={false}
        sortOpen={isSortOpen}
        onToggleAvailability={() => {
          setIsAvailabilityOpen((prev) => !prev);
          setIsSortOpen(false);
        }}
        onTogglePrice={() => {}}
        onToggleSort={() => {
          setIsSortOpen((prev) => !prev);
          setIsAvailabilityOpen(false);
        }}
        onAvailabilityChange={(value) => {
          setAvailability(value);
          setIsAvailabilityOpen(false);
        }}
        onPriceChange={() => {}}
        onSortChange={(value) => {
          setSortValue(value);
          setIsSortOpen(false);
        }}
        onClearAvailability={() => {
          setAvailability(null);
          setIsAvailabilityOpen(false);
        }}
        onClearPrice={() => {}}
        onClearSort={() => {
          setSortValue("relevance");
          setIsSortOpen(false);
        }}
        counts={counts}
        resultsCount={filteredProducts.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            slug={product.slug}
            name={product.name}
            image={product.mainImage}
            price={product.price}
            oldPrice={product.oldPrice}
            soldOut={product.soldOut}
          />
        ))}
      </div>
    </section>
  );
}
