import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader } from '../../src/Loader.jsx';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  ['01', 'Rajasthan', '700 MW', 'Bikaner Solar Park', '27.2330 N / 73.8050 E', 'Jan 2025', '/case-studies/karya/images/project-bikaner.webp'],
  ['02', 'Gujarat', '250 MW', 'Kutch Solar Project', '23.7537 N / 69.8597 E', 'Nov 2024', '/case-studies/karya/images/project-kutch.webp'],
  ['03', 'Karnataka', '200 MW', 'Shakti Solar Project', '15.4062 N / 75.9064 E', 'Sep 2024', '/case-studies/karya/images/project-karnataka.webp'],
  ['04', 'Telangana', '150 MW', 'Vanaparthy Solar Plant', '16.3650 N / 78.0560 E', 'Jun 2024', '/case-studies/karya/images/project-telangana.webp'],
];

const assemblySteps = [
  ['01', 'Foundations', 'Driven piles and concrete bases sized for local soil, wind and terrain.'],
  ['02', 'Tracker structure', 'Galvanized single-axis structures keep every module facing productive light.'],
  ['03', 'PV modules', 'High-efficiency bifacial modules convert Indian irradiance into direct current.'],
  ['04', 'Power conversion', 'Combiner boxes, inverters and transformers condition power for the grid.'],
  ['05', 'Grid intelligence', 'Cabling, protection and controls deliver monitored, dependable output.'],
];

const performance = [
  ['Plant availability', '98.6%'],
  ['Performance ratio', '82%+'],
  ['Degradation / year', '< 2%'],
  ['Design life', '25+ years'],
];

const impact = [
  ['18.7 TWh+', 'Clean energy generated'],
  ['13.6 Mn+', 'Tonnes CO2 avoided'],
  ['41,200+', 'Homes powered annually'],
  ['22,000+', 'Jobs supported across value chain'],
  ['98.6%', 'Uptime achieved'],
];

const sunWindow = {
  sunrise: 5 * 60 + 42,
  sunset: 19 * 60 + 14,
};

const sunPath = {
  startX: 2,
  endX: 98,
  baselineY: 78,
  riseY: 50,
};

