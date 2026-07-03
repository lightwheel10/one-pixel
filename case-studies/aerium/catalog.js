// Shared AERIUM product catalog — drives the shop grid, the shop filters,
// and the nav search overlay. Every product routes to the one sample PDP.

const IMG = '/case-studies/aerium/images/';
export const PDP_HREF = '/case-studies/aerium/product/';

export const CATALOG = [
  { name: 'System Shell Jacket', price: '₹8,999', priceValue: 8999, cat: 'Jackets',     color: 'Grey',     material: 'Nylon',   sizes: ['S', 'M', 'L', 'XL'],       active: 0, img: IMG + 'shop-grey-jacket.webp' },
  { name: 'Signal Tee',          price: '₹2,499', priceValue: 2499, cat: 'Tees',        color: 'Charcoal', material: 'Cotton',  sizes: ['S', 'M', 'L', 'XL', 'XXL'], active: 0, img: IMG + 'product-signal-tee.webp' },
  { name: 'Mod Cargo Pant',      price: '₹5,999', priceValue: 5999, cat: 'Pants',       color: 'Grey',     material: 'Ripstop', sizes: ['S', 'M', 'L', 'XL'],       active: 1, img: IMG + 'product-mod-cargo.webp' },
  { name: 'Vector Windbreaker',  price: '₹7,999', priceValue: 7999, cat: 'Jackets',     color: 'Black',    material: 'Nylon',   sizes: ['S', 'M', 'L', 'XL'],       active: 0, img: IMG + 'shop-black-jacket.webp' },
  { name: 'Utility Cargo Pant',  price: '₹6,499', priceValue: 6499, cat: 'Pants',       color: 'Black',    material: 'Ripstop', sizes: ['S', 'M', 'L', 'XL'],       active: 0, img: IMG + 'shop-black-cargo.webp',  pos: '50% 22%' },
  { name: 'A-01 Tech Cap',       price: '₹1,499', priceValue: 1499, cat: 'Accessories', color: 'Black',    material: 'Cotton',  sizes: ['OS'],                      active: 0, img: IMG + 'product-tech-cap.webp' },
  { name: 'Performance Tee',     price: '₹1,999', priceValue: 1999, cat: 'Tees',        color: 'Grey',     material: 'Cotton',  sizes: ['S', 'M', 'L', 'XL', 'XXL'], active: 1, img: IMG + 'shop-grey-tee.webp' },
  { name: 'Mod Sling Bag',       price: '₹2,999', priceValue: 2999, cat: 'Accessories', color: 'Black',    material: 'Nylon',   sizes: ['OS'],                      active: 0, img: IMG + 'shop-sling-bag.webp',   pos: '50% 32%' },
  { name: 'Adapt Shell Jacket',  price: '₹9,499', priceValue: 9499, cat: 'Jackets',     color: 'Black',    material: 'Fleece',  sizes: ['S', 'M', 'L', 'XL'],       active: 1, img: IMG + 'product-vortex-jacket.webp' },
  { name: 'Tactical Shorts',     price: '₹3,299', priceValue: 3299, cat: 'Shorts',      color: 'Black',    material: 'Ripstop', sizes: ['S', 'M', 'L', 'XL'],       active: 0, img: IMG + 'shop-black-shorts.webp', pos: '50% 48%' },
];

export const CATS = ['All', 'Jackets', 'Tees', 'Pants', 'Shorts', 'Accessories'];
export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
export const COLORS = ['Grey', 'Charcoal', 'Black'];
export const MATERIALS = ['Nylon', 'Cotton', 'Ripstop', 'Fleece'];

export const PRICE_RANGES = [
  { key: 'Under ₹3,000',      test: (v) => v < 3000 },
  { key: '₹3,000 to ₹6,000',  test: (v) => v >= 3000 && v <= 6000 },
  { key: 'Over ₹6,000',       test: (v) => v > 6000 },
];

export const SORTS = ['Newest', 'Price: Low to High', 'Price: High to Low'];
