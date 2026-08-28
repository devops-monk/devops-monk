const problems = [
  {
    icon: '🎲',
    title: 'Your ISP keeps changing your IP',
    desc: 'Residential broadband hands out dynamic addresses. Reboot the router, survive an outage, or just wait long enough, and the IP you bookmarked yesterday belongs to someone else today.',
  },
  {
    icon: '💸',
    title: 'A static IP costs money — or is not sold at all',
    desc: 'Most consumer ISPs charge a business-plan premium for a static address, and plenty simply refuse to sell one. A DDNS name gets you the same practical result for free.',
  },
  {
    icon: '🔗',
    title: 'Hard-coded IPs break everything downstream',
    desc: 'SSH configs, webhook URLs, firewall allow-lists, monitoring checks, family members’ bookmarks. One IP change and you are editing all of them by hand.',
  },
  {
    icon: '🚪',
    title: 'You are locked out when you are not home',
    desc: 'The moment the IP rotates while you are travelling, your home server is unreachable and there is no one on the couch to read the new address off the router page.',
  },
  {
    icon: '⛓️',
    title: 'Free DDNS providers keep shrinking',
    desc: 'No-IP expires hostnames every 30 days unless you click a confirmation email. DynDNS killed its free tier outright. Others rate-limit, inject ads, or vanish.',
  },
  {
    icon: '🏷️',
    title: 'You want your own name, not theirs',
    desc: 'A hostname like myhome.ddns.devops-monk.com reads like infrastructure you own. Something.ddns.net reads like a hobby account on a service that may not outlive it.',
  },
]

const useCases = [
  { icon: '🖥️', title: 'SSH into your home server', desc: 'ssh you@homelab.ddns.devops-monk.com from anywhere, without ever looking up an address again.' },
  { icon: '🎬', title: 'Plex, Jellyfin & media servers', desc: 'Give family a permanent hostname for your media library instead of an IP that dies every few weeks.' },
  { icon: '🏠', title: 'Home Assistant & IoT', desc: 'Point automations, companion apps, and remote dashboards at a name that follows your connection.' },
  { icon: '💾', title: 'NAS & backups', desc: 'Synology, TrueNAS, or a plain rsync target stays reachable for off-site backups on a schedule.' },
  { icon: '🪝', title: 'Webhook development', desc: 'Receive Stripe, GitHub, or Twilio callbacks straight to your dev box — no tunnel process to keep alive.' },
  { icon: '🎮', title: 'Game & voice servers', desc: 'Share one hostname with your group once, and stop posting a new IP in the chat every weekend.' },
  { icon: '📷', title: 'Cameras & NVR', desc: 'Reach security footage remotely without paying for the camera vendor’s cloud subscription.' },
  { icon: '🧪', title: 'Lab & staging environments', desc: 'Give a Raspberry Pi cluster or a spare mini-PC a stable DNS name for CI runners and demos.' },
]

const steps = [
  { n: '1', title: 'Sign in', desc: 'Log in with Google, GitHub, Microsoft, or email and password. No credit card, no monthly confirmation email to keep the name alive.' },
  { n: '2', title: 'Claim a subdomain', desc: 'Pick any name and it becomes yours — myhome.ddns.devops-monk.com. Up to 5 per account, each with its own scoped update token.' },
  { n: '3', title: 'Point something at it', desc: 'A cron line, your router’s built-in DDNS form, the desktop app, or a raw HTTP call. Whatever suits the machine.' },
  { n: '4', title: 'Forget about it', desc: 'The record follows your connection. Low TTLs mean a new IP resolves within seconds, and the dashboard logs every change.' },
]

const methods = [
  {
    tag: 'Cron',
    title: 'Linux, macOS, Raspberry Pi',
    desc: 'One crontab line. No daemon, no dependencies beyond curl.',
    code: `*/5 * * * * curl -s "https://api.devops-monk.com/update\\
?domain=myhome&token=YOUR_TOKEN" > /dev/null`,
  },
  {
    tag: 'Router',
    title: 'DD-WRT, OpenWRT, EdgeRouter, pfSense',
    desc: 'Paste the URL into the router’s custom DDNS field. The router updates DNS itself — nothing else in the house needs to stay powered on.',
    code: `https://api.devops-monk.com/update\\
?domain=myhome&token=YOUR_TOKEN`,
  },
  {
    tag: 'Desktop app',
    title: 'Windows, macOS, Linux',
    desc: 'For anyone who would rather not touch a terminal. Install, paste subdomain and token, and it keeps the record fresh in the background.',
    code: `# Download from
https://ddns.devops-monk.com/downloads`,
  },
  {
    tag: 'API',
    title: 'Scripts & containers',
    desc: 'A plain HTTP GET that returns the recorded IP. Drop it into a Docker healthcheck, a systemd timer, or your own agent.',
    code: `curl "https://api.devops-monk.com/update\\
?domain=myhome&token=YOUR_TOKEN"
# → {"status":"ok","ip":"143.58.156.75"}`,
  },
]

