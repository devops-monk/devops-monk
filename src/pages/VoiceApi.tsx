import { useState, useRef, useEffect } from 'react'

const API = 'https://voice.devops-monk.com'

// Kokoro's English speakers, the same set Lector exposes.
const VOICES = [
  { id: 'af_heart',    label: 'Heart',    note: 'American · warm' },
  { id: 'af_bella',    label: 'Bella',    note: 'American · bright' },
  { id: 'af_nicole',   label: 'Nicole',   note: 'American · soft' },
  { id: 'af_sarah',    label: 'Sarah',    note: 'American' },
  { id: 'am_michael',  label: 'Michael',  note: 'American · steady' },
  { id: 'am_fenrir',   label: 'Fenrir',   note: 'American · deep' },
  { id: 'am_puck',     label: 'Puck',     note: 'American · lively' },
  { id: 'bf_emma',     label: 'Emma',     note: 'British · warm' },
  { id: 'bf_lily',     label: 'Lily',     note: 'British · light' },
  { id: 'bm_george',   label: 'George',   note: 'British · steady' },
  { id: 'bm_fable',    label: 'Fable',    note: 'British · storytelling' },
  { id: 'bm_lewis',    label: 'Lewis',    note: 'British · deep' },
]

const SAMPLE = 'Everything you hear was generated on a small virtual server, with no cloud API behind it.'

// ── shared bits ───────────────────────────────────────────────────

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="relative group">
      <pre className="rounded-xl border border-[#30363d] bg-[#0d1117] p-4 overflow-x-auto text-[13px] leading-relaxed">
        <code className="text-[#c9d1d9] font-mono whitespace-pre">{code}</code>
      </pre>
      <button
        onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1400) }}
        className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md text-[11px] font-medium border border-[#30363d] bg-[#161b22] text-[#8b949e] opacity-0 group-hover:opacity-100 focus:opacity-100 hover:text-teal-300 hover:border-teal-500/50 transition-all"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      {lang && <span className="absolute top-2.5 left-4 text-[10px] uppercase tracking-wider text-[#6e7681] pointer-events-none">{lang}</span>}
    </div>
  )
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-[#8b949e] mb-1.5 uppercase tracking-wide">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-[#6e7681] mt-1">{hint}</span>}
    </label>
  )
}

const inputCls =
  'w-full px-3 py-2.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#6e7681] text-sm focus:outline-none focus:border-teal-500/60 transition-colors'

function Spinner() {
  return <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
}

/** A failure the user can act on, rather than a stack trace. */
function ErrorNote({ msg }: { msg: string }) {
  if (!msg) return null
  return (
    <div className="rounded-lg border border-rose-500/30 bg-rose-500/5 px-3.5 py-2.5 text-sm text-rose-300">
      {msg}
    </div>
  )
}

// ── text to speech ────────────────────────────────────────────────

