"use client";

import React, { useEffect, useRef, useState } from "react";
import FilterSelectButton from "../atoms/FilterButton";
import NumberFilterInput from "../atoms/FilterPriceRangeInput";
import { useCurrency } from "@/context/CurrencyContext";

export type PriceValue = { from: string; to: string } | null;

type Props = {
  value: PriceValue;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (value: PriceValue) => void;
};

export default function PriceFilter({
  value,
  isOpen,
  onToggle,
  onChange,
}: Props) {
  const { selectedCurrency } = useCurrency();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [draftFrom, setDraftFrom] = useState(value?.from ?? "");
  const [draftTo, setDraftTo] = useState(value?.to ?? "");

  useEffect(() => {
    if (!isOpen) return;

    function onMouseDown(event: MouseEvent) {
      const root = rootRef.current;
      if (!root) return;

      if (!root.contains(event.target as Node)) {
        setDraftFrom("0");
        setDraftTo("0");
        onToggle();
      }
    }

    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [isOpen, onToggle, value?.from, value?.to]);

  const handleToggle = () => {
    if (!isOpen) {
      setDraftFrom(value?.from ?? "");
      setDraftTo(value?.to ?? "");
    }
    onToggle();
  };

  const handleApply = () => {
    if (!draftFrom && !draftTo) {
      onChange(null);
      onToggle();
      return;
    }

    onChange({
      from: draftFrom,
      to: draftTo,
    });
    onToggle();
  };

  return (
    <div ref={rootRef} className="relative">
      <FilterSelectButton
        label="Price"
        isOpen={isOpen}
        onClick={handleToggle}
      />

      {isOpen && (
        <div className="absolute left-0 top-full z-20 min-w-53 bg-bg-base p-2 ring ring-border-primary">
          <div className="flex items-center  gap-2">
            <span className="font-S-500 text-text-secondary">
              {selectedCurrency.symbol}
            </span>
            <NumberFilterInput
              placeholder="From"
              value={draftFrom}
              onChange={setDraftFrom}
            />

            <NumberFilterInput
              placeholder="To"
              value={draftTo}
              onChange={setDraftTo}
            />
          </div>

          <button
            type="button"
            onClick={handleApply}
            className="mt-2 w-full bg-brand-primary hover:cursor-pointer px-4 py-3 font-S-600 text-text-primary"
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
