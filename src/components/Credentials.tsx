import { motion } from 'framer-motion'
import { certifications, educationData, research } from '../data/portfolio'

export default function Credentials() {
  return (
    <section className="relative px-6 md:px-10 py-24 md:py-32 overflow-hidden" style={{ background: 'var(--bg-raise)' }}>
      <div
        aria-hidden
        className="absolute -top-1/4 left-1/3 w-[36vw] h-[36vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.09, filter: 'blur(70px)' }}
      />
      <div className="relative mx-auto grid grid-cols-1 md:grid-cols-5 gap-14" style={{ maxWidth: 1100 }}>
        <div className="md:col-span-2">
          <h3 className="text-xs tracking-[0.15em] uppercase mb-6" style={{ color: 'var(--accent)' }}>
            Education
          </h3>
          <div className="space-y-6">
            {educationData.map((edu) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="font-display text-lg" style={{ color: 'var(--fg)' }}>
                  {edu.degree}
                </div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>
                  {edu.school}
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                  {edu.period} &middot; {edu.detail}
                </div>
              </motion.div>
            ))}
          </div>

          <h3 className="text-xs tracking-[0.15em] uppercase mt-12 mb-6" style={{ color: 'var(--accent-2)' }}>
            Certification
          </h3>
          <div className="space-y-6">
            {certifications.map((c) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="font-display text-lg" style={{ color: 'var(--fg)' }}>
                  {c.name}
                </div>
                <div className="text-sm" style={{ color: 'var(--muted)' }}>
                  {c.issuer}
                </div>
                <div className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                  {c.detail}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs tracking-[0.15em] uppercase mb-6" style={{ color: 'var(--accent-2)' }}>
            Research
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-xl"
            style={{ border: '1px solid var(--border)' }}
          >
            <div className="font-display text-lg leading-snug mb-3" style={{ color: 'var(--fg)' }}>
              {research.title}
            </div>
            <p className="text-sm mb-5" style={{ color: 'var(--muted)' }}>
              {research.description}
            </p>
            <a href={research.link} data-cursor="link" className="text-sm underline underline-offset-4" style={{ color: 'var(--fg)' }}>
              View paper &rarr;
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
