type Extension = {
  name: string
  tagline: string
  /** What the extension reads, and why. */
  accesses: { item: string; use: string }[]
  /** Manifest permissions, with the reason each one is requested. */
  permissions: { perm: string; reason: string }[]
  /** Anything contacted outside the user's device, and what it receives. */
  thirdParty?: { service: string; sends: string }[]
  repo?: string
}

const EXTENSIONS: Extension[] = [
  {
    name: 'MonkTab',
    tagline: 'Developer new tab page',
    repo: 'https://github.com/devops-monk/monkTab',
    accesses: [
      {
        item: 'Your tasks, notes, quick links, saved sessions and settings',
        use: 'Held in chrome.storage on your own device so the page can show them again. Your settings alone use chrome.storage.sync, so preferences follow you across your signed-in Chrome devices — that sync is between your own devices via Google, never through us.',
      },
      {
        item: 'Approximate location (only if you allow it)',
        use: 'Used for the weather widget. Chrome asks first. Your coordinates are sent to the Open-Meteo weather API to get a forecast and are never stored or logged. Decline, and MonkTab falls back to an IP-based city estimate or a city you type in yourself.',
      },
      {
        item: 'Your Chrome bookmarks (read-only, on request)',
        use: 'Read only when you click "Import bookmarks" in the Quick Links panel, so you can pick which ones to copy across. Never modified, never deleted, never sent anywhere.',
      },
      {
        item: 'Open tabs (optional, on request)',
        use: 'Only when you click "Save session". Chrome asks for the permission at that moment, and the tab titles and URLs are stored on your device so you can restore them later. Decline, and only that feature is unavailable.',
      },
    ],
    permissions: [
      { perm: 'storage', reason: 'Save tasks, notes, links, sessions and settings locally.' },
      { perm: 'geolocation', reason: 'Local weather, only after you allow the browser prompt.' },
      { perm: 'notifications', reason: 'Alert you when a focus timer ends, or when a stock on your watchlist hits a price or percentage you set.' },
      { perm: 'bookmarks', reason: 'Read-only, and only when you start a bookmark import.' },
      { perm: 'declarativeNetRequest', reason: 'One rule that sets the Referer and Origin headers on youtube-nocookie.com requests, so the embedded audio player works. It touches no other request.' },
      { perm: 'tabs (optional)', reason: 'Requested only when you save a tab session, because Chrome withholds tab URLs and titles without it.' },
    ],
    thirdParty: [
      { service: 'Open-Meteo, Nominatim, ipapi.co', sends: 'Coordinates or your IP, to return a forecast and a city name. Nothing else.' },
      { service: 'StockMonk (stockmonk.devops-monk.com)', sends: 'The ticker symbols you are viewing, to return prices and market data. Our own API; it stores no personal data.' },
      { service: 'News publishers', sends: 'A plain request for a public RSS/Atom feed. No information about you is attached.' },
      { service: 'Picsum, Wallhaven, Bing, Unsplash', sends: 'A request for a wallpaper. Unsplash is used only if you supply your own API key.' },
      { service: 'YouTube (youtube-nocookie.com)', sends: 'The video ID you chose to play, in a privacy-enhanced embed.' },
      { service: 'DuckDuckGo icons', sends: 'The domain of a quick link, to fetch its favicon.' },
      { service: 'AI assistants (Ask AI)', sends: 'Nothing automatically. When you press Ask, MonkTab opens the assistant you picked in a new tab with your question in the address bar. From that point their privacy policy applies, not ours.' },
    ],
  },
  {
    name: 'SnapMonk',
    tagline: 'Screenshot and screen recording',
    repo: 'https://github.com/devops-monk/snapMonk',
    accesses: [
      {
        item: 'Screenshots of the current tab',
        use: 'To capture the visible area, full page, selected region, or a specific element as requested by you. Images are stored temporarily in your browser’s local IndexedDB and are never uploaded.',
      },
      {
        item: 'Screen / window / desktop video',
        use: 'When you start a recording, the browser prompts you to choose what to share. The video stream is processed locally and saved directly to your device on stop.',
      },
      {
        item: 'Tab URL and page title',
        use: 'Used only to generate a suggested filename for downloaded screenshots and recordings (e.g. "my-page-title.png"). Never stored or transmitted.',
      },
      {
        item: 'Microphone audio (optional)',
        use: 'Only accessed if you enable the microphone toggle before recording. Mixed locally into the recording and never transmitted.',
      },
      {
        item: 'Webcam video (optional)',
        use: 'Only accessed if you enable the webcam overlay before recording. Displayed as a picture-in-picture bubble and never uploaded.',
      },
    ],
    permissions: [
      { perm: 'activeTab', reason: 'Capture a screenshot of the page you are currently viewing.' },
      { perm: 'scripting', reason: 'Inject the region-selection overlay and recorder toolbar into the page.' },
      { perm: 'tabs', reason: 'Read the current tab’s URL and title for export filename suggestions.' },
      { perm: 'storage', reason: 'Hold captured images in local browser storage (IndexedDB) while you edit them.' },
      { perm: 'desktopCapture', reason: 'Enable full-desktop and application window recording modes.' },
    ],
    thirdParty: [
      { service: 'unpkg.com', sends: 'Only on older browsers, and only if you convert a recording to MP4: a request for the ffmpeg.wasm library. No user data is included — it is equivalent to loading a JavaScript file.' },
    ],
  },
]

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Header */}
      <div className="mb-12">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
          📄 Legal
        </span>
        <h1 className="text-4xl font-bold text-[#e6edf3] mb-4">Privacy Policy</h1>
        <p className="text-[#8b949e]">
          Last updated: <span className="text-[#e6edf3]">August 2026</span>
        </p>
        <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-4 text-emerald-400 text-sm font-medium">
          ✓ No DevOps-Monk extension has an account, a backend, or any analytics. Your content stays in your browser.
        </div>
      </div>

      <div className="space-y-10 text-[#8b949e] leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">1. Who this covers</h2>
          <p>
            This policy applies to every browser extension published by Abhay Pratap Singh (DevOps-Monk), including SnapMonk, MonkTab, StockMonk Extension, Driftnote, ShortStop and HydroMonk. Each extension is listed below with the specific data it accesses and why.
          </p>
          <p className="mt-3">
            It explains what each extension can read, what leaves your device and what does not, and how to remove everything.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">2. What applies to all of them</h2>
          <ul className="space-y-2">
            {[
              'No account, no sign-in, and no user profile of any kind',
              'No analytics, no telemetry, no tracking pixels, no cookies',
              'No advertising, and no data sold or transferred to anyone',
              'No server of our own that receives your content',
              'Your content is held in your browser and can be deleted by removing the extension',
              'Every network request an extension can make is declared in its manifest, with no wildcards',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">3. What we never collect</h2>
          <ul className="space-y-2">
            {[
              'Personal information such as your name, email address or identity',
              'Passwords, credentials or anything you type into other websites',
              'Your browsing history, or the pages you visit',
              'Health, financial or payment information',
              'Your notes, tasks, screenshots or recordings — these never leave your device',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Per-extension detail */}
        {EXTENSIONS.map((ext, i) => (
          <section key={ext.name}>
            <h2 className="text-xl font-bold text-[#e6edf3] mb-1">
              {4 + i}. {ext.name}
            </h2>
            <p className="text-sm mb-4">
              {ext.tagline}
              {ext.repo && (
                <>
                  {' · '}
                  <a
                    href={ext.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    source
                  </a>
                </>
              )}
            </p>

            <h3 className="text-sm font-semibold text-[#e6edf3] mt-5 mb-3">What it accesses</h3>
            <div className="space-y-3">
              {ext.accesses.map(({ item, use }) => (
                <div key={item} className="rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-4">
                  <p className="text-[#e6edf3] font-semibold text-sm mb-1">{item}</p>
                  <p className="text-sm">{use}</p>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-semibold text-[#e6edf3] mt-6 mb-3">Why each permission is requested</h3>
            <div className="space-y-3">
              {ext.permissions.map(({ perm, reason }) => (
                <div key={perm} className="flex gap-4 items-start rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-4">
                  <code className="text-sm font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
                    {perm}
                  </code>
                  <p className="text-sm">{reason}</p>
                </div>
              ))}
            </div>

            {ext.thirdParty && (
              <>
                <h3 className="text-sm font-semibold text-[#e6edf3] mt-6 mb-3">What leaves your device</h3>
                <div className="space-y-3">
                  {ext.thirdParty.map(({ service, sends }) => (
                    <div key={service} className="rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-4">
                      <p className="text-[#e6edf3] font-semibold text-sm mb-1">{service}</p>
                      <p className="text-sm">{sends}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>
        ))}

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">{4 + EXTENSIONS.length}. Other extensions</h2>
          <p>
            Extensions not individually listed above — StockMonk Extension, Driftnote, ShortStop and HydroMonk — follow the same principles in sections 2 and 3: no account, no analytics, no data sold, and nothing you create sent to a server of ours. The permissions each one requests, and the reason for them, are shown on its Chrome Web Store listing before you install.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">{5 + EXTENSIONS.length}. Your data, your control</h2>
          <p>
            Everything an extension stores lives in your browser. To remove it:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm list-disc list-inside">
            <li>Uninstall the extension from <code className="font-mono text-purple-400">chrome://extensions</code> — this deletes its stored data</li>
            <li>Or clear it from within the extension itself, where it offers that</li>
            <li>Settings synced through your Chrome account can be removed from your Google account&apos;s sync settings</li>
          </ul>
          <p className="mt-3">
            We hold nothing on our side, so there is nothing for us to delete on your behalf and no request for us to action.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">{6 + EXTENSIONS.length}. Children&apos;s privacy</h2>
          <p>
            Our extensions are not directed at children under 13, and do not knowingly collect information from them. In practice they collect no personal data from any user, of any age.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">{7 + EXTENSIONS.length}. Changes to this policy</h2>
          <p>
            We may update this policy as extensions change. Any update is reflected on this page with a new date at the top. If a change ever materially affects what an extension collects, it will be called out in that extension&apos;s release notes as well.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">{8 + EXTENSIONS.length}. Contact</h2>
          <p>
            Questions about this policy, or about a specific extension, are welcome via the{' '}
            <a
              href="https://github.com/devops-monk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              GitHub issue tracker
            </a>{' '}
            for that project, or through{' '}
            <a
              href="https://blog.devops-monk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              blog.devops-monk.com
            </a>.
          </p>
        </section>

      </div>
    </div>
  )
}