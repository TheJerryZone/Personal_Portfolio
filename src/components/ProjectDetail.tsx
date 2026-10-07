import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projectsData } from '../data/portfolio'
import { colorAt } from '../lib/palette'

type Project = (typeof projectsData)[number]

function Field({ label, children, color }: { label: string; children: ReactNode; color: string }) {
  return (
    <div className="mb-7">
      <div className="text-[11px] tracking-[0.2em] uppercase mb-2.5" style={{ color }}>
        {label}
      </div>
      {children}
    </div>
  )
}

export default function ProjectDetail({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const isOpen = !!project
  const index = project ? projectsData.findIndex((p) => p.id === project.id) : 0
  const c = colorAt(index)

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[80]"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(3px)' }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} project details`}
            className="fixed top-0 right-0 bottom-0 z-[90] w-full sm:w-[min(560px,92vw)] overflow-y-auto px-7 sm:px-10 py-10 sm:py-12"
            style={{ background: 'var(--bg)', color: 'var(--fg)', borderLeft: '1px solid var(--border)' }}
          >
            <div className="flex items-start justify-between mb-8">
              <div className="text-[11px] tracking-[0.2em] uppercase" style={{ color: c }}>
                {project.number} &mdash; {project.category}
              </div>
              <button
                onClick={onClose}
                aria-label="Close project details"
                data-cursor="link"
                className="w-9 h-9 rounded-full flex items-center justify-center text-base shrink-0 -mt-1 -mr-1"
                style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
              >
                &times;
              </button>
            </div>

            <h3 className="font-display text-3xl sm:text-4xl mb-6" style={{ color: 'var(--fg)' }}>
              {project.name}
            </h3>

            <div className="flex flex-wrap gap-2 mb-9">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-3 py-1.5 rounded-full"
                  style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                >
                  {t}
                </span>
              ))}
            </div>

            <Field label="Overview" color={c}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
                {project.overview}
              </p>
            </Field>

            <Field label="Problem" color={c}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
                {project.problem}
              </p>
            </Field>

            <Field label="Solution" color={c}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
                {project.solution}
              </p>
            </Field>

            <Field label="My role" color={c}>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
                {project.role}
              </p>
            </Field>

            <Field label="Key features" color={c}>
              <ul className="space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="text-sm leading-relaxed flex gap-3" style={{ color: 'var(--fg)' }}>
                    <span style={{ color: 'var(--muted)' }}>&mdash;</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Field>

            <div className="rounded-xl p-5 mb-6" style={{ background: 'var(--bg-raise)', border: '1px solid var(--border)' }}>
              <div className="text-[11px] tracking-[0.2em] uppercase mb-2.5" style={{ color: c }}>
                Outcome
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--fg)' }}>
                {project.outcome}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm mt-8">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                  data-cursor="link"
                  style={{ color: c }}
                >
                  Live site &rarr;
                </a>
              )}
              {project.links.github ? (
                <a href={project.links.github} className="underline underline-offset-4" data-cursor="link">
                  GitHub &rarr;
                </a>
              ) : (
                !project.links.live && <span style={{ color: 'var(--muted)' }}>GitHub link coming soon</span>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
