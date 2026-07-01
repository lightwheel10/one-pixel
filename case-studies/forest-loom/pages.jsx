import { useState, useRef, useEffect } from 'react';
import { useCart, navigate } from './store.jsx';
import { useReveals, useHomeAnim, useProductAnim } from './useAnim.js';
import { ProductCard, ColourDot, ShopCard } from './ui.jsx';
import { IMG } from './images.js';
import {
  PRODUCTS, CATEGORIES, COLOURWAYS, ORIGIN, MAKERS, BRAND, FAQ,
  HERO_PRODUCT, HERO_SLIDES, LOOK, WEAVE, ROOM,
  ratingFor, REVIEWS, REVIEW_DIST,
  formatRupee, getProduct, related,
} from './data.js';

const goTo = (target) => {
  if (target === 'story') return navigate('/story');
  const el = document.getElementById(target);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function Accordion({ title, children, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className={`fl-acc ${open ? 'open' : ''}`}>
      <button type="button" className="fl-acc-sum" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {title}<span className="fl-acc-mark" aria-hidden="true" />
      </button>
      <div className="fl-acc-wrap"><div className="fl-acc-inner">{children}</div></div>
    </div>
  );
}

function Stars({ value }) {
  const full = Math.round(value);
  return (
    <span className="fl-stars" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= full ? 'on' : ''} aria-hidden="true">★</span>
      ))}
    </span>
  );
}

