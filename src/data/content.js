// ───────────────────────────────────────────────────────────────
//  All site content lives here. Images are in /public/images —
//  replace any file there (same name) or change the paths below.
// ───────────────────────────────────────────────────────────────

const I = (name) => `${import.meta.env.BASE_URL}images/${name}.jpg`

export const BRAND = 'CONVERTO'

export const images = {
  menuSocial: I('svc-social'),
  menuLanding: I('svc-landing'),
  heroRow: [I('hero-1'), I('hero-2'), I('hero-3')],
  mission: I('mission'),
  storyA: I('story-1'),
  storyB: I('story-2'),
  metrics: I('metrics'),
  faq: I('faq'),
  ctaTrail: [I('cta-1'), I('cta-2'), I('cta-3'), I('cta-4'), I('cta-5'), I('cta-6'), I('cta-7'), I('cta-8')],
  servicesCol1: [I('col-bottle'), I('col-vr-blue'), I('col-tv'), I('cta-7')],
  servicesCol2: [I('col-vr-pink'), I('svc-landing'), I('cta-1'), I('svc-social')],
  carousel: [I('home-vr'), I('home-astro'), I('home-city'), I('home-forest'), I('cta-6'), I('cta-2'), I('col-vr-pink'), I('cta-1')],
  reel: I('home-reel'),
  logoHover: [I('cta-5'), I('cta-6'), I('cta-2'), I('col-bottle'), I('cta-1'), I('cta-3'), I('col-vr-pink'), I('cta-4')],
}

