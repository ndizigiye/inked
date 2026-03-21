interface ActivityItem {
  type: "read" | "comment" | "milestone" | "featured";
  title: string;
  description: string;
  timeAgo: string;
}

const PLACEHOLDER_ACTIVITY: ActivityItem[] = [
  {
    type: "comment",
    title: "New Reader Interaction",
    description: "Your story received a new comment.",
    timeAgo: "Just now",
  },
  {
    type: "featured",
    title: "Story Featured",
    description: "Your manuscript was featured on the landing page.",
    timeAgo: "4 hours ago",
  },
  {
    type: "milestone",
    title: "Milestone Reached",
    description: "You have written over 10,000 words this month.",
    timeAgo: "Yesterday",
  },
];

const dotColors: Record<string, string> = {
  comment: "bg-primary-container",
  featured: "bg-tertiary",
  read: "bg-primary",
  milestone: "bg-surface-container-highest",
};

export function ActivityFeed() {
  return (
    <div className="bg-surface-container p-8 rounded-xl border-l-4 border-primary-container">
      <h4 className="font-headline font-black text-xl text-on-surface uppercase tracking-tight mb-6 flex items-center gap-3">
        Recent Activity{" "}
        <span className="material-symbols-outlined text-primary-container">
          bolt
        </span>
      </h4>

      <div className="space-y-6">
        {PLACEHOLDER_ACTIVITY.map((item, i) => (
          <div key={i} className="flex gap-4">
            <div
              className={`w-2 h-2 rounded-full ${dotColors[item.type] ?? "bg-primary"} mt-1.5 shrink-0`}
            />
            <div>
              <p className="text-sm font-bold text-on-surface">{item.title}</p>
              <p className="text-xs text-secondary/60 mt-1 font-body">
                {item.description}
              </p>
              <span className="text-[10px] text-outline uppercase font-label mt-2 block">
                {item.timeAgo}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
