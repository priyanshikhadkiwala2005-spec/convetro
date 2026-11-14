import { motion } from 'framer-motion'
import CTA from './CTA'
import Footer from './Footer'

const ease = [0.22, 1, 0.36, 1]

/** Wraps every page: enter/exit transition + shared CTA and footer */
export default function Page({ children, cta = true }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.35, ease } }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.45, ease } }}
    >
      {children}
      {cta && <CTA />}
      <Footer />
    </motion.main>
  )
}
