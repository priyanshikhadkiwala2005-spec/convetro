import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import Page from '../components/Page'
import { Button, Reveal, SplitText, Tag } from '../components/Anim'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    // TODO: connect to your backend / Formspree / EmailJS here
    setSent(true)
    e.currentTarget.reset()
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <Page cta={false}>
      <section className="hero">
        <div className="container">
          <Tag>Contact</Tag>
          <SplitText className="display" text="Get in touch" delay={0.4} />
          <Reveal delay={0.7}>
            <p className="lead">Actionable insights on how performance-driven video supports advertising, funnels, and business growth.</p>
          </Reveal>

          <Reveal y={60} delay={0.2}>
            <form className="form-card" onSubmit={submit} style={{ textAlign: 'left' }}>
              <div className="form-grid">
                <div className="field"><label>Full Name</label><input required placeholder="Full name" /></div>
                <div className="field"><label>Email Address</label><input required type="email" placeholder="Email address" /></div>
                <div className="field"><label>Subject</label><input placeholder="Subject" /></div>
                <div className="field">
                  <label>Service</label>
                  <select defaultValue="">
                    <option value="" disabled>Select a service</option>
                    <option>Paid social media ads</option>
                    <option>Landing page videos</option>
                    <option>Product explainer videos</option>
                    <option>Brand and authority content</option>
                  </select>
                </div>
                <div className="field full"><label>Message</label><textarea placeholder="Write Something" /></div>
              </div>
              <Button type="submit" icon={false}>Submit message</Button>
              <AnimatePresence>
                {sent && (
                  <motion.p className="form-ok" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    Thanks! Your message has been sent — we'll get back to you within 24 hours.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          <div className="contact-cards" style={{ textAlign: 'left' }}>
            {[
              [Mail, 'Email us', 'hello@convertovideo.com', 'mailto:hello@convertovideo.com'],
              [Phone, 'Give us a call', '+880 1234 567 890', 'tel:+8801234567890'],
              [MapPin, 'Visit us', '18 Metro DG, California, USA', '#'],
            ].map(([Icon, t, v, href], i) => (
              <Reveal key={t} delay={i * 0.1}>
                <a href={href} className="contact-card" style={{ display: 'block' }}>
                  <h5><Icon />{t}</h5>
                  <p>{v}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Page>
  )
}
