"use client";

type Props = {
  suggestions: string[];
  query: string;
  onSuggestionClick: (value: string) => void;
};

function highlightMatch(text: string, query: string) {
  if (!query.trim()) {
    return (
      <span className="font-M-500 text-text-secondary">
        {text}
      </span>
    );
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchIndex = lowerText.indexOf(lowerQuery);

  if (matchIndex === -1) {
    return (
      <span className="font-M-500 text-text-secondary">
        {text}
      </span>
    );
  }

  const before = text.slice(0, matchIndex);
  const match = text.slice(matchIndex, matchIndex + query.length);
  const after = text.slice(matchIndex + query.length);

  return (
    <>
      {before && (
        <span className="font-M-500 text-text-secondary">
          {before}
        </span>
      )}
      <span className="font-M-600 text-text-primary">
        {match}
      </span>
      {after && (
        <span className="font-M-500 text-text-secondary">
          {after}
        </span>
      )}
    </>
  );
}

export default function SuggestionColumn({
  suggestions,
  query,
  onSuggestionClick,
}: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <h3 className="font-M-500 text-text-tertiary uppercase">Suggestions</h3>

      <div className="flex flex-col gap-2">
        {suggestions.length > 0 ? (
          suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestionClick(suggestion)}
              className="w-fit text-left hover:cursor-pointer transition-colors duration-300"
            >
              {highlightMatch(suggestion, query)}
            </button>
          ))
        ) : (
          <p className="font-M-500 text-text-primary">No suggestions found</p>
        )}
      </div>
    </div>
  );
}