import { useState } from 'react';

export function Testimonials() {
  const items = [
    { quote: 'They didn’t just redesign our site — they reset what our brand could look like online.',           who: 'Naina Mehta',   role: 'Principal Broker, Mehta & Sons', av: 'NM' },
    { quote: 'Fastest, sharpest, calmest project I’ve ever shipped with an agency. We launched a week ahead.',   who: 'Rohan Khanna',  role: 'Head of Growth, Pravah Cloud',   av: 'RK' },
    { quote: 'Every detail was considered. Our conversion rate is up 38% three months in.',                      who: 'Ananya Patel',  role: 'Founder, Forest & Loom',         av: 'AP' },
  ];
  return (
    <section id="testimonials" style={{ background: 'var(--paper)' }}>
      <div className="shell">
        <div className="section-head">
          <div><div className="section-num">[ 04 ] Words from clients</div></div>
          <div>
            <h2 className="section-title">Trusted by founders <em>who care</em>.</h2>
          </div>
        </div>
        <div className="testimonials-row">
          {items.map((t, i) => (
            <div key={i} className="testimonial">
              <div className="mark">“</div>
              <blockquote>{t.quote}</blockquote>
              <div className="who">
                <div className="av">{t.av}</div>
                <div>
                  <div style={{ color: 'var(--ink)', textTransform: 'none', fontFamily: 'var(--display)', fontSize: 14, letterSpacing: '-0.01em', fontWeight: 500 }}>{t.who}</div>
                  <div style={{ color: 'var(--muted)', marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const qs = [
    { q: 'How do you scope a project?', a: 'Every project starts with a 60-minute discovery call. We listen, understand the work ahead, and send a detailed proposal scoped to your reality — not a templated rate card. The first call is on us, with no commitment to take it further.' },
    { q: 'How long does it take?', a: 'Marketing sites typically take 4–6 weeks. Larger brand-and-build engagements run 6–10 weeks. We start one new project per month and protect that pace fiercely.' },
    { q: 'Do you work with our existing design or dev team?', a: 'Yes — we love embedded engagements. We can lead, support, or hand off. We’ve shipped alongside in-house teams from early-stage Mumbai and Bangalore startups to listed companies.' },
    { q: 'What stack do you build on?', a: 'Webflow when speed matters and a non-engineer should be able to update copy. Next.js + Sanity / Contentful when the site has product surface area. We pick the right tool, not the trendy one.' },
    { q: 'Do you offer ongoing care?', a: 'Yes. Every project includes 30 days of post-launch tuning. After that, we offer monthly retainers for design and engineering — most clients keep us on for 6–12 months.' },
    { q: 'Why “OnePixel”?', a: 'Because the difference between average and exceptional is usually one pixel — repeated, obsessively, across every screen. That’s the bar.' },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq">
      <div className="shell">
        <div className="section-head">
          <div><div className="section-num">[ 05 ] FAQ</div></div>
          <div>
            <h2 className="section-title">The <em>short</em> version.</h2>
          </div>
        </div>
        <div className="faq-list">
          {qs.map((it, i) => (
            <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span><span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', marginRight: 24, letterSpacing: '0.1em' }}>0{i + 1}</span>{it.q}</span>
                <span className="toggle"></span>
              </button>
              <div className="faq-a">{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPixels() {
  const cells = [];
  const W = 60, H = 40;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = (W - x) / W;
      const isCore = dx < 0.45 && y > H * 0.15 && y < H * 0.85;
      if (isCore) {
        cells.push({ x, y, c: '#F5F1EA', drift: false });
      } else {
        const intensity = Math.max(0, 1 - dx * 1.6);
        if (Math.random() < intensity * 0.35) {
          const r = Math.random();
          cells.push({ x, y, c: r < 0.5 ? '#FF6B47' : r < 0.85 ? '#F5F1EA' : '#C7DDD8', drift: true });
        }
      }
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }}>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="0.95" height="0.95" fill={c.c} opacity={0.9}
          className={c.drift ? (i % 3 === 0 ? 'pix-drift-a' : i % 3 === 1 ? 'pix-drift-b' : 'pix-drift-c') : ''}
          style={{ animationDelay: `${(i % 13) * 0.15}s` }}
        />
      ))}
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" style={{ padding: 0 }}>
      <div className="contact">
        <div className="contact-inner">
          <div className="section-num" style={{ color: 'rgba(255,255,255,.5)', marginBottom: 32 }}>
            <span style={{ background: 'var(--accent)', width: 28, height: 1, marginRight: 12 }}></span>
            [ 06 ] Start a project
          </div>
          <h2>
            Let’s build<br />something <em>good</em>.
          </h2>
          <div className="contact-grid">
            <div className="contact-block">
              <div className="label">Email · for new projects</div>
              <div className="big">
                <a href="mailto:hello@onepixel.in">
                  hello@onepixel.in <span>↗</span>
                </a>
              </div>
            </div>
            <div className="contact-block">
              <div className="label">Book a 30-min intro</div>
              <div className="big">
                <a href="#">
                  cal.com/onepixel <span>↗</span>
                </a>
              </div>
            </div>
            <div className="contact-block">
              <div className="label">Currently</div>
              <div className="big" style={{ color: 'var(--accent)' }}>
                Booking June 2026 →
              </div>
            </div>
            <div className="contact-block">
              <div className="label">Elsewhere</div>
              <div className="big" style={{ display: 'flex', gap: 24, fontSize: 22 }}>
                <a href="#">Twitter</a>
                <a href="#">Instagram</a>
                <a href="#">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-pixels" aria-hidden>
          <ContactPixels />
        </div>
      </div>
      <div className="footer">
        <div>© 2026 OnePixel Studio · Mumbai · Made one pixel at a time</div>
        <div className="footer-links">
          <a href="#">Privacy</a>
          <a href="#">Imprint</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}
