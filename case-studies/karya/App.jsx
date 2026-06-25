import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  ['01', 'Rajasthan', '700 MW', 'Bikaner Solar Park', '27.2330 N / 73.8050 E', 'Jan 2025'],
  ['02', 'Gujarat', '250 MW', 'Kutch Solar Project', '23.7537 N / 69.8597 E', 'Nov 2024'],
  ['03', 'Karnataka', '200 MW', 'Shakti Solar Project', '15.4062 N / 75.9064 E', 'Sep 2024'],
  ['04', 'Telangana', '150 MW', 'Vanaparthy Solar Plant', '16.3650 N / 78.0560 E', 'Jun 2024'],
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

function Arrow() {
  return <span aria-hidden="true">-&gt;</span>;
}

function ImageBox({ label, note, className = '' }) {
  return (
    <div className={`image-box ${className}`} role="img" aria-label={`${label} image placeholder`}>
      <span className="image-cross image-cross-a" />
      <span className="image-cross image-cross-b" />
      <div className="image-box-label">
        <span>Image</span>
        <strong>{label}</strong>
        {note && <small>{note}</small>}
      </div>
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
        <a href="#technology">Technology</a>
        <a href="#operations">Operations</a>
        <a href="#impact">Impact</a>
        <a href="#about">About</a>
      </nav>
      <p className="header-coordinate">Engineered in India<br />25.1025 N / 72.5724 E</p>
      <span className="compass" aria-hidden="true">+</span>
    </header>
  );
}

