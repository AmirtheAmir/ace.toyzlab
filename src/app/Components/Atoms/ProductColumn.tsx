"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductItem } from "../../../data/ItemData";
import { getProductImageUrl } from "@/lib/storage";

type Props = {
  products: ProductItem[];
  onProductClick?: () => void;
};

export default function ProductColumn({
  products,
  onProductClick = () => {},
}: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <h3 className="font-M-500 text-text-tertiary uppercase">Products</h3>

      <div className="flex flex-col gap-2">
        {products.length > 0 ? (
          products.map((product) => {
            const imageUrl = getProductImageUrl(product.mainImage);

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onProductClick}
                className="flex items-center gap-4 transition-all duration-300 hover:ring hover:cursor-pointer"
              >
                <div className="relative h-21 w-21 shrink-0 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="84px"
                  />
                </div>

                <p className="font-S-500 text-text-primary">
                  {product.name}
                </p>
              </Link>
            );
          })
        ) : (
          <p className="font-M-500 text-text-primary">No products found</p>
        )}
      </div>
    </div>
  );
}
