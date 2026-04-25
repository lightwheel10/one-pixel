import { useState } from 'react';
import { HC_PHOTOS } from './photos.js';

export function HudsonMap() {
  const [active, setActive] = useState(1);
  const pins = [
    { x: 38, y: 18, label: 'Mahabaleshwar', props: 3 },
    { x: 42, y: 26, label: 'Panchgani',     props: 2, featured: true },
    { x: 46, y: 36, label: 'Pune',          props: 1 },
    { x: 44, y: 46, label: 'Khandala',      props: 2 },
    { x: 52, y: 56, label: 'Lonavala',      props: 4, featured: true },
    { x: 50, y: 64, label: 'Bandra',        props: 5, featured: true, home: true },
    { x: 56, y: 70, label: 'Alibag',        props: 3, featured: true },
    { x: 38, y: 72, label: 'Karjat',        props: 2 },
    { x: 30, y: 50, label: 'Matheran',      props: 2 },
    { x: 64, y: 80, label: 'Khopoli',       props: 1 },
  ];

  return (
    <section className="hc-map" id="map">
      <div className="hc-shell">
        <div className="hc-section-head">
          <div className="hc-section-num">№ 03<span>The Valley</span></div>
          <div>
            <h2 className="hc-section-title">A small map<br />of <em>where we work.</em></h2>
            <p className="hc-section-sub">
              We work along the Western Ghats, between Bombay and Mahabaleshwar — a four-hour corridor we’ve walked, drawn, and revisited for sixty-two years. Hover a town to see what we’ve placed there.
            </p>
          </div>
        </div>

        <div className="hc-map-frame">
          <svg className="hc-map-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="hcGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A18140A" strokeWidth="1" />
              </pattern>
              <pattern id="hcDots" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.6" fill="#1A18141A" />
              </pattern>
            </defs>
            <rect width="1000" height="600" fill="#EAE5DC" />
            <rect width="1000" height="600" fill="url(#hcDots)" />
            <rect width="1000" height="600" fill="url(#hcGrid)" opacity="0.5" />
            <path
              d="M 460 0 Q 430 80 470 160 Q 510 240 480 320 Q 450 400 510 480 Q 560 540 540 600"
              fill="none"
              stroke="#8C857A"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.3"
            />
            <path
              d="M 460 0 Q 430 80 470 160 Q 510 240 480 320 Q 450 400 510 480 Q 560 540 540 600"
              fill="none"
              stroke="#1A1814"
              strokeWidth="1"
              opacity="0.4"
            />
            <g transform="translate(900, 80)" opacity="0.4">
              <circle cx="0" cy="0" r="36" fill="none" stroke="#1A1814" />
              <line x1="0" y1="-30" x2="0" y2="30" stroke="#1A1814" strokeWidth="0.5" />
              <line x1="-30" y1="0" x2="30" y2="0" stroke="#1A1814" strokeWidth="0.5" />
              <text x="0" y="-40" textAnchor="middle" fontFamily="Inter" fontSize="10" letterSpacing="2" fill="#1A1814">N</text>
              <polygon points="0,-25 -4,0 0,-5 4,0" fill="#6B4423" />
            </g>
            <text x="20" y="30" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="3" fill="#8C857A">WESTERN GHATS · MH</text>
            <text x="20" y="580" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2" fill="#8C857A">SCALE: 1:200,000 · MMXXVI</text>
          </svg>

          {pins.map((p, i) => (
            <button
              key={i}
              className={`hc-pin ${p.featured ? 'featured' : ''} ${active === i ? 'active' : ''}`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={`${p.label}, ${p.props} properties`}
            >
              <span className="label">{p.label} · {p.props} {p.props === 1 ? 'home' : 'homes'}</span>
            </button>
          ))}
        </div>

        <div className="hc-map-legend">
          <div>
            <div className="v">62</div>
            <div className="l">Years in the Valley</div>
          </div>
          <div>
            <div className="v"><em>3</em></div>
            <div className="l">Generations of Mehtas</div>
          </div>
          <div>
            <div className="v">1,142</div>
            <div className="l">Houses placed</div>
          </div>
          <div>
            <div className="v">94<em>%</em></div>
            <div className="l">Sold above asking</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Family() {
  const members = [
    {
      n: 'I',
      name: 'Aditya Mehta',
      em: 'Aditya',
      role: 'Founder · 1962 — 2001',
      bio: 'Opened a one-room office on Hill Road, Bandra, with a typewriter, a phone, and a list of seventeen names. The list was, he insisted, the only inventory worth keeping.',
      img: HC_PHOTOS.fam1,
    },
    {
      n: 'II',
      name: 'Anjali Mehta',
      em: 'Anjali',
      role: 'Principal · 1989 — present',
      bio: 'Joined her father out of St. Xavier’s. Listed our first estate in The Bombay Times in 1992. Still walks every property with a measuring tape and a notebook.',
      img: HC_PHOTOS.fam2,
    },
    {
      n: 'III',
      name: 'Naina Mehta',
      em: 'Naina',
      role: 'Principal Broker · 2014 — present',
      bio: 'Third name on the door. Trained as an architect before returning to the office in 2014. Answers her own phone.',
      img: HC_PHOTOS.fam3,
    },
  ];
  return (
    <section className="hc-section" id="family">
      <div className="hc-shell">
        <div className="hc-section-head">
          <div className="hc-section-num">№ 04<span>The Family</span></div>
          <div>
            <h2 className="hc-section-title">Three names<br />on <em>the door.</em></h2>
            <p className="hc-section-sub">
              We have grown deliberately — by one Halcyon every generation. Every listing is read, walked, and signed by one of us. Every closing has a Halcyon at the table.
            </p>
          </div>
        </div>

        <div className="hc-family-grid">
          {members.map((m, i) => (
            <div key={i} className="hc-family-member">
              <div className="hc-family-portrait">
                <div className="num">№ {m.n}</div>
                <img src={m.img} alt={m.name} />
              </div>
              <div className="hc-family-name"><em>{m.em}</em>{m.name.slice(m.em.length)}</div>
              <div className="hc-family-role">{m.role}</div>
              <div className="hc-family-bio">{m.bio}</div>
            </div>
          ))}
        </div>

        <div className="hc-pullquote">
          <q>My grandfather sold houses with a handshake. My mother insisted on knowing every neighbour before she ever knocked. The work hasn’t changed much.</q>
          <div className="attr">— Naina Mehta · Principal Broker · 2024</div>
        </div>
      </div>
    </section>
  );
}

export function Journal() {
  const items = [
    {
      cat: 'Notebook', date: 'Mar MMXXVI',
      title: <>On the <em>quiet bungalows</em> of Bandra</>,
      blurb: 'A walking essay through Hill Road’s thirteen pre-Independence bungalows — and the families that have, against all odds, kept them.',
      img: HC_PHOTOS.journal1,
    },
    {
      cat: 'Field Note', date: 'Feb MMXXVI',
      title: <>The <em>second walk</em></>,
      blurb: 'Why we visit every property at least twice — once at sunrise, once at dusk — before we agree to list it. A method, briefly.',
      img: HC_PHOTOS.journal2,
    },
    {
      cat: 'Letter', date: 'Jan MMXXVI',
      title: <>A note on <em>old Mangalore tile</em></>,
      blurb: 'On the small heartbreak of a 1908 verandah, the slow art of restoration, and what we think a buyer ought to know.',
      img: HC_PHOTOS.journal3,
    },
  ];
  return (
    <section className="hc-section" id="journal" style={{ paddingBottom: 96 }}>
      <div className="hc-shell">
        <div className="hc-section-head">
          <div className="hc-section-num">№ 05<span>The Journal</span></div>
          <div>
            <h2 className="hc-section-title">Notes from <em>the desk.</em></h2>
            <p className="hc-section-sub">
              We keep a small journal of essays, field notes, and letters about the houses we sell, the towns we work in, and the slow architecture of the Valley.
            </p>
          </div>
        </div>

        <div className="hc-journal-grid">
          {items.map((it, i) => (
            <a key={i} className="hc-journal-item" href="#">
              <div className="hc-journal-img">
                <img src={it.img} alt="" loading="lazy" />
              </div>
              <div className="hc-journal-meta">
                <span>{it.cat}</span>
                <span className="sep"></span>
                <span>{it.date}</span>
              </div>
              <h3 className="hc-journal-title">{it.title}</h3>
              <p className="hc-journal-blurb">{it.blurb}</p>
              <span className="hc-mono" style={{ color: 'var(--hc-ink)', borderBottom: '1px solid currentColor', paddingBottom: 4, alignSelf: 'flex-start' }}>Read essay →</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="hc-contact" id="contact">
      <div className="hc-shell">
        <div className="hc-section-head" style={{ marginBottom: 64 }}>
          <div className="hc-section-num">
            <span style={{ color: 'rgba(242,239,234,0.5)' }}>№ 06</span>
            <span style={{ color: 'rgba(242,239,234,0.85)' }}>An Introduction</span>
          </div>
          <div>
            <h2 className="hc-section-title">Begin <em>quietly.</em></h2>
            <p className="hc-section-sub" style={{ color: 'rgba(242,239,234,0.7)' }}>
              Whether you are considering selling, looking for a particular kind of house, or simply curious about a property in the Valley — write us. A Mehta will read it personally and reply within two days.
            </p>
          </div>
        </div>

        <div className="hc-contact-grid">
          <form className="hc-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
            <div className="hc-form-row">
              <div className="hc-field">
                <label>Your name</label>
                <input type="text" placeholder="Naina Mehta" required />
              </div>
              <div className="hc-field">
                <label>Telephone</label>
                <input type="tel" placeholder="+91 22 2640 0162" />
              </div>
            </div>
            <div className="hc-field">
              <label>Email</label>
              <input type="email" placeholder="naina@mehtaandsons.in" required />
            </div>
            <div className="hc-form-row">
              <div className="hc-field">
                <label>I am</label>
                <select>
                  <option>Considering selling</option>
                  <option>Looking for a home</option>
                  <option>Asking about a specific property</option>
                  <option>Just exploring</option>
                </select>
              </div>
              <div className="hc-field">
                <label>Town(s) of interest</label>
                <input type="text" placeholder="Bandra, Lonavala…" />
              </div>
            </div>
            <div className="hc-field">
              <label>A few words</label>
              <textarea placeholder="Tell us about your house, the kind of place you have in mind, or the property you'd like to know more about."></textarea>
            </div>
            <button type="submit" className="hc-submit">
              {submitted
                ? '✓ Sent — we’ll reply within two days'
                : <>Send introduction <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1" /></svg></>}
            </button>
          </form>

          <aside className="hc-contact-aside">
            <div className="item">
              <div className="label">Office</div>
              <div className="value"><em>14 Hill Road</em><div className="value-sub">Bandra (W), Mumbai 400050</div></div>
            </div>
            <div className="item">
              <div className="label">Telephone</div>
              <div className="value"><em>+91 22 2640 0162</em><div className="value-sub">Mon–Sat · 10am to 6pm IST</div></div>
            </div>
            <div className="item">
              <div className="label">Naina</div>
              <div className="value"><em>naina@mehtaandsons.in</em><div className="value-sub">Personally read · two-day reply</div></div>
            </div>
            <div className="item">
              <div className="label">Visiting</div>
              <div className="value"><em>By appointment</em><div className="value-sub">Chai is offered. Always.</div></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="hc-footer">
      <div className="hc-shell">
        <div className="hc-footer-top">
          <div>
            <div className="hc-footer-mark">Mehta<br />&amp; Sons.</div>
            <p>A family-run real-estate office representing private estates and quiet houses across Mumbai and the Western Ghats. Established 1962.</p>
          </div>
          <div>
            <h4>Browse</h4>
            <ul>
              <li><a href="#properties">Homes</a></li>
              <li><a href="#properties">Estates</a></li>
              <li><a href="#properties">Land</a></li>
              <li><a href="#properties">Recently placed</a></li>
            </ul>
          </div>
          <div>
            <h4>The Office</h4>
            <ul>
              <li><a href="#family">The family</a></li>
              <li><a href="#journal">Journal</a></li>
              <li><a href="#map">The Valley</a></li>
              <li><a href="#contact">Introduce yourself</a></li>
            </ul>
          </div>
          <div>
            <h4>Visit</h4>
            <ul>
              <li>14 Hill Road</li>
              <li>Bandra (W), Mumbai 400050</li>
              <li>+91 22 2640 0162</li>
              <li>By appointment</li>
            </ul>
          </div>
        </div>
        <div className="hc-footer-bottom">
          <div>© MCMLXII — MMXXVI · Mehta &amp; Sons · MahaRERA registered</div>
          <div>An independent, family-owned office</div>
          <div>Site by <a href="/">OnePixel Studio</a></div>
        </div>
      </div>
    </footer>
  );
}
