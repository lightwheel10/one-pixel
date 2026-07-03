// AERIUM — Vortex Hoodie product detail page.
// Reuses the finished Nav / Footer / atoms from the home App; only the product-specific
// layout lives here. Prices are ₹ (India-localized, consistent with the rest of the study).
// Product imagery is placeholder boxes until the real Vortex Hoodie shots land.

import { useState } from 'react';
import { Nav, Footer, OpxBar, EntryLoader, Arrow, Plus, PH } from '../App.jsx';
import { addToCart, openCart } from '../cart.js';

/* ------------------------------------------------------------------- data --- */

// Gallery shots (null = still a placeholder box until the real image lands).
const GALLERY = [
  '/case-studies/aerium/images/vortex-1.webp',
  '/case-studies/aerium/images/vortex-2.webp',
  '/case-studies/aerium/images/vortex-3.webp',
  '/case-studies/aerium/images/vortex-4.webp',
  '/case-studies/aerium/images/vortex-fabric.webp',
];

const COLORS = [
  { name: 'Charcoal Gray', hex: '#3b3b3d' },
  { name: 'Ash', hex: '#c7c7c7' },
  { name: 'Sand', hex: '#d7c9b0' },
  { name: 'Black', hex: '#141416' },
];

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const TABS = [
  {
    key: 'Details',
    body: 'Crafted from premium heavyweight cotton, the Vortex Hoodie delivers unmatched comfort and durability. The oversized fit and technical construction make it a versatile staple for any wardrobe.',
    points: ['Oversized Fit', 'Heavyweight Cotton 420GSM', 'Adjustable Drawstring Hood', 'Ribbed Cuffs and Hem', 'Unisex Style'],
  },
  {
    key: 'Materials',
    body: 'Woven from 100% organic heavyweight cotton at 420 GSM. Garment dyed for a lived in feel that only softens with wear, then preshrunk so it holds its shape wash after wash.',
    points: ['100% Organic Cotton', 'Garment Dyed Finish', 'Preshrunk Body', 'Responsibly Made'],
  },
  {
    key: 'Size & Fit',
    body: 'Built for an oversized silhouette with a relaxed drop shoulder. Our model is 6 feet 1 inch and wears a size M. If you prefer a regular fit, we recommend sizing down.',
    points: ['Oversized Silhouette', 'Relaxed Drop Shoulder', 'True to Size', 'Size Down for a Regular Fit'],
  },
  {
    key: 'Shipping & Returns',
    body: 'Dispatched within 24 hours from our facility. Free shipping across India on orders over ₹4,999, with easy 30 day returns if it is not quite right.',
    points: ['Dispatched in 24 Hours', 'Free Shipping Over ₹4,999', '30 Day Easy Returns', 'Pan India Delivery'],
  },
];

const BENEFITS = [
  ['Worldwide Shipping', 'On orders over ₹4,999'],
  ['Easy Returns', '30 day return policy'],
  ['Secure Payment', '100% secure checkout'],
];

const RECS = [
  { name: 'Minimal Hoodie', price: '₹3,099', img: '/case-studies/aerium/images/rec-1.webp' },
  { name: 'Classic Sweatshirt', price: '₹2,799', img: '/case-studies/aerium/images/rec-2.webp' },
  { name: 'Zip Up Hoodie', price: '₹3,699', img: '/case-studies/aerium/images/rec-3.webp' },
  { name: 'Essential Hoodie', price: '₹3,349', img: '/case-studies/aerium/images/rec-4.webp' },
];

const FEATURES = ['Limited Drops', 'Exclusive Access', 'Built for All Conditions', 'Technical Design', 'Culture Driven'];

/* ------------------------------------------------------------------ icons --- */

function IconZoom() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
    </svg>
  );
}
function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20s-7-4.4-9.2-8.6C1.3 8.5 2.6 5.5 5.6 5.1c1.9-.2 3.4.9 4.4 2.3.9-1.4 2.5-2.5 4.4-2.3 3 .4 4.3 3.4 2.8 6.3C19 15.6 12 20 12 20z" />
    </svg>
  );
}
function IconTruck() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 6h11v10H2zM13 9h4l3 3v4h-7z" /><circle cx="6" cy="18" r="1.6" /><circle cx="17.5" cy="18" r="1.6" />
    </svg>
  );
}
function IconReturn() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8a9 9 0 0 1 16-3M21 5v4h-4" /><path d="M21 16a9 9 0 0 1-16 3M3 19v-4h4" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" /><path d="M9 12l2 2 4-4" />
    </svg>
  );
}
const BENEFIT_ICONS = [IconTruck, IconReturn, IconShield];

/* -------------------------------------------------------------------- app --- */

