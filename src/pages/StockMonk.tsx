import { useState, useEffect, useRef } from 'react'

const API = 'https://stockmonk.devops-monk.com/api/v1'

// ── Types ─────────────────────────────────────────────────────────

interface StockTwits {
  bullishCount: number
  bearishCount: number
  bullRatio: number
  bearRatio: number
}

interface TrendingStock {
  rank: number
  ticker: string
  name: string
  mentions: number
  upvotes: number
  mentionsDelta24h: string
  stockTwits: StockTwits | null
}

interface Signal {
  ticker: string
  score: number
  label: string
  breakdown: {
    redditMentionSurge: number
    stockTwitsBullish: number
    newsSentiment: number
    earningsBeat: number
    upcomingEarnings: number
  }
  updatedAt: string
}

interface EarningsRow {
  ticker: string
  reportDate: string
  reportTime: string
  epsEstimate: number | null
  epsActual: number | null
  epsSurprise: number | null
  epsSurprisePct: number | null
  revenueEstimate: number | null
  revenueActual: number | null
  beatMiss: string | null
  daysUntil: number
  status: string
}

interface NewsArticle {
  ticker: string
  headline: string
  source: string
  url: string
  sentiment: string
  published_at: string
}

interface StockDetail {
  ticker: string
  market: string
  updatedAt: string
  profile: {
    ticker: string
    name: string
    sector: string
    industry: string
    description: string
    website: string
    ceo: string
  } | null
  quote: {
    ticker: string
    price: number
    change: number
    changePercent: number
    high: number
    low: number
    open: number
    prevClose: number
  } | null
  nextEarnings: { date: string; epsEstimate: number | null } | null
  earningsHistory: Array<{
    ticker: string
    date: string
    epsEstimated: number
    eps: number
    surprise: number
    surprisePct: number
  }>
  newsSentiment: {
    score: number
    label: string
    topArticles: Array<{
      headline: string
      source: string
      sentiment: string
      publishedAt: string
      url: string
    }>
  } | null
}

interface MentionHistory {
  ticker: string
  history: Array<{ date: string; mentions: number; upvotes: number }>
}

type SortDir = 'asc' | 'desc'

// ── Shared UI ─────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
    </div>
  )
}

function ErrorMsg({ msg }: { msg: string }) {
  return (
    <div className="text-center py-12">
      <div className="text-3xl mb-3">⚠️</div>
      <p className="text-red-400 text-sm">{msg}</p>
    </div>
  )
}

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <span className="ml-1 text-[#30363d] text-xs">⇅</span>
  return <span className="ml-1 text-purple-400 text-xs">{dir === 'asc' ? '↑' : '↓'}</span>
}

function SentimentBadge({ sentiment }: { sentiment: string }) {
  const map: Record<string, string> = {
    bullish: 'bg-green-500/15 text-green-400 border-green-500/25',
    bearish: 'bg-red-500/15 text-red-400 border-red-500/25',
    neutral: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  }
  const cls = map[sentiment?.toLowerCase()] ?? 'bg-[#161b22] text-[#8b949e] border-[#30363d]'
  return (
    <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${cls}`}>
      {sentiment ?? '—'}
    </span>
  )
}

function ScorePill({ score }: { score: number }) {
  const cls =
    score >= 60
      ? 'bg-green-500/15 text-green-400 border-green-500/25'
      : score >= 40
      ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25'
      : 'bg-red-500/15 text-red-400 border-red-500/25'
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-bold border ${cls}`}>
      {score}
    </span>
  )
}

function ScoreBar({ score, label }: { score: number; label?: string }) {
  const color = score >= 60 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
  const textColor = score >= 60 ? 'text-green-400' : score >= 40 ? 'text-yellow-400' : 'text-red-400'
  return (
    <div className="space-y-1">
      {label && <div className="flex justify-between text-xs text-[#8b949e]"><span>{label}</span><span className={textColor}>{score}/100</span></div>}
      <div className="h-1.5 bg-[#0d1117] rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

function TickerBadge({ ticker }: { ticker: string }) {
  return (
    <span className="font-bold text-[#e6edf3] bg-purple-500/10 px-2 py-0.5 rounded-md text-sm border border-purple-500/20 font-mono tracking-wide">
      {ticker}
    </span>
  )
}

function fmt(n: number | null | undefined, dec = 2): string {
  if (n == null) return '—'
  return n.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec })
}

