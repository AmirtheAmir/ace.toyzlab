import HomePage from "../pages/Home/HomePage";
import { getSupabase } from "@/lib/supabase";
import { mapProductRow } from "@/lib/productMapper";
import type { ProductItem, ProductRow } from "@/types/product";

async function getHomeProducts(): Promise<ProductItem[]> {
  const supabase = getSupabase();

  if (!supabase) {
    return [];
  }

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
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to fetch home products", error);
    return [];
  }

  return ((data ?? []) as ProductRow[]).map(mapProductRow);
}

export default async function Page() {
  const products = await getHomeProducts();

  return <HomePage initialProducts={products} />;
}