/* =================================================================== HOME */
export function Home() {
  const featured = PRODUCTS.filter((p) => p.featured);
  const [weave, setWeave] = useState(1);
  const [hot, setHot] = useState(0);
  const [heroCard, setHeroCard] = useState(true);
  const [slide, setSlide] = useState(0);
  const lookItems = LOOK.items.map(getProduct);
  const ref = useRef(null);
  useHomeAnim(ref);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fl-page" ref={ref}>
      {/* ---- hero ---- */}
      <section className="fl-hero" id="top">
        <div className="fl-hero-img">
          {HERO_SLIDES.map((src, i) => (
            <img key={i} src={src} alt="" className={i === slide ? 'is-on' : ''} loading={i === 0 ? 'eager' : 'lazy'} />
          ))}
        </div>
        <div className="fl-hero-scrim" aria-hidden="true" />

        <div className="fl-hero-inner">
          <span className="fl-hero-eyebrow">The Living Lookbook · Spring 2026</span>
          <h1 className="fl-hero-title"><span className="fl-hl">The</span><span className="fl-hl">Living</span><span className="fl-hl">Cloth</span></h1>
          <button className="fl-hero-scrollcue" onClick={() => goTo('look')}>Scroll</button>
        </div>

        {heroCard && (
          <div className="fl-hero-card">
            <ShopCard id={HERO_PRODUCT} eyebrow="The Blanket" onClose={() => setHeroCard(false)} />
          </div>
        )}
      </section>

      {/* ---- shop the look ---- */}
      <section className="fl-look fl-slash-up" id="look">
        <div className="fl-look-media"><img src={IMG.lookMain} alt="A look from the collection" loading="lazy" /></div>
        <div className="fl-look-panel" data-reveal>
          <span className="fl-eyebrow">{LOOK.label}</span>
          <h2 className="fl-h2">{LOOK.title.split('\n').map((t, i) => <span key={i}>{t}<br /></span>)}</h2>
          <ul className="fl-look-list">
            {lookItems.map((p) => (
              <li key={p.id} className="fl-look-row">
                <a href={'#/product/' + p.id} className="fl-look-thumb"><img src={p.img} alt={p.name} loading="lazy" /></a>
                <div className="fl-look-rowbody">
                  <a href={'#/product/' + p.id} className="fl-look-name">{p.name}</a>
                  <span className="fl-look-price">{formatRupee(p.price)}</span>
                </div>
                <AddDot product={p} />
              </li>
            ))}
          </ul>
          <a href="#/shop" className="fl-link">View the full look</a>
        </div>
      </section>

      {/* ---- the weave (craft) ---- */}
      <section className="fl-weave fl-slash-down" id="weave">
        <div className="fl-weave-media"><img src={IMG.craftMain} alt="Cloth on the loom" loading="lazy" /></div>
        <div className="fl-weave-panel" data-reveal>
          <span className="fl-eyebrow fl-eyebrow-gold">The cloth within</span>
          <ol className="fl-weave-nav">
            {WEAVE.map((w, i) => (
              <li key={w.n} className={i === weave ? 'on' : ''}>
                <button className={i === weave ? 'on' : ''} aria-expanded={i === weave} onClick={() => setWeave(i)}>
                  <i>{w.n}</i>{w.label}
                </button>
                {/* Small screens: only the active item renders its detail, directly beneath its heading. */}
                {i === weave && (
                  <div className="fl-weave-acc">
                    <p>{w.text}</p>
                    <a href="#/story" className="fl-link fl-link-light">Explore the craft</a>
                  </div>
                )}
              </li>
            ))}
          </ol>
          {/* Desktop: a single detail panel below the full list. */}
          <div className="fl-weave-detail" key={weave}>
            <p>{WEAVE[weave].text}</p>
            <a href="#/story" className="fl-link fl-link-light">Explore the craft</a>
          </div>
        </div>
      </section>

      {/* ---- shop the room ---- */}
      <section className="fl-room fl-slash-up" id="room">
        <div className="fl-room-media">
          <img src={IMG.roomMain} alt="A room dressed in our cloth" loading="lazy" />
          <div className="fl-room-scrim" aria-hidden="true" />
          {ROOM.map((r, i) => (
            <button
              key={r.id}
              className={`fl-hotspot ${i === hot ? 'on' : ''}`}
              style={{ left: r.x + '%', top: r.y + '%' }}
              aria-label={getProduct(r.id)?.name}
              onClick={() => setHot(i)}
            >{i + 1}</button>
          ))}
          <div className="fl-room-card">
            <ShopCard id={ROOM[hot].id} eyebrow={`${hot + 1} / ${getProduct(ROOM[hot].id)?.type === 'home' ? 'For the home' : 'In this room'}`} />
          </div>
        </div>
        <div className="fl-room-copy" data-reveal>
          <span className="fl-eyebrow fl-eyebrow-gold">Shop the room</span>
          <h2 className="fl-h2 fl-h2-on">Curated pieces,<br />considered home.</h2>
          <a href="#/shop/home" className="fl-link fl-link-light">View all</a>
        </div>
      </section>

      {/* ---- the collection ---- */}
      <section className="fl-home-section fl-shell fl-slash-down">
        <header className="fl-sec-head" data-reveal>
          <div>
            <span className="fl-eyebrow">The collection</span>
            <h2 className="fl-h2">Pieces we are proud of.</h2>
          </div>
          <a href="#/shop" className="fl-link">See everything</a>
        </header>
        <div className="fl-grid" data-reveal-group>
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* ---- closing ---- */}
      <section className="fl-close fl-slash-down">
        <img src={IMG.closingMain} alt="" loading="lazy" />
        <div className="fl-close-scrim" aria-hidden="true" />
        <div className="fl-close-inner" data-reveal>
          <h2 className="fl-h1 fl-h1-on">Cloth for<br />a life well lived.</h2>
          <a href="#/shop" className="fl-btn fl-btn-light">Discover the collection</a>
        </div>
      </section>
    </div>
  );
}

function AddDot({ product }) {
  const { add } = useCart();
  return (
    <button className="fl-look-add" aria-label={`Add ${product.name} to bag`} onClick={() => add(product, product.base)}>+</button>
  );
}

