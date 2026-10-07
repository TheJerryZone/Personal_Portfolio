import { motion } from 'framer-motion'

const disciplines = [
  'Full-Stack Development',
  'Machine Learning',
  'Generative AI',
  'REST APIs & Databases',
  'AWS Cloud (Certified)',
  'UI/UX Design',
]

export default function About() {
  return (  
    <section id="about" className="relative px-6 md:px-10 py-24 md:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-1/3 -left-1/4 w-[45vw] h-[45vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.14, filter: 'blur(60px)' }}
      />
      <div className="relative mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10" style={{ maxWidth: 1440 }}>
        <div className="lg:col-span-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-medium leading-[1.05] tracking-tightest text-[8vw] md:text-[3vw]"
            style={{ color: 'var(--fg)' }}
          >
            Building Software
            <br />
            that works
          </motion.h2>
        </div>

        <div className="lg:col-span-6 lg:pt-4">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-base md:text-lg mb-10 max-w-xl"
            style={{ color: 'var(--muted)' }}
          >
            I build practical software solutions across full-stack development, AI/ML, data analytics, and REST APIs. My work includes web applications, backend systems, interactive dashboards, automation, and AI-powered solutions built with modern technologies.
          </motion.p>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-2 gap-x-6 gap-y-3"
          >
            {disciplines.map((d) => (
              <motion.li
                key={d}
                variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                transition={{ duration: 0.5 }}
                className="text-sm py-2"
                style={{ borderBottom: '1px solid var(--border)', color: 'var(--fg)' }}
              >
                {d}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
