import { Link } from 'react-router-dom'

const skills = [
  'Docker', 'Kubernetes', 'AWS', 'Python', 'TypeScript',
  'React', 'CI/CD', 'Linux', 'Terraform', 'Node.js',
  'Java', 'Spring Boot', 'Testcontainers',
]

const projects = [
  {
    icon: '📸',
    title: 'SnapMonk',
    desc: 'A powerful Chrome extension for capturing, annotating, and recording your screen. Features region & full-page screenshots, a rich annotation editor with arrows, shapes, blur & redact tools, and screen recording with instant MP4 export.',
    tags: ['Chrome Extension', 'TypeScript', 'Fabric.js'],
    links: [
      { label: 'Learn More', href: '/snapmonk', internal: true },
      { label: 'GitHub ↗', href: 'https://github.com/devops-monk/snapMonk', internal: false },
    ],
    gradient: 'from-purple-600/20 to-blue-600/20',
    border: 'hover:border-purple-500/60',
  },
  {
    icon: '🧘',
    title: 'MonkTab',
    desc: 'A Momentum-inspired new tab extension for developers. Pomodoro timer, 20+ ambient soundscapes, smart tasks with priority, Focus Mode with ring timer, weather, world clocks, quick bookmarks, and a lo-fi YouTube player — all in one beautiful page.',
    tags: ['Chrome Extension', 'TypeScript', 'Web Audio API'],
    links: [
      { label: 'Learn More', href: '/monktab', internal: true },
      { label: 'GitHub ↗', href: 'https://github.com/devops-monk/monkTab', internal: false },
    ],
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'hover:border-violet-500/60',
  },
  {
    icon: '🛠️',
    title: 'MonkKit',
    desc: 'A curated collection of developer utilities and CLI tools designed to streamline your workflow and dramatically boost productivity in day-to-day DevOps and development tasks.',
    tags: ['Developer Tools', 'CLI', 'Productivity'],
    links: [
      { label: 'Learn More', href: '/monkkit', internal: true },
    ],
    gradient: 'from-emerald-600/20 to-teal-600/20',
    border: 'hover:border-emerald-500/60',
  },
  {
    icon: '📈',
    title: 'Share Market Intelligence',
    desc: 'A real-time stock market analysis dashboard with intelligent insights, portfolio tracking, technical indicators, and market trend visualisation powered by live data feeds.',
    tags: ['Finance', 'Data', 'Dashboard', 'Python'],
    links: [
      { label: 'Learn More', href: '/share-market', internal: true },
    ],
    gradient: 'from-blue-600/20 to-cyan-600/20',
    border: 'hover:border-blue-500/60',
  },
  {
    icon: '🌐',
    title: 'Dynamic DNS Platform',
    desc: 'A self-hosted dynamic DNS solution for mapping domain names to changing IP addresses — full control, no third-party dependencies, with automatic IP update agents.',
    tags: ['DNS', 'Self-Hosted', 'Infrastructure', 'Networking'],
    links: [
      { label: 'Learn More', href: '/dynamic-dns', internal: true },
    ],
    gradient: 'from-orange-600/20 to-red-600/20',
    border: 'hover:border-orange-500/60',
  },
]

const posts = [
  {
    title: 'MonkKit: Developer Tools Collection',
    excerpt: 'A curated set of utilities and CLI tools to streamline your development workflow.',
    href: 'https://blog.devops-monk.com/2026/05/monkkit-developer-tools/',
    date: 'May 2026',
    tag: 'Tools',
  },
  {
    title: 'Stock Market Analysis Dashboard',
    excerpt: 'Building a real-time market intelligence platform with live data and trend analysis.',
    href: 'https://blog.devops-monk.com/2026/04/stock-market-analysis-dashboard/',
    date: 'Apr 2026',
    tag: 'Finance',
  },
  {
    title: 'Build Your Own DDNS Platform',
    excerpt: 'Self-host a dynamic DNS service — no third-party dependency, full control.',
    href: 'https://blog.devops-monk.com/2026/04/build-your-own-ddns-platform/',
    date: 'Apr 2026',
    tag: 'Infrastructure',
  },
]