const features = [
  { icon: '🔄', title: 'Auto IP Updates', desc: 'Cron job, router firmware, desktop agent, or a bare HTTP call — the record updates the moment your ISP rotates your address.' },
  { icon: '⚡', title: 'Low TTL Propagation', desc: 'Records use short TTLs so DNS resolves the new address within seconds of a change — no downtime waiting on stale caches.' },
  { icon: '🔐', title: 'Per-Domain Tokens', desc: 'Every subdomain gets its own scoped update token you can rotate independently. A token on a Pi cannot touch your other records.' },
  { icon: '📊', title: 'IP Change History', desc: 'An audit trail per record — timestamp, previous IP, new IP — so an outage becomes a question you can actually answer.' },
  { icon: '🔔', title: 'Webhook Notifications', desc: 'Fire a Discord, Telegram, Slack, or custom webhook whenever an IP changes. Know your connection moved before your users do.' },
  { icon: '🌐', title: 'IPv4 and IPv6', desc: 'A and AAAA records both supported, so dual-stack connections stay reachable on either protocol.' },
  { icon: '📡', title: 'Live Connectivity View', desc: 'The dashboard traces device → internet → DDNS server → DNS records with latency at each hop, refreshed every 30 seconds.' },
  { icon: '🔓', title: 'SSO Login', desc: 'Google, GitHub, and Microsoft sign-in, or plain email and password with self-serve reset. No separate account to remember.' },
  { icon: '🐳', title: 'Self-Hostable', desc: 'The whole stack — Express API, PowerDNS, PostgreSQL — ships as Docker Compose. Run the hosted service, or run your own copy.' },
]

const comparison = [
  { label: 'Free tier that stays free', ours: 'Yes', theirs: 'Shrinking or gone' },
  { label: 'Monthly confirmation email', ours: 'No', theirs: 'Required by No-IP' },
  { label: 'Per-domain scoped tokens', ours: 'Yes', theirs: 'Usually one account password' },
  { label: 'IP change history', ours: 'Yes', theirs: 'Rare on free tiers' },
  { label: 'Webhook on IP change', ours: 'Yes', theirs: 'Paid add-on' },
  { label: 'Self-host the whole stack', ours: 'Yes', theirs: 'No' },
]