function Arrow() {
  return <span aria-hidden="true">-&gt;</span>;
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function useSunPosition() {
  const getPosition = () => {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const rawProgress = (minutes - sunWindow.sunrise) / (sunWindow.sunset - sunWindow.sunrise);
    const progress = Math.min(1, Math.max(0, rawProgress));
    const angle = Math.PI * progress;
    const x = sunPath.startX + ((sunPath.endX - sunPath.startX) * progress);
    const y = sunPath.baselineY - (Math.sin(angle) * sunPath.riseY);

    return {
      progress,
      x,
      y,
      currentTime: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const [position, setPosition] = useState(getPosition);

  useEffect(() => {
    const timer = window.setInterval(() => setPosition(getPosition()), 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return position;
}

function ImageBox({ label, note, className = '', src }) {
  return (
    <div className={`image-box ${src ? 'has-image' : ''} ${className}`} role={src ? undefined : 'img'} aria-label={src ? undefined : `${label} image placeholder`}>
      {src ? (
        <img src={src} alt={label} loading={className.includes('hero-media') ? 'eager' : 'lazy'} />
      ) : (
        <>
          <span className="image-cross image-cross-a" />
          <span className="image-cross image-cross-b" />
          <div className="image-box-label">
            <span>Image</span>
            <strong>{label}</strong>
            {note && <small>{note}</small>}
          </div>
        </>
      )}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="atlas-header">
      <a className="atlas-brand" href="#top">Karya S<span>o</span>lar</a>
      <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open}>
        <i /><i /><span className="sr-only">Toggle navigation</span>
      </button>
      <nav className={open ? 'atlas-nav is-open' : 'atlas-nav'} onClick={() => setOpen(false)}>
        <a href="#atlas">Atlas</a>
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
      </nav>
      <p className="header-coordinate">Made in India<br />25.1025 N / 72.5724 E</p>
    </header>
  );
}

function Hero() {
  return (
    <section className="atlas-hero" id="top">
      <ImageBox label="Aerial view of Karya Solar's Rajasthan utility-scale solar farm" className="hero-media" src="/case-studies/karya/images/hero-rajasthan.webp" />
      <Header />
      <p className="vertical-label">Solar infrastructure</p>
      <article className="hero-statement reveal">
        <div className="hero-scale"><span>26</span><span>24</span><span>22</span><span>20</span></div>
        <div className="hero-copy">
          <p className="mono-label">The energy atlas</p>
          <h1>India,<br />turned<br />toward<br />the sun<span>.</span></h1>
          <p className="hero-summary">Solar infrastructure that powers growth for generations.</p>
          <a href="#atlas" className="scroll-link"><i /> Scroll to explore</a>
        </div>
        <footer><span>Project 01 / Rajasthan</span><span>27.2330 N / 73.8050 E</span></footer>
      </article>
      <div className="hero-stats">
        <span>Capacity under management<strong>1.8 GW+</strong></span>
        <span>Projects<strong>23</strong></span>
        <span>States<strong>8</strong></span>
      </div>
    </section>
  );
}

function Manifesto() {
  const sunPosition = useSunPosition();
  const leftPrinciples = [
    ['01', 'Long-term thinking', 'Built for 25+ years of consistent performance.'],
    ['02', 'Engineering excellence', 'Designed for Indian conditions. Engineered in India.'],
  ];
  const rightPrinciples = [
    ['03', 'Responsible growth', 'Land, community and environment at the core.'],
    ['04', 'Operational discipline', 'Measured every day so output stays dependable.'],
  ];

  return (
    <section className="manifesto atlas-section" id="atlas">
      <div className="manifesto-head reveal">
        <p className="mono-label">Our manifesto</p>
        <h2>Light becomes load<span>.</span></h2>
        <p>We design, build and operate utility-scale solar systems that deliver reliable, affordable power every day, for decades.</p>
      </div>
      <ol className="principles principles-left reveal">
        {leftPrinciples.map(([number, title, copy]) => (
          <li key={title}><span>{number}</span><div><strong>{title}</strong><p>{copy}</p></div></li>
        ))}
      </ol>
      <div
        className="sun-path"
        aria-label={`Live sun path from sunrise at 05:42 to sunset at 19:14. Current local time ${sunPosition.currentTime}.`}
      >
        <svg className="sun-arc" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M 2 78 A 48 50 0 0 1 98 78" />
        </svg>
        <span
          className="sun sun-live"
          style={{ left: `${sunPosition.x}%`, top: `${sunPosition.y}%` }}
          data-progress={sunPosition.progress}
          aria-hidden="true"
        >
          <SunIcon />
        </span>
        <div className="time sunrise">Sunrise<br />05:42</div>
        <div className="time sunset">Sunset<br />19:14</div>
        <footer><b>E</b><span /><b>W</b></footer>
      </div>
      <ol className="principles principles-right reveal">
        {rightPrinciples.map(([number, title, copy]) => (
          <li key={title}><span>{number}</span><div><strong>{title}</strong><p>{copy}</p></div></li>
        ))}
      </ol>
    </section>
  );
}

function Projects() {
  return (
    <section className="projects atlas-section" id="projects">
      <div className="section-heading">
        <p className="mono-label">The atlas / Projects</p>
        <a href="#operations">View all projects <Arrow /></a>
      </div>
      <div className="project-grid">
        {projects.map(([number, state, capacity, name, coordinate, date, image], i) => (
          <article className={`project-card reveal${i === 0 ? ' project-card-feature' : ''}`} key={name}>
            <ImageBox label={`Aerial view of the ${name} in ${state}`} src={image} />
            <div className="project-place"><span>{number}</span><strong>{state}</strong></div>
            <div className="project-info">
              <h3>{capacity}</h3>
              <p>{name}</p>
              <small>{coordinate}</small>
              <footer><span>COD: {date}</span><span className="online"><i /> Online</span></footer>
            </div>
          </article>
        ))}
        <a className="project-more reveal" href="#contact">
          <span>05</span>
          <strong>And<br />building</strong>
          <Arrow />
          <i />
        </a>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section className="technology atlas-section" id="technology">
      <div className="technology-sticky">
        <div className="technology-head">
          <p className="mono-label">Engineered to perform</p>
          <h2>Built in layers. Built to last<span>.</span></h2>
        </div>

        <div className="technology-row">
        <div className="technology-copy">
          <ol>
            {assemblySteps.map(([number, title, copy]) => (
              <li className="technology-step" key={title}>
                <span>{number}</span>
                <div><strong>{title}</strong><p>{copy}</p></div>
              </li>
            ))}
          </ol>
        </div>

        <div className="assembly-stage" aria-label="A solar power block assembling layer by layer">
          <div className="assembly-grid" aria-hidden="true" />
          <video
            className="assembly-video"
            poster="/case-studies/karya/video/solar-assembly-poster.jpg"
            preload="metadata"
            muted
            playsInline
            aria-label="Utility-scale solar power block assembling from foundations to grid connection"
          >
            <source src="/case-studies/karya/video/solar-assembly-mobile.mp4?v=20260626-mobile" type="video/mp4" media="(max-width: 900px)" />
            <source src="/case-studies/karya/video/solar-assembly-scroll.mp4?v=20260626-scrub" type="video/mp4" />
          </video>
          <div className="assembly-labels" aria-hidden="true">
            {assemblySteps.map(([number, title]) => (
              <span className="assembly-label" key={title}>{number} / {title}</span>
            ))}
          </div>
          <div className="assembly-progress" aria-hidden="true"><i /></div>
        </div>

        <div className="performance">
          {performance.map(([label, value]) => (
            <div key={label}><span>+</span><p>{label}<strong>{value}</strong></p></div>
          ))}
          <footer>Quality. Every layer.<br />Performance. Every day.</footer>
        </div>
        </div>
      </div>
    </section>
  );
}

function Operations() {
  return (
    <>
      <section className="operations-map" id="operations">
        <div className="map-copy reveal">
          <p className="mono-label">Where we operate</p>
          <h2>Mapped.<br />Measured.<br />Managed<span>.</span></h2>
          <p>From the Thar to the Deccan, our assets are sited for irradiance, grid access and long-term value.</p>
          <div className="map-key"><span><i /> Operational</span><span><i /> Under construction</span></div>
        </div>
        <ImageBox label="Map of Karya Solar projects across India" className="map-media reveal" src="/case-studies/karya/images/operations-india.webp" />
        <div className="map-stats reveal">
          <span>States<strong>8</strong></span>
          <span>Operational capacity<strong>1.2 GW+</strong></span>
          <span>Pipeline capacity<strong>2.6 GW+</strong></span>
          <span>Solar irradiance<strong>4.5 - 6.0</strong><small>kWh/m2/day</small></span>
        </div>
      </section>
      <section className="fieldwork atlas-section">
        <div className="fieldwork-head reveal">
          <p className="mono-label">Engineering & maintenance</p>
          <p className="fieldwork-note">People. Processes. Performance.</p>
        </div>
        <div className="fieldwork-grid">
          <div className="fieldwork-phrase reveal">
            <h2>Human<br />intelligence<span>.</span></h2>
          </div>
          <article className="field-card reveal">
            <ImageBox label="Engineering at a Karya Solar site" note="Indian solar operations team" src="/case-studies/karya/images/field-engineering.webp" />
            <div><strong>Engineering</strong><p>In-house design, yield modelling and detailed engineering.</p></div>
          </article>
          <div className="fieldwork-phrase reveal">
            <h2>Machine<br />precision<span>.</span></h2>
          </div>
          <article className="field-card reveal">
            <ImageBox label="Maintenance at a Karya Solar site" note="Indian solar operations team" src="/case-studies/karya/images/field-maintenance.webp" />
            <div><strong>Maintenance</strong><p>Preventive maintenance programs for maximum uptime.</p></div>
          </article>
        </div>
      </section>
    </>
  );
}

function Impact() {
  const [feature, ...rest] = impact;
  return (
    <section className="impact" id="impact">
      <div className="impact-head reveal">
        <p className="mono-label">Impact ledger</p>
        <h2>Energy that<br />transforms<span>.</span></h2>
        <p className="impact-note">Numbers as of Apr 2026.<br />Continuously improving.</p>
      </div>
      <div className="impact-ledger reveal">
        <div className="impact-feature">
          <span className="impact-feature-tag">{feature[1]}</span>
          <strong>{feature[0]}</strong>
        </div>
        <div className="impact-rest">
          {rest.map(([value, label]) => (
            <div className="impact-stat" key={label}>
              <span>+</span>
              <strong>{value}</strong>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <>
      <section className="closing" id="contact">
        <ImageBox label="Karya Solar arrays stretching toward the horizon at dusk" className="closing-media" src="/case-studies/karya/images/closing-horizon.webp" />
        <div className="closing-copy reveal">
          <p className="mono-label">The next terawatt</p>
          <h2>Let's build<br />what's next<span>.</span></h2>
          <p>Partner with India's solar infrastructure company.</p>
          <a href="mailto:info@karyasolar.com">Start a conversation <Arrow /></a>
        </div>
        <p className="closing-coordinate">23.0225 N<br />72.5714 E</p>
      </section>
      <footer className="atlas-footer" id="about">
        <div><a className="atlas-brand" href="#top">Karya S<span>o</span>lar</a><small>© 2026 Karya Solar. All rights reserved.</small></div>
        <div><strong>Atlas</strong><a href="#atlas">Overview</a><a href="#projects">Projects</a><a href="#technology">Technology</a><a href="#operations">Operations</a></div>
        <div><strong>Company</strong><a href="#about">About us</a><a href="#about">Leadership</a><a href="#about">Careers</a><a href="#about">Newsroom</a></div>
        <div><strong>Connect</strong><a href="mailto:info@karyasolar.com">info@karyasolar.com</a><a href="tel:+91912345678">+91 79 1234 5678</a></div>
        <a className="back-link" href="/">Back to OnePixel <Arrow /></a>
      </footer>
    </>
  );
}

function OpxBar() {
  return (
    <div className="atlas-opx">
      <span className="atlas-opx-note">A OnePixel sample site · figures and projects shown are placeholder</span>
      <a className="atlas-opx-back" href="/">← Back to OnePixel</a>
    </div>
  );
}

export default function App() {
  const root = useRef(null);
  // ?still freezes the page for a clean full-page screenshot (see the layout effect below)
  // and skips the intro loader so captures aren't covered by it.
  const still = new URLSearchParams(window.location.search).has('still');

  // Staggered blur-up reveal as sections enter view. JS-gated via .js-reveal
  // and reduced-motion safe: if JS is off or motion is reduced, the hidden
  // state never applies and every .reveal stays fully visible.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!els.length) return;
    document.documentElement.classList.add('js-reveal');
    els.forEach((el) => {
      const sibs = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal'))
        : [el];
      const i = sibs.indexOf(el);
      if (i > 0) el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
    return () => { io.disconnect(); document.documentElement.classList.remove('js-reveal'); };
  }, []);

  useLayoutEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // ?still shares the reduced-motion path: no pin, no scrub, the assembly video parked on its
    // final assembled frame and the sun resting on the arc, so capturing never needs OS settings.

    if (reduce || still) {
      const liveSun = root.current?.querySelector('.sun-live');
      const arcPath = root.current?.querySelector('.sun-arc path');
      if (liveSun && arcPath) {
        // A still capture parks the sun at the arc apex (solar noon, 0.5) so the shot is balanced
        // and deterministic whatever the time of capture. Reduced-motion keeps the true live position.
        const progress = still ? 0.5 : Math.min(1, Math.max(0, Number(liveSun.dataset.progress) || 0));
        const point = arcPath.getPointAtLength(arcPath.getTotalLength() * progress);
        liveSun.style.left = `${point.x}%`;
        liveSun.style.top = `${point.y}%`;
      }

      const video = root.current?.querySelector('.assembly-video');
      // The five stage labels stack on one spot and are normally revealed one at a time by the
      // scrub timeline. With no timeline running they pile up, so show only the final stage.
      const labels = root.current ? Array.from(root.current.querySelectorAll('.assembly-label')) : [];
      labels.forEach((label, index) => { label.style.opacity = index === labels.length - 1 ? '1' : '0'; });
      if (video) {
        const showAssembled = () => {
          try { video.currentTime = Math.max(0, (video.duration || 9.9) - 0.04); } catch (error) { /* metadata not ready yet */ }
        };
        if (video.readyState >= 1) showAssembled();
        else video.addEventListener('loadedmetadata', showAssembled, { once: true });
      }
      return undefined;
    }

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.from('.atlas-header > *', {
        y: -16,
        opacity: 0,
        duration: 0.75,
        stagger: 0.06,
        ease: 'power3.out',
      });
      gsap.from('.hero-stats', { opacity: 0, duration: 0.8, delay: 0.55 });

      // .reveal elements are handled by the CSS + IntersectionObserver system
      // (html.js-reveal .reveal -> .is-in). GSAP must not also animate their
      // opacity/transform, or its inline styles clobber the CSS reveal and the
      // elements get stuck invisible.

      gsap.utils.toArray('.energy-line').forEach((line) => {
        if (line.classList.contains('technology-line')) return;
        gsap.from(line, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.4,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: line, start: 'top 88%', once: true },
        });
      });

      const liveSun = root.current?.querySelector('.sun-live');
      if (liveSun) {
        const arcPath = root.current?.querySelector('.sun-arc path');
        if (!arcPath) return;

        const finalProgress = Math.min(1, Math.max(0, Number(liveSun.dataset.progress) || 0));
        const arcLength = arcPath.getTotalLength();
        const sunPlayhead = { progress: 0 };
        const setSunOnArc = () => {
          const point = arcPath.getPointAtLength(arcLength * sunPlayhead.progress);
          liveSun.style.left = `${point.x}%`;
          liveSun.style.top = `${point.y}%`;
        };
        const sunTimeline = gsap.timeline({
          scrollTrigger: { trigger: '.manifesto', start: 'top 72%', once: true },
        });

        setSunOnArc();

        sunTimeline
          .fromTo('.sun-arc path',
            { opacity: 0, strokeDashoffset: 48 },
            { opacity: 1, strokeDashoffset: 0, duration: 1.15, ease: 'power2.out' },
            0)
          .fromTo('.sun-path footer span',
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1.05, ease: 'power2.inOut' },
            0.08)
          .fromTo('.sun-path footer b, .sun-path .time',
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: 'power2.out' },
            0.26)
          .fromTo(liveSun,
            { opacity: 0, scale: 0.78 },
            { opacity: 1, scale: 1, duration: 0.38, ease: 'power2.out' },
            0.18)
          .to(sunPlayhead, {
            progress: finalProgress,
            duration: 2.62,
            ease: 'power2.inOut',
            onUpdate: setSunOnArc,
          }, 0.18);
      }

      const compactMotion = window.matchMedia('(max-width: 720px)').matches;

      gsap.utils.toArray('.image-box.has-image:not(.hero-media)').forEach((box) => {
        const image = box.querySelector('img');
        if (compactMotion) {
          gsap.from(box, {
            y: 16,
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: { trigger: box, start: 'top 90%', once: true },
          });
        } else {
          gsap.fromTo(box,
            { clipPath: 'inset(8% 0% 8% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.1,
              ease: 'power3.out',
              scrollTrigger: { trigger: box, start: 'top 88%', once: true },
            });
        }

        if (!compactMotion && image && !box.classList.contains('map-media') && !box.classList.contains('closing-media')) {
          gsap.fromTo(image,
            { scale: 1.08 },
            {
              scale: 1,
              duration: 1.25,
              ease: 'power3.out',
              scrollTrigger: { trigger: box, start: 'top 88%', once: true },
            });
        }
      });

      media.add('(min-width: 901px)', () => {
        gsap.to('.hero-media img', {
          yPercent: 8,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: '.atlas-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.utils.toArray('.project-card, .field-card').forEach((card) => {
          const image = card.querySelector('.image-box img');
          if (!image) return;

          gsap.to(image, {
            yPercent: -7,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.7,
            },
          });
        });

        gsap.to('.closing-media img', {
          yPercent: -6,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: '.closing',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      });

      const buildAssemblyTimeline = (scrollTrigger) => {
        const video = root.current?.querySelector('.assembly-video');
        if (!video) return null;

        const steps = gsap.utils.toArray('.technology-step');
        const labels = gsap.utils.toArray('.assembly-label');
        const playhead = { time: 0 };
        const duration = 9.9;
        const frameRate = 24;
        const stageTimes = [0, 1.25, 3.45, 6.1, 8.05];
        const introDuration = 1.25;
        let targetFrame = 0;
        let renderedFrame = -1;
        let seekFrame = 0;
        const timeline = gsap.timeline({
          scrollTrigger,
        });

        video.pause();
        const renderVideoFrame = () => {
          seekFrame = 0;
          if (video.readyState > 0 && targetFrame !== renderedFrame) {
            renderedFrame = targetFrame;
            video.currentTime = targetFrame / frameRate;
          }
        };
        const primeVideo = () => {
          if (video.readyState > 0) video.currentTime = 0.001;
        };
        video.addEventListener('loadedmetadata', primeVideo, { once: true });
        primeVideo();

        // Heading is revealed by its own on-enter trigger (see media.add below), not the
        // scrub, so it shows first instead of leaving a blank pinned screen.
        gsap.set(steps, { opacity: 0, y: 12 });
        gsap.set('.assembly-grid', { opacity: 0, scale: 0.96 });
        gsap.set(video, { opacity: 0, y: 30, scale: 0.96 });
        gsap.set('.assembly-label', { opacity: 0 });
        gsap.set('.assembly-progress', { opacity: 0 });
        gsap.set('.assembly-progress i', { scaleX: 0, transformOrigin: 'left center' });
        gsap.set('.performance > div, .performance footer', { opacity: 0, x: 18 });

        timeline
          .to('.assembly-grid', { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }, 0)
          .to(video, { opacity: 1, y: 0, scale: 1, duration: 0.62, ease: 'power2.out' }, 0.2)
          .to('.assembly-progress', { opacity: 1, duration: 0.25 }, 0.5);

        timeline.to(playhead, {
          time: duration,
          duration,
          ease: 'none',
          onUpdate: () => {
            targetFrame = Math.round(playhead.time * frameRate);
            if (!seekFrame) seekFrame = window.requestAnimationFrame(renderVideoFrame);
          },
        }, introDuration);

        stageTimes.forEach((time, index) => {
          const position = introDuration + time;
          timeline
            .to(steps, { opacity: 0.22, y: 0, duration: 0.16 }, position)
            .to(steps[index], { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }, position)
            .to(labels, { opacity: 0, y: -5, duration: 0.12 }, position)
            .fromTo(labels[index], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, position + 0.04)
            .to('.assembly-progress i', { scaleX: (index + 1) / stageTimes.length, duration: 0.5, ease: 'power2.inOut' }, position);
        });

        timeline
          .to(steps, { opacity: 0.62, duration: 0.35 }, introDuration + 9.5)
          .to(labels, { opacity: 0, duration: 0.2 }, introDuration + 9.62);

        // Reveal the performance stats one at a time as the user scrolls, spread across
        // the scrub, rather than all at once near the end.
        const perfItems = gsap.utils.toArray('.performance > div');
        const perfTimes = [1.6, 3.4, 5.2, 7.0];
        perfItems.forEach((item, i) => {
          timeline.to(item, { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' },
            introDuration + (perfTimes[i] ?? (1.6 + i * 1.8)));
        });
        timeline.to('.performance footer', { opacity: 1, x: 0, duration: 0.55, ease: 'power2.out' }, introDuration + 8.7);

        return () => {
          video.removeEventListener('loadedmetadata', primeVideo);
          if (seekFrame) window.cancelAnimationFrame(seekFrame);
        };
      };

      const buildMobileAssemblyReveal = () => {
        const video = root.current?.querySelector('.assembly-video');
        const steps = gsap.utils.toArray('.technology-step');
        if (!video) return null;

        video.pause();
        gsap.set('.technology-head .mono-label, .technology-head h2', { opacity: 0, y: 20 });
        gsap.set(steps, { opacity: 0, y: 12 });
        gsap.set('.assembly-grid', { opacity: 0, scale: 0.98 });
        gsap.set(video, { opacity: 0, y: 18, scale: 0.98 });
        gsap.set('.assembly-label', { opacity: 0 });
        gsap.set('.assembly-progress', { opacity: 0 });
        gsap.set('.assembly-progress i', { scaleX: 0, transformOrigin: 'left center' });
        gsap.set('.performance > div, .performance footer', { opacity: 0, y: 12 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.technology',
            start: 'top 78%',
            once: true,
            onEnter: () => {
              try {
                video.currentTime = 0;
              } catch (error) {
                // Metadata may not be ready on slower mobile connections; playback can still start normally.
              }
              video.play().catch(() => {});
            },
          },
        });

        timeline
          .to('.technology-head .mono-label', { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }, 0)
          .to('.technology-head h2', { opacity: 1, y: 0, duration: 0.48, ease: 'power3.out' }, 0.1)
          .to(steps, { opacity: 1, y: 0, duration: 0.38, stagger: 0.06, ease: 'power2.out' }, 0.24)
          .to('.assembly-grid', { opacity: 1, scale: 1, duration: 0.36, ease: 'power2.out' }, 0.28)
          .to(video, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }, 0.34)
          .to('.assembly-progress', { opacity: 1, duration: 0.2 }, 0.64)
          .to('.assembly-progress i', { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0.76)
          .to('.performance > div', { opacity: 1, y: 0, duration: 0.34, stagger: 0.06, ease: 'power2.out' }, 0.9)
          .to('.performance footer', { opacity: 1, y: 0, duration: 0.34, ease: 'power2.out' }, 1.18);

        return () => video.pause();
      };

      media.add('(min-width: 901px)', () => {
        // Reveal the heading the moment the section enters view — before it pins and
        // independent of the scrub — so it shows first and the pinned screen is never blank.
        gsap.set('.technology-head .mono-label, .technology-head h2', { opacity: 0, y: 24 });
        gsap.timeline({ scrollTrigger: { trigger: '.technology', start: 'top 78%', once: true } })
          .to('.technology-head .mono-label', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0)
          .to('.technology-head h2', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.12);

        return buildAssemblyTimeline({
          trigger: '.technology',
          start: 'top top',
          end: '+=3800',
          pin: '.technology-sticky',
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });
      });
      media.add('(max-width: 900px)', () => {
        return buildMobileAssemblyReveal();
      });
    }, root);

    // The intro loader locks scroll while it plays; recompute trigger positions once it lifts.
    const onLoaderDone = () => ScrollTrigger.refresh();
    document.addEventListener('onepixel:loader-complete', onLoaderDone);

    return () => {
      document.removeEventListener('onepixel:loader-complete', onLoaderDone);
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <>
      {!still && <Loader duration={2500} mark="Karya Solar" />}
      <OpxBar />
      <main ref={root}>
        <Hero />
        <Manifesto />
        <Projects />
        <Technology />
        <Operations />
        <Impact />
        <Closing />
      </main>
    </>
  );
}
