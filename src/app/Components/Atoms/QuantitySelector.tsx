"use client";

import React from "react";
import { AddIcon, RemoveIcon } from "../../../../public/Icons";

type Props = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export default function QuantitySelector({
  quantity,
  onDecrease,
  onIncrease,
}: Props) {
  const isMin = quantity <= 1;

  return (
    <div className="flex px-6 py-3.5 self-start items-center gap-4 ring ring-border-primary">
      <button
        type="button"
        onClick={onDecrease}
        disabled={isMin}
        className={[
          "transition-colors duration-300",
          isMin
            ? "text-text-tertiary cursor-not-allowed"
            : "text-text-primary hover:text-text-secondary",
        ].join(" ")}
      >
        <RemoveIcon />
      </button>

      <span className="w-3 text-center font-M-500">{quantity}</span>

      <button
        type="button"
        onClick={onIncrease}
        className="text-text-primary transition-colors hover:text-text-secondary"
      >
        <AddIcon />
      </button>
    </div>
  );
}