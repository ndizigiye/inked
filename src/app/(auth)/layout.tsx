export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-auth-mesh min-h-screen flex flex-col font-body text-on-surface">
      <header className="fixed top-0 w-full z-50 px-8 py-8 flex justify-between items-center">
        <a
          href="/"
          className="text-3xl font-black text-primary-container tracking-tighter uppercase font-headline active:scale-95 transition-transform"
        >
          inked
        </a>
        <div className="hidden md:flex gap-8 items-center">
          <span className="text-primary-fixed-dim font-medium text-sm tracking-widest uppercase">
            The Digital Manuscript
          </span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-6 py-24">
        {children}
      </main>

      <footer className="w-full py-8 border-t border-outline-variant/15 bg-surface-dim">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 space-y-4 md:space-y-0 max-w-screen-2xl mx-auto">
          <div className="text-xl font-bold text-primary opacity-50 font-headline uppercase tracking-tighter">
            inked
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="#"
              className="font-label text-sm uppercase tracking-widest text-tertiary opacity-60 hover:text-primary-container transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="font-label text-sm uppercase tracking-widest text-tertiary opacity-60 hover:text-primary-container transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-label text-sm uppercase tracking-widest text-tertiary opacity-60 hover:text-primary-container transition-colors"
            >
              Help Center
            </a>
          </div>
          <p className="font-label text-sm uppercase tracking-widest text-primary-fixed-dim opacity-40">
            © 2024 inked. The Digital Manuscript.
          </p>
        </div>
      </footer>
    </div>
  );
}
