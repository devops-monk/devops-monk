import { Link } from 'react-router-dom'

const STORE_URL = 'https://chromewebstore.google.com/detail/ohihgilghoabomgagigehhokblpicbem'
const GITHUB_URL = 'https://github.com/devops-monk/Driftnote'

const features = [
  {
    icon: '📝',
    title: 'A Real Rich Editor',
    desc: 'Bold, italic, colors, highlights, fonts and sizes, headings, checklists, quotes, code blocks, links and images — all saved as you type, auto-titled from your first line.',
  },
  {
    icon: '🔐',
    title: 'Optional, Per-Note Encryption',
    desc: 'Choose exactly which notes are encrypted — others stay plaintext. AES-GCM on your device; your passphrase and key never leave it, with a one-time recovery code as backup.',
  },
  {
    icon: '☁️',
    title: 'Sync With Your Own Drive',
    desc: 'Back up and sync notes across devices into a hidden, app-private Google Drive folder. Only the minimal drive.appdata scope — Driftnote can\'t see any of your other files.',
  },
  {
    icon: '📌',
    title: 'Sticky Notes on Any Page',
    desc: 'Right-click any web page to leave a rich sticky note, anchored to that page — it reappears when you return. Drag, resize, recolor, and it syncs to Drive too.',
  },
  {
    icon: '⏰',
    title: 'Reminders',
    desc: 'Set a reminder on any note and get a desktop notification when it\'s due. Clicking it opens the note in a roomy, resizable window.',
  },
  {
    icon: '🗂️',
    title: 'Organize & Export',
    desc: 'Colors, tags with filtering, search, favorites, drag-to-reorder, Trash with restore, and a command palette. Export any note to Markdown, HTML, plain text, or PDF.',
  },
]

const steps = [
  {
    n: '1',
    title: 'Install Driftnote',
    desc: 'Add from the Chrome Web Store in one click. No account or sign-up — it works fully offline from the start.',
  },
  {
    n: '2',
    title: 'Write & Organize',
    desc: 'Jot rich notes, add tags and colors, and — if you want — flip on encryption for the notes that matter.',
  },
  {
    n: '3',
    title: 'Sync & Stick',
    desc: 'Connect your own Google Drive to sync across devices, and right-click any page to leave a sticky note.',
  },
]

export default function Driftnote() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            <span className="text-lg">📝</span>
            Chrome Extension
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Driftnote
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            Private notes, your keys.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Fast note-taking with a real rich editor, optional per-note encryption, Google Drive sync, and sticky notes you can leave on any web page. No accounts, no servers, no tracking.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ✓ Free
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              ✓ Optional Encryption
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
              ✓ Offline-First
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
              ✓ No Tracking
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 shadow-xl shadow-blue-600/30 hover:-translate-y-0.5 text-sm"
            >
              🚀 Add to Chrome — It's Free
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200 text-sm"
            >
              View Source on GitHub ↗
            </a>
          </div>

          <div className="mt-5">
            <Link to="/privacy" className="text-sm text-[#8b949e] hover:text-blue-400 transition-colors underline underline-offset-2">
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
              { val: 'AES-GCM', label: 'end-to-end encryption' },
              { val: '0', label: 'servers — nothing leaves your browser' },
              { val: 'Any', label: 'web page for sticky notes' },
              { val: '4', label: 'export formats: MD, PDF, TXT, HTML' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Everything a Notes App Should Be</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              A polished editor, real privacy, and notes that follow you across devices and web pages.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-blue-500/50 hover:bg-[#0d1117]/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-600/10"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-lg group-hover:text-blue-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Up and Running in Seconds</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-blue-500/50 via-cyan-500/50 to-blue-500/50" />
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg shadow-blue-600/30 relative z-10">
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
              Private by Design
            </h2>
            <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto">
              Driftnote has no backend and collects no data. Your notes live in your browser and — only if you choose — in your own Google Drive. With encryption on, they're sealed with a key that never leaves your device. No analytics, no ads, no tracking.
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
              { perm: 'storage', reason: 'Save your notes, settings, and sticky notes locally on your device. Nothing is sent to any server.' },
              { perm: 'identity', reason: 'Get an access token to sync notes to your own Google Drive — only after you explicitly click Connect.' },
              { perm: 'alarms', reason: 'Run periodic background Drive sync and fire note reminders at the times you set.' },
              { perm: 'notifications', reason: 'Show a desktop notification when one of your note reminders is due.' },
              { perm: 'contextMenus + host access', reason: 'Add a right-click "Add sticky here" item and render your own sticky notes on the pages you left them on. The content script only reads and writes Driftnote\'s own data — never the page content.' },
            ].map(({ perm, reason }) => (
              <div key={perm} className="flex gap-4 items-start rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-4">
                <code className="text-sm font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
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
          <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-600/15 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="text-5xl mb-4">📝</div>
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Start Taking Notes That Stay Yours</h2>
              <p className="text-[#8b949e] text-lg mb-8">
                Free forever. No account. Install in one click — write instantly, encrypt what matters, and sync to your own Drive.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 shadow-xl shadow-blue-600/30 hover:-translate-y-0.5"
                >
                  🚀 Add to Chrome — Free
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#30363d] text-[#e6edf3] font-bold text-lg hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-200"
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
