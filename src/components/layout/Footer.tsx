"use client";

import { useState } from "react";
import Link from "next/link";

export function Footer() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <footer className="bg-[#131313] w-full py-8 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center px-8 space-y-4 md:space-y-0 w-full max-w-[1920px] mx-auto">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-lg font-black text-[#ffb693] opacity-50 uppercase tracking-tighter font-headline">
            inked
          </span>
          <p className="font-label text-[9px] uppercase tracking-[0.2em] text-[#9ccaff] opacity-40 mt-1">
            © {new Date().getFullYear()} inked. The Digital Manuscript.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 font-label text-[9px] uppercase tracking-widest font-black">
          <Link
            href="/terms"
            className="text-[#9ccaff] opacity-40 hover:opacity-100 hover:text-[#ff6b00] transition-colors cursor-pointer"
          >
            Terms
          </Link>
          <Link
            href="/privacy"
            className="text-[#9ccaff] opacity-40 hover:opacity-100 hover:text-[#ff6b00] transition-colors cursor-pointer"
          >
            Privacy
          </Link>
          <Link
            href="/guidelines"
            className="text-[#9ccaff] opacity-40 hover:opacity-100 hover:text-[#ff6b00] transition-colors cursor-pointer"
          >
            Guidelines
          </Link>
          <Link
            href="/help"
            className="text-[#9ccaff] opacity-40 hover:opacity-100 hover:text-[#ff6b00] transition-colors cursor-pointer"
          >
            Help
          </Link>
        </div>

        <div className="flex gap-4 items-center relative">
          <button
            aria-label="Share this page"
            onClick={handleShare}
            className="material-symbols-outlined text-[#ffb693] opacity-40 hover:opacity-100 cursor-pointer transition-opacity text-[18px]"
          >
            share
          </button>
          {copied && (
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-widest font-black text-[#ff6b00] whitespace-nowrap">
              Copied!
            </span>
          )}
          <button
            aria-label="Language"
            title="Language switching coming soon"
            className="material-symbols-outlined text-[#ffb693] opacity-40 hover:opacity-100 cursor-pointer transition-opacity text-[18px]"
          >
            language
          </button>
        </div>
      </div>
    </footer>
  );
}
