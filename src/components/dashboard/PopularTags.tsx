const TAGS = [
  "Noir",
  "Sci-Fi",
  "Philosophy",
  "Digital Art",
  "Future",
  "Drama",
  "Horror",
  "Romance",
];

export function PopularTags() {
  return (
    <div className="bg-surface-container-low p-8 rounded-xl">
      <h4 className="font-headline font-black text-xl text-on-surface uppercase tracking-tight mb-6">
        Popular Tags
      </h4>
      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="bg-surface-container-highest px-3 py-1.5 rounded-md text-[10px] font-bold text-secondary uppercase tracking-widest cursor-pointer hover:bg-primary-container hover:text-on-primary transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
