import { useState } from 'react';
import { openStartForm } from './StartForm.jsx';

// Paras · 2026-06-19: pixel "bleed" across the hosting → testimonials seam. Mounted in the
// testimonials section (the hosting section clips with overflow:hidden, so it can't spill) and
// positioned to straddle the boundary, so a few of the hosting banner's pixels cross into this
// section and the two read as connected. Coral-led (+ a little mint, no cream) so the crossover
// stays visible on the WHITE testimonials background in light mode.
function SeamBleedBand() {
  // phone: full-width band, dense at the top (the seam) fading down into testimonials
  const W = 46, H = 7;
  const cells = [];
  let s = 53;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const fromTop = y / (H - 1);                         // 0 at the seam → 1 at the bottom
    if (rand() < Math.max(0, 0.8 - fromTop * 1.05)) {
      const r = rand();
      cells.push({ x, y, c: r < 0.78 ? '#FF6B47' : '#C7DDD8' });
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin meet" style={{ width: '100%', height: 'auto', display: 'block' }}>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="0.9" height="0.9" fill={c.c}
          className={i % 3 === 0 ? 'pix-drift-a' : i % 3 === 1 ? 'pix-drift-b' : 'pix-drift-c'}
          style={{ animationDelay: `${(i % 11) * 0.2}s` }} />
      ))}
    </svg>
  );
}

export function Testimonials() {
  const items = [
    { quote: 'They didn’t just redesign our site, they reset what our brand could look like online.',           who: 'Naina Mehta',   role: 'Principal Broker, Mehta & Sons', av: 'NM' },
    { quote: 'Fastest, sharpest, calmest project I’ve ever shipped with an agency. We launched a week ahead.',   who: 'Rohan Khanna',  role: 'Head of Growth, Pravah Cloud',   av: 'RK' },
    { quote: 'Every detail was considered. Our conversion rate is up 38% three months in.',                      who: 'Ananya Patel',  role: 'Founder, Forest & Loom',         av: 'AP' },
  ];
  return (
    <section id="testimonials" style={{ background: 'var(--paper)', position: 'relative' }}>
      {/* phone only: pixel bleed from the hosting band above, straddling the seam (desktop reverted) */}
      <div className="seam-bleed seam-bleed-m" aria-hidden><SeamBleedBand /></div>
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
    { q: 'How do you scope a project?', a: 'Every project starts with a 30 minute discovery call. We listen, understand the work ahead, and send a detailed proposal built around your real needs, not a one size fits all price list. The first call is on us, with no pressure to take it further.' },
    { q: 'How long does it take?', a: 'Most websites take 4 to 6 weeks. Bigger projects that include branding run 6 to 10 weeks. We take on one new project a month, so yours always gets our full attention.' },
    { q: 'Can you work with our existing team?', a: 'Yes, we love working as part of your team. We can lead, support, or hand things over when we are done. We have worked alongside internal teams at everything from brand new startups to large public companies.' },
    { q: 'What do you build websites with?', a: 'We choose the right technology for your needs, not whatever is trendy. The result is a website that loads fast, ranks well, and is easy for your team to update without calling a developer.' },
    { q: 'Do you offer ongoing care?', a: 'Yes. Every project includes 30 days of fine tuning after launch. After that, we offer simple monthly plans for design and development, and most clients stay with us for 6 to 12 months.' },
    { q: 'Why “OnePixel”?', a: 'Because the difference between average and exceptional is usually one pixel, repeated obsessively across every screen. That’s the bar we hold ourselves to.' },
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
              {/* Paras · 2026-06-19: accessible disclosure — aria-expanded tells AT open/closed,
                  aria-controls links the button to its answer panel (id below). Attributes only,
                  no visual or behaviour change. */}
              <button
                className="faq-q"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                aria-controls={`faq-a-${i}`}
              >
                <span><span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', marginRight: 24, letterSpacing: '0.1em' }}>0{i + 1}</span>{it.q}</span>
                <span className="toggle"></span>
              </button>
              <div className="faq-a" id={`faq-a-${i}`}>{it.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HostingPixels() {
  // Paras · 2026-06-19: brand pixel dispersion for the hosting banner — replaces the out-of-place
  // ghost "6". A coral-led field, dense at the right edge and scattering toward the copy: the same
  // OnePixel motif used in the hero + contact, so it reads as native identity, not a stray graphic.
  const W = 36, H = 26;
  const cells = [];
  let s = 13;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const fromRight = (W - 1 - x) / (W - 1);             // 0 at right edge → 1 at far left
      const density = Math.max(0, 0.92 - fromRight * 1.18); // dense right, fades out toward the copy
      if (rand() < density) {
        const r = rand();
        const c = r < 0.6 ? '#FF6B47' : r < 0.82 ? '#F5F1EA' : '#C7DDD8';
        cells.push({ x, y, c });
      }
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="0.9" height="0.9" fill={c.c}
          className={i % 3 === 0 ? 'pix-drift-a' : i % 3 === 1 ? 'pix-drift-b' : 'pix-drift-c'}
          style={{ animationDelay: `${(i % 11) * 0.2}s` }}
        />
      ))}
    </svg>
  );
}

