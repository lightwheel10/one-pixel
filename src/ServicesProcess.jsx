import { useState } from 'react';

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
      desc: 'A bespoke marketing site that earns attention. Custom design system, motion, and a CMS your team will actually use.',
      tags: ['Strategy', 'Design', 'Webflow / Next', 'CMS'],
      icon: (a) => <ServiceIcon variant="brand" accent={a} />,
    },
    {
      num: '02',
      title: 'Product & Marketing',
      desc: 'Landing pages, pricing, docs, blog. The growth-critical surfaces — refined like the rest of your product should be.',
      tags: ['Landing', 'Docs', 'A/B ready'],
      icon: (a) => <ServiceIcon variant="product" accent={a} />,
    },
    {
      num: '03',
      title: 'E-commerce',
      desc: 'Storefronts that don’t look like everyone else’s. Shopify, custom checkout, the editorial touch your brand deserves.',
      tags: ['Shopify', 'Custom', 'PDP / PLP'],
      icon: (a) => <ServiceIcon variant="ecom" accent={a} />,
    },
    {
      num: '04',
      title: 'Design Systems',
      desc: 'Tokens, components, documentation. Built so your team can ship the next 100 pages without us in the room.',
      tags: ['Tokens', 'Storybook', 'Figma'],
      icon: (a) => <ServiceIcon variant="system" accent={a} />,
    },
  ];
  return (
    <section id="services">
      <div className="shell">
        <div className="section-head">
          <div><div className="section-num">[ 02 ] Services</div></div>
          <div>
            <h2 className="section-title">Four things, <em>done well</em>.</h2>
            <p className="section-sub" style={{ marginTop: 24 }}>
              We don’t do everything. We do these — at a level most agencies pretend they can.
            </p>
          </div>
        </div>
        <div className="services-grid">
          {items.map((it, i) => (
            <div key={i} className="svc-card">
              <div className="num">{it.num}</div>
              <div>
                <div className="icon">{it.icon('var(--accent)')}</div>
                <h3>{it.title}</h3>
                <p>{it.desc}</p>
              </div>
              <div className="tags">
                {it.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
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
    { n: '01', t: 'Discovery',      tag: 'Listen', d: 'A 60-min call. We dig into your business, your audience, and the metric that actually matters — without a pitch deck.', time: 'Week 1',   deliverables: ['Kickoff brief', 'Audience map', 'Success metric'] },
    { n: '02', t: 'Direction',      tag: 'Decide', d: 'Two visual directions, one strategy. We pick a path together in a single review. No 14-revision rounds.',                time: 'Week 1–2', deliverables: ['Two directions', 'Moodboard', 'Site map'] },
    { n: '03', t: 'Build',          tag: 'Make',   d: 'Design and engineering happen in parallel. Weekly demos in your live staging URL — not slides, not PDFs.',                time: 'Week 3–7', deliverables: ['Live staging', 'Weekly demos', 'CMS handoff'] },
    { n: '04', t: 'Launch + Care',  tag: 'Ship',   d: 'We ship the site, monitor it, and stick around. 30 days of post-launch tuning is included with every project.',           time: 'Week 8 →', deliverables: ['Launch day', '30-day care', 'Retainer optional'] },
  ];
  const [active, setActive] = useState(0);
  return (
    <section id="process" style={{ padding: 0 }}>
      <div className="process">
        <div className="shell">
          <div className="section-head">
            <div><div className="section-num">[ 03 ] Process</div></div>
            <div>
              <h2 className="section-title">From kickoff to <em>live</em> in 4–8 weeks.</h2>
              <p className="section-sub" style={{ marginTop: 24 }}>
                One project at a time. One small senior team. No account managers, no relay races, no surprises.
              </p>
            </div>
          </div>

          <div className="proc-rail" role="tablist">
            <div className="proc-rail-line" aria-hidden></div>
            <div className="proc-rail-fill" style={{ width: `${((active + 1) / steps.length) * 100}%` }} aria-hidden></div>
            {steps.map((s, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={active === i}
                className={`proc-rail-node ${active >= i ? 'on' : ''} ${active === i ? 'current' : ''}`}
                onClick={() => setActive(i)}
                style={{ left: `${(i / (steps.length - 1)) * 100}%` }}
              >
                <span className="proc-rail-dot"></span>
                <span className="proc-rail-label">{s.tag}</span>
              </button>
            ))}
          </div>

          <div className="proc-display">
            <div className="proc-big-num" aria-hidden>{steps[active].n}</div>
            <div className="proc-body">
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
            <div className="proc-pixels" aria-hidden>
              <ProcPixels step={active} />
            </div>
          </div>

          <div className="proc-strip">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`proc-strip-item ${active === i ? 'on' : ''}`}
              >
                <span className="proc-strip-num">{s.n}</span>
                <span className="proc-strip-name">{s.t}</span>
                <span className="proc-strip-time">{s.time}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
