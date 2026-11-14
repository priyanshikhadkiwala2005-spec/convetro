import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, CircleCheck, Pause, Play, X } from 'lucide-react'
import Page from '../components/Page'
import { Button, Reveal, SplitText, Tag } from '../components/Anim'
import { ServiceStack } from './Services'
import { ProjectCard } from './Projects'
import { PostCard } from './Blog'
import { FAQ } from './About'
import { homeBlogs, images, plans, projects, steps, testimonials } from '../data/content'

const ease = [0.22, 1, 0.36, 1]

/* ─────────────────────────────────────────────────────────────
   1. HERO — heading + 3D cylinder carousel that rotates on scroll
   ───────────────────────────────────────────────────────────── */
function Hero() {
  const sec = useRef(null)
  const cards = useRef([])
  const { scrollYProgress } = useScroll({ target: sec, offset: ['start start', 'end end'] })
  const headY = useTransform(scrollYProgress, [0, 0.3], ['0vh', '-55vh'])
  const headO = useTransform(scrollYProgress, [0.05, 0.28], [1, 0])
  const ringY = useTransform(scrollYProgress, [0, 0.3], ['26vh', '0vh'])
  const list = [...images.carousel, ...images.carousel].slice(0, 12)

  useEffect(() => {
    let raf, mouse = 0, cur = 0, t0 = performance.now()
    const onMove = (e) => { mouse = e.clientX / window.innerWidth - 0.5 }
    const loop = (now) => {
      const W = window.innerWidth
      const mobile = W < 700
      const cardW = mobile ? W * 0.62 : Math.min(W * 0.27, 560)
      const R = cardW * (mobile ? 1.5 : 2.05)
      const P = R * 1.5
      const step = 360 / list.length
      const drift = ((now - t0) / 1000) * 1.2            // slow idle spin
      const target = -scrollYProgress.get() * 150 - drift + mouse * 10
      cur += (target - cur) * 0.08
      cards.current.forEach((el, i) => {
        if (!el) return
        let a = i * step + cur
        a = ((((a + 180) % 360) + 360) % 360) - 180
        const vis = Math.abs(a) < 62
        el.style.visibility = vis ? 'visible' : 'hidden'
        el.style.width = cardW + 'px'
        el.style.height = cardW * 0.75 + 'px'
        el.style.transform = `translate(-50%, -50%) translateZ(${P}px) rotateY(${a}deg) translateZ(${-R}px)`
        el.style.opacity = vis ? Math.min(1, (62 - Math.abs(a)) / 14) : 0
      })
      if (cards.current[0]?.parentElement) cards.current[0].parentElement.style.perspective = P + 'px'
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove) }
  }, [scrollYProgress, list.length])

  return (
    <section ref={sec} className="home-hero">
      <div className="home-hero-sticky">
        <motion.div className="home-hero-head container" style={{ y: headY, opacity: headO }}>
          <Tag>Video Marketing Agency</Tag>
          <SplitText className="display" text={'Video that\ndrives growth'} delay={0.4} />
          <Reveal delay={0.8}>
            <p className="lead">We create strategic marketing videos for ads, landing pages, and product launches designed to increase clicks and sales.</p>
          </Reveal>
        </motion.div>
        <motion.div
          className="ring-stage"
          style={{ y: ringY }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.7, ease }}
        >
          {list.map((src, i) => (
            <div key={i} className="ring-card ph" ref={(el) => (cards.current[i] = el)}>
              <img src={src} alt="" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   2. WHO WE ARE — words light up while scrolling
   ───────────────────────────────────────────────────────────── */
function Word({ children, progress, range }) {
  const o = useTransform(progress, range, [0.18, 1])
  return <motion.span style={{ opacity: o }}>{children} </motion.span>
}

function WhoWeAre() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'start 25%'] })
  const text = "Every video we produce is built around a specific marketing goal—whether that's increasing click-through rates, improving conversion on a landing page, or scaling paid ad performance."
  const words = text.split(' ')
  return (
    <section className="section who" ref={ref}>
      <div className="container center">
        <Tag>Who We Are</Tag>
        <p className="who-text">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
          ))}
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   3. PLAY REEL — image grows into a big player while scrolling
   ───────────────────────────────────────────────────────────── */
