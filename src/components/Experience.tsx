import { motion } from 'framer-motion'
import { experienceData } from '../data/portfolio'
import { colorAt } from '../lib/palette'

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 md:px-10 py-24 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-0 -right-1/4 w-[42vw] h-[42vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent-2) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(70px)' }}
      />
      <div className="relative mx-auto" style={{ maxWidth: 1000 }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-4xl mb-16"
          style={{ color: 'var(--fg)' }}
        >
          Experience
        </motion.h2>

        <div className="relative pl-8 md:pl-12" style={{ borderLeft: '1px solid var(--border)' }}>
          {experienceData.map((job, i) => {
            const c = colorAt(i)
            return (
            <motion.div
              key={job.role + job.org}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.6, delay: 0.05 * i }}
              className="relative pb-16 last:pb-0"
            >
              <span
                className="absolute -left-[38px] md:-left-[54px] top-1.5 w-2.5 h-2.5 rounded-full"
                style={{ background: c }}
              />
              <div className="text-xs tracking-[0.15em] uppercase mb-2" style={{ color: c }}>
                {job.period}
              </div>
              <h3 className="font-display text-xl md:text-2xl mb-1" style={{ color: 'var(--fg)' }}>
                {job.role}
              </h3>
              <div className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                {job.org}
              </div>
              <ul className="space-y-2 max-w-2xl">
                {job.points.map((point) => (
                  <li key={point} className="text-sm leading-relaxed flex gap-3" style={{ color: 'var(--fg)' }}>
                    <span style={{ color: 'var(--muted)' }}>—</span>
                    {point}
                  </li>
                ))}
              </ul>
              {job.projects && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {job.projects.map((p) => (
                    <span
                      key={p}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
