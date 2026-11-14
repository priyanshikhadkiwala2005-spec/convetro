import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlignLeft, X } from 'lucide-react'
import { Button } from './Anim'
import { BRAND, images, navLinks } from '../data/content'

const ease = [0.22, 1, 0.36, 1]

/**
 * Floating pill navbar. "MENU" expands the pill into a wide panel with a
 * green link block + two image cards — exactly like the original.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="nav-wrap">
        <motion.nav
          className="nav"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1, maxWidth: open ? 820 : 520 }}
          transition={{ duration: 0.7, ease, y: { duration: 0.9, delay: 0.2, ease }, opacity: { duration: 0.6, delay: 0.2 } }}
        >
          <div className="nav-bar">
            <button className={`nav-toggle ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'm'}
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'inline-flex' }}
                >
                  {open ? <X /> : <AlignLeft />}
                </motion.span>
              </AnimatePresence>
              {open ? 'Close' : 'Menu'}
            </button>
            <Link to="/" className="nav-logo">{BRAND}</Link>
            <div className="nav-cta"><Button to="/contact">Book a call</Button></div>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                className="nav-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="nav-menu-grid">
                  <motion.div
                    className="nav-links"
                    initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1, ease }}
                  >
                    {navLinks.map((l, i) => (
                      <motion.div key={l.to} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease }}>
                        <NavLink to={l.to} end className={({ isActive }) => (isActive ? 'active' : '')}>{l.label}</NavLink>
                      </motion.div>
                    ))}
                  </motion.div>
                  {[
                    { label: 'Paid social media ads', img: images.menuSocial, to: '/service/paid-social-media-ads' },
                    { label: 'Landing page videos', img: images.menuLanding, to: '/service/landing-page-videos' },
                  ].map((c, i) => (
                    <motion.div key={c.to} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.18 + i * 0.08, ease }}>
                      <Link to={c.to} className="nav-card ph" style={{ display: 'block', height: '100%' }}>
                        <img src={c.img} alt="" />
                        <span>{c.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>
    </>
  )
}
