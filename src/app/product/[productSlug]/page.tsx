import { notFound } from "next/navigation";
import { itemData } from "@/data/ItemData";
import ProductDetailsSection from "@/app/components/organisms/ProductPageDetails";
import RelatedProducts from "@/app/components/organisms/ProductsRelated";

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