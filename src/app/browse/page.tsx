import { createClient } from "@/lib/supabase/server";
import { TopNavBar } from "@/components/layout/TopNavBar";
import { Footer } from "@/components/layout/Footer";
import { StoryCard } from "@/components/story/StoryCard";
import { MobileSortSelect } from "@/components/browse/MobileSortSelect";
import { getBrowseStories, type BrowseSort } from "@/lib/queries/stories";
import type { Metadata } from "next";
import type { StoryWithAuthor } from "@/types";
import Link from "next/link";

export const metadata: Metadata = { title: "Browse" };

const GENRES = ["All", "Fiction", "Non-fiction", "Poetry", "Essays", "Thriller", "Horror", "Romance"];
const SORTS: { value: BrowseSort; label: string }[] = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "short", label: "Short reads" },
];

interface PageProps {
  searchParams: Promise<{ genre?: string; sort?: string }>;
}

export default async function BrowsePage({ searchParams }: PageProps) {
  const { genre = "all", sort = "latest" } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  // NOTE: getBrowseStories creates its own client internally
  const stories = await getBrowseStories(
    genre.toLowerCase(),
    (["latest", "popular", "short"].includes(sort) ? sort : "latest") as BrowseSort
  ) as StoryWithAuthor[];

  const activeGenre = genre.toLowerCase();
  const activeSort = sort.toLowerCase();

  return (
    <div className="min-h-screen flex flex-col">
      <TopNavBar user={user} profile={profile} />

      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-tertiary font-label uppercase tracking-widest text-[9px] font-black mb-1">
              Discover
            </p>
            <h1 className="font-headline text-4xl font-black tracking-tight uppercase">
              BROWSE <span className="text-primary-container">MANUSCRIPTS</span>
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar — desktop */}
            <aside className="hidden lg:block w-52 flex-shrink-0 space-y-6">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-primary-container mb-3">
                  Genre
                </p>
                <div className="flex flex-col gap-1">
                  {GENRES.map((g) => {
                    const val = g.toLowerCase();
                    const isActive = activeGenre === val;
                    return (
                      <Link
                        key={g}
                        href={`/browse?genre=${val === "all" ? "all" : g.toLowerCase()}&sort=${activeSort}`}
                        className={`px-3 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                          isActive
                            ? "bg-primary-container text-on-primary"
                            : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                        }`}
                      >
                        {g}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-primary-container mb-3">
                  Sort By
                </p>
                <div className="flex flex-col gap-1">
                  {SORTS.map(({ value, label }) => (
                    <Link
                      key={value}
                      href={`/browse?genre=${activeGenre}&sort=${value}`}
                      className={`px-3 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                        activeSort === value
                          ? "bg-surface-container-highest text-on-surface"
                          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>

            {/* Mobile filters */}
            <div className="lg:hidden">
              <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-none">
                {GENRES.map((g) => {
                  const val = g.toLowerCase();
                  const isActive = activeGenre === val;
                  return (
                    <Link
                      key={g}
                      href={`/browse?genre=${val}&sort=${activeSort}`}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? "bg-primary-container text-on-primary"
                          : "bg-surface-container text-on-surface-variant"
                      }`}
                    >
                      {g}
                    </Link>
                  );
                })}
              </div>
              <MobileSortSelect activeGenre={activeGenre} activeSort={activeSort} sorts={SORTS} />
            </div>

            {/* Story grid */}
            <div className="flex-1">
              {stories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <span className="material-symbols-outlined text-on-surface-variant/30 text-6xl mb-4" aria-hidden="true">
                    auto_stories
                  </span>
                  <p className="font-headline font-black text-xl uppercase text-on-surface-variant/50">
                    No manuscripts found
                  </p>
                  <p className="text-on-surface-variant text-sm mt-2 opacity-50">
                    Try a different genre or check back later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stories.map((story) => (
                    <StoryCard key={story.id} story={story} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
