import { motion } from 'framer-motion'
import { jerry } from '../data/portfolio'
import { JerryLiveBadge, JerryMonogram } from './JerryMark'

const capabilityCount = jerry.services.reduce((sum, s) => sum + s.items.length, 0)

const insights = [
  { label: 'Disciplines', value: String(jerry.services.length).padStart(2, '0') },
  { label: 'Capabilities', value: `${capabilityCount}+` },
  { label: 'Status', value: 'Always-on' },
]

export default function Freelance() {
  return (
    <section
      id="freelance"
      className="relative px-6 md:px-10 py-28 md:py-40 overflow-hidden"
      style={{ background: 'var(--jerry-bg)' }}
    >
      {/* Soft blend zones so this section melts in/out of the surrounding
          scroll-theme instead of cutting to it — you feel the shift in
          mood, not a hard edge between sections. */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-40 md:h-56 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, var(--bg), transparent)' }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-40 md:h-56 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
      />
      <div
        aria-hidden
        className="absolute -top-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--jerry-green) 0%, transparent 70%)', opacity: 0.12, filter: 'blur(80px)' }}
      />

      <div className="relative mx-auto" style={{ maxWidth: 1100 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl overflow-hidden jerry-grain"
          style={{ background: 'var(--jerry-panel)', border: '1px solid var(--jerry-border)', boxShadow: '0 40px 100px -40px rgba(0,0,0,0.65)' }}
        >
          <div className="p-6 sm:p-10 md:p-12">
            <div className="flex items-center gap-3 mb-8">
              <JerryMonogram size={40} />
              <JerryLiveBadge />
            </div>

            <p className="text-sm" style={{ color: 'var(--jerry-muted)' }}>
              Also working independently as
            </p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display font-medium leading-[1.1] tracking-tightest text-[13vw] sm:text-[9vw] lg:text-[5.4vw] mt-2 mb-6"
              style={{ color: 'var(--jerry-fg)' }}
            >
              {jerry.name}
            </motion.h2>

            <p className="text-sm sm:text-base mb-2" style={{ color: 'var(--jerry-fg)' }}>
              {jerry.tagline}
            </p>

            <p className="text-sm sm:text-base max-w-2xl leading-relaxed mb-10" style={{ color: 'var(--jerry-muted)' }}>
              {jerry.intro}
            </p>

            {/* Insights row — computed from the data above, not decoration */}
            <div className="grid grid-cols-3 gap-4 mb-12 max-w-xl">
              {insights.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg px-4 py-3.5"
                  style={{ border: '1px solid var(--jerry-border)', background: 'rgba(255,255,255,0.02)' }}
                >
                  <div className="text-lg sm:text-xl font-medium" style={{ color: 'var(--jerry-green)' }}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.15em] mt-1" style={{ color: 'var(--jerry-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {jerry.services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-lg p-5"
                  style={{ border: '1px solid var(--jerry-border)', background: 'rgba(255,255,255,0.015)' }}
                >
                  <h3 className="font-display text-lg mb-3" style={{ color: 'var(--jerry-fg)' }}>
                    {service.title}
                  </h3>
                  <ul className="space-y-1.5 text-[13px]" style={{ color: 'var(--jerry-muted)' }}>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div
              className="flex flex-wrap items-center justify-between gap-6 pt-8"
              style={{ borderTop: '1px solid var(--jerry-border)' }}
            >
              <span className="text-sm" style={{ color: 'var(--jerry-muted)' }}>
                {jerry.statement}
              </span>
              <a
                href="#contact"
                data-cursor="link"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
                style={{ background: 'var(--jerry-green)', color: '#04140d' }}
              >
                Start a project
                <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5">&#8599;</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
