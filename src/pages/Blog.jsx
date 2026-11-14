import { Link } from 'react-router-dom'
import Page from '../components/Page'
import { Img, Reveal, SplitText, Tag } from '../components/Anim'
import { blogs, team } from '../data/content'

export function PostCard({ b, i = 0 }) {
  return (
    <Reveal delay={(i % 3) * 0.1} y={50}>
      <Link to={`/blog/${b.slug}`} className="post" style={{ display: 'block' }}>
        <Img src={b.img} revealScale={false} />
        <div className="post-meta"><span>{b.category}</span><i /><span>{b.date}</span></div>
        <h3>{b.title}</h3>
      </Link>
    </Reveal>
  )
}

export default function Blog() {
  const featured = blogs.find((b) => b.featured)
  const rest = blogs.filter((b) => !b.featured)
  return (
    <Page>
      <section className="hero">
        <div className="container">
          <Tag>Blogs</Tag>
          <SplitText className="display" text={'Latest insights\non video'} delay={0.4} />
          <Reveal delay={0.8}>
            <p className="lead">Actionable insights on how performance-driven video supports advertising, funnels, and business growth.</p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal y={60}>
            <Link to={`/blog/${featured.slug}`} className="featured">
              <Img src={featured.img} revealScale={false} />
              <div className="featured-body">
                <span className="cat">{featured.category}</span>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className="author">
                  <img src={team[0].img} alt="" />
                  <div>{team[0].name}<small>{team[0].role}</small></div>
                  <div className="right"><span>{featured.read}</span><span>Featured</span></div>
                </div>
              </div>
            </Link>
          </Reveal>

          <div className="blog-grid">
            {rest.map((b, i) => <PostCard key={b.slug} b={b} i={i} />)}
          </div>
        </div>
      </section>
    </Page>
  )
}
