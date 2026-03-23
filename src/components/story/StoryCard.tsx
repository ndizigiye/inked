import Link from "next/link";
import type { StoryWithAuthor } from "@/types";

interface StoryCardProps {
  story: StoryWithAuthor;
}

export function StoryCard({ story }: StoryCardProps) {
  const authorName =
    story.profiles?.display_name ?? story.profiles?.username ?? "Unknown";
  const authorAvatar = story.profiles?.avatar_url;

  return (
    <Link
      href={`/story/${story.id}`}
      className="group block bg-surface-container rounded-lg overflow-hidden hover:bg-surface-bright transition-all border border-transparent hover:border-primary-container/30"
    >
      {story.cover_url ? (
        <div className="aspect-video w-full overflow-hidden bg-surface-container-low">
          <img
            src={story.cover_url}
            alt={story.title ?? "Story cover"}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="aspect-video w-full bg-gradient-to-br from-primary-container/20 to-surface-container-low" />
      )}

      <div className="p-4 space-y-2">
        {story.genre && (
          <span className="text-[9px] font-black font-label uppercase tracking-widest text-tertiary">
            {story.genre}
          </span>
        )}

        <h3 className="font-headline font-black text-sm leading-tight line-clamp-2">
          {story.title || "Untitled"}
        </h3>

        {story.excerpt && (
          <p className="text-on-surface-variant text-xs line-clamp-2 opacity-70">
            {story.excerpt}
          </p>
        )}

        <div className="flex items-center gap-2 pt-1">
          {authorAvatar ? (
            <img
              src={authorAvatar}
              alt={authorName}
              className="w-5 h-5 rounded-full object-cover"
            />
          ) : (
            <div className="w-5 h-5 rounded-full bg-surface-container-highest flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant text-[12px]" aria-hidden="true">
                person
              </span>
            </div>
          )}
          <span className="text-[10px] font-bold uppercase tracking-tight text-on-surface-variant">
            {authorName}
          </span>
          <span className="text-on-surface-variant/30 text-[10px]">·</span>
          <span className="text-tertiary text-[10px] font-bold font-label">
            {story.read_time_min} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
