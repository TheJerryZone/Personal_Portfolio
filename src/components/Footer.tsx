import { navLinks, profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 py-10" style={{ borderTop: '1px solid var(--border)' }}>
      <div
        className="mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ maxWidth: 1440 }}
      >
        <div>
          <div className="font-display text-sm" style={{ color: 'var(--fg)' }}>
            {profile.name}
          </div>
          <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
            {profile.primaryTitle}
          </div>
        </div>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs" style={{ color: 'var(--muted)' }}>
          {navLinks
            .filter((l) => l.href !== '#skills' && l.href !== '#freelance')
            .map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
        </ul>
      </div>

      <div
        className="mx-auto mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
        style={{ maxWidth: 1440, color: 'var(--muted)' }}
      >
        <span>&copy; 2026 {profile.name}. All rights reserved.</span>
        <span>JERRY &middot; Full-Stack &middot; Design &middot; AI/ML</span>
      </div>
    </footer>
  )
}
