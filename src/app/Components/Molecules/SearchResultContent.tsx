"use client";

import { RightArrowIcon } from "../../../../public/Icons";
import { ProductItem } from "../../../Data/ItemData";
import SuggestionColumn from "../Atoms/SuggestionColumn";
import ProductColumn from "../Atoms/ProductColumn";

type Props = {
  query: string;
  suggestions: string[];
  products: ProductItem[];
  onSuggestionClick: (value: string) => void;
  onSearchSubmit: () => void;
};

export default function SearchResultContent({
  query,
  suggestions,
  products,
  onSuggestionClick,
  onSearchSubmit,
}: Props) {
  return (
    <div className="flex flex-col gap-8 bg-bg-base px-4 py-5 w-235.75">
      <div className="grid grid-cols-2 gap-10">
        <SuggestionColumn
          suggestions={suggestions}
          onSuggestionClick={onSuggestionClick}
        />

        <ProductColumn products={products} />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onSearchSubmit}
          className="flex items-center gap-2 font-M-500 text-text-primary hover:text-text-secondary transition-colors duration-200"
        >
          <span>Search for “{query}”</span>
          <RightArrowIcon />
        </button>
      </div>
    </div>
  );
}