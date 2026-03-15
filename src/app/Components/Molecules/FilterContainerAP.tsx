"use client";

import React from "react";
import { FilterIcon } from "../../../../public/Icons";
import AvailabilityFilter, { AvailabilityValue } from "./FilterAvailability";
import PriceFilter, { PriceValue } from "./FilterPrice";

type Props = {
  showPrice?: boolean;
  availabilityValue: AvailabilityValue;
  priceValue: PriceValue;
  availabilityOpen: boolean;
  priceOpen: boolean;
  onToggleAvailability: () => void;
  onTogglePrice: () => void;
  onAvailabilityChange: (value: AvailabilityValue) => void;
  onPriceChange: (value: PriceValue) => void;
  counts: {
    all: number;
    inStock: number;
    outOfStock: number;
  };
};

export default function LeftSideFilter({
  showPrice = true,
  availabilityValue,
  priceValue,
  availabilityOpen,
  priceOpen,
  onToggleAvailability,
  onTogglePrice,
  onAvailabilityChange,
  onPriceChange,
  counts,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 text-text-secondary font-S-500">
        <FilterIcon />
        <span>Filter</span>
      </div>

      <AvailabilityFilter
        value={availabilityValue}
        isOpen={availabilityOpen}
        onToggle={onToggleAvailability}
        onChange={onAvailabilityChange}
        counts={counts}
      />

      {showPrice && (
        <PriceFilter
          value={priceValue}
          isOpen={priceOpen}
          onToggle={onTogglePrice}
          onChange={onPriceChange}
        />
      )}
    </div>
  );
}