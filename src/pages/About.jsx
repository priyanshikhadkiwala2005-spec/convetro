import { useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { Hexagon, Triangle, CircleDashed, RefreshCw, Rss } from 'lucide-react'
import Page from '../components/Page'
import { Counter, Img, Reveal, SplitText, Tag } from '../components/Anim'
import { awards, faqs, images, logos, metrics, team } from '../data/content'

const ease = [0.22, 1, 0.36, 1]
const logoIcons = [RefreshCw, Triangle, CircleDashed, Hexagon, Rss]

/* ── Hero ─────────────────────────── */
export function ScaleHero({ tag = 'About Us', showRow = true }) {
  return (
    <section className="hero">
      <div className="container">
        <Tag>{tag}</Tag>
        <SplitText className="display" text={'We scale your\nbusiness'} delay={0.4} />
        <Reveal delay={0.8}>
          <p className="lead">Converto is a marketing-focused video agency helping brands grow through performance-driven video.</p>
        </Reveal>
        {showRow && (
          <div className="hero-row">
            {images.heroRow.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 120, rotate: i === 1 ? 0 : i === 0 ? -6 : 6 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 1.3, delay: 0.9 + i * 0.12, ease }}
              >
                <Img src={src} revealScale={false} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ── Logo marquee ─────────────────────────── */
function Logos() {
  const list = [...logos, ...logos]
  return (
    <section className="section" style={{ paddingBottom: 60 }}>
      <Reveal><p className="logos-title">We Working With</p></Reveal>
      <div className="marquee">
        <motion.div className="marquee-track" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, ease: 'linear', repeat: Infinity }}>
          {list.map((name, i) => {
            const Icon = logoIcons[i % logoIcons.length]
            return (
              <div className="logo-card" key={i}>
                <img src={images.logoHover[i % images.logoHover.length]} alt="" loading="lazy" />
                <Icon size={20} strokeWidth={2.6} />
                <span>{name}</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ── Mission & Vision ─────────────────────────── */
function Mission() {
  return (
    <section className="section">
      <div className="container mission-grid">
        <div className="mission-left">
          <Tag>Mission &amp; Vision</Tag>
          <SplitText as="h2" className="display sm" text={'The vision\nwe follow'} />
          <div className="mission-cards">
            <Reveal className="info-card" delay={0.1}>
              <h4>Our Mission</h4>
              <p>Our mission is to create video content that aligns with funnels, advertising platforms, and growth goals — so brands can scale with clarity and confidence.</p>
            </Reveal>
            <Reveal className="info-card" delay={0.2}>
              <h4>Our Vision</h4>
              <p>To become the trusted video partner for growth-focused brands by setting the standard for marketing-first video content.</p>
            </Reveal>
          </div>
        </div>
        <Img src={images.mission} className="mission-img" parallax={8} />
      </div>
    </section>
  )
}

/* ── Our story ─────────────────────────── */
function Story() {
  return (
    <section className="section">
      <div className="container story-grid">
        <Img src={images.storyA} className="story-img-a" parallax={8} />
        <div>
          <Tag>Our Story</Tag>
          <SplitText as="h2" className="display sm" text="How started" />
          <Reveal delay={0.2}>
            <p className="lead">We're not a traditional production studio. We operate as a strategic partner that understands marketing goals, advertising platforms, and conversion principles.</p>
          </Reveal>
          <Img src={images.storyB} className="story-img-b" parallax={8} />
        </div>
      </div>
    </section>
  )
}

/* ── Team ─────────────────────────── */
function Team() {
  return (
    <section className="section">
      <div className="container">
        <Tag>The Professionals</Tag>
        <SplitText as="h2" className="display sm" text="Meet the experts" />
        <div className="team-grid">
          {team.map((m, i) => (
            <Reveal key={m.name} className="member" delay={i * 0.1} y={80}>
              <Img src={m.img} revealScale={false} />
              <h5>{m.name}</h5>
              <p>{m.role}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Metrics ─────────────────────────── */
function Metrics() {
  return (
    <section className="section">
      <div className="container metrics-grid">
        <div className="metrics-left">
          <Tag>Key Metrics</Tag>
          <Img src={images.metrics} className="metrics-img" parallax={6} />
        </div>
        <div>
          <SplitText as="h2" className="display sm" text={'Impact by\nthe numbers'} />
          <div style={{ marginTop: 40 }}>
            {metrics.map((m, i) => (
              <Reveal key={i} className="metric" delay={i * 0.08}>
                <div className="metric-num"><Counter value={m.value} decimals={m.decimals} suffix={m.suffix} /></div>
                <p>{m.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Awards (image follows cursor on hover) ─────────────────────────── */
function Awards() {
  const [active, setActive] = useState(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 22 })
  const sy = useSpring(y, { stiffness: 220, damping: 22 })
  const move = (e) => { x.set(e.clientX - 55); y.set(e.clientY - 70) }

  return (
    <section className="section">
      <div className="container">
        <Reveal className="awards-box" y={60}>
          <div className="center">
            <Tag>Awards &amp; Recognition</Tag>
            <SplitText as="h2" className="display sm" text={'Awards & industry\nrecognition'} />
          </div>
          <div className="awards-list" onMouseMove={move} onMouseLeave={() => setActive(null)}>
            {awards.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08} y={20}>
                <div className="award-row" onMouseEnter={() => setActive(i)} data-hover>
                  <h3>{a.title}</h3>
                  <span>{a.meta}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="award-float ph"
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 8 }}
            transition={{ duration: 0.35, ease }}
          >
            <AnimatePresence mode="popLayout">
              <motion.img
                key={active}
                src={awards[active].img}
                alt=""
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }}
                transition={{ duration: 0.45, ease }}
              />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ── FAQ ─────────────────────────── */
export function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section">
      <div className="container">
        <div className="center">
          <Tag>FAQ's</Tag>
          <SplitText as="h2" className="display sm" text="Quick answers" />
        </div>
        <div className="faq-grid">
          <Img src={images.faq} className="faq-img" />
          <div className="faq-list">
            {faqs.map((f, i) => (
              <Reveal key={i} delay={i * 0.06} y={24} className={`faq-item ${open === i ? 'open' : ''}`}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  {f.q}
                  <span className="ic">
                    <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1.5" /></svg>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <p className="faq-a">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <Page>
      <ScaleHero />
      <Logos />
      <Mission />
      <Story />
      <Team />
      <Metrics />
      <Awards />
      <FAQ />
    </Page>
  )
}
