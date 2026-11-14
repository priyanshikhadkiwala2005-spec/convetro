import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, SplitText } from './Anim'
import { images } from '../data/content'

const ease = [0.22, 1, 0.36, 1]

/**
 * "Ready to turn video into a growth channel?" block.
 * Moving the mouse over it leaves a trail of images (cursor image trail).
 */
export default function CTA() {
  const ref = useRef(null)
  const last = useRef({ x: 0, y: 0 })
  const idx = useRef(0)
  const [trail, setTrail] = useState([])

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    const dx = x - last.current.x
    const dy = y - last.current.y
    if (Math.hypot(dx, dy) < 110) return
    last.current = { x, y }
    const id = Date.now() + Math.random()
    const src = images.ctaTrail[idx.current++ % images.ctaTrail.length]
    const rot = (Math.random() - 0.5) * 14
    setTrail((t) => [...t.slice(-6), { id, x, y, src, rot }])
    setTimeout(() => setTrail((t) => t.filter((i) => i.id !== id)), 1100)
  }

  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="container">
        <motion.div
          ref={ref}
          className="cta"
          onMouseMove={onMove}
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease }}
        >
          <motion.div className="cta-float ph" style={{ left: '3%', top: '28%', height: 200 }}
            animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <img src={images.ctaTrail[0]} alt="" />
          </motion.div>
          <motion.div className="cta-float ph" style={{ right: '3%', top: '18%', height: 170 }}
            animate={{ y: [0, 16, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
            <img src={images.ctaTrail[1]} alt="" />
          </motion.div>

          <AnimatePresence>
            {trail.map((t) => (
              <motion.div
                key={t.id}
                className="trail-img ph"
                style={{ left: t.x - 75, top: t.y - 95 }}
                initial={{ opacity: 0, scale: 0.4, rotate: t.rot }}
                animate={{ opacity: 1, scale: 1, rotate: t.rot / 2 }}
                exit={{ opacity: 0, scale: 0.8, filter: 'blur(6px)' }}
                transition={{ duration: 0.5, ease }}
              >
                <img src={t.src} alt="" />
              </motion.div>
            ))}
          </AnimatePresence>

          <SplitText as="h2" className="display sm" text={'Ready to turn\nvideo into a\ngrowth channel?'} />
          <Button to="/contact">Book a call</Button>
        </motion.div>
      </div>
    </section>
  )
}
