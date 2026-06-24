import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ServiceIcon({ variant, accent }) {
  const cells = {
    brand:   [[0,0],[1,0],[2,0],[0,1],[2,1],[0,2],[1,2],[2,2],[4,2],[5,2],[6,2],[4,3],[6,3],[4,4],[5,4],[6,4]],
    product: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[0,1],[5,1],[0,2],[2,2],[3,2],[5,2],[0,3],[5,3],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4]],
    ecom:    [[1,0],[2,0],[3,0],[4,0],[0,1],[5,1],[0,2],[5,2],[0,3],[5,3],[0,4],[5,4],[1,5],[2,5],[3,5],[4,5]],
    system:  [[0,0],[1,0],[3,0],[4,0],[0,1],[1,1],[3,1],[4,1],[0,3],[1,3],[3,3],[4,3],[0,4],[1,4],[3,4],[4,4]],
  };
  const data = cells[variant] || cells.brand;
  const accentIdx = [3, 7, 11];
  return (
    <svg viewBox="0 0 7 7" style={{ width: '100%', height: '100%' }}>
      {data.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="0.95" height="0.95"
          fill={accentIdx.includes(i) ? accent : 'currentColor'} />
      ))}
    </svg>
  );
}

export function Services() {
  const items = [
    {
      num: '01',
      title: 'Brand Sites',
      desc: 'A premium website that makes your brand look the part and earns trust from the very first second. Beautiful, fast, and simple for your team to keep up to date.',
      tags: ['Strategy', 'Premium design', 'Easy to update'],
      art: '/services/brand-sites-bg.jpg',
      icon: (a) => <ServiceIcon variant="brand" accent={a} />,
    },
    {
      num: '02',
      title: 'Marketing Pages',
      desc: 'The pages that bring you customers. Landing pages, pricing, and more, each one designed to turn visitors into real leads and sales.',
      tags: ['Landing pages', 'Built to convert', 'Easy to edit'],
      art: '/services/marketing-pages-bg.jpg',
      artPosition: 'center top',
      icon: (a) => <ServiceIcon variant="product" accent={a} />,
    },
    {
      num: '03',
      title: 'Online Stores',
      desc: 'An online store that feels premium and is effortless to buy from, so more of your visitors turn into paying customers.',
      tags: ['Easy checkout', 'Built to sell', 'Looks premium'],
      art: '/services/online-stores-bg.jpg',
      icon: (a) => <ServiceIcon variant="ecom" accent={a} />,
    },
    {
      num: '04',
      title: 'Built to Scale',
      desc: 'A website built on simple, reusable pieces, so your team can add new pages quickly and everything stays perfectly on brand as you grow.',
      tags: ['Reusable blocks', 'Always on brand', 'Grows with you'],
      art: '/services/built-to-scale-bg.jpg',
      icon: (a) => <ServiceIcon variant="system" accent={a} />,
    },
  ];
  // Paras · 2026-06-19: which service is in focus. Drives the right-hand detail panel on desktop
  // and the expanded accordion row on phones (same state, CSS reflows the layout per breakpoint).
  const [active, setActive] = useState(0);
  return (
    <section id="services">
      <div className="shell">
        <div className="section-head">
          <div><div className="section-num">[ 02 ] Services</div></div>
          <div className="services-heading">
            <h2 className="section-title services-title">Four things, <em>done well</em>.</h2>
            <p className="section-sub" style={{ marginTop: 24 }}>
              We don’t do everything. We do these few things, at a level most agencies only pretend they can.
            </p>
          </div>
        </div>
        {/* Paras · 2026-06-19: Services as an interactive showcase — the 4 service names listed on
            the left, the focused one expanded into a detail panel on the right (echoes the desktop
            Process single-display). On phones (CSS) the right panel is hidden and each row becomes a
            tap-to-expand accordion, so the one set of markup serves both layouts. */}
        <div className="svc-showcase">
          <div className="svc-list">
            {items.map((it, i) => (
              <div className={`svc-row ${active === i ? 'on' : ''}`} key={i}>
                <button
                  className="svc-row-btn"
                  aria-expanded={active === i}
                  aria-controls={`svc-acc-${i}`}
                  onClick={() => setActive(i)}
                >
                  <span className="svc-row-num">{it.num}</span>
                  <span className="svc-row-title">{it.title}</span>
                  <span className="svc-row-mark" aria-hidden></span>
                </button>
                {/* accordion detail — phones only; on desktop CSS hides this and the right panel shows */}
                <div className="svc-acc" id={`svc-acc-${i}`}>
                  <div className="svc-acc-inner">
                    <div className="svc-acc-icon">{it.icon('var(--accent)')}</div>
                    <p className="svc-acc-desc">{it.desc}</p>
                    <div className="svc-tags">
                      {it.tags.map((t, j) => <span key={j} className="svc-tag">{t}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* desktop detail panel — hidden on phones; cross-fades on switch (key={active}) */}
          <div className={`svc-panel ${items[active].art ? 'has-art' : ''}`} aria-live="polite">
            {items[active].art && (
              <img
                key={items[active].art}
                className="svc-panel-art"
                src={items[active].art}
                alt=""
                loading="lazy"
                decoding="async"
                style={{ objectPosition: items[active].artPosition || 'center' }}
              />
            )}
            <div className="svc-panel-inner" key={active}>
              <div className="svc-panel-icon">{items[active].icon('var(--accent)')}</div>
              <h3 className="svc-panel-title">{items[active].title}</h3>
              <p className="svc-panel-desc">{items[active].desc}</p>
              <div className="svc-tags">
                {items[active].tags.map((t, j) => <span key={j} className="svc-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcPixels({ step }) {
  const W = 18, H = 18;
  const cells = [];
  let s = (step + 1) * 7;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const fillCount = (step + 1) * 0.18;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = x / W;
      if (dx < fillCount + 0.1 && y > 1 && y < H - 2 && rand() < 0.96) {
        cells.push({ x, y, c: '#F5F1EA' });
      } else if (dx > fillCount && rand() < 0.18 - dx * 0.08) {
        const r = rand();
        cells.push({ x, y, c: r < 0.55 ? '#FF6B47' : r < 0.85 ? '#F5F1EA' : '#C7DDD8' });
      }
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }}>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="0.95" height="0.95" fill={c.c} opacity={0.9}
          className={i % 3 === 0 ? 'pix-drift-a' : i % 3 === 1 ? 'pix-drift-b' : 'pix-drift-c'}
          style={{ transition: 'opacity .4s', animationDelay: `${(i % 11) * 0.2}s` }}
        />
      ))}
    </svg>
  );
}

export function Process() {
  const steps = [
    { n: '01', t: 'Discovery',      tag: 'Listen', d: 'A 30 minute call. We dig into your business, your audience, and the metric that actually matters. No pitch deck.', time: 'Week 1',     deliverables: ['Kickoff brief', 'Audience map', 'Success metric'], visual: '/process/discovery-signal-funnel.png' },
    { n: '02', t: 'Direction',      tag: 'Decide', d: 'Two visual directions, one strategy. We pick a path together in a single review. No fourteen rounds of revisions.', time: 'Week 1 to 2', deliverables: ['Two directions', 'Moodboard', 'Site map'], visual: '/process/direction-homepage-review.png' },
    { n: '03', t: 'Build',          tag: 'Make',   d: 'Design and engineering happen in parallel. Weekly demos in your live staging URL. Not slides, not PDFs.',           time: 'Week 3 to 7', deliverables: ['Live staging', 'Weekly demos', 'CMS handoff'], visual: '/process/build-assembly.png' },
    { n: '04', t: 'Launch + Care',  tag: 'Ship',   d: 'We ship the site, monitor it, and stick around. 30 days of tuning after launch is included with every project.',     time: 'Week 8 →',   deliverables: ['Launch day', '30 days of care', 'Retainer optional'], visual: '/process/launch-care-abstract.png' },
  ];
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const fillRef = useRef(null);

  // Paras · 2026-06-19: mobile Process is a swipe carousel (horizontal scroll-snap). activeCard
  // tracks which card is centered so the pixel dots below reflect it; a dot tap scrolls to its card.
  const [activeCard, setActiveCard] = useState(0);
  const carouselRef = useRef(null);
  const rafRef = useRef(0);

  // Paras · 2026-06-18: the rail fill is driven imperatively so it can track scroll
  // CONTINUOUSLY (it used to jump 25% per step, which read as "stuck then jump"). On scroll
  // it follows progress 1:1; on click it eases to the node.
  const setFill = (pct, animate) => {
    const el = fillRef.current;
    if (!el) return;
    gsap.killTweensOf(el);
    if (animate) gsap.to(el, { width: pct + '%', duration: 0.5, ease: 'power2.out' });
    else el.style.width = pct + '%';
  };
  const goTo = (i) => { setActive(i); setFill((i / (steps.length - 1)) * 100, true); };

  useEffect(() => { setFill((active / (steps.length - 1)) * 100, false); }, []); // initial fill

  // Paras · 2026-06-19: carousel plumbing. On swipe/scroll, find the card whose center is nearest
  // the track's center and light up its dot (rAF-throttled so it's cheap per frame). A dot tap
  // centers that card. No pin, no scrub — the user drives it by swiping; nothing moves on its own.
  const syncDot = () => {
    const track = carouselRef.current;
    if (!track) return;
    const mid = track.getBoundingClientRect().left + track.clientWidth / 2;
    let best = 0, bestDist = Infinity;
    for (let i = 0; i < track.children.length; i++) {
      const r = track.children[i].getBoundingClientRect();
      const d = Math.abs(r.left + r.width / 2 - mid);
      if (d < bestDist) { bestDist = d; best = i; }
    }
    setActiveCard(best);
  };
  const onCarouselScroll = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(syncDot);
  };
  const goToCard = (i) => {
    const track = carouselRef.current;
    const card = track && track.children[i];
    if (!card) return;
    // center this card in the track viewport; scroll-snap settles the rest
    track.scrollTo({ left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2, behavior: 'smooth' });
  };
  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // Paras · 2026-06-18: drive the 4 steps from scroll. ONLY on a wide + tall screen does the
  // .proc-stage core FREEZE-PIN and scrub the steps (fill tracks scroll 1:1, content cross-fades,
  // pin kept short ~1.8 viewports). Phones / short screens DON'T scrub at all — CSS swaps the
  // stage for the .proc-mobile swipe carousel (see render), driven by the user's thumb, not scroll.
  // So there's no mobile ScrollTrigger here anymore. Reduced-motion: no pin.
  useEffect(() => {
    const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const onScroll = (self) => {
      const p = self.progress;
      if (fillRef.current) { gsap.killTweensOf(fillRef.current); fillRef.current.style.width = p * 100 + '%'; }
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px) and (min-height: 800px)', () => {
      if (reduce()) return;
      const stage = ref.current.querySelector('.proc-stage');
      ScrollTrigger.create({
        trigger: stage,
        pin: stage,
        // Paras · 2026-06-19: pin 10px higher (96 → 86) so the bottom strip (Discovery / Direction /
        // Build / Launch) isn't clipped at the foot of shorter ≥800px screens. Still clears the nav (~75px).
        start: 'top 86px',
        end: () => '+=' + window.innerHeight * 1.8,
        anticipatePin: 1,
        onUpdate: onScroll,
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="process" style={{ padding: 0 }} ref={ref}>
      <div className="process">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-num">[ 03 ] Process</div></div>
            <div>
              <h2 className="section-title">From kickoff to <em>live</em> in 4 to 8 weeks.</h2>
              <p className="section-sub" style={{ marginTop: 24 }}>
                One project at a time. One small senior team. No account managers, no relay races, no surprises.
              </p>
            </div>
          </div>

          <div className="proc-stage">
          <div className="proc-rail" role="tablist">
            <div className="proc-rail-line" aria-hidden></div>
            <div className="proc-rail-fill" ref={fillRef} aria-hidden></div>
            {steps.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={active === i}
                className={`proc-rail-node ${active >= i ? 'on' : ''} ${active === i ? 'current' : ''}`}
                onClick={() => goTo(i)}
                style={{ left: `${(i / (steps.length - 1)) * 100}%` }}
              >
                <span className="proc-rail-dot"></span>
                <span className="proc-rail-label">{s.tag}</span>
              </button>
            ))}
          </div>

          <div className="proc-display">
            <div className="proc-big-num" key={'num' + active} aria-hidden>{steps[active].n}</div>
            <div className="proc-body" key={'body' + active}>
              <div className="proc-meta">
                <span className="proc-time">{steps[active].time}</span>
                <span className="proc-of">Phase {active + 1} of {steps.length}</span>
              </div>
              <h3 className="proc-title">{steps[active].t}</h3>
              <p className="proc-desc">{steps[active].d}</p>
              <div className="proc-deliv">
                <div className="proc-deliv-label">You receive</div>
                <ul>
                  {steps[active].deliverables.map((d, i) => (
                    <li key={i}><span className="proc-deliv-pip"></span>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Phase artwork is intentionally decorative; the adjacent copy carries the meaning. */}
            <div className="proc-pixels" key={`visual-${active}`} aria-hidden>
              {steps[active].visual
                ? <img className="proc-artifact" src={steps[active].visual} alt="" decoding="async" />
                : <ProcPixels step={active} />}
            </div>
          </div>

          <div className="proc-strip">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`proc-strip-item ${active === i ? 'on' : ''}`}
              >
                <span className="proc-strip-num">{s.n}</span>
                <span className="proc-strip-name">{s.t}</span>
                <span className="proc-strip-time">{s.time}</span>
              </button>
            ))}
          </div>
          </div>

          {/* Paras · 2026-06-19: phones + short screens get a swipe carousel (horizontal scroll-snap)
              instead of the pinned desktop stage — swipe through the 4 steps; the pixel dots track
              your position and let you jump. Nothing swaps under your thumb (the old mobile pin did,
              which was disorienting) — you drive it. CSS swaps .proc-stage ↔ .proc-mobile at the
              exact breakpoint the pin uses, so the two never show at once. */}
          <div className="proc-mobile">
            <div className="proc-carousel" ref={carouselRef} onScroll={onCarouselScroll}>
              {steps.map((s, i) => (
                <article key={i} className={`proc-card ${activeCard === i ? 'on' : ''}`}>
                  <span className="proc-card-ghost" aria-hidden>{s.n}</span>
                  <div className="proc-card-head">
                    <span className="proc-card-num">{s.n}</span>
                    <span className="proc-card-time">{s.time}</span>
                  </div>
                  <h3 className="proc-card-title">{s.t}</h3>
                  <p className="proc-card-desc">{s.d}</p>
                  {/* Paras · 2026-06-19: "You receive" as a deliverables manifest (framed header +
                      count, then a coral pixel-check checklist). .proc-card-deliv scopes the restyle
                      to the mobile cards — the desktop .proc-display version keeps its chip layout. */}
                  <div className="proc-deliv proc-card-deliv">
                    <div className="proc-deliv-label">
                      <span>You receive</span>
                      <span className="proc-deliv-count">{s.deliverables.length}</span>
                    </div>
                    <ul>
                      {s.deliverables.map((d, j) => (
                        <li key={j}><span className="proc-check" aria-hidden></span>{d}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
            <div className="proc-dots" role="tablist" aria-label="Process steps">
              {steps.map((s, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={activeCard === i}
                  aria-label={`${s.t}, step ${i + 1} of ${steps.length}`}
                  className={`proc-dot ${activeCard === i ? 'on' : ''}`}
                  onClick={() => goToCard(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
