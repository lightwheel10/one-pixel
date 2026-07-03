// AERIUM — Shop / Shop All (SS26 collection) page.
// Reuses the shared Nav / Footer / Newsletter / atoms from the home App. Prices are ₹.
// Imagery is reused from the rest of the study where a product matches; the four items
// without a match, and any shop-specific shots, stay as placeholder boxes.

import { useState } from 'react';
import { Nav, Footer, OpxBar, Newsletter, EntryLoader, Arrow, Plus, PH, Swatches } from '../App.jsx';
import { CATALOG, CATS, SIZES, COLORS, MATERIALS, PRICE_RANGES, SORTS } from '../catalog.js';
import { addToCart, openCart } from '../cart.js';

const IMG = '/case-studies/aerium/images/';
const PDP = '/case-studies/aerium/product/';

/* ------------------------------------------------------------------- data --- */

const LOOKS = [
  { name: 'Urban Shadow',      img: IMG + 'shop-look-1.webp' },
  { name: 'Monochrome Flow',   img: IMG + 'shop-look-2.webp' },
  { name: 'Next Wave Neutral', img: IMG + 'shop-look-4.webp' },
  { name: 'All Terrain',       img: IMG + 'shop-look-5.webp' },
  { name: 'Night Signal',      img: IMG + 'shop-look-6.webp' },
];

/* ------------------------------------------------------------------ atoms --- */

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ShopCard({ p }) {
  const add = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: p.name, name: p.name, price: p.price, priceValue: p.priceValue, img: p.img,
      color: p.color, size: p.sizes?.includes('M') ? 'M' : (p.sizes?.[0] || ''),
    });
    openCart();
  };
  return (
    <a className="shop-card" href={PDP}>
      {p.img
        ? <div className="shop-card-img"><img className="shop-card-photo" src={p.img} alt={p.name} loading="lazy" style={p.pos ? { objectPosition: p.pos } : undefined} /></div>
        : <PH className="shop-card-img" />}
      <div className="shop-card-body">
        <div className="shop-card-name">{p.name}</div>
        <div className="shop-card-price">{p.price}</div>
        <div className="shop-card-foot">
          <Swatches count={3} active={p.active} />
          <button className="shop-card-add" type="button" onClick={add} aria-label={`Add ${p.name} to cart`}>+</button>
        </div>
      </div>
    </a>
  );
}

/* -------------------------------------------------------------------- app --- */

