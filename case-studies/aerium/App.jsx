// AERIUM — SS26 home page.
// STEP 1 (this file): a true wireframe skeleton of the home page in the images. Real copy,
// grey placeholder image boxes, neutral black/white styling, correct responsive layout. The
// black + acid-green visual design, display type, imagery, motion and the shared OnePixel loader
// come in the next pass, section by section.
//
// Localised for India per the brief: prices in INR, IST drop time, India region selector.

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader } from '../../src/Loader.jsx';
import { CATALOG, PDP_HREF } from './catalog.js';
import {
  addToCart, openCart, readCart, setQty, removeLine,
  cartCount, cartSubtotal, formatINR, lineKey, CHECKOUT_HREF,
} from './cart.js';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ data ---- */

const NAV = [
  { label: 'Home', href: '/case-studies/aerium/' },
  { label: 'Shop All', href: '/case-studies/aerium/shop/' },
  { label: 'About', href: '/case-studies/aerium/about/' },
];

const CATEGORIES = [
  { n: '01', name: 'Outerwear', img: '/case-studies/aerium/images/cat-outerwear.webp', pos: '65% 12%' },
  { n: '02', name: 'Tees',      img: '/case-studies/aerium/images/cat-tees.webp',      pos: '82% 15%' },
  { n: '03', name: 'Pants',     img: '/case-studies/aerium/images/cat-pants.webp',     pos: '72% 45%' },
];

const MARQUEE = [
  'Worldwide Shipping', 'Free Returns', 'Secure Checkout', 'Limited Drops',
  'Exclusive', 'Exclusive Access', 'Built for All Conditions',
];

const ESSENTIALS = [
  { name: 'Tech Shell Jacket', price: '₹8,999', swatches: 3, active: 0, img: '/case-studies/aerium/images/product-tech-shell.webp', pos: '50% 18%' },
  { name: 'Signal Tee',        price: '₹2,499', swatches: 3, active: 0, img: '/case-studies/aerium/images/product-signal-tee.webp', pos: '50% 16%' },
  { name: 'Mod Cargo Pant',    price: '₹5,999', swatches: 3, active: 1, img: '/case-studies/aerium/images/product-mod-cargo.webp', pos: '50% 42%' },
  { name: 'A-01 Tech Cap',     price: '₹1,499', swatches: 3, active: 0, img: '/case-studies/aerium/images/product-tech-cap.webp', pos: '50% 45%' },
];

const BESTSELLERS = [
  { name: 'Vortex Jacket',      price: '₹8,999', swatches: 3, active: 1, img: '/case-studies/aerium/images/product-vortex-jacket.webp', pos: '50% 18%' },
  { name: 'Utility Cargo Pant', price: '₹6,499', swatches: 3, active: 0, img: '/case-studies/aerium/images/product-utility-cargo.webp', pos: '50% 45%' },
  { name: 'Tac Sling Bag',      price: '₹2,999', swatches: 3, active: 0, img: '/case-studies/aerium/images/product-tac-sling.webp', pos: '50% 45%' },
];

// Built by the Culture — 4 UGC thumbs.
const CULTURE = [
  '/case-studies/aerium/images/culture-1.webp',
  '/case-studies/aerium/images/culture-2.webp',
  '/case-studies/aerium/images/culture-3.webp',
  '/case-studies/aerium/images/culture-4.webp',
];

// From the Community — 4 UGC tiles (img null = still a placeholder box).
const COMMUNITY = [
  { handle: '@void.exe',    img: '/case-studies/aerium/images/community-1.webp' },
  { handle: '@tsuki.wear',  img: '/case-studies/aerium/images/community-2.webp' },
  { handle: '@coldframe',   img: '/case-studies/aerium/images/community-3.webp' },
  { handle: '@urban.drift', img: '/case-studies/aerium/images/community-4.webp' },
];

// Icon components are function declarations (hoisted), so referencing them here is fine.
const SOCIALS = [
  ['Instagram', IconInstagram], ['TikTok', IconTikTok], ['X', IconX],
  ['YouTube', IconYouTube], ['Discord', IconDiscord],
];

