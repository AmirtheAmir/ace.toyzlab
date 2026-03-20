import { notFound } from "next/navigation";
import CollectionPageContainer from "@/app/components/organisms/CollectionPageContainer";
import { getSupabase } from "@/lib/supabase";
import { mapProductRow } from "@/lib/productMapper";
import type { ProductRow } from "@/types/product";

const validSlugs = [
  "all",
  "classics",
  "modern",
  "batman",
  "speed_racer",
  "ferrari",
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
  const supabase = getSupabase();
  if (!supabase) {
    notFound();
  }

  const { slug } = await params;

  if (!isValidSlug(slug)) {
    notFound();
  }

  let query = supabase.from("products").select(`
    id,
    slug,
    name,
    main_image,
    gallery,
    price,
    old_price,
    sold_out,
    tags,
    collection,
    description,
    postdescription,
    features
  `);

  if (slug !== "all") {
    query = query.eq("collection", slug);
  }

  const { data, error } = await query.order("name", { ascending: true });

  if (error) {
    notFound();
  }

  const products = ((data ?? []) as ProductRow[]).map(mapProductRow);

  return <CollectionPageContainer slug={slug} initialProducts={products} />;
}
