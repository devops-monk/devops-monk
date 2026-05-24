const features = [
  { icon: '📊', title: 'Real-Time Quotes', desc: 'Live stock prices with bid/ask spread, day range, and volume — refreshed every few seconds.' },
  { icon: '📈', title: 'Technical Indicators', desc: 'RSI, MACD, Bollinger Bands, and moving averages overlaid directly on interactive candlestick charts.' },
  { icon: '💼', title: 'Portfolio Tracker', desc: 'Add your holdings and track total value, daily P&L, and percentage gain/loss across positions.' },
  { icon: '🔍', title: 'Market Screener', desc: 'Filter stocks by sector, market cap, PE ratio, volume spike, or custom criteria.' },
  { icon: '📰', title: 'News Feed', desc: 'Aggregated market news and company announcements — filtered to only the tickers in your watchlist.' },
  { icon: '🌍', title: 'Global Markets', desc: 'Track indices from NSE, BSE, NYSE, NASDAQ, LSE, and major Asian markets on one dashboard.' },
]

const steps = [
  { n: '1', title: 'Open the Dashboard', desc: 'Navigate to share.devops-monk.com — no account needed to view live market data.' },
  { n: '2', title: 'Search or Browse', desc: 'Search by ticker or company name. Add stocks to your watchlist with one click.' },
  { n: '3', title: 'Analyse & Track', desc: 'View charts, technicals, and news. Add holdings to track your portfolio value.' },
]

export default function ShareMarket() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            <span className="text-lg">📈</span>
            Finance · Dashboard · Python
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Share Market Intelligence
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            Real-time market intelligence, simplified.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            A stock market analysis dashboard with live quotes, technical indicators, portfolio tracking, and market trend visualisation — powered by live data feeds and built for investors who think like engineers.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">✓ Live Data</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">✓ Technical Analysis</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">✓ Portfolio Tracker</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">✓ Global Markets</span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://share.devops-monk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 shadow-xl shadow-blue-600/25 hover:-translate-y-0.5 text-sm"
            >
              Open Dashboard ↗
            </a>
            <a
              href="https://blog.devops-monk.com/2026/04/stock-market-analysis-dashboard/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200 text-sm"
            >
              Read the Blog Post ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">What's Inside</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">Everything an engineer-investor needs to make informed decisions.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-blue-500/50 hover:bg-[#161b22] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/10">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-lg group-hover:text-blue-300 transition-colors">{f.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack ── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">How It Works</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto" />
          </div>
          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50" />
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg shadow-blue-600/30 relative z-10">{step.n}</div>
                <h3 className="font-bold text-[#e6edf3] text-lg mb-2">{step.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-600/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-cyan-600/10 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Start Analysing Markets</h2>
              <p className="text-[#8b949e] text-lg mb-8">Open the live dashboard — free, no account needed.</p>
              <a
                href="https://share.devops-monk.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-200 shadow-xl shadow-blue-600/30 hover:-translate-y-0.5"
              >
                Open Dashboard ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
