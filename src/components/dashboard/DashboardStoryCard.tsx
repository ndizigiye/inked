"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteStory } from "@/lib/actions/stories";
import type { Story } from "@/types";

interface DashboardStoryCardProps {
  story: Story;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function DashboardStoryCard({ story }: DashboardStoryCardProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this story? This action cannot be undone.")) return;
    setDeleting(true);
    await deleteStory(story.id);
  }

  return (
    <article className="bg-surface-container-low rounded-xl overflow-hidden card-hover transition-all duration-300 group">
      {/* Cover */}
      <div className="relative h-48 w-full">
        {story.cover_url ? (
          <img
            src={story.cover_url}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-container/10 to-surface-container" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-surface-dim/80 backdrop-blur-md text-tertiary text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter">
            {story.read_time_min} min read
          </span>
          <span
            className={`text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter ${
              story.status === "published"
                ? "bg-primary-container text-on-primary-container"
                : story.status === "archived"
                ? "bg-surface-container-highest text-outline"
                : "bg-surface-container-highest text-secondary"
            }`}
          >
            {story.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-black font-headline text-on-surface group-hover:text-primary transition-colors">
            {story.title || "Untitled Story"}
          </h3>
          <p className="text-secondary/70 text-sm line-clamp-2 mt-2 font-body">
            {story.excerpt || story.body?.slice(0, 120) || "No content yet…"}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/10">
          <div className="flex gap-2">
            <Link
              href={`/stories/${story.id}/edit`}
              className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <span className="material-symbols-outlined text-sm">edit</span>{" "}
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors text-xs font-bold uppercase tracking-widest disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-sm">delete</span>{" "}
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
          <span className="text-[10px] text-outline uppercase font-label">
            Modified {timeAgo(story.updated_at)}
          </span>
        </div>
      </div>
    </article>
  );
}
