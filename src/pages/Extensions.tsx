import { Link } from 'react-router-dom'

const extensions = [
  {
    icon: '📸',
    title: 'SnapMonk',
    desc: 'A powerful Chrome extension for capturing, annotating, and recording your screen. Features region & full-page screenshots, a rich annotation editor with arrows, shapes, blur & redact tools, and screen recording with instant MP4 export.',
    tags: ['Chrome Extension', 'TypeScript', 'Fabric.js'],
    links: [
      { label: 'Learn More', href: '/snapmonk', internal: true },
      { label: 'GitHub ↗', href: 'https://github.com/devops-monk/snapMonk', internal: false },
    ],
    gradient: 'from-purple-600/20 to-blue-600/20',
    border: 'hover:border-purple-500/60',
    highlight: 'border-purple-500/20',
  },
  {
    icon: '🧘',
    title: 'MonkTab',
    desc: 'A Momentum-inspired new tab extension for developers. Pomodoro timer, 20+ ambient soundscapes, smart tasks with priority, Focus Mode with ring timer, weather, world clocks, quick bookmarks, and a lo-fi YouTube player — all in one beautiful page.',
    tags: ['Chrome Extension', 'TypeScript', 'Web Audio API'],
    links: [
      { label: 'Learn More', href: '/monktab', internal: true },
      { label: 'GitHub ↗', href: 'https://github.com/devops-monk/monkTab', internal: false },
    ],
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'hover:border-violet-500/60',
    highlight: 'border-violet-500/20',
  },
  {
    icon: '💧',
    title: 'HydroMonk',
    desc: 'A smart drink water reminder Chrome extension with an animated water circle, streak tracking, customizable reminders, 14 rotating hydration facts, and a benefits panel backed by science.',
    tags: ['Chrome Extension', 'TypeScript', 'Web Audio API'],
    links: [
      { label: 'Learn More', href: '/hydromonk', internal: true },
      { label: 'GitHub ↗', href: 'https://github.com/devops-monk/hydromonk', internal: false },
    ],
    gradient: 'from-sky-600/20 to-cyan-600/20',
    border: 'hover:border-sky-500/60',
    highlight: 'border-sky-500/20',
  },
  {
    icon: '🚫',
    title: 'ShortStop',
    desc: 'A Chrome extension that blocks YouTube Shorts on every surface — homepage shelf, sidebar tab, search results, and channel pages. Includes smart URL redirect and a time-saved stats tracker.',
    tags: ['Chrome Extension', 'TypeScript', 'Manifest V3'],
    links: [
      { label: 'Learn More', href: '/shortstop', internal: true },
      { label: 'GitHub ↗', href: 'https://github.com/devops-monk/shortstop', internal: false },
    ],
    gradient: 'from-red-600/20 to-rose-600/20',
    border: 'hover:border-red-500/60',
    highlight: 'border-red-500/20',
  },
  {
    icon: '📊',
    title: 'StockMonk Extension',
    desc: 'A Chrome extension for real-time stock intelligence — buy signals, Reddit sentiment, earnings calendars, and a personal watchlist for US, UK, Indian, and European markets, all in one popup.',
    tags: ['Chrome Extension', 'TypeScript', 'Finance', 'Live API'],
    links: [
      { label: 'Learn More', href: '/stockmonk-extension', internal: true },
      { label: 'GitHub ↗', href: 'https://github.com/devops-monk/stockmonk', internal: false },
    ],
    gradient: 'from-green-600/20 to-emerald-600/20',
    border: 'hover:border-green-500/60',
    highlight: 'border-green-500/20',
  },
]

export default function Extensions() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
          <div className="absolute top-10 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
            🧩 Chrome Extensions
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#e6edf3] mb-4">
            Browser Extensions
          </h1>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6" />
          <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
            A collection of Chrome extensions built to improve productivity, focus, and workflow — all open source.
          </p>
        </div>
      </section>

      {/* ── Extensions Grid ── */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {extensions.map((ext) => (
              <div
                key={ext.title}
                className={`relative group rounded-2xl border ${ext.highlight} bg-[#161b22] p-6 transition-all duration-300 ${ext.border} hover:shadow-2xl hover:-translate-y-1 overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${ext.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative">
                  <div className="text-4xl mb-4">{ext.icon}</div>
                  <h3 className="text-xl font-bold text-[#e6edf3] mb-2">{ext.title}</h3>
                  <p className="text-[#8b949e] text-sm leading-relaxed mb-4">{ext.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {ext.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md text-xs font-medium bg-[#0d1117] border border-[#30363d] text-[#8b949e]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {ext.links.map((link) =>
                      link.internal ? (
                        <Link
                          key={link.label}
                          to={link.href}
                          className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                        >
                          {link.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
