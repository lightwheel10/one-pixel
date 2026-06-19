import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Marquee() {
  const ref = useRef(null);
  const items = ['Pixel perfect since 2024', 'Design × Engineering', 'Brand → Web', 'Built to convert', 'Made in India'];

  // Paras · 2026-06-18: GSAP-driven marquee that reacts to scroll velocity — it speeds up and
  // skews while you scroll, flips direction on scroll-up, and eases back to a steady glide when
  // idle. The CSS keyframe scroll stays as the reduced-motion / no-JS fallback.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const track = ref.current?.querySelector('.marquee-track');
    if (!track) return;
    track.classList.add('js-marquee');
    let tween, skewTo, dir = 1, idleTimer;
    const ctx = gsap.context(() => {
      tween = gsap.to(track, { xPercent: -50, repeat: -1, duration: 30, ease: 'none' });
      skewTo = gsap.quickTo(track, 'skewX', { duration: 0.5, ease: 'power3' });
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (v !== 0) dir = v > 0 ? 1 : -1;
          const boost = gsap.utils.clamp(1, 5, Math.abs(v) / 250);
          gsap.to(tween, { timeScale: dir * boost, duration: 0.3, overwrite: true });
          skewTo(gsap.utils.clamp(-10, 10, v / -400));
        },
      });
    }, ref);
    // ease back to a steady glide + no skew shortly after scrolling stops
    const onScroll = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (tween) gsap.to(tween, { timeScale: dir, duration: 0.6, overwrite: true });
        if (skewTo) skewTo(0);
      }, 120);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(idleTimer); ctx.revert(); };
  }, []);

  return (
    <div className="marquee" aria-hidden ref={ref}>
      <div className="marquee-track">
        {[0, 1].map((rep) => (
          <span key={rep}>
            {items.map((it, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 64 }}>
                {it}
                <span className="star">✦</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

// Paras · 2026-06-19: SiteMock renders an abstract "screenshot" of a website — generated brand-art
// in the OnePixel palette, NOT a faked photo (the projects are template placeholders). Each archetype
// matches a project category (editorial / ecommerce / saas / type / structured) so the previews read
// as distinct, plausible sites. Sized in container-query units so they scale with the frame.
function Line({ w, light }) { return <span className={`mk-line${light ? ' mk-line-l' : ''}`} style={{ width: w }} />; }

function SiteMock({ kind }) {
  if (kind === 'ecommerce') return (
    <div className="mk mk-ecom">
      <div className="mk-nav">
        <span className="mk-logo mk-logo-ink" />
        <span className="mk-nav-r"><i /><i /><span className="mk-dot" /></span>
      </div>
      <div className="mk-prodgrid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="mk-prod" key={i}>
            <span className="mk-prod-img" />
            <Line w="78%" /><span className="mk-line mk-coral" style={{ width: '42%' }} />
          </div>
        ))}
      </div>
    </div>
  );
  if (kind === 'saas') return (
    <div className="mk mk-saas">
      <div className="mk-nav">
        <span className="mk-logo mk-logo-cream" />
        <span className="mk-nav-r"><i className="mk-i-l" /><i className="mk-i-l" /><span className="mk-pill" /></span>
      </div>
      <div className="mk-hero">
        <span className="mk-h mk-h-cream" style={{ width: '82%' }} />
        <span className="mk-h mk-h-cream" style={{ width: '56%' }} />
        <span className="mk-sub" style={{ width: '62%' }} />
        <span className="mk-btn" />
      </div>
      <div className="mk-feats">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="mk-feat" key={i}>
            <span className="mk-sq" /><Line w="80%" light /><Line w="54%" light />
          </div>
        ))}
      </div>
    </div>
  );
  if (kind === 'editorial') return (
    <div className="mk mk-editorial">
      <div className="mk-nav">
        <span className="mk-logo mk-logo-ink" />
        <span className="mk-nav-r"><i /><i /><i /></span>
      </div>
      <div className="mk-edi">
        <div className="mk-edi-copy">
          <span className="mk-h" style={{ width: '94%' }} />
          <span className="mk-h mk-h-coral" style={{ width: '60%' }} />
          <span className="mk-h" style={{ width: '78%' }} />
          <span className="mk-tag" />
        </div>
        <div className="mk-edi-img" />
      </div>
    </div>
  );
  if (kind === 'type') return (
    <div className="mk mk-typef">
      <div className="mk-nav">
        <span className="mk-logo mk-logo-cream" />
        <span className="mk-nav-r"><i className="mk-i-l" /><i className="mk-i-l" /></span>
      </div>
      <div className="mk-typebig">Aa</div>
      <div className="mk-typerow"><span /><span /><span /><span /><span /></div>
    </div>
  );
  // structured / industrial
  return (
    <div className="mk mk-struct">
      <div className="mk-nav">
        <span className="mk-logo mk-logo-ink" />
        <span className="mk-nav-r mk-mono"><i /><i /><i /></span>
      </div>
      <div className="mk-modgrid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className={`mk-mod ${i === 3 ? 'mk-mod-on' : ''}`} key={i} />
        ))}
      </div>
    </div>
  );
}

