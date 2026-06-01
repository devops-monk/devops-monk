import { useState, useEffect, useRef } from 'react'

const API = 'https://stockmonk.devops-monk.com/api/v1'

// ── Types ─────────────────────────────────────────────────────────

interface StockTwits { bullishCount: number; bearishCount: number; bullRatio: number; bearRatio: number }

interface TrendingStock {
  rank: number; ticker: string; name: string
  mentions: number; upvotes: number
  mentions24hAgo: number | null; mentionsDelta24h: string
  rankChange: number | null; rank24hAgo: number | null
  stockTwits: StockTwits | null
}

interface SignalBreakdown {
  redditMentionSurge: number; stockTwitsBullish: number; newsSentiment: number
  earningsBeat: number; upcomingEarnings: number
  insiderBuying?: number; technicalStrength?: number
}

interface Signal {
  ticker: string; score: number; label: string
  breakdown: SignalBreakdown; updatedAt: string
}

interface EarningsRow {
  ticker: string; reportDate: string; reportTime: string
  epsEstimate: number | null; epsActual: number | null
  epsSurprise: number | null; epsSurprisePct: number | null
  revenueEstimate: number | null; revenueActual: number | null
  beatMiss: string | null; daysUntil: number; status: string
}

interface NewsArticle {
  ticker: string; headline: string; source: string; url: string
  sentiment: string; published_at: string
}

interface TechnicalsData {
  available: boolean
  date?: string
  indicators?: {
    rsi14: number | null
    macd: { value: number | null; signal: number | null; histogram: number | null }
    bollingerBands: { upper: number | null; middle: number | null; lower: number | null }
    sma50: number | null
  }
  signals?: {
    rsiOversold: boolean; rsiOverbought: boolean
    macdBullish: boolean; macdCrossover: boolean
    aboveSma50: boolean | null; bbPosition: 'upper' | 'middle' | 'lower' | null
  }
}

interface InsiderTx {
  insiderName: string; relationship: string; transactionType: 'buy' | 'sell' | 'other'
  shares: number; valueUsd: number | null; pricePerShare: number | null; transactionDate: string
}

interface StockDetail {
  ticker: string; market: string; updatedAt: string
  profile: { ticker: string; name: string; sector: string; industry: string; description: string; website: string; ceo: string } | null
  quote: { ticker: string; price: number; change: number; changePercent: number; high: number; low: number; open: number; prevClose: number } | null
  nextEarnings: { date: string; epsEstimate: number | null } | null
  earningsHistory: Array<{ ticker: string; date: string; epsEstimated: number; eps: number; surprise: number; surprisePct: number }>
  newsSentiment: { score: number; label: string; topArticles: Array<{ headline: string; source: string; sentiment: string; publishedAt: string; url: string }> } | null
  // Phase 1 additions
  technicals?: TechnicalsData | null
  insider?: { netBuyShares: number; netBuyValue: number; buyCount: number; sellCount: number; csuiteBuying: boolean; recentTransactions: InsiderTx[] } | null
  subredditBreakdown?: Record<string, { rank: number; mentions: number; upvotes: number }> | null
}

interface MentionHistory {
  ticker: string; history: Array<{ date: string; mentions: number; upvotes: number }>
}

type SortDir = 'asc' | 'desc'

const SUBREDDITS = ['wallstreetbets', 'stocks', 'options', 'investing', 'Daytrading', 'SPACs', 'WallStreetbetsELITE', 'Wallstreetbetsnew'] as const
type Subreddit = typeof SUBREDDITS[number]

const SUBREDDIT_COLOR: Record<Subreddit, string> = {
  wallstreetbets:      'text-orange-400 border-orange-500/30 bg-orange-500/10',
  stocks:              'text-blue-400 border-blue-500/30 bg-blue-500/10',
  options:             'text-purple-400 border-purple-500/30 bg-purple-500/10',
  investing:           'text-green-400 border-green-500/30 bg-green-500/10',
  Daytrading:          'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  SPACs:               'text-pink-400 border-pink-500/30 bg-pink-500/10',
  WallStreetbetsELITE: 'text-red-400 border-red-500/30 bg-red-500/10',
  Wallstreetbetsnew:   'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
}

const BREAKDOWN_LABEL: Record<string, string> = {
  redditMentionSurge: 'Reddit Surge', stockTwitsBullish: 'StockTwits Bullish',
  newsSentiment: 'News Sentiment', earningsBeat: 'Earnings Beat',
  upcomingEarnings: 'Upcoming Earnings', insiderBuying: 'Insider Buying',
  technicalStrength: 'Technical Strength',
}
const BREAKDOWN_MAX: Record<string, number> = {
  redditMentionSurge: 25, stockTwitsBullish: 20, newsSentiment: 20,
  earningsBeat: 20, upcomingEarnings: 15, insiderBuying: 15, technicalStrength: 15,
}

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
    positive: 'bg-green-500/15 text-green-400 border-green-500/25',
    bearish: 'bg-red-500/15 text-red-400 border-red-500/25',
    negative: 'bg-red-500/15 text-red-400 border-red-500/25',
    neutral: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  }
  const cls = map[sentiment?.toLowerCase()] ?? 'bg-[#161b22] text-[#8b949e] border-[#30363d]'
  return <span className={`px-2 py-0.5 rounded-md text-xs font-semibold border ${cls}`}>{sentiment ?? '—'}</span>
}

function ScorePill({ score }: { score: number }) {
  const cls = score >= 60 ? 'bg-green-500/15 text-green-400 border-green-500/25'
    : score >= 40 ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25'
    : 'bg-red-500/15 text-red-400 border-red-500/25'
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-bold border ${cls}`}>{score}</span>
}

function ScoreBar({ score }: { score: number }) {
  const color = score >= 60 ? 'bg-green-500' : score >= 40 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="h-2 bg-[#0d1117] rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${score}%` }} />
    </div>
  )
}

function TickerBadge({ ticker, onClick }: { ticker: string; onClick?: () => void }) {
  return (
    <span
      onClick={onClick}
      className={`font-bold text-[#e6edf3] bg-purple-500/10 px-2 py-0.5 rounded-md text-sm border border-purple-500/20 font-mono tracking-wide ${onClick ? 'cursor-pointer hover:bg-purple-500/20 transition-colors' : ''}`}
    >
      {ticker}
    </span>
  )
}

