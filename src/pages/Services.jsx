import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CircleCheck } from 'lucide-react'
import Page from '../components/Page'
import { Button, Img, Reveal, SplitText, Tag } from '../components/Anim'
import { images, services } from '../data/content'

/* vertical infinite image column */
function Column({ list, reverse, duration = 28 }) {
  const items = [...list, ...list]
  return (
    <motion.div
      className="svc-col"
      animate={{ y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
      transition={{ duration, ease: 'linear', repeat: Infinity }}
    >
      {items.map((src, i) => (
        <div className="media ph" key={i}><img src={src} alt="" loading="lazy" /></div>
      ))}
    </motion.div>
  )
}

/* sticky stacking cards — each one scales down slightly as the next slides over it */
function StackCard({ s, i, total }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - i) * 0.03])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55])
  return (
    <div ref={ref} className="svc-card-wrap" style={{ top: 90 + i * 18 }}>
      <motion.div className="svc-card" style={{ scale, opacity }}>
        <div>
          <h3>{s.title.charAt(0).toUpperCase() + s.title.slice(1)}</h3>
          <p>{s.desc}</p>
          <ul className="checks">
            {s.points.map((p) => <li key={p}><CircleCheck />{p}</li>)}
          </ul>
          <Button to={`/service/${s.slug}`}>View details</Button>
        </div>
        <Img src={s.img} revealScale={false} />
      </motion.div>
    </div>
  )
}

export function ServiceStack() {
  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="container svc-stack">
        {services.map((s, i) => <StackCard key={s.slug} s={s} i={i} total={services.length} />)}
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <Page>
      <div className="container svc-hero">
        <div>
          <Tag>Our Services</Tag>
          <SplitText className="display" text={'Latest\ninsights\non video'} delay={0.4} />
          <Reveal delay={0.8}>
            <p className="lead">Actionable insights on how performance-driven video supports advertising, funnels, and business growth.</p>
            <Button to="/contact">Book a service</Button>
          </Reveal>
        </div>
        <motion.div
          className="svc-cols"
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Column list={images.servicesCol1} />
          <Column list={images.servicesCol2} reverse duration={32} />
        </motion.div>
      </div>
      <ServiceStack />
    </Page>
  )
}
