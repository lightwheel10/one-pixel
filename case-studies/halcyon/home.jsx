import { useEffect, useState } from 'react';
import { HC_PHOTOS } from './photos.js';

export function TopBar() {
  return (
    <div className="hc-topbar">
      <span><span className="dot"></span>Established 1962 · Cold Spring, New York</span>
      <span style={{ display: 'flex', gap: 24 }}>
        <span>Hudson Valley · NY</span>
        <a href="/">← Back to OnePixel</a>
      </span>
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
        <span className="name">Halcyon Capital</span>
        <span className="est">Hudson Valley · Est. MCMLXII</span>
      </a>
      <div className="hc-nav-right">
        <span className="hc-nav-meta">(845) 265 — 0162</span>
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
        <img src={HC_PHOTOS.hero} alt="Hudson Valley estate at dusk" />
        <div className="hc-hero-overlay"></div>
        <div className="hc-hero-meta">
          <div className="line">
            <span>Featured Estate №. XII</span>
            <span className="sep"></span>
            <span>The Blackwood</span>
            <span className="sep"></span>
            <span>Garrison, NY</span>
          </div>
        </div>
        <div className="hc-hero-counter">Spring · MMXXVI</div>
      </div>

      <div className="hc-hero-title-wrap">
        <h1 className="hc-hero-title">
          A house, after all,<br />
          is something <em>kept.</em>
        </h1>
        <div className="hc-hero-aside">
          <p>
            Halcyon Capital is a third-generation family office representing private estates and quiet houses across the Hudson Valley. We list few properties, considered carefully, and carry each from valuation to closing — by hand.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = [
    'Cold Spring', 'Garrison', 'Beacon', 'Philipstown', 'Rhinebeck',
    'Hudson', 'Tivoli', 'Millbrook', 'Hyde Park', 'Stone Ridge',
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
        <div className="hc-featured-tag">Estate of the Season · Spring MMXXVI</div>
        <div className="hc-featured-grid">
          <div className="hc-featured-img-stack">
            <div className="main">
              <img src={HC_PHOTOS.featuredMain} alt="The Blackwood, principal façade" />
            </div>
            <div className="small">
              <img src={HC_PHOTOS.featuredDetail} alt="Interior detail" />
            </div>
          </div>
          <div className="hc-featured-content">
            <div className="hc-mono">№ HC-0428 · Garrison, NY</div>
            <h2>The <em>Blackwood</em></h2>
            <div className="subtitle">A nineteenth-century manor on twelve quiet acres</div>
            <p className="blurb">
              Built in 1872 for a Hudson River merchant and held by a single family until last year, the Blackwood is a study in restraint: stone, slate, and wide oak floors, set against the Hudson Highlands. Walter Halcyon walked the property in 1969. His granddaughter walked it again last week.
            </p>
            <div className="hc-featured-specs">
              <div className="hc-spec"><div className="v">5</div><div className="l">Bedrooms</div></div>
              <div className="hc-spec"><div className="v">4</div><div className="l">Baths</div></div>
              <div className="hc-spec"><div className="v">12</div><div className="l">Acres</div></div>
              <div className="hc-spec"><div className="v">1872</div><div className="l">Built</div></div>
            </div>
            <div className="hc-featured-cta">
              <a href="./property.html" className="hc-link">
                View the estate
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1" /></svg>
              </a>
              <span className="hc-mono">$3,250,000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PropertiesIndex() {
  const [filter, setFilter] = useState('all');
  const props = [
    { idx: 'I',    img: HC_PHOTOS.prop1, name: 'Riverbend',       mod: 'Cottage',   loc: 'Cold Spring', beds: '3 BD · 2 BA · 1,840 SF', year: '1948', price: '$685,000',     cat: 'home' },
    { idx: 'II',   img: HC_PHOTOS.prop2, name: 'The Blackwood',   mod: 'Manor',     loc: 'Garrison',    beds: '5 BD · 4 BA · 3,210 SF', year: '1872', price: '$3,250,000',   cat: 'estate', featured: true },
    { idx: 'III',  img: HC_PHOTOS.prop3, name: 'Foundry Lane',    mod: 'Loft',      loc: 'Beacon',      beds: '2 BD · 2 BA · 1,210 SF', year: '1925', price: '$549,000',     cat: 'home' },
    { idx: 'IV',   img: HC_PHOTOS.prop4, name: 'Hilltop',         mod: 'Estate',    loc: 'Garrison',    beds: '6 BD · 5 BA · 4,800 SF', year: '1908', price: '$2,150,000',   cat: 'estate' },
    { idx: 'V',    img: HC_PHOTOS.prop5, name: 'Old Mill House',  mod: 'Restored',  loc: 'Philipstown', beds: '4 BD · 3 BA · 2,640 SF', year: '1810', price: 'Sold · $920k', cat: 'sold' },
    { idx: 'VI',   img: HC_PHOTOS.prop6, name: 'Hudson Carriage', mod: 'Cottage',   loc: 'Cold Spring', beds: '3 BD · 2 BA · 1,990 SF', year: '1893', price: '$795,000',     cat: 'home' },
    { idx: 'VII',  img: HC_PHOTOS.prop7, name: 'Aspinwall',       mod: 'Estate',    loc: 'Rhinebeck',   beds: '7 BD · 6 BA · 6,200 SF', year: '1888', price: '$4,800,000',   cat: 'estate' },
    { idx: 'VIII', img: HC_PHOTOS.prop8, name: 'Linden Hollow',   mod: 'Farmhouse', loc: 'Millbrook',   beds: '4 BD · 3 BA · 3,100 SF', year: '1856', price: 'Sold · $1.4M', cat: 'sold' },
  ];
  const visible = filter === 'all' ? props : props.filter(p => p.cat === filter);
  const filters = [
    { v: 'all',    l: 'All' },
    { v: 'home',   l: 'Homes' },
    { v: 'estate', l: 'Estates' },
    { v: 'sold',   l: 'Recently Placed' },
  ];

  return (
    <section className="hc-section" id="properties">
      <div className="hc-shell">
        <div className="hc-section-head">
          <div className="hc-section-num">№ 02<span>The Index</span></div>
          <div>
            <h2 className="hc-section-title">Currently <em>on offer.</em></h2>
            <p className="hc-section-sub">
              We list few properties — usually four or five at any time — chosen for their character, their grounds, or their place in the Valley’s long memory. The full archive is available on request.
            </p>
          </div>
        </div>

        <div className="hc-prop-filter">
          {filters.map(f => (
            <button key={f.v} onClick={() => setFilter(f.v)} className={filter === f.v ? 'on' : ''}>{f.l}</button>
          ))}
          <span className="count">{visible.length} of {props.length}</span>
        </div>

        <div className="hc-prop-index">
          {visible.map((p) => (
            <a key={p.idx} className="hc-prop-row" href={p.featured ? './property.html' : '#'}>
              <div className="idx">№ {p.idx}</div>
              <div className="thumb"><img src={p.img} alt={p.name} loading="lazy" /></div>
              <div className="name"><em>{p.name}</em></div>
              <div className="meta-cell">{p.mod} · {p.loc}</div>
              <div className="meta-cell">{p.beds}</div>
              <div className="meta-cell">Built {p.year}</div>
              <div className="price-cell">{p.price}</div>
              <div className="arr">
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1" /></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