/* =================================================================== SHOP */
export function Shop({ category }) {
  const cat = category && CATEGORIES.some((c) => c.v === category) ? category : 'all';
  const list = cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.type === cat);
  const meta = CATEGORIES.find((c) => c.v === cat);
  const ref = useRef(null);
  useReveals(ref);
  return (
    <div className="fl-page fl-shell fl-shop" ref={ref}>
      <header className="fl-shop-head" data-reveal>
        <span className="fl-eyebrow">{meta ? meta.tag : 'Everything we make'}</span>
        <h1 className="fl-h1">{meta ? meta.l : 'The Collection'}</h1>
        <p className="fl-lede">
          We keep a small range and weave it again when it sells. Each piece is one cloth, from one
          loom, in the colours its dyer could grow this season.
        </p>
      </header>

      <div className="fl-tabs">
        <a href="#/shop" className={`fl-tab ${cat === 'all' ? 'on' : ''}`}>Everything</a>
        {CATEGORIES.map((c) => (
          <a key={c.v} href={'#/shop/' + c.v} className={`fl-tab ${cat === c.v ? 'on' : ''}`}>{c.l}</a>
        ))}
        <span className="fl-count">{list.length} pieces</span>
      </div>

      <div className="fl-grid" key={cat} data-reveal-group>
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

/* ================================================================ PRODUCT */
export function Product({ id }) {
  const { add, toggleSave, isSaved } = useCart();
  const p = getProduct(id);
  const [colour, setColour] = useState(p ? p.base : null);
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);
  const [stuck, setStuck] = useState(false);
  const [added, setAdded] = useState(false);
  const [pin, setPin] = useState('');
  const [pinChecked, setPinChecked] = useState(false);
  const ref = useRef(null);
  const buyRef = useRef(null);
  const addedTimer = useRef();
  useProductAnim(ref);

  // Reveal the sticky add-to-bag bar once the main buy block has scrolled away.
  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setStuck(!e.isIntersecting && e.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id]);

  if (!p) {
    return (
      <div className="fl-page fl-shell fl-missing">
        <h1 className="fl-h1">We cannot find that one.</h1>
        <p className="fl-lede">It may have sold through, or the link is old.</p>
        <a href="#/shop" className="fl-btn">Back to the shop</a>
      </div>
    );
  }

  const cat = CATEGORIES.find((c) => c.v === p.type);
  const gallery = [...(p.gallery || [p.img]), IMG.detailMacro, IMG.foldedStack];
  const doAdd = () => {
    add(p, colour, qty);
    setAdded(true);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 1600);
  };
  const r = ratingFor(p.id);
  const eta = new Date(Date.now() + 8 * 86400000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  const featured = REVIEWS.find((rv) => rv.img);
  const rest = REVIEWS.filter((rv) => !rv.img);

  return (
    <div className="fl-page fl-shell fl-pd" ref={ref}>
      <nav className="fl-crumb" aria-label="Breadcrumb">
        <a href="#/shop">Shop</a><span>/</span>
        <a href={'#/shop/' + p.type}>{cat ? cat.l : 'All'}</a><span>/</span>
        <span aria-current="page">{p.name}</span>
      </nav>

      <div className="fl-pd-grid">
        {/* gallery */}
        <div className="fl-pd-gallery">
          <div className="fl-pd-thumbs">
            {gallery.map((src, i) => (
              <button key={i} type="button" className={`fl-pd-thumb ${i === shot ? 'on' : ''}`} aria-label={`View image ${i + 1}`} onClick={() => setShot(i)}>
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
          <div className="fl-pd-main">
            {gallery.map((src, i) => (
              <img key={i} src={src} alt={i === 0 ? p.name : ''} className={i === shot ? 'is-on' : ''} loading={i === 0 ? 'eager' : 'lazy'} />
            ))}
          </div>
        </div>

        {/* info */}
        <div className="fl-pd-info">
          <span className="fl-pd-cat">{cat ? cat.l : ''}</span>
          <h1 className="fl-pd-name">{p.name}</h1>
          <button type="button" className="fl-pd-rating" onClick={() => document.getElementById('fl-reviews')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
            <Stars value={r.avg} />
            <span>{r.avg.toFixed(1)} · {r.count} reviews</span>
          </button>
          <div className="fl-pd-price">{formatRupee(p.price)}</div>
          <p className="fl-pd-line">{p.desc}</p>

          <div className="fl-pd-colour">
            <span className="fl-pd-clabel">Colour — {COLOURWAYS[colour].name}</span>
            <div className="fl-pd-swatches">
              {p.colours.map((c) => (
                <button key={c} type="button" className={`fl-pd-sw ${c === colour ? 'on' : ''}`} aria-pressed={c === colour} onClick={() => setColour(c)}>
                  <span style={{ '--c': COLOURWAYS[c].hex }} aria-hidden="true" />
                  {COLOURWAYS[c].name}
                </button>
              ))}
            </div>
          </div>

          <div className="fl-pd-buy" ref={buyRef}>
            <div className="fl-qtybox">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="One fewer">–</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} aria-label="One more">+</button>
            </div>
            <button className={`fl-btn fl-btn-buy ${added ? 'added' : ''}`} onClick={doAdd}>
              {added ? 'Added to bag ✓' : `Add to bag · ${formatRupee(p.price * qty)}`}
            </button>
            <button type="button" className={`fl-pd-save ${isSaved(p.id) ? 'on' : ''}`} aria-pressed={isSaved(p.id)} aria-label={isSaved(p.id) ? 'Saved' : 'Save for later'} onClick={() => toggleSave(p.id)}>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 21s-7.4-4.6-9.9-9.2C.7 8.7 2 5.6 5 5.6c1.9 0 3.2 1.1 4 2.3.8-1.2 2.1-2.3 4-2.3 3 0 4.3 3.1 2.9 6.2C19.4 16.4 12 21 12 21z" /></svg>
            </button>
          </div>

          <div className="fl-pd-deliver">
            <span className="fl-pd-deliver-ic" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" /><path d="M3 7l9 4 9-4M12 11v10" /></svg>
            </span>
            <div className="fl-pd-deliver-body">
              <p>{pinChecked ? `Delivering to ${pin} — with you by ${eta}.` : `Made to order. Dispatched within 5 days, with you by ${eta}.`}</p>
              <form className="fl-pd-pin" onSubmit={(e) => { e.preventDefault(); if (pin.length === 6) setPinChecked(true); }}>
                <input value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, '').slice(0, 6)); setPinChecked(false); }} inputMode="numeric" placeholder="Enter pincode" aria-label="Delivery pincode" />
                <button type="submit">Check</button>
              </form>
            </div>
          </div>

          <ul className="fl-pd-trust">
            <li>Free shipping across India over {formatRupee(BRAND.freeShip)}</li>
            <li>Made to order, dispatched within 5 working days</li>
            <li>Easy returns within 14 days</li>
          </ul>

          <div className="fl-pd-pay">
            <div className="fl-pd-pay-methods">
              <span>UPI</span><span>Cards</span><span>EMI</span><span>Cash on Delivery</span>
            </div>
            <div className="fl-pd-pay-secure">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
              Secure, encrypted checkout
            </div>
          </div>

          <p className="fl-pd-maker">Woven in {p.maker} by families we have bought from for years.</p>

          <div className="fl-pd-acc">
            <Accordion title="Details" defaultOpen>
              <dl className="fl-acc-spec">
                <div><dt>Material</dt><dd>{p.material}</dd></div>
                <div><dt>Weave</dt><dd>{p.weave}</dd></div>
                <div><dt>Weight</dt><dd>{p.gsm}</dd></div>
                <div><dt>Size</dt><dd>{p.size}</dd></div>
                <div><dt>Woven in</dt><dd>{p.maker}</dd></div>
              </dl>
            </Accordion>
            <Accordion title="Materials & care">
              <p className="fl-acc-body">{p.care}. A little colour may run on the first wash as the natural dye settles, never bleach, and dry it in the shade. It softens and only gets better with age.</p>
            </Accordion>
            <Accordion title="Shipping & returns">
              <p className="fl-acc-body">Each piece is made to order and dispatched within five working days. Shipping is free across India over {formatRupee(BRAND.freeShip)}. If it is not right, return it unused within 14 days.</p>
            </Accordion>
          </div>
        </div>
      </div>

      <section className="fl-pd-band">
        <img src={IMG.roomMain} alt="" loading="lazy" />
        <div className="fl-pd-band-scrim" aria-hidden="true" />
        <div className="fl-pd-band-copy" data-reveal>
          <h2 className="fl-h2 fl-h2-on">Made to be<br /><em>lived with.</em></h2>
          <p>Not kept for best. This is cloth woven to be used, washed, and worn in until it feels like it has always been part of the house.</p>
        </div>
      </section>

      <section className="fl-rev" id="fl-reviews">
        <header className="fl-rev-top" data-reveal>
          <div>
            <span className="fl-eyebrow">Reviews</span>
            <h2 className="fl-h2">Kept, and <em>loved.</em></h2>
          </div>
          <div className="fl-rev-summary">
            <span className="fl-rev-avg">{r.avg.toFixed(1)}</span>
            <span className="fl-rev-summary-meta">
              <Stars value={r.avg} />
              <span>{r.count} verified reviews</span>
            </span>
          </div>
        </header>

        {featured && (
          <figure className="fl-rev-feature" data-reveal>
            <div className="fl-rev-feature-img"><img src={featured.img} alt="" loading="lazy" /></div>
            <div className="fl-rev-feature-body">
              <Stars value={featured.stars} />
              <blockquote className="fl-rev-feature-q">{featured.text}</blockquote>
              <figcaption className="fl-rev-feature-by">
                <span className="fl-rev-name">{featured.name}</span>
                <span className="fl-rev-meta">{featured.place} · {featured.date} · ✓ Verified purchase</span>
              </figcaption>
            </div>
          </figure>
        )}

        <div className="fl-rev-grid" data-reveal-group>
          {rest.map((rv, i) => (
            <article key={i} className="fl-rev-card">
              <div className="fl-rev-card-top">
                <span className="fl-rev-avatar" aria-hidden="true">{rv.name.charAt(0)}</span>
                <div className="fl-rev-card-who">
                  <span className="fl-rev-name">{rv.name}</span>
                  <span className="fl-rev-meta">{rv.place} · {rv.date}</span>
                </div>
                <Stars value={rv.stars} />
              </div>
              <p className="fl-rev-text">{rv.text}</p>
              {rv.verified && <span className="fl-rev-verified">✓ Verified purchase</span>}
            </article>
          ))}
        </div>
      </section>

      <section className="fl-related">
        <h2 className="fl-h2">You might also like</h2>
        <div className="fl-grid" data-reveal-group>
          {related(p, 3).map((r) => <ProductCard key={r.id} p={r} />)}
        </div>
      </section>

      <div className={`fl-pd-sticky ${stuck ? 'on' : ''}`}>
        <div className="fl-pd-sticky-l">
          <img src={p.img} alt="" />
          <div>
            <span className="fl-pd-sticky-name">{p.name}</span>
            <span className="fl-pd-sticky-meta">{COLOURWAYS[colour].name} · {formatRupee(p.price * qty)}</span>
          </div>
        </div>
        <button className="fl-btn" onClick={doAdd}>Add to bag</button>
      </div>
    </div>
  );
}

