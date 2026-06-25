import { useState, useEffect, useRef } from 'react';
import { useCart, navigate, useRoute } from './store.jsx';
import { COLOURWAYS, BRAND, formatRupee, getProduct, PRODUCTS } from './data.js';

export function ColourDot({ colour, active, onClick }) {
  const c = COLOURWAYS[colour];
  return (
    <button
      type="button"
      className={`fl-dot ${active ? 'on' : ''}`}
      style={{ '--c': c.hex }}
      aria-label={c.name}
      aria-pressed={active}
      onClick={onClick}
    />
  );
}

/* A floating, glassy product card — used over the hero photo and as the
   active "shop the room" hotspot card. */
export function ShopCard({ id, eyebrow, onClose }) {
  const { add } = useCart();
  const p = getProduct(id);
  if (!p) return null;
  return (
    <div className="fl-shopcard">
      {onClose && <button className="fl-shopcard-x" onClick={onClose} aria-label="Close">×</button>}
      <span className="fl-shopcard-eyebrow">{eyebrow}</span>
      <a href={'#/product/' + p.id} className="fl-shopcard-name">{p.name}</a>
      <div className="fl-shopcard-price">{formatRupee(p.price)}</div>
      <button className="fl-shopcard-add" onClick={() => add(p, p.base)}>
        Add to bag <span aria-hidden="true">+</span>
      </button>
    </div>
  );
}

