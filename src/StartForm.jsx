import { useCallback, useEffect, useRef, useState } from 'react';

// Paras · 2026-06-20: the "Start a project" qualifying flow. Opens as a full overlay from every CTA
// (openStartForm()). A few plain questions decide which of the three packages fits, then it hands
// off to WhatsApp with the answers prefilled. The result also lets the user switch to another plan,
// so the recommendation guides without trapping. No backend yet: submitLead() is the stub we point
// at the VPS later; the WhatsApp link is the live channel for now. Fixed dark palette like .contact
// / .process so it reads premium in both light and dark themes.

// TODO(Paras): replace with OnePixel's real WhatsApp number — country code + number, digits only
// (e.g. '919876543210'). Until then the hand-off opens a placeholder chat.
const WHATSAPP_NUMBER = '910000000000';

// TODO(Paras): once the VPS endpoint is live, set this URL and submitLead() will POST every lead to
// it (in addition to the WhatsApp hand-off). Empty for now, so we just log.
const LEAD_ENDPOINT = '';

// openStartForm() is imported by every CTA (nav, hero, hosting) so they stay decoupled from this
// component — they just fire the event; the single mounted <StartForm/> in App listens for it.
export function openStartForm() {
  window.dispatchEvent(new CustomEvent('onepixel:start'));
}

const GOALS = [
  { id: 'premium',   label: 'Look premium and build trust', hint: 'Make your brand look its best' },
  { id: 'enquiries', label: 'Bring in more customer enquiries', hint: 'Turn visitors into leads and calls' },
  { id: 'sell',      label: 'Sell products online', hint: 'An online store with secure payments' },
  { id: 'online',    label: 'Just get my business online', hint: 'A clean, professional presence, fast' },
];

const PRODUCTS = [
  { id: 'lt20',   label: 'Under 20 products' },
  { id: 'mid',    label: '20 to 100 products' },
  { id: 'gt100',  label: 'More than 100 products' },
  { id: 'unsure', label: 'Not sure yet' },
];

const STAGES = [
  { id: 'starting', label: 'Just starting out', hint: 'New, or about to launch' },
  { id: 'running',  label: 'Running, but the website lets us down', hint: 'You have a site, it underperforms' },
  { id: 'scaling',  label: 'Established and scaling', hint: 'Growing, ready to invest' },
];

const TIMELINES = [
  { id: 'now',     label: 'Right away', hint: 'Ready to begin this week' },
  { id: 'soon',    label: 'In the next 1 to 2 months' },
  { id: 'explore', label: 'Just exploring for now' },
];

const PACKAGES = {
  launch: {
    name: 'Launch', price: '₹9,999', tagline: 'Get online, properly',
    features: [
      'Up to 4 custom-designed pages',
      'Premium mobile-first responsive design',
      'Contact + WhatsApp lead capture',
      'Basic SEO + Google Business Profile setup',
      'Ready in about 7 to 10 days',
    ],
  },
  growth: {
    name: 'Growth', price: '₹19,999', tagline: 'Ready to scale', popular: true,
    features: [
      'Up to 8 pages',
      'Everything in Launch, plus:',
      'Advanced on-page SEO + speed optimization',
      'Analytics + Meta Pixel setup',
      'Ready in about 12 to 18 days',
    ],
  },
  flagship: {
    name: 'Flagship', price: '₹24,999', tagline: 'Stand out',
    features: [
      'Up to 12 pages',
      'Everything in Growth, plus:',
      'Signature animations and interactions',
      'Conversion-focused landing pages',
      'Full SEO, analytics and performance tuning',
      'Ready in about 18 to 28 days',
    ],
  },
};
const ORDER = ['launch', 'growth', 'flagship'];

const EMPTY = { goal: '', products: '', stage: '', timeline: '', name: '', whatsapp: '', email: '', business: '', consent: true };

function labelOf(list, id) { const f = list.find((o) => o.id === id); return f ? f.label : ''; }

// Transparent scoring: scope + ambition pick the tier. A bigger catalogue nudges a store upward.
function recommend(a) {
  let score = 0;
  if (a.goal === 'enquiries' || a.goal === 'premium' || a.goal === 'sell') score += 1;
  if (a.stage === 'running') score += 1;
  if (a.stage === 'scaling') score += 2;
  if (a.goal === 'sell' && a.products === 'gt100') score += 1;
  return score <= 0 ? 'launch' : score <= 2 ? 'growth' : 'flagship';
}

