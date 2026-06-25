import { createContext, useContext, useState, useCallback, useEffect } from 'react';

/* ---------------------------------------------------------- hash router */
// A small hash router so the storefront has real, shareable pages
// (#/, #/shop, #/shop/throws, #/product/kora-throw, #/checkout) without a
// server rewrite or an extra dependency.

export function parseHash() {
  const raw = (window.location.hash || '#/').replace(/^#/, '');
  const clean = raw.split('?')[0];
  const parts = clean.split('/').filter(Boolean);
  return { path: clean || '/', parts };
}

export function useRoute() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

export function navigate(to) {
  if (window.location.hash === '#' + to) {
    window.scrollTo({ top: 0, behavior: 'auto' });
  } else {
    window.location.hash = to;
  }
}

/* ---------------------------------------------------------------- cart */
const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(() => new Set());

  const toggleSave = useCallback((id) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    }), []);
  const isSaved = useCallback((id) => saved.has(id), [saved]);

  const add = useCallback((product, colour, qty = 1) => {
    const key = product.id + ':' + colour;
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { key, id: product.id, name: product.name, img: product.img, colour, price: product.price, qty }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((key) => setItems((prev) => prev.filter((i) => i.key !== key)), []);
  const setQty = useCallback((key, qty) =>
    setItems((prev) => prev.flatMap((i) => (i.key === key ? (qty <= 0 ? [] : [{ ...i, qty }]) : [i]))), []);
  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.qty * i.price, 0);

  return (
    <CartCtx.Provider value={{ items, open, setOpen, add, remove, setQty, clear, count, total, saved, toggleSave, isSaved }}>
      {children}
    </CartCtx.Provider>
  );
}
