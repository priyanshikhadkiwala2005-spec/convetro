import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import Page from '../components/Page'
import { Reveal } from '../components/Anim'
import { ScaleHero } from './About'
import { projects } from '../data/content'

const ease = [0.22, 1, 0.36, 1]

/* Project card — the "VIEW PROJECTS" button follows the cursor inside the card */
export function ProjectCard({ p, i }) {
  const [hover, setHover] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 26 })
  const sy = useSpring(y, { stiffness: 300, damping: 26 })
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - r.left - 60)
    y.set(e.clientY - r.top - 16)
  }

  return (
    <Reveal delay={(i % 2) * 0.12} y={70}>
      <Link
        to={`/project/${p.slug}`}
        className="proj-card ph"
        onMouseMove={move}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img src={p.img} alt={p.title} loading="lazy" className={hover ? 'glitch-base' : ''} />
        {/* RGB-split glitch layers (play once on every hover, like the original) */}
        {hover && (
          <>
            <img src={p.img} alt="" className="glitch-layer gl-r" />
            <img src={p.img} alt="" className="glitch-layer gl-c" />
          </>
        )}
        {/* title is baked into the image like the original; if you use a plain photo, set showTitle: true */}
        {p.showTitle && (
          <motion.div className="proj-title" animate={{ y: hover ? -6 : 0 }} transition={{ duration: 0.5, ease }}>
            {p.title}
          </motion.div>
        )}
        <AnimatePresence>
          {hover && (
            <motion.span
              className="proj-btn"
              style={{ x: sx, y: sy }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
            >
              <span className="btn" style={{ padding: '8px 12px' }}>View projects</span>
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
      <div className="proj-meta"><span>{p.category}</span><span>2025</span></div>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <Page>
      <ScaleHero tag="Our Projects" showRow={false} />
      <section className="section">
        <div className="container proj-grid">
          {projects.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}
        </div>
      </section>
    </Page>
  )
}
