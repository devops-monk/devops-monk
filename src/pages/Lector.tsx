const features = [
  {
    icon: '⌨️',
    title: 'Global Hotkey',
    desc: 'Select text in any app — a browser, a PDF, an editor — and press the hotkey to hear it. Press again to stop, mid-word if you like. On macOS there is also a right-click → Services entry that needs no permissions at all.',
  },
  {
    icon: '🔒',
    title: '100% Offline',
    desc: 'Speech is synthesized on your machine by a statically-linked engine. No cloud API, no Python runtime, no sidecar process, and nothing you select is ever transmitted anywhere. It works the same with Wi-Fi off.',
  },
  {
    icon: '🗣️',
    title: '181 Voices',
    desc: 'Twelve models across three engine families — Kokoro, Piper and Kitten — from a 21 MB voice that is ready in seconds to a 349 MB model with 28 English speakers. Each has a play button that auditions it without switching.',
  },
  {
    icon: '📚',
    title: 'Reads Whole Books',
    desc: 'Import EPUB, plain text, Markdown or PDF, or search Standard Ebooks and Project Gutenberg from inside the app. Chapters advance on their own, and your place is kept per book — quit mid-chapter and it resumes there.',
  },
  {
    icon: '✨',
    title: 'Follows Along',
    desc: 'The sentence being spoken is highlighted, and clicking any sentence sends the voice there. The highlight is timed against audio the sound card has actually played, so it never runs ahead of what you are hearing.',
  },
  {
    icon: '📖',
    title: 'Reads Markdown Sensibly',
    desc: 'A code block becomes the words "Code block", not a minute of punctuation. Tables are declined rather than read cell by cell, and file paths shorten to their basename. Footnotes in ebooks are skipped rather than read mid-sentence.',
  },
  {
    icon: '⚡',
    title: 'Faster Than Real Time',
    desc: 'Around 470 ms to the first word on an M1 Pro, and a real-time factor of 0.15 — a second of speech takes under two tenths of a second to generate. Audio starts while the rest is still being made.',
  },
  {
    icon: '🖥️',
    title: 'Cross-Platform',
    desc: 'Native builds for macOS (Apple Silicon & Intel), Windows, and Linux — built with Tauri and Rust for a small, fast, native footprint.',
  },
]

const shots = [
  {
    src: '/lector/reading.png',
    title: 'It follows the voice',
    alt: 'Lector reading The Jungle Book, with the sentences already spoken highlighted and a "Read from here" tooltip over a later paragraph',
    body: [
      'The passage being spoken is highlighted as you hear it, and clicking any sentence sends the voice there. Pause and resume land on the same word.',
      'The highlight is driven by frames the sound card has actually played, not by what has been generated — synthesis runs several sentences ahead, so a highlight keyed to it would sit permanently ahead of the voice.',
    ],
  },
  {
    src: '/lector/books.png',
    title: 'Books, from two free libraries',
    alt: 'Lector searching for "jungle", showing 26 results from Standard Ebooks and Project Gutenberg, with The Jungle Book already in the library',
    body: [
      'Search Standard Ebooks and Project Gutenberg together — around 75,000 public-domain books — and download one without leaving the app. Standard Ebooks editions come first, because they are properly typeset and proofed.',
      'Or bring your own: EPUB, plain text, Markdown and PDF all import, and any article on the web can be read by pasting its address.',
    ],
  },
  {
    src: '/lector/voices.png',
    title: '181 voices, auditioned before you commit',
    alt: 'Lector\'s voice browser with Jenny marked ACTIVE and Kokoro expanded into its 28 English speakers',
    body: [
      'Twelve models across three engine families, each card naming what it costs you rather than what it is called. One is recommended; the rest sort by download size.',
      'A voice you do not have yet reads "Hear it · 349 MB" — pressing it downloads, speaks a sample, and selects it. With 181 to choose from, having to adopt a voice just to hear it would make the list useless.',
    ],
  },
]