/* =================================================================== STORY */
export function Story() {
  const ref = useRef(null);
  useReveals(ref);
  return (
    <div className="fl-page" ref={ref}>
      <section className="fl-story-hero fl-shell" data-reveal>
        <span className="fl-eyebrow">Our cloth</span>
        <h1 className="fl-h1">Four hands, four states,<br /><em>one length of cloth.</em></h1>
        <p className="fl-lede">
          Nothing here is made in a hurry. A single throw passes through a cotton field, a dye vat, and
          a loom before it ever reaches a folded pile. Here is the short version of that journey.
        </p>
      </section>

      <section className="fl-band-img"><img src={IMG.craftMain} alt="A weaver at a handloom" loading="lazy" /></section>

      <section className="fl-origin">
        <div className="fl-shell">
          <ol className="fl-origin-steps" data-reveal-group>
            {ORIGIN.map((s) => (
              <li key={s.n} className="fl-origin-step">
                <span className="fl-origin-n">{s.n}</span>
                <h3 className="fl-origin-label">{s.label}</h3>
                <p className="fl-origin-text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="fl-home-section fl-shell">
        <header className="fl-sec-head" data-reveal>
          <div>
            <span className="fl-eyebrow">The hands</span>
            <h2 className="fl-h2">Made by people we know.</h2>
          </div>
        </header>
        <div className="fl-makers" data-reveal-group>
          {MAKERS.map((m, i) => (
            <article key={i} className="fl-maker">
              <div className="fl-maker-media"><img src={m.img} alt={m.name} loading="lazy" /></div>
              <div className="fl-maker-where">{m.where}</div>
              <h3 className="fl-maker-name">{m.name}</h3>
              <p className="fl-maker-note">{m.note}</p>
            </article>
          ))}
        </div>
        <div className="fl-story-cta">
          <a href="#/shop" className="fl-btn">Shop the collection</a>
        </div>
      </section>
    </div>
  );
}

/* =================================================================== ABOUT */
const VALUES = [
  { t: 'Made by hand', d: 'Every piece is woven on a handloom, never a power loom. It takes longer, and it shows in the cloth.' },
  { t: 'Natural to the core', d: 'Rain-fed cotton and wild silk, coloured with indigo, madder, and myrobalan. Nothing synthetic touches it.' },
  { t: 'Fair to the maker', d: 'We buy from the same families year after year, pay before we sell, and put their names on the cloth.' },
];
const FIGURES = [
  { n: '2016', l: 'The year we began' },
  { n: '40+', l: 'Weaver families' },
  { n: '4', l: 'States we weave in' },
  { n: '100%', l: 'Natural fibres and dyes' },
];

export function About() {
  const ref = useRef(null);
  useReveals(ref);
  return (
    <div className="fl-page" ref={ref}>
      <section className="fl-story-hero fl-shell" data-reveal>
        <span className="fl-eyebrow">About us</span>
        <h1 className="fl-h1">We started with <em>one loom.</em></h1>
        <p className="fl-lede">
          Forest &amp; Loom is a small textiles house from Bengaluru, making handwoven cloth from natural
          fibres and natural dyes, for homes across India. We know the families who weave for us, and we
          put their names on what they make.
        </p>
      </section>

      <section className="fl-band-img"><img src={IMG.craftMain} alt="" loading="lazy" /></section>

      <section className="fl-home-section fl-shell">
        <div className="fl-about-story" data-reveal>
          <h2 className="fl-h2">A long way from the mill.</h2>
          <p>We began in 2016, frustrated that almost everything soft in our homes was made fast, far away, and by no one in particular. So we did the slow thing instead. We drove out to weaving towns, sat with families at their looms, and started buying a few pieces at a time.</p>
          <p>The way we work has not changed much since. We still travel to the clusters, still pay the weavers before we sell a thing, and still refuse a power loom. What has grown is the number of homes, all across India, with a piece of this cloth somewhere in them.</p>
        </div>
      </section>

      <section className="fl-figs">
        <div className="fl-shell fl-figs-row" data-reveal-group>
          {FIGURES.map((f) => (
            <div key={f.l} className="fl-fig"><span className="fl-fig-n">{f.n}</span><span className="fl-fig-l">{f.l}</span></div>
          ))}
        </div>
      </section>

      <section className="fl-home-section fl-shell">
        <header className="fl-sec-head" data-reveal>
          <div><span className="fl-eyebrow">What we believe</span><h2 className="fl-h2">Three things, held to.</h2></div>
        </header>
        <div className="fl-vals" data-reveal-group>
          {VALUES.map((v) => (
            <div key={v.t} className="fl-val"><h3>{v.t}</h3><p>{v.d}</p></div>
          ))}
        </div>
      </section>

      <section className="fl-home-section fl-shell">
        <header className="fl-sec-head" data-reveal>
          <div><span className="fl-eyebrow">The hands</span><h2 className="fl-h2">Made by people we know.</h2></div>
          <a href="#/story" className="fl-link">How it is made</a>
        </header>
        <div className="fl-makers" data-reveal-group>
          {MAKERS.map((m, i) => (
            <article key={i} className="fl-maker">
              <div className="fl-maker-media"><img src={m.img} alt={m.name} loading="lazy" /></div>
              <div className="fl-maker-where">{m.where}</div>
              <h3 className="fl-maker-name">{m.name}</h3>
              <p className="fl-maker-note">{m.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="fl-close">
        <img src={IMG.closingMain} alt="" loading="lazy" />
        <div className="fl-close-scrim" aria-hidden="true" />
        <div className="fl-close-inner" data-reveal>
          <h2 className="fl-h1 fl-h1-on">Cloth worth<br /><em>keeping.</em></h2>
          <a href="#/shop" className="fl-btn fl-btn-light">Shop the collection</a>
        </div>
      </section>
    </div>
  );
}

/* ================================================================= CONTACT */
export function Contact() {
  const ref = useRef(null);
  const [sent, setSent] = useState(false);
  useReveals(ref);
  return (
    <div className="fl-page fl-shell fl-contact" ref={ref}>
      <header className="fl-contact-head" data-reveal>
        <span className="fl-eyebrow">Contact</span>
        <h1 className="fl-h1">Talk to <em>us.</em></h1>
        <p className="fl-lede">
          A question about a piece, your order, or a custom size? We are a small team in Bengaluru, and
          we read and answer every message ourselves, usually within a day.
        </p>
      </header>

      <div className="fl-contact-methods" data-reveal-group>
        <a className="fl-cm" href={BRAND.whatsapp} target="_blank" rel="noreferrer">
          <span className="fl-cm-k">WhatsApp</span><span className="fl-cm-v">Chat with us</span><span className="fl-cm-s">Fastest reply, 10am to 6pm</span>
        </a>
        <a className="fl-cm" href={BRAND.phoneHref}>
          <span className="fl-cm-k">Call</span><span className="fl-cm-v">{BRAND.phone}</span><span className="fl-cm-s">{BRAND.hours}</span>
        </a>
        <a className="fl-cm" href={`mailto:${BRAND.email}`}>
          <span className="fl-cm-k">Email</span><span className="fl-cm-v">{BRAND.email}</span><span className="fl-cm-s">We reply within a day</span>
        </a>
        <div className="fl-cm">
          <span className="fl-cm-k">Studio</span><span className="fl-cm-v">{BRAND.address}</span><span className="fl-cm-s">Visits by appointment</span>
        </div>
      </div>

      <div className="fl-contact-grid">
        <form className="fl-co-form fl-contact-form" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <h2 className="fl-h2">Send a note</h2>
          {sent ? (
            <p className="fl-contact-done">Thank you. We have your note, and we will reply within a day.</p>
          ) : (
            <>
              <div className="fl-field"><label htmlFor="ct-name">Your name</label><input id="ct-name" type="text" required placeholder="Name" /></div>
              <div className="fl-field-row">
                <div className="fl-field"><label htmlFor="ct-email">Email</label><input id="ct-email" type="email" required placeholder="you@email.com" /></div>
                <div className="fl-field"><label htmlFor="ct-phone">Phone</label><input id="ct-phone" type="tel" placeholder="+91" /></div>
              </div>
              <div className="fl-field"><label htmlFor="ct-msg">How can we help?</label><textarea id="ct-msg" required rows="5" placeholder="Tell us what you need" /></div>
              <button type="submit" className="fl-btn fl-btn-full">Send note</button>
            </>
          )}
        </form>

        <div className="fl-faq" data-reveal>
          <h2 className="fl-h2">Questions, answered.</h2>
          {FAQ.map((f, i) => (
            <Accordion key={i} title={f.q} defaultOpen={i === 0}>
              <p className="fl-acc-body">{f.a}</p>
            </Accordion>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================ CHECKOUT */
export function Checkout() {
  const { items, total, setQty, remove, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [order, setOrder] = useState('');

  const ship = total > 0 && total < BRAND.freeShip ? 250 : 0;
  const grand = total + ship;

  const submit = (e) => {
    e.preventDefault();
    setOrder('FL' + String(Date.now()).slice(-6));
    setPlaced(true);
    clear();
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (placed) {
    return (
      <div className="fl-page fl-shell fl-co-done">
        <span className="fl-eyebrow">Order {order}</span>
        <h1 className="fl-h1">Thank you. <em>It is being woven into a parcel.</em></h1>
        <p className="fl-lede">
          We have sent a note to your email. Your cloth is made to order and leaves us within five
          working days, with a card naming the family that wove it.
        </p>
        <a href="#/shop" className="fl-btn">Keep looking</a>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="fl-page fl-shell fl-co-empty">
        <h1 className="fl-h1">Your bag is empty.</h1>
        <p className="fl-lede">Find a throw, a scarf, or a length of linen worth keeping.</p>
        <a href="#/shop" className="fl-btn">Browse the cloth</a>
      </div>
    );
  }

  return (
    <div className="fl-page fl-shell fl-co">
      <h1 className="fl-h1 fl-co-title">Checkout</h1>
      <div className="fl-co-grid">
        <form className="fl-co-form" onSubmit={submit}>
          <fieldset>
            <legend>Where shall we write</legend>
            <div className="fl-field"><label htmlFor="co-email">Email</label><input id="co-email" type="email" required placeholder="you@email.com" /></div>
            <div className="fl-field"><label htmlFor="co-phone">Phone</label><input id="co-phone" type="tel" required placeholder="+91" /></div>
          </fieldset>
          <fieldset>
            <legend>Where shall we send it</legend>
            <div className="fl-field"><label htmlFor="co-name">Full name</label><input id="co-name" type="text" required placeholder="Name" /></div>
            <div className="fl-field"><label htmlFor="co-addr">Address</label><input id="co-addr" type="text" required placeholder="Flat, street, area" /></div>
            <div className="fl-field-row">
              <div className="fl-field"><label htmlFor="co-city">City</label><input id="co-city" type="text" required placeholder="Bengaluru" /></div>
              <div className="fl-field"><label htmlFor="co-pin">PIN code</label><input id="co-pin" type="text" inputMode="numeric" required placeholder="560001" /></div>
            </div>
          </fieldset>
          <p className="fl-co-demo">This is a demo checkout. No payment is taken and no card details are needed.</p>
          <button type="submit" className="fl-btn fl-btn-full">Place order · {formatRupee(grand)}</button>
        </form>

        <aside className="fl-co-summary">
          <h2 className="fl-co-sumtitle">Your order</h2>
          <ul className="fl-co-items">
            {items.map((it) => (
              <li key={it.key} className="fl-co-item">
                <span className="fl-co-thumb"><img src={it.img} alt={it.name} loading="lazy" /></span>
                <div className="fl-co-item-body">
                  <div className="fl-co-item-top">
                    <span className="fl-co-item-name">{it.name}</span>
                    <span>{formatRupee(it.price * it.qty)}</span>
                  </div>
                  <div className="fl-co-item-meta">{COLOURWAYS[it.colour].name}</div>
                  <div className="fl-qty">
                    <button onClick={() => setQty(it.key, it.qty - 1)} aria-label="One fewer">–</button>
                    <span>{it.qty}</span>
                    <button onClick={() => setQty(it.key, it.qty + 1)} aria-label="One more">+</button>
                    <button className="fl-qty-remove" onClick={() => remove(it.key)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <dl className="fl-co-totals">
            <div><dt>Subtotal</dt><dd>{formatRupee(total)}</dd></div>
            <div><dt>Shipping</dt><dd>{ship === 0 ? 'Free' : formatRupee(ship)}</dd></div>
            <div className="fl-co-grand"><dt>Total</dt><dd>{formatRupee(grand)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
