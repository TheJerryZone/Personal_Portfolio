import { motion } from 'framer-motion'
import { skillsData } from '../data/portfolio'
import { colorAt } from '../lib/palette'

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 md:px-10 py-24 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute top-1/3 -left-1/4 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(70px)' }}
      />
      <div className="relative mx-auto" style={{ maxWidth: 1200 }}>
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-4xl"
            style={{ color: 'var(--fg)' }}
          >
            Tools I work with
          </motion.h2>
          <p className="text-sm max-w-xs" style={{ color: 'var(--muted)' }}>
            Seven areas, one working toolkit - grouped the way I actually reach for them.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.map((group, gi) => {
            const c = colorAt(gi)
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.5, delay: gi * 0.06 }}
                whileHover={{ y: -4 }}
                className="relative rounded-2xl p-6 flex flex-col"
                style={{ border: '1px solid var(--border)', background: 'var(--bg-raise)' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="w-2 h-2 rounded-full" style={{ background: c }} />
                  <span className="text-xs" style={{ color: 'var(--muted)' }}>
                    {String(gi + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-lg mb-4" style={{ color: 'var(--fg)' }}>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-[12px] px-3 py-1.5 rounded-full"
                      style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
