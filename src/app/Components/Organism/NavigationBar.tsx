// src/app/components/organisms/NavigationBar.tsx
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

      <div className="w-full border-b border-black/40 bg-white">
        <div
          ref={rootRef}
          className="mx-auto max-w-[1280px] h-12 flex items-stretch"
        >
          {/* Left molecule */}
          <div className="flex-none">
            <NavLeft openMenu={openMenu} setOpenMenu={setOpenMenu} />
          </div>

          {/* Center logo area (mx-auto keeps it centered) */}
          <div className="mx-auto flex items-stretch min-w-0">
            <div className="w-[520px] bg-black border-x border-black/40 flex items-center justify-center">
              <LogoIcon className="h-5 w-auto text-white" />
            </div>
          </div>

          {/* Right molecule */}
          <div className="flex-none">
            <NavRight openMenu={openMenu} setOpenMenu={setOpenMenu} />
          </div>
        </div>
      </div>
    </>
  );
}