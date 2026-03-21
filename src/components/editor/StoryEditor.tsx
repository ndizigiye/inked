"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { updateStory } from "@/lib/actions/stories";
import { uploadCover } from "@/lib/actions/upload";
import { FloatingToolbar } from "./FloatingToolbar";
import { EditorSidebar } from "./EditorSidebar";
import { EditorNavBar } from "@/components/layout/EditorNavBar";
import type { Story } from "@/types";

interface StoryEditorProps {
  story: Story;
}

export function StoryEditor({ story: initialStory }: StoryEditorProps) {
  const [title, setTitle] = useState(initialStory.title);
  const [body, setBody] = useState(initialStory.body);
  const [genre, setGenre] = useState(initialStory.genre ?? "");
  const [coverUrl, setCoverUrl] = useState(initialStory.cover_url ?? "");
  const [status, setStatus] = useState(initialStory.status);
  const [savedAgo, setSavedAgo] = useState("Saved");
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = useCallback(
    async (t: string, b: string, g: string) => {
      setSaving(true);
      await updateStory(initialStory.id, {
        title: t,
        body: b,
        genre: g || undefined,
        excerpt: b.slice(0, 200),
      });
      setSaving(false);
      setSavedAgo("Saved just now");
    },
    [initialStory.id]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => save(title, body, genre), 2000);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [title, body, genre, save]);

  // Update savedAgo text over time
  useEffect(() => {
    const interval = setInterval(() => {
      if (!saving && savedAgo === "Saved just now") {
        setSavedAgo("Saved 1m ago");
      }
    }, 60_000);
    return () => clearInterval(interval);
  }, [saving, savedAgo]);

  async function handleCoverUpload(file: File) {
    const formData = new FormData();
    formData.append("cover", file);
    const result = await uploadCover(initialStory.id, formData);
    if (result.url) setCoverUrl(result.url);
  }

  const readTime = Math.max(
    1,
    Math.ceil(body.trim().split(/\s+/).filter(Boolean).length / 200)
  );

  return (
    <>
      <EditorNavBar
        storyId={initialStory.id}
        status={status as "draft" | "published" | "archived"}
        savedAgo={saving ? "Saving…" : savedAgo}
      />

      <FloatingToolbar />

      <main className="pt-32 pb-40 min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-0">
          {/* Cover Image */}
          <div className="mb-16">
            <label className="w-full aspect-[21/9] rounded-xl overflow-hidden bg-surface-container-low mb-12 group cursor-pointer relative border border-outline-variant/5 flex items-center justify-center block">
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleCoverUpload(file);
                }}
              />
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt="Story cover"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 bg-surface-container" />
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface/20 group-hover:bg-surface/10 transition-colors">
                <span className="material-symbols-outlined text-4xl text-primary-fixed mb-2">
                  add_a_photo
                </span>
                <span className="font-label text-xs uppercase tracking-widest text-primary-fixed">
                  {coverUrl ? "Update Cover Image" : "Add Cover Image"}
                </span>
              </div>
            </label>

            {/* Title */}
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Title Of Your Masterpiece"
              rows={2}
              className="w-full bg-transparent border-none focus:ring-0 text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-surface placeholder:text-surface-container-highest resize-none hide-scrollbar outline-none"
            />

            {/* Meta row */}
            <div className="flex items-center gap-6 mt-6 pb-8 border-b border-outline-variant/10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-label uppercase tracking-widest text-tertiary">
                  Genre
                </span>
                <input
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                  placeholder="e.g. Sci-Fi"
                  className="bg-surface-container-highest px-3 py-1 rounded text-xs font-bold text-primary outline-none focus:ring-1 focus:ring-primary-container/30 w-28"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-on-surface-variant">
                  schedule
                </span>
                <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">
                  Est. {readTime} Min Read
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <article>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell your story… let the manuscript flow."
              className="w-full min-h-[600px] bg-transparent border-none focus:ring-0 text-lg md:text-xl font-body leading-relaxed text-on-surface/90 placeholder:text-surface-container-highest resize-none outline-none"
            />
          </article>
        </div>
      </main>

      <EditorSidebar />
    </>
  );
}
