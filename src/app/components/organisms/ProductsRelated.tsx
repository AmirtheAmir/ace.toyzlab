import ProductCard from "../molecules/ProductCard";
import { getSupabase } from "@/lib/supabase";
import { mapProductRow } from "@/lib/productMapper";
import type { ProductRow } from "@/types/product";

type Props = {
  currentProductId: string;
};

function shuffleArray<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default async function ProductsRelated({ currentProductId }: Props) {
  const supabase = getSupabase();
  if (!supabase) {
    return null;
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
    .neq("id", currentProductId);

  if (error) {
    return null;
  }

  const products = ((data ?? []) as ProductRow[]).map(mapProductRow);
  const randomProducts = shuffleArray(products).slice(0, 3);

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-L-600 text-text-primary">You May Also Like</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {randomProducts.map((item) => (
          <ProductCard
            key={item.id}
            slug={item.slug}
            name={item.name}
            image={item.mainImage}
            price={item.price}
            oldPrice={item.oldPrice}
            soldOut={item.soldOut}
          />
        ))}
      </div>
    </section>
  );
}
