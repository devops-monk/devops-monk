const features = [
  {
    icon: '🔑',
    title: 'Every AWS Credential',
    desc: 'Access keys, temporary session keys, environment variables, the default provider chain, shared profiles, and roles assumed from any of those — with MFA where your account requires it.',
  },
  {
    icon: '🪪',
    title: 'IAM Identity Center',
    desc: 'Signing in runs your own aws sso login, so the browser authorises the AWS CLI rather than this app — and your terminal ends up signed in too. A session you started in a terminal already counts.',
  },
  {
    icon: '⏯️',
    title: 'Resumable Multipart',
    desc: 'Uploads pause and resume, continuing from the parts S3 already holds. A real transfer queue shows progress on the Dock and taskbar, under a shared bandwidth ceiling.',
  },
  {
    icon: '🔄',
    title: 'Folder Sync',
    desc: 'Upload only what changed, compared by size, MD5 and modified time, with glob include and exclude patterns — no CLI incantation required.',
  },
  {
    icon: '🔍',
    title: 'Search & Preview',
    desc: 'Search a whole bucket with a streaming walk you can stop, results arriving as they are found. Preview text, JSON and images with a ranged request instead of a full download.',
  },
  {
    icon: '🧬',
    title: 'Versions & Metadata',
    desc: 'List, restore, undelete and permanently delete versions. Edit metadata, HTTP headers and tags in place. Restore from Glacier and change storage class in bulk.',
  },
  {
    icon: '🔐',
    title: 'Encryption That Just Works',
    desc: 'Server-side encryption on upload including customer-managed KMS keys — and where a bucket policy mandates a specific key, Bucketeer works out which one.',
  },
  {
    icon: '🪣',
    title: 'Bucket Configuration',
    desc: 'Policy, lifecycle, encryption, versioning, public access, CORS, logging, requester pays and website configuration — all without a trip to the console.',
  },
  {
    icon: '🌍',
    title: 'S3-Compatible Endpoints',
    desc: 'Not just AWS: MinIO, Cloudflare R2, Wasabi and Backblaze B2. Export and import connections as a file that carries endpoints, regions, profiles and roles — and never a key or a token.',
  },
]

const shots = [
  {
    src: '/bucketeer/connections.png',
    alt: 'Bucketeer connection picker listing two saved AWS connections',
    title: 'Connections',
    caption: 'Keep as many accounts as you need side by side — a temporary key here, a shared profile there. Credentials live in the OS keychain, never in a config file this app wrote.',
  },
  {
    src: '/bucketeer/buckets.png',
    alt: 'Bucketeer listing 211 buckets with a filter box',
    title: 'Buckets',
    caption: 'Two hundred buckets stay navigable. Filter as you type, sort by name or date, and create a new bucket without leaving the window.',
  },
  {
    src: '/bucketeer/objects.png',
    alt: 'Bucketeer object browser with a context menu open over a selected object',
    title: 'Objects',
    caption: 'Upload, download, sync, rename, copy, move, share and re-class — from the toolbar, the context menu, or a multi-select across a thousand objects.',
  },
]

// Brand marks as single-colour silhouettes, so they take the card's text colour
// on hover the way an emoji never could.
const AppleMark = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-10 h-10">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
)

const WindowsMark = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-9 h-9">
    <path d="M0,0H11.377V11.372H0ZM12.623,0H24V11.372H12.623ZM0,12.623H11.377V24H0Zm12.623,0H24V24H12.623" />
  </svg>
)

