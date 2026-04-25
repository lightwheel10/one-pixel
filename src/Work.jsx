export function Marquee() {
  const items = ['Pixel-perfect since 2024', 'Design × Engineering', 'Brand → Web', 'Built to convert', 'Refined to last'];
  return (
    <div className="marquee" aria-hidden>
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

export function Work() {
  const items = [
    { num: '01', name: 'Halcyon Capital',     meta: ['Brand', 'Site', '2026'],          href: '/case-studies/halcyon/',    live: true },
    { num: '02', name: 'Northbound Advisory', meta: ['Brand + Site', 'Advisory', '2026'], href: '/case-studies/northbound/' },
    { num: '03', name: 'Field & Foundry',     meta: ['E-commerce', 'Webflow', '2025'] },
    { num: '04', name: 'Northbound Type',     meta: ['Foundry', 'Design + Dev', '2025'] },
    { num: '05', name: 'Hexa Systems',        meta: ['SaaS', 'Site + Docs', '2025'] },
    { num: '06', name: 'Rosemark Hotels',     meta: ['Hospitality', 'CMS', '2024'] },
    { num: '07', name: 'Atlas Robotics',      meta: ['B2B', 'Site', '2024'] },
  ];

  return (
    <section id="work">
      <div className="shell">
        <div className="section-head">
          <div>
            <div className="section-num">[ 01 ] Selected Work</div>
          </div>
          <div>
            <h2 className="section-title">Sites we’ve <em>shipped</em>.</h2>
            <p className="section-sub" style={{ marginTop: 24 }}>
              A small slice. Each project is a custom design system, a custom site — and a brand that looks sharper for it.
            </p>
          </div>
        </div>

        <div className="work-grid">
          {items.map((it, i) => (
            <a key={i} className="work-item" href={it.href || '#'}>
              <div className="num">{it.num}</div>
              <div className="name">
                {it.name}
                {it.live && (
                  <span style={{ marginLeft: 12, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', verticalAlign: 'middle', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, background: 'var(--accent)', display: 'inline-block', borderRadius: 0 }}></span>
                    View live
                  </span>
                )}
              </div>
              <div className="meta">
                {it.meta.map((m, j) => <span key={j}>{m}</span>)}
              </div>
              <div className="arr" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
