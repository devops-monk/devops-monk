import type { ReactNode } from 'react'

/* ── Icons ──────────────────────────────────────────────────────────────── */

const iconProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
}

const icons: Record<string, ReactNode> = {
  shuffle: <><path d="M16 3h5v5" /><path d="M4 20 21 3" /><path d="M21 16v5h-5" /><path d="m15 15 6 6" /><path d="M4 4l5 5" /></>,
  wallet: <><path d="M3 7a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M16 12h2" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  tag: <><path d="M3 11V4a1 1 0 0 1 1-1h7l9 9-8 8z" /><circle cx="7.5" cy="7.5" r="1.2" /></>,
  terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m8 10 2.5 2L8 14" /><path d="M13 15h4" /></>,
  play: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m10 9.5 5 2.5-5 2.5z" /></>,
  home: <><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 21v-7h6v7" /></>,
  drive: <><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></>,
  hook: <><path d="M12 3v8a4 4 0 0 1-8 0" /><circle cx="12" cy="19" r="2" /><path d="M12 13v4" /></>,
  gamepad: <><rect x="2" y="7" width="20" height="11" rx="4" /><path d="M7 11v3M5.5 12.5h3" /><circle cx="16" cy="11.5" r="1" /><circle cx="18.5" cy="14" r="1" /></>,
  camera: <><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><circle cx="12" cy="12.5" r="3.5" /></>,
  flask: <><path d="M10 3h4" /><path d="M11 3v6l-5.5 9A2 2 0 0 0 7.2 21h9.6a2 2 0 0 0 1.7-3L13 9V3" /><path d="M8 15h8" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14-4.5L4 9" /><path d="M4 5v4h4" /><path d="M4 13a8 8 0 0 0 14 4.5L20 15" /><path d="M20 19v-4h-4" /></>,
  bolt: <><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></>,
  key: <><circle cx="8" cy="14" r="4" /><path d="m11 11 9-9" /><path d="m17 5 2 2" /><path d="m14.5 7.5 2 2" /></>,
  chart: <><path d="M4 20V6" /><path d="M4 20h16" /><rect x="8" y="12" width="3" height="8" /><rect x="14" y="8" width="3" height="12" /></>,
  bell: <><path d="M18 9a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6" /><path d="M10.5 20a2 2 0 0 0 3 0" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" /></>,
  activity: <><path d="M3 12h4l3 8 4-16 3 8h4" /></>,
  shield: <><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" /><path d="m9 12 2 2 4-4" /></>,
  container: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z" /><path d="m4 7.5 8 4.5 8-4.5" /><path d="M12 12v9" /></>,
}

function Icon({ name, className = '' }: { name: string; className?: string }) {
  return <svg {...iconProps} className={className}>{icons[name]}</svg>
}

/* ── Content ────────────────────────────────────────────────────────────── */

const problems = [
  {
    icon: 'shuffle',
    title: 'Residential IP addresses rotate',
    desc: 'Consumer broadband assigns addresses dynamically. A router reboot, a line fault, or a routine lease renewal is enough to reassign the address your services were reachable on.',
  },
  {
    icon: 'wallet',
    title: 'Static addressing is priced as a business feature',
    desc: 'Where a static IP is offered at all, it typically requires a business tariff. Dynamic DNS achieves the same reachability without changing your plan.',
  },
  {
    icon: 'link',
    title: 'Hard-coded addresses create maintenance debt',
    desc: 'SSH configuration, webhook endpoints, firewall allow-lists, and monitoring checks each embed the address. A single change requires updating all of them.',
  },
  {
    icon: 'lock',
    title: 'Remote access fails without local intervention',
    desc: 'When the address changes while you are away, the only way to recover it is to read the new value from equipment you cannot reach.',
  },
  {
    icon: 'clock',
    title: 'Free DDNS tiers have contracted',
    desc: 'No-IP expires hostnames every thirty days without an email confirmation. DynDNS withdrew its free tier entirely. Remaining providers impose rate limits or interstitials.',
  },
  {
    icon: 'tag',
    title: 'Vendor hostnames are not your namespace',
    desc: 'A hostname under a provider’s domain ties your infrastructure to their branding and their continued operation. Records here sit under a domain you can point elsewhere.',
  },
]

