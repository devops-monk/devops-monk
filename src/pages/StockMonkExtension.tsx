import { Link } from 'react-router-dom'

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/pgcedbokambbanpanhfnmdjonedelndo?utm_source=item-share-cb'

const features = [
  {
    icon: '🔥',
    title: 'Top Buy Signals',
    desc: 'Composite buy-signal scores built from Reddit buzz, StockTwits sentiment, news sentiment, earnings beats, and insider activity — updated live.',
  },
  {
    icon: '📈',
    title: 'Reddit Trending',
    desc: 'See which tickers are surging across WSB, r/stocks, r/options, r/investing, and 5 more subreddits. 24-hour mention deltas included.',
  },
  {
    icon: '🔍',
    title: 'Global Stock Search',
    desc: 'Look up any ticker instantly — US, UK, Indian (NSE/BSE), and European markets. Live price, RSI, MACD, Bollinger Bands, insider trades, and news sentiment in one panel.',
  },
  {
    icon: '📅',
    title: 'Earnings Calendar',
    desc: 'Track upcoming earnings with EPS estimates, or review recent reports to see who beat or missed — with surprise percentage and revenue actuals.',
  },
  {
    icon: '⭐',
    title: 'Personal Watchlist',
    desc: 'Save up to 20 tickers and get live price refreshes and buy-signal scores at a glance, without leaving whatever tab you\'re on.',
  },
  {
    icon: '📰',
    title: 'News & Sentiment Feed',
    desc: 'Curated market news with AI-tagged bullish / neutral / bearish sentiment, sorted by freshness. Click any headline to open the full article.',
  },
]

const steps = [
  {
    n: '1',
    title: 'Add to Chrome',
    desc: 'Install StockMonk from the Chrome Web Store — one click, no account or sign-up needed.',
  },
  {
    n: '2',
    title: 'Pin & Open',
    desc: 'Pin the StockMonk icon to your toolbar. Click it anytime to see live signals, trending tickers, and your watchlist.',
  },
  {
    n: '3',
    title: 'Search Any Stock',
    desc: 'Type a ticker in the Search tab to get a full snapshot: price, technicals, insider activity, and community sentiment — all in seconds.',
  },
]

