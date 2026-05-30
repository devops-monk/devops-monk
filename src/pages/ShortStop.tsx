import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🏠',
    title: 'Homepage Shelf',
    desc: 'Remove the Shorts shelf from your YouTube homepage entirely. Your feed stays focused on long-form content, channels, and subscriptions.',
  },
  {
    icon: '📋',
    title: 'Sidebar Tab',
    desc: "Hide the Shorts tab from the YouTube sidebar so it's no longer a tempting click away. Out of sight, out of mind.",
  },
  {
    icon: '🔍',
    title: 'Search Results',
    desc: 'Block Shorts from appearing in YouTube search results. Find exactly what you searched for — without the scroll trap.',
  },
  {
    icon: '📺',
    title: 'Channel Pages',
    desc: 'Clean up creator channel pages by hiding the Shorts section. Browse uploads and playlists without distractions.',
  },
  {
    icon: '🔀',
    title: 'Smart URL Redirect',
    desc: 'Automatically redirect /shorts/ID links to the standard watch?v=ID player. Keep the content, ditch the addictive loop format.',
  },
  {
    icon: '📊',
    title: 'Time Savings Stats',
    desc: 'See exactly how many Shorts were blocked today and in total, plus estimated time saved — right inside the popup.',
  },
]

const surfaces = [
  { label: 'Homepage', desc: 'Shelf hidden from feed' },
  { label: 'Sidebar', desc: 'Tab removed from nav' },
  { label: 'Search', desc: 'Results filtered out' },
  { label: 'Channels', desc: 'Section stripped clean' },
  { label: 'Direct URLs', desc: 'Redirected to player' },
]

const steps = [
  {
    n: '1',
    title: 'Install ShortStop',
    desc: 'Add from the Chrome Web Store in one click. No account, no sign-up, no setup wizard.',
  },
  {
    n: '2',
    title: 'Flip the Toggle',
    desc: 'Open the popup and enable Block Shorts. Choose which surfaces to block — or block all of them at once.',
  },
  {
    n: '3',
    title: 'Browse Without Shorts',
    desc: 'YouTube loads clean. Shorts vanish from every surface you chose. Watch your blocked count and time saved grow.',
  },
]