export function ProductCard({ p }) {
  const { add } = useCart();
  const [colour, setColour] = useState(p.base);
  return (
    <article className="fl-card">
      <a className="fl-card-media" href={'#/product/' + p.id} aria-label={p.name}>
        <img src={p.img} alt={p.name} loading="lazy" />
        <span className="fl-card-quickadd" onClick={(e) => { e.preventDefault(); add(p, colour); }}>
          Add to bag <span aria-hidden="true">+</span>
        </span>
      </a>
      <div className="fl-card-info">
        <div className="fl-card-row">
          <h3 className="fl-card-name"><a href={'#/product/' + p.id}>{p.name}</a></h3>
          <span className="fl-card-price">{formatRupee(p.price)}</span>
        </div>
        <p className="fl-card-line">{p.line}</p>
        <div className="fl-card-foot">
          <div className="fl-dots">
            {p.colours.map((c) => (
              <ColourDot key={c} colour={c} active={c === colour} onClick={() => setColour(c)} />
            ))}
          </div>
          <span className="fl-card-cat">{p.maker}</span>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------- header */
export function Header() {
  const { count, setOpen } = useCart();
  const { parts } = useRoute();
  const isHome = parts.length === 0;
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const path = parts.join('/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setMenu(false); setSearch(false); }, [path]);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setMenu(false); setSearch(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const over = isHome && !scrolled && !menu && !search;

  return (
    <>
      <div className="fl-top">
        <div className="fl-opx">
          <span className="fl-opx-note">A OnePixel sample store · the goods and prices shown are placeholder</span>
          <a href="/" className="fl-opx-back">← Back to OnePixel</a>
        </div>
        <div className="fl-announce">Free shipping across India over {formatRupee(BRAND.freeShip)} · Handwoven to order</div>
        <header className={`fl-header ${over ? 'over' : 'solid'}`}>
          <div className="fl-header-in">
            <div className="fl-header-left">
              <button className="fl-burger" aria-label="Open menu" aria-expanded={menu} onClick={() => setMenu(true)}>
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 9h18M3 15h18" /></svg>
              </button>
              <nav className="fl-nav" aria-label="Primary">
                <a href="#/shop">Shop all</a>
                <a href="#/shop/throws">Throws</a>
                <a href="#/shop/wearables">To wear</a>
                <a href="#/shop/home">Home</a>
                <a href="#/story">Our cloth</a>
              </nav>
            </div>

            <a href="#/" className="fl-logo">Forest <span>&amp;</span> Loom</a>

            <div className="fl-utils">
              <button className="fl-util" aria-label="Search" onClick={() => setSearch(true)}>
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.2-4.2" /></svg>
              </button>
              <a href="#/account" className="fl-util fl-util-account" aria-label="Account">
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4.5 20c0-3.6 3.4-5.5 7.5-5.5s7.5 1.9 7.5 5.5" /></svg>
              </a>
              <button className="fl-util fl-util-bag" aria-label={`Bag, ${count} items`} onClick={() => setOpen(true)}>
                <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M6.5 8h11l-1 11.5h-9L6.5 8z" /><path d="M9 8.5V6.5a3 3 0 0 1 6 0v2" /></svg>
                {count > 0 && <span className="fl-util-count">{count}</span>}
              </button>
            </div>
          </div>
        </header>
      </div>

      <MobileMenu open={menu} onClose={() => setMenu(false)} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }) {
  return (
    <>
      <div className={`fl-mm-scrim ${open ? 'on' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`fl-mm ${open ? 'on' : ''}`} aria-hidden={!open} aria-label="Menu">
        <div className="fl-mm-head">
          <span className="fl-mm-title">Menu</span>
          <button className="fl-mm-close" onClick={onClose} aria-label="Close menu">Close</button>
        </div>
        <nav className="fl-mm-nav">
          <a href="#/shop" onClick={onClose}>Shop all</a>
          <a href="#/shop/throws" onClick={onClose}>Throws &amp; blankets</a>
          <a href="#/shop/wearables" onClick={onClose}>To wear</a>
          <a href="#/shop/home" onClick={onClose}>For the home</a>
          <a href="#/story" onClick={onClose}>Our cloth</a>
        </nav>
        <div className="fl-mm-foot">
          <a href={BRAND.phoneHref}>{BRAND.phone}</a>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
        </div>
      </aside>
    </>
  );
}

function SearchOverlay({ open, onClose }) {
  const [q, setQ] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (open) inputRef.current?.focus();
    else setQ('');
  }, [open]);
  const query = q.trim().toLowerCase();
  const results = query
    ? PRODUCTS.filter((p) => `${p.name} ${p.type} ${p.material} ${p.maker}`.toLowerCase().includes(query)).slice(0, 5)
    : [];
  return (
    <div className={`fl-search ${open ? 'on' : ''}`} aria-hidden={!open}>
      <div className="fl-search-scrim" onClick={onClose} aria-hidden="true" />
      <div className="fl-search-panel">
        <div className="fl-search-bar">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.2-4.2" /></svg>
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the collection" aria-label="Search" />
          <button className="fl-search-close" onClick={onClose} aria-label="Close search">Close</button>
        </div>
        {query ? (
          results.length ? (
            <ul className="fl-search-results">
              {results.map((p) => (
                <li key={p.id}>
                  <a href={'#/product/' + p.id} onClick={onClose}>
                    <img src={p.img} alt="" loading="lazy" />
                    <span className="fl-search-name">{p.name}</span>
                    <span className="fl-search-price">{formatRupee(p.price)}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="fl-search-empty">No pieces match “{q}”. Try “throw”, “indigo”, or “stole”.</p>
          )
        ) : (
          <div className="fl-search-suggest">
            <span>Popular</span>
            <a href="#/shop/throws" onClick={onClose}>Throws</a>
            <a href="#/shop/wearables" onClick={onClose}>Stoles &amp; scarves</a>
            <a href="#/shop/home" onClick={onClose}>For the home</a>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- footer */
export function Footer() {
  const [done, setDone] = useState(false);
  return (
    <footer className="fl-footer">
      <div className="fl-shell">
        <div className="fl-foot-news">
          <div>
            <h2 className="fl-foot-h">Letters from the loom.</h2>
            <p>New cloth, the odd story from a weaving town, and first word when something sells through. No noise.</p>
          </div>
          <form className="fl-news-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
            {done ? (
              <span className="fl-news-done">Thank you. We will be in touch.</span>
            ) : (
              <>
                <input type="email" required placeholder="Your email" aria-label="Email" />
                <button type="submit" className="fl-btn">Join</button>
              </>
            )}
          </form>
        </div>

        <div className="fl-foot-grid">
          <div className="fl-foot-brand">
            <div className="fl-foot-mark">Forest <span>&amp;</span> Loom</div>
            <p>Handwoven cloth, naturally dyed, made slowly by people we know. Woven by hand since {BRAND.founded}.</p>
          </div>
          <div className="fl-foot-col">
            <span className="fl-flabel">Shop</span>
            <a href="#/shop/throws">Throws &amp; blankets</a>
            <a href="#/shop/wearables">To wear</a>
            <a href="#/shop/home">For the home</a>
            <a href="#/shop">Everything</a>
          </div>
          <div className="fl-foot-col">
            <span className="fl-flabel">The house</span>
            <a href="#/about">About us</a>
            <a href="#/story">Our cloth</a>
            <a href="#/story">The makers</a>
            <a href="#/contact">Contact us</a>
          </div>
          <div className="fl-foot-col">
            <span className="fl-flabel">Help</span>
            <a href="#/contact">FAQ</a>
            <a href={BRAND.phoneHref}>{BRAND.phone}</a>
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            <span className="fl-foot-addr">{BRAND.address}</span>
          </div>
        </div>

        <div className="fl-foot-bottom">
          <span>© 2026 Forest &amp; Loom · Ships across India · free over {formatRupee(BRAND.freeShip)}</span>
          <span>Site by <a href="/">OnePixel Studio</a></span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------ mini cart */
export function MiniCart() {
  const { items, open, setOpen, remove, setQty, total, count } = useCart();
  const checkout = () => { setOpen(false); navigate('/checkout'); };
  return (
    <>
      <div className={`fl-drawer-scrim ${open ? 'on' : ''}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside className={`fl-drawer ${open ? 'on' : ''}`} aria-hidden={!open} aria-label="Your bag">
        <div className="fl-drawer-head">
          <span className="fl-drawer-title">Your bag{count > 0 ? ` · ${count}` : ''}</span>
          <button className="fl-drawer-close" onClick={() => setOpen(false)} aria-label="Close bag">Close</button>
        </div>

        {items.length === 0 ? (
          <div className="fl-drawer-empty">
            <p>Nothing here yet.</p>
            <p className="muted">A good bag starts with one honest thing.</p>
            <a href="#/shop" className="fl-btn fl-btn-line" onClick={() => setOpen(false)}>Browse the cloth</a>
          </div>
        ) : (
          <>
            <ul className="fl-drawer-items">
              {items.map((it) => (
                <li key={it.key} className="fl-drawer-item">
                  <a href={'#/product/' + it.id} className="fl-drawer-thumb" onClick={() => setOpen(false)}>
                    <img src={it.img} alt={it.name} loading="lazy" />
                  </a>
                  <div className="fl-drawer-body">
                    <div className="fl-drawer-row">
                      <a href={'#/product/' + it.id} className="fl-drawer-name" onClick={() => setOpen(false)}>{it.name}</a>
                      <span>{formatRupee(it.price * it.qty)}</span>
                    </div>
                    <div className="fl-drawer-meta">{COLOURWAYS[it.colour].name}</div>
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
            <div className="fl-drawer-foot">
              <div className="fl-drawer-total"><span>Subtotal</span><span>{formatRupee(total)}</span></div>
              <p className="fl-drawer-note">Shipping and tax are settled at checkout. Free over {formatRupee(BRAND.freeShip)}.</p>
              <button className="fl-btn fl-btn-full" onClick={checkout}>Checkout</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
