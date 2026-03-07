"use client";

type Props = {
  suggestions: string[];
  onSuggestionClick: (value: string) => void;
};

export default function SuggestionColumn({
  suggestions,
  onSuggestionClick,
}: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <h3 className="font-S-500 text-text-tertiary uppercase">Suggestions</h3>

      <div className="flex flex-col gap-3">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestionClick(suggestion)}
              className="w-fit text-left font-M-500 text-text-primary hover:text-text-secondary transition-colors duration-200"
            >
              {suggestion}
            </button>
          ))
        ) : (
          <p className="font-M-500 text-text-tertiary">No suggestions found</p>
        )}
      </div>
    </div>
  );
}