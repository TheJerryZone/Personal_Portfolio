import { motion } from 'framer-motion'
import { profile, socialLinks } from '../data/portfolio'

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10 py-28 md:py-44">
      <div className="mx-auto text-center" style={{ maxWidth: 900 }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.2em] uppercase mb-6"
          style={{ color: 'var(--accent)' }}
        >
          Have an idea?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-medium leading-[1] tracking-tightest text-[11vw] md:text-[5.5vw] mb-8"
          style={{ color: 'var(--fg)' }}
        >
          Let's build something
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-12"
          style={{ color: 'var(--muted)' }}
        >
          Whether you need a web application, AI-powered solution, REST API, data dashboard, or cloud-ready application, let's connect and build something useful.
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            data-cursor="link"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium"
            style={{ background: 'var(--fg)', color: 'var(--bg)' }}
          >
            Email me &#8599;
          </a>
          <a
            href="#contact"
            onClick={(e) => e.preventDefault()}
            data-cursor="link"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium"
            style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
          >
            Start a project &#8599;
          </a>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 text-sm">
          <a href={socialLinks.linkedin} data-cursor="link" className="underline underline-offset-4" style={{ color: 'var(--muted)' }}>
            LinkedIn
          </a>
          <a href={socialLinks.github} data-cursor="link" className="underline underline-offset-4" style={{ color: 'var(--muted)' }}>
            GitHub
          </a>
          <span style={{ color: 'var(--muted)' }}>{profile.email}</span>
        </div>
      </div>
    </section>
  )
}
