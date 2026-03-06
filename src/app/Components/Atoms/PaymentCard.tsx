import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function PaymentCard({ src, alt, className = "" }: Props) {
  return (
    <div className={["w-auto", className].join(" ")}>
      <Image
        src={src}
        alt={alt}
        width={44}
        height={28}
        className="object-contain"
      />
    </div>
  );
}