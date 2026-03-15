"use client";

import React, { useEffect, useRef, useState } from "react";
import Overlay from "../atoms/Overlay";
import NavLeft from "../molecules/NavigationItemProductPages";
import NavRight from "../molecules/NavigationItemIcons";
import SearchNavRow from "../molecules/NavigationSearchMode";
import AccountNavLeft from "../molecules/NavigationItemAccount";
import { LogoIcon } from "../../../../public/Icons";
import Link from "next/link";

type NavMode = "default" | "account" | "search";

export default function NavigationBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [navMode, setNavMode] = useState<NavMode>("default");
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDown(e: MouseEvent) {
      const el = rootRef.current;
      if (!el) return;

      if (!el.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (navMode === "search" || navMode === "account") {
          setNavMode("default");
        }
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [navMode]);

  const showOverlay = !!openMenu;

  return (
    <>
      <Overlay open={showOverlay} onClose={() => setOpenMenu(null)} />

      <div className="sticky top-2 z-50 w-full bg-bg-base">
        <div ref={rootRef} className="w-full">
          {navMode === "search" ? (
            <SearchNavRow
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              onCloseSearch={() => {
                setNavMode("default");
                setOpenMenu(null);
              }}
            />
          ) : (
            <div className="w-full ring ring-border-primary">
              <div className="flex w-full">
                <div className="shrink-0">
                  {navMode === "account" ? (
                    <AccountNavLeft
                      onSignOut={() => setNavMode("default")}
                      onBackToDefault={() => setNavMode("default")}
                    />
                  ) : (
                    <NavLeft openMenu={openMenu} setOpenMenu={setOpenMenu} />
                  )}
                </div>

                <div className="flex min-w-16 flex-1 items-center justify-center bg-bg-inverted">
                  <Link
                    href="/"
                    onClick={() => {
                      setNavMode("default");
                      setOpenMenu(null);
                    }}
                    className="flex items-center justify-center"
                  >
                    <LogoIcon className="text-text-inverted hover:opacity-80 transition-opacity duration-200" />
                  </Link>
                </div>

                <div className="shrink-0">
                  <NavRight
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    navMode={navMode}
                    setNavMode={setNavMode}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