function PlayReel() {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // grow from a small thumbnail to a big player (numbers so it interpolates smoothly)
  const k = useTransform(scrollYProgress, [0, 0.7], [0, 1], { clamp: true })
  const w = useTransform(k, (v) => {
    const W = window.innerWidth, a = Math.min(220, Math.max(150, W * 0.15)), b = Math.min(W * 0.88, 1180)
    return a + (b - a) * v
  })
  const h = useTransform(k, (v) => {
    const W = window.innerWidth, H = window.innerHeight, a = Math.min(130, Math.max(95, W * 0.09)), b = Math.min(H * 0.7, 640)
    return a + (b - a) * v
  })
  const r = useTransform(scrollYProgress, [0, 0.7], [6, 18])
  const lx = useTransform(scrollYProgress, [0, 0.5], ['0vw', '-30vw'])
  const rx = useTransform(scrollYProgress, [0, 0.5], ['0vw', '30vw'])
  const to = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const rot = useTransform(scrollYProgress, [0, 1], [0, 140])

  return (
    <section ref={ref} className="reel-sec">
      <div className="reel-sticky">
        <motion.svg className="reel-ring" viewBox="0 0 400 400" style={{ rotate: rot }}>
          <circle cx="200" cy="200" r="190" fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="2" strokeDasharray="2 10" />
        </motion.svg>
        <div className="reel-row">
          <motion.span className="reel-word" style={{ x: lx, opacity: to }}>Play</motion.span>
          <motion.button className="reel-media ph" style={{ width: w, height: h, borderRadius: r }} onClick={() => setOpen(true)} data-hover>
            <img src={images.reel} alt="Showreel" />
            <span className="reel-play"><Play size={18} fill="currentColor" /></span>
          </motion.button>
          <motion.span className="reel-word" style={{ x: rx, opacity: to }}>Reel</motion.span>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.div className="modal-box" initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} transition={{ duration: 0.5, ease }} onClick={(e) => e.stopPropagation()}>
              {/* Replace with your showreel: <video src="/reel.mp4" controls autoPlay /> */}
              <img src={images.reel} alt="Showreel" />
              <button className="modal-close" onClick={() => setOpen(false)}><X size={18} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   4. HOW WE WORK — sticky steps, tilted card flips to the next one
   ───────────────────────────────────────────────────────────── */
function HowWeWork() {
  const ref = useRef(null)
  const [idx, setIdx] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => setIdx(Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length * 0.999)))))
  const s = steps[idx]
  const next = steps[idx + 1]

  return (
    <section ref={ref} className="how-sec" style={{ height: `${steps.length * 85 + 40}vh` }}>
      <div className="how-sticky">
        <div className="container">
          <div className="center how-head">
            <Tag>Working Process</Tag>
            <SplitText as="h2" className="display sm" text="How we work" />
          </div>
          <div className="how-grid">
            <div className="how-title">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.h3 key={idx} initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -80, opacity: 0 }} transition={{ duration: 0.6, ease }}>
                  {s.title.split(' ').map((w) => <span key={w} style={{ display: 'block' }}>{w}</span>)}
                </motion.h3>
              </AnimatePresence>
            </div>
            <div className="how-card-wrap">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={idx}
                  className="how-card ph"
                  initial={{ rotateX: -75, y: 140, opacity: 0 }}
                  animate={{ rotateX: 12, y: 0, opacity: 1 }}
                  exit={{ rotateX: 75, y: -140, opacity: 0 }}
                  transition={{ duration: 0.75, ease }}
                >
                  <img src={s.img} alt="" />
                  {!s.numberInImage && <span className="how-no">{s.no}</span>}
                </motion.div>
              </AnimatePresence>
              <div className="how-next">{next ? next.no : ''}</div>
            </div>
            <div className="how-text">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p key={idx} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -40, opacity: 0 }} transition={{ duration: 0.6, ease }}>{s.text}</motion.p>
              </AnimatePresence>
            </div>
          </div>
          <div className="how-dots">
            {steps.map((_, i) => <i key={i} className={i === idx ? 'on' : ''} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   5. PRICING
   ───────────────────────────────────────────────────────────── */
function Pricing() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="pricing-box" y={60}>
          <div className="center">
            <Tag>Pricing Plan</Tag>
            <SplitText as="h2" className="display sm" text="Simple pricing" />
          </div>
          <div className="plans">
            {plans.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.12} className={`plan ${p.featured ? 'featured' : ''}`}>
                <div className="plan-left">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <Link to="/contact" className="plan-btn"><ArrowRight size={14} /> Get started now</Link>
                </div>
                <div className="plan-right">
                  <div className="plan-price"><sup>$</sup>{p.price}<span>Per project</span></div>
                  <h6>Available features:</h6>
                  <ul>{p.features.map((f) => <li key={f}><CircleCheck size={15} />{f}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   6. WALL OF LOVE — testimonial slider
   ───────────────────────────────────────────────────────────── */
function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const [playing, setPlaying] = useState(false)
  const t = testimonials[i]
  const go = (d) => { setDir(d); setPlaying(false); setI((i + d + testimonials.length) % testimonials.length) }

  return (
    <section className="section">
      <div className="container">
        <div className="center">
          <Tag>Testimonials</Tag>
          <SplitText as="h2" className="display sm" text="Wall of love" />
        </div>
        <div className="testi-wrap">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={i}
              className="testi"
              custom={dir}
              initial={{ opacity: 0, x: dir * 60, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: dir * -60, filter: 'blur(8px)' }}
              transition={{ duration: 0.55, ease }}
            >
              <div className="testi-media ph">
                <motion.img src={t.img} alt={t.name} animate={{ scale: playing ? 1.06 : 1 }} transition={{ duration: 6, ease: 'linear' }} />
                <div className="testi-who"><b>{t.name}</b><small>{t.role}</small></div>
                <button className="testi-play" onClick={() => setPlaying((p) => !p)} aria-label="Play">
                  {playing ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
                </button>
              </div>
              <div className="testi-card">
                <span className="testi-q">“</span>
                <p>{t.quote}</p>
                <div className="testi-stats">
                  {t.stats.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="testi-nav">
          <button onClick={() => go(-1)} aria-label="Previous"><ArrowLeft size={16} /></button>
          <button onClick={() => go(1)} aria-label="Next"><ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   7. NEWS & INSIGHTS
   ───────────────────────────────────────────────────────────── */
function News() {
  return (
    <section className="section">
      <div className="container">
        <div className="news-head">
          <div>
            <Tag>Our Blogs</Tag>
            <SplitText as="h2" className="display sm" text="News & insights" />
          </div>
          <Reveal delay={0.2}><Button to="/blog">View all blogs</Button></Reveal>
        </div>
        <div className="blog-grid" style={{ marginTop: 50 }}>
          {homeBlogs.map((b, i) => <PostCard key={b.title} b={b} i={i} />)}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <Page>
      <Hero />
      <WhoWeAre />
      <PlayReel />
      <section className="section" style={{ paddingBottom: 30 }}>
        <div className="container center">
          <Tag>Our Services</Tag>
          <SplitText as="h2" className="display sm" text="What we deliver" />
        </div>
      </section>
      <ServiceStack />
      <section className="section" style={{ paddingTop: 60 }}>
        <div className="container">
          <div className="center" style={{ marginBottom: 60 }}>
            <Tag>Our Works</Tag>
            <SplitText as="h2" className="display sm" text="Recent projects" />
          </div>
          <div className="proj-grid">
            {projects.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}
          </div>
        </div>
      </section>
      <HowWeWork />
      <Pricing />
      <Testimonials />
      <News />
      <FAQ />
    </Page>
  )
}