function HostingBandPixels() {
  // Paras · 2026-06-19: phone-only variant of the dispersion — a full-width band that's dense at the
  // bottom edge and fades upward, so on a narrow portrait screen the pixels live BELOW the copy
  // (in what used to be dead padding) instead of smearing across the text. Same coral/cream/mint mix.
  const W = 44, H = 12;
  const cells = [];
  let s = 29;
  const rand = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const fromBottom = (H - 1 - y) / (H - 1);              // 0 at the bottom row → 1 at the top
      const density = Math.max(0, 0.95 - fromBottom * 1.25);  // dense at the bottom, fades upward
      if (rand() < density) {
        const r = rand();
        const c = r < 0.6 ? '#FF6B47' : r < 0.82 ? '#F5F1EA' : '#C7DDD8';
        cells.push({ x, y, c });
      }
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax meet" style={{ width: '100%', height: 'auto', display: 'block' }}>
      {cells.map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width="0.9" height="0.9" fill={c.c}
          className={i % 3 === 0 ? 'pix-drift-a' : i % 3 === 1 ? 'pix-drift-b' : 'pix-drift-c'}
          style={{ animationDelay: `${(i % 11) * 0.2}s` }}
        />
      ))}
    </svg>
  );
}

export function Hosting() {
  // Paras · 2026-06-19: coral offer banner — 6 months of hosting on us. Hook plays on the Process
  // section's "live" theme. Sits between Process and Testimonials as the one bold accent moment.
  return (
    <section id="hosting" className="hosting">
      {/* brand pixel dispersion sits behind the content (sibling of .hosting-inner, lower z-index) */}
      <div className="hosting-pixels" aria-hidden><HostingPixels /></div>
      <div className="hosting-inner">
        <div className="hosting-eyebrow">
          <span className="hosting-pip" aria-hidden></span>
          Included with every project
        </div>
        <h2 className="hosting-title">
          Go live. Stay live, on us for <span className="hosting-hl">6 months</span>.
        </h2>
        <p className="hosting-sub">
          Every site we build comes with fast, secure hosting, fully managed and free from day one.
          We keep you online, so you can focus on the business, not the bills.
        </p>
        <a href="#contact" className="hosting-cta" onClick={(e) => { e.preventDefault(); openStartForm(); }}>
          Start a project <span className="arr" aria-hidden>→</span>
        </a>
      </div>
      {/* phone-only: pixel dispersion as a full-width band along the bottom edge (CSS shows it
          only < 700px, where the right-side .hosting-pixels is hidden) */}
      <div className="hosting-band" aria-hidden><HostingBandPixels /></div>
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
              <div className="label">Call us · for new projects</div>
              <div className="big">
                <a href="tel:+916307022880">
                  +91 63070 22880 <span>↗</span>
                </a>
              </div>
            </div>
            <div className="contact-block">
              <div className="label">Currently</div>
              <div className="big" style={{ color: 'var(--accent)' }}>
                Booking July 2026 →
              </div>
            </div>
          </div>
        </div>
        <div className="contact-pixels" aria-hidden>
          <ContactPixels />
        </div>
      </div>
      <div className="footer">
        <div>© 2026 OnePixel Studio · Made one pixel at a time</div>
        <div className="footer-links">
          <a href="/privacy/">Privacy</a>
          <a href="#">Imprint</a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </section>
  );
}