const useCases = [
  { icon: 'terminal', title: 'Remote shell access', desc: 'Address home infrastructure by hostname in SSH config rather than maintaining a current IP address.' },
  { icon: 'play', title: 'Media servers', desc: 'Provide Plex, Jellyfin, or similar services with a stable endpoint for users outside the network.' },
  { icon: 'home', title: 'Home automation', desc: 'Point companion applications and remote dashboards at a hostname that tracks the connection.' },
  { icon: 'drive', title: 'Network storage and backup', desc: 'Keep off-site backup targets reachable on a schedule without manual reconfiguration.' },
  { icon: 'hook', title: 'Webhook delivery', desc: 'Receive provider callbacks directly on a development machine without maintaining a tunnel process.' },
  { icon: 'gamepad', title: 'Game and voice servers', desc: 'Distribute a single hostname to participants instead of redistributing an address after each change.' },
  { icon: 'camera', title: 'Surveillance systems', desc: 'Reach recorders and camera interfaces remotely without a vendor cloud subscription.' },
  { icon: 'flask', title: 'Lab and staging environments', desc: 'Assign stable names to self-hosted CI runners, test nodes, and demonstration environments.' },
]

const steps = [
  { n: '01', title: 'Authenticate', desc: 'Sign in with Google, GitHub, Microsoft, or email and password. No payment details and no recurring confirmation are required to retain a hostname.' },
  { n: '02', title: 'Register a subdomain', desc: 'Choose a label under ddns.devops-monk.com. Each account supports up to five subdomains, and each is issued its own scoped update token.' },
  { n: '03', title: 'Configure an updater', desc: 'Use a scheduled job, your router’s built-in DDNS client, the desktop application, or a direct HTTP request — whichever suits the host that stays online.' },
  { n: '04', title: 'Operate', desc: 'The record follows the connection. Short TTLs allow a new address to resolve within seconds, and every change is recorded in the dashboard.' },
]

const methods = [
  {
    tag: 'Scheduled job',
    title: 'Linux, macOS, Raspberry Pi',
    desc: 'A single crontab entry. No daemon and no dependencies beyond curl.',
    code: '*/5 * * * * curl -s "https://api.devops-monk.com/update\\\n?domain=myhome&token=YOUR_TOKEN" > /dev/null',
  },
  {
    tag: 'Router',
    title: 'DD-WRT, OpenWRT, EdgeRouter, pfSense',
    desc: 'Enter the URL in the router’s custom DDNS field. The router performs the update itself, so no other host needs to remain powered on.',
    code: 'https://api.devops-monk.com/update\\\n?domain=myhome&token=YOUR_TOKEN',
  },
  {
    tag: 'Desktop client',
    title: 'Windows, macOS, Linux',
    desc: 'For users who prefer not to work in a terminal. Install, supply the subdomain and token, and the client maintains the record in the background.',
    code: '# Available from\nhttps://ddns.devops-monk.com/downloads',
  },
  {
    tag: 'HTTP API',
    title: 'Scripts and containers',
    desc: 'A single GET request returning the recorded address. Suitable for container health checks, systemd timers, or a custom agent.',
    code: 'curl "https://api.devops-monk.com/update\\\n?domain=myhome&token=YOUR_TOKEN"\n# {"status":"ok","ip":"143.58.156.75"}',
  },
]

const features = [
  { icon: 'refresh', title: 'Automatic updates', desc: 'Scheduled job, router firmware, desktop client, or direct HTTP request. The record is revised as soon as the address changes.' },
  { icon: 'bolt', title: 'Short TTL propagation', desc: 'Records are published with low TTLs so resolvers pick up a new address within seconds rather than waiting on cached values.' },
  { icon: 'key', title: 'Scoped update tokens', desc: 'Each subdomain is issued an independent token that can be rotated on its own. A token deployed to one host cannot modify other records.' },
  { icon: 'chart', title: 'Change history', desc: 'A per-record audit trail of timestamp, previous address, and new address, making connectivity incidents straightforward to reconstruct.' },
  { icon: 'bell', title: 'Change notifications', desc: 'Outbound webhooks to Discord, Telegram, Slack, or a custom endpoint whenever an address changes.' },
  { icon: 'globe', title: 'IPv4 and IPv6', desc: 'A and AAAA records are both supported, keeping dual-stack connections reachable over either protocol.' },
  { icon: 'activity', title: 'Connectivity diagnostics', desc: 'The dashboard traces device, internet, DDNS server, and DNS record state with per-hop latency, refreshed every thirty seconds.' },
  { icon: 'shield', title: 'Federated sign-in', desc: 'Google, GitHub, and Microsoft identity providers, alongside email and password with self-service reset.' },
  { icon: 'container', title: 'Self-hostable', desc: 'The full stack — API, authoritative nameserver, database, and reverse proxy — is distributed as a Docker Compose deployment.' },
]

