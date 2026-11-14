import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, animate } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CornerDownRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1]

/** Fade + rise + un-blur when the element scrolls into view */
export function Reveal({ children, delay = 0, y = 40, as = 'div', className, style, once = true, amount = 0.2 }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once, amount }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </M>
  )
}

/** Heading that reveals word-by-word, sliding up from a mask */
export function SplitText({ text, as = 'h1', className, delay = 0, stagger = 0.06 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const Tag = as
  const lines = text.split('\n')
  let i = 0
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.split(' ').map((w, wi) => {
            const idx = i++
            return (
              <span className="word-wrap" key={wi}>
                <motion.span
                  className="word"
                  initial={{ y: '110%', rotate: 4 }}
                  animate={inView ? { y: '0%', rotate: 0 } : {}}
                  transition={{ duration: 0.9, delay: delay + idx * stagger, ease }}
                >
                  {w}
                </motion.span>
                {wi < line.split(' ').length - 1 && ' '}
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

/** Image with placeholder background, scale-in on reveal and optional scroll parallax */
export function Img({ src, alt = '', className = '', style, parallax = 0, revealScale = true }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])
  return (
    <motion.div
      ref={ref}
      className={`media ph ${className}`}
      style={style}
      initial={revealScale ? { opacity: 0, scale: 0.94, filter: 'blur(8px)' } : false}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.1, ease }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={parallax ? { y, scale: 1 + parallax / 50, height: '100%' } : undefined}
      />
    </motion.div>
  )
}

/** Green pill button with the rolling-label hover effect */
export function Button({ to, href, children, className = '', onClick, type, icon = true }) {
  const inner = (
    <>
      {icon && <CornerDownRight size={13} strokeWidth={2.2} />}
      <span className="btn-label">
        <span>{children}</span>
        <span aria-hidden>{children}</span>
      </span>
    </>
  )
  if (to) return <Link to={to} className={`btn ${className}`} onClick={onClick}>{inner}</Link>
  if (href) return <a href={href} className={`btn ${className}`} onClick={onClick}>{inner}</a>
  return <button type={type || 'button'} className={`btn ${className}`} onClick={onClick}>{inner}</button>
}

export function Tag({ children }) {
  return (
    <Reveal y={14}>
      <span className="tag">{children}</span>
    </Reveal>
  )
}

/** Number that counts up when visible */
export function Counter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 2, ease, onUpdate: (n) => setV(n) })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>
}
