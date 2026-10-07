import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, profile } from '../data/portfolio'

type ThemeMode = 'scroll' | 'light' | 'dark'

export default function Navbar({ mode, cycleMode }: { mode: ThemeMode; cycleMode: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const modeIcon = mode === 'dark' ? '\u263E' : mode === 'light' ? '\u2600' : '\u25D0'
  const modeLabel = mode === 'dark' ? 'Dark' : mode === 'light' ? 'Light' : 'Auto'

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          background: scrolled ? 'color-mix(in srgb, var(--bg) 72%, transparent)' : 'transparent',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        }}
      >
        <nav
          className="mx-auto flex items-center justify-between px-6 md:px-10 transition-all duration-500"
          style={{ height: scrolled ? 64 : 84, maxWidth: 1440 }}
        >
          <a href="#home" className="font-display text-lg tracking-tight" style={{ color: 'var(--fg)' }} data-cursor="link">
            HARSHITH<span style={{ color: 'var(--accent)' }}>.</span>
          </a>

          <ul className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'var(--muted)' }}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor="link"
                  className="relative py-1 transition-colors"
                  style={{ color: active === link.href ? 'var(--fg)' : 'var(--muted)' }}
                >
                  {link.label}
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={cycleMode}
              data-cursor="link"
              aria-label={`Theme: ${modeLabel}. Click to change.`}
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm transition-colors"
              style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
            >
              {modeIcon}
            </button>
            <a
              href={profile.resumeUrl}
              download
              data-cursor="link"
              className="hidden sm:inline-flex items-center gap-2 text-xs tracking-wide px-4 py-2 rounded-full transition-colors"
              style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
            >
              Resume
            </a>
            <button
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              data-cursor="link"
            >
              <span className="block w-5 h-px" style={{ background: 'var(--fg)' }} />
              <span className="block w-5 h-px" style={{ background: 'var(--fg)' }} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-[60] flex flex-col justify-between p-8"
            style={{ background: 'var(--bg)', color: 'var(--fg)' }}
          >
            <div className="flex justify-between items-center">
              <span className="font-display text-lg">HARSHITH.</span>
              <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="text-2xl leading-none">
                &times;
              </button>
            </div>
            <ul className="flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-4xl tracking-tight"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="text-xs tracking-wide" style={{ color: 'var(--muted)' }}>
              {profile.email}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
