"use client";

import Image from "next/image";
import { ProductItem } from "../../../Data/ItemData";

type Props = {
  products: ProductItem[];
};

export default function ProductColumn({ products }: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      <h3 className="font-S-500 text-text-tertiary uppercase">Products</h3>

      <div className="flex flex-col gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-4"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>

              <p className="font-M-500 text-text-primary">
                {product.name}
              </p>
            </div>
          ))
        ) : (
          <p className="font-M-500 text-text-tertiary">No products found</p>
        )}
      </div>
    </div>
  );
}