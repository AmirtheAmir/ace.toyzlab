"use client";

import React, { useEffect, useRef, useState } from "react";
import Overlay from "../Atoms/Overlay";
import NavLeft from "../Molecules/NavLeft";
import NavRight from "../Molecules/NavRight";
import { LogoIcon } from "../../../../public/Icons";

export default function NavigationBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click + ESC
  useEffect(() => {
    function onDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el) return;
      if (openMenu && !el.contains(e.target as Node)) setOpenMenu(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  return (
    <>
      <Overlay open={!!openMenu} onClose={() => setOpenMenu(null)} />

      <div className="w-full ring ring-border-primary">
        <div ref={rootRef} className="flex w-full ">
          {/* Left */}
          <div className="shrink-0">
            <NavLeft openMenu={openMenu} setOpenMenu={setOpenMenu} />
          </div>

          {/* Center fills ALL remaining space */}
          <div className="flex-1 min-w-16 bg-bg-inverted flex items-center justify-center">
            <LogoIcon className="text-text-inverted" />
          </div>

          {/* Right */}
          <div className="shrink-0">
            <NavRight openMenu={openMenu} setOpenMenu={setOpenMenu} />
          </div>
        </div>
      </div>
    </>
  );
}
