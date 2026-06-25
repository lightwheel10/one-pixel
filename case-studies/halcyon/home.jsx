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
          <a href="#clients">Clients</a>
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
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let played = false;
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      gsap.set('.hc-hero-bg', { scale: 1.14 });
      gsap.set('.hc-hero-line .in', { yPercent: 120 });
      gsap.set('.hc-hero-mark, .hc-hero-eyebrow, .hc-hero-cue, .hc-hero-foot > *', { opacity: 0, y: 18 });
      gsap.set('.hc-hero-rule, .hc-hero-kept-rule', { scaleX: 0 });

      mm.add('(min-width: 801px) and (prefers-reduced-motion: no-preference)', () => {
        // scroll parallax: backdrop drifts, content lifts + fades as the hero leaves
        gsap.to('.hc-hero-bg', {
          yPercent: 9, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        gsap.to('.hc-hero-inner', {
          yPercent: -6, autoAlpha: 0.2, ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
        });
        // cursor parallax: backdrop and headline drift oppositely for depth (desktop)
        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          const bgX = gsap.quickTo('.hc-hero-bg', 'x', { duration: 1.1, ease: 'power3' });
          const bgY = gsap.quickTo('.hc-hero-bg', 'y', { duration: 1.1, ease: 'power3' });
          const ttlX = gsap.quickTo('.hc-hero-title', 'x', { duration: 1.2, ease: 'power3' });
          const ttlY = gsap.quickTo('.hc-hero-title', 'y', { duration: 1.2, ease: 'power3' });
          const onMove = (e) => {
            const px = e.clientX / window.innerWidth - 0.5;
            const py = e.clientY / window.innerHeight - 0.5;
            bgX(px * 24); bgY(py * 16);
            ttlX(px * -16); ttlY(py * -10);
          };
          window.addEventListener('mousemove', onMove);
          return () => window.removeEventListener('mousemove', onMove);
        }
        return undefined;
      });
    }, ref);

    const play = () => {
      if (played) return;
      played = true;
      ctx.add(() => {
        if (reduce) {
          gsap.set('.hc-hero-bg', { scale: 1.04 });
          gsap.set('.hc-hero-line .in', { yPercent: 0 });
          gsap.set('.hc-hero-mark, .hc-hero-eyebrow, .hc-hero-cue, .hc-hero-foot > *', { opacity: 1, y: 0 });
          gsap.set('.hc-hero-rule, .hc-hero-kept-rule', { scaleX: 1 });
          return;
        }
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.to('.hc-hero-bg', { scale: 1.04, duration: 1.9, ease: 'power2.out' }, 0)
          .to('.hc-hero-rule', { scaleX: 1, duration: 1.0, stagger: 0.12 }, 0.15)
          .to('.hc-hero-mark, .hc-hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.2)
          .to('.hc-hero-line .in', { yPercent: 0, duration: 1.15, stagger: 0.14 }, 0.4)
          .to('.hc-hero-kept-rule', { scaleX: 1, duration: 0.8 }, 1.3)
          .to('.hc-hero-foot > *', { opacity: 1, y: 0, duration: 0.8, stagger: 0.14 }, 1.05)
          .to('.hc-hero-cue', { opacity: 1, y: 0, duration: 0.7 }, 1.35);
      });
    };

    // The loader locks scroll for ~2.5s; reveal the hero as it lifts.
    document.addEventListener('onepixel:loader-complete', play, { once: true });
    const fb = setTimeout(play, 2800);

    return () => {
      clearTimeout(fb);
      document.removeEventListener('onepixel:loader-complete', play);
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hc-hero" id="top" ref={ref}>
      <div className="hc-hero-bg" aria-hidden="true">
        <img src={HC_PHOTOS.heroland} alt="" />
      </div>
      <div className="hc-hero-scrim" aria-hidden="true"></div>

      <div className="hc-hero-inner">
        <div className="hc-hero-top">
          <span className="hc-hero-mark">Mehta &amp; Sons</span>
          <span className="hc-hero-rule"></span>
          <span className="hc-hero-eyebrow">Est. 1962 · Western Ghats</span>
        </div>

        <h1 className="hc-hero-title">
          <span className="hc-hero-line"><span className="in">A house, after all,</span></span>
          <span className="hc-hero-line"><span className="in">is something <em>kept<i className="hc-hero-kept-rule" aria-hidden="true"></i></em>.</span></span>
        </h1>

        <div className="hc-hero-bottom">
          <div className="hc-hero-foot">
            <p className="hc-hero-note">A family office in its third generation. We carry every house from valuation to closing by hand.</p>
            <p className="hc-hero-detail">A handful of estates, quietly on offer.<br />Bandra to Mahabaleshwar.</p>
          </div>
          <div className="hc-hero-base">
            <span className="hc-hero-rule"></span>
            <span className="hc-hero-cue">Scroll ↓</span>
          </div>
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
            <div className="hc-mono">Lonavala, MH</div>
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

function PropertyGallery({ property }) {
  const images = property.images || [property.img];
  const [active, setActive] = useState(0);
  const touchStartX = useRef(null);
  const hasGallery = images.length > 1;

  const selectImage = (index) => setActive((index + images.length) % images.length);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null || !hasGallery) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 36) return;
    selectImage(active + (distance < 0 ? 1 : -1));
  };

  return (
    <div
      className={`hc-folio-photo${hasGallery ? ' hc-folio-photo-gallery' : ''}`}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {images.map((src, imageIndex) => (
        <img
          key={src}
          className={imageIndex === active ? 'is-touch-active' : ''}
          src={src}
          alt={imageIndex === 0 ? property.name : ''}
          aria-hidden={imageIndex > 0}
          loading="lazy"
          decoding="async"
        />
      ))}
      {hasGallery && (
        <span className="hc-folio-gallery-dots" aria-label={`${property.name} image gallery`}>
          {images.map((src, imageIndex) => (
            <button
              key={src}
              type="button"
              className={imageIndex === active ? 'is-active' : ''}
              aria-label={`Show image ${imageIndex + 1} of ${images.length}`}
              aria-pressed={imageIndex === active}
              onClick={() => selectImage(imageIndex)}
            ></button>
          ))}
        </span>
      )}
      {property.cat === 'sold' && <span className="hc-folio-tag">Placed</span>}
    </div>
  );
}

