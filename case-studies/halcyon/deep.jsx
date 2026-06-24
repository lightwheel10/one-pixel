import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HC_PHOTOS } from './photos.js';

gsap.registerPlugin(ScrollTrigger);

export function History() {
  const reelRef = useRef(null);
  const trackRef = useRef(null);
  const beats = [
    { year: '1962', kicker: 'The beginning',      text: 'A one room office opens on Hill Road, Bandra.', img: HC_PHOTOS.hero, alt: 'Bombay, around the founding' },
    { year: '1971', kicker: 'Into the hills',      text: 'The first house beyond the city changes hands, in Lonavala.' },
    { year: '1989', kicker: 'A second name',       text: 'Anjali Mehta joins. The office becomes a partnership of two.', img: HC_PHOTOS.featuredMain, alt: 'An early estate' },
    { year: '1996', kicker: 'The corridor widens', text: 'A second desk opens for the hill estates, Khandala to Mahabaleshwar.' },
    { year: '2001', kicker: 'The chair passes',    text: 'Anjali takes the principal’s chair.' },
    { year: '2014', kicker: 'A third name',        text: 'Naina Mehta returns as the third generation.', img: HC_PHOTOS.featuredDetail, alt: 'A room in a kept house' },
    { year: '2026', kicker: 'Today',               text: 'Three names on the door. One corridor. Still by appointment.', now: true },
  ];

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mm = gsap.matchMedia();
    const HOLD = 0.14; // share of the scroll spent settling on the final beat before release

    // Desktop + motion: pin the reel, travel it sideways, then hold on the last beat.
    mm.add('(min-width: 861px) and (prefers-reduced-motion: no-preference)', () => {
      const reel = reelRef.current;
      const track = trackRef.current;
      const fill = reel.querySelector('.hc-rec-fill');
      const panels = gsap.utils.toArray(track.querySelectorAll('.hc-rec-panel'));
      const last = panels.length - 1;
      const lastStage = panels[last].querySelector('.hc-rec-stage');
      reel.classList.add('is-reel');
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);

      let activeIdx = -1;
      const setActive = (idx) => {
        if (idx === activeIdx) return;
        if (activeIdx >= 0) panels[activeIdx].classList.remove('is-active');
        panels[idx].classList.add('is-active');
        activeIdx = idx;
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: reel,
          start: 'top top',
          end: () => '+=' + Math.round(dist() * (1 + HOLD)),
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // travel runs over the first 1/(1+HOLD) of the scroll, then holds.
            const travel = Math.min(1, self.progress * (1 + HOLD));
            if (fill) fill.style.transform = `scaleX(${travel})`;
            // the beat sitting at screen-centre is pure geometry — no edge cases.
            setActive(Math.round(travel * last));
          },
        },
      });
      tl.to(track, { x: () => -dist(), ease: 'none', duration: 1 });
      // The dwell is a real (scrubbed) motion, not an empty gap — so scrolling
      // through it responds in BOTH directions and reverse never hits a dead zone.
      tl.fromTo(lastStage, { scale: 1 }, { scale: 1.1, ease: 'none', duration: HOLD });

      setActive(0);

      return () => {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
        if (activeIdx >= 0) panels[activeIdx].classList.remove('is-active');
        reel.classList.remove('is-reel');
      };
    });

    // The loader locks body scroll for ~2.5s and the big display font loads late;
    // recompute every trigger once both have settled so the pin geometry is correct.
    const refresh = () => ScrollTrigger.refresh();
    document.addEventListener('onepixel:loader-complete', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    return () => {
      document.removeEventListener('onepixel:loader-complete', refresh);
      mm.revert();
    };
  }, []);

  return (
    <section className="hc-record" id="history">
      <div className="hc-shell">
        <div className="hc-section-head">
          <div className="hc-section-num">№ 03<span>The Record</span></div>
          <div>
            <h2 className="hc-section-title">Sixty two <em>years.</em></h2>
            <p className="hc-section-sub">
              One office, one road, one corridor of hills. A short record of the years between, and the few moments worth keeping.
            </p>
          </div>
        </div>
      </div>

      <div className="hc-record-reel" ref={reelRef}>
        <div className="hc-record-track" ref={trackRef}>
          {beats.map((b) => (
            <article key={b.year} className={`hc-rec-panel${b.now ? ' now' : ''}`}>
              <span className="hc-rec-kicker">{b.kicker}</span>
              <div className="hc-rec-stage">
                {b.img && (
                  <div className="hc-rec-img">
                    <img className="full" src={b.img} alt={b.alt} loading="lazy" />
                    <img className="tone" src={b.img} alt="" aria-hidden="true" loading="lazy" />
                  </div>
                )}
                <span className="hc-rec-year" data-year={b.year}>{b.year}</span>
              </div>
              <p className="hc-rec-event">{b.text}</p>
            </article>
          ))}
        </div>

        <div className="hc-record-progress" aria-hidden="true">
          <span className="hc-rec-plabel">1962</span>
          <div className="hc-rec-pbar"><div className="hc-rec-fill"></div></div>
          <span className="hc-rec-plabel">2026</span>
        </div>
      </div>
    </section>
  );
}

