"use client";

import Link from "next/link";
import { publishStory } from "@/lib/actions/stories";

interface EditorNavBarProps {
  storyId: string;
  status: "draft" | "published" | "archived";
  savedAgo?: string;
}

export function EditorNavBar({ storyId, status, savedAgo }: EditorNavBarProps) {
  async function handlePublish() {
    await publishStory(storyId);
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
      <div className="flex justify-between items-center px-12 py-6 w-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <Link
            href="/dashboard"
            className="text-3xl font-black text-primary-container tracking-tighter uppercase font-headline active:scale-95 duration-200 transition-transform"
          >
            inked
          </Link>
          <div className="h-6 w-px bg-outline-variant/30 hidden md:block" />
          <div className="hidden md:flex items-center gap-4 text-on-surface-variant font-medium">
            <span className="text-sm uppercase tracking-widest text-primary">
              {status === "published" ? "Published" : "Drafting"}
            </span>
            {savedAgo && (
              <span className="text-xs opacity-40">{savedAgo}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href={`/story/${storyId}`}
            target="_blank"
            className="flex items-center gap-2 text-primary font-medium opacity-80 hover:text-primary-container transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">preview</span>
            <span className="hidden sm:inline">Preview</span>
          </Link>

          <form action={handlePublish}>
            <button
              type="submit"
              disabled={status === "published"}
              className="bg-gradient-to-r from-primary-container to-on-primary-fixed-variant text-on-primary px-6 py-2.5 rounded-md font-bold text-sm tracking-tight active:scale-95 duration-200 shadow-[0_0_15px_rgba(255,107,0,0.2)] hover:shadow-[0_0_25px_rgba(255,107,0,0.4)] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "published" ? "Published" : "Publish Story"}
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