function CardTitle({ children, right }: { children: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-[#e6edf3]">{children}</h3>
      {right && <div>{right}</div>}
    </div>
  )
}

function Card({ children, className = '', glow = false }: { children: React.ReactNode; className?: string; glow?: boolean }) {
  return (
    <div className={`rounded-xl border border-[#30363d] bg-[#161b22] p-5 ${glow ? 'relative overflow-hidden' : ''} ${className}`}>
      {glow && <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 to-blue-600/8 pointer-events-none" />}
      {glow ? <div className="relative">{children}</div> : children}
    </div>
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

function StyledInput({ placeholder, value, onChange, type = 'text', className = '' }: {
  placeholder?: string; value: string | number; onChange: (v: string) => void; type?: string; className?: string
}) {
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
      className={`px-3 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] text-sm focus:outline-none focus:border-purple-500/60 transition-colors ${className}`}
    />
  )
}

function StyledSelect({ value, onChange, options, className = '' }: {
  value: string | number; onChange: (v: string) => void
  options: { value: string | number; label: string }[]; className?: string
}) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className={`px-3 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] text-sm focus:outline-none focus:border-purple-500/60 cursor-pointer ${className}`}
    >
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  )
}

function ResultCount({ n, label = 'results' }: { n: number; label?: string }) {
  return <span className="text-xs text-[#8b949e] ml-auto">{n.toLocaleString()} {label}</span>
}

// RSI Gauge — colored arc-style number with signal badge
function RsiGauge({ rsi }: { rsi: number | null }) {
  if (rsi == null) return <span className="text-[#8b949e]">—</span>
  const isOversold = rsi < 30
  const isOverbought = rsi > 70
  const color = isOversold ? 'text-green-400' : isOverbought ? 'text-red-400' : 'text-yellow-400'
  const bg = isOversold ? 'bg-green-500/10 border-green-500/20 text-green-400'
    : isOverbought ? 'bg-red-500/10 border-red-500/20 text-red-400'
    : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
  return (
    <div className="flex items-center gap-2">
      <span className={`text-2xl font-bold ${color}`}>{rsi.toFixed(1)}</span>
      <span className={`text-xs px-2 py-0.5 rounded border font-semibold ${bg}`}>
        {isOversold ? 'Oversold' : isOverbought ? 'Overbought' : 'Neutral'}
      </span>
    </div>
  )
}

// MACD direction badge
function MacdBadge({ hist }: { hist: number | null }) {
  if (hist == null) return <span className="text-[#8b949e] text-sm">—</span>
  const bullish = hist > 0
  return (
    <div className="flex items-center gap-2">
      <span className={`text-lg font-bold ${bullish ? 'text-green-400' : 'text-red-400'}`}>
        {bullish ? '▲' : '▼'}
      </span>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${bullish ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
        {bullish ? 'Bullish' : 'Bearish'} {Math.abs(hist).toFixed(3)}
      </span>
    </div>
  )
}

// Insider net direction badge
function InsiderBadge({ netValue, csuite }: { netValue: number; csuite: boolean }) {
  const buying = netValue >= 0
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`text-xs px-2.5 py-1 rounded-lg border font-bold ${buying ? 'bg-green-500/10 text-green-400 border-green-500/25' : 'bg-red-500/10 text-red-400 border-red-500/25'}`}>
        {buying ? '▲ Net Buying' : '▼ Net Selling'}
      </span>
      {csuite && (
        <span className="text-xs px-2 py-0.5 rounded border bg-purple-500/10 text-purple-400 border-purple-500/20 font-semibold">
          C-Suite
        </span>
      )}
    </div>
  )
}

// ── Trending Tab ──────────────────────────────────────────────────

