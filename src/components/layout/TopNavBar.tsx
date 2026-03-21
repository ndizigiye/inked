"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/actions/auth";
import type { Profile } from "@/types";

interface TopNavBarProps {
  user?: { id: string; email?: string } | null;
  profile?: Profile | null;
}

const navLinks = [
  { href: "/", label: "Browse" },
  { href: "/dashboard", label: "My Stories" },
];

export function TopNavBar({ user, profile }: TopNavBarProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
      <div className="flex justify-between items-center px-12 py-6 w-full max-w-screen-2xl mx-auto">
        {/* Logo + Nav links */}
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="text-3xl font-black text-primary-container tracking-tighter uppercase font-headline active:scale-95 transition-transform"
          >
            inked
          </Link>

          <div className="hidden md:flex items-center gap-8 font-headline tracking-tight">
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
                      ? "text-primary-container font-bold relative after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-primary-container after:rounded-full transition-all"
                      : "text-primary font-medium opacity-80 hover:text-primary-container hover:shadow-[0_0_15px_rgba(255,107,0,0.2)] transition-all"
                  }
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="hidden lg:flex items-center bg-surface-container rounded-full px-4 py-2 gap-3 border-b-2 border-outline-variant/20 focus-within:border-primary-container transition-all">
            <span className="material-symbols-outlined text-on-surface-variant text-xl">
              search
            </span>
            <input
              type="text"
              placeholder="Search manuscripts..."
              className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-on-surface-variant/50 outline-none font-label"
            />
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <button className="p-2 text-primary-fixed-dim hover:text-primary transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>

              <Link
                href="/stories/new"
                className="bg-gradient-to-r from-primary-container to-on-primary-fixed-variant text-on-primary px-6 py-2.5 rounded-md font-headline font-bold text-sm tracking-tight active:scale-95 duration-200 hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all uppercase"
              >
                Create Story
              </Link>

              <form action={signOut}>
                <button
                  type="submit"
                  className="w-10 h-10 rounded-full bg-surface-container overflow-hidden border border-outline-variant/30 cursor-pointer active:scale-95 transition-transform flex items-center justify-center"
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
              </form>
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
                className="bg-gradient-to-r from-primary-container to-on-primary-fixed-variant text-on-primary px-6 py-2.5 rounded-md font-headline font-bold text-sm tracking-tight active:scale-95 hover:shadow-[0_0_20px_rgba(255,107,0,0.3)] transition-all uppercase"
              >
                Start Writing
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
