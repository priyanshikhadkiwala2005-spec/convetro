import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/** Small glowing green dot that trails the mouse (same as the original site) */
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })
  const scale = useMotionValue(1)
  const ss = useSpring(scale, { stiffness: 400, damping: 25 })

  useEffect(() => {
    const move = (e) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e) => scale.set(e.target.closest('a,button,input,textarea,select,[data-hover]') ? 2.2 : 1)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [x, y, scale])

  return <motion.div className="cursor-dot" style={{ x: sx, y: sy, scale: ss }} />
}
