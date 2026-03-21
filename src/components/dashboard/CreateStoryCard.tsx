import { createStory } from "@/lib/actions/stories";

export function CreateStoryCard() {
  return (
    <form action={createStory}>
      <button
        type="submit"
        className="w-full h-full bg-surface-container border-2 border-dashed border-outline-variant/20 rounded-xl flex flex-col items-center justify-center p-12 hover:border-primary-container/40 hover:bg-surface-container-high transition-all group min-h-[280px]"
      >
        <div className="w-16 h-16 rounded-full bg-primary-container/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-primary-container text-4xl">
            add
          </span>
        </div>
        <span className="text-on-surface font-headline font-bold text-lg uppercase tracking-tight">
          Create New Story
        </span>
        <span className="text-outline text-xs mt-2 uppercase tracking-widest font-label">
          Open the editor
        </span>
      </button>
    </form>
  );
}
