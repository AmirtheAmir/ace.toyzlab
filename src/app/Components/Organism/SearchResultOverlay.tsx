"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import SearchResultContent from "../Molecules/SearchResultContent";
import { itemData } from "../../../data/ItemData";

type Props = {
  query: string;
  onSuggestionClick: (value: string) => void;
  onCloseOverlay: () => void;
};

export default function SearchResultOverlay({
  query,
  onSuggestionClick,
  onCloseOverlay,
}: Props) {
  const router = useRouter();

  const normalizedQuery = query.trim().toLowerCase();

  const suggestions = useMemo(() => {
    if (!normalizedQuery) return [];

    const allTags = itemData.flatMap((item) => item.tags);

    return [...new Set(allTags)]
      .filter((tag) => tag.toLowerCase().includes(normalizedQuery))
      .slice(0, 4);
  }, [normalizedQuery]);

  const products = useMemo(() => {
    if (!normalizedQuery) return [];

    return itemData
      .filter((item) => {
        const matchName = item.name.toLowerCase().includes(normalizedQuery);
        const matchTag = item.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedQuery)
        );

        return matchName || matchTag;
      })
      .slice(0, 4);
  }, [normalizedQuery]);

  if (!normalizedQuery) return null;

  const handleSearchSubmit = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    onCloseOverlay();
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSuggestionSearch = (value: string) => {
    onSuggestionClick(value);
    onCloseOverlay();
    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  const handleProductClick = () => {
    onCloseOverlay();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm " />

      <div className="absolute left-0 top-full z-70 mt-px w-full ring ring-border-primary">
        <SearchResultContent
          query={query}
          suggestions={suggestions}
          products={products}
          onSuggestionClick={handleSuggestionSearch}
          onSearchSubmit={handleSearchSubmit}
          onProductClick={handleProductClick}
        />
      </div>
    </>
  );
}
