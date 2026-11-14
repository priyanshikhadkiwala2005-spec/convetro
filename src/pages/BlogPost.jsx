import { Link, useParams } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import Page from '../components/Page'
import { Img, Reveal, SplitText } from '../components/Anim'
import { PostCard } from './Blog'
import { blogs, team } from '../data/content'

export default function BlogPost() {
  const { slug } = useParams()
  const b = blogs.find((x) => x.slug === slug) || blogs[0]
  const more = blogs.filter((x) => x.slug !== b.slug).slice(0, 3)

  return (
    <Page>
      <section style={{ paddingTop: 150 }}>
        <div className="container">
          <div className="prose" style={{ marginBottom: 0 }}>
            <Reveal y={14}>
              <div className="breadcrumb"><Link to="/blog">Blog</Link><ChevronRight />{b.category}</div>
            </Reveal>
            <SplitText className="display xs" text={b.title} delay={0.3} stagger={0.03} />
            <Reveal delay={0.6}>
              <div className="author" style={{ borderTop: 0, marginTop: 20 }}>
                <img src={team[0].img} alt="" />
                <div>{team[0].name}<small>{team[0].role}</small></div>
                <div className="right"><span>{b.date}</span><span>{b.read}</span></div>
              </div>
            </Reveal>
          </div>
          <Img src={b.img} className="detail-img" parallax={8} />
        </div>
      </section>

      <section className="section">
        <div className="container prose">
          <Reveal>
            <p>{b.excerpt || 'Video is one of the most powerful tools in modern marketing — but only when it is built with a clear goal. Below we break down what separates videos that perform from videos that just look good.'}</p>
            <h2>Start with the funnel</h2>
            <p>Before a single frame is shot, decide where the video will live and what the viewer should do next. A cold-audience ad needs a very different hook, length and message than a landing page explainer.</p>
            <h2>Hook in the first three seconds</h2>
            <p>Most viewers decide within seconds whether to keep watching. Lead with the problem, a bold claim or a pattern interrupt — not your logo.</p>
            <h2>One video, one job</h2>
            <p>Trying to explain everything leads to explaining nothing. Give each video a single message and a single call to action, then build variations for testing.</p>
            <h2>Measure what matters</h2>
            <ul>
              <li>Thumb-stop rate and hold rate for ads</li>
              <li>Click-through rate to the landing page</li>
              <li>Conversion rate with vs. without video</li>
            </ul>
          </Reveal>
        </div>
        <div className="container">
          <Reveal><h2 className="display xs" style={{ marginTop: 60 }}>More insights</h2></Reveal>
          <div className="blog-grid" style={{ marginTop: 30 }}>
            {more.map((m, i) => <PostCard key={m.slug} b={m} i={i} />)}
          </div>
        </div>
      </section>
    </Page>
  )
}
