// AERIUM — About page.
// A relaxed, editorial brand story: roomy sections, big type, full-bleed image bands.
// Reuses the shared Nav / Footer / Newsletter / atoms and the existing imagery from the study.

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Nav, Footer, OpxBar, EntryLoader, Newsletter, Arrow, Plus } from '../App.jsx';

gsap.registerPlugin(ScrollTrigger);

const IMG = '/case-studies/aerium/images/';
const SHOP = '/case-studies/aerium/shop/';

const VALUES = [
  ['01', 'Considered Design', 'Every piece earns its place. Nothing is added just to fill a rack.'],
  ['02', 'Made to Last', 'Durable fabrics and honest construction, so the pieces you reach for last for years.'],
  ['03', 'Culture First', 'We build with the people who wear AERIUM, not only for them.'],
  ['04', 'Made Responsibly', 'Cleaner materials and manufacturing partners we are proud to name.'],
];

const CRAFT = ['420 GSM Cotton', 'Garment Dyed', 'Preshrunk Body', 'Reinforced Stress Points'];

const STATS = [
  ['2024', 'Founded'],
  ['Bengaluru', 'Where we are'],
  ['Pan India', 'We deliver'],
];

const GALLERY = [IMG + 'culture-1.webp', IMG + 'culture-2.webp', IMG + 'culture-3.webp', IMG + 'culture-4.webp'];

