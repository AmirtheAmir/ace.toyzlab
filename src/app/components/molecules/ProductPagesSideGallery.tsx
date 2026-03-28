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
  const isTwoImages = images.length === 2;

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
      <div
        className={`flex flex-row p-0.5 xl:flex-col gap-4 xl:w-32 shrink-0 order-2 xl:order-1 
  overflow-x-auto xl:overflow-visible ${
    isTwoImages ? "justify-start xl:justify-start" : ""
  }`}
      >
        {images.map((img, index) => (
          <button
            key={`${img}-${index}`}
            type="button"
            onClick={() => setSelectedImage(img)}
            className={`relative aspect-square overflow-hidden ring ring-border-primary shrink-0
    ${isTwoImages ? "w-1/3 xl:w-full flex-none" : "flex-1 xl:w-full"}`}
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