export default function DynamicDNS() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative min-h-[75vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-sm font-medium mb-6">
            <span className="text-lg">🌐</span>
            DNS · Self-Hosted · Infrastructure
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#e6edf3] leading-tight mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
              Dynamic DNS Platform
            </span>
          </h1>

          <p className="text-2xl sm:text-3xl font-semibold text-[#e6edf3] mb-4">
            A permanent name for an address that keeps moving.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Your home connection gets a new IP whenever your ISP feels like it. This platform gives you a hostname
            like <span className="text-orange-300 font-mono text-base">myhome.ddns.devops-monk.com</span> that
            follows it automatically — so SSH, your media server, your webhooks, and your backups keep working
            without anyone reading an IP off a router page.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">✓ Free to use</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-500/15 text-red-400 border border-red-500/30">✓ No monthly confirmation</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">✓ Auto IP updates</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">✓ Self-hostable</span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://ddns.devops-monk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold hover:from-orange-500 hover:to-red-500 transition-all duration-200 shadow-xl shadow-orange-600/25 hover:-translate-y-0.5 text-sm"
            >
              Claim Your Subdomain ↗
            </a>
            <a
              href="https://blog.devops-monk.com/2026/04/build-your-own-ddns-platform/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-200 text-sm"
            >
              Read the Blog Post ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── The problem ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">The Problem It Solves</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
              Everything you host at home lives behind an address you do not control and cannot predict.
              These are the six ways that bites.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {problems.map((p) => (
              <div key={p.title} className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-orange-500/40 transition-colors duration-300">
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-lg">{p.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 sm:p-8">
            <p className="text-[#8b949e] leading-relaxed text-center max-w-3xl mx-auto">
              <span className="text-[#e6edf3] font-semibold">The fix is one layer of indirection.</span> Instead of
              sharing an IP, you share a hostname. A tiny updater tells the platform whenever the IP behind that
              hostname changes, the DNS record is rewritten in seconds, and everything pointed at the name keeps
              resolving to the right place.
            </p>
          </div>
        </div>
      </section>

      {/* ── Dashboard screenshot ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">The Dashboard</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
              One screen shows the whole path from your device to the live DNS record — and lets you claim a new
              subdomain in a single field.
            </p>
          </div>

          <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] overflow-hidden shadow-2xl shadow-orange-950/30 hover:border-orange-500/40 transition-colors duration-300">
            <img
              src="/ddns/dashboard.png"
              alt="DDNS dashboard showing the connectivity path from device to DNS records, public IP, and a registered subdomain"
              loading="lazy"
              className="w-full h-auto block"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mt-8">
            <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-5">
              <h3 className="font-bold text-[#e6edf3] mb-2">Connectivity trace</h3>
              <p className="text-[#8b949e] text-sm leading-relaxed">Device → internet → DDNS server → DNS records, with latency at each hop and an auto-refresh every 30 seconds.</p>
            </div>
            <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-5">
              <h3 className="font-bold text-[#e6edf3] mb-2">Live IP at a glance</h3>
              <p className="text-[#8b949e] text-sm leading-relaxed">Current public IP, how long ago it last changed, and whether the service is healthy — no digging through logs.</p>
            </div>
            <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-5">
              <h3 className="font-bold text-[#e6edf3] mb-2">Your domains</h3>
              <p className="text-[#8b949e] text-sm leading-relaxed">Every subdomain with its record type, status, resolved IP, copy-to-clipboard update URL, and full change history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">What People Use It For</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
              Anything at home that something outside the house needs to reach.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {useCases.map((u) => (
              <div key={u.title} className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-orange-500/50 hover:bg-[#161b22] transition-all duration-300 hover:-translate-y-0.5">
                <div className="text-3xl mb-3">{u.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2">{u.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">How to Use It</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">Four steps, and about five minutes.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-orange-500/50 via-red-500/50 to-orange-500/50" />
            {steps.map((step) => (
              <div key={step.n} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg shadow-orange-600/30 relative z-10">{step.n}</div>
                <h3 className="font-bold text-[#e6edf3] text-lg mb-2">{step.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ways to keep it updated ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Four Ways to Keep It Updated</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-2xl mx-auto">
              Every method hits the same endpoint. Pick whichever fits the machine that stays on.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {methods.map((m) => (
              <div key={m.tag} className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-orange-500/40 transition-colors duration-300 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">{m.tag}</span>
                  <h3 className="font-bold text-[#e6edf3]">{m.title}</h3>
                </div>
                <p className="text-[#8b949e] text-sm leading-relaxed mb-4">{m.desc}</p>
                <pre className="mt-auto rounded-xl border border-[#30363d] bg-[#010409] p-4 overflow-x-auto text-xs leading-relaxed text-[#8b949e] font-mono">
                  <code>{m.code}</code>
                </pre>
              </div>
            ))}
          </div>

          <p className="text-center text-[#8b949e] text-sm mt-8">
            Full endpoint reference lives at{' '}
            <a href="https://ddns.devops-monk.com/api-docs" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline underline-offset-4">
              ddns.devops-monk.com/api-docs
            </a>
          </p>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Platform Features</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">Everything a production-grade DDNS service needs, and nothing behind a paywall.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-orange-500/50 hover:bg-[#161b22] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-600/10">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-[#e6edf3] mb-2 text-lg group-hover:text-orange-300 transition-colors">{f.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Versus the Usual Free Tiers</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto" />
          </div>

          <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] gap-px bg-[#30363d]">
              <div className="bg-[#161b22] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#8b949e]">Capability</div>
              <div className="bg-[#161b22] px-5 py-3 text-xs font-bold uppercase tracking-wider text-orange-400 text-center min-w-[7rem]">This platform</div>
              <div className="bg-[#161b22] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#8b949e] text-center min-w-[9rem]">Typical free DDNS</div>
              {comparison.map((row) => (
                <div key={row.label} className="contents">
                  <div className="bg-[#0d1117] px-5 py-4 text-sm text-[#e6edf3]">{row.label}</div>
                  <div className="bg-[#0d1117] px-5 py-4 text-sm font-semibold text-emerald-400 text-center">{row.ours}</div>
                  <div className="bg-[#0d1117] px-5 py-4 text-sm text-[#8b949e] text-center">{row.theirs}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why self-host ── */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-8 sm:p-10 text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-4">Or Run the Whole Thing Yourself</h2>
            <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-6">
              Third-party DDNS providers go offline, change pricing, or sunset free tiers. The entire stack here —
              an Express API, PowerDNS as the authoritative nameserver, PostgreSQL for accounts and logs, Nginx for
              TLS — ships as a Docker Compose file. Point your own domain's NS records at it and you control the DNS,
              the uptime, and the data.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Node.js + Express', 'PowerDNS', 'PostgreSQL', 'React + Vite', 'Docker Compose', 'Nginx + Let’s Encrypt'].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#161b22] text-[#8b949e] border border-[#30363d]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-600/10 to-red-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-600/15 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-600/10 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Give Your Home a Real Address</h2>
              <p className="text-[#8b949e] text-lg mb-8">Sign in, claim a subdomain, add one cron line. Or read the guide and deploy your own copy in under an hour.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://ddns.devops-monk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg hover:from-orange-500 hover:to-red-500 transition-all duration-200 shadow-xl shadow-orange-600/30 hover:-translate-y-0.5"
                >
                  Get Started Free ↗
                </a>
                <a
                  href="https://blog.devops-monk.com/2026/04/build-your-own-ddns-platform/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[#30363d] text-[#e6edf3] font-bold text-lg hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-200"
                >
                  Read the Guide ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
