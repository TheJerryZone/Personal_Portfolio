import { useState } from 'react'
import { motion } from 'framer-motion'
import { projectsData } from '../data/portfolio'
import { colorAt } from '../lib/palette'
import ProjectDetail from './ProjectDetail'

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = projectsData.find((p) => p.id === openId) ?? null

  return (
    <section id="projects" className="px-6 md:px-10 py-24 md:py-36">
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <h2 className="font-display text-3xl md:text-4xl" style={{ color: 'var(--fg)' }}>
            Selected work
          </h2>
          <p className="text-sm max-w-xs" style={{ color: 'var(--muted)' }}>
            Open any project for the full case study - problem, solution and outcome.
          </p>
        </div>

        <div className="flex flex-col">
          {projectsData.map((project, i) => {
            const c = colorAt(i)
            return (
              <div key={project.id} style={{ borderTop: i === 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)' }}>
                <motion.button
                  onClick={() => setOpenId(project.id)}
                  data-cursor="view"
                  className="w-full grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-6 py-8 text-left group"
                >
                  <span className="md:col-span-1 text-xs" style={{ color: 'var(--muted)' }}>
                    {project.number}
                  </span>

                  <span className="md:col-span-5 flex items-center gap-4">
                    <motion.div
                      className="w-16 h-12 rounded-md shrink-0 hidden sm:block"
                      style={{
                        background: `linear-gradient(135deg, ${c}, transparent)`,
                        opacity: 0.85,
                      }}
                      whileHover={{ scale: 1.06 }}
                    />
                    <motion.h3
                      className="font-display text-xl md:text-2xl"
                      style={{ color: 'var(--fg)' }}
                      whileHover={{ x: 6 }}
                      transition={{ duration: 0.25 }}
                    >
                      {project.name}
                    </motion.h3>
                  </span>

                  <span className="md:col-span-4 text-sm" style={{ color: 'var(--muted)' }}>
                    {project.category}
                  </span>

                  <span className="md:col-span-2 flex items-center justify-end gap-2 text-sm" style={{ color: 'var(--fg)' }}>
                    Case study
                    <motion.span whileHover={{ rotate: 45 }} transition={{ duration: 0.25 }}>
                      &#8599;
                    </motion.span>
                  </span>
                </motion.button>
              </div>
            )
          })}
        </div>
      </div>

      <ProjectDetail project={openProject} onClose={() => setOpenId(null)} />
    </section>
  )
}