export function PropertiesIndex() {
  const [filter, setFilter] = useState('all');
  const gridRef = useRef(null);
  const fine = useRef(false);
  const props = [
    { idx: '1', images: HC_PHOTOS.prop1, name: 'Riverbend',     mod: 'Cottage',   loc: 'Bandra (W)',     beds: '3 BD · 2 BA · 1,840 SF', year: '1948', price: '₹8.5 Cr',       cat: 'home' },
    { idx: '2', images: HC_PHOTOS.prop2, name: 'Sahyadri House', mod: 'Manor',    loc: 'Lonavala',       beds: '5 BD · 4 BA · 3,210 SF', year: '1894', price: '₹28.5 Cr',      cat: 'estate' },
    { idx: '3', images: HC_PHOTOS.prop3, name: 'Mill Lane',     mod: 'Residence', loc: 'Bandra (W)',     beds: '2 BD · 2 BA · 1,210 SF', year: '2026', price: '₹6.8 Cr',       cat: 'home' },
    { idx: '4', images: HC_PHOTOS.prop4, name: 'The Crest',    mod: 'Bungalow',  loc: 'Juhu Scheme',    beds: '6 BD · 7 BA · 8,400 SF', year: '2026', price: '₹85 Cr',         cat: 'estate' },
    { idx: '5', images: HC_PHOTOS.prop5, name: 'The Breakwater', mod: 'Apartment', loc: 'Nepean Sea Rd', beds: '4 BD · 4 BA · 3,600 SF', year: '2026', price: 'Sold · ₹42 Cr', cat: 'sold' },
    { idx: '6', images: HC_PHOTOS.prop6, name: 'Brindavan',   mod: 'Cottage',   loc: 'Walkeshwar',     beds: '3 BD · 2 BA · 1,990 SF', year: '1907', price: '₹11 Cr',         cat: 'home' },
    { idx: '7', images: HC_PHOTOS.prop7, name: 'Aspinwall',  mod: 'Estate',    loc: 'Mahabaleshwar',  beds: '7 BD · 6 BA · 6,200 SF', year: '1888', price: '₹38 Cr',         cat: 'estate' },
    { idx: '8', images: HC_PHOTOS.prop8, name: 'The Banyan', mod: 'Farmhouse', loc: 'Alibag',         beds: '4 BD · 3 BA · 3,100 SF', year: '1898', price: 'Sold · ₹11 Cr',  cat: 'sold' },
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
          <div className="hc-section-num"><span>The Index</span></div>
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
            <article
              key={p.idx}
              className={`hc-folio${p.cat === 'sold' ? ' sold' : ''}`}
            >
              <div className="hc-folio-card" onMouseMove={onTilt} onMouseLeave={onTiltReset}>
                <PropertyGallery property={p} />
                <div className="hc-folio-body">
                  <div className="hc-folio-top">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
