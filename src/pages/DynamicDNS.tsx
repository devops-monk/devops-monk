const features = [
  { icon: '🔄', title: 'Auto IP Updates', desc: 'Lightweight agent runs on your machine and pushes IP changes to the platform the moment your ISP rotates your address.' },
  { icon: '🌐', title: 'Custom Domains', desc: 'Map any subdomain you own to your dynamic IP. Full DNS control without relying on third-party DDNS providers.' },
  { icon: '⚡', title: 'Low TTL Propagation', desc: 'Records use short TTLs so DNS propagates within seconds of an IP change — no downtime, no stale cache.' },
  { icon: '🔐', title: 'API-Key Authentication', desc: 'Each update agent authenticates with a signed API key. No credentials stored on client machines.' },
  { icon: '📊', title: 'Update History', desc: 'Full audit log of every IP update per record — timestamp, old IP, new IP. Know exactly when and what changed.' },
  { icon: '🐳', title: 'Docker-Ready Agent', desc: 'Ship the update agent as a container. Works on Raspberry Pi, NAS devices, home servers, and cloud VMs.' },
]

const steps = [
  { n: '1', title: 'Deploy the Platform', desc: 'Self-host the DDNS server on any VPS or home server using the provided Docker Compose setup.' },
  { n: '2', title: 'Add Your Domain', desc: 'Point your domain\'s NS records to the platform. Create a DDNS record for any subdomain.' },
  { n: '3', title: 'Run the Agent', desc: 'Start the update agent on any machine behind a dynamic IP. It watches for changes and updates DNS automatically.' },
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
            Own your DNS. No third parties.
          </p>

          <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            A self-hosted dynamic DNS solution for mapping your domain names to changing IP addresses. Full control, automatic IP update agents, and no dependency on DynDNS, No-IP, or any third-party DDNS provider.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-orange-500/15 text-orange-400 border border-orange-500/30">✓ Self-Hosted</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-red-500/15 text-red-400 border border-red-500/30">✓ No Third-Party</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">✓ Auto IP Updates</span>
            <span className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30">✓ Docker-Ready</span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://ddns.devops-monk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold hover:from-orange-500 hover:to-red-500 transition-all duration-200 shadow-xl shadow-orange-600/25 hover:-translate-y-0.5 text-sm"
            >
              View Live Platform ↗
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

      {/* ── Features ── */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Platform Features</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">Everything you need to run a production-grade DDNS service on your own infrastructure.</p>
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

      {/* ── How it works ── */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">How It Works</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mx-auto" />
          </div>
          <div className="grid sm:grid-cols-3 gap-6 relative">
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-orange-500/50 via-red-500/50 to-orange-500/50" />
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-2xl font-bold text-white mx-auto mb-5 shadow-lg shadow-orange-600/30 relative z-10">{step.n}</div>
                <h3 className="font-bold text-[#e6edf3] text-lg mb-2">{step.title}</h3>
                <p className="text-[#8b949e] text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why self-host ── */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-[#161b22]/50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-8 sm:p-10 text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e6edf3] mb-4">Why Self-Host?</h2>
            <p className="text-[#8b949e] text-lg leading-relaxed max-w-2xl mx-auto">
              Third-party DDNS providers go offline, change pricing, or sunset free tiers. When you self-host, you control the DNS, the uptime, and the data. No vendor lock-in. No surprise outages. No accounts tied to external services.
            </p>
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
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Deploy Your Own DDNS</h2>
              <p className="text-[#8b949e] text-lg mb-8">Read the step-by-step guide and have it running in under an hour.</p>
              <a
                href="https://blog.devops-monk.com/2026/04/build-your-own-ddns-platform/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg hover:from-orange-500 hover:to-red-500 transition-all duration-200 shadow-xl shadow-orange-600/30 hover:-translate-y-0.5"
              >
                Read the Guide ↗
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
