"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { signOut } from "@/lib/actions/auth";
import type { Profile } from "@/types";

interface TopNavBarProps {
  user?: { id: string; email?: string } | null;
  profile?: Profile | null;
}

const navLinks = [
  { href: "/", label: "Browse" },
  { href: "/dashboard", label: "My Stories" },
  { href: "/collections", label: "Collections" },
];

export function TopNavBar({ user, profile }: TopNavBarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131313]/90 backdrop-blur-[10px] border-b border-white/5">
      <div className="flex justify-between items-center px-8 py-3 w-full max-w-[1920px] mx-auto">
        {/* Logo + Nav links */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-black text-[#ff6b00] tracking-tighter uppercase font-['Epilogue']"
          >
            inked
          </Link>

          <div className="hidden md:flex items-center gap-6 font-['Epilogue'] tracking-tight text-xs uppercase font-bold">
            {navLinks.map(({ href, label }) => {
              const isActive =
                href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={
                    isActive
                      ? "text-[#ff6b00] relative after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-[#ff6b00] after:rounded-full transition-all"
                      : "text-[#ffb693] opacity-60 hover:opacity-100 transition-all"
                  }
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden p-2 text-[#ffb693] opacity-70 hover:opacity-100 transition-opacity"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden lg:flex items-center bg-surface-container rounded-full px-3 py-1 gap-2 border border-outline-variant/10 focus-within:border-primary-container transition-all">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Search manuscripts..."
              className="bg-transparent border-none focus:ring-0 text-xs w-40 placeholder:text-on-surface-variant/40"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <button className="p-1.5 text-on-surface-variant hover:text-primary-container transition-colors">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </button>

              <Link
                href="/stories/new"
                className="bg-gradient-to-r from-primary-container to-[#7a3000] text-on-primary px-4 py-1.5 rounded font-headline font-black text-[11px] tracking-wider active:scale-95 duration-200 hover:shadow-[0_0_15px_rgba(255,107,0,0.2)] transition-all uppercase"
              >
                Create Story
              </Link>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  className="w-8 h-8 rounded-full bg-surface-container overflow-hidden border border-outline-variant/30 cursor-pointer active:scale-95 transition-transform"
                  title={profile?.display_name ?? user.email ?? "Profile"}
                >
                  {profile?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-on-surface-variant text-xl">
                      person
                    </span>
                  )}
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-surface-container border border-outline-variant/30 rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="px-4 py-2.5 border-b border-outline-variant/20">
                      <p className="text-xs text-on-surface-variant truncate font-label">
                        {profile?.display_name ?? user.email}
                      </p>
                    </div>
                    <form action={signOut}>
                      <button
                        type="submit"
                        className="w-full text-left px-4 py-2.5 text-sm text-primary hover:bg-surface-container-high transition-colors font-label flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-base">logout</span>
                        Sign out
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-primary font-medium opacity-80 hover:opacity-100 transition-opacity text-sm"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="bg-gradient-to-r from-primary-container to-[#7a3000] text-on-primary px-4 py-1.5 rounded font-headline font-black text-[11px] tracking-wider active:scale-95 hover:shadow-[0_0_15px_rgba(255,107,0,0.2)] transition-all uppercase"
              >
                Start Writing
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#131313]/95 backdrop-blur-[10px] px-6 py-4 flex flex-col gap-1">
          {/* Search */}
          <div className="flex items-center bg-surface-container rounded-full px-3 py-2 gap-2 border border-outline-variant/10 mb-3">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]" aria-hidden="true">search</span>
            <input
              type="text"
              placeholder="Search manuscripts..."
              className="bg-transparent border-none focus:ring-0 text-xs flex-1 placeholder:text-on-surface-variant/40"
            />
          </div>
          {navLinks.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`py-3 text-sm font-bold uppercase tracking-wider font-['Epilogue'] border-b border-white/5 last:border-0 transition-colors ${
                  isActive
                    ? "text-[#ff6b00]"
                    : "text-[#ffb693] opacity-60 hover:opacity-100"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
