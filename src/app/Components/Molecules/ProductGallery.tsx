"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { getProductImageUrl } from "@/lib/storage";

type Props = {
  name: string;
  mainImage: string;
  gallery: string[];
};

export default function ProductGallery({ name, mainImage, gallery }: Props) {
  const images = useMemo(() => [mainImage, ...gallery], [mainImage, gallery]);
  const [selectedImage, setSelectedImage] = useState(mainImage);

  return (
    <div className="xl:col-span-2 flex gap-4 min-h-174 items-stretch">
      <div className="flex flex-col gap-4 w-32 shrink-0 h-full">
        {images.map((img, index) => (
          <button
            key={`${img}-${index}`}
            type="button"
            onClick={() => setSelectedImage(img)}
            className="relative aspect-square w-full overflow-hidden ring ring-border-primary"
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

      <div className="relative flex-1 ring self-stretch min-h-174">
        <Image
          src={getProductImageUrl(selectedImage)}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 60vw"
          priority
        />
      </div>
    </div>
  );
}