export default function StockMonkExtension() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-green-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-6">
            <span className="text-lg">📊</span>
            Chrome Extension
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              StockMonk
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            AI Stock Intelligence. Right in Your Browser.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Real-time buy signals, Reddit sentiment, earnings calendars, and news — all from a single Chrome extension popup. Works for US, UK, Indian, and European stocks.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ✓ Free
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              ✓ No Sign-up Required
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-green-500/15 text-green-400 border border-green-500/30">
              ✓ Multi-Market (US · UK · India · EU)
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-teal-500/15 text-teal-400 border border-teal-500/30">
              ✓ Live Data
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={CHROME_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold hover:from-green-500 hover:to-emerald-500 transition-all duration-200 shadow-xl shadow-green-600/30 hover:-translate-y-0.5 text-sm"
            >
              🚀 Add to Chrome — It's Free
            </a>
            <a
              href="/stockmonk"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-200 text-sm"
            >
              Open Live Dashboard ↗
            </a>
          </div>
          <div className="mt-5">
            <Link to="/privacy" className="text-sm text-[#8b949e] hover:text-green-400 transition-colors underline underline-offset-2">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Everything in One Click</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              Four powerful tabs — Dashboard, Search, Earnings, and Watchlist — all inside a lightweight extension popup.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-green-500/50 hover:bg-[#161b22] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-600/10"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-lg group-hover:text-green-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Signal Score explained ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">How the Buy Signal Works</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              A 0–100 composite score built from seven independent data sources. No black box.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Reddit Mention Surge', max: 25, color: 'bg-orange-500' },
              { label: 'StockTwits Bullish %', max: 20, color: 'bg-blue-500' },
              { label: 'News Sentiment', max: 20, color: 'bg-cyan-500' },
              { label: 'Earnings Beat', max: 20, color: 'bg-green-500' },
              { label: 'Upcoming Earnings', max: 15, color: 'bg-yellow-500' },
              { label: 'Insider Buying', max: 15, color: 'bg-purple-500' },
              { label: 'Technical Strength', max: 15, color: 'bg-pink-500' },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="text-[#8b949e]">{s.label}</span>
                  <span className="text-[#e6edf3] font-bold">{s.max}pts</span>
                </div>
                <div className="h-1.5 bg-[#0d1117] rounded-full overflow-hidden">
                  <div className={`h-full ${s.color}`} style={{ width: `${(s.max / 25) * 100}%` }} />
                </div>
              </div>
            ))}
            <div className="rounded-xl border border-green-500/40 bg-green-500/10 p-4 flex flex-col justify-center">
              <div className="text-xs text-[#8b949e] mb-1">Total possible</div>
              <div className="text-2xl font-bold text-green-400">100 pts</div>
              <div className="text-xs text-[#8b949e] mt-1">Score ≥ 60 = <span className="text-green-400 font-semibold">Buy Watch</span></div>
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
            <div className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-green-500/50 via-emerald-500/50 to-green-500/50" />

            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg shadow-green-600/30 relative z-10">
                  {step.n}
                </div>
                <h3 className="font-bold text-[#e6edf3] text-lg mb-2">{step.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Markets supported ─────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-8 text-center">
            Supported Markets
          </h2>
          <div className="grid sm:grid-cols-4 gap-4 text-center">
            {[
              { flag: '🇺🇸', label: 'United States', example: 'NVDA, AAPL, TSLA' },
              { flag: '🇬🇧', label: 'United Kingdom', example: 'TSCO, BARC, BP' },
              { flag: '🇮🇳', label: 'India (NSE/BSE)', example: 'RELIANCE, TCS, INFY' },
              { flag: '🇪🇺', label: 'Europe', example: 'SAP, ASML, LVMH' },
            ].map((m) => (
              <div key={m.label} className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 hover:border-green-500/40 transition-colors">
                <div className="text-4xl mb-3">{m.flag}</div>
                <div className="font-semibold text-[#e6edf3] text-sm mb-1">{m.label}</div>
                <div className="text-xs text-[#8b949e] font-mono">{m.example}</div>
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
              No Account. No Tracking.
            </h2>
            <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto">
              StockMonk only contacts the StockMonk API server to fetch market data. Your watchlist is stored locally in your browser. No personal data is collected, no login required, and no usage telemetry is sent anywhere.
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
              { perm: 'storage', reason: 'Save your watchlist and preferences locally in the browser. Nothing leaves your device.' },
              { perm: 'alarms', reason: 'Schedule periodic background refreshes so signal scores stay fresh without manual polling.' },
              { perm: 'tabs', reason: 'Detect the active tab so the extension can open search results or the dashboard in context.' },
              { perm: 'host_permissions', reason: 'Restricted to stockmonk.devops-monk.com — the only API server the extension talks to. No other sites are accessed.' },
            ].map(({ perm, reason }) => (
              <div key={perm} className="flex gap-4 items-start rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-4">
                <code className="text-sm font-mono text-green-400 bg-green-500/10 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
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
          <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-600/10 to-emerald-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-emerald-600/15 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="text-5xl mb-4">📊</div>
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Start Trading Smarter Today</h2>
              <p className="text-[#8b949e] text-lg mb-8">
                Free forever. No account. Install in one click and get live buy signals across global markets.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={CHROME_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg hover:from-green-500 hover:to-emerald-500 transition-all duration-200 shadow-xl shadow-green-600/30 hover:-translate-y-0.5"
                >
                  🚀 Add to Chrome — Free
                </a>
                <a
                  href="/stockmonk"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#30363d] text-[#e6edf3] font-bold text-lg hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-200"
                >
                  📈 Open Live Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}