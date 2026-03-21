export function FloatingToolbar() {
  return (
    <nav className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-surface-container-highest/90 backdrop-blur-xl px-4 py-2 rounded-full flex items-center gap-1 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-outline-variant/10">
        <ToolbarButton icon="format_bold" />
        <ToolbarButton icon="format_italic" />
        <ToolbarButton icon="format_h1" />
        <ToolbarButton icon="format_quote" />
        <div className="w-px h-6 bg-outline-variant/30 mx-1" />
        <ToolbarButton icon="add_photo_alternate" />
        <ToolbarButton icon="link" />
        <div className="w-px h-6 bg-outline-variant/30 mx-1" />
        <ToolbarButton icon="settings" accent />
      </div>
    </nav>
  );
}

function ToolbarButton({
  icon,
  accent,
}: {
  icon: string;
  accent?: boolean;
}) {
  return (
    <button
      type="button"
      className={`p-2.5 hover:bg-surface-bright rounded-full transition-colors ${
        accent ? "text-primary" : "text-on-surface-variant"
      }`}
      aria-label={icon.replace(/_/g, " ")}
    >
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
}