export const navLinks = [
  { label: 'About us', to: '/about' },
  { label: 'Service', to: '/service' },
  { label: 'Project', to: '/project' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact us', to: '/contact' },
]

export const logos = ['Mondole', 'Hanhlod', 'Raonadle', 'Bonraow', 'Wondrot', 'Raonadle', 'Mondole', 'Hanhlod']

export const team = [
  { name: 'Harry Wonderson', role: 'Chief Executive Officer', img: I('team-1') },
  { name: 'Jhon Markham', role: 'Design Director', img: I('team-2') },
  { name: 'Mandy Wranghuna', role: 'Head of Motion Graphics', img: I('team-3') },
  { name: 'Larry Moonsoon', role: 'Chief Technology Officer', img: I('team-4') },
]

export const metrics = [
  { value: 3.4, decimals: 1, suffix: 'X', text: 'Higher landing page conversions. Improved visitor clarity and increased the conversion rate' },
  { value: 48, decimals: 0, suffix: '%', text: 'Higher ad click-through rate. Scroll-stopping opening hooks and mobile-optimized format.' },
  { value: 120, decimals: 0, suffix: '+', text: 'Marketing videos delivered. From startup launches to ongoing ad campaigns.' },
]

export const awards = [
  { title: 'Marketing Video Excellence Award', meta: 'Best Agency 2025', img: I('cta-1') },
  { title: 'Top Marketing Video Agency', meta: 'Southeast Asia 2025', img: I('metrics') },
  { title: 'Creative Strategy Recognition', meta: 'Special Kudos 2023', img: I('cta-2') },
  { title: 'Client Choice Award', meta: 'Finalist 2022', img: I('detail-sign') },
]

export const faqs = [
  { q: 'What types of courses do you offer?', a: "We work with startups, SaaS companies, e-commerce brands, coaches, and digital businesses that rely on marketing funnels, paid ads, or online sales. If video plays a role in your growth strategy, we're a good fit." },
  { q: 'Do you help with strategy or just video production?', a: 'Both. Every project starts with strategy — audience, offer, funnel stage and platform — and production is built on top of that so every video has a clear job to do.' },
  { q: 'How long does a typical project take?', a: 'Most projects take 2–4 weeks from kickoff to final delivery, depending on scope, number of deliverables and revision rounds.' },
  { q: 'Will I be involved in the process?', a: 'Yes. You review the script, the storyboard and each cut. We keep you in the loop at every milestone without making you manage the work.' },
  { q: 'How many revisions are included?', a: 'Every package includes two rounds of revisions per deliverable. Additional rounds can be added whenever you need them.' },
]

export const services = [
  {
    slug: 'paid-social-media-ads',
    title: 'Paid social media ads',
    desc: 'Scroll-stopping short-form ads built for Meta, TikTok and YouTube. Designed around hooks, offers and platform-native formats.',
    points: ['Hook-first creative structure', 'Multiple ad variations for testing', 'Platform-native vertical formats'],
    img: I('svc-social'),
  },
  {
    slug: 'landing-page-videos',
    title: 'Landing page videos',
    desc: 'Clear, persuasive videos that explain your offer and increase conversion rates on sales and lead-gen pages. Also create reusable video content.',
    points: ['Funnel-aligned video structure', 'Facebook and instagram ad videos', 'Product-focused messaging'],
    img: I('svc-landing'),
  },
  {
    slug: 'product-explainer-videos',
    title: 'Product explainer videos',
    desc: 'Simple, engaging explainers that turn complex products into a story your audience understands in seconds.',
    points: ['Mobile-first video formatting', 'Landing page sales video', 'Clear service explanation'],
    img: I('svc-explainer'),
  },
  {
    slug: 'brand-and-authority-content',
    title: 'Brand and authority content',
    desc: 'Position your brand as credible and trustworthy through strategic storytelling and messaging. You can reuse the video content.',
    points: ['Funnel overview video', 'Paid ad creatives for traffic', 'Founder-led storytelling'],
    img: I('svc-brand'),
  },
]

// `img` already contains the project title (like the original design); `cover` is the clean image for the detail page
export const projects = [
  { slug: 'ad-creatives', title: 'Ad creatives', desc: 'High-converting ad creatives designed to grab attention, boost clicks, and drive real sales.', img: I('proj-ad'), cover: I('detail-ad'), gallery: [I('detail-sign'), I('cta-5')], category: 'Paid Social' },
  { slug: 'funnel-videos', title: 'Funnel videos', desc: 'A full-funnel video system that guides audiences from first touch to purchase.', img: I('proj-funnel'), cover: I('landing-wide'), gallery: [I('cta-6'), I('col-bottle')], category: 'Funnels' },
  { slug: 'sales-video', title: 'Sales video', desc: 'A long-form sales video that explains the offer and handles objections before they come up.', img: I('proj-sales'), cover: I('hero-2'), gallery: [I('svc-explainer'), I('cta-1')], category: 'Sales' },
  { slug: 'course-funnel', title: 'Course funnel', desc: 'Launch videos and webinar assets for an online course that sold out its first cohort.', img: I('proj-course'), cover: I('story-2'), gallery: [I('cta-7'), I('col-tv')], category: 'Education' },
  { slug: 'startup-brand', title: 'Startup brand', desc: 'Brand story and launch content for an early-stage startup entering a crowded market.', img: I('proj-startup'), cover: I('mission'), gallery: [I('cta-2'), I('cta-3')], category: 'Branding' },
  { slug: 'trust-building', title: 'Trust-building', desc: 'Testimonial and authority videos that turned skeptical visitors into confident buyers.', img: I('proj-trust'), cover: I('svc-landing'), gallery: [I('svc-brand'), I('faq')], category: 'Authority' },
]

export const blogs = [
  {
    slug: 'why-most-marketing-videos-fail',
    title: 'Why most marketing videos fail — and how to fix them',
    excerpt: 'Most marketing videos fail due to weak strategy, poor storytelling, and no clear CTA. We fix this by combining audience insights, conversion-focused scripts, data-driven visuals, and performance optimization that turn views into business growth.',
    category: 'Case Studies', date: 'Jan 2, 2026', read: '6 min Read', featured: true,
    img: I('blog-2'),
  },
  { slug: 'video-builds-awareness', title: 'Video builds awareness, trust, nurtures leads, and drives conversions.', category: 'Marketing', date: 'Dec 30, 2025', read: '4 min Read', img: I('blog-1') },
  { slug: 'landing-page-videos-when-they-work', title: "Landing page videos: When they work and when they don't", category: 'Case Studies', date: 'Dec 28, 2025', read: '5 min Read', img: I('detail-sign') },
  { slug: 'video-strategy-vs-production', title: 'Video strategy vs. video production: Why it matters', category: 'Marketing', date: 'Dec 31, 2025', read: '3 min Read', img: I('blog-3') },
  { slug: 'how-videos-guide-audiences', title: 'How videos guide audiences from awareness to conversion in funnels', category: 'Paid Advertising', date: 'Dec 1, 2025', read: '7 min Read', img: I('blog-4') },
]

// ── Home page ─────────────────────────────────────────────
export const steps = [
  { no: '01', title: 'Video Production', text: 'Professional filming with the right visuals, pacing, and direction.', img: I('step-1'), numberInImage: true },
  { no: '02', title: 'Goal Alignment', text: 'We understand your business, audience, and goals.', img: I('step-2'), numberInImage: true },
  { no: '03', title: 'Creative Planning', text: 'Clear scripts designed to hold attention and drive action.', img: I('step-3'), numberInImage: true },
  { no: '04', title: 'Final Delivery', text: 'Final assets ready for ads, landing pages, and campaigns.', img: I('cta-2') },
]

export const plans = [
  {
    name: 'Basic Plan', price: '1,200', desc: 'Perfect for brands creating their first conversion-focused video.',
    features: ['Discovery & marketing goal', 'Script & storyboard', '1 marketing video (up to 60 sec)', 'Basic production & editing'],
  },
  {
    name: 'Standard Plan', price: '3,000', featured: true, desc: 'Designed for brands actively running ads or building funnels.',
    features: ['Strategy & creative planning', '3–5 performance-focused videos', 'Scriptwriting & storyboard', 'Captions and pacing optimized'],
  },
]

export const testimonials = [
  {
    name: 'Mark Jhongson', role: 'CEO at Mansoon Dolland', img: I('testimonial'),
    quote: "Converto didn't just make videos they understood our funnel. Our ads performed better within weeks. Converto is highly recommended for any types of video making. Very flexible behavior and professional team.",
    stats: [['2X', 'Sales Growth'], ['62%', 'Lower Cost'], ['4X', 'Ad Return']],
  },
  {
    name: 'Sarah Collins', role: 'Founder at Brightloop', img: I('team-1'),
    quote: 'Our landing page conversion jumped after the new explainer went live. The team understood our audience better than we did and delivered ahead of schedule.',
    stats: [['3.1X', 'Conversion'], ['45%', 'Lower CPA'], ['5X', 'ROAS']],
  },
  {
    name: 'David Moore', role: 'Marketing Lead at Nexora', img: I('team-3'),
    quote: 'Every creative had a clear job in the funnel. We finally have a library of ads we can test and scale without starting from scratch every month.',
    stats: [['2.4X', 'CTR'], ['38%', 'Lower Cost'], ['3X', 'Ad Return']],
  },
]

export const homeBlogs = [
  { slug: 'how-videos-guide-audiences', title: 'How to Use Video at Every Stage: Awareness, Consideration, Conversion', category: 'Case Studies', date: 'Jan 9, 2026', img: I('blog-1') },
  { slug: 'why-most-marketing-videos-fail', title: 'Why most marketing videos fail — And how to fix them', category: 'Case Studies', date: 'Jan 9, 2026', img: I('blog-2') },
  { slug: 'video-strategy-vs-production', title: 'How video improves conversion rates in paid advertising', category: 'Paid Advertising', date: 'Jan 2, 2026', img: I('blog-3') },
]

