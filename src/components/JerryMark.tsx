// A small, reusable brand unit for JERRY — a monogram + live badge, so the
// identity looks like one deliberate brand wherever it appears, rather than
// a UI theme reapplied per-section.

export function JerryMonogram({ size = 40 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-display font-medium shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: 'linear-gradient(155deg, var(--jerry-green), var(--jerry-cyan))',
        color: '#04140d',
      }}
      aria-hidden
    >
      J
    </span>
  )
}

export function JerryLiveBadge({ label = 'Open for freelance work' }: { label?: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] tracking-[0.08em] uppercase"
      style={{ border: '1px solid var(--jerry-border)', color: 'var(--jerry-muted)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full jerry-live-dot" style={{ background: 'var(--jerry-green)' }} />
      {label}
    </span>
  )
}
