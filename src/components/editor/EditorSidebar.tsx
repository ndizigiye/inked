export function EditorSidebar() {
  return (
    <div className="fixed right-12 top-48 hidden xl:flex flex-col gap-8 w-64">
      {/* Writing Tip */}
      <div className="bg-surface-container-low p-6 rounded-lg border-l-4 border-primary-container">
        <h4 className="font-headline font-bold text-sm text-primary mb-2 uppercase tracking-tighter">
          Writing Tip
        </h4>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Focus on the &apos;Hook&apos;. The first 100 words of your digital
          manuscript determine if the reader stays for the performance.
        </p>
      </div>

      {/* Analytics Forecast */}
      <div className="bg-surface-container p-6 rounded-lg">
        <h4 className="font-headline font-bold text-sm text-on-surface mb-4 uppercase tracking-tighter">
          Analytics Forecast
        </h4>
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">
              Readability
            </span>
            <span className="text-xs font-bold text-primary">High</span>
          </div>
          <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="bg-primary-container h-full w-[85%]" />
          </div>
          <div className="flex justify-between items-end">
            <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">
              Engagement
            </span>
            <span className="text-xs font-bold text-tertiary">
              Likely Viral
            </span>
          </div>
          <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
            <div className="bg-tertiary h-full w-[92%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
