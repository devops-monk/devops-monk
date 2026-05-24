import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-[#30363d] bg-[#161b22]/60 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="font-bold text-[#e6edf3]">DevOps-Monk</span>
            <span className="text-[#8b949e] text-sm ml-1">by Abhay Pratap Singh</span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <Link to="/" className="text-[#8b949e] hover:text-[#e6edf3] transition-colors">
              Home
            </Link>
            <Link to="/snapmonk" className="text-[#8b949e] hover:text-[#e6edf3] transition-colors">
              SnapMonk
            </Link>
            <a
              href="https://blog.devops-monk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b949e] hover:text-[#e6edf3] transition-colors"
            >
              Blog ↗
            </a>
            <a
              href="https://github.com/devops-monk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8b949e] hover:text-[#e6edf3] transition-colors"
            >
              GitHub ↗
            </a>
            <Link to="/privacy" className="text-[#8b949e] hover:text-[#e6edf3] transition-colors">
              Privacy Policy
            </Link>
          </nav>

          <p className="text-[#8b949e] text-sm">
            © {new Date().getFullYear()} DevOps-Monk
          </p>
        </div>
      </div>
    </footer>
  )
}
