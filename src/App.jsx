import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'

const ease = [0.22, 1, 0.36, 1]

/** Dark panel that drops down from the navbar on every page change */
function Curtain({ id }) {
  return (
    <div className="curtain-wrap">
      <motion.div
        key={id}
        className="curtain"
        style={{ width: '100%', maxWidth: 820 }}
        initial={{ height: 52, opacity: 1, maxWidth: 520 }}
        animate={{ height: [52, 300, 300], maxWidth: [520, 820, 820], opacity: [1, 1, 0] }}
        transition={{ duration: 1.2, times: [0, 0.45, 1], ease }}
      />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  const key = location.pathname

  return (
    <>
      <Cursor />
      <Navbar />
      <Curtain id={key} />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={key}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Services />} />
          <Route path="/service/:slug" element={<ServiceDetail />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