const FOOTER_COLS = [
  { head: 'Shop', links: [
    { label: 'New Arrivals', href: '/case-studies/aerium/shop/' },
    { label: 'Shop All',     href: '/case-studies/aerium/shop/' },
    { label: 'About',        href: '/case-studies/aerium/about/' },
  ] },
  { head: 'Help', links: [
    { label: 'Shipping' }, { label: 'Returns' }, { label: 'Size Guide' }, { label: 'Contact' },
  ] },
];

const FOOTER_BOTTOM = [{ label: 'Terms' }, { label: 'Privacy' }];

/* ------------------------------------------------------------------ atoms --- */

function Arrow() {
  return (
    <svg className="arr" viewBox="0 0 24 24" width="15" height="15" fill="none"
      stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function Plus() {
  return <span className="plus" aria-hidden="true">+</span>;
}

// Placeholder image box (the wireframe "X" box).
function PH({ className = '', tag }) {
  return (
    <div className={`ph ${className}`} aria-hidden="true">
      {tag && <span className="ph-tag">{tag}</span>}
    </div>
  );
}

function Swatches({ count = 3, active = 0 }) {
  return (
    <span className="swatches" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <i key={i} className={i === active ? 'on' : ''} />
      ))}
    </span>
  );
}

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function IconAccount() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" /><path d="M4.5 20.5c1.2-4 4.2-6 7.5-6s6.3 2 7.5 6" />
    </svg>
  );
}

function IconCart() {
  return (
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 8h12l-1.1 12.2H7.1z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

/* Brand glyphs (solid, single-path, currentColor) --------------------------- */
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.34 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.34 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.27 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.29 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.27 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.29-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.27-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.29-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0m0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32M12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8m6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88" />
    </svg>
  );
}
function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}
function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93zM17.61 20.64h2.04L6.49 3.24H4.3z" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12z" />
    </svg>
  );
}
function IconDiscord() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.32 4.37a19.79 19.79 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.2.38-.44.87-.6 1.25a18.27 18.27 0 0 0-5.49 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04A19.74 19.74 0 0 0 3.68 4.37a.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.06 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.23-1.99a.08.08 0 0 0-.04-.11 13.1 13.1 0 0 1-1.87-.89.08.08 0 0 1-.01-.13l.37-.29a.07.07 0 0 1 .08-.01 14.2 14.2 0 0 0 12.06 0 .07.07 0 0 1 .08.01l.37.29a.08.08 0 0 1-.01.13c-.6.35-1.22.64-1.87.89a.08.08 0 0 0-.04.11c.36.69.78 1.36 1.23 1.99a.08.08 0 0 0 .09.03 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.67-3.55-13.66a.06.06 0 0 0-.03-.03zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.16-1.08-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42z" />
    </svg>
  );
}

const SOCIAL_URLS = {
  Instagram: 'https://instagram.com', TikTok: 'https://tiktok.com', X: 'https://x.com',
  YouTube: 'https://youtube.com', Discord: 'https://discord.com',
};

function Socials() {
  return (
    <div className="socials">
      {SOCIALS.map(([name, Icon]) => (
        <a key={name} className="soc" href={SOCIAL_URLS[name]} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><Icon /></a>
      ))}
    </div>
  );
}

function ProductCard({ p }) {
  // Sample site: every product routes to the one product detail page.
  const add = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: p.name, name: p.name, price: p.price, img: p.img });
    openCart();
  };
  return (
    <a className="pcard" href="/case-studies/aerium/product/">
      {p.img
        ? <div className="pcard-img"><img className="pcard-photo" src={p.img} alt={`AERIUM ${p.name}`} loading="lazy" style={p.pos ? { objectPosition: p.pos } : undefined} /></div>
        : <PH className="pcard-img" />}
      <div className="pcard-info">
        <div className="pcard-brand">AERIUM</div>
        <div className="pcard-name">{p.name}</div>
        <div className="pcard-foot">
          <span className="pcard-price">{p.price}</span>
          <div className="pcard-foot-r">
            <Swatches count={p.swatches} active={p.active} />
            <button className="pcard-add" type="button" onClick={add} aria-label={`Add ${p.name} to cart`}>+</button>
          </div>
        </div>
      </div>
    </a>
  );
}

// UGC thumbnail — real image when a src is given, otherwise the placeholder box.
function Thumb({ src, alt = '' }) {
  return src
    ? <div className="thumb"><img className="thumb-photo" src={src} alt={alt} loading="lazy" /></div>
    : <PH className="thumb" />;
}

