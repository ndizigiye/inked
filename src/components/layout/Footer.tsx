export function Footer() {
  return (
    <footer className="bg-surface w-full py-16 border-t border-outline-variant/15">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 space-y-8 md:space-y-0 w-full max-w-screen-2xl mx-auto">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="text-xl font-bold text-primary opacity-50 uppercase tracking-tighter font-headline">
            inked
          </span>
          <p className="font-label text-sm uppercase tracking-widest text-tertiary opacity-60">
            © 2024 inked. The Digital Manuscript.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 font-label text-sm uppercase tracking-widest">
          <a
            href="#"
            className="text-tertiary opacity-60 hover:text-primary-container transition-colors cursor-pointer"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-tertiary opacity-60 hover:text-primary-container transition-colors cursor-pointer"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-tertiary opacity-60 hover:text-primary-container transition-colors cursor-pointer"
          >
            Creative Guidelines
          </a>
          <a
            href="#"
            className="text-tertiary opacity-60 hover:text-primary-container transition-colors cursor-pointer"
          >
            Help Center
          </a>
        </div>

        <div className="flex gap-6">
          <span className="material-symbols-outlined text-primary opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
            share
          </span>
          <span className="material-symbols-outlined text-primary opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
            language
          </span>
        </div>
      </div>
    </footer>
  );
}
