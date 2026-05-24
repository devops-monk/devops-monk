import { Link } from 'react-router-dom'

const features = [
  {
    icon: '⏱',
    title: 'Pomodoro Timer',
    desc: 'Built-in focus and break cycles with a clean circular ring timer. Enter full Focus Mode with a live task sidebar and ambient sounds — all in one overlay.',
  },
  {
    icon: '🎵',
    title: 'Ambient Soundscapes',
    desc: '20+ synthesised soundscapes with multiple flavour variants — Light Rain, Rain on Window, Ocean Waves, Forest Morning, Fireplace, Café, and more. All offline, zero latency.',
  },
  {
    icon: '✅',
    title: 'Smart Tasks',
    desc: 'Add tasks with high / medium priority, filter by active, done, or all. Pin any task directly into Focus Mode as your session goal. Clear done tasks in one click.',
  },
  {
    icon: '🌤',
    title: 'Weather & World Clocks',
    desc: 'Auto-detects your city via reverse geocoding and shows live weather from Open-Meteo. Add multiple world clocks for remote teammates across timezones.',
  },
  {
    icon: '🔗',
    title: 'Quick Bookmarks',
    desc: 'Import your Chrome bookmarks into a slide-out sidebar. Access your most-used sites without ever leaving the new tab page.',
  },
  {
    icon: '🎬',
    title: 'Lo-fi YouTube Player',
    desc: 'Embedded YouTube player with a curated playlist of lo-fi, chill, and ambient study music — plays directly inside your new tab, no new window needed.',
  },
  {
    icon: '📷',
    title: 'Daily Backgrounds',
    desc: 'A fresh, beautiful photo every day from a curated seed library. Each background is unique to the date and refreshes automatically.',
  },
  {
    icon: '📝',
    title: 'Scratchpad Notes',
    desc: 'A persistent, always-available scratchpad for quick thoughts, URLs, and snippets. Synced to local storage — no sign-up, no cloud.',
  },
]

const steps = [
  {
    n: '1',
    title: 'Install the Extension',
    desc: 'Add MonkTab from the Chrome Web Store in one click. No account, no sign-up required.',
  },
  {
    n: '2',
    title: 'Open a New Tab',
    desc: 'MonkTab replaces your new tab page instantly. Your clock, weather, tasks and sounds are ready to go.',
  },
  {
    n: '3',
    title: 'Start a Focus Session',
    desc: 'Add a task, pick a soundscape, hit Focus Mode, and get into flow — timer and ring handle the rest.',
  },
]

export default function MonkTab() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-6">
            <span className="text-lg">🧘</span>
            Chrome Extension · New Tab
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
              MonkTab
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            Your focused workspace. Every new tab.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            A Momentum-inspired new tab extension built for developers. Pomodoro timer, ambient soundscapes, smart tasks, weather, world clocks, bookmarks, and a full Focus Mode — all in one beautiful, private page.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ✓ Free
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              ✓ No Sign-up Required
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/30">
              ✓ 100% Offline Sounds
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
              ✓ Zero Tracking
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <span className="px-7 py-3.5 rounded-xl bg-[#30363d]/60 border border-[#30363d] text-[#8b949e] font-semibold cursor-not-allowed text-sm">
              🚀 Coming to Chrome Web Store
            </span>
            <a
              href="https://github.com/devops-monk/monkTab"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-200 text-sm"
            >
              View Source on GitHub ↗
            </a>
          </div>
          <div className="mt-5">
            <Link to="/privacy" className="text-sm text-[#8b949e] hover:text-violet-400 transition-colors underline underline-offset-2">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Everything in One Tab</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              Eight productivity tools, zero context switches, one beautiful page.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-violet-500/50 hover:bg-[#161b22] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/10"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-base group-hover:text-violet-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Focus Mode highlight ───────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-600/10 to-purple-600/10 p-10 sm:p-14 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl" />
            </div>
            <div className="relative text-center">
              <div className="text-5xl mb-6">🎯</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">
                Focus Mode
              </h2>
              <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                One keystroke drops you into a full-screen focus session. A circular ring timer counts down your Pomodoro, your pinned task is front and centre, ambient sounds play in the background, and a live quote keeps you grounded.
              </p>
              <div className="flex flex-wrap gap-3 justify-center text-sm">
                {['Ring progress timer', 'Focus & Break modes', 'Task sidebar', 'Sound picker', 'Lo-fi YouTube', 'Daily quote'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">How It Works</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-violet-500/50 via-purple-500/50 to-violet-500/50" />

            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg shadow-violet-600/30 relative z-10">
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
              All your tasks, notes, and settings stay in your browser via <code className="text-violet-400 text-base">chrome.storage</code>. Ambient sounds are synthesised locally — no audio files downloaded, no external requests. No servers. No accounts. No telemetry.
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
              { perm: 'storage', reason: 'Save your tasks, notes, settings, and clocks locally in your browser. Nothing is sent to any server.' },
              { perm: 'bookmarks', reason: 'Read your Chrome bookmarks so you can import them into the Quick Links sidebar.' },
              { perm: 'notifications', reason: 'Show a desktop notification when a Pomodoro focus or break session ends.' },
              { perm: 'declarativeNetRequest', reason: 'Inject a Referer header for the embedded YouTube player so lo-fi videos load correctly inside the extension.' },
            ].map(({ perm, reason }) => (
              <div key={perm} className="flex gap-4 items-start rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-4">
                <code className="text-sm font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
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
          <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-600/10 to-purple-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-600/15 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Ready to Try MonkTab?</h2>
              <p className="text-[#8b949e] text-lg mb-8">
                Launching on the Chrome Web Store soon. In the meantime, install it from source.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <span className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#30363d]/60 border border-[#30363d] text-[#8b949e] font-semibold text-lg cursor-not-allowed">
                  🚀 Coming to Chrome Web Store
                </span>
                <a
                  href="https://github.com/devops-monk/monkTab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold text-lg hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-200"
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