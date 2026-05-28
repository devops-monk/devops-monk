import { Link } from 'react-router-dom'

const features = [
  {
    icon: '💧',
    title: 'Animated Water Circle',
    desc: 'Watch your water circle fill up in real time as you log each glass. Instant visual feedback on your daily hydration progress.',
  },
  {
    icon: '⏰',
    title: 'Smart Reminders',
    desc: 'Chrome notifications every 20, 30, 45, 60, or 90 minutes. Set active hours and weekdays-only mode so you\'re never pinged at the wrong time.',
  },
  {
    icon: '⚡',
    title: 'One-Click Logging',
    desc: 'Quick-add buttons for 200ml, 250ml, 350ml, 500ml, or any custom amount. Log a glass in one click directly from the popup.',
  },
  {
    icon: '🔥',
    title: 'Streak Tracking',
    desc: 'Build a daily streak by hitting your goal every day. Your streak count is shown as a live badge on the extension icon.',
  },
  {
    icon: '💡',
    title: '14 Hydration Facts',
    desc: 'Every reminder includes a rotating science-backed hydration fact — so you actually learn while you hydrate.',
  },
  {
    icon: '⚙️',
    title: 'Fully Customizable',
    desc: 'Set your goal by glasses or auto-calculate from your weight. Control glass size, reminder interval, active hours, and sound.',
  },
]

const benefits = [
  { icon: '🧠', title: 'Sharper Brain', fact: '73% of your brain is water' },
  { icon: '⚡', title: 'More Energy', fact: '1% dehydration = 12% productivity drop' },
  { icon: '💪', title: 'Peak Performance', fact: 'Up to 25% boost in output' },
  { icon: '🌅', title: 'Morning Boost', fact: 'Jumpstarts metabolism by 24%' },
  { icon: '✨', title: 'Glowing Skin', fact: 'Visible in days of consistency' },
  { icon: '🦴', title: 'Joint Health', fact: 'Cartilage is 80% water' },
  { icon: '🥗', title: 'Weight Control', fact: 'Drink before meals, eat less' },
  { icon: '🫀', title: 'Heart Health', fact: 'Reduces risk of kidney stones' },
]

const steps = [
  {
    n: '1',
    title: 'Install HydroMonk',
    desc: 'Add from the Chrome Web Store in one click. No account, no sign-up, no cloud.',
  },
  {
    n: '2',
    title: 'Set Your Goal',
    desc: 'Enter your daily goal or let HydroMonk calculate it from your weight. Pick a reminder interval.',
  },
  {
    n: '3',
    title: 'Drink & Build the Habit',
    desc: 'Log each glass with one click. Earn streaks. Never miss your daily goal again.',
  },
]

export default function HydroMonk() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sky-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-sm font-medium mb-6">
            <span className="text-lg">💧</span>
            Chrome Extension
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              HydroMonk
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            Drink Water. Build the Habit.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Smart hydration reminders with streak tracking, science-backed facts, and a beautiful animated water circle. Stay sharp, stay hydrated — all inside Chrome.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ✓ Free
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30">
              ✓ No Account Required
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              ✓ 100% Private
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              ✓ No Ads
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://chromewebstore.google.com/detail/hydromonk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold hover:from-sky-500 hover:to-blue-500 transition-all duration-200 shadow-xl shadow-sky-600/30 hover:-translate-y-0.5 text-sm"
            >
              🚀 Add to Chrome — It's Free
            </a>
            <a
              href="https://github.com/devops-monk/hydromonk"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-sky-500/50 hover:bg-sky-500/10 transition-all duration-200 text-sm"
            >
              View Source on GitHub ↗
            </a>
          </div>

          <div className="mt-5">
            <Link to="/privacy" className="text-sm text-[#8b949e] hover:text-sky-400 transition-colors underline underline-offset-2">
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
              { val: '73%', label: 'of your brain is water' },
              { val: '12%', label: 'productivity lost at 1% dehydration' },
              { val: '8', label: 'science-backed water benefits' },
              { val: '14', label: 'rotating hydration facts' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent mb-1">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Everything You Need to Stay Hydrated</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              A lightweight extension that nudges you, tracks you, and motivates you — without getting in the way.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-sky-500/50 hover:bg-[#0d1117]/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-600/10"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-lg group-hover:text-sky-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits of Water ─────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Why Water Changes Everything</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              8 science-backed benefits built into the extension's Benefits panel.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-5 text-center hover:border-sky-500/40 hover:bg-sky-500/5 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3">{b.icon}</div>
                <div className="font-bold text-[#e6edf3] mb-1 group-hover:text-sky-300 transition-colors">{b.title}</div>
                <div className="text-[#8b949e] text-xs leading-snug italic">"{b.fact}"</div>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Up and Running in 10 Seconds</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-sky-500/50 via-cyan-500/50 to-sky-500/50" />
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg shadow-sky-600/30 relative z-10">
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
              100% Private by Design
            </h2>
            <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto">
              All your data stays on your device. No servers. No accounts. No telemetry. No ads. HydroMonk uses only Chrome's local storage — your hydration log never leaves your browser.
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
              { perm: 'notifications', reason: 'Show reminder notifications at your chosen interval with hydration facts and quick-action buttons.' },
              { perm: 'storage',       reason: 'Save your daily log, streak, and settings locally on your device. Nothing is sent to any server.' },
              { perm: 'alarms',        reason: 'Schedule recurring reminders at the interval you set, even when the popup is closed.' },
            ].map(({ perm, reason }) => (
              <div key={perm} className="flex gap-4 items-start rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-4">
                <code className="text-sm font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
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
          <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-br from-sky-600/10 to-blue-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-sky-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/15 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="text-5xl mb-4">💧</div>
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Start Hydrating Smarter Today</h2>
              <p className="text-[#8b949e] text-lg mb-8">
                Free forever. No account. Install in one click and your first reminder is already scheduled.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://chromewebstore.google.com/detail/hydromonk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold text-lg hover:from-sky-500 hover:to-blue-500 transition-all duration-200 shadow-xl shadow-sky-600/30 hover:-translate-y-0.5"
                >
                  🚀 Add to Chrome — Free
                </a>
                <a
                  href="https://github.com/devops-monk/hydromonk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#30363d] text-[#e6edf3] font-bold text-lg hover:border-sky-500/50 hover:bg-sky-500/10 transition-all duration-200"
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