export default function ShortStop() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-red-800/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium mb-6">
            <span className="text-lg">🚫</span>
            Chrome Extension
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-red-400 via-rose-400 to-red-500 bg-clip-text text-transparent">
              ShortStop
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            Stop Wasting Time on YouTube Shorts.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Block YouTube Shorts on every surface — homepage, sidebar, search results, and channel pages. One toggle. All gone. Take back your focus and see exactly how much time you've reclaimed.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ✓ Free
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-500/15 text-red-400 border border-red-500/30">
              ✓ No Account Required
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
              ✓ 100% Private
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
              ✓ No Ads
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://chromewebstore.google.com/detail/janbnilagenpccgfddmlaedmocinkckc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold hover:from-red-500 hover:to-rose-500 transition-all duration-200 shadow-xl shadow-red-600/30 hover:-translate-y-0.5 text-sm"
            >
              🚀 Add to Chrome — It's Free
            </a>
            <a
              href="https://github.com/devops-monk/shortstop"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200 text-sm"
            >
              View Source on GitHub ↗
            </a>
          </div>

          <div className="mt-5">
            <Link to="/privacy" className="text-sm text-[#8b949e] hover:text-red-400 transition-colors underline underline-offset-2">
              Privacy Policy
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <section className="py-10 border-y border-[#30363d] bg-[#161b22]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { val: '5',    label: 'blocking surfaces covered' },
              { val: '1hr+', label: 'avg time saved per week' },
              { val: '1',    label: 'toggle to block everything' },
              { val: '0',    label: 'data collected, ever' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent mb-1">
                  {s.val}
                </div>
                <div className="text-[#8b949e] text-xs leading-snug">{s.label}</div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Everything Covered, Every Surface</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              Shorts appear in five different places on YouTube. ShortStop blocks all of them — or just the ones you choose.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-red-500/50 hover:bg-[#0d1117]/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-600/10"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-lg group-hover:text-red-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Surfaces visual ───────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Block All 5 Surfaces at Once</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              Toggle each surface independently, or flip the master switch to wipe Shorts from everywhere in one go.
            </p>
          </div>

          <div className="grid sm:grid-cols-5 gap-4">
            {surfaces.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-center hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-3 group-hover:bg-red-500/30 transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                </div>
                <div className="font-bold text-[#e6edf3] text-sm mb-1 group-hover:text-red-300 transition-colors">{s.label}</div>
                <div className="text-[#8b949e] text-xs leading-snug">{s.desc}</div>
              </div>
            ))}
          </div>

          {/* Master toggle callout */}
          <div className="mt-8 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600/10 to-rose-600/5 p-6 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-[#e6edf3] font-semibold mb-1">One Master Toggle</p>
            <p className="text-[#8b949e] text-sm">
              Flip <span className="text-red-400 font-mono font-bold">Block Shorts</span> ON and all five surfaces activate instantly. Flip it OFF to temporarily allow Shorts without losing your settings.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Up and Running in 10 Seconds</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-red-500/50 via-rose-500/50 to-red-500/50" />
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg shadow-red-600/30 relative z-10">
                  {step.n}
                </div>
                <h3 className="font-bold text-[#e6edf3] text-lg mb-2">{step.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Smart Redirect ────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Smart URL Redirect</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              When someone sends you a Shorts link, ShortStop silently redirects it to the normal video player — so you still watch the content, just without the addictive loop.
            </p>
          </div>

          <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1 w-full rounded-xl border border-red-500/30 bg-red-500/5 px-5 py-3 font-mono text-sm text-red-400">
                youtube.com<span className="text-red-300">/shorts/</span>abc123
              </div>
              <div className="text-2xl text-red-500 font-bold flex-shrink-0">→</div>
              <div className="flex-1 w-full rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-3 font-mono text-sm text-emerald-400">
                youtube.com<span className="text-emerald-300">/watch?v=</span>abc123
              </div>
            </div>
            <p className="text-[#8b949e] text-sm text-center">
              Automatic. Instant. No awkward redirect page — just the normal player, right away.
            </p>
          </div>
        </div>
      </section>

      {/* ── Privacy ───────────────────────────────────────────────────────── */}
      <section className="py-16 relative">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-10 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-4">
              100% Private by Design
            </h2>
            <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto">
              ShortStop never reads your browsing history, never sends data to a server, and never collects anything about you. Your stats (blocked count, time saved) live only in your browser's local storage and never leave your device.
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
              {
                perm: 'storage',
                reason: 'Save your blocking preferences and stats (blocked count, time saved) locally on your device. Nothing is transmitted anywhere.',
              },
              {
                perm: 'declarativeNetRequest',
                reason: 'Intercept and redirect /shorts/ URLs to the standard video player. This is used only for the URL redirect feature and does not read page content.',
              },
            ].map(({ perm, reason }) => (
              <div key={perm} className="flex gap-4 items-start rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-4">
                <code className="text-sm font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
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
          <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-600/10 to-rose-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-rose-600/15 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="text-5xl mb-4">🚫</div>
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Reclaim Your YouTube Today</h2>
              <p className="text-[#8b949e] text-lg mb-8">
                Free forever. No account. Install in one click and Shorts are gone — immediately, on every surface.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://chromewebstore.google.com/detail/janbnilagenpccgfddmlaedmocinkckc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-lg hover:from-red-500 hover:to-rose-500 transition-all duration-200 shadow-xl shadow-red-600/30 hover:-translate-y-0.5"
                >
                  🚀 Add to Chrome — Free
                </a>
                <a
                  href="https://github.com/devops-monk/shortstop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#30363d] text-[#e6edf3] font-bold text-lg hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200"
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