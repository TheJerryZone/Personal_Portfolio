import { useState } from 'react'
import { motion } from 'framer-motion'
import { pillars } from '../data/portfolio'

export default function Pillars() {
  const [activeId, setActiveId] = useState(pillars[0].id)

  return (
    <section className="relative px-6 md:px-10 py-16 md:py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none translate-x-1/3"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(70px)' }}
      />
      <div className="relative mx-auto" style={{ maxWidth: 1440 }}>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <h3 className="font-display text-2xl md:text-3xl" style={{ color: 'var(--fg)' }}>
            What I do
          </h3>
          <p className="text-sm max-w-xs" style={{ color: 'var(--muted)' }}>
            Six disciplines, one working process - hover or tap to open each.
          </p>
        </div>

        <div className="hidden md:flex h-[440px] rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {pillars.map((p, pi) => {
            const isActive = activeId === p.id
            const c = pi % 2 === 0 ? 'var(--accent)' : 'var(--accent-2)'
            return (
              <motion.div
                key={p.id}
                onMouseEnter={() => setActiveId(p.id)}
                onFocus={() => setActiveId(p.id)}
                tabIndex={0}
                data-cursor="link"
                animate={{ flex: isActive ? 3.4 : 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col justify-between p-8 cursor-pointer overflow-hidden"
                style={{
                  borderRight: '1px solid var(--border)',
                  background: isActive ? 'var(--bg-raise)' : 'transparent',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.15em]" style={{ color: 'var(--muted)' }}>
                    {p.index}
                  </span>
                  <span
                    className="text-xs tracking-[0.15em] uppercase"
                    style={{ color: isActive ? c : 'var(--muted)', writingMode: isActive ? 'horizontal-tb' : 'vertical-rl' }}
                  >
                    {!isActive && p.title}
                  </span>
                </div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="flex flex-col min-h-0 flex-1"
                  >
                    <h4 className="font-display text-2xl lg:text-3xl mb-3 shrink-0" style={{ color: 'var(--fg)' }}>
                      {p.title}
                    </h4>
                    <p className="text-sm mb-6 max-w-sm shrink-0" style={{ color: 'var(--muted)' }}>
                      {p.summary}
                    </p>
                    <div className="overflow-y-auto thin-scroll pr-2 -mr-2 flex-1 min-h-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.items.map((item) => (
                          <span
                            key={item}
                            className="text-[12px] px-3 py-1.5 rounded-full flex items-center gap-1.5"
                            style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
                          >
                            <span className="w-1 h-1 rounded-full shrink-0" style={{ background: c }} />
                            {item}
                          </span>
                        ))}
                      </div>
                      {p.stack && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {p.stack.map((s) => (
                            <span
                              key={s}
                              className="text-[11px] px-2.5 py-1 rounded-full"
                              style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Mobile: accordion */}
        <div className="md:hidden flex flex-col" style={{ border: '1px solid var(--border)', borderRadius: 16 }}>
          {pillars.map((p, i) => {
            const isActive = activeId === p.id
            return (
              <div key={p.id} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}>
                <button
                  onClick={() => setActiveId(isActive ? '' : p.id)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={isActive}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>{p.index}</span>
                    <span className="font-display text-lg" style={{ color: 'var(--fg)' }}>{p.title}</span>
                  </span>
                  <span style={{ color: 'var(--accent)' }}>{isActive ? '−' : '+'}</span>
                </button>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 overflow-hidden"
                  >
                    <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>{p.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.items.map((item) => (
                        <span
                          key={item}
                          className="text-[12px] px-3 py-1.5 rounded-full"
                          style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
