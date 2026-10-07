import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Blob = {
  color: string
  size: number
  top: string
  left: string
  duration: number
  xRange: number[]
  yRange: number[]
}

const blobs: Blob[] = [
  { color: 'var(--accent)', size: 520, top: '5%', left: '8%', duration: 22, xRange: [0, 60, -20, 0], yRange: [0, 40, 20, 0] },
  { color: 'var(--accent-2)', size: 460, top: '35%', left: '62%', duration: 26, xRange: [0, -50, 30, 0], yRange: [0, 30, -30, 0] },
  { color: 'var(--accent)', size: 380, top: '60%', left: '20%', duration: 30, xRange: [0, 40, -40, 0], yRange: [0, -30, 20, 0] },
  { color: 'var(--accent-2)', size: 340, top: '10%', left: '78%', duration: 24, xRange: [0, -30, 20, 0], yRange: [0, 50, 0, 0] },
]

export default function Smoke() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ filter: 'blur(90px)', opacity: 0.5 }}
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
          }}
          animate={
            reduced
              ? {}
              : {
                  x: b.xRange,
                  y: b.yRange,
                }
          }
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
