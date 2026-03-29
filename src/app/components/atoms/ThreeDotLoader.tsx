"use client";

import { motion } from "motion/react";

type ThreeDotLoaderProps = {
  className?: string;
  label?: string;
};

export default function ThreeDotLoader({
  className = "",
  label = "Loading page",
}: ThreeDotLoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={["w-full min-h-[40vh] flex items-center justify-center", className].join(
        " "
      )}
    >
      <div className="flex items-end gap-2" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.span
            key={index}
            className="h-3 w-3 rounded-full bg-brand-primary"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.55,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.12,
            }}
          />
        ))}
      </div>
    </div>
  );
}
