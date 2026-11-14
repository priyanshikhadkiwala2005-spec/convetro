import { Link, useParams } from 'react-router-dom'
import { ChevronRight, CircleCheck } from 'lucide-react'
import Page from '../components/Page'
import { Button, Img, Reveal, SplitText } from '../components/Anim'
import { services } from '../data/content'

const landingWide = `${import.meta.env.BASE_URL}images/landing-wide.jpg`

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = services.find((x) => x.slug === slug) || services[0]
  const next = services[(services.indexOf(s) + 1) % services.length]

  return (
    <Page>
      <section style={{ paddingTop: 150 }}>
        <div className="container">
          <Reveal y={14}>
            <div className="breadcrumb"><Link to="/service">Service</Link><ChevronRight />Service Details</div>
          </Reveal>
          <SplitText className="display" text={s.title} delay={0.4} />
          <Reveal delay={0.7}><p className="lead" style={{ maxWidth: 560, marginTop: 20 }}>{s.desc}</p></Reveal>
          <Img src={s.slug === 'landing-page-videos' ? landingWide : s.img} className="detail-img" parallax={8} />
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <Reveal>
            <h2>Overview</h2>
            <p>Every {s.title.toLowerCase()} project starts with your funnel, not the camera. We map the audience, the offer and the moment the video will be seen, then script and design the piece to move people to the next step.</p>
            <p>The result is content that is optimized for performance, not vanity metrics — built to be tested, iterated and reused across your channels.</p>
          </Reveal>
          <Reveal>
            <h2>What's included</h2>
            <ul className="checks" style={{ marginTop: 10 }}>
              {s.points.map((p) => <li key={p}><CircleCheck />{p}</li>)}
              <li><CircleCheck />Two rounds of revisions</li>
              <li><CircleCheck />Platform-ready exports</li>
            </ul>
          </Reveal>
          <Reveal>
            <h2>Our process</h2>
            <p>Discovery call → strategy &amp; script → storyboard → production → edit &amp; motion → review → delivery. You approve every step before we move on.</p>
          </Reveal>
          <div className="stats-row">
            {[['2–4 wks', 'Typical timeline'], ['2', 'Revision rounds'], ['100%', 'Usage rights']].map(([b, t], i) => (
              <Reveal key={t} className="stat-box" delay={i * 0.08}><b>{b}</b><span>{t}</span></Reveal>
            ))}
          </div>
          <div className="next-link">
            <Button to={`/service/${next.slug}`} className="ghost">Next: {next.title}</Button>
          </div>
        </div>
      </section>
    </Page>
  )
}