function TrendingTab({ onLookup }: { onLookup: (ticker: string) => void }) {
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
    setLoading(true); setError('')
    fetch(`${API}/trending/stocks?limit=${limit}`)
      .then(r => r.json())
      .then(d => { setStocks(d.stocks || []); setLoading(false) })
      .catch(() => { setError('Failed to load trending stocks.'); setLoading(false) })
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
      return true
    })
    .sort((a, b) => {
      let av: number, bv: number
      if (sortKey === 'mentionsDelta24h') { av = parseFloat(String(a.mentionsDelta24h)) || 0; bv = parseFloat(String(b.mentionsDelta24h)) || 0 }
      else if (sortKey === 'bullRatio') { av = a.stockTwits?.bullRatio ?? -1; bv = b.stockTwits?.bullRatio ?? -1 }
      else { av = Number((a as unknown as Record<string, unknown>)[sortKey]) || 0; bv = Number((b as unknown as Record<string, unknown>)[sortKey]) || 0 }
      return sortDir === 'asc' ? av - bv : bv - av
    })

  const Th = ({ label, col }: { label: string; col: string }) => (
    <th onClick={() => toggleSort(col)} className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider cursor-pointer hover:text-[#e6edf3] transition-colors select-none whitespace-nowrap">
      {label}<SortIcon active={sortKey === col} dir={sortDir} />
    </th>
  )

  return (
    <div className="space-y-4">
      <FilterBar>
        <StyledInput placeholder="Search ticker / name..." value={search} onChange={setSearch} className="w-44" />
        <StyledSelect value={sentimentFilter} onChange={setSentimentFilter} options={[
          { value: 'all', label: 'All Sentiment' }, { value: 'bullish', label: 'Bullish Only' },
          { value: 'bearish', label: 'Bearish Only' },
        ]} />
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8b949e] whitespace-nowrap">Min mentions:</span>
          <StyledInput type="number" placeholder="0" value={minMentions} onChange={setMinMentions} className="w-20" />
        </div>
        <StyledSelect value={limit} onChange={setLimit} options={[
          { value: '10', label: 'Top 10' }, { value: '25', label: 'Top 25' },
          { value: '50', label: 'Top 50' }, { value: '100', label: 'Top 100' },
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Company</th>
                  <Th label="Mentions" col="mentions" />
                  <Th label="Upvotes" col="upvotes" />
                  <Th label="Mention Δ" col="mentionsDelta24h" />
                  <Th label="Rank Δ" col="rankChange" />
                  <Th label="Bullish %" col="bullRatio" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Detail</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="text-center py-12 text-[#8b949e]">No stocks match your filters</td></tr>
                ) : filtered.map((s, i) => (
                  <tr key={s.ticker} className={`border-b border-[#30363d]/40 hover:bg-purple-500/5 transition-colors ${i % 2 ? 'bg-[#161b22]/30' : ''}`}>
                    <td className="px-4 py-3 text-[#8b949e] font-mono text-xs">{s.rank}</td>
                    <td className="px-4 py-3"><TickerBadge ticker={s.ticker} /></td>
                    <td className="px-4 py-3 text-[#8b949e] max-w-[180px] truncate text-xs">{s.name}</td>
                    <td className="px-4 py-3 font-semibold text-[#e6edf3]">{s.mentions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-[#8b949e]">{s.upvotes.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {s.mentionsDelta24h != null
                        ? <span className={`font-semibold ${parseFloat(String(s.mentionsDelta24h)) >= 0 ? 'text-green-400' : 'text-red-400'}`}>{parseFloat(String(s.mentionsDelta24h)) >= 0 ? '+' : ''}{s.mentionsDelta24h}</span>
                        : <span className="text-[#8b949e]">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {s.rankChange != null
                        ? <span className={`font-semibold text-xs ${s.rankChange > 0 ? 'text-green-400' : s.rankChange < 0 ? 'text-red-400' : 'text-[#8b949e]'}`}>
                            {s.rankChange > 0 ? '▲' : s.rankChange < 0 ? '▼' : '—'}{Math.abs(s.rankChange) > 0 ? Math.abs(s.rankChange) : ''}
                          </span>
                        : <span className="text-[#8b949e]">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {s.stockTwits
                        ? <div className="flex items-center gap-2 min-w-[100px]">
                            <div className="flex-1 h-1.5 rounded-full bg-[#0d1117] overflow-hidden flex">
                              <div className="bg-green-500 h-full" style={{ width: `${(s.stockTwits.bullRatio * 100).toFixed(0)}%` }} />
                              <div className="bg-red-500 h-full flex-1" />
                            </div>
                            <span className="text-xs text-green-400 font-semibold w-8 text-right">{(s.stockTwits.bullRatio * 100).toFixed(0)}%</span>
                          </div>
                        : <span className="text-xs text-[#8b949e]">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => onLookup(s.ticker)} className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-semibold">
                        Lookup →
                      </button>
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

// ── Community Tab ─────────────────────────────────────────────────

function CommunityTab({ onLookup }: { onLookup: (ticker: string) => void }) {
  const [activeSubreddit, setActiveSubreddit] = useState<Subreddit>('wallstreetbets')
  const [stocks, setStocks] = useState<Record<Subreddit, TrendingStock[]>>({} as Record<Subreddit, TrendingStock[]>)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch(`${API}/social/subreddits/${activeSubreddit}?limit=50`)
      .then(r => r.json())
      .then(d => {
        setStocks(prev => ({ ...prev, [activeSubreddit]: (d.stocks || []).map((s: Record<string, unknown>, i: number) => ({ rank: i + 1, ticker: s.ticker, name: s.name, mentions: s.mentions, upvotes: s.upvotes, mentionsDelta24h: '—', stockTwits: null })) }))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [activeSubreddit])

  const current = stocks[activeSubreddit] || []
  const filtered = search ? current.filter(s => s.ticker.includes(search.toUpperCase()) || s.name?.toUpperCase().includes(search.toUpperCase())) : current

  return (
    <div className="space-y-4">
      {/* Subreddit selector pills */}
      <div className="flex flex-wrap gap-2">
        {SUBREDDITS.map(sr => (
          <button
            key={sr}
            onClick={() => setActiveSubreddit(sr)}
            className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-200 ${
              activeSubreddit === sr
                ? SUBREDDIT_COLOR[sr]
                : 'text-[#8b949e] border-[#30363d] hover:text-[#e6edf3] hover:bg-[#161b22]'
            }`}
          >
            r/{sr}
          </button>
        ))}
      </div>

      <FilterBar>
        <StyledInput placeholder="Search ticker..." value={search} onChange={setSearch} className="w-40" />
        <div className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border ${SUBREDDIT_COLOR[activeSubreddit]}`}>
          <span className="font-semibold">r/{activeSubreddit}</span>
          <span className="opacity-60">· {current.length} tickers</span>
        </div>
        <ResultCount n={filtered.length} label="stocks" />
      </FilterBar>

      {loading ? <Spinner /> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.length === 0
            ? <div className="col-span-4 text-center py-12 text-[#8b949e]">No data yet for this community</div>
            : filtered.map((s, i) => (
              <div key={s.ticker} className="group rounded-xl border border-[#30363d] bg-[#161b22] p-4 hover:border-purple-500/40 hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <TickerBadge ticker={s.ticker} onClick={() => onLookup(s.ticker)} />
                    <p className="text-xs text-[#8b949e] mt-1 truncate max-w-[130px]">{s.name}</p>
                  </div>
                  <span className="text-xs text-[#8b949e] font-mono">#{i + 1}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-[#e6edf3]">{s.mentions.toLocaleString()}</div>
                    <div className="text-xs text-[#8b949e]">mentions</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[#8b949e]">{s.upvotes.toLocaleString()}</div>
                    <div className="text-xs text-[#8b949e]">upvotes</div>
                  </div>
                </div>
                {/* Mention bar relative to top */}
                {filtered[0]?.mentions > 0 && (
                  <div className="mt-3 h-1 bg-[#0d1117] rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${(s.mentions / filtered[0].mentions) * 100}%` }} />
                  </div>
                )}
              </div>
            ))
          }
        </div>
      )}
    </div>
  )
}

// ── Signals Tab ───────────────────────────────────────────────────

function SignalsTab({ onLookup }: { onLookup: (ticker: string) => void }) {
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
    setLoading(true); setError('')
    fetch(`${API}/signals/top?minScore=${minScore}&limit=${limit}`)
      .then(r => r.json())
      .then(d => { setSignals(d.signals || []); setLoading(false) })
      .catch(() => { setError('Failed to load signals.'); setLoading(false) })
  }, [minScore, limit])

  const filtered = signals
    .filter(s => {
      if (search && !s.ticker.includes(search.toUpperCase())) return false
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

  const Th = ({ label, col }: { label: string; col: string }) => (
    <th onClick={() => toggleSort(col)} className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider cursor-pointer hover:text-[#e6edf3] transition-colors select-none whitespace-nowrap">
      {label}<SortIcon active={sortKey === col} dir={sortDir} />
    </th>
  )

  return (
    <div className="space-y-4">
      <FilterBar>
        <StyledInput placeholder="Search ticker..." value={search} onChange={setSearch} className="w-36" />
        <StyledSelect value={labelFilter} onChange={setLabelFilter} options={[
          { value: 'all', label: 'All Labels' }, { value: 'buy watch', label: 'Buy Watch' },
          { value: 'neutral', label: 'Neutral' }, { value: 'low interest', label: 'Low Interest' },
        ]} />
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8b949e]">Min score:</span>
          <StyledSelect value={minScore} onChange={setMinScore} options={[
            { value: '0', label: 'All (0+)' }, { value: '40', label: 'Neutral (40+)' }, { value: '60', label: 'Buy Watch (60+)' },
          ]} />
        </div>
        <StyledSelect value={limit} onChange={setLimit} options={[
          { value: '20', label: 'Top 20' }, { value: '50', label: 'Top 50' }, { value: '100', label: 'Top 100' },
        ]} />
        <ResultCount n={filtered.length} label="signals" />
      </FilterBar>

      <div className="flex flex-wrap gap-4 text-xs text-[#8b949e]">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-green-400 rounded-full" />Buy Watch ≥ 60</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-yellow-400 rounded-full" />Neutral 40–59</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-red-400 rounded-full" />Low Interest &lt; 40</span>
        <span className="text-[#30363d]">·</span>
        <span>Click row to expand 7-factor breakdown</span>
      </div>

      {loading ? <Spinner /> : error ? <ErrorMsg msg={error} /> : (
        <div className="rounded-xl border border-[#30363d] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#161b22] border-b border-[#30363d]">
                  <Th label="Ticker" col="ticker" />
                  <Th label="Score" col="score" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider min-w-[160px]">Signal Bar</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Label</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Updated</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Detail</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0
                  ? <tr><td colSpan={6} className="text-center py-12 text-[#8b949e]">No signals match your filters</td></tr>
                  : filtered.map((s, i) => (
                    <>
                      <tr
                        key={s.ticker}
                        onClick={() => setExpandedTicker(expandedTicker === s.ticker ? null : s.ticker)}
                        className={`border-b border-[#30363d]/40 hover:bg-purple-500/5 transition-colors cursor-pointer ${i % 2 ? 'bg-[#161b22]/30' : ''}`}
                      >
                        <td className="px-4 py-3"><TickerBadge ticker={s.ticker} /></td>
                        <td className="px-4 py-3"><ScorePill score={s.score} /></td>
                        <td className="px-4 py-3 min-w-[180px]">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-[#0d1117] rounded-full overflow-hidden">
                              <div className={`h-full transition-all duration-700 ${s.score >= 60 ? 'bg-green-500' : s.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${s.score}%` }} />
                            </div>
                            <span className="text-xs text-[#8b949e] w-7">{s.score}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <SentimentBadge sentiment={s.label === 'Buy Watch' ? 'bullish' : s.label === 'Low Interest' ? 'bearish' : 'neutral'} />
                        </td>
                        <td className="px-4 py-3 text-[#8b949e] text-xs">{fmtRelative(s.updatedAt)}</td>
                        <td className="px-4 py-3">
                          <button onClick={e => { e.stopPropagation(); onLookup(s.ticker) }} className="text-xs text-purple-400 hover:text-purple-300 font-semibold">
                            Detail →
                          </button>
                        </td>
                      </tr>
                      {expandedTicker === s.ticker && (
                        <tr key={`${s.ticker}-x`} className="bg-[#0d1117]/80 border-b border-[#30363d]/40">
                          <td colSpan={6} className="px-6 py-4">
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                              {Object.entries(s.breakdown).map(([k, v]) => (
                                <div key={k} className="space-y-1.5">
                                  <div className="flex justify-between text-xs">
                                    <span className="text-[#8b949e] truncate pr-1">{BREAKDOWN_LABEL[k] ?? k}</span>
                                    <span className={v > 0 ? 'text-purple-400 font-bold' : 'text-[#8b949e]'}>{v}/{BREAKDOWN_MAX[k] ?? 25}</span>
                                  </div>
                                  <div className="h-1.5 bg-[#161b22] rounded-full overflow-hidden">
                                    <div className={`h-full transition-all duration-500 ${v > 0 ? 'bg-purple-500' : 'bg-[#30363d]'}`} style={{ width: `${(v / (BREAKDOWN_MAX[k] ?? 25)) * 100}%` }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                }
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
    setLoading(true); setError('')
    const url = subTab === 'upcoming' ? `${API}/earnings/upcoming?days=${days}` : `${API}/earnings/recent?days=${days}`
    fetch(url).then(r => r.json())
      .then(d => { setData(d.earnings || []); setLoading(false) })
      .catch(() => { setError('Failed to load earnings.'); setLoading(false) })
  }, [subTab, days])

  const toggleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const filtered = data.filter(e => {
    if (search && !e.ticker.toUpperCase().includes(search.toUpperCase())) return false
    if (beatFilter === 'beat' && e.beatMiss !== 'beat') return false
    if (beatFilter === 'miss' && e.beatMiss !== 'miss') return false
    return true
  }).sort((a, b) => {
    let av: number, bv: number
    if (sortKey === 'reportDate') { av = new Date(a.reportDate).getTime(); bv = new Date(b.reportDate).getTime() }
    else { av = (a as unknown as Record<string, number>)[sortKey] ?? 0; bv = (b as unknown as Record<string, number>)[sortKey] ?? 0 }
    return sortDir === 'asc' ? av - bv : bv - av
  })

  const Th = ({ label, col }: { label: string; col: string }) => (
    <th onClick={() => toggleSort(col)} className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider cursor-pointer hover:text-[#e6edf3] transition-colors select-none whitespace-nowrap">
      {label}<SortIcon active={sortKey === col} dir={sortDir} />
    </th>
  )

  return (
    <div className="space-y-4">
      <div className="flex gap-1 p-1 bg-[#161b22] border border-[#30363d] rounded-xl w-fit">
        {(['upcoming', 'recent'] as const).map(t => (
          <button key={t} onClick={() => { setSubTab(t); setSortKey('reportDate'); setSortDir(t === 'upcoming' ? 'asc' : 'desc') }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${subTab === t ? 'bg-purple-600 text-white shadow' : 'text-[#8b949e] hover:text-[#e6edf3]'}`}>
            {t === 'upcoming' ? 'Upcoming' : 'Recent'}
          </button>
        ))}
      </div>

      <FilterBar>
        <StyledInput placeholder="Search ticker..." value={search} onChange={setSearch} className="w-36" />
        {subTab === 'recent' && (
          <StyledSelect value={beatFilter} onChange={setBeatFilter} options={[
            { value: 'all', label: 'All Results' }, { value: 'beat', label: 'Beat Only' }, { value: 'miss', label: 'Miss Only' },
          ]} />
        )}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#8b949e]">Days:</span>
          <StyledSelect value={days} onChange={setDays} options={[
            { value: '7', label: '7 days' }, { value: '14', label: '14 days' }, { value: '30', label: '30 days' },
          ]} />
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
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase">When</th>
                  <Th label="EPS Est." col="epsEstimate" />
                  {subTab === 'recent' && <Th label="EPS Actual" col="epsActual" />}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase">Rev Est.</th>
                  {subTab === 'recent' && <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase">Rev Actual</th>}
                  {subTab === 'upcoming' && <Th label="Days" col="daysUntil" />}
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase">Result</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0
                  ? <tr><td colSpan={8} className="text-center py-12 text-[#8b949e]">No earnings match</td></tr>
                  : filtered.map((e, i) => (
                    <tr key={`${e.ticker}-${e.reportDate}`} className={`border-b border-[#30363d]/40 hover:bg-purple-500/5 transition-colors ${i % 2 ? 'bg-[#161b22]/30' : ''}`}>
                      <td className="px-4 py-3"><TickerBadge ticker={e.ticker} /></td>
                      <td className="px-4 py-3 text-[#e6edf3]">{fmtDate(e.reportDate)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded border ${e.reportTime === 'before_market' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : e.reportTime === 'after_market' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-[#161b22] text-[#8b949e] border-[#30363d]'}`}>
                          {e.reportTime === 'before_market' ? 'Pre-mkt' : e.reportTime === 'after_market' ? 'After-mkt' : 'Unknown'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[#8b949e]">{e.epsEstimate != null ? `$${fmt(e.epsEstimate)}` : '—'}</td>
                      {subTab === 'recent' && (
                        <td className={`px-4 py-3 font-semibold ${e.epsActual != null && e.epsEstimate != null ? (e.epsActual > e.epsEstimate ? 'text-green-400' : 'text-red-400') : 'text-[#8b949e]'}`}>
                          {e.epsActual != null ? `$${fmt(e.epsActual)}` : '—'}
                        </td>
                      )}
                      <td className="px-4 py-3 text-[#8b949e]">{fmtRevenue(e.revenueEstimate)}</td>
                      {subTab === 'recent' && <td className="px-4 py-3 text-[#8b949e]">{fmtRevenue(e.revenueActual)}</td>}
                      {subTab === 'upcoming' && (
                        <td className="px-4 py-3 font-semibold text-sm">
                          <span className={e.daysUntil === 0 ? 'text-yellow-400' : e.daysUntil <= 3 ? 'text-orange-400' : 'text-[#e6edf3]'}>
                            {e.daysUntil === 0 ? 'Today' : e.daysUntil === 1 ? 'Tomorrow' : `${e.daysUntil}d`}
                          </span>
                        </td>
                      )}
                      <td className="px-4 py-3">
                        {e.beatMiss === 'beat' ? <span className="text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded">BEAT</span>
                          : e.beatMiss === 'miss' ? <span className="text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded">MISS</span>
                          : <span className="text-xs text-[#8b949e]">{e.status === 'reported' ? 'Reported' : 'Pending'}</span>}
                      </td>
                    </tr>
                  ))
                }
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
    setLoading(true); setError('')
    fetch(`${API}/news/feed?limit=${limit}`)
      .then(r => r.json())
      .then(d => { setArticles(d.articles || []); setLoading(false) })
      .catch(() => { setError('Failed to load news.'); setLoading(false) })
  }, [limit])

  const counts = articles.reduce<Record<string, number>>((acc, a) => { acc[a.sentiment] = (acc[a.sentiment] ?? 0) + 1; return acc }, {})
  const filtered = articles.filter(a => {
    if (sentiment !== 'all' && a.sentiment !== sentiment) return false
    const q = search.toUpperCase()
    if (q && !a.ticker.includes(q) && !a.headline.toUpperCase().includes(q)) return false
    return true
  })

  return (
    <div className="space-y-4">
      <FilterBar>
        <StyledInput placeholder="Search ticker or headline..." value={search} onChange={setSearch} className="w-56" />
        <StyledSelect value={sentiment} onChange={setSentiment} options={[
          { value: 'all', label: `All (${articles.length})` },
          { value: 'bullish', label: `Bullish (${counts.bullish ?? 0})` },
          { value: 'neutral', label: `Neutral (${counts.neutral ?? 0})` },
          { value: 'bearish', label: `Bearish (${counts.bearish ?? 0})` },
        ]} />
        <StyledSelect value={limit} onChange={setLimit} options={[
          { value: '25', label: '25 articles' }, { value: '50', label: '50 articles' }, { value: '100', label: '100 articles' },
        ]} />
        <ResultCount n={filtered.length} label="articles" />
      </FilterBar>

      {loading ? <Spinner /> : error ? <ErrorMsg msg={error} /> : (
        <div className="space-y-2">
          {filtered.length === 0
            ? <div className="text-center py-12 text-[#8b949e]">No articles match</div>
            : filtered.map((a, i) => (
              <a key={`${a.url}-${i}`} href={a.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-[#30363d] bg-[#161b22]/50 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-200 group block">
                <div className="flex-shrink-0 mt-0.5"><TickerBadge ticker={a.ticker} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#e6edf3] text-sm font-medium leading-snug group-hover:text-purple-300 transition-colors line-clamp-2">{a.headline}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <SentimentBadge sentiment={a.sentiment} />
                    <span className="text-xs text-[#8b949e]">{a.source}</span>
                    <span className="text-xs text-[#8b949e]">{fmtRelative(a.published_at)}</span>
                  </div>
                </div>
                <span className="text-[#8b949e] group-hover:text-purple-400 text-sm flex-shrink-0">↗</span>
              </a>
            ))
          }
        </div>
      )}
    </div>
  )
}

// ── Technicals Card ───────────────────────────────────────────────

function TechnicalsCard({ data }: { data: TechnicalsData | null | undefined }) {
  if (!data) return null
  if (!data.available || !data.indicators) {
    return (
      <Card>
        <CardTitle right={<span className="text-xs text-[#8b949e]">Alpha Vantage</span>}>Technicals</CardTitle>
        <p className="text-[#8b949e] text-sm">Technical indicators not yet available for this ticker</p>
      </Card>
    )
  }
  const { rsi14, macd, bollingerBands, sma50 } = data.indicators
  const sig = data.signals!

  return (
    <Card>
      <CardTitle right={<span className="text-xs text-[#8b949e]">Alpha Vantage · {data.date}</span>}>Technicals</CardTitle>
      <div className="space-y-5">
        {/* RSI */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8b949e] uppercase tracking-wider">RSI (14)</span>
            <span className="text-xs text-[#8b949e]">Overbought &gt;70 · Oversold &lt;30</span>
          </div>
          <RsiGauge rsi={rsi14} />
          {rsi14 != null && (
            <div className="mt-2 h-2 bg-[#0d1117] rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 left-[30%] right-[30%] bg-yellow-500/20 rounded" />
              <div className="absolute left-[30%] top-0 bottom-0 w-px bg-yellow-500/40" />
              <div className="absolute right-[30%] top-0 bottom-0 w-px bg-yellow-500/40" />
              <div className={`absolute top-0 bottom-0 w-2 -ml-1 rounded-full ${sig.rsiOversold ? 'bg-green-400' : sig.rsiOverbought ? 'bg-red-400' : 'bg-yellow-400'}`} style={{ left: `${rsi14}%` }} />
            </div>
          )}
        </div>

        {/* MACD */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#8b949e] uppercase tracking-wider">MACD</span>
            {sig.macdCrossover && <span className="text-xs bg-green-500/15 text-green-400 border border-green-500/20 px-2 py-0.5 rounded font-semibold">Crossover!</span>}
          </div>
          <MacdBadge hist={macd.histogram} />
          <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
            <div className="text-center bg-[#0d1117] rounded-lg p-2">
              <div className="text-[#8b949e] mb-0.5">MACD</div>
              <div className="font-semibold text-[#e6edf3]">{fmt(macd.value, 3)}</div>
            </div>
            <div className="text-center bg-[#0d1117] rounded-lg p-2">
              <div className="text-[#8b949e] mb-0.5">Signal</div>
              <div className="font-semibold text-[#e6edf3]">{fmt(macd.signal, 3)}</div>
            </div>
            <div className="text-center bg-[#0d1117] rounded-lg p-2">
              <div className="text-[#8b949e] mb-0.5">Histogram</div>
              <div className={`font-semibold ${(macd.histogram ?? 0) > 0 ? 'text-green-400' : 'text-red-400'}`}>{fmt(macd.histogram, 3)}</div>
            </div>
          </div>
        </div>

        {/* Bollinger Bands + SMA */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-xs text-[#8b949e] uppercase tracking-wider block mb-2">Bollinger Bands</span>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-[#8b949e]">Upper</span><span className="text-[#e6edf3] font-semibold">{bollingerBands.upper ? `$${fmt(bollingerBands.upper)}` : '—'}</span></div>
              <div className="flex justify-between"><span className="text-yellow-400">Middle</span><span className="text-yellow-400 font-semibold">{bollingerBands.middle ? `$${fmt(bollingerBands.middle)}` : '—'}</span></div>
              <div className="flex justify-between"><span className="text-[#8b949e]">Lower</span><span className="text-[#e6edf3] font-semibold">{bollingerBands.lower ? `$${fmt(bollingerBands.lower)}` : '—'}</span></div>
            </div>
          </div>
          <div>
            <span className="text-xs text-[#8b949e] uppercase tracking-wider block mb-2">SMA 50</span>
            <div className="text-lg font-bold text-[#e6edf3]">{sma50 ? `$${fmt(sma50)}` : '—'}</div>
            {sig.aboveSma50 != null && (
              <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded border font-semibold ${sig.aboveSma50 ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-red-400 bg-red-500/10 border-red-500/20'}`}>
                {sig.aboveSma50 ? 'Above SMA50' : 'Below SMA50'}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

// ── Insider Card ──────────────────────────────────────────────────

function InsiderCard({ data }: { data: StockDetail['insider'] | null | undefined }) {
  if (!data) return null
  const isNetBuying = data.netBuyShares > 0

  return (
    <Card>
      <CardTitle right={<span className="text-xs text-[#8b949e]">SEC EDGAR · Form 4</span>}>
        Insider Activity
      </CardTitle>
      <div className="space-y-4">
        {/* Summary */}
        <div className="flex items-center gap-3 flex-wrap">
          <InsiderBadge netValue={data.netBuyValue} csuite={data.csuiteBuying} />
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="bg-[#0d1117] rounded-lg p-2 text-center">
            <div className="text-green-400 font-bold text-base">{data.buyCount}</div>
            <div className="text-[#8b949e]">Buys</div>
          </div>
          <div className="bg-[#0d1117] rounded-lg p-2 text-center">
            <div className="text-red-400 font-bold text-base">{data.sellCount}</div>
            <div className="text-[#8b949e]">Sells</div>
          </div>
          <div className="bg-[#0d1117] rounded-lg p-2 text-center">
            <div className={`font-bold text-base ${isNetBuying ? 'text-green-400' : 'text-red-400'}`}>
              {isNetBuying ? '+' : ''}{(data.netBuyShares / 1000).toFixed(0)}K
            </div>
            <div className="text-[#8b949e]">Net Shares</div>
          </div>
        </div>

        {/* Recent transactions */}
        {data.recentTransactions.length > 0 && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {data.recentTransactions.slice(0, 8).map((tx, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-[#30363d]/40 last:border-0">
                <div className="flex-1 min-w-0 mr-2">
                  <span className="text-[#e6edf3] font-medium truncate block">{tx.insiderName}</span>
                  <span className="text-[#8b949e]">{tx.relationship}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`font-bold px-1.5 py-0.5 rounded text-xs ${tx.transactionType === 'buy' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'}`}>
                    {tx.transactionType === 'buy' ? 'BUY' : 'SELL'}
                  </span>
                  <div className="text-[#8b949e] mt-0.5">{tx.shares.toLocaleString()} shares</div>
                  <div className="text-[#8b949e]">{fmtDate(tx.transactionDate)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {data.recentTransactions.length === 0 && (
          <p className="text-[#8b949e] text-sm">No buy/sell transactions in the last 90 days</p>
        )}
      </div>
    </Card>
  )
}

// ── Subreddit Breakdown Card ──────────────────────────────────────

function SubredditCard({ data }: { data: StockDetail['subredditBreakdown'] | null | undefined }) {
  if (!data || Object.keys(data).length === 0) return null
  const entries = Object.entries(data).sort((a, b) => b[1].mentions - a[1].mentions)
  const maxMentions = Math.max(...entries.map(([, v]) => v.mentions), 1)

  return (
    <Card>
      <CardTitle right={<span className="text-xs text-[#8b949e]">ApeWisdom</span>}>Community Buzz</CardTitle>
      <div className="space-y-3">
        {entries.map(([sr, v]) => {
          const pct = (v.mentions / maxMentions) * 100
          const colorClass = SUBREDDIT_COLOR[sr as Subreddit] ?? 'text-purple-400 border-purple-500/30 bg-purple-500/10'
          const barColor = sr === 'wallstreetbets' ? 'bg-orange-500' : sr === 'stocks' ? 'bg-blue-500'
            : sr === 'options' ? 'bg-purple-500' : sr === 'investing' ? 'bg-green-500'
            : sr === 'Daytrading' ? 'bg-yellow-500' : sr === 'SPACs' ? 'bg-pink-500'
            : sr === 'WallStreetbetsELITE' ? 'bg-red-500' : 'bg-cyan-500'
          return (
            <div key={sr}>
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span className={`px-2 py-0.5 rounded-md border font-semibold ${colorClass}`}>r/{sr}</span>
                <div className="flex items-center gap-3 text-[#8b949e]">
                  <span>#{v.rank}</span>
                  <span className="font-semibold text-[#e6edf3]">{v.mentions.toLocaleString()} mentions</span>
                </div>
              </div>
              <div className="h-1.5 bg-[#0d1117] rounded-full overflow-hidden">
                <div className={`h-full ${barColor} transition-all duration-700`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
        {SUBREDDITS.filter(sr => !data[sr]).map(sr => (
          <div key={sr} className="flex items-center justify-between text-xs text-[#30363d]">
            <span>r/{sr}</span><span>Not trending</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

// ── Stock Lookup Tab ──────────────────────────────────────────────

function LookupTab({ initialTicker = '' }: { initialTicker?: string }) {
  const [input, setInput] = useState(initialTicker)
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
    setTicker(sym); setLoading(true); setError('')
    setDetail(null); setSignal(null); setHistory(null); setSurprises([])

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

  useEffect(() => { if (initialTicker) lookup(initialTicker) }, [])

  const popular = ['NVDA', 'AAPL', 'TSLA', 'MSFT', 'META', 'AMZN', 'AMD', 'SPY']

  return (
    <div className="space-y-6">
      <form onSubmit={e => { e.preventDefault(); lookup(input) }} className="flex gap-2">
        <input ref={inputRef} type="text" placeholder="Enter ticker symbol (e.g. NVDA, AAPL, TSLA)"
          value={input} onChange={e => setInput(e.target.value.toUpperCase())}
          className="flex-1 px-4 py-3 rounded-xl bg-[#161b22] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] focus:outline-none focus:border-purple-500/60 transition-colors text-sm"
        />
        <button type="submit" className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-purple-600/25 whitespace-nowrap">
          Look Up
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-[#8b949e] py-1">Popular:</span>
        {popular.map(t => (
          <button key={t} onClick={() => { setInput(t); lookup(t) }}
            className="px-2.5 py-1 rounded-lg border border-[#30363d] text-xs font-mono text-[#8b949e] hover:border-purple-500/50 hover:text-purple-300 hover:bg-purple-500/10 transition-all duration-200">
            {t}
          </button>
        ))}
      </div>

      {loading && <Spinner />}
      {error && <ErrorMsg msg={error} />}

      {detail && !loading && (
        <div className="space-y-6">
          {/* Header */}
          <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 pointer-events-none" />
            <div className="relative flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h2 className="text-2xl font-bold text-[#e6edf3]">{ticker}</h2>
                  {detail.profile && <span className="text-[#8b949e] text-lg">{detail.profile.name}</span>}
                  {detail.profile && (
                    <span className="px-2 py-0.5 rounded-md text-xs border border-[#30363d] text-[#8b949e] bg-[#0d1117]">{detail.profile.sector}</span>
                  )}
                  {detail.profile?.industry && (
                    <span className="px-2 py-0.5 rounded-md text-xs border border-[#30363d] text-[#8b949e] bg-[#0d1117]">{detail.profile.industry}</span>
                  )}
                </div>
                {detail.profile && <p className="text-[#8b949e] text-sm leading-relaxed line-clamp-3">{detail.profile.description}</p>}
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-[#8b949e]">
                  {detail.profile?.ceo && <span>CEO: <span className="text-[#e6edf3]">{detail.profile.ceo}</span></span>}
                  {detail.profile?.website && (
                    <a href={detail.profile.website} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">{detail.profile.website} ↗</a>
                  )}
                </div>
              </div>
              {detail.quote && (
                <div className="flex-shrink-0 sm:text-right">
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

          {/* Row 1: Signal + Earnings Surprises + Mention History */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Signal */}
            {signal && (
              <Card>
                <CardTitle right={<ScorePill score={signal.score} />}>Buy Signal</CardTitle>
                <ScoreBar score={signal.score} />
                <div className="space-y-2.5 mt-4">
                  {Object.entries(signal.breakdown).map(([k, v]) => (
                    <div key={k}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#8b949e]">{BREAKDOWN_LABEL[k] ?? k}</span>
                        <span className={v > 0 ? 'text-purple-400 font-semibold' : 'text-[#8b949e]'}>{v}/{BREAKDOWN_MAX[k] ?? 25}</span>
                      </div>
                      <div className="h-1 bg-[#0d1117] rounded-full overflow-hidden">
                        <div className={`h-full ${v > 0 ? 'bg-purple-500' : 'bg-[#30363d]'} transition-all duration-700`} style={{ width: `${(v / (BREAKDOWN_MAX[k] ?? 25)) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-[#8b949e] mt-3">Updated {fmtRelative(signal.updatedAt)}</div>
              </Card>
            )}

            {/* Earnings Surprises bar chart */}
            <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 sm:col-span-2 lg:col-span-1">
              <CardTitle right={<span className="text-xs text-[#8b949e]">8 quarters · FMP</span>}>Earnings Surprises</CardTitle>
              {surprises.length === 0 ? (
                <p className="text-[#8b949e] text-sm">No surprise history available</p>
              ) : (() => {
                const d = [...surprises].reverse()
                const maxAbs = Math.max(...d.map(e => Math.abs(e.surprisePct)), 1)
                const beats = d.filter(e => e.surprisePct > 0).length
                const avgSurprise = d.reduce((s, e) => s + e.surprisePct, 0) / d.length
                return (
                  <>
                    <div className="flex items-center gap-3 mb-4 text-xs">
                      <span className="text-green-400 font-semibold">{beats}/{d.length} beats</span>
                      <span className="text-[#8b949e]">avg:</span>
                      <span className={`font-semibold ${avgSurprise >= 0 ? 'text-green-400' : 'text-red-400'}`}>{avgSurprise >= 0 ? '+' : ''}{avgSurprise.toFixed(2)}%</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-20 mb-3">
                      {d.map(e => {
                        const beat = e.surprisePct >= 0
                        const h = Math.max((Math.abs(e.surprisePct) / maxAbs) * 100, 4)
                        return (
                          <div key={e.date} className="flex-1 flex flex-col items-center group relative">
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
                              <div className="bg-[#0d1117] border border-[#30363d] rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap shadow-xl">
                                <div className="font-semibold text-[#e6edf3]">{new Date(e.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</div>
                                <div className="text-[#8b949e]">Est: ${fmt(e.epsEstimated)}</div>
                                <div className={beat ? 'text-green-400' : 'text-red-400'}>Act: ${fmt(e.eps)}</div>
                                <div className={`font-bold ${beat ? 'text-green-400' : 'text-red-400'}`}>{beat ? '+' : ''}{fmt(e.surprisePct)}%</div>
                              </div>
                            </div>
                            <div className="flex-1 w-full flex items-end">
                              <div className={`w-full rounded-t ${beat ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'} transition-all duration-500`} style={{ height: `${h}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex gap-1.5">
                      {d.map(e => <div key={e.date} className="flex-1 text-center text-[9px] text-[#8b949e] truncate">{new Date(e.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</div>)}
                    </div>
                    {detail.nextEarnings && (
                      <div className="mt-3 pt-3 border-t border-[#30363d] flex justify-between text-sm">
                        <span className="text-[#8b949e]">Next report</span>
                        <div className="text-right">
                          <span className="text-yellow-400 font-semibold">{fmtDate(detail.nextEarnings.date)}</span>
                          {detail.nextEarnings.epsEstimate != null && <span className="text-[#8b949e] text-xs ml-2">Est. ${fmt(detail.nextEarnings.epsEstimate)}</span>}
                        </div>
                      </div>
                    )}
                  </>
                )
              })()}
            </div>

            {/* Mention history */}
            {history && history.history.length > 0 && (
              <Card>
                <CardTitle right={<span className="text-xs text-[#8b949e]">ApeWisdom · 7d</span>}>Reddit Mentions</CardTitle>
                <div className="space-y-2">
                  {[...history.history].reverse().map(h => {
                    const maxM = Math.max(...history.history.map(x => x.mentions), 1)
                    return (
                      <div key={h.date} className="flex items-center gap-3 text-xs">
                        <span className="text-[#8b949e] w-16 flex-shrink-0">{new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        <div className="flex-1 h-1.5 bg-[#0d1117] rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${(h.mentions / maxM) * 100}%` }} />
                        </div>
                        <span className="text-[#e6edf3] w-12 text-right font-semibold">{h.mentions.toLocaleString()}</span>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )}
          </div>

          {/* Row 2: Technicals + Insider + Community Buzz */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <TechnicalsCard data={detail.technicals} />
            <InsiderCard data={detail.insider} />
            <SubredditCard data={detail.subredditBreakdown} />
          </div>

          {/* Row 3: News sentiment */}
          {detail.newsSentiment && (
            <Card>
              <CardTitle right={
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#8b949e]">Score:</span>
                  <ScorePill score={detail.newsSentiment.score} />
                  <SentimentBadge sentiment={detail.newsSentiment.label.toLowerCase()} />
                </div>
              }>News Sentiment</CardTitle>
              <div className="space-y-3">
                {detail.newsSentiment.topArticles.map((a, i) => (
                  <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 group">
                    <SentimentBadge sentiment={a.sentiment} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#8b949e] group-hover:text-purple-300 transition-colors line-clamp-1 leading-snug">{a.headline}</p>
                      <div className="flex gap-2 mt-0.5 text-xs text-[#8b949e]"><span>{a.source}</span><span>·</span><span>{fmtRelative(a.publishedAt)}</span></div>
                    </div>
                    <span className="text-[#8b949e] group-hover:text-purple-400 text-sm flex-shrink-0">↗</span>
                  </a>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

// ── Bulk Watchlist Tab ────────────────────────────────────────────

interface BulkStock { ticker: string; name?: string; price?: number; change?: number; changePercent?: number; score?: number; label?: string }

function WatchlistTab({ onLookup }: { onLookup: (ticker: string) => void }) {
  const [input, setInput] = useState('NVDA,AAPL,TSLA,META,MSFT')
  const [results, setResults] = useState<BulkStock[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sortKey, setSortKey] = useState('ticker')
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const load = () => {
    const tickers = input.split(',').map(t => t.trim().toUpperCase()).filter(Boolean).slice(0, 20)
    if (!tickers.length) return
    setLoading(true); setError('')
    fetch(`${API}/stocks/bulk?tickers=${tickers.join(',')}`)
      .then(r => r.json())
      .then(d => {
        const stocks: BulkStock[] = (d.stocks || []).map((s: Record<string, unknown>) => ({
          ticker: String(s.ticker ?? ''),
          name: s.name ? String(s.name) : undefined,
          price: s.price != null ? Number(s.price) : s.quote ? Number((s.quote as Record<string, unknown>).price) : undefined,
          change: s.change != null ? Number(s.change) : s.quote ? Number((s.quote as Record<string, unknown>).change) : undefined,
          changePercent: s.changePercent != null ? Number(s.changePercent) : s.quote ? Number((s.quote as Record<string, unknown>).changePercent) : undefined,
          score: s.score != null ? Number(s.score) : s.signal ? Number((s.signal as Record<string, unknown>).score) : undefined,
          label: s.label ? String(s.label) : s.signal ? String((s.signal as Record<string, unknown>).label) : undefined,
        }))
        setResults(stocks); setLoading(false)
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
    if (typeof av === 'string' && typeof bv === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    return sortDir === 'asc' ? (Number(av) || 0) - (Number(bv) || 0) : (Number(bv) || 0) - (Number(av) || 0)
  })

  const Th = ({ label, col }: { label: string; col: string }) => (
    <th onClick={() => toggleSort(col)} className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase tracking-wider cursor-pointer hover:text-[#e6edf3] transition-colors select-none whitespace-nowrap">
      {label}<SortIcon active={sortKey === col} dir={sortDir} />
    </th>
  )

  return (
    <div className="space-y-4">
      <Card>
        <p className="text-xs text-[#8b949e] mb-3">Enter up to 20 tickers separated by commas for bulk quotes and signals</p>
        <div className="flex gap-2 flex-col sm:flex-row">
          <input type="text" value={input} onChange={e => setInput(e.target.value.toUpperCase())} placeholder="NVDA,AAPL,TSLA,META,MSFT"
            className="flex-1 px-3 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#8b949e] text-sm focus:outline-none focus:border-purple-500/60 font-mono" />
          <button onClick={load} className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-blue-500 transition-all shadow-lg shadow-purple-600/20 whitespace-nowrap">
            Load Watchlist
          </button>
        </div>
      </Card>

      {loading && <Spinner />}
      {error && <ErrorMsg msg={error} />}

      {sorted.length > 0 && !loading && (
        <div className="rounded-xl border border-[#30363d] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#161b22] border-b border-[#30363d]">
                  <Th label="Ticker" col="ticker" />
                  <Th label="Price" col="price" />
                  <Th label="Change" col="change" />
                  <Th label="Change %" col="changePercent" />
                  <Th label="Signal" col="score" />
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase">Label</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[#8b949e] uppercase">Detail</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((s, i) => (
                  <tr key={s.ticker} className={`border-b border-[#30363d]/40 hover:bg-purple-500/5 transition-colors ${i % 2 ? 'bg-[#161b22]/30' : ''}`}>
                    <td className="px-4 py-3"><TickerBadge ticker={s.ticker} onClick={() => onLookup(s.ticker)} /></td>
                    <td className="px-4 py-3 font-semibold text-[#e6edf3]">{s.price != null ? `$${fmt(s.price)}` : '—'}</td>
                    <td className={`px-4 py-3 font-semibold ${s.change == null ? 'text-[#8b949e]' : s.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {s.change != null ? `${s.change >= 0 ? '+' : ''}$${fmt(Math.abs(s.change))}` : '—'}
                    </td>
                    <td className={`px-4 py-3 font-semibold ${s.changePercent == null ? 'text-[#8b949e]' : s.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {s.changePercent != null ? `${s.changePercent >= 0 ? '+' : ''}${fmt(s.changePercent)}%` : '—'}
                    </td>
                    <td className="px-4 py-3">{s.score != null ? <ScorePill score={s.score} /> : <span className="text-[#8b949e]">—</span>}</td>
                    <td className="px-4 py-3">
                      {s.label ? <SentimentBadge sentiment={s.label === 'Buy Watch' ? 'bullish' : s.label === 'Low Interest' ? 'bearish' : 'neutral'} /> : <span className="text-[#8b949e]">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => onLookup(s.ticker)} className="text-xs text-purple-400 hover:text-purple-300 font-semibold">Detail →</button>
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
  { id: 'trending',  icon: '🔥', label: 'Trending',    desc: 'Reddit buzz across all communities' },
  { id: 'community', icon: '👥', label: 'Community',   desc: 'Per-subreddit trending breakdown' },
  { id: 'signals',   icon: '📡', label: 'Signals',     desc: '7-factor buy signal scores' },
  { id: 'earnings',  icon: '📅', label: 'Earnings',    desc: 'Upcoming & recent earnings' },
  { id: 'news',      icon: '📰', label: 'News',        desc: 'Live feed with NLP sentiment' },
  { id: 'lookup',    icon: '🔍', label: 'Stock Lookup', desc: 'Full detail card for any ticker' },
  { id: 'watchlist', icon: '⭐', label: 'Watchlist',   desc: 'Bulk quotes & signals' },
]

export default function StockMonk() {
  const [activeTab, setActiveTab] = useState('trending')
  const [lookupTicker, setLookupTicker] = useState('')

  const goToLookup = (ticker: string) => {
    setLookupTicker(ticker)
    setActiveTab('lookup')
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-14 border-b border-[#30363d]">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/4 w-96 h-96 bg-green-600/8 rounded-full blur-3xl" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-medium mb-5">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live Market Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#e6edf3] mb-4">
            Stock<span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Monk</span>
            <span className="text-[#8b949e] font-normal text-3xl ml-3">Dashboard</span>
          </h1>
          <p className="text-[#8b949e] text-lg max-w-2xl mb-6">
            Real-time stock intelligence — Reddit buzz across 6 communities, StockTwits sentiment, earnings surprises, SEC insider filings, technical indicators, and NLP news analysis in one place.
          </p>
          {/* Feature chips */}
          <div className="flex flex-wrap gap-3 text-sm">
            {[
              { icon: '🔥', label: 'Reddit Mentions' },
              { icon: '👥', label: '6 Subreddits' },
              { icon: '💬', label: 'StockTwits' },
              { icon: '📰', label: 'News NLP' },
              { icon: '📅', label: 'Earnings Calendar' },
              { icon: '📊', label: 'RSI / MACD / BB' },
              { icon: '🏛️', label: 'SEC Insider Filings' },
            ].map(f => (
              <div key={f.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-[#8b949e] text-xs">
                <span>{f.icon}</span><span>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab bar */}
        <div className="flex flex-wrap gap-1 p-1 bg-[#161b22] border border-[#30363d] rounded-2xl mb-6">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600/80 to-blue-600/80 text-white shadow-lg shadow-purple-600/20'
                  : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#0d1117]/60'
              }`}
            >
              <span>{tab.icon}</span><span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Active tab description */}
        <div className="mb-5">
          {TABS.filter(t => t.id === activeTab).map(t => (
            <p key={t.id} className="text-[#8b949e] text-sm">
              <span className="font-semibold text-[#e6edf3]">{t.icon} {t.label}</span> — {t.desc}
            </p>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'trending'  && <TrendingTab onLookup={goToLookup} />}
        {activeTab === 'community' && <CommunityTab onLookup={goToLookup} />}
        {activeTab === 'signals'   && <SignalsTab onLookup={goToLookup} />}
        {activeTab === 'earnings'  && <EarningsTab />}
        {activeTab === 'news'      && <NewsTab />}
        {activeTab === 'lookup'    && <LookupTab key={lookupTicker} initialTicker={lookupTicker} />}
        {activeTab === 'watchlist' && <WatchlistTab onLookup={goToLookup} />}
      </section>

      {/* Footer note */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-xl border border-[#30363d] bg-[#161b22]/50 p-4 text-xs text-[#8b949e] flex flex-wrap gap-x-6 gap-y-2">
          <span>Data: ApeWisdom · StockTwits · Finnhub · FMP · Alpha Vantage · SEC EDGAR</span>
          <span>Trending every 30 min · Earnings every 6h · News every hour · Technicals daily</span>
          <span className="text-yellow-400/70">Not financial advice. Research purposes only.</span>
        </div>
      </div>
    </div>
  )
}
