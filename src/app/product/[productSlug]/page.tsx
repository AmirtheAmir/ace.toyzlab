import { notFound } from "next/navigation";
import ProductPageDetails from "@/app/components/organisms/ProductPageDetails";
import ProductsRelated from "@/app/components/organisms/ProductsRelated";
import { getSupabase } from "@/lib/supabase";
import { mapProductRow } from "@/lib/productMapper";
import type { ProductRow } from "@/types/product";

type Props = {
  params: Promise<{
    productSlug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const supabase = getSupabase();
  if (!supabase) {
    notFound();
  }

  const { productSlug } = await params;

  const { data, error } = await supabase
    .from("products")
    .select(`
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
    `)
    .eq("slug", productSlug)
    .single();

  if (error || !data) {
    notFound();
  }

  const product = mapProductRow(data as ProductRow);

  return (
    <main className="flex flex-col gap-2">
      <ProductPageDetails product={product} />
      <ProductsRelated currentProductId={product.id} />
    </main>
  );
}