function Hero() {
  return (
    <section className="atlas-hero" id="top">
      <ImageBox label="Aerial solar atlas" note="Full-bleed utility-scale solar farm" className="hero-media" />
      <Header />
      <p className="vertical-label">Solar infrastructure</p>
      <article className="hero-statement reveal">
        <div className="hero-scale"><span>26</span><span>24</span><span>22</span><span>20</span></div>
        <div className="hero-copy">
          <p className="mono-label">The energy atlas</p>
          <h1>India,<br />turned<br />toward<br />the sun<span>.</span></h1>
          <p className="hero-summary">Solar infrastructure that powers growth for generations.</p>
          <a href="#atlas" className="scroll-link"><i /> Scroll to explore <b /></a>
        </div>
        <footer><span>Project 01 / Rajasthan</span><span>27.2330 N / 73.8050 E</span></footer>
      </article>
      <div className="hero-annotation">
        <span>02</span>
        <p>Built for<br />high irradiance.<br />Built to last.</p>
      </div>
      <div className="hero-stats">
        <span>Capacity under management<strong>1.8 GW+</strong></span>
        <span>Projects<strong>23</strong></span>
        <span>States<strong>8</strong></span>
      </div>
      <div className="energy-line hero-line"><i /><b /><em /></div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="manifesto atlas-section" id="atlas">
      <div className="manifesto-title reveal">
        <p className="mono-label">Our manifesto</p>
        <h2>Light<br />becomes<br />load<span>.</span></h2>
      </div>
      <div className="manifesto-center reveal">
        <p>We design, build and operate utility-scale solar systems that deliver reliable, affordable power every day, for decades.</p>
        <div className="sun-path" aria-label="Sun path from sunrise to sunset">
          <span className="sun sun-left">+</span>
          <span className="sun sun-high">+</span>
          <span className="sun sun-right">+</span>
          <i />
          <div className="time sunrise">Sunrise<br />05:42</div>
          <div className="time noon">Solar noon<br />12:20</div>
          <div className="time sunset">Sunset<br />19:14</div>
          <footer><b>E</b><span /><b>W</b></footer>
        </div>
      </div>
      <ol className="principles reveal">
        <li><span>01</span><div><strong>Long-term thinking</strong><p>Built for 25+ years of consistent performance.</p></div></li>
        <li><span>02</span><div><strong>Engineering excellence</strong><p>Designed for Indian conditions. Engineered in India.</p></div></li>
        <li><span>03</span><div><strong>Responsible growth</strong><p>Land, community and environment at the core.</p></div></li>
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
        {projects.map(([number, state, capacity, name, coordinate, date]) => (
          <article className="project-card reveal" key={name}>
            <ImageBox label={`${state} project`} note="Aerial site photography" />
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
        <div className="technology-copy">
          <p className="mono-label">Engineered to perform</p>
          <h2>Built in layers.<br />Built to last<span>.</span></h2>
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
            preload="auto"
            muted
            playsInline
            aria-label="Utility-scale solar power block assembling from foundations to grid connection"
          >
            <source src="/case-studies/karya/video/solar-assembly-alpha.webm" type="video/webm" />
            <source src="/case-studies/karya/video/solar-assembly-scroll.mp4" type="video/mp4" />
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
        <div className="energy-line technology-line"><i /><b /><em /></div>
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
        <ImageBox label="India operations map" note="State-level project locations and capacity" className="map-media reveal" />
        <div className="map-stats reveal">
          <span>States<strong>8</strong></span>
          <span>Operational capacity<strong>1.2 GW+</strong></span>
          <span>Pipeline capacity<strong>2.6 GW+</strong></span>
          <span>Solar irradiance<strong>4.5 - 6.0</strong><small>kWh/m2/day</small></span>
        </div>
      </section>
      <section className="fieldwork atlas-section">
        <div className="fieldwork-title reveal">
          <p className="mono-label">Engineering & maintenance</p>
          <h2>Human<br />intelligence.<br />Machine<br />precision<span>.</span></h2>
        </div>
        <div className="fieldwork-grid">
          {[
            ['Engineering', 'In-house design, yield modelling and detailed engineering.'],
            ['Monitoring', '24/7 remote monitoring and AI-driven analysis.'],
            ['Maintenance', 'Preventive maintenance programs for maximum uptime.'],
          ].map(([title, copy]) => (
            <article className="field-card reveal" key={title}>
              <ImageBox label={title} note="Indian solar operations team" />
              <div><strong>{title}</strong><p>{copy}</p></div>
            </article>
          ))}
        </div>
        <p className="fieldwork-note reveal">People.<br />Processes.<br />Performance.</p>
      </section>
    </>
  );
}

function Impact() {
  return (
    <section className="impact" id="impact">
      <div className="impact-title reveal">
        <p className="mono-label">Impact ledger</p>
        <h2>Energy that<br />transforms<span>.</span></h2>
      </div>
      <div className="impact-grid">
        {impact.map(([value, label]) => (
          <div className="impact-stat reveal" key={label}>
            <span>+</span>
            <strong>{value}</strong>
            <p>{label}</p>
          </div>
        ))}
      </div>
      <p className="impact-note">Numbers as of Apr 2026.<br />Continuously improving.</p>
    </section>
  );
}

function Closing() {
  return (
    <>
      <section className="closing" id="contact">
        <ImageBox label="Solar horizon at dusk" note="Wide cinematic closing image" className="closing-media" />
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

export default function App() {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      gsap.from('.atlas-header > *', {
        y: -16,
        opacity: 0,
        duration: 0.75,
        stagger: 0.06,
        ease: 'power3.out',
      });
      gsap.from('.hero-statement', { y: 35, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
      gsap.from('.hero-annotation, .hero-stats', { opacity: 0, duration: 0.8, delay: 0.55, stagger: 0.12 });

      gsap.utils.toArray('.reveal').forEach((element) => {
        gsap.from(element, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        });
      });

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

      const buildAssemblyTimeline = (scrollTrigger) => {
        const video = root.current?.querySelector('.assembly-video');
        if (!video) return null;

        const steps = gsap.utils.toArray('.technology-step');
        const labels = gsap.utils.toArray('.assembly-label');
        const playhead = { time: 0 };
        const duration = 9.9;
        const stageTimes = [0, 1.25, 3.45, 6.1, 8.05];
        const introDuration = 1.25;
        const timeline = gsap.timeline({
          scrollTrigger,
        });

        video.pause();
        const primeVideo = () => {
          if (video.readyState > 0) video.currentTime = 0.001;
        };
        video.addEventListener('loadedmetadata', primeVideo, { once: true });
        primeVideo();

        gsap.set('.technology-copy .mono-label, .technology-copy h2', { opacity: 0, y: 24 });
        gsap.set(steps, { opacity: 0, y: 12 });
        gsap.set('.assembly-grid', { opacity: 0, scale: 0.96 });
        gsap.set(video, { opacity: 0, y: 30, scale: 0.96 });
        gsap.set('.assembly-label', { opacity: 0 });
        gsap.set('.assembly-progress', { opacity: 0 });
        gsap.set('.assembly-progress i', { scaleX: 0, transformOrigin: 'left center' });
        gsap.set('.performance > div, .performance footer', { opacity: 0, x: 18 });
        gsap.set('.technology-line', { scaleX: 0, transformOrigin: 'left center' });

        timeline
          .to('.assembly-grid', { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' }, 0)
          .to('.technology-copy .mono-label', { opacity: 1, y: 0, duration: 0.34, ease: 'power2.out' }, 0.12)
          .to('.technology-copy h2', { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.28)
          .to(video, { opacity: 1, y: 0, scale: 1, duration: 0.62, ease: 'power2.out' }, 0.52)
          .to('.assembly-progress', { opacity: 1, duration: 0.25 }, 0.78);

        timeline.to(playhead, {
          time: duration,
          duration,
          ease: 'none',
          onUpdate: () => {
            if (video.readyState > 0 && Math.abs(video.currentTime - playhead.time) > 0.025) {
              video.currentTime = playhead.time;
            }
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
          .to(labels, { opacity: 0, duration: 0.2 }, introDuration + 9.62)
          .to('.performance > div', {
            opacity: 1,
            x: 0,
            duration: 0.42,
            stagger: 0.16,
            ease: 'power2.out',
          }, introDuration + 9.45)
          .to('.performance footer', { opacity: 1, x: 0, duration: 0.42, ease: 'power2.out' }, introDuration + 10.05)
          .to('.technology-line', { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, introDuration + 9.85);

        return () => video.removeEventListener('loadedmetadata', primeVideo);
      };

      media.add('(min-width: 901px)', () => {
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
        return buildAssemblyTimeline({
          trigger: '.technology',
          start: 'top 82%',
          end: 'bottom 18%',
          scrub: 0.55,
          invalidateOnRefresh: true,
        });
      });
    }, root);

    return () => {
      media.revert();
      ctx.revert();
    };
  }, []);

  return (
    <main ref={root}>
      <Hero />
      <Manifesto />
      <Projects />
      <Technology />
      <Operations />
      <Impact />
      <Closing />
    </main>
  );
}
