import type { StoryWithAuthor } from "@/types";

interface StoryHeaderProps {
  story: StoryWithAuthor;
}

export function StoryHeader({ story }: StoryHeaderProps) {
  return (
    <header className="mb-12 space-y-8">
      {/* Cover Image */}
      {story.cover_url && (
        <div className="w-full aspect-[21/9] rounded-xl overflow-hidden mb-12 bg-surface-container">
          <img
            src={story.cover_url}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Genre */}
      {story.genre && (
        <div className="flex gap-4 items-center">
          <span className="bg-primary-container text-on-primary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded">
            {story.genre}
          </span>
        </div>
      )}

      {/* Title */}
      <h1 className="font-headline text-5xl md:text-7xl font-black tracking-tighter leading-tight text-on-surface">
        {story.title || "Untitled"}
      </h1>

      {/* Excerpt */}
      {story.excerpt && (
        <p className="text-on-surface-variant text-xl leading-relaxed opacity-80 max-w-2xl">
          {story.excerpt}
        </p>
      )}

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-outline-variant/10">
        {story.profiles?.avatar_url ? (
          <img
            src={story.profiles.avatar_url}
            alt={story.profiles.display_name ?? ""}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant" aria-hidden="true">
              person
            </span>
          </div>
        )}
        <div>
          <p className="font-bold text-sm tracking-tight uppercase">
            {story.profiles?.display_name ?? story.profiles?.username}
          </p>
          <p className="text-tertiary text-[10px] font-bold uppercase">
            Author
          </p>
        </div>
      </div>
    </header>
  );
}
