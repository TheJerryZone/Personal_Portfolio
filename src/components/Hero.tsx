import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { jerry, profile } from '../data/portfolio'
import Smoke from './Smoke'
import { JerryLiveBadge, JerryMonogram } from './JerryMark'
import { HMonogram, HStatusBadge } from './HMark'

const identitySteps = [profile.primaryTitle, ...profile.secondaryTitles]
const TOTAL_STEPS = identitySteps.length // steps within the "professional" turn
const TURN_START = 0.4 // scroll progress where the 180° turn begins
const TURN_END = 0.6 // scroll progress where the turn completes
const SWITCH_AT = (TURN_START + TURN_END) / 2 // text swaps as the card is edge-on

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [showJerry, setShowJerry] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [narrow, setNarrow] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setNarrow(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Identity "turn": the card physically flips 180° as the user scrolls
  // through the turn window, revealing JERRY's own brand face on the back.
  const rotateY = useTransform(scrollYProgress, [0, TURN_START, TURN_END, 1], [0, 0, 180, 180])
  const cardScale = useTransform(
    scrollYProgress,
    [0, TURN_START, SWITCH_AT, TURN_END, 1],
    [1, 1, 0.92, 1, 1],
  )
  const heroOpacity = useTransform(scrollYProgress, [0.92, 1], [1, 0.4])

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (p < SWITCH_AT) {
      const local = Math.min(0.999, p / SWITCH_AT)
      setStepIndex(Math.floor(local * TOTAL_STEPS))
      setShowJerry(false)
    } else {
      setShowJerry(true)
    }
  })

  const activeLabel = identitySteps[Math.min(stepIndex, TOTAL_STEPS - 1)]

  return (
    <div id="home" ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <motion.section
        style={{ opacity: heroOpacity }}
        className="sticky top-0 h-screen flex items-center overflow-hidden px-3 sm:px-6 md:px-10"
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: showJerry
              ? 'radial-gradient(120% 90% at 78% 20%, rgba(77,255,176,0.14), transparent 60%)'
              : 'radial-gradient(120% 90% at 78% 20%, rgba(54,84,255,0.12), transparent 60%)',
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <Smoke />

        <div className="relative mx-auto w-full grid grid-cols-12 gap-2 sm:gap-4 lg:gap-6 items-center" style={{ maxWidth: 1440 }}>
          {/* Left — cycling identity / JERRY copy */}
          <div className="col-span-7">
            <AnimatePresence mode="wait">
              {!showJerry ? (
                <motion.div
                  key="identity"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-2xl overflow-hidden signal-grid"
                  style={{
                    background: 'var(--bg-raise)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 30px 80px -30px rgba(14,14,13,0.18)',
                  }}
                >
                  <div className="p-3 sm:p-7 lg:p-9">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                      <HMonogram size={36} />
                      <HStatusBadge />
                    </div>

                    <p className="text-[8px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
                      Hi, I'm Harshith Raje Urs
                    </p>
                    <div className="relative mt-3" style={{ minHeight: '1.3em' }}>
                      <AnimatePresence mode="popLayout">
                        <motion.h1
                          key={activeLabel}
                          initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
                          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, y: -26, filter: 'blur(10px)' }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="font-display font-medium leading-[1.12] tracking-tightest text-[4.4vw] sm:text-[3.6vw] lg:text-[3.4vw]"
                          style={{ color: 'var(--fg)' }}
                        >
                          {activeLabel}
                        </motion.h1>
                      </AnimatePresence>
                    </div>
                    <p className="mt-3 sm:mt-5 max-w-lg text-[10px] leading-snug sm:text-sm lg:text-base" style={{ color: 'var(--muted)' }}>
                      Building full-stack web applications and AI/ML-powered products. AWS Certified Cloud Practitioner.
                    </p>

                    <div className="mt-4 sm:mt-8 flex flex-wrap gap-1 sm:gap-2">
                      {identitySteps.map((s, i) => (
                        <span
                          key={s}
                          className="text-[8px] sm:text-[11px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full transition-colors duration-300"
                          style={{
                            border: `1px solid ${i === stepIndex ? 'var(--accent)' : 'var(--border)'}`,
                            color: i === stepIndex ? 'var(--fg)' : 'var(--muted)',
                            background: i === stepIndex ? 'rgba(54,84,255,0.08)' : 'transparent',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 sm:mt-9 flex flex-wrap items-center gap-2 sm:gap-4">
                      <a
                        href="#projects"
                        data-cursor="link"
                        className="group inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-[9px] sm:text-sm font-medium"
                        style={{ background: 'var(--fg)', color: 'var(--bg)' }}
                      >
                        View my work
                        <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                      </a>
                      <a
                        href="#contact"
                        data-cursor="link"
                        className="group inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-[9px] sm:text-sm font-medium"
                        style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
                      >
                        Let's work together
                        <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">&#8599;</span>
                      </a>
                      <a
                        href={profile.resumeUrl}
                        download
                        data-cursor="link"
                        className="inline-flex items-center gap-2 px-1 py-1 sm:px-2 sm:py-3 text-[9px] sm:text-sm underline underline-offset-4"
                        style={{ color: 'var(--muted)' }}
                      >
                        Download resume &darr;
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="jerry"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-2xl overflow-hidden jerry-grain"
                  style={{
                    background: 'var(--jerry-panel)',
                    border: '1px solid var(--jerry-border)',
                    boxShadow: '0 30px 80px -30px rgba(0,0,0,0.6)',
                  }}
                >
                  <div className="p-3 sm:p-7 lg:p-9">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                      <JerryMonogram size={36} />
                      <JerryLiveBadge />
                    </div>

                    <p className="text-[9px] sm:text-sm" style={{ color: 'var(--jerry-muted)' }}>
                      Also working independently as
                    </p>
                    <h1
                      className="font-display font-medium leading-[1.15] tracking-tightest text-[8vw] sm:text-[5vw] lg:text-[4vw] mt-2"
                      style={{ color: 'var(--jerry-fg)' }}
                    >
                      {jerry.name}
                    </h1>

                    <p className="mt-3 sm:mt-5 max-w-lg text-[10px] leading-snug sm:text-sm lg:text-base" style={{ color: 'var(--jerry-fg)' }}>
                      {jerry.tagline}
                    </p>
                    <p className="mt-2 max-w-lg text-[9px] leading-snug sm:text-sm" style={{ color: 'var(--jerry-muted)' }}>
                      {jerry.statement}
                    </p>

                    <div className="mt-4 sm:mt-8 flex flex-wrap gap-1 sm:gap-2">
                      {jerry.services.map((service) => (
                        <span
                          key={service.title}
                          className="text-[8px] sm:text-[11px] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full"
                          style={{ border: '1px solid var(--jerry-border)', color: 'var(--jerry-fg)' }}
                        >
                          {service.title}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 sm:mt-9 flex flex-wrap items-center gap-2 sm:gap-4">
                      <a
                        href="#freelance"
                        data-cursor="link"
                        className="group inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-[9px] sm:text-sm font-medium"
                        style={{ background: 'var(--jerry-green)', color: '#04140d' }}
                      >
                        Start a project
                        <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">&#8599;</span>
                      </a>
                      <a
                        href="#projects"
                        data-cursor="link"
                        className="group inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-3 rounded-full text-[9px] sm:text-sm font-medium"
                        style={{ border: '1px solid var(--jerry-border)', color: 'var(--jerry-fg)' }}
                      >
                        See the work
                        <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — turntable identity card: a real 180° flip between two
              brand faces. No photo — a bold typographic/abstract treatment
              instead, so the two identities read as distinct brand marks. */}
          <div className="col-span-5 relative" style={{ perspective: 1400 }}>
            <motion.div
              initial={{ clipPath: 'inset(8% 8% 8% 8% round 12px)', opacity: 0 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 12px)', opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="relative w-full h-[62vh] sm:h-[60vh] lg:h-[70vh] rounded-xl overflow-hidden"
              style={{ boxShadow: '0 30px 80px -30px rgba(0,0,0,0.4)' }}
            >
              <motion.div
                style={{
                  rotateY: reduced ? (showJerry ? 180 : 0) : rotateY,
                  scale: reduced ? 1 : cardScale,
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-full h-full"
              >
                {/* Front face — professional identity */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-3 sm:p-8"
                  style={{ backfaceVisibility: 'hidden', background: 'linear-gradient(155deg, var(--pro-panel) 0%, var(--pro-bg) 100%)', border: '1px solid var(--pro-border)' }}
                >
                  <motion.div
                    aria-hidden
                    className="absolute -top-1/4 -right-1/4 w-[70%] aspect-square rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.45, filter: 'blur(50px)' }}
                    animate={reduced ? {} : { x: [0, 20, 0], y: [0, 16, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="relative flex items-center justify-between gap-1 text-[7px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase" style={{ color: 'var(--pro-muted)' }}>
                    <span>Professional mode</span>
                    <span>{profile.location}</span>
                  </div>
                  <div className="relative flex flex-col items-start sm:flex-row sm:items-center gap-2 sm:gap-5">
                    <HMonogram size={narrow ? 36 : 64} />
                    <div>
                      <div
                        className="font-display font-medium leading-none uppercase"
                        style={{ color: 'var(--pro-fg)', fontSize: 'clamp(15px, 4.6vw, 56px)' }}
                      >
                        Harshith
                      </div>
                      <div
                        className="mt-1 sm:mt-2 text-[8px] sm:text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: 'var(--pro-muted)' }}
                      >
                        Raje Urs
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 text-[7px] sm:text-[11px] leading-tight tracking-[0.06em] uppercase"
                      style={{ border: '1px solid var(--pro-border)', color: 'var(--pro-muted)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 h-live-dot" style={{ background: 'var(--accent)' }} />
                      Available for select projects
                    </span>
                  </div>
                </div>

                {/* Back face — freelance identity (JERRY brand) */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-3 sm:p-8 jerry-grain"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'var(--jerry-bg)' }}
                >
                  <motion.div
                    aria-hidden
                    className="absolute -bottom-1/4 -left-1/4 w-[75%] aspect-square rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, var(--jerry-green) 0%, transparent 70%)', opacity: 0.28, filter: 'blur(60px)' }}
                    animate={reduced ? {} : { x: [0, -20, 0], y: [0, -16, 0] }}
                    transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="relative flex items-center justify-between gap-1 text-[7px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.15em] uppercase" style={{ color: 'var(--jerry-muted)' }}>
                    <span>Freelance mode</span>
                    <span>JERRY</span>
                  </div>
                  <div className="relative flex flex-col items-start sm:flex-row sm:items-center gap-2 sm:gap-5">
                    <JerryMonogram size={narrow ? 36 : 64} />
                    <div
                      className="font-display font-medium leading-none"
                      style={{ color: 'var(--jerry-fg)', fontSize: 'clamp(22px, 7.5vw, 84px)' }}
                    >
                      {jerry.name}
                    </div>
                  </div>
                  <div className="relative">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 sm:px-3 sm:py-1.5 text-[7px] sm:text-[11px] leading-tight tracking-[0.06em] uppercase"
                      style={{ border: '1px solid var(--jerry-border)', color: 'var(--jerry-muted)' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0 jerry-live-dot" style={{ background: 'var(--jerry-green)' }} />
                      Open for freelance work
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scrub timeline indicator */}
        <div
          className="absolute bottom-3 sm:bottom-8 left-3 sm:left-6 md:left-10 flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase"
          style={{ color: 'var(--muted)' }}
        >
          Scroll to scrub timeline
          <span className="flex items-center gap-1.5">
            {[...identitySteps, 'jerry'].map((_, i) => {
              const isLast = i === identitySteps.length
              const isActive = isLast ? showJerry : !showJerry && i === stepIndex
              return (
                <span
                  key={i}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? 16 : 5,
                    height: 5,
                    background: isActive ? (isLast ? 'var(--jerry-green)' : 'var(--accent)') : 'var(--border)',
                  }}
                />
              )
            })}
          </span>
        </div>
      </motion.section>
    </div>
  )
}