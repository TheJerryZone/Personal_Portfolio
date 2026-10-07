import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '../data/portfolio'

const CAPTIONS = [
  'Compiling code, models and design into one profile…',
  'Indexing every shipped project…',
  'Loading AI / ML modules…',
  'Rendering the JERRY identity…',
  'Establishing secure connection…',
]

export default function Loader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0)
  const [captionIndex, setCaptionIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const doneRef = useRef(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      onDone()
      return
    }

    document.documentElement.style.overflow = 'hidden'

    const capTimer = window.setInterval(() => {
      setCaptionIndex((i) => (i + 1) % CAPTIONS.length)
    }, 620)

    const progTimer = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 9 + 4)
        if (next >= 100 && !doneRef.current) {
          doneRef.current = true
          window.clearInterval(capTimer)
          window.clearInterval(progTimer)
          window.setTimeout(() => setLeaving(true), 420)
          window.setTimeout(() => {
            document.documentElement.style.overflow = ''
            onDone()
          }, 1050)
        }
        return next
      })
    }, 150)

    return () => {
      window.clearInterval(capTimer)
      window.clearInterval(progTimer)
      document.documentElement.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 px-6"
          style={{ background: '#0a0a0a' }}
        >
          <div className="flex items-center gap-2.5 text-[11px] tracking-[0.28em] uppercase" style={{ color: 'rgba(237,235,230,0.5)' }}>
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: '#3654FF' }}
              animate={{ opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Initializing system
          </div>

          <h1
            className="font-display font-medium text-center leading-[0.98] tracking-tightest text-[11vw] sm:text-[7vw] md:text-[4.4vw]"
            style={{
              backgroundImage: 'linear-gradient(120deg, #ffffff, #b9c2ff 55%, #3654FF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {profile.name.toUpperCase()}
          </h1>

          <div className="h-4 text-[13px]" style={{ color: 'rgba(237,235,230,0.55)' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={captionIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {progress >= 100 ? 'System ready.' : CAPTIONS[captionIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="w-[min(340px,70vw)] h-[2px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #3654FF, #E8362C)' }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="font-display text-sm tracking-[0.05em]" style={{ color: '#ededed' }}>
              {Math.floor(progress)}%
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgba(237,235,230,0.4)' }}>
              Secure connection
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