const steps = [
  {
    n: '1',
    title: 'Download & Install',
    desc: 'Grab the build for your OS from the Releases page below. On macOS, right-click → Open on first launch to get past the unsigned-build warning.',
  },
  {
    n: '2',
    title: 'Pick a Voice',
    desc: 'Lector opens with a voice browser. Start with Kitten Nano at 29 MB for something instant, or Kokoro if you want the best quality. Audition any of them before committing.',
  },
  {
    n: '3',
    title: 'Select Text, or Open a Book',
    desc: 'Select text anywhere on your system and press the hotkey to hear it. Or open the Library, search the free catalogues or add a file of your own, and let it read you a chapter at a time.',
  },
]

export default function Lector() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-amber-800/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-medium mb-6">
            <span className="text-lg">📖</span>
            Desktop App · macOS · Windows · Linux
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Lector
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            Read Anything Aloud. Books Included. Fully Offline.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            The mirror image of Vox. Select text anywhere and press a global hotkey to hear it — or import a book and have it read to you, with the words highlighted as they are spoken. Synthesis runs entirely on your machine with no Python and no cloud, so nothing you read ever leaves your device.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ✓ Free
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              ✓ 100% Offline
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
              ✓ Open Source
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
              ✓ No Account Required
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/devops-monk/lector/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:from-amber-500 hover:to-orange-500 transition-all duration-200 shadow-xl shadow-amber-600/30 hover:-translate-y-0.5 text-sm"
            >
              ⬇ Download for macOS, Windows &amp; Linux
            </a>
            <a
              href="https://github.com/devops-monk/lector"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-200 text-sm"
            >
              View Source on GitHub ↗
            </a>
          </div>

          <p className="mt-5 text-sm text-[#8b949e]">
            Builds are currently unsigned — expect a one-time Gatekeeper/SmartScreen warning on first launch.
          </p>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <section className="py-10 border-y border-[#30363d] bg-[#161b22]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { val: '181',    label: 'voices to choose from' },
              { val: '75k',    label: 'free books, searchable in-app' },
              { val: '470ms',  label: 'to the first spoken word' },
              { val: '0',      label: 'text ever sent to a server' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent mb-1">
                  {s.val}
                </div>
                <div className="text-[#8b949e] text-xs leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Screenshots ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">A Reader, Not Just a Hotkey</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto" />
          </div>

          <div className="space-y-16">
            {shots.map((shot, i) => (
              <div
                key={shot.src}
                className={`flex flex-col gap-6 lg:gap-10 items-center ${
                  i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                <div className="lg:w-3/5 w-full">
                  <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] overflow-hidden shadow-2xl shadow-amber-950/30 hover:border-amber-500/40 transition-colors duration-300">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      loading="lazy"
                      width={1786}
                      height={1332}
                      className="w-full h-auto block"
                    />
                  </div>
                </div>
                <div className="lg:w-2/5 w-full">
                  <h3 className="text-2xl font-bold text-[#e6edf3] mb-3">{shot.title}</h3>
                  {shot.body.map((para) => (
                    <p key={para.slice(0, 24)} className="text-[#8b949e] leading-relaxed mb-4 last:mb-0">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/30 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Built for Listening, Not Just Speaking</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              Everything runs on your machine — no accounts, no subscriptions, no data collection.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-amber-500/50 hover:bg-[#0d1117]/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-600/10"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-lg group-hover:text-amber-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Up and Running in Under a Minute</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-amber-500/50 via-orange-500/50 to-amber-500/50" />
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg shadow-amber-600/30 relative z-10">
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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-10 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-4">
              What You Select Never Leaves Your Machine
            </h2>
            <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto">
              Lector synthesizes speech with an engine linked directly into the app — there's no server round-trip, no API key to manage, and no Python runtime or background process to install. Models are downloaded once, checksum-verified, and used offline forever after.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-600/10 to-orange-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-orange-600/15 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="text-5xl mb-4">📖</div>
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Try Lector Today</h2>
              <p className="text-[#8b949e] text-lg mb-8">
                Free, open source, and fully offline. Download the build for your platform and start listening in under a minute.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://github.com/devops-monk/lector/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg hover:from-amber-500 hover:to-orange-500 transition-all duration-200 shadow-xl shadow-amber-600/30 hover:-translate-y-0.5"
                >
                  ⬇ Download Latest Release
                </a>
                <a
                  href="https://github.com/devops-monk/lector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#30363d] text-[#e6edf3] font-bold text-lg hover:border-amber-500/50 hover:bg-amber-500/10 transition-all duration-200"
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