function TtsPanel({ apiKey }: { apiKey: string }) {
  const [text, setText] = useState(SAMPLE)
  const [voice, setVoice] = useState('af_heart')
  const [speed, setSpeed] = useState(1)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [url, setUrl] = useState('')
  const [ms, setMs] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Blob URLs leak until revoked, and this component can make many.
  useEffect(() => () => { if (url) URL.revokeObjectURL(url) }, [url])

  const speak = async () => {
    if (!text.trim() || busy) return
    setBusy(true); setErr(''); setMs(0)
    const started = performance.now()
    try {
      const r = await fetch(`${API}/v1/audio/speech`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model: 'tts-1', voice, input: text, speed, response_format: 'mp3' }),
      })
      if (!r.ok) throw new Error(r.status === 401 ? 'Unauthorized — check the API key.'
        : r.status === 429 ? 'Rate limit reached. Give it a minute.'
        : `The API returned ${r.status}.`)
      const blob = await r.blob()
      if (url) URL.revokeObjectURL(url)
      const u = URL.createObjectURL(blob)
      setUrl(u); setMs(Math.round(performance.now() - started))
      requestAnimationFrame(() => audioRef.current?.play().catch(() => {}))
    } catch (e) {
      setErr(e instanceof Error && e.message !== 'Failed to fetch' ? e.message
        : 'Could not reach the API. It may not be deployed yet.')
    } finally { setBusy(false) }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_260px] gap-5">
      <div className="space-y-4">
        <Field label="Text to speak">
          <textarea
            value={text} onChange={e => setText(e.target.value)} rows={7}
            maxLength={2000}
            className={`${inputCls} resize-none leading-relaxed`}
            placeholder="Type anything…"
          />
        </Field>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={speak} disabled={busy || !text.trim()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold text-sm hover:from-teal-500 hover:to-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-teal-600/25"
          >
            {busy ? <><Spinner /> Generating…</> : <>▶ Speak</>}
          </button>
          {url && !busy && (
            <a href={url} download="speech.mp3"
               className="px-4 py-3 rounded-xl border border-[#30363d] text-[#8b949e] text-sm font-medium hover:text-teal-300 hover:border-teal-500/50 transition-colors">
              ⬇ Download
            </a>
          )}
          <span className="text-xs text-[#6e7681] ml-auto">{text.length} / 2000</span>
        </div>
        <ErrorNote msg={err} />
        {url && (
          <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-4">
            <audio ref={audioRef} src={url} controls className="w-full" />
            {ms > 0 && <p className="text-[11px] text-[#6e7681] mt-2">Generated in {(ms / 1000).toFixed(1)}s</p>}
          </div>
        )}
      </div>

      <div className="space-y-4">
        <Field label="Voice">
          <select value={voice} onChange={e => setVoice(e.target.value)} className={inputCls}>
            {VOICES.map(v => <option key={v.id} value={v.id}>{v.label} — {v.note}</option>)}
          </select>
        </Field>
        <Field label={`Speed — ${speed.toFixed(2)}×`}>
          <input type="range" min={0.5} max={2} step={0.05} value={speed}
                 onChange={e => setSpeed(Number(e.target.value))}
                 className="w-full accent-teal-500" />
        </Field>
        <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-3.5">
          <p className="text-[11px] text-[#6e7681] leading-relaxed">
            Kokoro, running on CPU. Expect roughly a second of compute per second
            of speech — a desktop with Apple silicon is about ten times quicker.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── speech to text ────────────────────────────────────────────────

function SttPanel({ apiKey }: { apiKey: string }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [text, setText] = useState('')
  const [recording, setRecording] = useState(false)
  const [secs, setSecs] = useState(0)
  const [name, setName] = useState('')
  const recRef = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => { if (timer.current) clearInterval(timer.current) }, [])

  const transcribe = async (file: Blob, filename: string) => {
    setBusy(true); setErr(''); setText(''); setName(filename)
    try {
      const fd = new FormData()
      fd.append('file', file, filename)
      fd.append('model', 'whisper-1')
      fd.append('response_format', 'json')
      const r = await fetch(`${API}/v1/audio/transcriptions`, {
        method: 'POST', headers: { Authorization: `Bearer ${apiKey}` }, body: fd,
      })
      if (!r.ok) throw new Error(r.status === 401 ? 'Unauthorized — check the API key.'
        : r.status === 413 ? 'That file is over the 25 MB limit.'
        : r.status === 429 ? 'Rate limit reached. Give it a minute.'
        : `The API returned ${r.status}.`)
      const d = await r.json()
      setText(d.text?.trim() || '(nothing was transcribed)')
    } catch (e) {
      setErr(e instanceof Error && e.message !== 'Failed to fetch' ? e.message
        : 'Could not reach the API. It may not be deployed yet.')
    } finally { setBusy(false) }
  }

  const toggleRec = async () => {
    if (recording) {
      recRef.current?.stop(); setRecording(false)
      if (timer.current) clearInterval(timer.current)
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const rec = new MediaRecorder(stream)
      chunks.current = []
      rec.ondataavailable = e => chunks.current.push(e.data)
      rec.onstop = () => {
        stream.getTracks().forEach(t => t.stop())
        transcribe(new Blob(chunks.current, { type: 'audio/webm' }), 'recording.webm')
      }
      rec.start(); recRef.current = rec
      setRecording(true); setSecs(0); setErr(''); setText('')
      timer.current = window.setInterval(() => setSecs(s => s + 1), 1000)
    } catch {
      setErr('Microphone access was denied. Upload a file instead.')
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_260px] gap-5">
      <div className="space-y-4">
        <Field label="Transcript">
          <div className="rounded-lg border border-[#30363d] bg-[#0d1117] p-4 min-h-[180px] text-[#e6edf3] text-[15px] leading-relaxed">
            {busy ? <span className="text-[#6e7681] inline-flex items-center gap-2"><Spinner /> Transcribing…</span>
              : text ? text
              : <span className="text-[#6e7681]">Record something, or drop an audio file below.</span>}
          </div>
        </Field>
        {name && !busy && <p className="text-[11px] text-[#6e7681]">from {name}</p>}
        <ErrorNote msg={err} />
      </div>

      <div className="space-y-4">
        <button
          onClick={toggleRec} disabled={busy}
          className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40 ${
            recording
              ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-600/25'
              : 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-500 hover:to-cyan-500 shadow-lg shadow-teal-600/25'
          }`}
        >
          {recording
            ? <>◼ Stop — {String(Math.floor(secs / 60)).padStart(2, '0')}:{String(secs % 60).padStart(2, '0')}</>
            : <>● Record</>}
        </button>

        <label className="block">
          <span className="block text-xs font-semibold text-[#8b949e] mb-1.5 uppercase tracking-wide">Or upload</span>
          <input
            type="file" accept="audio/*" disabled={busy}
            onChange={e => { const f = e.target.files?.[0]; if (f) transcribe(f, f.name) }}
            className="w-full text-xs text-[#8b949e] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border file:border-[#30363d] file:bg-[#161b22] file:text-[#e6edf3] file:text-xs file:font-medium hover:file:border-teal-500/50 file:cursor-pointer"
          />
        </label>

        <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-3.5">
          <p className="text-[11px] text-[#6e7681] leading-relaxed">
            Whisper large-v3-turbo on CPU, so transcription takes longer than the
            clip itself. Keep test recordings short — under thirty seconds is
            comfortable.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── playground ────────────────────────────────────────────────────

function Playground() {
  const [tab, setTab] = useState<'tts' | 'stt'>('tts')
  const [apiKey, setApiKey] = useState('')

  return (
    <div className="rounded-2xl border border-[#30363d] bg-[#161b22]/60 overflow-hidden">
      <div className="flex items-center gap-1 border-b border-[#30363d] px-2 sm:px-4">
        {([['tts', 'Text to Speech'], ['stt', 'Speech to Text']] as const).map(([id, label]) => (
          <button
            key={id} onClick={() => setTab(id)}
            className={`px-4 sm:px-5 py-3.5 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === id ? 'border-teal-500 text-teal-300' : 'border-transparent text-[#8b949e] hover:text-[#e6edf3]'
            }`}
          >
            {label}
          </button>
        ))}
        <input
          type="password" value={apiKey} onChange={e => setApiKey(e.target.value)}
          placeholder="API key"
          className="ml-auto my-2 w-32 sm:w-44 px-3 py-1.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#6e7681] text-xs focus:outline-none focus:border-teal-500/60 transition-colors"
        />
      </div>
      <div className="p-4 sm:p-6">
        {tab === 'tts' ? <TtsPanel apiKey={apiKey} /> : <SttPanel apiKey={apiKey} />}
      </div>
    </div>
  )
}


// ── API reference ─────────────────────────────────────────────────

const ENDPOINTS = [
  {
    method: 'POST',
    path: '/v1/audio/speech',
    title: 'Text to speech',
    desc: 'Returns audio bytes. Content-Type matches response_format.',
    params: [
      ['model', 'string', 'required', 'tts-1 or kokoro'],
      ['input', 'string', 'required', 'The text to speak'],
      ['voice', 'string', 'af_heart', 'Any Kokoro English voice'],
      ['response_format', 'string', 'mp3', 'mp3, wav, opus, flac'],
      ['speed', 'number', '1.0', '0.25 to 4.0'],
    ],
  },
  {
    method: 'POST',
    path: '/v1/audio/transcriptions',
    title: 'Speech to text',
    desc: 'multipart/form-data. Returns { "text": "..." } by default.',
    params: [
      ['file', 'file', 'required', 'wav, mp3, m4a, ogg, flac, webm — max 25 MB'],
      ['model', 'string', 'required', 'whisper-1 or whisper-large-v3-turbo'],
      ['response_format', 'string', 'json', 'json, text, verbose_json, srt, vtt'],
      ['language', 'string', 'auto', 'ISO-639-1. Faster and more accurate when known'],
      ['temperature', 'number', '0', '0 to 1'],
    ],
  },
  {
    method: 'GET',
    path: '/v1/models',
    title: 'List models',
    desc: 'What is currently routable. Doubles as an authenticated liveness check.',
    params: [],
  },
]

const SAMPLES: Record<string, { lang: string; code: string }> = {
  curl: {
    lang: 'bash',
    code: `# text to speech
curl https://voice.devops-monk.com/v1/audio/speech \\
  -H "Authorization: Bearer $KEY" \\
  -H 'Content-Type: application/json' \\
  -d '{"model":"tts-1","voice":"af_heart","input":"Hello."}' \\
  --output hello.mp3

# speech to text
curl https://voice.devops-monk.com/v1/audio/transcriptions \\
  -H "Authorization: Bearer $KEY" \\
  -F file=@meeting.m4a -F model=whisper-1`,
  },
  python: {
    lang: 'python',
    code: `from openai import OpenAI

# The API is OpenAI-compatible, so the official SDK works unchanged.
client = OpenAI(base_url="https://voice.devops-monk.com/v1", api_key=KEY)

client.audio.speech.create(
    model="tts-1", voice="af_heart", input="Hello."
).stream_to_file("hello.mp3")

with open("meeting.m4a", "rb") as f:
    print(client.audio.transcriptions.create(model="whisper-1", file=f).text)`,
  },
  javascript: {
    lang: 'javascript',
    code: `// speak
const r = await fetch("https://voice.devops-monk.com/v1/audio/speech", {
  method: "POST",
  headers: { Authorization: \`Bearer \${KEY}\`, "Content-Type": "application/json" },
  body: JSON.stringify({ model: "tts-1", voice: "af_heart", input: text }),
});
new Audio(URL.createObjectURL(await r.blob())).play();

// transcribe
const fd = new FormData();
fd.append("file", blob, "audio.webm");
fd.append("model", "whisper-1");
const t = await fetch("https://voice.devops-monk.com/v1/audio/transcriptions", {
  method: "POST", headers: { Authorization: \`Bearer \${KEY}\` }, body: fd,
}).then((r) => r.json());
console.log(t.text);`,
  },
}

function ApiReference() {
  const [tab, setTab] = useState<keyof typeof SAMPLES>('curl')
  return (
    <div className="space-y-8">
      {ENDPOINTS.map((e) => (
        <div key={e.path} className="rounded-2xl border border-[#30363d] bg-[#0d1117] overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-[#30363d] bg-[#161b22]/60">
            <span className={`px-2 py-0.5 rounded text-[11px] font-bold tracking-wide ${
              e.method === 'GET' ? 'bg-sky-500/15 text-sky-400' : 'bg-teal-500/15 text-teal-400'
            }`}>{e.method}</span>
            <code className="text-[#e6edf3] font-mono text-sm">{e.path}</code>
            <span className="text-[#8b949e] text-sm ml-auto">{e.title}</span>
          </div>
          <div className="px-5 py-4">
            <p className="text-[#8b949e] text-sm mb-4">{e.desc}</p>
            {e.params.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wider text-[#6e7681]">
                      <th className="pb-2 pr-4 font-semibold">Field</th>
                      <th className="pb-2 pr-4 font-semibold">Type</th>
                      <th className="pb-2 pr-4 font-semibold">Default</th>
                      <th className="pb-2 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="align-top">
                    {e.params.map(([n, t, d, note]) => (
                      <tr key={n} className="border-t border-[#21262d]">
                        <td className="py-2 pr-4"><code className="text-teal-300 font-mono text-[13px]">{n}</code></td>
                        <td className="py-2 pr-4 text-[#8b949e]">{t}</td>
                        <td className="py-2 pr-4">
                          <span className={d === 'required' ? 'text-amber-400/90 text-xs font-medium' : 'text-[#6e7681] font-mono text-xs'}>{d}</span>
                        </td>
                        <td className="py-2 text-[#8b949e]">{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ))}

      <div>
        <div className="flex gap-1 mb-3">
          {(Object.keys(SAMPLES) as (keyof typeof SAMPLES)[]).map((k) => (
            <button key={k} onClick={() => setTab(k)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                tab === k ? 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
                          : 'text-[#8b949e] border border-transparent hover:text-[#e6edf3]'
              }`}>{k}</button>
          ))}
        </div>
        <CodeBlock code={SAMPLES[tab].code} lang={SAMPLES[tab].lang} />
      </div>
    </div>
  )
}

// ── page ──────────────────────────────────────────────────────────

export default function VoiceApi() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-teal-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-sm font-medium mb-6">
            <span className="text-lg">🎚️</span> Self-hosted · OpenAI-compatible
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#e6edf3] mb-6">
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 bg-clip-text text-transparent">voice-api</span>
          </h1>
          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            Speech in, text out. Text in, speech out.
          </p>
          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto">
            The same models <a href="/vox" className="text-teal-400 hover:underline">Vox</a> and{' '}
            <a href="/lector" className="text-teal-400 hover:underline">Lector</a> run on the desktop, served over HTTP
            for the clients they can't reach — browser extensions, web pages, phones, automations.
            Two endpoints, both byte-for-byte OpenAI's.
          </p>
        </div>
      </section>

      <section className="pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#e6edf3] mb-3">Try it</h2>
            <p className="text-[#8b949e] text-sm max-w-xl mx-auto">
              Paste an API key to use the live service. Everything is synthesized and
              transcribed on one small virtual server — no cloud model behind it.
            </p>
          </div>
          <Playground />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#e6edf3] mb-3">API reference</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e]">
              Base URL <code className="text-teal-300 font-mono text-sm">https://voice.devops-monk.com</code> ·
              every request needs <code className="text-teal-300 font-mono text-sm">Authorization: Bearer</code>
            </p>
          </div>
          <ApiReference />
        </div>
      </section>

      <section className="py-16 border-t border-[#30363d]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#e6edf3] mb-6 text-center">What runs it</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              ['Gateway', 'LiteLLM', 'Auth, virtual keys, per-key budgets and rate limits. Routing lives in one config file.'],
              ['Speech to text', 'whisper.cpp', 'large-v3-turbo Q8_0 — the exact model file Vox ships.'],
              ['Text to speech', 'Kokoro', 'The same weights Lector offers as its quality option.'],
            ].map(([role, name, desc]) => (
              <div key={role} className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-5">
                <div className="text-[11px] uppercase tracking-wider text-[#6e7681] mb-1.5">{role}</div>
                <div className="font-bold text-[#e6edf3] mb-2">{name}</div>
                <p className="text-[#8b949e] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-6 text-center">
            <p className="text-[#8b949e] leading-relaxed max-w-2xl mx-auto">
              <strong className="text-[#e6edf3]">This is not a backend for Vox and Lector.</strong>{' '}
              Those run entirely on your machine and always will. This exists for clients that
              <em> cannot</em> run a 900 MB model — and it is slower than a laptop, because hosting buys reach, not speed.
            </p>
          </div>
          <div className="text-center mt-8">
            <a href="https://github.com/devops-monk/voice-api" target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-teal-500/50 hover:bg-teal-500/10 transition-all text-sm">
              Self-host it — source on GitHub ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
