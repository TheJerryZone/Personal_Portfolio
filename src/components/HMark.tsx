// A small, reusable brand unit for the professional identity — a monogram +
// status badge, mirroring JerryMark's structure so both identities read as
// equally deliberate brand marks, just in different registers.

export function HMonogram({ size = 40 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-display font-medium shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.42,
        background: 'linear-gradient(155deg, var(--accent), var(--accent-2))',
        color: '#f6f4ef',
      }}
      aria-hidden
    >
      H
    </span>
  )
}

export function HStatusBadge({
  label = 'Available for select projects',
  onDark = false,
}: {
  label?: string
  onDark?: boolean
}) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] tracking-[0.08em] uppercase"
      style={{
        border: `1px solid ${onDark ? 'var(--pro-border)' : 'var(--border)'}`,
        color: onDark ? 'var(--pro-muted)' : 'var(--muted)',
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full h-live-dot" style={{ background: 'var(--accent)' }} />
      {label}
    </span>
  )
}
