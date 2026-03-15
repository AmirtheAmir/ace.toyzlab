import { notFound } from "next/navigation";
import CollectionPageView from "@/app/components/organisms/CollectionPageContainer";
import { itemData } from "@/data/ItemData";

const validSlugs = [
  "all",
  "classic",
  "tactical",
  "glasses",
  "lighter",
  "aggregat",
] as const;

type CollectionSlug = (typeof validSlugs)[number];

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function isValidSlug(slug: string): slug is CollectionSlug {
  return validSlugs.includes(slug as CollectionSlug);
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;

  if (!isValidSlug(slug)) {
    notFound();
  }

  const products =
    slug === "all"
      ? itemData
      : itemData.filter((item) => item.collection === slug);

  return <CollectionPageView slug={slug} initialProducts={products} />;
}