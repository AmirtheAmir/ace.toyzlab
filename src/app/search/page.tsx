import SearchResultPage from "@/app/search/SearchResultPage";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;
  const query = q ?? "";

  return <SearchResultPage query={query} />;
}