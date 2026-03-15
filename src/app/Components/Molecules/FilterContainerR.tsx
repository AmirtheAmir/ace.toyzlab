"use client";

import React from "react";
import { SortIcon } from "../../../../public/Icons";
import RelevanceSort, { SortValue } from "./FilterRelevance";

type Props = {
  value: SortValue;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (value: SortValue) => void;
  resultsCount: number;
};

export default function RightSideSort({
  value,
  isOpen,
  onToggle,
  onChange,
  resultsCount,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 text-text-secondary font-S-500">
        <SortIcon />
        <span>Sort By</span>
      </div>

      <RelevanceSort
        value={value}
        isOpen={isOpen}
        onToggle={onToggle}
        onChange={onChange}
      />

      <span className="font-S-500 text-text-tertiary">Results {resultsCount}</span>
    </div>
  );
}