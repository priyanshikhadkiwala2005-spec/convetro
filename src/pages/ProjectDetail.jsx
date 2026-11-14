import { useParams } from 'react-router-dom'
import Page from '../components/Page'
import { Button, Counter, Img, Reveal, SplitText } from '../components/Anim'
import { projects } from '../data/content'

export default function ProjectDetail() {
  const { slug } = useParams()
  const p = projects.find((x) => x.slug === slug) || projects[0]
  const next = projects[(projects.indexOf(p) + 1) % projects.length]

  return (
    <Page>
      <section className="detail-hero">
        <div className="container">
          <SplitText className="display" text={p.title} delay={0.4} />
          <Reveal delay={0.7}><p className="lead" style={{ maxWidth: 380 }}>{p.desc}</p></Reveal>
          <Img src={p.cover} className="detail-img" parallax={8} />
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <Reveal>
            <h2>The challenge</h2>
            <p>The brand was spending heavily on paid social but creatives were fatiguing fast. Messaging was unclear, hooks were weak, and every new ad was built from scratch with no testing framework.</p>
          </Reveal>
          <Reveal>
            <h2>Our approach</h2>
            <p>We rebuilt the creative system around the funnel: problem-aware hooks for cold audiences, proof-driven edits for retargeting, and offer-focused cuts for the landing page — all from a single production day.</p>
          </Reveal>
          <div className="stats-row">
            {[[3.4, 1, 'X', 'Return on ad spend'], [48, 0, '%', 'Higher CTR'], [62, 0, '%', 'Lower CPA']].map(([v, d, s, t], i) => (
              <Reveal key={t} className="stat-box" delay={i * 0.08}><b><Counter value={v} decimals={d} suffix={s} /></b><span>{t}</span></Reveal>
            ))}
          </div>
          <div className="gallery">
            {p.gallery.map((g) => <Img key={g} src={g} parallax={5} />)}
          </div>
          <Reveal>
            <h2>Why it worked</h2>
            <p>The success of this project came from aligning creative execution with marketing objectives. Instead of treating video as standalone content, each creative was built to support the funnel and drive specific actions.</p>
            <p>Clear messaging, audience-first structure, and intentional placement allowed the ads to perform in competitive environments without competing for attention through unnecessary complexity.</p>
          </Reveal>
          <Reveal className="quote">
            <span className="q">“</span>
            <div>
              <blockquote>“As we scaled our campaigns, we needed ad creatives that clearly communicated our value without wasting time. These videos helped us explain our offer fast and convert more consistently across platforms.”</blockquote>
              <cite>James Anderson<small>Film Director</small></cite>
            </div>
          </Reveal>
          <Reveal>
            <h2>Final assets delivered</h2>
            <ul>
              <li>Short-form ad creatives for paid social platforms</li>
              <li>Funnel-specific video variations</li>
              <li>Landing page–optimized video versions</li>
              <li>Platform-ready formats for testing and scaling</li>
            </ul>
            <p>All assets were structured to support ongoing optimization, testing, and long-term campaign scalability.</p>
          </Reveal>
          <div className="next-link"><Button to={`/project/${next.slug}`} className="ghost" icon={false}>Next →</Button></div>
        </div>
      </section>
    </Page>
  )
}
