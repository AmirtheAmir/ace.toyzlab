import { notFound } from "next/navigation";
import { itemData } from "@/data/ItemData";
import ProductDetailsSection from "@/app/Components/Organism/ProductDetailsSection";
import RelatedProducts from "@/app/Components/Organism/RelatedProducts";

type Props = {
  params: Promise<{
    productSlug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { productSlug } = await params;

  const product = itemData.find((item) => item.slug === productSlug);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex flex-col gap-2">
      <ProductDetailsSection product={product} />
      <RelatedProducts currentProductId={product.id} />
    </main>
  );
}