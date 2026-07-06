// Forest & Loom — catalogue. Invented but coherent; all prices in INR.
import { IMG } from './images.js';

export const COLOURWAYS = {
  undyed:      { name: 'Undyed',      hex: '#D9CDB5' },
  indigo:      { name: 'Indigo',      hex: '#2C3F52' },
  madder:      { name: 'Madder',      hex: '#9C4A38' },
  myrobalan:   { name: 'Myrobalan',   hex: '#C2982F' },
  iron:        { name: 'Iron',        hex: '#43413A' },
  katha:       { name: 'Katha',       hex: '#7A5232' },
  pomegranate: { name: 'Pomegranate', hex: '#8C7C3A' },
};

export const CATEGORIES = [
  { v: 'throws',    l: 'Throws & Blankets', tag: 'Warmth, woven slowly',     img: IMG.catThrows },
  { v: 'wearables', l: 'To Wear',           tag: 'Stoles, scarves and wraps', img: IMG.catWearables },
  { v: 'home',      l: 'For the Home',      tag: 'Linen for table and bed',   img: IMG.catHome },
];

export const PRODUCTS = [
  {
    id: 'kora-throw', name: 'Kora Throw', type: 'throws', price: 6800, img: IMG.pKora,
    gallery: [IMG.pKora, IMG.pKoraAlt1, IMG.pKoraAlt2],
    line: 'Undyed kala cotton, left the colour it grew.',
    desc: 'A generous throw in rain-fed kala cotton, woven on a pit loom in Kutch and left undyed. It carries the warm, uneven colour of the cotton itself, and softens with every wash.',
    material: 'Kala cotton', weave: 'Plain weave', gsm: '320 GSM', size: '200 × 150 cm',
    maker: 'Bhujodi, Kutch', care: 'Cold wash, dry in shade',
    colours: ['undyed', 'indigo', 'madder'], base: 'undyed', featured: true,
  },
  {
    id: 'indigo-khes', name: 'Khes Blanket', type: 'throws', price: 9400, img: IMG.pKhes,
    gallery: [IMG.pKhes, IMG.pKhesAlt1, IMG.pKhesAlt2],
    line: 'A double cloth blanket. Warm on one face, cool on the other.',
    desc: 'Two cloths woven as one on the loom, so the blanket is warm on the indigo face and cool on the natural one. Handspun cotton, dyed in a living indigo vat. The piece we are proudest of.',
    material: 'Handspun cotton', weave: 'Double cloth', gsm: '480 GSM', size: '230 × 160 cm',
    maker: 'Panipat, Haryana', care: 'Cold wash separately at first',
    colours: ['indigo', 'iron'], base: 'indigo', featured: true,
  },
  {
    id: 'maheshwar-stole', name: 'Maheshwari Stole', type: 'wearables', price: 3200, img: IMG.pStole,
    gallery: [IMG.pStole, IMG.pStoleAlt1, IMG.pStoleAlt2],
    line: 'Featherweight cotton and silk, with the fine Maheshwar border.',
    desc: 'A stole so light you forget you are wearing it, with the slim gold border Maheshwar has woven for centuries. Cotton in the body, a thread of tussar silk through the edge.',
    material: 'Cotton · tussar silk', weave: 'Plain weave, zari border', gsm: '90 GSM', size: '210 × 70 cm',
    maker: 'Maheshwar, MP', care: 'Hand wash cold, dry flat',
    colours: ['myrobalan', 'madder', 'indigo'], base: 'myrobalan', featured: true,
  },
  {
    id: 'tussar-scarf', name: 'Tussar Scarf', type: 'wearables', price: 4600, img: IMG.pScarf,
    gallery: [IMG.pScarf, IMG.pScarfAlt1, IMG.pScarfAlt2],
    line: 'Wild tussar silk, reeled by hand from the cocoon.',
    desc: 'Wild tussar, reeled by hand so the silk keeps its slub and its quiet shine. It holds a little warmth and a lot of light, and only gets better with age.',
    material: 'Wild tussar silk', weave: 'Plain weave', gsm: '110 GSM', size: '180 × 55 cm',
    maker: 'Bhagalpur, Bihar', care: 'Dry clean or gentle hand wash',
    colours: ['undyed', 'katha'], base: 'undyed',
  },
  {
    id: 'merino-wrap', name: 'Kutch Wool Wrap', type: 'wearables', price: 7200, img: IMG.pWrap,
    gallery: [IMG.pWrap, IMG.pWrapAlt1, IMG.pWrapAlt2],
    line: 'Soft merino and cotton, with a quiet extra-weft motif.',
    desc: 'A big, soft wrap in merino and cotton, carrying a small extra-weft motif lifted straight from the weaver’s own sampler. Warm enough for a Bengaluru December or a hill-station evening.',
    material: 'Merino · cotton', weave: 'Extra weft', gsm: '260 GSM', size: '220 × 90 cm',
    maker: 'Bhujodi, Kutch', care: 'Hand wash cold, dry flat',
    colours: ['iron', 'madder'], base: 'iron',
  },
  {
    id: 'selvedge-napkins', name: 'Selvedge Napkins', type: 'home', price: 2400, img: IMG.pNapkins,
    gallery: [IMG.pNapkins, IMG.pNapkinsAlt1, IMG.pNapkinsAlt2],
    line: 'A set of four, edged in the loom’s own selvedge.',
    desc: 'Four napkins in kala cotton, left with the loom’s own selvedge as the edge so they never need a hem. They soften and fray kindly, and look better at year five than year one.',
    material: 'Kala cotton', weave: 'Plain weave', gsm: 'Set of 4', size: '45 × 45 cm',
    maker: 'Bhujodi, Kutch', care: 'Machine wash cold, warm iron',
    colours: ['undyed', 'indigo'], base: 'undyed',
  },
  {
    id: 'indigo-runner', name: 'Indigo Table Runner', type: 'home', price: 3600, img: IMG.pRunner,
    gallery: [IMG.pRunner, IMG.pRunnerAlt1, IMG.pRunnerAlt2],
    line: 'A long runner in vat indigo, for a table that gets used.',
    desc: 'A long, narrow runner dyed in a natural indigo vat, with a fine undyed stripe at each end. Made for a table that is actually eaten at, and washes back to soft.',
    material: 'Kala cotton', weave: 'Plain weave, striped ends', gsm: '220 GSM', size: '180 × 40 cm',
    maker: 'Maheshwar, MP', care: 'Cold wash, dry in shade',
    colours: ['indigo', 'undyed'], base: 'indigo',
  },
  {
    id: 'bhujodi-cushion', name: 'Bhujodi Cushion', type: 'home', price: 2800, img: IMG.pCushion,
    gallery: [IMG.pCushion, IMG.pCushionAlt1, IMG.pCushionAlt2],
    line: 'Merino and cotton, with an extra-weft motif from the sampler.',
    desc: 'A cushion cover in merino and cotton with a small woven motif, closed with a wooden button and an envelope back. Cover only, sized for a standard 50 cm insert.',
    material: 'Merino · cotton', weave: 'Extra weft', gsm: 'Cover only', size: '50 × 50 cm',
    maker: 'Bhujodi, Kutch', care: 'Hand wash cold, dry flat',
    colours: ['iron', 'madder', 'pomegranate'], base: 'iron',
  },
];

