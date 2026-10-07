import { useEffect, useRef, useState } from 'react'

// Theme stops matching the brief:
// 0–20% light / 20–40% soft gray / 40–60% dark gray / 60–80% near black / 80–100% full dark
const STOPS = [
  { at: 0.0, bg: [246, 244, 239], fg: [14, 14, 13], border: 0.12 },
  { at: 0.2, bg: [226, 223, 214], fg: [17, 17, 16], border: 0.14 },
  { at: 0.4, bg: [96, 94, 90], fg: [246, 245, 242], border: 0.16 },
  { at: 0.6, bg: [34, 33, 32], fg: [240, 239, 236], border: 0.14 },
  { at: 0.8, bg: [10, 10, 10], fg: [237, 235, 230], border: 0.12 },
  { at: 1.0, bg: [8, 8, 8], fg: [237, 235, 230], border: 0.12 },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function colorAt(progress: number) {
  const p = Math.min(1, Math.max(0, progress))
  let lo = STOPS[0]
  let hi = STOPS[STOPS.length - 1]
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (p >= STOPS[i].at && p <= STOPS[i + 1].at) {
      lo = STOPS[i]
      hi = STOPS[i + 1]
      break
    }
  }
  const span = hi.at - lo.at || 1
  const t = (p - lo.at) / span
  const bg = lo.bg.map((c, i) => Math.round(lerp(c, hi.bg[i], t)))
  const fg = lo.fg.map((c, i) => Math.round(lerp(c, hi.fg[i], t)))
  const border = lerp(lo.border, hi.border, t)
  return { bg, fg, border }
}

type ThemeMode = 'scroll' | 'light' | 'dark'

export function useScrollTheme() {
  const [mode, setMode] = useState<ThemeMode>('scroll')
  const [isDarkPhase, setIsDarkPhase] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const stored = window.localStorage.getItem('theme-mode') as ThemeMode | null
    if (stored) {
      setMode(stored)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setMode(prefersDark ? 'dark' : 'scroll')
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    const apply = (progress: number) => {
      const { bg, fg, border } = colorAt(progress)
      root.style.setProperty('--bg', `rgb(${bg[0]} ${bg[1]} ${bg[2]})`)
      root.style.setProperty('--fg', `rgb(${fg[0]} ${fg[1]} ${fg[2]})`)
      root.style.setProperty('--muted', `rgba(${fg[0]}, ${fg[1]}, ${fg[2]}, 0.62)`)
      root.style.setProperty('--border', `rgba(${fg[0]}, ${fg[1]}, ${fg[2]}, ${border})`)
      root.style.setProperty('--bg-raise', `rgba(${fg[0]}, ${fg[1]}, ${fg[2]}, 0.05)`)
      root.style.setProperty('--scroll-mix', String(progress))
      setIsDarkPhase(progress > 0.55)
    }

    const onScroll = () => {
      if (mode !== 'scroll') return
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = doc.scrollHeight - window.innerHeight
        const progress = max > 0 ? window.scrollY / max : 0
        apply(progress)
      })
    }

    if (mode === 'scroll') {
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
    } else {
      apply(mode === 'dark' ? 1 : 0)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [mode])

  const cycleMode = () => {
    setMode((prev) => {
      const next: ThemeMode = prev === 'scroll' ? 'light' : prev === 'light' ? 'dark' : 'scroll'
      window.localStorage.setItem('theme-mode', next)
      return next
    })
  }

  return { mode, cycleMode, isDarkPhase }
}
