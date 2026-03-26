"use client";

import React from "react";
import FilterContainerAP from "../molecules/FilterContainerAP";
import FilterContainerR from "../molecules/FilterContainerR";
import { AvailabilityValue } from "../molecules/FilterAvailability";
import { PriceValue } from "../molecules/FilterPrice";
import { SortValue } from "../molecules/FilterRelevance";
import FilterChip from "../atoms/FilterChip";

type Props = {
  showPrice?: boolean;
  availabilityValue: AvailabilityValue;
  priceValue: PriceValue;
  sortValue: SortValue;
  availabilityOpen: boolean;
  priceOpen: boolean;
  sortOpen: boolean;
  onToggleAvailability: () => void;
  onTogglePrice: () => void;
  onToggleSort: () => void;
  onAvailabilityChange: (value: AvailabilityValue) => void;
  onPriceChange: (value: PriceValue) => void;
  onSortChange: (value: SortValue) => void;
  onClearAvailability: () => void;
  onClearPrice: () => void;
  onClearSort: () => void;
  counts: {
    all: number;
    inStock: number;
    outOfStock: number;
  };
  resultsCount: number;
};

export default function FilterContainer({
  showPrice = true,
  availabilityValue,
  priceValue,
  sortValue,
  availabilityOpen,
  priceOpen,
  sortOpen,
  onToggleAvailability,
  onTogglePrice,
  onToggleSort,
  onAvailabilityChange,
  onPriceChange,
  onSortChange,
  onClearAvailability,
  onClearPrice,
  onClearSort,
  counts,
  resultsCount,
}: Props) {
  return (
    <div className="flex flex-col py-2 sm:h-22 h-40 select-none">
      <div className="flex items-start justify-between">
        <FilterContainerAP
          showPrice={showPrice}
          availabilityValue={availabilityValue}
          priceValue={priceValue}
          availabilityOpen={availabilityOpen}
          priceOpen={priceOpen}
          onToggleAvailability={onToggleAvailability}
          onTogglePrice={onTogglePrice}
          onAvailabilityChange={onAvailabilityChange}
          onPriceChange={onPriceChange}
          counts={counts}
        />

        <FilterContainerR
          value={sortValue}
          isOpen={sortOpen}
          onToggle={onToggleSort}
          onChange={onSortChange}
          resultsCount={resultsCount}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {availabilityValue && availabilityValue !== "all" && (
          <FilterChip
            label={
              availabilityValue === "in-stock"
                ? "Availability: In Stock"
                : "Availability: Out Of Stock"
            }
            onRemove={onClearAvailability}
          />
        )}

        {priceValue && (priceValue.from || priceValue.to) && (
          <FilterChip
            label={`Price: ${priceValue.from || "0"} - ${priceValue.to || "∞"}`}
            onRemove={onClearPrice}
          />
        )}

        {sortValue && sortValue !== "relevance" && (
          <FilterChip
            label={
              sortValue === "price-low-high"
                ? "Relevance: Price, Low to High"
                : "Relevance: Price, High to Low"
            }
            onRemove={onClearSort}
          />
        )}
      </div>
    </div>
  );
}