const comparison = [
  { label: 'Free tier without expiry', ours: 'Included', theirs: 'Reduced or withdrawn' },
  { label: 'Recurring confirmation required', ours: 'No', theirs: 'Required by No-IP' },
  { label: 'Per-subdomain scoped tokens', ours: 'Included', theirs: 'Single account credential' },
  { label: 'Address change history', ours: 'Included', theirs: 'Rarely on free tiers' },
  { label: 'Webhook on change', ours: 'Included', theirs: 'Paid add-on' },
  { label: 'Self-hosting the full stack', ours: 'Supported', theirs: 'Not available' },
]

const stack = ['Node.js', 'Express', 'PowerDNS', 'PostgreSQL', 'React', 'Docker Compose', 'Nginx']

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function DynamicDNS() {
  return (
    <div className="overflow-x-hidden">

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-orange-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-600/[0.07] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-semibold tracking-wide uppercase mb-8">
            DNS Infrastructure
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e6edf3] leading-[1.1] mb-6">
            Dynamic DNS <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Platform</span>
          </h1>

          <p className="text-xl sm:text-2xl text-[#e6edf3] font-medium mb-6 leading-snug">
            A stable hostname for infrastructure on a changing address.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mb-10">
            Residential connections are assigned addresses that change without notice. This platform maintains a DNS
            record — <span className="text-orange-300 font-mono text-base">myhome.ddns.devops-monk.com</span> — that
            tracks the current address automatically, so remote access, media services, webhook endpoints, and backup
            jobs continue to resolve correctly.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-sm text-[#8b949e]">
            {['Free to use', 'No recurring confirmation', 'Automatic updates', 'Self-hostable'].map((t) => (
              <span key={t} className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />{t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="https://ddns.devops-monk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold hover:from-orange-500 hover:to-red-500 transition-all duration-200 shadow-lg shadow-orange-600/20 hover:-translate-y-0.5 text-sm"
            >
              Open the platform
            </a>
            <a
              href="https://blog.devops-monk.com/2026/04/build-your-own-ddns-platform/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-200 text-sm"
            >
              Technical write-up
            </a>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 relative border-t border-[#30363d]/60">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">The problem</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-5" />
            <p className="text-[#8b949e] text-lg leading-relaxed">
              Self-hosted services depend on an address that the connection provider controls and reassigns without
              warning. Six consequences follow from that.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {problems.map((p) => (
              <div key={p.title} className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-orange-500/40 transition-colors duration-300">
                <Icon name={p.icon} className="w-6 h-6 text-orange-400 mb-4" />
                <h3 className="font-semibold text-[#e6edf3] mb-2">{p.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-orange-500/25 bg-orange-500/5 p-6 sm:p-8">
            <p className="text-[#8b949e] leading-relaxed max-w-3xl">
              <span className="text-[#e6edf3] font-semibold">The resolution is a layer of indirection.</span>{' '}
              Services are published under a hostname rather than an address. A lightweight updater reports the
              current address to the platform, the DNS record is rewritten within seconds, and every client
              referencing the hostname continues to resolve to the correct destination.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">The dashboard</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-5" />
            <p className="text-[#8b949e] text-lg leading-relaxed">
              A single view covering the path from the local device through to the published DNS record, with
              subdomain registration inline.
            </p>
          </div>

          <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] overflow-hidden shadow-2xl shadow-black/40">
            <img
              src="/ddns/dashboard.png"
              alt="Dashboard showing the connectivity path from device to DNS records, current public address, and a registered subdomain"
              loading="lazy"
              className="w-full h-auto block"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mt-8">
            {[
              { t: 'Connectivity trace', d: 'Device, internet, DDNS server, and DNS record state with per-hop latency, refreshed automatically every thirty seconds.' },
              { t: 'Current address', d: 'The active public address, the interval since the last change, and overall service health in a single row.' },
              { t: 'Registered subdomains', d: 'Each record with its type, status, resolved address, copyable update URL, and full change history.' },
            ].map((c) => (
              <div key={c.t} className="rounded-xl border border-[#30363d] bg-[#0d1117] p-5">
                <h3 className="font-semibold text-[#e6edf3] mb-2">{c.t}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 relative border-t border-[#30363d]/60">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Applications</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-5" />
            <p className="text-[#8b949e] text-lg leading-relaxed">
              Any service hosted on a residential connection that must be reachable from outside the network.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {useCases.map((u) => (
              <div key={u.title} className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-orange-500/50 hover:bg-[#161b22] transition-all duration-300">
                <Icon name={u.icon} className="w-6 h-6 text-orange-400 mb-4" />
                <h3 className="font-semibold text-[#e6edf3] mb-2">{u.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting started */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Getting started</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-5" />
            <p className="text-[#8b949e] text-lg leading-relaxed">Four steps, typically under five minutes.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="relative pl-5 border-l-2 border-orange-500/30">
                <div className="text-orange-400 font-mono text-sm font-bold mb-3">{step.n}</div>
                <h3 className="font-semibold text-[#e6edf3] mb-2">{step.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Update methods */}
      <section className="py-20 relative border-t border-[#30363d]/60">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Update methods</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-5" />
            <p className="text-[#8b949e] text-lg leading-relaxed">
              Each method calls the same endpoint. Choose whichever matches the host that remains online.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {methods.map((m) => (
              <div key={m.tag} className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-orange-500/40 transition-colors duration-300 flex flex-col">
                <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wide bg-orange-500/10 text-orange-400 border border-orange-500/25">{m.tag}</span>
                  <h3 className="font-semibold text-[#e6edf3]">{m.title}</h3>
                </div>
                <p className="text-[#8b949e] text-sm leading-relaxed mb-5">{m.desc}</p>
                <pre className="mt-auto rounded-xl border border-[#30363d] bg-[#010409] p-4 overflow-x-auto text-xs leading-relaxed text-[#8b949e] font-mono">
                  <code>{m.code}</code>
                </pre>
              </div>
            ))}
          </div>

          <p className="text-[#8b949e] text-sm mt-8">
            Complete endpoint reference:{' '}
            <a href="https://ddns.devops-monk.com/api-docs" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline underline-offset-4">
              ddns.devops-monk.com/api-docs
            </a>
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Capabilities</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-5" />
            <p className="text-[#8b949e] text-lg leading-relaxed">
              The functionality expected of a production DNS service, without a paid tier.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-[#30363d] bg-[#0d1117] p-6 hover:border-orange-500/50 hover:bg-[#161b22] transition-all duration-300">
                <Icon name={f.icon} className="w-6 h-6 text-orange-400 mb-4" />
                <h3 className="font-semibold text-[#e6edf3] mb-2 group-hover:text-orange-300 transition-colors">{f.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 relative border-t border-[#30363d]/60">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Compared with common free tiers</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
          </div>

          <div className="rounded-2xl border border-[#30363d] overflow-hidden overflow-x-auto">
            <table className="w-full text-sm border-collapse min-w-[34rem]">
              <thead>
                <tr className="bg-[#161b22]">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8b949e]">Capability</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-orange-400">This platform</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#8b949e]">Typical free DDNS</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-t border-[#30363d] bg-[#0d1117]">
                    <td className="px-5 py-4 text-[#e6edf3]">{row.label}</td>
                    <td className="px-5 py-4 text-emerald-400 font-medium">{row.ours}</td>
                    <td className="px-5 py-4 text-[#8b949e]">{row.theirs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Self-hosting */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-8 sm:p-10 grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-4">Or deploy your own instance</h2>
              <p className="text-[#8b949e] leading-relaxed">
                Third-party providers discontinue services, revise pricing, and withdraw free tiers. The entire stack —
                an Express API, PowerDNS as the authoritative nameserver, PostgreSQL for accounts and audit logs, and
                Nginx terminating TLS — is distributed as a Docker Compose deployment. Delegate your own domain's NS
                records to it and the DNS, the availability, and the data remain under your control.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {stack.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#161b22] text-[#8b949e] border border-[#30363d]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-600/[0.08] to-red-600/[0.08] p-10 relative overflow-hidden text-center">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-600/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-600/[0.07] rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-4">Register a subdomain</h2>
              <p className="text-[#8b949e] text-lg mb-8 max-w-xl mx-auto">
                Sign in, choose a hostname, and add a single scheduled job. The deployment guide covers running your
                own instance.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://ddns.devops-monk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold hover:from-orange-500 hover:to-red-500 transition-all duration-200 shadow-lg shadow-orange-600/20 hover:-translate-y-0.5"
                >
                  Get started
                </a>
                <a
                  href="https://blog.devops-monk.com/2026/04/build-your-own-ddns-platform/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-200"
                >
                  Deployment guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