export default function Home() {
  return (
    <div className="overflow-x-hidden">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-96 h-64 bg-purple-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12">

            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                Open to collaborations
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#e6edf3] leading-tight mb-4">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Abhay Pratap Singh
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-[#8b949e] font-medium mb-6">
                Software Engineer & Open Source Builder
              </p>

              <p className="text-[#8b949e] text-lg leading-relaxed max-w-xl mb-8 mx-auto lg:mx-0">
                I build tools that make developers' lives easier — from browser extensions to market intelligence platforms. I love turning complex infrastructure problems into elegant, shippable solutions.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-purple-600/25 hover:shadow-purple-600/40 hover:-translate-y-0.5"
                >
                  View Projects
                </a>
                <a
                  href="https://blog.devops-monk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200"
                >
                  Read My Blog ↗
                </a>
              </div>
            </div>

            {/* Avatar */}
            <div className="flex-shrink-0 relative">
              <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 blur-md opacity-60 scale-105" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#0d1117]">
                    <img
                      src="/avatar.jpg"
                      alt="Abhay Pratap Singh"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -bottom-3 -right-3 bg-[#161b22] border border-[#30363d] rounded-xl px-3 py-2 text-sm font-semibold text-[#e6edf3] shadow-xl">
                ⚡ DevOps-Monk
              </div>
              <div className="absolute -top-3 -left-3 bg-[#161b22] border border-purple-500/30 rounded-xl px-3 py-2 text-sm font-semibold text-purple-400 shadow-xl">
                5+ Projects
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section id="about" className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/40 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">About Me</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-[#8b949e] text-lg leading-relaxed">
              <p>
                I'm a passionate engineer who loves the intersection of automation, infrastructure, and developer experience. I believe the best tools are the ones you barely notice — they just work.
              </p>
              <p>
                From Kubernetes clusters to Chrome extensions, I build across the stack. I write in-depth tutorials at{' '}
                <a href="https://blog.devops-monk.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors">
                  blog.devops-monk.com
                </a>{' '}
                covering DevOps practices, cloud architecture, and software development.
              </p>
            </div>

            <div>
              <p className="text-sm text-[#8b949e] uppercase font-semibold tracking-wider mb-4">Skills & Technologies</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium border border-[#30363d] text-[#e6edf3] bg-[#161b22] hover:border-purple-500/50 hover:text-purple-300 transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ──────────────────────────────────────────────────────── */}
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Projects</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg max-w-xl mx-auto">
              Things I've built — from developer tools to infrastructure platforms.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div
                key={p.title}
                className={`relative group rounded-2xl border border-[#30363d] bg-[#161b22] p-6 transition-all duration-300 ${p.border} hover:shadow-2xl hover:-translate-y-1 overflow-hidden`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                <div className="relative">
                  <div className="text-4xl mb-4">{p.icon}</div>
                  <h3 className="text-xl font-bold text-[#e6edf3] mb-2">{p.title}</h3>
                  <p className="text-[#8b949e] text-sm leading-relaxed mb-4">{p.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded-md text-xs font-medium bg-[#0d1117] border border-[#30363d] text-[#8b949e]">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {p.links.map((link) =>
                      link.internal ? (
                        <Link
                          key={link.label}
                          to={link.href}
                          className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                        >
                          {link.label}
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog ──────────────────────────────────────────────────────────── */}
      <section id="blog" className="py-20 relative">
        <div className="absolute inset-0 bg-[#161b22]/40 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e6edf3] mb-4">Latest from the Blog</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-4" />
            <p className="text-[#8b949e] text-lg">
              In-depth tutorials on DevOps, cloud, and software development.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {posts.map((post) => (
              <a
                key={post.title}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-[#30363d] bg-[#161b22] p-6 hover:border-purple-500/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/20">
                    {post.tag}
                  </span>
                  <span className="text-xs text-[#8b949e]">{post.date}</span>
                </div>
                <h3 className="font-bold text-[#e6edf3] mb-2 group-hover:text-purple-300 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-[#8b949e] leading-relaxed">{post.excerpt}</p>
                <div className="mt-4 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                  Read article →
                </div>
              </a>
            ))}
          </div>

          <div className="text-center">
            <a
              href="https://blog.devops-monk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200"
            >
              View All Posts ↗
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact CTA ───────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/10 to-blue-600/10 p-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl font-bold text-[#e6edf3] mb-4">Let's Connect</h2>
              <p className="text-[#8b949e] text-lg mb-8">
                Have a project in mind, a question, or just want to say hi? Find me on the blog or GitHub.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="https://blog.devops-monk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-200 shadow-lg shadow-purple-600/25"
                >
                  Visit Blog ↗
                </a>
                <a
                  href="https://github.com/devops-monk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl border border-[#30363d] text-[#e6edf3] font-semibold hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-200"
                >
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
