"use client";

import React from "react";
import Link from "next/link";
import { RightArrowIcon } from "../../../../public/Icons";

type Props = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  className?: string;
};

export default function HeroSection({
  title = "FERRARI TESTAROSSA",
  subtitle = "The Desert Rose Of Ferrari",
  ctaLabel = "Check It Out",
  ctaHref = "/product/testarossa-ferrari-1984",
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
        <div className="absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0" aria-hidden="true" />

        {/* Content wrapper */}
        <div className="relative h-full w-full flex justify-start">
          <div className="sm:w-1/2 w-2/3 content-in h-full p-4 @container flex flex-col justify-between text-left">
            {/* Top */}
            <div className="select-none @container">
              <h2 className="mt-4 sm:font-2XL-600 font-2XL-600-v2 text-text-primary leading-[0.95]">
                {title}
              </h2>
              <p className="font-L-600-clamp text-text-primary">{subtitle}</p>
            </div>

            {/* Bottom CTA */}
            <div className="flex w-full justify-start">
              <Link
                href={ctaHref}
                className={[
                  "py-3.5 sm:pl-8 sm:pr-6 pr-4 pl-5 self-start font-M-600 backdrop-blur-sm",
                  "flex items-center justify-center gap-1 sm:gap-2",
                  "text-text-primary",
                  "border border-border-primary",
                  "bg-transparent hover:cursor-pointer hover:bg-bg-inverted hover:text-text-inverted transition-colors duration-300 ease-in",
                ].join(" ")}
              >
                {ctaLabel}
                <span className="inline-flex items-center justify-center">
                  <RightArrowIcon />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}