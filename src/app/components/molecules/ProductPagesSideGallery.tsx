"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { getProductImageUrl } from "@/lib/storage";

type Props = {
  name: string;
  mainImage: string;
  gallery: string[];
};

export default function ProductPagesSideGallery({
  name,
  mainImage,
  gallery,
}: Props) {
  const images = useMemo(() => [mainImage, ...gallery], [mainImage, gallery]);
  const [selectedImage, setSelectedImage] = useState(mainImage);

  return (
    <div className="xl:col-span-2 flex flex-col xl:flex-row gap-4">
      
      {/* MAIN IMAGE */}
      <div className="relative w-full sm:h-104 h-68 xl:flex-1 order-1 xl:order-2">
        <Image
          src={getProductImageUrl(selectedImage)}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 60vw"
          priority
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex flex-row py-0.5 xl:flex-col gap-4 xl:w-32 shrink-0 order-2 xl:order-1 overflow-x-auto xl:overflow-visible">
        {images.map((img, index) => (
          <button
            key={`${img}-${index}`}
            type="button"
            onClick={() => setSelectedImage(img)}
            className="relative  size-32 xl:w-full xl:aspect-square shrink-0 overflow-hidden ring ring-border-primary"
          >
            <Image
              src={getProductImageUrl(img)}
              alt={`${name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}