export const ORIGIN = [
  { n: '01', label: 'Fibre',  text: 'Rain-fed kala cotton and wild tussar silk, grown without irrigation and spun close to where it is grown.' },
  { n: '02', label: 'Colour', text: 'Indigo from the vat, madder from root, myrobalan from fruit. Every colour here grew somewhere. Nothing is synthetic.' },
  { n: '03', label: 'Loom',   text: 'Pit looms and frame looms across four states, woven by hand at a little under a metre a day.' },
  { n: '04', label: 'Home',   text: 'It reaches you folded, with a card from the family that made it, and softens with every wash.' },
];

export const MAKERS = [
  { name: 'The Vankars of Bhujodi', where: 'Kutch, Gujarat', img: IMG.maker1, note: 'Three families on twelve looms, weaving the extra-weft motifs they have kept for generations.' },
  { name: 'Rehman, master dyer',    where: 'Farrukhabad, UP', img: IMG.maker2, note: 'Keeps a living indigo vat and reads its colour by the foam, the way his father taught him.' },
];

export const BRAND = {
  founded: '2016',
  address: '7 Cunningham Road, Bengaluru 560052',
  phone: '+91 80 4123 7766',
  phoneHref: 'tel:+918041237766',
  whatsapp: 'https://wa.me/918041237766',
  email: 'hello@forestandloom.com',
  hours: 'Monday to Saturday · 10am to 6pm IST',
  freeShip: 5000,
};

export const FAQ = [
  { q: 'Where do you ship?', a: 'We ship across India only, to every state and union territory. We do not ship outside India yet.' },
  { q: 'How long will my order take?', a: 'Each piece is made to order and leaves us within five working days. After that it is two to five days by courier depending on your city, so most orders reach you within a week or so.' },
  { q: 'Do you offer Cash on Delivery?', a: 'Yes. We offer Cash on Delivery across India, along with UPI, all major cards, and EMI on orders above ₹3,000.' },
  { q: 'Can I return or exchange something?', a: 'Yes. If a piece is not right, return it unused within 14 days. We arrange a pickup in most cities, or exchange it for another colour or piece.' },
  { q: 'Will the colour run?', a: 'A little, on the first wash. Our colours are natural dyes, so the first wash settles them in. Wash cold and dry in the shade and they hold for years.' },
  { q: 'Do you provide a GST invoice?', a: 'Yes, a GST invoice goes out with every order. Add your GSTIN at checkout if you would like it on the bill.' },
  { q: 'Can I get a custom size or place a bulk order?', a: 'Often, yes. Message us on WhatsApp with what you have in mind and we will tell you what the weavers can do.' },
];

