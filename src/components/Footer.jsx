import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Reveal } from './Anim'
import { BRAND } from '../data/content'

const ease = [0.22, 1, 0.36, 1]

const cols = [
  { title: 'Quick link', links: [['Home', '/'], ['About us', '/about'], ['Contact us', '/contact'], ['Blog', '/blog']] },
  { title: 'Company', links: [['Service', '/service'], ['Project', '/project'], ['Privacy policy', '#'], ['Terms & conditions', '#']] },
  { title: 'Social', links: [['Facebook', 'https://facebook.com'], ['Linkedin', 'https://linkedin.com'], ['Instagram', 'https://instagram.com'], ['Twitter (X)', 'https://x.com']] },
]

export default function Footer() {
  const bigRef = useRef(null)
  const textRef = useRef(null)
  const inView = useInView(bigRef, { once: true, amount: 0.4 })
  const [size, setSize] = useState(200)

  // Scale the giant wordmark so it always fits the container width exactly
  useEffect(() => {
    const fit = () => {
      const box = bigRef.current, txt = textRef.current
      if (!box || !txt) return
      txt.style.fontSize = '100px'
      const w = txt.scrollWidth
      const n = Math.floor((100 * box.clientWidth) / w) - 1
      txt.style.fontSize = n + 'px'
      setSize(n)
    }
    fit()
    document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(bigRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Reveal>
            <div className="footer-logo">{BRAND}</div>
            <p>We help brands grow, convert, and scale through strategic video built for advertising and marketing.</p>
          </Reveal>
          {cols.map((c, i) => (
            <Reveal key={c.title} delay={0.1 + i * 0.08} className="footer-col">
              <h6>{c.title}</h6>
              {c.links.map(([label, to]) =>
                to.startsWith('http') || to === '#'
                  ? <a key={label} href={to} target={to === '#' ? undefined : '_blank'} rel="noreferrer">{label}</a>
                  : <Link key={label} to={to}>{label}</Link>
              )}
            </Reveal>
          ))}
        </div>

        {/* Giant gradient wordmark — letters rise one by one */}
        <div ref={bigRef} style={{ overflow: 'hidden', textAlign: 'center', marginTop: 70 }} aria-hidden>
          <motion.div
            ref={textRef}
            className="footer-big"
            style={{ fontSize: size, display: 'inline-block' }}
            initial={{ y: '70%', opacity: 0, filter: 'blur(14px)' }}
            animate={inView ? { y: '0%', opacity: 1, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1.3, ease }}
          >
            {BRAND}
          </motion.div>
        </div>

        <div className="footer-bottom">
          <span>©{new Date().getFullYear()} {BRAND[0] + BRAND.slice(1).toLowerCase()} All rights reserved.</span>
          <span>Designed &amp; built with React</span>
        </div>
      </div>
    </footer>
  )
}
