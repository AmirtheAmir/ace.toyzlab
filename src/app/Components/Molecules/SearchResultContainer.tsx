"use client";

import { RightArrowIcon } from "../../../../public/Icons";
import { ProductItem } from "../../../data/ItemData";
import SuggestionColumn from "../atoms/SearchOverlaySuggestion";
import ProductColumn from "../atoms/SearchOverlayProducts";

type Props = {
  query: string;
  suggestions: string[];
  products: ProductItem[];
  onSuggestionClick: (value: string) => void;
  onSearchSubmit: () => void;
  onProductClick: () => void;
};

export default function SearchResultContent({
  query,
  suggestions,
  products,
  onSuggestionClick,
  onSearchSubmit,
  onProductClick,
}: Props) {
  return (
    <div className="flex flex-col ring ring-border-primary gap-2 bg-bg-base p-4 w-full">
      <div className="grid grid-cols-2 gap-4">
        <SuggestionColumn
          suggestions={suggestions}
          query={query}
          onSuggestionClick={onSuggestionClick}
        />

        <ProductColumn products={products} onProductClick={onProductClick} />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSearchSubmit}
          className="flex items-center hover:cursor-pointer gap-2 font-S-500 text-text-primary hover:text-text-secondary transition-colors duration-300"
        >
          <span>Search for “{query}”</span>
          <RightArrowIcon />
        </button>
      </div>
    </div>
  );
}
