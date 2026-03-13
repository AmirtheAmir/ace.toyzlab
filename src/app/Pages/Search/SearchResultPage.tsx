"use client";

import React, { useMemo, useState } from "react";
import FilterBar from "@/app/Components/Organism/FilterBar";
import ProductCard from "@/app/Components/Molecules/ProductCard";
import { itemData } from "@/data/ItemData";
import { AvailabilityValue } from "@/app/Components/Molecules/AvailabilityFilter";
import { PriceValue } from "@/app/Components/Molecules/PriceFilter";
import { SortValue } from "@/app/Components/Molecules/RelevanceSort";

type Props = {
  query: string;
};

export default function SearchResultPage({ query }: Props) {
  const [availability, setAvailability] = useState<AvailabilityValue>(null);
  const [price, setPrice] = useState<PriceValue>(null);
  const [sort, setSort] = useState<SortValue>(null);

  const [availabilityOpen, setAvailabilityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const normalizedQuery = query.trim().toLowerCase();

  const matchedProducts = useMemo(() => {
    if (!normalizedQuery) return itemData;

    return itemData.filter((item) => {
      const inName = item.name.toLowerCase().includes(normalizedQuery);
      const inTags = item.tags?.some((tag: string) =>
        tag.toLowerCase().includes(normalizedQuery),
      );

      return inName || inTags;
    });
  }, [normalizedQuery]);

  const counts = useMemo(() => {
    return {
      all: matchedProducts.length,
      inStock: matchedProducts.filter((item) => !item.soldOut).length,
      outOfStock: matchedProducts.filter((item) => item.soldOut).length,
    };
  }, [matchedProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...matchedProducts];

    if (availability === "in-stock") {
      result = result.filter((item) => !item.soldOut);
    }

    if (availability === "out-of-stock") {
      result = result.filter((item) => item.soldOut);
    }

    if (price && (price.from || price.to)) {
      const from = price.from ? Number(price.from) : 0;
      const to = price.to ? Number(price.to) : Infinity;

      result = result.filter((item) => item.price >= from && item.price <= to);
    }

    if (sort === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [matchedProducts, availability, price, sort]);

  return (
    <section className="flex flex-col gap-2 py-8 ">
      <h1 className="text-center py-6 select-none font-L-600 text-text-primary">
        Search Results For “{query}”
      </h1>

      <FilterBar
        showPrice
        availabilityValue={availability}
        priceValue={price}
        sortValue={sort}
        availabilityOpen={availabilityOpen}
        priceOpen={priceOpen}
        sortOpen={sortOpen}
        onToggleAvailability={() => {
          setAvailabilityOpen((prev) => !prev);
          setPriceOpen(false);
          setSortOpen(false);
        }}
        onTogglePrice={() => {
          setPriceOpen((prev) => !prev);
          setAvailabilityOpen(false);
          setSortOpen(false);
        }}
        onToggleSort={() => {
          setSortOpen((prev) => !prev);
          setAvailabilityOpen(false);
          setPriceOpen(false);
        }}
        onAvailabilityChange={(value) => {
          setAvailability(value === "all" ? null : value);
          setAvailabilityOpen(false);
        }}
        onPriceChange={setPrice}
        onSortChange={(value) => {
          setSort(value === "relevance" ? null : value);
          setSortOpen(false);
        }}
        onClearAvailability={() => setAvailability(null)}
        onClearPrice={() => setPrice(null)}
        onClearSort={() => setSort(null)}
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