// Editorial lookbook structures
export const CHAPTERS = [
  { n: '01', l: 'The Cloth', target: 'top' },
  { n: '02', l: 'The Look', target: 'look' },
  { n: '03', l: 'The Weave', target: 'weave' },
  { n: '04', l: 'The Room', target: 'room' },
  { n: '05', l: 'The Makers', target: 'story' },
];

export const HERO_PRODUCT = 'indigo-khes';

// Hero crossfade slideshow (a few cinematic shots fading in and out)
export const HERO_SLIDES = [IMG.heroMain, IMG.heroAlt, IMG.heroC, IMG.heroD];

export const LOOK = {
  title: 'Modern heritage,\nnatural ease.',
  label: 'Look 01',
  items: ['maheshwar-stole', 'kora-throw', 'tussar-scarf'],
};

// Each stage shows its own image in the "cloth within" section (placeholder mapping from the
// existing photography — swap any IMG ref to change what a stage shows).
export const WEAVE = [
  { n: '01', label: 'Fibre',  img: IMG.detailMacro, text: 'Rain-fed kala cotton and wild tussar silk, grown without irrigation and hand-spun close to the field.' },
  { n: '02', label: 'Colour', img: IMG.maker2,      text: 'Indigo from the vat, madder from root, myrobalan from fruit. Every colour here was grown, never mixed in a lab.' },
  { n: '03', label: 'Weave',  img: IMG.craftMain,   text: 'Pit looms and frame looms across four states. A little under a metre a day, by hand, by people we know.' },
  { n: '04', label: 'Finish', img: IMG.foldedStack, text: 'Washed, pressed, and checked against the light. It reaches you soft, and only grows softer.' },
];

// "Shop the room" — products placed as numbered hotspots over the interior photo (x/y in %)
export const ROOM = [
  { id: 'indigo-khes',      x: 30, y: 40 },
  { id: 'bhujodi-cushion',  x: 54, y: 62 },
  { id: 'kora-throw',       x: 72, y: 50 },
  { id: 'indigo-runner',    x: 44, y: 78 },
];

// Ratings + reviews (placeholder, Indian-English voice). Swap for real reviews before launch.
export const RATINGS = {
  'kora-throw': { avg: 4.8, count: 42 },
  'indigo-khes': { avg: 4.9, count: 71 },
  'maheshwar-stole': { avg: 4.7, count: 38 },
  'tussar-scarf': { avg: 4.8, count: 26 },
  'merino-wrap': { avg: 4.9, count: 33 },
  'selvedge-napkins': { avg: 4.6, count: 54 },
  'indigo-runner': { avg: 4.8, count: 29 },
  'bhujodi-cushion': { avg: 4.7, count: 47 },
};
export const ratingFor = (id) => RATINGS[id] || { avg: 4.8, count: 24 };

export const REVIEW_DIST = [[5, 82], [4, 12], [3, 4], [2, 1], [1, 1]];

export const REVIEWS = [
  { name: 'Ananya R', place: 'Bengaluru', date: 'March 2026', stars: 5, verified: true, img: IMG.foldedStack,
    text: 'It came folded in cotton with a handwritten note naming the woman who wove it. Two years on, the indigo has settled to exactly the blue I was hoping for.' },
  { name: 'Rohan M', place: 'Pune', date: 'February 2026', stars: 5, verified: true,
    text: 'Warmer than it looks, and somehow softer after every wash. Worth the wait for a made to order piece.' },
  { name: 'Meera K', place: 'Mumbai', date: 'February 2026', stars: 4, verified: true,
    text: 'Beautiful weave and the colour is true to the photos. Reached me in about a week, very well packed.' },
  { name: 'Devika S', place: 'Kochi', date: 'January 2026', stars: 5, verified: true,
    text: 'Bought it for my mother and now I want one for myself. The quality is too good for the price.' },
  { name: 'Arjun T', place: 'New Delhi', date: 'December 2025', stars: 5, verified: true,
    text: 'You can feel the hand of the weaver in it. Nothing like the mill made things I have bought before.' },
];

export const formatRupee = (n) => '₹' + n.toLocaleString('en-IN');
export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
export const related = (p, n = 3) =>
  PRODUCTS.filter((x) => x.id !== p.id && x.type === p.type)
    .concat(PRODUCTS.filter((x) => x.id !== p.id && x.type !== p.type))
    .slice(0, n);