function fmtRevenue(n: number | null | undefined): string {
  if (n == null) return '—'
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`
  return `$${n}`
}

function fmtDate(d: string): string {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function fmtRelative(d: string): string {
  const diff = Date.now() - new Date(d).getTime()
  const h = Math.floor(diff / 3.6e6)
  if (h < 1) return `${Math.floor(diff / 60000)}m ago`
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

function FilterBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap gap-3 items-center p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
      {children}
    </div>
  )
}

function Input({
  placeholder, value, onChange, type = 'text', className = ''
}: {
  placeholder?: string; value: string | number; onChange: (v: string) => void; type?: string; className?: string
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`px-3 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] text-sm focus:outline-none focus:border-purple-500/60 transition-colors ${className}`}
    />
  )
}

function Select({
  value, onChange, options, className = ''
}: {
  value: string | number; onChange: (v: string) => void
  options: { value: string | number; label: string }[]; className?: string
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`px-3 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-sm focus:outline-none focus:border-purple-500/60 transition-colors cursor-pointer ${className}`}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

function ResultCount({ n, label = 'results' }: { n: number; label?: string }) {
  return <span className="text-xs text-[#8b949e] ml-auto">{n.toLocaleString()} {label}</span>
}

// ── Trending Tab ──────────────────────────────────────────────────

function TrendingTab() {
  const [stocks, setStocks] = useState<TrendingStock[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<string>('rank')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [sentimentFilter, setSentimentFilter] = useState('all')
  const [minMentions, setMinMentions] = useState('')
  const [limit, setLimit] = useState('50')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`${API}/trending/stocks?limit=${limit}`)
      .then(r => r.json())
      .then(d => { setStocks(d.stocks || []); setLoading(false) })
      .catch(() => { setError('Failed to load trending stocks. API may be unavailable.'); setLoading(false) })
  }, [limit])

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const filtered = stocks
    .filter(s => {
      const q = search.toUpperCase()
      if (q && !s.ticker.includes(q) && !s.name.toUpperCase().includes(q)) return false
      if (minMentions && s.mentions < Number(minMentions)) return false
      if (sentimentFilter === 'bullish' && s.stockTwits && s.stockTwits.bullRatio < 0.5) return false
      if (sentimentFilter === 'bearish' && (!s.stockTwits || s.stockTwits.bullRatio >= 0.5)) return false
      if (sentimentFilter === 'no_data' && s.stockTwits !== null) return false
      return true
    })
    .sort((a, b) => {
      let av: number, bv: number
      if (sortKey === 'mentionsDelta24h') {
        av = parseFloat(String(a.mentionsDelta24h)) || 0
        bv = parseFloat(String(b.mentionsDelta24h)) || 0
      } else if (sortKey === 'bullRatio') {
        av = a.stockTwits?.bullRatio ?? -1
        bv = b.stockTwits?.bullRatio ?? -1
      } else {
        av = Number((a as unknown as Record<string, unknown>)[sortKey]) || 0
        bv = Number((b as unknown as Record<string, unknown>)[sortKey]) || 0
      }
      return sortDir === 'asc' ? av - bv : bv - av
    })

  const Th = ({ label, col }: { label: string; col: string }) => (
    <th
      onClick={() => toggleSort(col)}
      className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider cursor-pointer hover:text-[#e6edf3] transition-colors select-none whitespace-nowrap"
    >
      {label}<SortIcon active={sortKey === col} dir={sortDir} />
    </th>
  )

  return (
    <div className="space-y-4">
      <FilterBar>
        <Input placeholder="Search ticker / name..." value={search} onChange={setSearch} className="w-48" />
        <Select value={sentimentFilter} onChange={setSentimentFilter} options={[
          { value: 'all', label: 'All Sentiment' },
          { value: 'bullish', label: 'Bullish Only' },
          { value: 'bearish', label: 'Bearish Only' },
          { value: 'no_data', label: 'No StockTwits' },
        ]} />
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8b949e] whitespace-nowrap">Min Mentions:</span>
          <Input type="number" placeholder="0" value={minMentions} onChange={setMinMentions} className="w-20" />
        </div>
        <Select value={limit} onChange={setLimit} options={[
          { value: '10', label: 'Top 10' },
          { value: '25', label: 'Top 25' },
          { value: '50', label: 'Top 50' },
          { value: '100', label: 'Top 100' },
        ]} />
        <ResultCount n={filtered.length} label="stocks" />
      </FilterBar>

      {loading ? <Spinner /> : error ? <ErrorMsg msg={error} /> : (
        <div className="rounded-xl border border-[#30363d] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#161b22] border-b border-[#30363d]">
                  <Th label="#" col="rank" />
                  <Th label="Ticker" col="ticker" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider whitespace-nowrap">Company</th>
                  <Th label="Mentions" col="mentions" />
                  <Th label="Upvotes" col="upvotes" />
                  <Th label="24h Δ" col="mentionsDelta24h" />
                  <Th label="Bullish %" col="bullRatio" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-[#8b949e]">No stocks match your filters</td></tr>
                ) : filtered.map((s, i) => (
                  <tr key={s.ticker} className={`border-b border-[#30363d]/40 hover:bg-purple-500/5 transition-colors ${i % 2 === 0 ? '' : 'bg-[#161b22]/30'}`}>
                    <td className="px-4 py-3 text-[#8b949e] font-mono">{s.rank}</td>
                    <td className="px-4 py-3"><TickerBadge ticker={s.ticker} /></td>
                    <td className="px-4 py-3 text-[#8b949e] max-w-[200px] truncate">{s.name}</td>
                    <td className="px-4 py-3 font-semibold text-[#e6edf3]">{s.mentions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-[#8b949e]">{s.upvotes.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {s.mentionsDelta24h != null ? (
                        <span className={`font-semibold ${parseFloat(String(s.mentionsDelta24h)) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {parseFloat(String(s.mentionsDelta24h)) >= 0 ? '+' : ''}{s.mentionsDelta24h}
                        </span>
                      ) : <span className="text-[#8b949e]">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {s.stockTwits ? (
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <div className="flex-1 h-1.5 rounded-full bg-[#0d1117] overflow-hidden flex">
                            <div className="bg-green-500 h-full transition-all" style={{ width: `${(s.stockTwits.bullRatio * 100).toFixed(0)}%` }} />
                            <div className="bg-red-500 h-full flex-1" />
                          </div>
                          <span className="text-xs text-green-400 font-semibold w-8 text-right">
                            {(s.stockTwits.bullRatio * 100).toFixed(0)}%
                          </span>
                        </div>
                      ) : <span className="text-xs text-[#8b949e]">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Signals Tab ───────────────────────────────────────────────────

function SignalsTab() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [minScore, setMinScore] = useState('0')
  const [limit, setLimit] = useState('50')
  const [search, setSearch] = useState('')
  const [labelFilter, setLabelFilter] = useState('all')
  const [sortKey, setSortKey] = useState('score')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [expandedTicker, setExpandedTicker] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`${API}/signals/top?minScore=${minScore}&limit=${limit}`)
      .then(r => r.json())
      .then(d => { setSignals(d.signals || []); setLoading(false) })
      .catch(() => { setError('Failed to load signals.'); setLoading(false) })
  }, [minScore, limit])

  const filtered = signals
    .filter(s => {
      const q = search.toUpperCase()
      if (q && !s.ticker.includes(q)) return false
      if (labelFilter !== 'all' && s.label.toLowerCase() !== labelFilter) return false
      return true
    })
    .sort((a, b) => {
      const av = Number((a as unknown as Record<string, unknown>)[sortKey]) || 0
      const bv = Number((b as unknown as Record<string, unknown>)[sortKey]) || 0
      return sortDir === 'asc' ? av - bv : bv - av
    })

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const breakdownMax: Record<string, number> = {
    redditMentionSurge: 25,
    stockTwitsBullish: 20,
    newsSentiment: 20,
    earningsBeat: 20,
    upcomingEarnings: 15,
  }
  const breakdownLabel: Record<string, string> = {
    redditMentionSurge: 'Reddit Surge',
    stockTwitsBullish: 'StockTwits Bullish',
    newsSentiment: 'News Sentiment',
    earningsBeat: 'Earnings Beat',
    upcomingEarnings: 'Upcoming Earnings',
  }

  const Th = ({ label, col }: { label: string; col: string }) => (
    <th onClick={() => toggleSort(col)} className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider cursor-pointer hover:text-[#e6edf3] transition-colors select-none whitespace-nowrap">
      {label}<SortIcon active={sortKey === col} dir={sortDir} />
    </th>
  )

  return (
    <div className="space-y-4">
      <FilterBar>
        <Input placeholder="Search ticker..." value={search} onChange={setSearch} className="w-36" />
        <Select value={labelFilter} onChange={setLabelFilter} options={[
          { value: 'all', label: 'All Labels' },
          { value: 'buy watch', label: 'Buy Watch' },
          { value: 'neutral', label: 'Neutral' },
          { value: 'low interest', label: 'Low Interest' },
        ]} />
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8b949e] whitespace-nowrap">Min Score:</span>
          <Select value={minScore} onChange={setMinScore} options={[
            { value: '0', label: 'All (0+)' },
            { value: '40', label: 'Neutral (40+)' },
            { value: '60', label: 'Buy Watch (60+)' },
          ]} />
        </div>
        <Select value={limit} onChange={setLimit} options={[
          { value: '20', label: 'Top 20' },
          { value: '50', label: 'Top 50' },
          { value: '100', label: 'Top 100' },
        ]} />
        <ResultCount n={filtered.length} label="signals" />
      </FilterBar>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-xs text-[#8b949e]">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-400 rounded-full inline-block" />Buy Watch ≥ 60</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-yellow-400 rounded-full inline-block" />Neutral 40–59</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-400 rounded-full inline-block" />Low Interest &lt; 40</span>
        <span className="text-[#8b949e] ml-2">Click a row to expand score breakdown</span>
      </div>

      {loading ? <Spinner /> : error ? <ErrorMsg msg={error} /> : (
        <div className="rounded-xl border border-[#30363d] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#161b22] border-b border-[#30363d]">
                  <Th label="Ticker" col="ticker" />
                  <Th label="Score" col="score" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider whitespace-nowrap">Signal Bar</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider whitespace-nowrap">Label</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider whitespace-nowrap">Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-12 text-[#8b949e]">No signals match your filters</td></tr>
                ) : filtered.map((s, i) => (
                  <>
                    <tr
                      key={s.ticker}
                      onClick={() => setExpandedTicker(expandedTicker === s.ticker ? null : s.ticker)}
                      className={`border-b border-[#30363d]/40 hover:bg-purple-500/5 transition-colors cursor-pointer ${i % 2 === 0 ? '' : 'bg-[#161b22]/30'}`}
                    >
                      <td className="px-4 py-3"><TickerBadge ticker={s.ticker} /></td>
                      <td className="px-4 py-3"><ScorePill score={s.score} /></td>
                      <td className="px-4 py-3 min-w-[160px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-[#0d1117] rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-700 ${s.score >= 60 ? 'bg-green-500' : s.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${s.score}%` }}
                            />
                          </div>
                          <span className="text-xs text-[#8b949e] w-8">{s.score}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <SentimentBadge sentiment={
                          s.label === 'Buy Watch' ? 'bullish' : s.label === 'Low Interest' ? 'bearish' : 'neutral'
                        } />
                        <span className="ml-1.5 text-xs text-[#8b949e]">{s.label}</span>
                      </td>
                      <td className="px-4 py-3 text-[#8b949e] text-xs">{fmtRelative(s.updatedAt)}</td>
                    </tr>
                    {expandedTicker === s.ticker && (
                      <tr key={`${s.ticker}-expand`} className="bg-[#161b22]/60 border-b border-[#30363d]/40">
                        <td colSpan={5} className="px-6 py-4">
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                            {Object.entries(s.breakdown).map(([key, val]) => (
                              <div key={key} className="space-y-1.5">
                                <div className="flex justify-between text-xs">
                                  <span className="text-[#8b949e]">{breakdownLabel[key] ?? key}</span>
                                  <span className={val > 0 ? 'text-green-400 font-semibold' : 'text-[#8b949e]'}>{val}/{breakdownMax[key] ?? 25}</span>
                                </div>
                                <div className="h-1.5 bg-[#0d1117] rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-purple-500 transition-all duration-500"
                                    style={{ width: `${(val / (breakdownMax[key] ?? 25)) * 100}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Earnings Tab ──────────────────────────────────────────────────

function EarningsTab() {
  const [subTab, setSubTab] = useState<'upcoming' | 'recent'>('upcoming')
  const [data, setData] = useState<EarningsRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [days, setDays] = useState('14')
  const [search, setSearch] = useState('')
  const [beatFilter, setBeatFilter] = useState('all')
  const [sortKey, setSortKey] = useState('reportDate')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  useEffect(() => {
    setLoading(true)
    setError('')
    const url = subTab === 'upcoming'
      ? `${API}/earnings/upcoming?days=${days}`
      : `${API}/earnings/recent?days=${days}`
    fetch(url)
      .then(r => r.json())
      .then(d => { setData(d.earnings || []); setLoading(false) })
      .catch(() => { setError('Failed to load earnings.'); setLoading(false) })
  }, [subTab, days])

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = data
    .filter(e => {
      if (search && !e.ticker.toUpperCase().includes(search.toUpperCase())) return false
      if (beatFilter === 'beat' && e.beatMiss !== 'beat') return false
      if (beatFilter === 'miss' && e.beatMiss !== 'miss') return false
      if (beatFilter === 'reported' && e.status !== 'reported') return false
      if (beatFilter === 'pending' && e.status === 'reported') return false
      return true
    })
    .sort((a, b) => {
      let av: number, bv: number
      if (sortKey === 'reportDate') {
        av = new Date(a.reportDate).getTime()
        bv = new Date(b.reportDate).getTime()
      } else if (sortKey === 'epsEstimate' || sortKey === 'epsActual' || sortKey === 'daysUntil') {
        av = (a as unknown as Record<string, unknown>)[sortKey] as number ?? 0
        bv = (b as unknown as Record<string, unknown>)[sortKey] as number ?? 0
      } else {
        av = 0; bv = 0
      }
      return sortDir === 'asc' ? av - bv : bv - av
    })

  const Th = ({ label, col }: { label: string; col: string }) => (
    <th onClick={() => toggleSort(col)} className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider cursor-pointer hover:text-[#e6edf3] transition-colors select-none whitespace-nowrap">
      {label}<SortIcon active={sortKey === col} dir={sortDir} />
    </th>
  )

  return (
    <div className="space-y-4">
      {/* Sub-tabs */}
      <div className="flex gap-1 p-1 bg-[#161b22] border border-[#30363d] rounded-xl w-fit">
        {(['upcoming', 'recent'] as const).map(t => (
          <button
            key={t}
            onClick={() => { setSubTab(t); setSortKey('reportDate'); setSortDir(t === 'upcoming' ? 'asc' : 'desc') }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
              subTab === t ? 'bg-purple-600 text-white shadow' : 'text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            {t === 'upcoming' ? 'Upcoming' : 'Recent'}
          </button>
        ))}
      </div>

      <FilterBar>
        <Input placeholder="Search ticker..." value={search} onChange={setSearch} className="w-36" />
        {subTab === 'recent' && (
          <Select value={beatFilter} onChange={setBeatFilter} options={[
            { value: 'all', label: 'All Results' },
            { value: 'beat', label: 'Beat Only' },
            { value: 'miss', label: 'Miss Only' },
          ]} />
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8b949e] whitespace-nowrap">Days:</span>
          <Select value={days} onChange={setDays} options={
            subTab === 'upcoming'
              ? [{ value: '7', label: '7 days' }, { value: '14', label: '14 days' }, { value: '30', label: '30 days' }]
              : [{ value: '7', label: '7 days' }, { value: '14', label: '14 days' }, { value: '30', label: '30 days' }]
          } />
        </div>
        <ResultCount n={filtered.length} label="earnings" />
      </FilterBar>

      {loading ? <Spinner /> : error ? <ErrorMsg msg={error} /> : (
        <div className="rounded-xl border border-[#30363d] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#161b22] border-b border-[#30363d]">
                  <Th label="Ticker" col="ticker" />
                  <Th label="Date" col="reportDate" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider whitespace-nowrap">When</th>
                  <Th label="EPS Est." col="epsEstimate" />
                  {subTab === 'recent' && <Th label="EPS Actual" col="epsActual" />}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider whitespace-nowrap">Rev Est.</th>
                  {subTab === 'recent' && <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider whitespace-nowrap">Rev Actual</th>}
                  {subTab === 'upcoming' && <Th label="Days Until" col="daysUntil" />}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider whitespace-nowrap">Result</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-12 text-[#8b949e]">No earnings match your filters</td></tr>
                ) : filtered.map((e, i) => (
                  <tr key={`${e.ticker}-${e.reportDate}`} className={`border-b border-[#30363d]/40 hover:bg-purple-500/5 transition-colors ${i % 2 === 0 ? '' : 'bg-[#161b22]/30'}`}>
                    <td className="px-4 py-3"><TickerBadge ticker={e.ticker} /></td>
                    <td className="px-4 py-3 text-[#e6edf3]">{fmtDate(e.reportDate)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded border ${
                        e.reportTime === 'before_market' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        e.reportTime === 'after_market' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                        'bg-[#161b22] text-[#8b949e] border-[#30363d]'
                      }`}>
                        {e.reportTime === 'before_market' ? 'Pre-market' : e.reportTime === 'after_market' ? 'After-market' : 'Unknown'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#8b949e]">{e.epsEstimate != null ? `$${fmt(e.epsEstimate)}` : '—'}</td>
                    {subTab === 'recent' && (
                      <td className={`px-4 py-3 font-semibold ${e.epsActual != null && e.epsEstimate != null && e.epsActual > e.epsEstimate ? 'text-green-400' : e.epsActual != null && e.epsEstimate != null ? 'text-red-400' : 'text-[#8b949e]'}`}>
                        {e.epsActual != null ? `$${fmt(e.epsActual)}` : '—'}
                      </td>
                    )}
                    <td className="px-4 py-3 text-[#8b949e]">{fmtRevenue(e.revenueEstimate)}</td>
                    {subTab === 'recent' && <td className="px-4 py-3 text-[#8b949e]">{fmtRevenue(e.revenueActual)}</td>}
                    {subTab === 'upcoming' && (
                      <td className="px-4 py-3">
                        <span className={`font-semibold text-sm ${e.daysUntil === 0 ? 'text-yellow-400' : e.daysUntil <= 3 ? 'text-orange-400' : 'text-[#e6edf3]'}`}>
                          {e.daysUntil === 0 ? 'Today' : e.daysUntil === 1 ? 'Tomorrow' : `${e.daysUntil}d`}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      {e.beatMiss === 'beat' ? (
                        <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded">BEAT</span>
                      ) : e.beatMiss === 'miss' ? (
                        <span className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">MISS</span>
                      ) : e.status === 'reported' ? (
                        <span className="text-xs text-[#8b949e]">Reported</span>
                      ) : (
                        <span className="text-xs text-yellow-400/70">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// ── News Tab ──────────────────────────────────────────────────────

function NewsTab() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sentiment, setSentiment] = useState('all')
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState('50')

  useEffect(() => {
    setLoading(true)
    setError('')
    fetch(`${API}/news/feed?limit=${limit}`)
      .then(r => r.json())
      .then(d => { setArticles(d.articles || []); setLoading(false) })
      .catch(() => { setError('Failed to load news.'); setLoading(false) })
  }, [limit])

  const filtered = articles.filter(a => {
    if (sentiment !== 'all' && a.sentiment !== sentiment) return false
    const q = search.toUpperCase()
    if (q && !a.ticker.includes(q) && !a.headline.toUpperCase().includes(q)) return false
    return true
  })

  const sentimentCounts = articles.reduce<Record<string, number>>((acc, a) => {
    acc[a.sentiment] = (acc[a.sentiment] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-4">
      <FilterBar>
        <Input placeholder="Search ticker or headline..." value={search} onChange={setSearch} className="w-56" />
        <Select value={sentiment} onChange={setSentiment} options={[
          { value: 'all', label: `All (${articles.length})` },
          { value: 'bullish', label: `Bullish (${sentimentCounts.bullish ?? 0})` },
          { value: 'neutral', label: `Neutral (${sentimentCounts.neutral ?? 0})` },
          { value: 'bearish', label: `Bearish (${sentimentCounts.bearish ?? 0})` },
        ]} />
        <Select value={limit} onChange={setLimit} options={[
          { value: '25', label: '25 articles' },
          { value: '50', label: '50 articles' },
          { value: '100', label: '100 articles' },
        ]} />
        <ResultCount n={filtered.length} label="articles" />
      </FilterBar>

      {loading ? <Spinner /> : error ? <ErrorMsg msg={error} /> : (
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#8b949e]">No articles match your filters</div>
          ) : filtered.map((a, i) => (
            <a
              key={`${a.url}-${i}`}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 p-4 rounded-xl border border-[#30363d] bg-[#161b22]/50 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200 group block"
            >
              <div className="flex-shrink-0 mt-0.5">
                <TickerBadge ticker={a.ticker} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#e6edf3] text-sm font-medium leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">
                  {a.headline}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <SentimentBadge sentiment={a.sentiment} />
                  <span className="text-xs text-[#8b949e]">{a.source}</span>
                  <span className="text-xs text-[#8b949e]">{fmtRelative(a.published_at)}</span>
                </div>
              </div>
              <span className="text-[#8b949e] group-hover:text-purple-400 transition-colors flex-shrink-0 text-sm">↗</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Stock Lookup Tab ──────────────────────────────────────────────

function LookupTab() {
  const [input, setInput] = useState('')
  const [ticker, setTicker] = useState('')
  const [detail, setDetail] = useState<StockDetail | null>(null)
  const [signal, setSignal] = useState<Signal | null>(null)
  const [history, setHistory] = useState<MentionHistory | null>(null)
  const [surprises, setSurprises] = useState<Array<{ date: string; epsEstimated: number; eps: number; surprise: number; surprisePct: number }>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const lookup = (t: string) => {
    const sym = t.toUpperCase().trim()
    if (!sym) return
    setTicker(sym)
    setLoading(true)
    setError('')
    setDetail(null)
    setSignal(null)
    setHistory(null)
    setSurprises([])

    Promise.allSettled([
      fetch(`${API}/stocks/${sym}/detail`).then(r => r.json()),
      fetch(`${API}/signals/${sym}`).then(r => r.json()),
      fetch(`${API}/trending/history/${sym}?days=7`).then(r => r.json()),
      fetch(`${API}/earnings/${sym}/surprises`).then(r => r.json()),
    ]).then(([detailRes, signalRes, histRes, surprisesRes]) => {
      if (detailRes.status === 'fulfilled') setDetail(detailRes.value)
      if (signalRes.status === 'fulfilled' && signalRes.value.score != null) setSignal(signalRes.value)
      if (histRes.status === 'fulfilled' && histRes.value.history) setHistory(histRes.value)
      if (surprisesRes.status === 'fulfilled' && surprisesRes.value.surprises) setSurprises(surprisesRes.value.surprises)
      setLoading(false)
      if (detailRes.status === 'rejected') setError(`No data found for "${sym}"`)
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    lookup(input)
  }

  const popular = ['NVDA', 'AAPL', 'TSLA', 'MSFT', 'META', 'AMZN', 'AMD', 'SPY']

  const breakdownLabel: Record<string, string> = {
    redditMentionSurge: 'Reddit Surge',
    stockTwitsBullish: 'StockTwits',
    newsSentiment: 'News Sentiment',
    earningsBeat: 'Earnings Beat',
    upcomingEarnings: 'Upcoming Earnings',
  }
  const breakdownMax: Record<string, number> = {
    redditMentionSurge: 25, stockTwitsBullish: 20, newsSentiment: 20, earningsBeat: 20, upcomingEarnings: 15,
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter ticker symbol (e.g. NVDA, AAPL, TSLA)"
          value={input}
          onChange={e => setInput(e.target.value.toUpperCase())}
          className="flex-1 px-4 py-3 rounded-xl bg-[#161b22] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-purple-600/25 whitespace-nowrap"
        >
          Look Up
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-[#8b949e] py-1">Popular:</span>
        {popular.map(t => (
          <button
            key={t}
            onClick={() => { setInput(t); lookup(t) }}
            className="px-2.5 py-1 rounded-lg border border-[#30363d] text-xs font-mono text-[#8b949e] hover:border-purple-500/50 hover:text-purple-300 hover:bg-purple-500/10 transition-all duration-200"
          >
            {t}
          </button>
        ))}
      </div>

      {loading && <Spinner />}
      {error && <ErrorMsg msg={error} />}

      {detail && !loading && (
        <div className="space-y-6">
          {/* Header card */}
          <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h2 className="text-2xl font-bold text-[#e6edf3]">{ticker}</h2>
                  {detail.profile && <span className="text-[#8b949e] text-lg">{detail.profile.name}</span>}
                  {detail.profile && (
                    <span className="px-2 py-0.5 rounded-md text-xs border border-[#30363d] text-[#8b949e] bg-[#0d1117]">
                      {detail.profile.sector}
                    </span>
                  )}
                </div>
                {detail.profile && (
                  <p className="text-[#8b949e] text-sm leading-relaxed line-clamp-3">{detail.profile.description}</p>
                )}
                {detail.profile?.website && (
                  <a href={detail.profile.website} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 text-sm mt-2 inline-block transition-colors">
                    {detail.profile.website} ↗
                  </a>
                )}
              </div>
              {detail.quote && (
                <div className="flex-shrink-0 text-right">
                  <div className="text-3xl font-bold text-[#e6edf3]">${fmt(detail.quote.price)}</div>
                  <div className={`text-lg font-semibold ${detail.quote.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {detail.quote.change >= 0 ? '+' : ''}${fmt(detail.quote.change)} ({detail.quote.changePercent >= 0 ? '+' : ''}{fmt(detail.quote.changePercent)}%)
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 mt-2 text-xs text-[#8b949e]">
                    <span>Open: ${fmt(detail.quote.open)}</span>
                    <span>Prev: ${fmt(detail.quote.prevClose)}</span>
                    <span className="text-green-400">H: ${fmt(detail.quote.high)}</span>
                    <span className="text-red-400">L: ${fmt(detail.quote.low)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Signal card */}
            {signal && (
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#e6edf3]">Buy Signal</h3>
                  <ScorePill score={signal.score} />
                </div>
                <ScoreBar score={signal.score} />
                <div className="space-y-2.5">
                  {Object.entries(signal.breakdown).map(([k, v]) => (
                    <div key={k}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#8b949e]">{breakdownLabel[k] ?? k}</span>
                        <span className={v > 0 ? 'text-purple-400 font-semibold' : 'text-[#8b949e]'}>{v}/{breakdownMax[k] ?? 25}</span>
                      </div>
                      <div className="h-1 bg-[#0d1117] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 transition-all duration-700"
                          style={{ width: `${(v / (breakdownMax[k] ?? 25)) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-[#8b949e]">Updated {fmtRelative(signal.updatedAt)}</div>
              </div>
            )}

            {/* Earnings surprise history — 8 quarters via FMP */}
            <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#e6edf3]">Earnings Surprises</h3>
                <span className="text-xs text-[#8b949e]">8 quarters · via FMP</span>
              </div>

              {surprises.length === 0 ? (
                <p className="text-[#8b949e] text-sm">No surprise history available</p>
              ) : (() => {
                const displayed = [...surprises].reverse()
                const maxAbs = Math.max(...displayed.map(e => Math.abs(e.surprisePct)), 1)
                const beatsCount = displayed.filter(e => e.surprisePct > 0).length
                return (
                  <>
                    {/* Summary pill */}
                    <div className="flex items-center gap-3 mb-4 text-xs">
                      <span className="text-green-400 font-semibold">{beatsCount}/{displayed.length} beats</span>
                      <span className="text-[#8b949e]">avg surprise:</span>
                      <span className={`font-semibold ${displayed.reduce((s, e) => s + e.surprisePct, 0) / displayed.length >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {(displayed.reduce((s, e) => s + e.surprisePct, 0) / displayed.length).toFixed(2)}%
                      </span>
                    </div>

                    {/* Bar chart */}
                    <div className="flex items-end gap-1.5 h-24 mb-3">
                      {displayed.map(e => {
                        const beat = e.surprisePct >= 0
                        const heightPct = Math.max((Math.abs(e.surprisePct) / maxAbs) * 100, 4)
                        return (
                          <div key={e.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
                              <div className="bg-[#0d1117] border border-[#30363d] rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap shadow-xl">
                                <div className="font-semibold text-[#e6edf3]">{new Date(e.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</div>
                                <div className="text-[#8b949e]">Est: ${fmt(e.epsEstimated)}</div>
                                <div className={beat ? 'text-green-400' : 'text-red-400'}>Act: ${fmt(e.eps)}</div>
                                <div className={`font-bold ${beat ? 'text-green-400' : 'text-red-400'}`}>{beat ? '+' : ''}{fmt(e.surprisePct)}%</div>
                              </div>
                              <div className={`w-2 h-2 rotate-45 -mt-1 border-r border-b border-[#30363d] ${beat ? 'bg-green-500/10' : 'bg-red-500/10'}`} />
                            </div>
                            {/* Bar */}
                            <div className="flex-1 w-full flex items-end">
                              <div
                                className={`w-full rounded-t transition-all duration-500 ${beat ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'}`}
                                style={{ height: `${heightPct}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Quarter labels */}
                    <div className="flex gap-1.5">
                      {displayed.map(e => (
                        <div key={e.date} className="flex-1 text-center text-[9px] text-[#8b949e] truncate">
                          {new Date(e.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                        </div>
                      ))}
                    </div>

                    {/* Next earnings */}
                    {detail.nextEarnings && (
                      <div className="mt-4 pt-4 border-t border-[#30363d] flex items-center justify-between text-sm">
                        <span className="text-[#8b949e]">Next report</span>
                        <div className="text-right">
                          <span className="text-yellow-400 font-semibold">{fmtDate(detail.nextEarnings.date)}</span>
                          {detail.nextEarnings.epsEstimate != null && (
                            <span className="text-[#8b949e] text-xs ml-2">Est. ${fmt(detail.nextEarnings.epsEstimate)}</span>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>

            {/* Mention history */}
            {history && history.history.length > 0 && (
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
                <h3 className="font-semibold text-[#e6edf3] mb-4">Reddit Mentions (7d)</h3>
                <div className="space-y-2">
                  {[...history.history].reverse().map(h => {
                    const maxM = Math.max(...history.history.map(x => x.mentions), 1)
                    const pct = (h.mentions / maxM) * 100
                    return (
                      <div key={h.date} className="flex items-center gap-3 text-xs">
                        <span className="text-[#8b949e] w-16 flex-shrink-0">
                          {new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <div className="flex-1 h-1.5 bg-[#0d1117] rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-[#e6edf3] w-12 text-right font-semibold">{h.mentions.toLocaleString()}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* News sentiment */}
          {detail.newsSentiment && (
            <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[#e6edf3]">News Sentiment</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8b949e]">Score:</span>
                  <ScorePill score={detail.newsSentiment.score} />
                  <SentimentBadge sentiment={detail.newsSentiment.label.toLowerCase()} />
                </div>
              </div>
              <div className="space-y-3">
                {detail.newsSentiment.topArticles.map((a, i) => (
                  <a
                    key={i}
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <SentimentBadge sentiment={a.sentiment} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#8b949e] group-hover:text-purple-300 transition-colors line-clamp-1 leading-snug">
                        {a.headline}
                      </p>
                      <div className="flex gap-2 mt-0.5 text-xs text-[#8b949e]">
                        <span>{a.source}</span>
                        <span>·</span>
                        <span>{fmtRelative(a.publishedAt)}</span>
                      </div>
                    </div>
                    <span className="text-[#8b949e] group-hover:text-purple-400 text-sm flex-shrink-0">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Profile extra info */}
          {detail.profile && (
            <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
              <h3 className="font-semibold text-[#e6edf3] mb-4">Company Profile</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div><p className="text-xs text-[#8b949e] mb-1">Sector</p><p className="text-[#e6edf3]">{detail.profile.sector || '—'}</p></div>
                <div><p className="text-xs text-[#8b949e] mb-1">Industry</p><p className="text-[#e6edf3]">{detail.profile.industry || '—'}</p></div>
                <div><p className="text-xs text-[#8b949e] mb-1">CEO</p><p className="text-[#e6edf3]">{detail.profile.ceo || '—'}</p></div>
                <div><p className="text-xs text-[#8b949e] mb-1">Market</p><p className="text-[#e6edf3]">{detail.market || '—'}</p></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ── Bulk Watchlist Tab ────────────────────────────────────────────

interface BulkStock {
  ticker: string
  name?: string
  price?: number
  change?: number
  changePercent?: number
  score?: number
  label?: string
}

function WatchlistTab() {
  const [input, setInput] = useState('NVDA,AAPL,TSLA,META,MSFT')
  const [results, setResults] = useState<BulkStock[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sortKey, setSortKey] = useState('ticker')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const load = () => {
    const tickers = input.split(',').map(t => t.trim().toUpperCase()).filter(Boolean).slice(0, 20)
    if (!tickers.length) return
    setLoading(true)
    setError('')
    fetch(`${API}/stocks/bulk?tickers=${tickers.join(',')}`)
      .then(r => r.json())
      .then(d => {
        const stocks: BulkStock[] = (d.stocks || d.results || d || []).map((s: Record<string, unknown>) => ({
          ticker: String(s.ticker ?? ''),
          name: s.name ? String(s.name) : undefined,
          price: s.price != null ? Number(s.price) : s.quote ? Number((s.quote as Record<string, unknown>).price) : undefined,
          change: s.change != null ? Number(s.change) : s.quote ? Number((s.quote as Record<string, unknown>).change) : undefined,
          changePercent: s.changePercent != null ? Number(s.changePercent) : s.quote ? Number((s.quote as Record<string, unknown>).changePercent) : undefined,
          score: s.score != null ? Number(s.score) : s.signal ? Number((s.signal as Record<string, unknown>).score) : undefined,
          label: s.label ? String(s.label) : s.signal ? String((s.signal as Record<string, unknown>).label) : undefined,
        }))
        setResults(stocks)
        setLoading(false)
      })
      .catch(() => { setError('Failed to load watchlist.'); setLoading(false) })
  }

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const sorted = [...results].sort((a, b) => {
    const av = (a as unknown as Record<string, unknown>)[sortKey]
    const bv = (b as unknown as Record<string, unknown>)[sortKey]
    if (typeof av === 'string' && typeof bv === 'string') {
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    }
    return sortDir === 'asc' ? (Number(av) || 0) - (Number(bv) || 0) : (Number(bv) || 0) - (Number(av) || 0)
  })

  const Th = ({ label, col }: { label: string; col: string }) => (
    <th onClick={() => toggleSort(col)} className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider cursor-pointer hover:text-[#e6edf3] transition-colors select-none whitespace-nowrap">
      {label}<SortIcon active={sortKey === col} dir={sortDir} />
    </th>
  )

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
        <p className="text-xs text-[#8b949e] mb-3">Enter up to 20 tickers separated by commas to get bulk quotes and signals</p>
        <div className="flex gap-2 flex-col sm:flex-row">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value.toUpperCase())}
            placeholder="NVDA,AAPL,TSLA,META,MSFT"
            className="flex-1 px-3 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] text-sm focus:outline-none focus:border-purple-500/60 transition-colors font-mono"
          />
          <button
            onClick={load}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-purple-600/20 whitespace-nowrap"
          >
            Load Watchlist
          </button>
        </div>
      </div>

      {loading && <Spinner />}
      {error && <ErrorMsg msg={error} />}

      {sorted.length > 0 && !loading && (
        <div className="rounded-xl border border-[#30363d] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#161b22] border-b border-[#30363d]">
                  <Th label="Ticker" col="ticker" />
                  {sorted.some(s => s.name) && <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Company</th>}
                  <Th label="Price" col="price" />
                  <Th label="Change" col="change" />
                  <Th label="Change %" col="changePercent" />
                  <Th label="Signal" col="score" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Label</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((s, i) => (
                  <tr key={s.ticker} className={`border-b border-[#30363d]/40 hover:bg-purple-500/5 transition-colors ${i % 2 === 0 ? '' : 'bg-[#161b22]/30'}`}>
                    <td className="px-4 py-3"><TickerBadge ticker={s.ticker} /></td>
                    {sorted.some(x => x.name) && <td className="px-4 py-3 text-[#8b949e] max-w-[180px] truncate">{s.name || '—'}</td>}
                    <td className="px-4 py-3 font-semibold text-[#e6edf3]">{s.price != null ? `$${fmt(s.price)}` : '—'}</td>
                    <td className={`px-4 py-3 font-semibold ${s.change == null ? 'text-[#8b949e]' : s.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {s.change != null ? `${s.change >= 0 ? '+' : ''}$${fmt(Math.abs(s.change))}` : '—'}
                    </td>
                    <td className={`px-4 py-3 font-semibold ${s.changePercent == null ? 'text-[#8b949e]' : s.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {s.changePercent != null ? `${s.changePercent >= 0 ? '+' : ''}${fmt(s.changePercent)}%` : '—'}
                    </td>
                    <td className="px-4 py-3">{s.score != null ? <ScorePill score={s.score} /> : <span className="text-[#8b949e]">—</span>}</td>
                    <td className="px-4 py-3">
                      {s.label ? <SentimentBadge sentiment={
                        s.label === 'Buy Watch' ? 'bullish' : s.label === 'Low Interest' ? 'bearish' : 'neutral'
                      } /> : <span className="text-[#8b949e]">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────

const TABS = [
  { id: 'trending', label: 'Trending', icon: '🔥', desc: 'Reddit buzz & StockTwits sentiment' },
  { id: 'signals', label: 'Signals', icon: '📡', desc: 'Buy signals & score breakdown' },
  { id: 'earnings', label: 'Earnings', icon: '📅', desc: 'Upcoming & recent earnings' },
  { id: 'news', label: 'News', icon: '📰', desc: 'Live news feed with sentiment' },
  { id: 'lookup', label: 'Stock Lookup', icon: '🔍', desc: 'Full detail for any ticker' },
  { id: 'watchlist', label: 'Watchlist', icon: '⭐', desc: 'Bulk quotes & signals' },
]

export default function StockMonk() {
  const [activeTab, setActiveTab] = useState('trending')

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-16 border-b border-[#30363d]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live Market Data
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#e6edf3] mb-4">
            Stock<span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Monk</span>
            <span className="text-[#8b949e] font-normal text-3xl ml-3">Dashboard</span>
          </h1>
          <p className="text-[#8b949e] text-lg max-w-2xl mb-6">
            Real-time stock intelligence powered by Reddit buzz, StockTwits sentiment, earnings data, and news — all in one place to help you find the right stocks.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {[
              { icon: '📡', label: 'Reddit Mentions' },
              { icon: '💬', label: 'StockTwits Sentiment' },
              { icon: '📰', label: 'News & Sentiment' },
              { icon: '📅', label: 'Earnings Calendar' },
              { icon: '🎯', label: 'Buy Signals (0–100)' },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-[#8b949e]">
                <span>{f.icon}</span><span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab bar */}
        <div className="flex flex-wrap gap-1 p-1 bg-[#161b22] border border-[#30363d] rounded-2xl mb-8">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white shadow-lg shadow-purple-600/20'
                  : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#0d1117]/60'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Active tab description */}
        <div className="mb-6">
          {TABS.filter(t => t.id === activeTab).map(t => (
            <div key={t.id} className="flex items-center gap-2 text-[#8b949e] text-sm">
              <span className="text-lg">{t.icon}</span>
              <span className="font-semibold text-[#e6edf3]">{t.label}</span>
              <span>—</span>
              <span>{t.desc}</span>
            </div>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'trending' && <TrendingTab />}
        {activeTab === 'signals' && <SignalsTab />}
        {activeTab === 'earnings' && <EarningsTab />}
        {activeTab === 'news' && <NewsTab />}
        {activeTab === 'lookup' && <LookupTab />}
        {activeTab === 'watchlist' && <WatchlistTab />}
      </section>

      {/* Footer note */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-xl border border-[#30363d] bg-[#161b22]/50 p-4 text-xs text-[#8b949e] flex flex-wrap gap-x-6 gap-y-2">
          <span>Data sources: ApeWisdom · StockTwits · Finnhub · FMP · Alpha Vantage</span>
          <span>Trending refreshed every 30 min · Earnings every 6h · News every hour</span>
          <span className="text-yellow-400/70">Not financial advice. For research purposes only.</span>
        </div>
      </div>
    </div>
  )
}