export default function ProductApp() {
  const [shot, setShot] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState('M');
  const [tab, setTab] = useState(0);

  const handleAdd = () => {
    addToCart({
      id: 'Vortex Hoodie', name: 'Vortex Hoodie', price: '₹3,349', priceValue: 3349,
      img: GALLERY[0], size, color: COLORS[color].name,
    });
    openCart();
  };

  return (
    <>
      <EntryLoader mark="AERIUM" />
      <OpxBar />
      <div className="wire pdp">
        <Nav />

        {/* 02 + 03 + 04 — gallery · main image · product info */}
        <section className="pdp-top">
          <div className="pdp-gallery">
            {GALLERY.map((src, i) => (
              <button
                key={i}
                className={`pdp-thumb ${i === shot ? 'is-on' : ''}`}
                onClick={() => setShot(i)}
                aria-label={`View image ${i + 1}`}
              >
                {src
                  ? <img className="pdp-thumb-img" src={src} alt="" loading="lazy" />
                  : <PH className="pdp-thumb-ph" />}
              </button>
            ))}
            <span className="pdp-gallery-arrow" aria-hidden="true">↓</span>
          </div>

          <div className="pdp-main">
            {GALLERY[shot]
              ? <img className="pdp-main-photo" src={GALLERY[shot]} alt="AERIUM Vortex Hoodie in Charcoal Gray" />
              : <PH className="pdp-main-ph" />}
            <button className="pdp-zoom" aria-label="Zoom image"><IconZoom /></button>
          </div>

          <div className="pdp-info">
            <div className="eyebrow">SS26 Collection <Plus /></div>
            <h1 className="pdp-title">Vortex<br />Hoodie</h1>
            <p className="pdp-tagline">Technical oversized hoodie<br />Engineered for comfort. Built for movement.</p>

            <div className="pdp-rate">
              <span className="pdp-stars" aria-hidden="true">★★★★★</span>
              <span className="pdp-rate-num">4.8</span>
              <span className="pdp-rate-count">(128 reviews)</span>
            </div>

            <div className="pdp-price">
              <span className="pdp-price-now">₹3,349</span>
              <s className="pdp-price-was">₹4,999</s>
              <span className="pdp-badge">33% OFF</span>
            </div>

            <p className="pdp-desc">Premium heavyweight cotton hoodie with an oversized fit for ultimate comfort and modern style. Built with durable details for everyday wear.</p>

            <div className="pdp-variant">
              <div className="pdp-variant-head"><span className="pdp-variant-label">Color:</span> <b>{COLORS[color].name}</b></div>
              <div className="pdp-swatches">
                {COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    className={`pdp-swatch ${i === color ? 'is-on' : ''}`}
                    style={{ '--sw': c.hex }}
                    onClick={() => setColor(i)}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="pdp-variant">
              <div className="pdp-variant-head">
                <span className="pdp-variant-label">Size:</span> <b>{size}</b>
                <a className="pdp-sizeguide">Size Guide</a>
              </div>
              <div className="pdp-sizes">
                {SIZES.map((s) => (
                  <button key={s} className={`pdp-size ${s === size ? 'is-on' : ''}`} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>

            <div className="pdp-actions">
              <button className="btn btn-solid pdp-addcart" type="button" onClick={handleAdd}>Add to Cart <Plus /></button>
              <button className="pdp-wish" type="button" aria-label="Add to wishlist"><IconHeart /></button>
            </div>

            <div className="pdp-benefits">
              {BENEFITS.map(([t, s], i) => {
                const Ic = BENEFIT_ICONS[i];
                return (
                  <div key={t} className="pdp-benefit">
                    <span className="pdp-benefit-ic"><Ic /></span>
                    <div>
                      <div className="pdp-benefit-t">{t}</div>
                      <div className="pdp-benefit-s">{s}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 10 + 11 + 12 — detail tabs · material block (dark) */}
        <section className="pdp-detail">
          <div className="pdp-tabs-col">
            <div className="pdp-tabs">
              {TABS.map((t, i) => (
                <button key={t.key} className={`pdp-tab ${i === tab ? 'is-on' : ''}`} onClick={() => setTab(i)}>{t.key}</button>
              ))}
            </div>
            {/* All panels are rendered stacked in one grid cell, so the box is always
                sized to the tallest tab and switching never shifts the layout. */}
            <div className="pdp-tab-body">
              {TABS.map((t, i) => (
                <div key={t.key} className={`pdp-tab-panel ${i === tab ? 'is-on' : ''}`} aria-hidden={i !== tab}>
                  <p>{t.body}</p>
                  <ul className="pdp-points">
                    {t.points.map((p) => <li key={p}><Plus /> {p}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="pdp-material">
            <img className="pdp-material-photo" src="/case-studies/aerium/images/vortex-fabric.webp" alt="Close-up of the Vortex Hoodie heavyweight cotton with embroidered AERIUM logo" />
            <div className="pdp-material-cap">
              <div className="pdp-material-t">Premium Heavyweight Cotton</div>
              <div className="pdp-material-s">Soft. Durable. Built to last.</div>
            </div>
          </div>
        </section>

        {/* 13 – 17 — recommendations (dark) */}
        <section className="pdp-recs">
          <div className="sec-head">
            <h2 className="sec-title">You May Also Like <Plus /></h2>
            <a className="sec-action" href="/case-studies/aerium/shop/">View All <Arrow /></a>
          </div>
          <div className="pdp-rec-grid">
            {RECS.map((r) => (
              <a key={r.name} className="pdp-rec" href="/case-studies/aerium/product/">
                {r.img
                  ? <div className="pdp-rec-img"><img className="pdp-rec-photo" src={r.img} alt={r.name} loading="lazy" /></div>
                  : <PH className="pdp-rec-img" />}
                <div className="pdp-rec-body">
                  <div className="pdp-rec-name">{r.name}</div>
                  <div className="pdp-rec-price">{r.price}</div>
                </div>
                <span className="pdp-rec-add" aria-hidden="true">+</span>
              </a>
            ))}
          </div>
        </section>

        {/* 18 — feature strip */}
        <div className="pdp-features">
          {FEATURES.map((f) => (
            <span key={f} className="pdp-feature"><span className="pdp-feature-plus">+</span>{f}</span>
          ))}
          <span className="pdp-feature-plus">+</span>
        </div>

        {/* 19 + 20 — footer */}
        <Footer />
      </div>
    </>
  );
}
