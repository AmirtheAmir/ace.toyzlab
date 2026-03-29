"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Overlay from "../atoms/Overlay";
import NavigationItemProductPages from "../molecules/NavigationItemProductPages";
import NavigationItemIcons from "../molecules/NavigationItemIcons";
import NavigationSearchMode from "../molecules/NavigationSearchMode";
import NavigationItemProfileMode from "../molecules/NavigationItemProfileMode";
import ThreeDotLoader from "../atoms/ThreeDotLoader";
import { LogoIcon } from "../../../../public/Icons";
import { getSupabase } from "@/lib/supabase";
import NavigationBurgerButton from "../molecules/NavigationBurgerButton";
import NavigationMobileMenu from "../molecules/NavigationMobileMenu";
import useIsMobileNav from "@/app/hooks/useIsMobileNav";

type NavMode = "default" | "search" | "profile";
type AccountTab = "profile" | "orders";

const MOBILE_MENU_KEY = "mobile-menu";
const MOBILE_SUBMENU_PREFIX = "mobile-submenu:";

export default function Navigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsKey = searchParams.toString();
  const currentRoute = searchParamsKey ? `${pathname}?${searchParamsKey}` : pathname;
  const isAccountRoute = pathname?.startsWith("/account") ?? false;
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [navMode, setNavMode] =
    useState<Exclude<NavMode, "profile">>("default");
  const [accountTab, setAccountTab] = useState<AccountTab>("profile");
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const isMobileNav = useIsMobileNav();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewMode: NavMode =
    navMode === "search" ? "search" : isAccountRoute ? "profile" : "default";
  const isMobileMenuOpen =
    openMenu === MOBILE_MENU_KEY ||
    (openMenu?.startsWith(MOBILE_SUBMENU_PREFIX) ?? false);
  const mobileSubmenuOpen = openMenu?.startsWith(MOBILE_SUBMENU_PREFIX)
    ? openMenu.slice(MOBILE_SUBMENU_PREFIX.length)
    : null;
  const isDesktopOverlayMenuOpen =
    openMenu === "collectors" || openMenu === "motorsports" || openMenu === "currency";
  const isMobileOverlayMenuOpen = isMobileMenuOpen || openMenu === "currency";
  const showOverlay = isMobileNav ? isMobileOverlayMenuOpen : isDesktopOverlayMenuOpen;

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsRouteLoading(false);
      setOpenMenu(null);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [pathname, searchParamsKey, isMobileNav]);

  useEffect(() => {
    if (!isRouteLoading) return;

    const timeout = window.setTimeout(() => {
      setIsRouteLoading(false);
    }, 10000);

    return () => window.clearTimeout(timeout);
  }, [isRouteLoading]);

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
        if (navMode === "search") {
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

  const onNavigationStart = (href: string) => {
    const normalizedHref = href.startsWith("/") ? href : `/${href}`;

    if (normalizedHref === currentRoute) {
      return;
    }

    setIsRouteLoading(true);
  };

  const onSignOut = async () => {
    const supabase = getSupabase();
    if (!supabase) return;

    await supabase.auth.signOut();
    setNavMode("default");
    onNavigationStart("/auth");
    router.replace("/auth");
  };

  const onSelectAccountTab = (tab: AccountTab) => {
    const href = `/account?tab=${tab}`;

    onNavigationStart(href);
    setAccountTab(tab);
    router.push(href);
  };

  return (
    <>
      {isRouteLoading && (
        <div className="fixed inset-0 z-[70] bg-bg-base/85">
          <ThreeDotLoader className="min-h-screen" />
        </div>
      )}

      <Overlay open={showOverlay} onClose={() => setOpenMenu(null)} />

      <div className="sticky top-2 z-50 w-full bg-bg-base">
        <div ref={rootRef} className="relative w-full">
          {navMode === "search" ? (
            <NavigationSearchMode
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              onCloseSearch={() => {
                setNavMode("default");
                setOpenMenu(null);
              }}
            />
          ) : (
            <div className="w-full ring ring-border-primary">
              <div className="flex w-full ">
                <div className="shrink-0">
                  {isMobileNav ? (
                    <NavigationBurgerButton
                      active={isMobileMenuOpen}
                      onClick={() => setOpenMenu(isMobileMenuOpen ? null : MOBILE_MENU_KEY)}
                    />
                  ) : viewMode === "profile" ? (
                    <NavigationItemProfileMode
                      activeTab={accountTab}
                      onSelectTab={onSelectAccountTab}
                      onSignOut={onSignOut}
                    />
                  ) : (
                    <NavigationItemProductPages
                      openMenu={openMenu}
                      setOpenMenu={setOpenMenu}
                      onNavigateStart={onNavigationStart}
                    />
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
                    <LogoIcon className="text-brand-primary transition-opacity duration-300 hover:opacity-80" />
                  </Link>
                </div>

                <div className="shrink-0">
                  <NavigationItemIcons
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    setNavMode={setNavMode}
                  />
                </div>
              </div>

              {isMobileNav && isMobileMenuOpen && (
                <NavigationMobileMenu>
                  {viewMode === "profile" ? (
                    <NavigationItemProfileMode
                      activeTab={accountTab}
                      onSelectTab={(tab) => {
                        onSelectAccountTab(tab);
                        setOpenMenu(null);
                      }}
                      onSignOut={async () => {
                        await onSignOut();
                        setOpenMenu(null);
                      }}
                    />
                  ) : (
                    <NavigationItemProductPages
                      openMenu={mobileSubmenuOpen}
                      setOpenMenu={(value) => {
                        if (value === null) {
                          setOpenMenu(null);
                          return;
                        }

                        setOpenMenu(`${MOBILE_SUBMENU_PREFIX}${value}`);
                      }}
                      onNavigateStart={onNavigationStart}
                    />
                  )}
                </NavigationMobileMenu>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
