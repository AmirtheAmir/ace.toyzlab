"use client";

import React from "react";
import { ProductItem } from "@/data/ItemData";
import ProductGallery from "../molecules/ProductPagesSideGallery";
import ProductInfo from "../molecules/ProductPageInformation";

type Props = {
  product: ProductItem;
};

export default function ProductDetailsSection({ product }: Props) {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-[96px_1fr_420px] py-6 gap-4">
      <ProductGallery
        name={product.name}
        mainImage={product.mainImage}
        gallery={product.gallery ?? []}
      />

      <ProductInfo product={product} />
    </section>
  );
}