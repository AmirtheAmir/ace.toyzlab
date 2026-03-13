"use client";
import { RightArrowIcon } from "../../../../public/Icons";
import React from "react";

type Props = {
  title?: string; // "AGGRAGAT CHRONO"
  subtitle?: string; // "Mechanical Precision Redefined"
  ctaLabel?: string; // "Check It Out"
  onCtaClick?: () => void;
  imageSrc?: string;
  className?: string;
};

export default function HeroSection({
  title = "AGGRAGAT CHRONO",
  subtitle = "Mechanical Precision Redefined",
  ctaLabel = "Check It Out",
  onCtaClick,
  imageSrc = "",
  className = "",
}: Props) {
  return (
    <section
      className={[
        "w-full h-130 overflow-hidden ring ring-border-primary",
        className,
      ].join(" ")}
    >
      <div className="relative w-full h-full">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${imageSrc})` }}
          aria-hidden="true"
        />

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            maskImage:
              "radial-gradient(circle at center, transparent 70%, black 90%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, transparent 100%, black 70%)",
          }}
          aria-hidden="true"
        />

        {/* Content wrapper: right aligned block, left aligned text inside */}
        <div className="relative h-full w-full flex justify-end">
          <div className="w-3/7 min-w-65 h-full p-4 flex flex-col justify-between text-left">
            {/* Top: subtitle + title */}
            <div className="select-none">
              <h2 className="mt-4 font-2XL-600 text-text-inverted leading-[0.95]">
                {title}
              </h2>
              <p className="font-L-600 text-text-inverted">{subtitle}</p>
            </div>

            {/* Bottom: CTA bar */}
            <button
              type="button"
              onClick={onCtaClick}
              className={[
                "w-full py-3.5 font-M-600",
                "flex items-center justify-center gap-3",
                "text-brand-primary",
                "border border-brand-primary",
                "bg-transparent hover:cursor-pointer hover:bg-black/35 transition-colors duration-300 ease-in",
              ].join(" ")}
            >
              {ctaLabel}
              <span className="inline-flex items-center justify-center ">
                <RightArrowIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
