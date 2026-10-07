import { motion } from 'framer-motion'

export default function Intro() {
  return (
    <section id="intro" className="relative px-6 md:px-10 py-28 md:py-40 overflow-hidden" style={{ background: 'var(--bg-raise)' }}>
      <div
        aria-hidden
        className="absolute -bottom-1/3 -left-1/5 w-[38vw] h-[38vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--accent-2) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(70px)' }}
      />
      <div className="relative mx-auto" style={{ maxWidth: 1100 }}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium leading-[1.05] tracking-tightest text-[8vw] md:text-[3.6vw]"
          style={{ color: 'var(--fg)' }}
        >
          I build software solutions across technology, AI and data.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 max-w-2xl text-base md:text-lg"
          style={{ color: 'var(--muted)' }}
        >
        I'm a Software Developer and IT & AI Solutions Specialist focused on full-stack development,
         AI/ML, data analytics, REST APIs, and automation. I build practical, scalable applications 
         that turn business requirements into effective technology solutions.
        </motion.p>
      </div>
    </section>
  )
}
