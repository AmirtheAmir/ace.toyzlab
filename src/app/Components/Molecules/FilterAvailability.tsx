"use client";

import React from "react";
import FilterSelectButton from "../atoms/FilterButton";
import RadioOption from "../atoms/FilterRadioOption";

export type AvailabilityValue = "all" | "in-stock" | "out-of-stock" | null;

type Props = {
  value: AvailabilityValue;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (value: AvailabilityValue) => void;
  counts: {
    all: number;
    inStock: number;
    outOfStock: number;
  };
};

export default function AvailabilityFilter({
  value,
  isOpen,
  onToggle,
  onChange,
  counts,
}: Props) {
  return (
    <div className="relative">
      <FilterSelectButton
        label="Availability"
        isOpen={isOpen}
        onClick={onToggle}
      />

      {isOpen && (
        <div className="absolute left-0 top-full z-20  min-w-53 ring ring-border-primary bg-bg-base p-2">
          <div className="flex flex-col gap-2">
            <RadioOption
              label={`In Stock (${counts.inStock})`}
              checked={value === "in-stock"}
              onClick={() => onChange("in-stock")}
            />
            <RadioOption
              label={`Out Of Stock (${counts.outOfStock})`}
              checked={value === "out-of-stock"}
              onClick={() => onChange("out-of-stock")}
            />
          </div>
        </div>
      )}
    </div>
  );
}