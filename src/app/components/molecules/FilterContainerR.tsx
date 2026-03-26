"use client";

import React from "react";
import { SortIcon } from "../../../../public/Icons";
import FilterRelevance, { SortValue } from "./FilterRelevance";

type Props = {
  value: SortValue;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (value: SortValue) => void;
  resultsCount: number;
};

export default function FilterContainerR({
  value,
  isOpen,
  onToggle,
  onChange,
  resultsCount,
}: Props) {
  return (
    <div className="flex sm:items-center sm:flex-row flex-col items-end gap-2">
      <div className="flex items-center gap-2 text-text-secondary font-S-500">
        <SortIcon />
        <span>Sort By</span>
      </div>

      <FilterRelevance
        value={value}
        isOpen={isOpen}
        onToggle={onToggle}
        onChange={onChange}
      />

      <span className="font-S-500 text-text-tertiary">Results {resultsCount}</span>
    </div>
  );
}
