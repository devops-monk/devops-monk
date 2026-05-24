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
          Last updated: <span className="text-[#e6edf3]">May 2026</span>
        </p>
        <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-5 py-4 text-emerald-400 text-sm font-medium">
          ✓ SnapMonk does not collect, transmit, or store any personal data on external servers. All data stays in your browser.
        </div>
      </div>

      <div className="space-y-10 text-[#8b949e] leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">1. Overview</h2>
          <p>
            SnapMonk ("the Extension") is a Chrome browser extension developed by Abhay Pratap Singh (DevOps-Monk). This Privacy Policy explains what data the Extension accesses, how it is used, and your rights as a user.
          </p>
          <p className="mt-3">
            SnapMonk is built with privacy as a core principle. The Extension operates entirely within your browser. No data is sent to any external server, no analytics are collected, and no account is required.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">2. Data We Access</h2>
          <p className="mb-4">The Extension accesses the following data solely to provide its features:</p>
          <div className="space-y-3">
            {[
              {
                item: 'Screenshots of the current tab',
                use: 'To capture the visible area, full page, selected region, or a specific element as requested by you. Images are stored temporarily in your browser\'s local IndexedDB and are never uploaded.',
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
            ].map(({ item, use }) => (
              <div key={item} className="rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-4">
                <p className="text-[#e6edf3] font-semibold text-sm mb-1">{item}</p>
                <p className="text-sm">{use}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">3. Data We Do NOT Collect</h2>
          <ul className="space-y-2">
            {[
              'We do not collect any personal information (name, email, IP address, etc.)',
              'We do not use analytics, tracking pixels, or telemetry of any kind',
              'We do not share any data with third parties',
              'We do not upload screenshots, recordings, or annotations to any server',
              'We do not use cookies',
              'We do not require an account or login',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <span className="text-red-400 mt-0.5 flex-shrink-0">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">4. Local Storage</h2>
          <p>
            The Extension uses your browser's local IndexedDB to temporarily store captured screenshots while you work in the annotation editor. This data:
          </p>
          <ul className="mt-3 space-y-1.5 text-sm list-disc list-inside">
            <li>Never leaves your device</li>
            <li>Is accessible only to the Extension</li>
            <li>Can be cleared at any time via Chrome's site data settings</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">5. Permissions Justification</h2>
          <div className="space-y-3">
            {[
              { perm: 'activeTab', reason: 'Required to capture a screenshot of the page you are currently viewing.' },
              { perm: 'scripting', reason: 'Required to inject the region-selection overlay and screen recorder toolbar into web pages.' },
              { perm: 'tabs', reason: 'Required to read the current tab\'s URL and title for export filename suggestions.' },
              { perm: 'storage', reason: 'Required to save captured images temporarily in local browser storage (IndexedDB) while editing.' },
              { perm: 'desktopCapture', reason: 'Required to enable full-desktop and application window screen recording modes.' },
            ].map(({ perm, reason }) => (
              <div key={perm} className="flex gap-4 items-start rounded-xl border border-[#30363d] bg-[#161b22] px-5 py-4">
                <code className="text-sm font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded flex-shrink-0 mt-0.5">
                  {perm}
                </code>
                <p className="text-sm">{reason}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">6. Third-Party Services</h2>
          <p>
            SnapMonk does not integrate with any third-party services during normal operation. If you choose to convert a recording to MP4 on an older browser, the Extension may fetch the ffmpeg.wasm processing library from a public CDN (unpkg.com). No user data is included in this request — it is equivalent to loading a JavaScript library.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">7. Children's Privacy</h2>
          <p>
            SnapMonk does not knowingly collect any information from children under the age of 13. The Extension does not collect any personal data from any user regardless of age.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. Continued use of the Extension after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#e6edf3] mb-3">9. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please reach out via the{' '}
            <a
              href="https://github.com/devops-monk/snapMonk/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              GitHub issue tracker
            </a>{' '}
            or through{' '}
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
