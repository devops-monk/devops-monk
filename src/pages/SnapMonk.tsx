import { Link } from 'react-router-dom'

const features = [
  {
    icon: '📸',
    title: 'Screenshot Anything',
    desc: 'Capture the visible area, full scrollable page, a custom region, or pick any specific element on the page with pixel-perfect accuracy.',
  },
  {
    icon: '✏️',
    title: 'Rich Annotation Editor',
    desc: 'Draw arrows, shapes, text, highlights, callouts, numbered steps, blur, and redact. Full undo/redo. Non-destructive editing.',
  },
  {
    icon: '🎬',
    title: 'Screen Recording',
    desc: 'Record your tab, window, or entire desktop with system audio and optional webcam overlay. Draggable webcam bubble.',
  },
  {
    icon: '⚡',
    title: 'Instant MP4 Export',
    desc: 'On Chrome 130+, recordings save directly as MP4 — no conversion, no waiting. Falls back to WebM on older browsers.',
  },
  {
    icon: '✂️',
    title: 'Crop & Edit',
    desc: 'Crop screenshots to exactly what you need after capture. Apply redactions, pixel blur, and filled shapes over sensitive content.',
  },
  {
    icon: '🔗',
    title: 'One-Click Share',
    desc: 'Copy straight to clipboard or download as PNG, JPG, or PDF. No sign-up, no cloud upload — everything stays in your browser.',
  },
]

const steps = [
  {
    n: '1',
    title: 'Install the Extension',
    desc: 'Add SnapMonk from the Chrome Web Store in one click. No account required.',
  },
  {
    n: '2',
    title: 'Capture Your Screen',
    desc: 'Click the SnapMonk icon and choose visible, full page, region, element, or start a recording.',
  },
  {
    n: '3',
    title: 'Annotate & Export',
    desc: 'Edit in the built-in editor, then download or copy to clipboard — done.',
  },
]

export default function SnapMonk() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
            <span className="text-lg">📸</span>
            Chrome Extension
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              SnapMonk
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            Capture. Annotate. Ship.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            The all-in-one screenshot and screen recording extension for developers, designers, and content creators. Capture anything, annotate with precision, and share in seconds — all inside Chrome.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ✓ Free
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              ✓ No Sign-up Required
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
              ✓ Works Offline
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
              ✓ Open Source
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://chromewebstore.google.com/detail/eembjjbdakagdbmlkffleccoklpjfbjc?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:from-purple-500 hover:to-blue-500 transition-all duration-200 shadow-xl shadow-purple-600/30 hover:-translate-y-0.5 text-sm"
            >
              🚀 Add to Chrome — It's Free
            </a>
            <a
              href="https://github.com/devops-monk/snapMonk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200 text-sm"
            >
              View Source on GitHub ↗
            </a>
          </div>
          <div className="mt-5">
            <Link to="/privacy" className="text-sm text-[#8b949e] hover:text-purple-400 transition-colors underline underline-offset-2">
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Everything You Need</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              A professional-grade tool packed into a lightweight browser extension.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-purple-500/50 hover:bg-[#161b22] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-600/10"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-lg group-hover:text-purple-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">How It Works</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50" />

            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg shadow-purple-600/30 relative z-10">
                  {step.n}
                </div>
                <h3 className="font-bold text-[#e6edf3] text-lg mb-2">{step.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-10 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-4">
              100% Private by Design
            </h2>
            <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto">
              Your data never leaves your browser. All screenshot processing, annotation, and recording happens locally on your machine. No servers. No accounts. No telemetry. No tracking.
            </p>
          </div>
        </div>
      </section>

      {/* ── Permissions ───────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-8 text-center">
            Permissions Explained
          </h2>
          <div className="space-y-3">
            {[
              { perm: 'activeTab', reason: 'Access the current tab to take screenshots and inject the annotation overlay.' },
              { perm: 'scripting', reason: 'Inject the region selector and recorder toolbar into web pages.' },
              { perm: 'tabs', reason: 'Read the current tab URL and title for export filenames.' },
              { perm: 'storage', reason: 'Save your captures temporarily in local browser storage (IndexedDB).' },
              { perm: 'desktopCapture', reason: 'Enable full-desktop and window screen recording.' },
            ].map(({ perm, reason }) => (
              <div key={perm} className="flex gap-4 items-start rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-4">
                <code className="text-sm font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
                  {perm}
                </code>
                <p className="text-[#8b949e] text-sm leading-relaxed">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/10 to-blue-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/15 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="text-5xl mb-4">📸</div>
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Start Capturing Smarter Today</h2>
              <p className="text-[#8b949e] text-lg mb-8">
                Free forever. No account. Install in one click and capture your first screenshot in seconds.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://chromewebstore.google.com/detail/eembjjbdakagdbmlkffleccoklpjfbjc?utm_source=item-share-cb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-200 shadow-xl shadow-purple-600/30 hover:-translate-y-0.5"
                >
                  🚀 Add to Chrome — Free
                </a>
                <a
                  href="https://github.com/devops-monk/snapMonk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#30363d] text-[#e6edf3] font-bold text-lg hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200"
                >
                  ⭐ Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