function SectionHead({ title, action = 'View All', href = '/case-studies/aerium/shop/' }) {
  return (
    <div className="sec-head">
      <h2 className="sec-title">{title} <Plus /></h2>
      <a className="sec-action" href={href}>{action} <Arrow /></a>
    </div>
  );
}

/* -------------------------------------------------------------------- cart -- */

// Live cart contents — re-reads localStorage whenever the store changes (this tab
// via 'aerium:cart-change', or another tab via the native 'storage' event).
function useCart() {
  const [items, setItems] = useState(() => readCart());
  useEffect(() => {
    const sync = () => setItems(readCart());
    window.addEventListener('aerium:cart-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('aerium:cart-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return items;
}

function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
    </svg>
  );
}

// Slide-in cart. Opened by the nav cart button or automatically after an add-to-cart
// (the 'aerium:cart-open' event, wired in Nav below).
function CartDrawer({ open, onClose }) {
  const items = useCart();
  const count = cartCount(items);
  const subtotal = cartSubtotal(items);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="cart-overlay" onMouseDown={onClose}>
      <aside className="cart-drawer" onMouseDown={(e) => e.stopPropagation()} aria-label="Shopping cart">
        <div className="cart-head">
          <span className="cart-head-t">Your Cart <span className="cart-head-n">({count})</span></span>
          <button className="cart-close" type="button" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <IconCart />
            <p>Your cart is empty.</p>
            <a className="btn btn-solid" href="/case-studies/aerium/shop/">Shop the Collection <Arrow /></a>
          </div>
        ) : (
          <>
            <div className="cart-lines">
              {items.map((l) => {
                const key = lineKey(l);
                return (
                  <div key={key} className="cart-line">
                    <a className="cart-line-img" href={PDP_HREF}>
                      {l.img ? <img src={l.img} alt={l.name} /> : <span className="cart-line-ph" />}
                    </a>
                    <div className="cart-line-body">
                      <div className="cart-line-top">
                        <a className="cart-line-name" href={PDP_HREF}>{l.name}</a>
                        <button className="cart-line-del" type="button" onClick={() => removeLine(key)} aria-label={`Remove ${l.name}`}><IconTrash /></button>
                      </div>
                      {(l.size || l.color) && (
                        <div className="cart-line-meta">
                          {l.color && <span>{l.color}</span>}
                          {l.color && l.size && <span className="cart-line-dot">·</span>}
                          {l.size && <span>Size {l.size}</span>}
                        </div>
                      )}
                      <div className="cart-line-foot">
                        <div className="cart-qty">
                          <button type="button" onClick={() => setQty(key, l.qty - 1)} aria-label="Decrease quantity">−</button>
                          <span>{l.qty}</span>
                          <button type="button" onClick={() => setQty(key, l.qty + 1)} aria-label="Increase quantity">+</button>
                        </div>
                        <span className="cart-line-price">{formatINR((l.priceValue || 0) * l.qty)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-foot">
              <div className="cart-sub">
                <span>Subtotal</span>
                <b>{formatINR(subtotal)}</b>
              </div>
              <p className="cart-note">Shipping and taxes calculated at checkout.</p>
              <a className="btn btn-solid cart-checkout" href={CHECKOUT_HREF}>Checkout <Arrow /></a>
              <button className="cart-continue" type="button" onClick={onClose}>Continue Shopping</button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* --------------------------------------------------------------- sections --- */

// 1.0 – 3.0
function Nav() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState('');
  const count = cartCount(useCart());

  useEffect(() => {
    const open = () => setCartOpen(true);
    window.addEventListener('aerium:cart-open', open);
    return () => window.removeEventListener('aerium:cart-open', open);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setSearchOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [searchOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [menuOpen]);

  const term = q.trim().toLowerCase();
  const results = CATALOG.filter((p) =>
    !term || p.name.toLowerCase().includes(term) || p.cat.toLowerCase().includes(term));

  return (
    <>
      <nav className="nav">
        <a className="wordmark" href="/case-studies/aerium/">AERIUM</a>
        <div className="nav-links">
          {NAV.map((n) => <a key={n.label} className="navlink" href={n.href}>{n.label}</a>)}
        </div>
        <div className="nav-tools">
          <button className="tool" type="button" onClick={() => { setQ(''); setSearchOpen(true); }} aria-label="Search"><IconSearch /><span>Search</span></button>
          <button className="tool" type="button" onClick={() => setCartOpen(true)} aria-label="Open cart">
            <IconCart /><span>Cart ({count})</span>
            {count > 0 && <span className="nav-cart-dot" aria-hidden="true" />}
          </button>
          <button className="tool nav-burger" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}><IconMenu /></button>
        </div>
      </nav>

      {menuOpen && (
        <div className="nav-menu" onClick={() => setMenuOpen(false)}>
          <div className="nav-menu-inner" onClick={(e) => e.stopPropagation()}>
            <div className="nav-menu-head">
              <span className="nav-menu-brand">Menu</span>
              <button className="nav-menu-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</button>
            </div>
            {NAV.map((n) => <a key={n.label} className="nav-menu-link" href={n.href}>{n.label}</a>)}
            <div className="nav-menu-tools">
              <button type="button" onClick={() => { setMenuOpen(false); setQ(''); setSearchOpen(true); }}><IconSearch /> Search</button>
              <button type="button" onClick={() => { setMenuOpen(false); setCartOpen(true); }}><IconCart /> Cart ({count})</button>
            </div>
          </div>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {searchOpen && (
        <div className="search-overlay" onMouseDown={() => setSearchOpen(false)}>
          <div className="search-panel" onMouseDown={(e) => e.stopPropagation()}>
            <div className="search-head">
              <IconSearch />
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input
                autoFocus
                className="search-input"
                type="search"
                placeholder="Search AERIUM"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button className="search-close" type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">✕</button>
            </div>
            <div className="search-count">{results.length} {results.length === 1 ? 'result' : 'results'}</div>
            <div className="search-results">
              {results.length ? results.map((p) => (
                <a key={p.name} className="search-result" href={PDP_HREF}>
                  <img className="search-result-img" src={p.img} alt="" loading="lazy" />
                  <div className="search-result-name">{p.name}</div>
                  <div className="search-result-price">{p.price}</div>
                </a>
              )) : <div className="search-empty">No products match “{q}”.</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 4.0 – 9.0
function Hero() {
  return (
    <section className="hero">
      <div className="hero-rail">
        <span className="hero-season">SS26</span>
        <span className="hero-season-sub">Spring / Summer 2026</span>
        <Plus />
      </div>

      <div className="hero-img">
        <img className="hero-photo" src="/case-studies/aerium/images/hero.webp"
          alt="Model wearing the AERIUM SS26 hooded technical shell in a concrete underpass" />
      </div>

      <div className="hero-main">
        <div className="hero-copy">
          <div className="eyebrow">SS26 Collection</div>
          <h1 className="hero-title">Next<br />Wave<br />Uniform</h1>
          <p className="hero-sub">Technical design. Culture driven.<br />For a new generation.</p>
          <div className="hero-cta">
            <a className="btn btn-solid" href="/case-studies/aerium/shop/">Shop Drop <Arrow /></a>
            <a className="btn btn-ghost" href="/case-studies/aerium/shop/">View Lookbook</a>
          </div>
        </div>

        <div className="hero-drop">
          <div className="hero-drop-copy">
            <div className="drop-kicker">New Drop</div>
            <div className="drop-name">“Vector” Pack</div>
            <div className="drop-meta">
              <span>Limited Release</span>
              <span>24.06.2026 · 8:00 PM IST</span>
              <span>Early Access for Members</span>
            </div>
            <a className="drop-join" href="/case-studies/aerium/shop/">Join Now <Arrow /></a>
          </div>
          <span className="hero-drop-plus" aria-hidden="true">+</span>
        </div>
      </div>
    </section>
  );
}

// 10.0
function CategoryStrip() {
  return (
    <section className="catstrip">
      {CATEGORIES.map((c) => (
        <a
          key={c.n}
          href="/case-studies/aerium/shop/"
          className={`cat ${c.img ? 'cat--photo' : ''}`}
          style={c.img ? {
            backgroundImage: `linear-gradient(90deg, rgba(219,219,219,0.92) 0%, rgba(219,219,219,0.4) 44%, rgba(219,219,219,0) 72%), url('${c.img}')`,
            backgroundPosition: c.pos,
          } : undefined}
        >
          {!c.img && <PH className="cat-fill" />}
          <div className="cat-copy">
            <span className="cat-num">{c.n}</span>
            <span className="cat-name">{c.name}</span>
            <span className="cat-shop">Shop Now <Arrow /></span>
          </div>
        </a>
      ))}
      <a className="cat-next" aria-label="Next"><span className="next-chip"><Arrow /></span></a>
    </section>
  );
}

// 11.0 — seamless marquee: the row is rendered twice and the track scrolls -50%.
function Ticker() {
  const row = (
    <div className="ticker-row" aria-hidden="true">
      {MARQUEE.map((m, i) => (
        <span key={i} className="ticker-item">
          {m}<span className="ticker-plus">+</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="ticker">
      <div className="ticker-track">{row}{row}</div>
    </div>
  );
}

// 12.0 + 13.0
function EssentialsCulture() {
  return (
    <section className="row row-essentials">
      <div className="cell cell-essentials">
        <SectionHead title="Curated Essentials" />
        <div className="pgrid pgrid-4">
          {ESSENTIALS.map((p) => <ProductCard key={p.name} p={p} />)}
        </div>
      </div>

      <div className="cell cell-culture">
        <h2 className="sec-title">Built by the Culture <Plus /></h2>
        <div className="thumbs thumbs-4">
          {CULTURE.map((src, i) => <Thumb key={i} src={src} />)}
        </div>
        <p className="culture-tag">Tag <b>@aerium.official</b> to be featured</p>
        <Socials />
      </div>
    </section>
  );
}

// 14.0 + 15.0
function AdaptiveBestsellers() {
  return (
    <section className="row row-adaptive">
      <div className="cell promo promo-adaptive">
        <div className="promo-copy">
          <div className="eyebrow">SS26 Collection</div>
          <h2 className="promo-title">Adaptive<br />by Design</h2>
          <p className="promo-sub">Engineered for movement.<br />Styled for the future.</p>
          <a className="btn btn-solid" href="/case-studies/aerium/shop/">Explore Collection <Arrow /></a>
        </div>
      </div>

      <div className="cell cell-bestsellers">
        <SectionHead title="Best Sellers" />
        <div className="pgrid pgrid-3">
          {BESTSELLERS.map((p) => <ProductCard key={p.name} p={p} />)}
        </div>
      </div>
    </section>
  );
}

// 16.0 + 17.0
function CommunityManifesto() {
  return (
    <section className="row row-community">
      <div className="cell cell-community">
        <h2 className="sec-title">From the Community <Plus /></h2>
        <div className="thumbs thumbs-4">
          {COMMUNITY.map((c) => (
            <div key={c.handle} className="thumb-wrap">
              <Thumb src={c.img} alt={`AERIUM community — ${c.handle}`} />
              <span className="thumb-handle">{c.handle}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="cell promo promo-manifesto">
        <div className="promo-copy">
          <div className="eyebrow">Our Manifesto <Plus /></div>
          <h2 className="promo-title mask-lines">
            <span><span>Technical.</span></span>
            <span><span>Timeless.</span></span>
            <span><span>Together.</span></span>
          </h2>
          <p className="manifesto-body">
            We design with intention. Every piece is built to perform, made to last, and created
            to move with culture. This is more than clothing. This is AERIUM.
          </p>
          <a className="btn btn-solid" href="/case-studies/aerium/about/">Our Story <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

// 18.0 – 21.0
function Newsletter() {
  return (
    <section className="news">
      <div className="news-copy">
        <h2 className="news-title">Stay in the Loop</h2>
        <p className="news-sub">Exclusive drops. Early access. Culture first.</p>
      </div>
      <form className="news-form" onSubmit={(e) => e.preventDefault()}>
        <div className="news-row">
          <input className="news-input" type="email" placeholder="Enter your email" aria-label="Email" />
          <button className="btn btn-acid news-btn" type="submit">Subscribe <Arrow /></button>
        </div>
        <label className="news-check">
          <input type="checkbox" /> I agree to receive emails from AERIUM.
        </label>
      </form>
    </section>
  );
}

// 22.0 – 28.0
function Footer() {
  return (
    <footer className="foot">
      <div className="foot-top">
        <div className="foot-brand">
          <a className="wordmark" href="/case-studies/aerium/">AERIUM</a>
          <p className="foot-tagline">Built for the now.<br />Ready for what’s next.</p>
          <Socials />
          <p className="foot-copy">© 2026 AERIUM. All rights reserved.</p>
        </div>
        <div className="foot-cols">
          {FOOTER_COLS.map((col) => (
            <div key={col.head} className="foot-col">
              <div className="foot-head">{col.head}</div>
              <ul>
                {col.links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="foot-bottom">
        <div className="foot-bottom-links">
          {FOOTER_BOTTOM.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
        </div>
        <div className="foot-region">India (INR ₹)</div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------- opx ---- */

// Shared OnePixel chrome — same "Back to OnePixel" bar every case study carries.
// Leaving the case study clears the session flag, so the loader replays on a fresh entry.
function OpxBar() {
  const exit = () => { try { sessionStorage.removeItem('aerium:loaded'); } catch { /* ignore */ } };
  return (
    <div className="opx">
      <span className="opx-note">A OnePixel sample site · products, prices and checkout are placeholder</span>
      <a className="opx-back" href="/" onClick={exit}>← Back to OnePixel</a>
    </div>
  );
}

// The OnePixel loader plays only on the FIRST AERIUM page of a session (the landing).
// Internal navigation between case-study pages skips it; a fresh entry after exiting replays it.
// (MPA pages share sessionStorage per tab, so the flag survives navigation but not a closed tab.)
function EntryLoader({ mark = 'AERIUM' }) {
  const [show] = useState(() => {
    try {
      if (sessionStorage.getItem('aerium:loaded')) return false;
      sessionStorage.setItem('aerium:loaded', '1');
      return true;
    } catch {
      return true;
    }
  });
  return show ? <Loader duration={2500} mark={mark} /> : null;
}

/* ------------------------------------------------------------------- app ---- */

// Shared chrome + atoms reused by the product detail (../product/) and shop (../shop/) pages.
export { Nav, Footer, OpxBar, EntryLoader, Arrow, Plus, PH, Swatches, Newsletter, useCart };

export default function App() {
  // First-load hero choreography (played once the loader lifts) + smooth scroll reveals.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let intro;
    const ctx = gsap.context(() => {
      // Hero intro — paused; plays on 'onepixel:loader-complete' so it isn't hidden behind the loader.
      intro = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      intro
        .fromTo('.nav', { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0)
        .fromTo('.hero-photo', { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 1.6, ease: 'power2.out' }, 0)
        .fromTo('.hero-rail', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.2)
        .fromTo('.hero-copy > *', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 }, 0.35)
        .fromTo('.hero-drop', { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1 }, 0.7);

      // ── Per-section reveals: a distinct effect each, one shared motion language
      //    (power-out easing, transform / opacity only, fires once).
      //    IMPORTANT: each trigger is the ELEMENT being animated (grid / thumbs /
      //    copy), never the oversized row — so a reveal fires when its own content
      //    reaches the viewport, not when the tall container's top does. ──────────
      const st = (trigger, start = 'top 84%') => ({ trigger, start, once: true });
      const q = (sel) => document.querySelector(sel);

      // 10 · Category strip — clip-wipe upward, tile by tile
      gsap.fromTo('.cat',
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power4.out', stagger: 0.1, scrollTrigger: st('.catstrip', 'top 80%') });

      // 12 · Curated Essentials — cards rise while their photo settles from a zoom
      const ess = q('.cell-essentials .pgrid');
      if (ess) {
        gsap.from(ess.children, { autoAlpha: 0, y: 46, duration: 0.9, ease: 'power3.out', stagger: 0.1, scrollTrigger: st(ess) });
        gsap.from(ess.querySelectorAll('.pcard-photo'), { scale: 1.14, duration: 1.3, ease: 'power2.out', stagger: 0.1, scrollTrigger: st(ess) });
      }
      gsap.from('.cell-essentials .sec-head', { autoAlpha: 0, y: 22, duration: 0.8, ease: 'power3.out', scrollTrigger: st('.cell-essentials .sec-head', 'top 90%') });

      // 13 · Built by the Culture — thumbs slide in from the right, title counters left
      //      (both live mid-panel, so they trigger on themselves, not the tall cell)
      gsap.from('.cell-culture .thumb', { autoAlpha: 0, xPercent: 24, duration: 0.85, ease: 'power3.out', stagger: 0.09, scrollTrigger: st('.cell-culture .thumbs', 'top 82%') });
      gsap.from('.cell-culture .sec-title', { autoAlpha: 0, x: -22, duration: 0.8, ease: 'power3.out', scrollTrigger: st('.cell-culture .sec-title', 'top 88%') });

      // 14 · Adaptive by Design — copy focuses in from a blur (copy is bottom-aligned)
      gsap.from('.promo-adaptive .promo-copy > *', { autoAlpha: 0, y: 30, filter: 'blur(12px)', duration: 1, ease: 'power3.out', stagger: 0.1, scrollTrigger: st('.promo-adaptive .promo-copy', 'top 84%') });

      // 15 · Best Sellers — cards scale up into place
      const best = q('.cell-bestsellers .pgrid');
      if (best) gsap.from(best.children, { autoAlpha: 0, scale: 0.9, y: 18, duration: 0.85, ease: 'power3.out', stagger: 0.1, scrollTrigger: st(best) });
      gsap.from('.cell-bestsellers .sec-head', { autoAlpha: 0, y: 22, duration: 0.8, ease: 'power3.out', scrollTrigger: st('.cell-bestsellers .sec-head', 'top 90%') });

      // 16 · From the Community — thumbs pop in with a slight overshoot
      gsap.from('.cell-community .thumb-wrap', { autoAlpha: 0, scale: 0.84, duration: 0.7, ease: 'back.out(1.6)', stagger: 0.08, scrollTrigger: st('.cell-community .thumbs', 'top 82%') });
      gsap.from('.cell-community .sec-title', { autoAlpha: 0, y: 22, duration: 0.8, ease: 'power3.out', scrollTrigger: st('.cell-community .sec-title', 'top 88%') });

      // 17 · Our Manifesto — headline rises line by line behind a mask (copy bottom-aligned)
      gsap.from('.promo-manifesto .mask-lines > span > span', { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.12, scrollTrigger: st('.promo-manifesto .promo-copy', 'top 82%') });
      gsap.from('.promo-manifesto .eyebrow, .promo-manifesto .manifesto-body, .promo-manifesto .btn', { autoAlpha: 0, y: 22, duration: 0.9, ease: 'power3.out', stagger: 0.1, scrollTrigger: st('.promo-manifesto .promo-copy', 'top 82%') });

      // 18 · Newsletter — title settles in with a skew
      gsap.from('.news-title', { autoAlpha: 0, y: 40, skewY: 6, duration: 1, ease: 'power4.out', scrollTrigger: st('.news-title', 'top 88%') });
      gsap.from('.news-sub, .news-form', { autoAlpha: 0, y: 22, duration: 0.85, ease: 'power3.out', stagger: 0.12, scrollTrigger: st('.news-form', 'top 88%') });

      // 22 · Footer — columns lift in
      gsap.from('.foot-brand, .foot-col', { autoAlpha: 0, y: 24, duration: 0.75, ease: 'power3.out', stagger: 0.07, scrollTrigger: st('.foot-top', 'top 90%') });
    });

    const start = () => { if (intro) intro.play(); ScrollTrigger.refresh(); };

    // The hero is hidden until this timeline plays, so it must play the moment the
    // page is actually on screen. Only wait for the loader when a loader is really
    // mounted (the fresh-landing case); on internal navigation / a repeat visit the
    // loader is skipped and never fires its event, so reveal the hero right away.
    // Waiting on the event unconditionally left the hero blank until the fallback.
    const loaderShowing = document.querySelector('.loader');
    let fallback;
    if (loaderShowing) {
      document.addEventListener('onepixel:loader-complete', start, { once: true });
      fallback = setTimeout(start, 4000); // safety net only, above the loader's run
    } else {
      start();
    }

    return () => {
      document.removeEventListener('onepixel:loader-complete', start);
      if (fallback) clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <EntryLoader mark="AERIUM" />
      <OpxBar />
      <div className="wire">
        <Nav />
        <Hero />
        <CategoryStrip />
        <Ticker />
        <EssentialsCulture />
        <AdaptiveBestsellers />
        <CommunityManifesto />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
