const features = [
  {
    icon: '🔤',
    title: 'Base64 Encode / Decode',
    desc: 'Instantly encode or decode Base64 strings. Useful for JWT payloads, API credentials, and data URIs.',
  },
  {
    icon: '🔐',
    title: 'Hash Generator',
    desc: 'Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from any input. Verify checksums locally without sending data anywhere.',
  },
  {
    icon: '📋',
    title: 'JSON Formatter',
    desc: 'Paste minified JSON and get it back pretty-printed, validated, and syntax-highlighted. Collapse and expand nodes interactively.',
  },
  {
    icon: '🌐',
    title: 'URL Encode / Decode',
    desc: 'Encode special characters for safe URL transmission or decode percent-encoded strings back to readable text.',
  },
  {
    icon: '🔑',
    title: 'UUID Generator',
    desc: 'Generate RFC-compliant v4 UUIDs in bulk. One click to copy. Ideal for database seeds, test fixtures, and API IDs.',
  },
  {
    icon: '⏱',
    title: 'Unix Timestamp Converter',
    desc: 'Convert between Unix timestamps and human-readable dates in any timezone. See relative time at a glance.',
  },
  {
    icon: '🎨',
    title: 'Color Converter',
    desc: 'Convert between HEX, RGB, HSL, and HSV colour formats instantly. Live preview swatch included.',
  },
  {
    icon: '📐',
    title: 'Regex Tester',
    desc: 'Test regular expressions against sample text with live match highlighting. Supports flags: global, case-insensitive, multiline.',
  },
]

const steps = [
  { n: '1', title: 'Open MonkKit', desc: 'Navigate to tools.devops-monk.com — no installation, no account required.' },
  { n: '2', title: 'Pick a Tool', desc: 'Choose from the sidebar. All tools load instantly in your browser.' },
  { n: '3', title: 'Get the Result', desc: 'Paste your input, hit convert — copy the output in one click.' },
]

export default function MonkKit() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6">
            <span className="text-lg">🛠️</span>
            Developer Tools · Web App
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              MonkKit
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            Your developer utility belt.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            A curated collection of everyday developer tools — Base64, JSON, UUID, hashing, timestamps, regex, and more. All run locally in your browser. No accounts, no data sent anywhere.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">✓ Free</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">✓ No Sign-up</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-teal-500/15 text-teal-400 border border-teal-500/30">✓ Runs in Browser</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">✓ Zero Tracking</span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://tools.devops-monk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 shadow-xl shadow-emerald-600/25 hover:-translate-y-0.5 text-sm"
            >
              Open MonkKit ↗
            </a>
            <a
              href="https://blog.devops-monk.com/2026/05/monkkit-developer-tools/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all duration-200 text-sm"
            >
              Read the Blog Post ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Built-in Tools</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              Everything you reach for a dozen times a day — in one place.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-emerald-500/50 hover:bg-[#161b22] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/10">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-base group-hover:text-emerald-300 transition-colors">{f.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">How It Works</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto" />
          </div>
          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-emerald-500/50 via-teal-500/50 to-emerald-500/50" />
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg shadow-emerald-600/30 relative z-10">
                  {step.n}
                </div>
                <h3 className="font-bold text-[#e6edf3] text-lg mb-2">{step.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Privacy ── */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-10 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-4">Runs 100% in Your Browser</h2>
            <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto">
              Every tool processes your data locally using JavaScript. Nothing is sent to a server. No logs. No tracking. Close the tab and it's gone.
            </p>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-600/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-teal-600/10 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Try MonkKit Now</h2>
              <p className="text-[#8b949e] text-lg mb-8">No install. No account. Open in any browser.</p>
              <a
                href="https://tools.devops-monk.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-lg hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 shadow-xl shadow-emerald-600/30 hover:-translate-y-0.5"
              >
                Open MonkKit ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