const LinuxMark = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-10 h-10">
    <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.043c-.06-.003-.12 0-.18 0h-.016c.151-.467-.182-.825-1.065-1.224-.915-.4-1.646-.336-1.77.465-.008.043-.013.066-.018.135-.068.023-.139.053-.209.064-.43.268-.662.669-.793 1.187-.13.533-.17 1.156-.205 1.869v.003c-.02.334-.17.838-.319 1.35-1.5 1.072-3.58 1.538-5.348.334a2.645 2.645 0 00-.402-.533 1.45 1.45 0 00-.275-.333c.182 0 .338-.03.465-.067a.615.615 0 00.314-.334c.108-.267 0-.697-.345-1.163-.345-.467-.931-.995-1.788-1.521-.63-.4-.986-.87-1.15-1.396-.165-.534-.143-1.085-.015-1.645.245-1.07.873-2.11 1.274-2.763.107-.065.037.135-.408.974-.396.751-1.14 2.497-.122 3.854a8.123 8.123 0 01.647-2.876c.564-1.278 1.743-3.504 1.836-5.268.048.036.217.135.289.202.218.133.38.333.59.465.21.201.477.335.876.335.039.003.075.006.11.006.412 0 .73-.134.997-.268.29-.134.52-.334.74-.4h.005c.467-.135.835-.402 1.044-.7zm2.185 8.958c.037.6.343 1.245.882 1.377.588.134 1.434-.333 1.791-.765l.211-.01c.315-.007.577.01.847.268l.003.003c.208.199.305.53.391.876.085.4.154.78.409 1.066.486.527.645.906.636 1.14l.003-.007v.018l-.003-.012c-.015.262-.185.396-.498.595-.63.401-1.746.712-2.457 1.57-.618.737-1.37 1.14-2.036 1.191-.664.053-1.237-.2-1.574-.898l-.005-.003c-.21-.4-.12-1.025.056-1.69.176-.668.428-1.344.463-1.897.037-.714.076-1.335.195-1.814.12-.465.308-.797.641-.984l.045-.022zm-10.814.049h.01c.053 0 .105.005.157.014.376.055.706.333 1.023.752l.91 1.664.003.003c.243.533.754 1.064 1.189 1.637.434.598.77 1.131.729 1.57v.006c-.057.744-.48 1.148-1.125 1.294-.645.135-1.52.002-2.395-.464-.968-.536-2.118-.469-2.857-.602-.369-.066-.61-.2-.723-.4-.11-.2-.113-.602.123-1.23v-.004l.002-.003c.117-.334.03-.752-.027-1.118-.055-.401-.083-.71.043-.94.16-.334.396-.4.69-.533.294-.135.64-.202.915-.47h.002v-.002c.256-.268.445-.601.668-.838.19-.201.38-.336.663-.336zm7.159-9.074c-.435.201-.945.535-1.488.535-.542 0-.97-.267-1.28-.466-.154-.134-.28-.268-.373-.335-.164-.134-.144-.333-.074-.333.109.016.129.134.199.2.096.066.215.2.36.333.292.2.68.467 1.167.467.485 0 1.053-.267 1.398-.466.195-.135.445-.334.648-.467.156-.136.149-.267.279-.267.128.016.034.134-.147.332a8.097 8.097 0 01-.69.468zm-1.082-1.583V5.64c-.006-.02.013-.042.029-.05.074-.043.18-.027.26.004.063 0 .16.067.15.135-.006.049-.085.066-.135.066-.055 0-.092-.043-.141-.068-.052-.018-.146-.008-.163-.065zm-.551 0c-.02.058-.113.049-.166.066-.047.025-.086.068-.14.068-.05 0-.13-.02-.136-.068-.01-.066.088-.133.15-.133.08-.031.184-.047.259-.005.019.009.036.03.03.05v.02h.003z" />
  </svg>
)

const platforms = [
  { mark: AppleMark, name: 'macOS', detail: 'Apple Silicon & Intel \u00B7 .dmg' },
  { mark: WindowsMark, name: 'Windows', detail: 'Installer \u00B7 .exe' },
  { mark: LinuxMark, name: 'Linux', detail: 'AppImage \u00B7 .deb' },
]

const stack = ['Electron 43', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'AWS SDK v3', 'electron-vite', 'Vitest']