export default function ShopApp() {
  const [cat, setCat] = useState('All');
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [priceKey, setPriceKey] = useState(null);
  const [sort, setSort] = useState('Newest');
  const [openMenu, setOpenMenu] = useState(null);

  const toggle = (setter) => (val) => setter((cur) => (cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val]));
  const priceTest = priceKey ? PRICE_RANGES.find((r) => r.key === priceKey)?.test : null;

  let shown = CATALOG.filter((p) =>
    (cat === 'All' || p.cat === cat) &&
    (!sizes.length || p.sizes.some((s) => sizes.includes(s))) &&
    (!colors.length || colors.includes(p.color)) &&
    (!materials.length || materials.includes(p.material)) &&
    (!priceTest || priceTest(p.priceValue)));
  if (sort === 'Price: Low to High') shown = [...shown].sort((a, b) => a.priceValue - b.priceValue);
  else if (sort === 'Price: High to Low') shown = [...shown].sort((a, b) => b.priceValue - a.priceValue);

  const activeCount = sizes.length + colors.length + materials.length + (priceKey ? 1 : 0);
  const clearAll = () => { setSizes([]); setColors([]); setMaterials([]); setPriceKey(null); };

  const filterDefs = [
    { key: 'Size', options: SIZES, sel: sizes, pick: toggle(setSizes), count: sizes.length },
    { key: 'Color', options: COLORS, sel: colors, pick: toggle(setColors), count: colors.length },
    { key: 'Price', options: PRICE_RANGES.map((r) => r.key), sel: priceKey ? [priceKey] : [], pick: (v) => setPriceKey((cur) => (cur === v ? null : v)), count: priceKey ? 1 : 0 },
    { key: 'Material', options: MATERIALS, sel: materials, pick: toggle(setMaterials), count: materials.length },
  ];

  return (
    <>
      <EntryLoader mark="AERIUM" />
      <OpxBar />
      <div className="wire shop">
        <Nav />

        {/* 2 – 6 — hero */}
        <section className="shop-hero">
          <img className="shop-hero-bg" src={IMG + 'shop-hero.webp'} alt="AERIUM SS26 campaign — model in technical outerwear" />
          <div className="shop-hero-copy">
            <div className="eyebrow">SS26 Collection <Plus /></div>
            <h1 className="shop-hero-title">Next Wave<br />Uniform</h1>
            <p className="shop-hero-sub">Technical design. Culture driven.<br />Built for a new generation.</p>
            <a className="btn btn-solid shop-hero-cta" href={PDP}>Explore Collection <Arrow /></a>
          </div>
          <div className="shop-hero-rail" aria-hidden="true">
            <span className="shop-hero-season">Spring / Summer 2026</span>
            <Plus />
          </div>
        </section>

        {/* 7 – 10 — meta bar */}
        <section className="shop-meta">
          <p className="shop-meta-desc">A modular system of modern essentials, engineered for movement and built for all conditions.</p>
          <div className="shop-meta-count">
            <span className="shop-meta-plus" aria-hidden="true">+</span>
            <div><b>{shown.length}</b><span>Items</span></div>
          </div>
          <div className="shop-meta-rel">
            <span>Limited Release</span>
            <b>24.06.2026</b>
          </div>
          <div className="shop-sort-wrap">
            <button className="shop-sort" type="button" onClick={() => setOpenMenu(openMenu === 'Sort' ? null : 'Sort')}>
              Sort: {sort === 'Newest' ? 'Newest' : sort.replace('Price: ', '')} <Chevron />
            </button>
            {openMenu === 'Sort' && (
              <div className="shop-menu shop-menu-right">
                {SORTS.map((s) => (
                  <button key={s} className={`shop-opt ${s === sort ? 'is-on' : ''}`} onClick={() => { setSort(s); setOpenMenu(null); }}>{s}</button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 11 — category tabs */}
        <div className="shop-tabs">
          {CATS.map((c) => (
            <button key={c} className={`shop-tab ${c === cat ? 'is-on' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>

        {/* 12 — filter bar */}
        <div className="shop-filters">
          {filterDefs.map((f) => (
            <div key={f.key} className="shop-filter-wrap">
              <button className={`shop-filter ${f.count ? 'is-active' : ''}`} type="button" onClick={() => setOpenMenu(openMenu === f.key ? null : f.key)}>
                {f.key}{f.count ? ` · ${f.count}` : ''} <Chevron />
              </button>
              {openMenu === f.key && (
                <div className="shop-menu">
                  {f.options.map((opt) => (
                    <button key={opt} className={`shop-opt ${f.sel.includes(opt) ? 'is-on' : ''}`} onClick={() => f.pick(opt)}>
                      <span>{opt}</span>{f.sel.includes(opt) && <span className="shop-opt-check">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {activeCount > 0 && <button className="shop-filter-clear" type="button" onClick={clearAll}>Clear · {activeCount}</button>}
        </div>
        {openMenu && <div className="shop-menu-backdrop" onClick={() => setOpenMenu(null)} />}

        {/* 13 — product grid */}
        <section className="shop-grid">
          {shown.length
            ? shown.map((p) => <ShopCard key={p.name} p={p} />)
            : (
              <div className="shop-empty">
                No products match these filters.
                <button type="button" onClick={() => { setCat('All'); clearAll(); }}>Reset filters</button>
              </div>
            )}
        </section>

        {/* 14 – 16 — promo banner */}
        <section className="shop-promo">
          <div className="shop-promo-copy">
            <div className="eyebrow">SS26 Collection <Plus /></div>
            <h2 className="shop-promo-title">Engineered<br />for the Now.</h2>
            <p className="shop-promo-sub">Built for purpose. Adaptive materials. Made to move forward.</p>
            <a className="btn btn-solid shop-promo-cta" href={PDP}>Discover the System <Arrow /></a>
          </div>
          <div className="shop-promo-img">
            <img className="shop-promo-photo" src={IMG + 'adaptive.webp'} alt="AERIUM technical outerwear, engineered for movement" />
          </div>
        </section>

        {/* 17 — shop the looks */}
        <section className="shop-looks">
          <div className="sec-head">
            <h2 className="sec-title">Shop the Looks <Plus /></h2>
            <a className="sec-action" href="/case-studies/aerium/shop/">View All Looks <Arrow /></a>
          </div>
          <div className="look-grid">
            {LOOKS.map((l) => (
              <a key={l.name} className="look-card" href={PDP}>
                <div className="look-img"><img className="look-photo" src={l.img} alt={l.name} loading="lazy" /></div>
                <div className="look-name">{l.name}</div>
                <div className="look-shop">Shop the Look <Arrow /></div>
              </a>
            ))}
          </div>
        </section>

        {/* 22 – 24 — newsletter (shared) */}
        <Newsletter />

        {/* 25 – 37 — footer (shared) */}
        <Footer />
      </div>
    </>
  );
}
