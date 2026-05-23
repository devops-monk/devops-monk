import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navLinkClass = (path: string) => {
    const active = location.hash.replace('#', '') === path ||
      (path === '/' && (location.hash === '' || location.hash === '#/')) ||
      location.hash === `#${path}`
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      active
        ? 'text-[#7c3aed] bg-[#7c3aed]/10'
        : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22]'
    }`
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[#30363d]"
      style={{
        background: 'rgba(13, 17, 23, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)'
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl">⚡</span>
            <span className="font-bold text-lg text-[#e6edf3] group-hover:text-[#7c3aed] transition-colors duration-200">
              DevOps-Monk
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/" className={navLinkClass('/')}>Home</Link>
            <Link to="/snapmonk" className={navLinkClass('/snapmonk')}>SnapMonk</Link>
            <a
              href="https://blog.devops-monk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md text-sm font-medium text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22] transition-colors duration-200"
            >
              Blog ↗
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-[#30363d] mt-2 pt-4 flex flex-col gap-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-sm font-medium text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/snapmonk"
              className="block px-3 py-2 rounded-md text-sm font-medium text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              SnapMonk
            </Link>
            <a
              href="https://blog.devops-monk.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-sm font-medium text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Blog ↗
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
