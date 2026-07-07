const features = [
  {
    icon: '⌨️',
    title: 'Global Hotkey',
    desc: 'Press a configurable shortcut from anywhere on your system — no need to switch windows or click into the app first. Press again to stop.',
  },
  {
    icon: '🔒',
    title: '100% Offline',
    desc: 'Transcription runs fully locally via a bundled whisper.cpp model. No cloud API, no internet required, no audio ever leaves your machine.',
  },
  {
    icon: '📋',
    title: 'Three Paste Modes',
    desc: 'Direct (types instantly), Ctrl/Cmd+V (auto-pastes via clipboard), or Clipboard Only (copies without inserting, so you paste manually whenever and wherever you want).',
  },
  {
    icon: '🧠',
    title: '33 Model Choices',
    desc: 'Pick from every whisper.cpp checkpoint size and quantization — English-only or multilingual (99 languages) — trading off speed, accuracy, and disk space to match your hardware.',
  },
  {
    icon: '🌊',
    title: 'Live Waveform Overlay',
    desc: 'A small always-on-top overlay shows a real-time mic-level waveform, elapsed timer, and a cancel button while you speak.',
  },
  {
    icon: '🖥️',
    title: 'Cross-Platform',
    desc: 'Native builds for macOS (Apple Silicon & Intel), Windows, and Linux — built with Tauri for a small, fast, native footprint.',
  },
]

const steps = [
  {
    n: '1',
    title: 'Download & Install',
    desc: 'Grab the installer for your OS from the Releases page below and run it. On macOS, right-click → Open on first launch to bypass the unsigned-build warning.',
  },
  {
    n: '2',
    title: 'Press the Hotkey',
    desc: 'Vox runs quietly in your system tray. Press the global hotkey (Control+Alt+Space by default) to start recording — press it again to stop.',
  },
  {
    n: '3',
    title: 'Speak, and It Pastes',
    desc: 'Vox transcribes locally and delivers the text using your chosen paste method — automatically, or copied to your clipboard for you to paste whenever you like.',
  },
]

export default function Vox() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-violet-800/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-400 text-sm font-medium mb-6">
            <span className="text-lg">🎙️</span>
            Desktop App · macOS · Windows · Linux
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-500 bg-clip-text text-transparent">
              Vox
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            Speak. It Types For You. Fully Offline.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Press a global hotkey, speak, and the transcribed text is pasted into whatever app is currently focused — an editor, a chat window, anything. Transcription runs entirely on your machine via a bundled whisper.cpp model, so no audio ever leaves your device.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ✓ Free
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/30">
              ✓ 100% Offline
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
              ✓ Open Source
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
              ✓ No Account Required
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/devops-monk/vox/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:from-violet-500 hover:to-purple-500 transition-all duration-200 shadow-xl shadow-violet-600/30 hover:-translate-y-0.5 text-sm"
            >
              ⬇ Download for macOS, Windows & Linux
            </a>
            <a
              href="https://github.com/devops-monk/vox"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-200 text-sm"
            >
              View Source on GitHub ↗
            </a>
          </div>

          <p className="mt-5 text-sm text-[#8b949e]">
            Builds are currently unsigned — expect a one-time Gatekeeper/SmartScreen warning on first launch.
          </p>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      <section className="py-10 border-y border-[#30363d] bg-[#161b22]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { val: '33',   label: 'whisper.cpp models to choose from' },
              { val: '99',   label: 'languages supported' },
              { val: '3',    label: 'paste modes' },
              { val: '0',    label: 'audio ever sent to a server' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent mb-1">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Built for Speed and Privacy</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              Everything runs on your machine — no accounts, no subscriptions, no data collection.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-violet-500/50 hover:bg-[#0d1117]/80 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-600/10"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-lg group-hover:text-violet-300 transition-colors">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Up and Running in Under a Minute</h2>
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
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-10 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-4">
              Your Voice Never Leaves Your Machine
            </h2>
            <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto">
              Vox transcribes with a locally-run whisper.cpp model — there's no server round-trip, no API key to manage, and no audio or transcript is ever transmitted anywhere. It works the same with Wi-Fi off.
            </p>
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
              <div className="text-5xl mb-4">🎙️</div>
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Try Vox Today</h2>
              <p className="text-[#8b949e] text-lg mb-8">
                Free, open source, and fully offline. Download the build for your platform and start dictating in under a minute.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://github.com/devops-monk/vox/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-lg hover:from-violet-500 hover:to-purple-500 transition-all duration-200 shadow-xl shadow-violet-600/30 hover:-translate-y-0.5"
                >
                  ⬇ Download Latest Release
                </a>
                <a
                  href="https://github.com/devops-monk/vox"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#30363d] text-[#e6edf3] font-bold text-lg hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-200"
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