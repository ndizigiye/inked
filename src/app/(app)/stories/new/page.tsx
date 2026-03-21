import { createStory } from "@/lib/actions/stories";

// This page immediately creates a new draft and redirects to the editor.
export default async function NewStoryPage() {
  await createStory(); // Redirects to /stories/[id]/edit
  // This line is never reached, but Next.js requires a return.
  return null;
}