export default function Bucketeer() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-pink-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-600/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-fuchsia-800/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-sm font-medium mb-6">
            <span className="text-lg">🪣</span>
            Desktop App · macOS · Windows · Linux
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-fuchsia-500 bg-clip-text text-transparent">
              Bucketeer
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            An S3 Client That Respects Your Credentials.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            An open-source desktop client for Amazon S3 and S3-compatible storage. Browse buckets, move files in and out, and change the things about an object that normally send you to the console or the CLI — encryption, tags, headers, versions, storage class. It speaks every kind of AWS credential, including IAM Identity Center, and it signs in the way you already do.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              ✓ Free & Open Source
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              ✓ Keys Stay in the Keychain
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-pink-500/15 text-pink-400 border border-pink-500/30">
              ✓ No Telemetry
            </span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">
              ✓ Apache 2.0
            </span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://github.com/devops-monk/bucketeer-desktop/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold hover:from-pink-500 hover:to-rose-500 transition-all duration-200 shadow-xl shadow-pink-600/30 hover:-translate-y-0.5 text-sm"
            >
              ⬇ Download v0.1.0
            </a>
            <a
              href="https://github.com/devops-monk/bucketeer-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-200 text-sm"
            >
              View Source on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Screenshots ───────────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">A Look Inside</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              Three screens that cover most of a working day.
            </p>
          </div>

          <div className="space-y-12">
            {shots.map((shot, i) => (
              <div
                key={shot.title}
                className={`flex flex-col gap-6 lg:gap-10 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                <div className="lg:w-3/5 w-full">
                  <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] overflow-hidden shadow-2xl shadow-pink-950/30 hover:border-pink-500/40 transition-colors duration-300">
                    <img src={shot.src} alt={shot.alt} loading="lazy" className="w-full h-auto block" />
                  </div>
                </div>
                <div className="lg:w-2/5 w-full">
                  <h3 className="text-2xl font-bold text-[#e6edf3] mb-3">{shot.title}</h3>
                  <p className="text-[#8b949e] leading-relaxed">{shot.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">What It Does</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              The things the AWS console makes slow, and the CLI makes cryptic.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-pink-500/50 hover:bg-[#161b22] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-600/10"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-lg group-hover:text-pink-300 transition-colors">
                  {f.title}
                </h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security ──────────────────────────────────────────────────────── */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-10">
            <div className="text-4xl mb-4 text-center">🔒</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-4 text-center">
              Built Around the Credentials
            </h2>
            <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-8 text-center">
              Bucketeer handles AWS credentials, so the boundaries are strict — and they are architectural, not a promise.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                'The renderer never sees a credential: every S3, STS and KMS call runs in the main process behind a narrow, typed IPC surface.',
                'contextIsolation on, nodeIntegration off, and the renderer sandboxed.',
                'Secrets are encrypted at rest with the system keychain — Keychain, DPAPI, libsecret.',
                'Nothing is sent anywhere except to AWS, or to the endpoint you configured.',
              ].map((line) => (
                <div key={line} className="flex gap-3 items-start rounded-xl border border-[#30363d] bg-[#0d1117] px-5 py-4">
                  <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                  <p className="text-[#8b949e] text-sm leading-relaxed">{line}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Download ──────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Get It</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mx-auto" />
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {platforms.map((p) => (
              <a
                key={p.name}
                href="https://github.com/devops-monk/bucketeer-desktop/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#30363d] bg-[#161b22] p-6 text-center hover:border-pink-500/50 hover:-translate-y-0.5 transition-all duration-300 block"
              >
                <div className="flex justify-center items-end h-10 mb-4 text-[#8b949e] group-hover:text-pink-400 transition-colors duration-300">
                  {p.mark}
                </div>
                <h3 className="font-bold text-[#e6edf3] text-lg mb-1 group-hover:text-pink-300 transition-colors">{p.name}</h3>
                <p className="text-[#8b949e] text-sm font-mono">{p.detail}</p>
              </a>
            ))}
          </div>

          <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 px-6 py-5">
            <p className="text-[#8b949e] text-sm leading-relaxed">
              <span className="font-semibold text-orange-400">A note on the first launch.</span>{' '}
              These builds are signed only ad-hoc and are not notarized, because the project has no Apple Developer certificate yet — so every operating system warns you once. On macOS, right-click the app and choose Open, or allow it under System Settings → Privacy &amp; Security. On Windows, choose More info, then Run anyway. On Linux, <code className="font-mono text-pink-400 bg-pink-500/10 px-1.5 py-0.5 rounded">chmod +x</code> the AppImage. The release workflow is already wired for signing and starts as soon as the certificate exists.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it is built ───────────────────────────────────────────────── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">How It Is Built</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4 text-[#8b949e] leading-relaxed">
              <p>
                The main process follows ports and adapters. One file defines the interfaces, use cases depend on nothing but those interfaces, and a single infrastructure layer is the only place that knows about AWS, the filesystem or Electron.
              </p>
              <p>
                That is why the services can be tested against fakes — and why one file issues every S3 command in the codebase. The suite runs <span className="text-pink-400 font-semibold">103 tests</span> against a hand-written S3 protocol server, so it needs no network and no Docker; the same adapter can then be pointed at a real MinIO.
              </p>
            </div>
            <div>
              <p className="text-sm text-[#8b949e] uppercase font-semibold tracking-wider mb-4">Stack</p>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium border border-[#30363d] text-[#e6edf3] bg-[#0d1117] hover:border-pink-500/50 hover:text-pink-300 transition-all duration-200 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-600/10 to-rose-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-600/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-rose-600/15 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="text-5xl mb-4">🪣</div>
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Stop Living in the Console</h2>
              <p className="text-[#8b949e] text-lg mb-8">
                Free, open source under Apache 2.0, and happy to take issues and pull requests.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://github.com/devops-monk/bucketeer-desktop/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold text-lg hover:from-pink-500 hover:to-rose-500 transition-all duration-200 shadow-xl shadow-pink-600/30 hover:-translate-y-0.5"
                >
                  ⬇ Download Bucketeer
                </a>
                <a
                  href="https://github.com/devops-monk/bucketeer-desktop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#30363d] text-[#e6edf3] font-bold text-lg hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-200"
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
