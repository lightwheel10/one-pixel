import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HC_PHOTOS } from './photos.js';

gsap.registerPlugin(ScrollTrigger);

export function TopBar() {
  return (
    <div className="hc-topbar">
      <span className="hc-topbar-note">A real company website · the data shown is placeholder</span>
      <a href="/">← Back to OnePixel</a>
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`hc-nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="hc-nav-left">
        <div className="hc-nav-links">
          <a href="#properties">Properties</a>
          <a href="#family">The Family</a>
          <a href="#journal">Journal</a>
        </div>
      </div>
      <a href="#top" className="hc-mark">
        <span className="name">Mehta &amp; Sons</span>
        <span className="est">Bombay · Est. 1962</span>
      </a>
      <div className="hc-nav-right">
        <span className="hc-nav-meta">+91 22 2640 0162</span>
        <a href="#contact" className="hc-call">Request introduction</a>
      </div>
    </nav>
  );
}

export function Hero() {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setInView(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <section className="hc-hero" id="top">
      <div className={`hc-hero-image ${inView ? 'in' : ''}`}>
        <img src={HC_PHOTOS.hero} alt="Sahyadri estate at dusk" />
        <div className="hc-hero-overlay"></div>
        <div className="hc-hero-meta">
          <div className="line">
            <span>Featured Estate № 12</span>
            <span className="sep"></span>
            <span>Sahyadri House</span>
            <span className="sep"></span>
            <span>Lonavala, MH</span>
          </div>
        </div>
        <div className="hc-hero-counter">Spring · 2026</div>
      </div>

      <div className="hc-hero-title-wrap">
        <h1 className="hc-hero-title">
          A house, after all,<br />
          is something <em>kept.</em>
        </h1>
        <div className="hc-hero-aside">
          <p>
            Mehta &amp; Sons is a family office, now in its third generation. We represent a handful of private estates and quiet houses across the Western Ghats, and carry each one from valuation to closing by hand.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = [
    'Bandra', 'Malabar Hill', 'Walkeshwar', 'Alibag', 'Karjat',
    'Lonavala', 'Khandala', 'Khopoli', 'Mahabaleshwar', 'Matheran',
  ];
  return (
    <div className="hc-marquee" aria-hidden="true">
      <div className="hc-marquee-track">
        {[0, 1].map(rep => (
          <span key={rep}>
            {items.map((it, i) => (
              <span key={i}>
                {it} <span className="dot">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FeaturedEstate() {
  return (
    <section className="hc-featured" id="featured">
      <div className="hc-shell">
        <div className="hc-featured-tag">Estate of the Season · Spring 2026</div>
        <div className="hc-featured-grid">
          <div className="hc-featured-img-stack">
            <div className="main">
              <img src={HC_PHOTOS.featuredMain} alt="Sahyadri House, principal façade" />
            </div>
            <div className="small">
              <img src={HC_PHOTOS.featuredDetail} alt="Interior detail" />
            </div>
          </div>
          <div className="hc-featured-content">
            <div className="hc-mono">№ MS 0428 · Lonavala, MH</div>
            <h2><em>Sahyadri</em> House</h2>
            <div className="subtitle">A late nineteenth century manor on twelve quiet acres</div>
            <p className="blurb">
              Built in 1894 for a Bombay textile merchant and held by a single family until last year, Sahyadri House is a study in restraint: laterite stone, Mangalore tiles, and wide teak floors, set against the Western Ghats. Aditya Mehta walked the property in 1969. His granddaughter walked it again last week.
            </p>
            <div className="hc-featured-specs">
              <div className="hc-spec"><div className="v">5</div><div className="l">Bedrooms</div></div>
              <div className="hc-spec"><div className="v">4</div><div className="l">Baths</div></div>
              <div className="hc-spec"><div className="v">12</div><div className="l">Acres</div></div>
              <div className="hc-spec"><div className="v">1894</div><div className="l">Built</div></div>
            </div>
            <div className="hc-featured-cta">
              <a href="#contact" className="hc-link">
                View the estate
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1" /></svg>
              </a>
              <span className="hc-mono">₹28.5 Cr</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Interlude() {
  return (
    <section className="hc-interlude">
      <img src={HC_PHOTOS.interlude} alt="Mist over the Western Ghats" loading="lazy" />
      <div className="hc-interlude-overlay" aria-hidden="true"></div>
      <div className="hc-interlude-caption">
        <span className="hc-interlude-line" aria-hidden="true"></span>
        The corridor we keep · Bombay to Mahabaleshwar
      </div>
    </section>
  );
}

export function PropertiesIndex() {
  const [filter, setFilter] = useState('all');
  const gridRef = useRef(null);
  const fine = useRef(false);
  const props = [
    { idx: '1',    img: HC_PHOTOS.prop1, name: 'Riverbend',     mod: 'Cottage',   loc: 'Bandra (W)',     beds: '3 BD · 2 BA · 1,840 SF', year: '1948', price: '₹8.5 Cr',       cat: 'home' },
    { idx: '2',   img: HC_PHOTOS.prop2, name: 'Sahyadri House', mod: 'Manor',    loc: 'Lonavala',       beds: '5 BD · 4 BA · 3,210 SF', year: '1894', price: '₹28.5 Cr',      cat: 'estate', featured: true },
    { idx: '3',  img: HC_PHOTOS.prop3, name: 'Mill Lane',     mod: 'Loft',      loc: 'Bandra (W)',     beds: '2 BD · 2 BA · 1,210 SF', year: '1925', price: '₹6.8 Cr',       cat: 'home' },
    { idx: '4',   img: HC_PHOTOS.prop4, name: 'The Crest',     mod: 'Estate',    loc: 'Khandala',       beds: '6 BD · 5 BA · 4,800 SF', year: '1908', price: '₹17.5 Cr',      cat: 'estate' },
    { idx: '5',    img: HC_PHOTOS.prop5, name: 'The Hutments',  mod: 'Restored',  loc: 'Karjat',         beds: '4 BD · 3 BA · 2,640 SF', year: '1894', price: 'Sold · ₹7.2 Cr', cat: 'sold' },
    { idx: '6',   img: HC_PHOTOS.prop6, name: 'Brindavan',     mod: 'Cottage',   loc: 'Walkeshwar',     beds: '3 BD · 2 BA · 1,990 SF', year: '1907', price: '₹11 Cr',         cat: 'home' },
    { idx: '7',  img: HC_PHOTOS.prop7, name: 'Aspinwall',     mod: 'Estate',    loc: 'Mahabaleshwar',  beds: '7 BD · 6 BA · 6,200 SF', year: '1888', price: '₹38 Cr',         cat: 'estate' },
    { idx: '8', img: HC_PHOTOS.prop8, name: 'The Banyan',    mod: 'Farmhouse', loc: 'Alibag',         beds: '4 BD · 3 BA · 3,100 SF', year: '1898', price: 'Sold · ₹11 Cr',  cat: 'sold' },
  ];
  const visible = filter === 'all' ? props : props.filter(p => p.cat === filter);
  const filters = [
    { v: 'all',    l: 'All' },
    { v: 'home',   l: 'Homes' },
    { v: 'estate', l: 'Estates' },
    { v: 'sold',   l: 'Recently Placed' },
  ];

  // Tilt only where a real cursor can hover and motion is welcome.
  useEffect(() => {
    fine.current =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Cards settle out of depth as the grid scrolls in; re-runs on filter change.
  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.hc-folio', {
        z: -140,
        rotateX: 8,
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: gridRef.current, start: 'top 82%' },
      });
    }, gridRef);
    return () => ctx.revert();
  }, [filter]);

  const onTilt = (e) => {
    if (!fine.current) return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', `${px * 10}deg`);
    card.style.setProperty('--rx', `${-py * 8}deg`);
  };
  const onTiltReset = (e) => {
    e.currentTarget.style.setProperty('--ry', '0deg');
    e.currentTarget.style.setProperty('--rx', '0deg');
  };

  return (
    <section className="hc-section" id="properties">
      <div className="hc-shell">
        <div className="hc-section-head">
          <div className="hc-section-num">№ 02<span>The Index</span></div>
          <div>
            <h2 className="hc-section-title">Currently <em>on offer.</em></h2>
            <p className="hc-section-sub">
              We list few properties, usually four or five at a time, chosen for their character, their grounds, or their place in the city’s long memory. The full archive is available on request.
            </p>
          </div>
        </div>

        <div className="hc-prop-filter">
          {filters.map(f => (
            <button key={f.v} onClick={() => setFilter(f.v)} className={filter === f.v ? 'on' : ''}>{f.l}</button>
          ))}
          <span className="count">{visible.length} of {props.length}</span>
        </div>

        <div className="hc-prop-grid" ref={gridRef}>
          {visible.map((p) => (
            <a
              key={p.idx}
              className={`hc-folio${p.featured ? ' featured' : ''}${p.cat === 'sold' ? ' sold' : ''}`}
              href={p.featured ? '#contact' : '#'}
            >
              <div className="hc-folio-card" onMouseMove={onTilt} onMouseLeave={onTiltReset}>
                <div className="hc-folio-photo">
                  <img src={p.img} alt={p.name} loading="lazy" />
                  {p.cat === 'sold' && <span className="hc-folio-tag">Placed</span>}
                </div>
                <div className="hc-folio-body">
                  <div className="hc-folio-top">
                    <span className="hc-folio-idx">№ {p.idx}</span>
                    <span className="hc-folio-meta">{p.mod} · {p.loc}</span>
                  </div>
                  <h3 className="hc-folio-name"><em>{p.name}</em></h3>
                  <div className="hc-folio-spec">{p.beds}</div>
                  <div className="hc-folio-foot">
                    <span className="hc-folio-year">Built {p.year}</span>
                    <span className="hc-folio-price">{p.price}</span>
                  </div>
                  <span className="hc-folio-link">
                    View the estate
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1" /></svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