// Timeline is the strongest intent signal — used to pre-sort the inbox.
function leadTag(a) {
  if (a.timeline === 'now') return 'HOT';
  if (a.timeline === 'soon') return 'WARM';
  return 'LOW';
}

function waLink(a, tier) {
  const p = PACKAGES[tier];
  const lines = [
    "Hi OnePixel! I'd like to start a project.",
    '',
    `Goal: ${labelOf(GOALS, a.goal)}`,
    a.goal === 'sell' ? `Products: ${labelOf(PRODUCTS, a.products)}` : null,
    `Stage: ${labelOf(STAGES, a.stage)}`,
    `Timeline: ${labelOf(TIMELINES, a.timeline)}`,
    `Plan: ${p.name} (${p.price})`,
    '',
    `Name: ${a.name}`,
    a.business ? `Business: ${a.business}` : null,
    a.email ? `Email: ${a.email}` : null,
  ].filter((l) => l !== null);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

async function submitLead(payload) {
  // WhatsApp is the primary channel for now, so a failed POST must never block the user.
  try {
    if (LEAD_ENDPOINT) {
      await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      console.log('[OnePixel lead]', payload);
    }
  } catch (e) { /* swallow */ }
}

// Paras · 2026-06-20: Meta Pixel event helper. fbq is defined by the base code in the page <head>;
// guard it so the form keeps working if the pixel is blocked, not yet loaded, or absent in dev.
function track(event, params) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try { window.fbq('track', event, params); } catch (e) { /* swallow */ }
  }
}

function trapFocus(e, panel) {
  if (!panel) return;
  const f = panel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])');
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.25-4.35c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  );
}

function Options({ list, value, onPick }) {
  return (
    <div className="sf-opts">
      {list.map((o) => (
        <button
          key={o.id} type="button"
          className={`sf-opt ${value === o.id ? 'sel' : ''}`}
          onClick={() => onPick(o.id)}
        >
          <span className="sf-opt-pix" aria-hidden />
          <span className="sf-opt-text">
            <span className="sf-opt-label">{o.label}</span>
            {o.hint && <span className="sf-opt-hint">{o.hint}</span>}
          </span>
          <span className="sf-opt-arr" aria-hidden>→</span>
        </button>
      ))}
    </div>
  );
}

function PackageCard({ tier, isRec, ecom }) {
  const p = PACKAGES[tier];
  return (
    <div className="sf-pkg" key={tier}>
      <div className="sf-pkg-top">
        <div>
          <div className="sf-pkg-name">
            {p.name}
            {isRec && <span className="sf-pkg-badge sf-pkg-badge-rec">Recommended</span>}
            {p.popular && <span className="sf-pkg-badge">Most chosen</span>}
          </div>
          <div className="sf-pkg-tag">{p.tagline}</div>
        </div>
        <div className="sf-pkg-price">{p.price}</div>
      </div>
      <ul className="sf-pkg-feats">
        {p.features.map((f, i) => (
          <li key={i} className={/^Everything in/.test(f) ? 'sf-feat-note' : ''}>{f}</li>
        ))}
      </ul>
      {ecom && <div className="sf-pkg-addon">+ Online store with secure payments, quoted to fit your needs.</div>}
      <div className="sf-pkg-host"><span aria-hidden>✓</span> 6 months hosting + SSL included</div>
    </div>
  );
}