export function Family() {
  const members = [
    {
      n: '1',
      name: 'Aditya Mehta',
      em: 'Aditya',
      role: 'Founder · 1962 to 2001',
      bio: 'Opened a small office on Hill Road, Bandra, with a typewriter, a phone, and a list of seventeen names. The list, he insisted, was the only inventory worth keeping.',
      img: HC_PHOTOS.fam1,
    },
    {
      n: '2',
      name: 'Anjali Mehta',
      em: 'Anjali',
      role: 'Principal · 1989 to present',
      bio: 'Joined her father out of St. Xavier’s. Listed our first estate in The Bombay Times in 1992. Still walks every property with a measuring tape and a notebook.',
      img: HC_PHOTOS.fam2,
    },
    {
      n: '3',
      name: 'Naina Mehta',
      em: 'Naina',
      role: 'Principal Broker · 2014 to present',
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
              We have grown slowly, by one Mehta a generation. Every listing is read, walked, and signed by one of us. Every closing has a Mehta at the table.
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
          <div className="attr">Naina Mehta · Principal Broker · 2024</div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const featured = {
    quote: 'We had walked past Brindavan for years. Naina knew the house before we did, and waited until we were ready for it.',
    who: 'The Kapoors', where: 'Brindavan, Walkeshwar', year: '2019', img: HC_PHOTOS.prop6,
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.hc-tm-reveal', {
        y: 32,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: { trigger: ref.current, start: 'top 72%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hc-section" id="clients" ref={ref} style={{ paddingBottom: 96 }}>
      <div className="hc-shell">
        <div className="hc-section-head">
          <div className="hc-section-num">№ 05<span>The Clients</span></div>
          <div>
            <h2 className="hc-section-title">In good <em>company.</em></h2>
            <p className="hc-section-sub">
              Most of our work arrives by introduction. A few words from the families whose houses we have kept.
            </p>
          </div>
        </div>

        <figure className="hc-tm-lead hc-tm-reveal">
          <div className="hc-tm-lead-img"><img src={featured.img} alt="Brindavan, Walkeshwar" loading="lazy" /></div>
          <div className="hc-tm-lead-body">
            <span className="hc-tm-mark" aria-hidden="true">“</span>
            <blockquote className="hc-tm-quote">{featured.quote}</blockquote>
            <figcaption className="hc-tm-by">
              <span className="hc-tm-sign">{featured.who}</span>
              <span className="hc-tm-meta">{featured.where} · {featured.year}</span>
            </figcaption>
          </div>
        </figure>
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
              Whether you are considering selling, looking for a particular kind of house, or simply curious about a property in the Valley, write us. A Mehta will read it personally and reply within two days.
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
                ? '✓ Sent. We’ll reply within two days'
                : <>Send introduction <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1" /></svg></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Paras · 2026-06-23: the office/visit details, lifted out of the Contact section (which is now
// form-only) into their own cream band below it. Each cell reveals on scroll via GSAP (stagger
// up + fade). Reduced-motion shows the final state immediately.
export function Office() {
  const ref = useRef(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.from('.hc-office-reveal', {
        y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const items = [
    { label: 'Office',    value: '14 Hill Road',          sub: 'Bandra (W), 400050' },
    { label: 'Telephone', value: '+91 22 2640 0162',      sub: 'Monday to Saturday · 10am to 6pm IST', href: 'tel:+912226400162' },
    { label: 'Write',     value: 'naina@mehtaandsons.in', sub: 'Personally read · reply within two days', href: 'mailto:naina@mehtaandsons.in' },
    { label: 'Visiting',  value: 'By appointment',        sub: 'Chai is offered. Always.' },
  ];

  return (
    <section className="hc-office" id="visit" ref={ref}>
      <div className="hc-shell">
        <div className="hc-office-eyebrow hc-office-reveal">The Office</div>
        <div className="hc-office-grid">
          {items.map((it, i) => (
            <div className="hc-office-item hc-office-reveal" key={i}>
              <div className="hc-office-label">{it.label}</div>
              <div className="hc-office-value">
                {it.href ? <a href={it.href}>{it.value}</a> : it.value}
              </div>
              <div className="hc-office-sub">{it.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="hc-footer">
      <div className="hc-shell">
        <div className="hc-footer-mark">Mehta <span className="amp">&amp;</span> Sons</div>
        <div className="hc-footer-row">
          <p className="hc-footer-essence">
            Private estates and quiet houses across the Western Ghats, kept by one family since 1962.
          </p>
          <a href="#contact" className="hc-footer-cta">
            Begin an introduction
            <svg width="16" height="11" viewBox="0 0 14 10" fill="none" aria-hidden="true"><path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1" /></svg>
          </a>
        </div>
        <div className="hc-footer-bottom">
          <span>Est. 1962 · © 2026 · Mehta &amp; Sons · MahaRERA registered</span>
          <span>Site by <a href="/">OnePixel Studio</a></span>
        </div>
      </div>
    </footer>
  );
}
