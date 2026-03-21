const WORDS_PER_MINUTE = 200;

export function calculateReadTime(text: string): number {
  if (!text) return 0;
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function formatReadTime(minutes: number): string {
  return `${minutes} min read`;
}
