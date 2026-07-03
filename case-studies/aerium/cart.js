// Shared AERIUM cart store.
// The site is an MPA (home / shop / product / checkout are separate pages), so the cart
// lives in localStorage to survive navigation. A custom 'aerium:cart-change' event keeps the
// nav badge and the drawer in sync within a page; the native 'storage' event syncs other tabs.
// 'aerium:cart-open' asks whatever nav is mounted to slide the cart drawer open.

const KEY = 'aerium:cart';
export const CHECKOUT_HREF = '/case-studies/aerium/checkout/';

/* A cart line is unique by product + chosen size + colour, so the same hoodie in two
   sizes is two lines but adding the same variant twice just bumps the quantity. */
export function lineKey(item) {
  return [item.id, item.size || '', item.color || ''].join('|');
}

function parsePrice(str) {
  return Number(String(str).replace(/[^\d]/g, '')) || 0;
}

export function formatINR(n) {
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

export function readCart() {
  try {
    const arr = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* ignore */ }
  try { window.dispatchEvent(new CustomEvent('aerium:cart-change')); } catch { /* ignore */ }
  return items;
}

export function addToCart(item, qty = 1) {
  const items = readCart();
  const key = lineKey(item);
  const existing = items.find((l) => lineKey(l) === key);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({
      id: item.id ?? item.name,
      name: item.name,
      price: item.price,
      priceValue: item.priceValue ?? parsePrice(item.price),
      img: item.img || '',
      size: item.size || '',
      color: item.color || '',
      qty,
    });
  }
  return writeCart(items);
}

export function setQty(key, qty) {
  let items = readCart();
  if (qty <= 0) {
    items = items.filter((l) => lineKey(l) !== key);
  } else {
    const line = items.find((l) => lineKey(l) === key);
    if (line) line.qty = qty;
  }
  return writeCart(items);
}

export function removeLine(key) {
  return writeCart(readCart().filter((l) => lineKey(l) !== key));
}

export function clearCart() {
  return writeCart([]);
}

export function cartCount(items = readCart()) {
  return items.reduce((n, l) => n + l.qty, 0);
}

export function cartSubtotal(items = readCart()) {
  return items.reduce((n, l) => n + (l.priceValue || 0) * l.qty, 0);
}

// Ask the mounted nav to open the cart drawer (used right after an add-to-cart).
export function openCart() {
  try { window.dispatchEvent(new CustomEvent('aerium:cart-open')); } catch { /* ignore */ }
}