export default function AboutApp() {
  // Smooth first-load choreography + per-section scroll reveals. Same motion language
  // as the home page: power-out easing, transform/opacity only, each reveal fires once
  // and is triggered on its own content element (not an oversized parent).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let intro;
    const ctx = gsap.context(() => {
      const st = (trigger, start = 'top 84%') => ({ trigger, start, once: true });

      // hero intro — paused; plays when the loader lifts (fresh landing) or at once
      intro = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      intro
        .fromTo('.about-hero .eyebrow', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
        .fromTo('.about-hero-title', { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.1)
        .fromTo('.about-hero-lead', { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.28)
        .fromTo('.about-hero-img img', { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, 0.15);

      // why we exist
      gsap.from('.about-intro-h', { autoAlpha: 0, y: 24, duration: 0.8, ease: 'power3.out', scrollTrigger: st('.about-intro-h', 'top 86%') });
      gsap.from('.about-intro-body p', { autoAlpha: 0, y: 24, duration: 0.85, ease: 'power3.out', stagger: 0.12, scrollTrigger: st('.about-intro-body', 'top 84%') });

      // editorial pair — rise in
      gsap.from('.about-duo figure', { autoAlpha: 0, y: 44, duration: 0.9, ease: 'power3.out', stagger: 0.12, scrollTrigger: st('.about-duo', 'top 82%') });

      // manifesto band — slow image settle + copy lift
      gsap.fromTo('.about-band > img', { scale: 1.14 }, { scale: 1, duration: 1.7, ease: 'power2.out', scrollTrigger: st('.about-band', 'top 88%') });
      gsap.from('.about-band-inner > *', { autoAlpha: 0, y: 28, duration: 0.9, ease: 'power3.out', stagger: 0.14, scrollTrigger: st('.about-band-inner', 'top 80%') });

      // values — head, then cards stagger up
      gsap.from('.about-values-head > *', { autoAlpha: 0, y: 22, duration: 0.8, ease: 'power3.out', stagger: 0.1, scrollTrigger: st('.about-values-head', 'top 86%') });
      gsap.from('.about-value', { autoAlpha: 0, y: 36, duration: 0.8, ease: 'power3.out', stagger: 0.1, scrollTrigger: st('.about-values-grid', 'top 82%') });

      // craft — image slides in, copy lifts
      gsap.from('.about-craft-img', { autoAlpha: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: st('.about-craft', 'top 80%') });
      gsap.from('.about-craft-copy > *', { autoAlpha: 0, y: 24, duration: 0.8, ease: 'power3.out', stagger: 0.1, scrollTrigger: st('.about-craft-copy', 'top 82%') });

      // stats
      gsap.from('.about-stat', { autoAlpha: 0, y: 26, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: st('.about-stats', 'top 85%') });

      // culture gallery — thumbs pop with a slight overshoot
      gsap.from('.about-gallery-head > *', { autoAlpha: 0, y: 22, duration: 0.8, ease: 'power3.out', stagger: 0.1, scrollTrigger: st('.about-gallery-head', 'top 86%') });
      gsap.from('.about-gallery-grid img', { autoAlpha: 0, scale: 0.9, duration: 0.7, ease: 'back.out(1.5)', stagger: 0.08, scrollTrigger: st('.about-gallery-grid', 'top 84%') });

      // cta band
      gsap.fromTo('.about-cta > img', { scale: 1.14 }, { scale: 1, duration: 1.7, ease: 'power2.out', scrollTrigger: st('.about-cta', 'top 88%') });
      gsap.from('.about-cta-inner > *', { autoAlpha: 0, y: 28, duration: 0.9, ease: 'power3.out', stagger: 0.12, scrollTrigger: st('.about-cta-inner', 'top 82%') });
    });

    const start = () => { if (intro) intro.play(); ScrollTrigger.refresh(); };
    const loaderShowing = document.querySelector('.loader');
    let fallback;
    if (loaderShowing) {
      document.addEventListener('onepixel:loader-complete', start, { once: true });
      fallback = setTimeout(start, 4000);
    } else {
      start();
    }

    return () => {
      document.removeEventListener('onepixel:loader-complete', start);
      if (fallback) clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <EntryLoader mark="AERIUM" />
      <OpxBar />
      <div className="wire about">
        <Nav />

        {/* hero — text forward, lots of room */}
        <section className="about-hero">
          <div className="eyebrow">About AERIUM <Plus /></div>
          <h1 className="about-hero-title">The uniform for a new generation.</h1>
          <p className="about-hero-lead">
            We make technical clothing for the way people actually move through a city. Considered
            design, honest materials, and a point of view shaped by the culture we come from.
          </p>
        </section>

        <div className="about-hero-img">
          <img src={IMG + 'about-hero.webp'} alt="An AERIUM model in motion in technical outerwear" />
        </div>

        {/* why we exist — sticky heading + relaxed body */}
        <section className="about-intro">
          <h2 className="about-intro-h">Why we<br />exist</h2>
          <div className="about-intro-body">
            <p>
              AERIUM started in 2024 around a simple idea. Everyday clothing should be built with the
              same intention as technical gear. Pieces that hold their shape, move with you, and still
              feel right years later.
            </p>
            <p>
              We are not interested in chasing every season. We build a considered system you can live
              in, then refine it slowly. Fewer things, made better, worn longer. That is the whole plan.
            </p>
          </div>
        </section>

        {/* editorial image pair — both portrait so they downscale (stay sharp) into the boxes */}
        <div className="about-duo">
          <figure><img src={IMG + 'shop-look-1.webp'} alt="AERIUM styled look" loading="lazy" /></figure>
          <figure><img src={IMG + 'shop-look-4.webp'} alt="AERIUM styled look" loading="lazy" /></figure>
        </div>

        {/* manifesto band */}
        <section className="about-band">
          <img src={IMG + 'manifesto.webp'} alt="" aria-hidden="true" />
          <div className="about-band-inner">
            <div className="about-band-label">Our Manifesto</div>
            <p className="about-band-quote">Design with intention. Build to last. Move with culture.</p>
          </div>
        </section>

        {/* values */}
        <section className="about-values">
          <div className="about-values-head">
            <div className="eyebrow">What we believe <Plus /></div>
            <h2 className="about-values-title">Four things we never compromise on.</h2>
          </div>
          <div className="about-values-grid">
            {VALUES.map(([n, t, d]) => (
              <div key={n} className="about-value">
                <div className="about-value-n">{n}</div>
                <h3 className="about-value-t">{t}</h3>
                <p className="about-value-d">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* craft */}
        <section className="about-craft">
          <div className="about-craft-img">
            <img src={IMG + 'vortex-fabric.webp'} alt="Close-up of AERIUM heavyweight cotton" />
          </div>
          <div className="about-craft-copy">
            <div className="eyebrow">The Craft <Plus /></div>
            <h2 className="about-craft-title">The details you feel, not just see.</h2>
            <p>
              We obsess over the parts most brands skip. Heavyweight cotton that softens with wear.
              Seams that sit flat. Hardware that still works after a hundred washes. Good clothing is
              quiet about how much thought went into it.
            </p>
            <ul className="about-craft-list">
              {CRAFT.map((c) => <li key={c}><Plus /> {c}</li>)}
            </ul>
          </div>
        </section>

        {/* stats */}
        <section className="about-stats">
          {STATS.map(([n, l]) => (
            <div key={l} className="about-stat">
              <div className="about-stat-n">{n}</div>
              <div className="about-stat-l">{l}</div>
            </div>
          ))}
        </section>

        {/* culture gallery */}
        <section className="about-gallery">
          <div className="about-gallery-head">
            <h2 className="about-gallery-title">Built by the culture.</h2>
            <p className="about-gallery-sub">The community that wears it, on their own terms.</p>
          </div>
          <div className="about-gallery-grid">
            {GALLERY.map((src, i) => (
              <img key={i} src={src} alt="AERIUM community" loading="lazy" />
            ))}
          </div>
          <p className="about-gallery-cap">Tag <b>@aerium.official</b> to be featured.</p>
        </section>

        {/* cta band */}
        <section className="about-cta">
          <img src={IMG + 'adaptive.webp'} alt="" aria-hidden="true" />
          <div className="about-cta-inner">
            <div className="eyebrow">SS26 Collection <Plus /></div>
            <h2 className="about-cta-title">Step into the<br />Next Wave.</h2>
            <a className="btn btn-solid" href={SHOP}>Explore the Collection <Arrow /></a>
          </div>
        </section>

        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