export function Work() {
  const ref = useRef(null);
  // Paras · 2026-06-19: staggered reveal of the gallery cards as they enter. Reduced-motion safe.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.work-card', {
        opacity: 0, y: 36, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: '.work-gallery', start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const items = [
    { num: '01', name: 'Mehta & Sons',     domain: 'mehta-sons.in',      meta: ['Family Office', 'Brand + Site', '2026'], kind: 'editorial',  href: '/case-studies/halcyon/', live: true },
    { num: '02', name: 'Sahyadri & Co',    domain: 'sahyadri.co',        meta: ['Tax + Advisory', 'Brand + Site', '2026'], kind: 'saas',       href: '/case-studies/sahyadri/' },
    { num: '03', name: 'Forest & Loom',    domain: 'forestandloom.com',  meta: ['D2C Textiles', 'Shopify', '2025'],        kind: 'ecommerce' },
    { num: '04', name: 'Sangam Type Co',   domain: 'sangamtype.co',      meta: ['Type Foundry', 'Design + Dev', '2025'],   kind: 'type' },
    { num: '05', name: 'Pravah Cloud',     domain: 'pravah.cloud',       meta: ['B2B SaaS', 'Site + Docs', '2025'],        kind: 'saas' },
    { num: '06', name: 'Coast & Co',       domain: 'coastandco.in',      meta: ['Boutique Hotels', 'CMS', '2024'],         kind: 'editorial' },
    { num: '07', name: 'Karya Industries', domain: 'karya.industries',   meta: ['Industrial', 'Site', '2024'],             kind: 'structured' },
  ];

  return (
    <section id="work" ref={ref}>
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-num">[ 01 ] Selected Work</div>
          </div>
          <div>
            <h2 className="section-title">Sites we’ve <em>shipped</em>.</h2>
            <p className="section-sub" style={{ marginTop: 24 }}>
              A small slice of our work. Every project is a premium website built from scratch, and a brand that looks sharper for it.
            </p>
          </div>
        </div>

        <div className="work-gallery">
          {items.map((it, i) => (
            // Paras · 2026-06-19: only live projects are real links; placeholders use no href (so they
            // don't jump to top or sit in the tab order as dead links). The mock is decorative → aria-hidden.
            <a key={i} className="work-card" href={it.href || undefined}>
              <div className="work-browser">
                <div className="work-bar">
                  <span className="work-dots" aria-hidden><i /><i /><i /></span>
                  <span className="work-url">{it.domain}</span>
                  <span className="work-bar-sp" aria-hidden />
                </div>
                <div className="work-screen" aria-hidden><SiteMock kind={it.kind} /></div>
              </div>
              <div className="work-foot">
                <div className="work-name">
                  <span className="work-num">{it.num}</span>
                  {it.name}
                  {it.live && <span className="work-live"><i />View live</span>}
                </div>
                <span className="work-arr" aria-hidden>↗</span>
                <div className="work-meta">
                  {it.meta.map((m, j) => <span key={j}>{m}</span>)}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