export function StartForm() {
  const [open, setOpen] = useState(false);
  const [stepId, setStepId] = useState('goal');
  const [a, setA] = useState(EMPTY);
  const [chosen, setChosen] = useState(null); // plan the user picked at the result, overrides the recommendation
  const [err, setErr] = useState(''); // contact-step validation message
  const panelRef = useRef(null);
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const onOpen = () => { setA(EMPTY); setChosen(null); setErr(''); setStepId('goal'); setOpen(true); };
    window.addEventListener('onepixel:start', onOpen);
    return () => window.removeEventListener('onepixel:start', onOpen);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'Tab') trapFocus(e, panelRef.current);
    };
    document.addEventListener('keydown', onKey);
    const t = setTimeout(() => {
      panelRef.current?.querySelector('button, [href], input')?.focus();
    }, 60);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, close]);

  useEffect(() => {
    if (open && stepId === 'result') {
      const tier = recommend(a);
      submitLead({
        recommended: PACKAGES[tier].name, price: PACKAGES[tier].price, tag: leadTag(a),
        goal: labelOf(GOALS, a.goal),
        products: a.goal === 'sell' ? labelOf(PRODUCTS, a.products) : '',
        stage: labelOf(STAGES, a.stage), timeline: labelOf(TIMELINES, a.timeline),
        name: a.name, whatsapp: a.whatsapp, email: a.email, business: a.business,
        at: new Date().toISOString(),
      });
      track('Lead', { content_name: PACKAGES[tier].name, content_category: 'website-form' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepId, open]);

  if (!open) return null;

  const order = a.goal === 'sell'
    ? ['goal', 'products', 'stage', 'timeline', 'contact', 'result']
    : ['goal', 'stage', 'timeline', 'contact', 'result'];
  const idx = order.indexOf(stepId);
  const optTotal = a.goal === 'sell' ? 4 : 3;

  const go = (id) => setStepId(id);
  const back = () => { const i = order.indexOf(stepId); if (i > 0) go(order[i - 1]); };
  const next = () => { const i = order.indexOf(stepId); if (i < order.length - 1) go(order[i + 1]); };

  // Set the answer, then auto-advance once the selected state has painted.
  const pick = (key, val) => {
    setA((s) => ({ ...s, [key]: val }));
    const advance = () => {
      if (key === 'goal') go(val === 'sell' ? 'products' : 'stage');
      else if (key === 'products') go('stage');
      else if (key === 'stage') go('timeline');
      else if (key === 'timeline') go('contact');
    };
    if (reduce) advance(); else setTimeout(advance, 220);
  };

  const restart = () => { setA(EMPTY); setChosen(null); setErr(''); setStepId('goal'); };

  let bodyEl;
  if (stepId === 'goal') {
    bodyEl = (
      <div className="sf-step">
        <div className="sf-step-meta">Question 1 of {optTotal}</div>
        <h3 className="sf-step-title">What is the main goal for your new website?</h3>
        <Options list={GOALS} value={a.goal} onPick={(v) => pick('goal', v)} />
      </div>
    );
  } else if (stepId === 'products') {
    bodyEl = (
      <div className="sf-step">
        <div className="sf-step-meta">Question 2 of {optTotal}</div>
        <h3 className="sf-step-title">Roughly how many products will you sell?</h3>
        <p className="sf-step-sub">This helps us size your store and quote the add-on fairly.</p>
        <Options list={PRODUCTS} value={a.products} onPick={(v) => pick('products', v)} />
      </div>
    );
  } else if (stepId === 'stage') {
    bodyEl = (
      <div className="sf-step">
        <div className="sf-step-meta">Question {idx + 1} of {optTotal}</div>
        <h3 className="sf-step-title">Where is your business right now?</h3>
        <Options list={STAGES} value={a.stage} onPick={(v) => pick('stage', v)} />
      </div>
    );
  } else if (stepId === 'timeline') {
    bodyEl = (
      <div className="sf-step">
        <div className="sf-step-meta">Question {idx + 1} of {optTotal}</div>
        <h3 className="sf-step-title">When do you want to launch?</h3>
        <Options list={TIMELINES} value={a.timeline} onPick={(v) => pick('timeline', v)} />
      </div>
    );
  } else if (stepId === 'contact') {
    // Paras · 2026-06-20: inputs are UNCONTROLLED (defaultValue + onBlur sync). Mobile autofill often
    // fills the field without firing React's onChange, so a controlled value would stay empty (and a
    // disabled submit button would never enable). We read the LIVE field values on submit instead, so
    // autofilled or typed values are always captured, then validate the trimmed values.
    const sync = (k) => (e) => setA((s) => ({ ...s, [k]: e.target.value }));
    const onSubmit = (e) => {
      e.preventDefault();
      const f = e.currentTarget;
      const v = {
        name: f.querySelector('#sf-name').value.trim(),
        whatsapp: f.querySelector('#sf-wa').value.trim(),
        email: f.querySelector('#sf-email').value.trim(),
        business: f.querySelector('#sf-biz').value.trim(),
        consent: f.querySelector('#sf-consent').checked,
      };
      if (!v.name) return setErr('Please add your name.');
      if (v.whatsapp.replace(/\D/g, '').length < 10) return setErr('Please add a valid WhatsApp number, with country code.');
      if (!/^\S+@\S+\.\S+$/.test(v.email)) return setErr('Please add a valid email address.');
      if (!v.consent) return setErr('Please tick the box so we can get back to you.');
      setErr('');
      setA((s) => ({ ...s, ...v }));
      next();
    };
    bodyEl = (
      <div className="sf-step">
        <div className="sf-step-meta">Last step</div>
        <h3 className="sf-step-title">Where should we reach you?</h3>
        <p className="sf-step-sub">We will send your recommendation and follow up on WhatsApp, usually within a few hours.</p>
        <form noValidate onSubmit={onSubmit}>
          <div className="sf-field">
            <label htmlFor="sf-name">Your name</label>
            <input id="sf-name" defaultValue={a.name} autoComplete="name" placeholder="e.g. Aarav Sharma" onBlur={sync('name')} />
          </div>
          <div className="sf-row2">
            <div className="sf-field">
              <label htmlFor="sf-wa">WhatsApp number</label>
              <input id="sf-wa" type="tel" inputMode="tel" defaultValue={a.whatsapp} autoComplete="tel" placeholder="+91 98765 43210" onBlur={sync('whatsapp')} />
            </div>
            <div className="sf-field">
              <label htmlFor="sf-email">Email</label>
              <input id="sf-email" type="email" inputMode="email" autoCapitalize="off" autoCorrect="off" spellCheck={false} defaultValue={a.email} autoComplete="email" placeholder="you@business.com" onBlur={sync('email')} />
            </div>
          </div>
          <div className="sf-field">
            <label htmlFor="sf-biz">Business name <span className="sf-opt-soft">(optional)</span></label>
            <input id="sf-biz" defaultValue={a.business} autoComplete="organization" placeholder="Your company" onBlur={sync('business')} />
          </div>
          <label className="sf-consent">
            <input id="sf-consent" type="checkbox" defaultChecked={a.consent} />
            <span>I would like OnePixel to contact me about my project on WhatsApp or email.</span>
          </label>
          {err && <div className="sf-error" role="alert">{err}</div>}
          <button type="submit" className="sf-submit">See my recommendation →</button>
        </form>
      </div>
    );
  } else {
    const recTier = recommend(a);
    const selTier = chosen || recTier;
    const sel = PACKAGES[selTier];
    const isRec = selTier === recTier;
    const ecom = a.goal === 'sell';
    const link = waLink(a, selTier);
    const others = ORDER.filter((t) => t !== selTier);
    bodyEl = (
      <div className="sf-result">
        <div className="sf-result-tag">{isRec ? '✦ Recommended for you' : '✦ Your choice'}</div>
        <h3 className="sf-result-h">
          {isRec
            ? <>Based on your answers, <em>{sel.name}</em> is the right fit.</>
            : <>Great pick. <em>{sel.name}</em> it is.</>}
        </h3>

        <PackageCard tier={selTier} isRec={isRec} ecom={ecom} />

        <a className="sf-wa" href={link} target="_blank" rel="noopener noreferrer" onClick={() => track('Contact')}><WaIcon /> Continue on WhatsApp</a>
        <p className="sf-fineprint">No payment now. We confirm everything on chat first.</p>

        <div className="sf-others">
          <div className="sf-others-label">Prefer a different plan?</div>
          {others.map((t) => {
            const op = PACKAGES[t];
            return (
              <button key={t} type="button" className="sf-other" onClick={() => setChosen(t)}>
                <span className="sf-other-main">
                  <span className="sf-other-name">
                    {op.name}
                    {t === recTier && <span className="sf-other-rec">Recommended</span>}
                    {op.popular && <span className="sf-pkg-badge">Most chosen</span>}
                  </span>
                  <span className="sf-other-tag">{op.tagline}</span>
                </span>
                <span className="sf-other-price">{op.price}</span>
                <span className="sf-other-arr" aria-hidden>→</span>
              </button>
            );
          })}
        </div>

        <button type="button" className="sf-restart" onClick={restart}>Start over</button>
      </div>
    );
  }

  return (
    <div className="sf-overlay" role="dialog" aria-modal="true" aria-label="Start a project">
      <div className="sf-backdrop" onClick={close} />
      <div className="sf-panel" ref={panelRef}>
        <div className="sf-head">
          <span className="sf-eyebrow"><span className="sf-eyebrow-pix" aria-hidden /> Start a project</span>
          <div className="sf-head-right">
            {stepId !== 'result' && (
              <div className="sf-dots" aria-hidden>
                {order.slice(0, -1).map((s, i) => (
                  <span key={s} className={`sf-dot ${i < idx ? 'done' : i === idx ? 'cur' : ''}`} />
                ))}
              </div>
            )}
            <button type="button" className="sf-close" onClick={close} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" /></svg>
            </button>
          </div>
        </div>

        <div className="sf-body" key={stepId}>{bodyEl}</div>

        {idx > 0 && stepId !== 'result' && (
          <div className="sf-foot">
            <button type="button" className="sf-back" onClick={back}>← Back</button>
          </div>
        )}
      </div>
    </div>
  );
}
