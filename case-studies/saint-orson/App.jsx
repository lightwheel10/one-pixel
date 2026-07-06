import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader } from '../../src/Loader.jsx';
import { PRODUCTS, PRODUCT_BY_SLUG, productHref, formatINR } from './products.js';

gsap.registerPlugin(ScrollTrigger);

const ASSET = '/case-studies/saint-orson/';
const LOOKS = PRODUCTS.slice(0, 7);
const LOOK_IMAGE_BY_SLUG = {
  'merino-roll-neck': 'looks/look-01-merino-roll-neck.jpg',
  'gabardine-trouser': 'looks/look-02-gabardine-trouser.jpg',
  'silk-evening-shirt': 'looks/look-03-silk-evening-shirt.jpg',
  'milano-coat': 'looks/look-04-milano-coat.jpg',
  'cashmere-polo-knit': 'looks/look-05-cashmere-polo-knit.jpg',
  'pleated-wool-trouser': 'looks/look-06-pleated-wool-trouser.jpg',
  'draped-silk-dress': 'looks/look-07-draped-silk-dress.jpg',
};
const DRESS_COLOR_IMAGES = {
  black: 'products/main/draped-silk-dress-main-v1.jpg',
  navy: 'products/colors/draped-silk-dress-navy-v1.jpg',
  wine: 'products/colors/draped-silk-dress-wine-v1.jpg',
};
const COLOR_HEX = {
  Black: '#101010', Navy: '#17203c', Wine: '#651c2b', Charcoal: '#454544',
  Ivory: '#ded8cb', Stone: '#aaa397', Chestnut: '#5c321f', Oxblood: '#571d26',
  Midnight: '#10172d', Obsidian: '#080808',
};
const COLLECTION_DELIVERY = 'Complimentary insured delivery across India. Collection pieces ship in a numbered Saint Orson garment case.';
const collectionImage = (slug, name) => `collection/${slug}/${name}.jpg`;
const COLLECTION_PRODUCTS = [
  {
    slug: 'midnight-travel-blazer',
    collectionOnly: true,
    number: 'C01',
    name: 'Midnight travel blazer',
    display: ['Midnight', 'travel blazer'],
    category: 'Collection tailoring',
    chapter: 'Collection 01',
    price: 128000,
    colors: ['Midnight', 'Charcoal', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A double-breasted travel blazer in matte midnight wool, cut with authority through the shoulder and ease through the body.',
    material: 'Compact wool with a dry hand, selected for a dark surface that keeps its line through long hours.',
    construction: 'Soft shoulder, peak lapel, dark horn buttons, half canvas and a double vent finished for movement.',
    care: 'Specialist dry clean only. Rest on a broad hanger and steam lightly from the reverse.',
    delivery: COLLECTION_DELIVERY,
    fitNote: 'Model is 188 cm and wears size M. Tailored through the shoulder with room over a fine knit.',
    storyTitle: ['Authority,', 'without', 'noise.'],
    storyCopy: 'The blazer is built for arrival: structured enough to command a room, relaxed enough to travel through one.',
    movementTitle: ['Cut for', 'the long', 'evening.'],
    movementCopy: 'A softened chest and double vent keep the silhouette composed when seated, standing or moving between rooms.',
    materialLabel: 'Matte wool · Half canvas',
    signature: 'Collection-only · Numbered release',
    images: [
      collectionImage('midnight-travel-blazer', 'main-v1'),
      collectionImage('midnight-travel-blazer', 'detail-v1'),
      collectionImage('midnight-travel-blazer', 'rear-v1'),
      collectionImage('midnight-travel-blazer', 'editorial-v1'),
    ],
    shopImage: collectionImage('midnight-travel-blazer', 'main-v1'),
    shopPosition: 'center 16%',
    collectionImage: collectionImage('midnight-travel-blazer', 'editorial-v1'),
  },
  {
    slug: 'obsidian-silk-column-dress',
    collectionOnly: true,
    number: 'C02',
    name: 'Obsidian silk column dress',
    display: ['Obsidian', 'silk column'],
    category: 'Collection evening',
    chapter: 'Collection 01',
    price: 118000,
    colors: ['Obsidian', 'Wine', 'Ivory'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A matte silk column dress with an asymmetric neckline, long fall and enough restraint to feel more powerful than decorative.',
    material: 'Heavy silk crepe with a matte face, chosen for quiet movement and a controlled vertical line.',
    construction: 'Asymmetric neckline, internal waist stay, clean side seam and a hand-finished hem.',
    care: 'Specialist dry clean only. Store hanging with space around the neckline and steam lightly before wear.',
    delivery: COLLECTION_DELIVERY,
    fitNote: 'Model is 178 cm and wears size S. Close through the upper body with a fluid lower column.',
    storyTitle: ['Evening,', 'reduced to', 'a line.'],
    storyCopy: 'The dress carries drama through proportion rather than shine, allowing the fabric to move without announcing itself.',
    movementTitle: ['A silhouette', 'that keeps', 'its calm.'],
    movementCopy: 'The weighted crepe falls back into place after every step, keeping the body line long and deliberate.',
    materialLabel: 'Matte silk crepe · Hand finish',
    signature: 'Collection-only · Numbered release',
    images: [
      collectionImage('obsidian-silk-column-dress', 'main-v1'),
      collectionImage('obsidian-silk-column-dress', 'detail-v1'),
      collectionImage('obsidian-silk-column-dress', 'rear-v1'),
      collectionImage('obsidian-silk-column-dress', 'editorial-v1'),
    ],
    shopImage: collectionImage('obsidian-silk-column-dress', 'main-v1'),
    shopPosition: 'center 16%',
    collectionImage: collectionImage('obsidian-silk-column-dress', 'editorial-v1'),
  },
  {
    slug: 'navigator-leather-folio',
    collectionOnly: true,
    number: 'C03',
    name: 'Navigator leather folio',
    display: ['Navigator', 'leather folio'],
    category: 'Collection accessory',
    chapter: 'Collection 01',
    price: 72500,
    colors: ['Oxblood', 'Black', 'Chestnut'],
    sizes: ['One size'],
    description: 'A slim full-grain leather folio for documents, cards and travel papers, made to sit cleanly under the arm.',
    material: 'Vegetable-tanned full-grain leather with a firm hand, cotton drill lining and muted brass hardware.',
    construction: 'Painted edges, fine stitching, structured internal pockets and a smooth brass zip closure.',
    care: 'Wipe with a soft dry cloth. Condition sparingly and store flat inside its dust sleeve.',
    delivery: COLLECTION_DELIVERY,
    fitNote: 'Measures 34 × 24 cm. Holds documents, boarding papers, cards and a slim notebook.',
    storyTitle: ['The papers', 'kept in', 'order.'],
    storyCopy: 'The folio is designed for the parts of travel that should not look improvised: documents, confirmations and the next room key.',
    movementTitle: ['Carried', 'without', 'clutter.'],
    movementCopy: 'Its flat profile keeps the line close to the body while the interior separates the details that matter.',
    materialLabel: 'Full-grain leather · Brass',
    signature: 'Collection-only · Numbered release',
    images: [
      collectionImage('navigator-leather-folio', 'main-v1'),
      collectionImage('navigator-leather-folio', 'detail-v1'),
      collectionImage('navigator-leather-folio', 'interior-v1'),
      collectionImage('navigator-leather-folio', 'editorial-v1'),
    ],
    shopImage: collectionImage('navigator-leather-folio', 'main-v1'),
    shopPosition: 'center',
    collectionImage: collectionImage('navigator-leather-folio', 'editorial-v1'),
  },
  {
    slug: 'aster-cashmere-evening-polo',
    collectionOnly: true,
    number: 'C04',
    name: 'Aster cashmere evening polo',
    display: ['Aster', 'cashmere polo'],
    category: 'Collection knitwear',
    chapter: 'Collection 01',
    price: 64500,
    colors: ['Charcoal', 'Black', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'A dense cashmere evening polo with an open collar, built to sit between knitwear and soft tailoring.',
    material: 'Two-ply cashmere knitted with a compact surface and enough body to hold the collar.',
    construction: 'Open soft collar, linked seams, ribbed cuffs and hem, and a close but unforced body.',
    care: 'Dry clean or specialist cashmere care only. Fold flat and avoid hanging for long storage.',
    delivery: COLLECTION_DELIVERY,
    fitNote: 'Model is 188 cm and wears size M. Close through the chest with ease at the waist.',
    storyTitle: ['Knitwear', 'with evening', 'manners.'],
    storyCopy: 'The collar gives the piece enough formality for dinner while the knit keeps it easy against the body.',
    movementTitle: ['Softness', 'given', 'structure.'],
    movementCopy: 'The dense gauge holds the neckline and sleeve line without turning the garment stiff.',
    materialLabel: 'Two-ply cashmere · Compact knit',
    signature: 'Collection-only · Numbered release',
    images: [
      collectionImage('aster-cashmere-evening-polo', 'main-v1'),
      collectionImage('aster-cashmere-evening-polo', 'detail-v1'),
      collectionImage('aster-cashmere-evening-polo', 'rear-v1'),
      collectionImage('aster-cashmere-evening-polo', 'editorial-v1'),
    ],
    shopImage: collectionImage('aster-cashmere-evening-polo', 'main-v1'),
    shopPosition: 'center 16%',
    collectionImage: collectionImage('aster-cashmere-evening-polo', 'editorial-v1'),
  },
  {
    slug: 'charcoal-ceremony-trouser',
    collectionOnly: true,
    number: 'C05',
    name: 'Charcoal ceremony trouser',
    display: ['Charcoal', 'ceremony trouser'],
    category: 'Collection tailoring',
    chapter: 'Collection 01',
    price: 68500,
    colors: ['Charcoal', 'Black', 'Navy'],
    sizes: ['28', '30', '32', '34', '36'],
    description: 'A high-rise charcoal wool trouser with inward pleats, side adjusters and a long formal fall.',
    material: 'Fine matte wool woven for a clean crease, dry surface and controlled movement.',
    construction: 'Double inward pleats, extended waistband, side adjusters, slanted pockets and a hand-finished hem.',
    care: 'Specialist dry clean only. Hang from the hem after wear to let the crease recover.',
    delivery: COLLECTION_DELIVERY,
    fitNote: 'Model wears size 30. High rise with room through the thigh and a long straight leg.',
    storyTitle: ['The line', 'that carries', 'the room.'],
    storyCopy: 'The pleats open only when needed, leaving the front calm when the wearer is still.',
    movementTitle: ['Formal', 'without', 'fragility.'],
    movementCopy: 'A deeper rise and controlled leg give the trouser enough presence for ceremony and enough ease for travel.',
    materialLabel: 'Matte wool · Side adjusters',
    signature: 'Collection-only · Numbered release',
    images: [
      collectionImage('charcoal-ceremony-trouser', 'main-v1'),
      collectionImage('charcoal-ceremony-trouser', 'detail-v1'),
      collectionImage('charcoal-ceremony-trouser', 'rear-v1'),
      collectionImage('charcoal-ceremony-trouser', 'editorial-v1'),
    ],
    shopImage: collectionImage('charcoal-ceremony-trouser', 'main-v1'),
    shopPosition: 'center 12%',
    collectionImage: collectionImage('charcoal-ceremony-trouser', 'editorial-v1'),
  },
  {
    slug: 'ivory-architectural-jacket',
    collectionOnly: true,
    number: 'C06',
    name: 'Ivory architectural jacket',
    display: ['Ivory', 'architectural jacket'],
    category: 'Collection tailoring',
    chapter: 'Collection 01',
    price: 132000,
    colors: ['Ivory', 'Black', 'Wine'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A collarless ivory wool-silk jacket with a sculpted shoulder, hidden closure and decisive waist.',
    material: 'Matte wool-silk chosen for structure, breathability and a clean ivory surface.',
    construction: 'Architectural shoulder, collarless neckline, hidden closure, internal canvas and shaped waist darts.',
    care: 'Specialist dry clean only. Store on a broad hanger and cover the shoulder line.',
    delivery: COLLECTION_DELIVERY,
    fitNote: 'Model is 178 cm and wears size S. Defined through the shoulder and waist with a clean sleeve.',
    storyTitle: ['Power,', 'drawn in', 'ivory.'],
    storyCopy: 'The jacket uses shape instead of embellishment, bringing attention to shoulder, waist and line.',
    movementTitle: ['Structure', 'with no', 'excess.'],
    movementCopy: 'The hidden closure keeps the front uninterrupted while the shaped back holds the silhouette in motion.',
    materialLabel: 'Wool silk · Sculpted shoulder',
    signature: 'Collection-only · Numbered release',
    images: [
      collectionImage('ivory-architectural-jacket', 'main-v1'),
      collectionImage('ivory-architectural-jacket', 'detail-v1'),
      collectionImage('ivory-architectural-jacket', 'rear-v1'),
      collectionImage('ivory-architectural-jacket', 'editorial-v1'),
    ],
    shopImage: collectionImage('ivory-architectural-jacket', 'main-v1'),
    shopPosition: 'center 12%',
    collectionImage: collectionImage('ivory-architectural-jacket', 'editorial-v1'),
  },
  {
    slug: 'wine-silk-tunic-set',
    collectionOnly: true,
    number: 'C07',
    name: 'Wine silk tunic set',
    display: ['Wine silk', 'tunic set'],
    category: 'Collection evening',
    chapter: 'Collection 01',
    price: 104000,
    colors: ['Wine', 'Black', 'Ivory'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'A deep wine silk tunic and wide-leg trouser set, modern in line and quietly Indian in proportion.',
    material: 'Heavy matte silk crepe with a fluid fall and a deep wine tone that stays subdued in low light.',
    construction: 'High neckline, side slits, clean sleeve finish, wide-leg trouser and hand-finished hems.',
    care: 'Specialist dry clean only. Hang the tunic and trouser separately after wear.',
    delivery: COLLECTION_DELIVERY,
    fitNote: 'Model is 178 cm and wears size S. Straight through the tunic with movement at the side slit.',
    storyTitle: ['Ceremony,', 'made', 'modern.'],
    storyCopy: 'The silhouette nods to Indian evening dress without relying on embroidery, shine or ornament.',
    movementTitle: ['A quiet', 'way to', 'enter.'],
    movementCopy: 'The side slits and wide trouser leg create movement while the high neckline keeps the line composed.',
    materialLabel: 'Matte silk crepe · Two piece set',
    signature: 'Collection-only · Numbered release',
    images: [
      collectionImage('wine-silk-tunic-set', 'main-v1'),
      collectionImage('wine-silk-tunic-set', 'detail-v1'),
      collectionImage('wine-silk-tunic-set', 'rear-v1'),
      collectionImage('wine-silk-tunic-set', 'editorial-v1'),
    ],
    shopImage: collectionImage('wine-silk-tunic-set', 'main-v1'),
    shopPosition: 'center 12%',
    collectionImage: collectionImage('wine-silk-tunic-set', 'editorial-v1'),
  },
  {
    slug: 'pearl-evening-clutch',
    collectionOnly: true,
    number: 'C08',
    name: 'Pearl evening clutch',
    display: ['Pearl', 'evening clutch'],
    category: 'Collection accessory',
    chapter: 'Collection 01',
    price: 58500,
    colors: ['Ivory', 'Black', 'Oxblood'],
    sizes: ['One size'],
    description: 'A compact pearl-toned evening clutch with a muted brass frame, hidden closure and fine chain.',
    material: 'Pearl satin, smooth leather edging, ivory lining and brushed brass hardware.',
    construction: 'Rigid soft-rounded body, magnetic closure, internal card pocket and detachable chain.',
    care: 'Wipe gently with a dry cloth. Store inside its dust sleeve away from dark fabrics.',
    delivery: COLLECTION_DELIVERY,
    fitNote: 'Measures 21 × 12 cm. Fits a phone, cards, keys and evening essentials.',
    storyTitle: ['The final', 'small', 'gesture.'],
    storyCopy: 'The clutch is designed to catch light softly, not sparkle, keeping the evening line quiet.',
    movementTitle: ['Held', 'close to', 'the body.'],
    movementCopy: 'The softened rectangular form sits naturally in the hand while the chain stays optional.',
    materialLabel: 'Pearl satin · Brushed brass',
    signature: 'Collection-only · Numbered release',
    images: [
      collectionImage('pearl-evening-clutch', 'main-v1'),
      collectionImage('pearl-evening-clutch', 'detail-v1'),
      collectionImage('pearl-evening-clutch', 'interior-v1'),
      collectionImage('pearl-evening-clutch', 'editorial-v1'),
    ],
    shopImage: collectionImage('pearl-evening-clutch', 'main-v1'),
    shopPosition: 'center',
    collectionImage: collectionImage('pearl-evening-clutch', 'editorial-v1'),
  },
];
const ALL_PRODUCT_BY_SLUG = { ...PRODUCT_BY_SLUG, ...Object.fromEntries(COLLECTION_PRODUCTS.map((product) => [product.slug, product])) };

function OpxBar() {
  return (
    <div className="so-opx">
      <span className="so-opx-note">A OnePixel sample site &middot; products, prices and checkout are placeholder</span>
      <a className="so-opx-back" href="/">&larr; Back to OnePixel</a>
    </div>
  );
}

function Header({ bag, onBag, onSearch, interiorPage = false }) {
  const homeLink = (id = '') => interiorPage ? `#/${id ? `?section=${id}` : ''}` : `#${id}`;
  return (
    <header className={`so-header${interiorPage ? ' product-page' : ''}`}>
      <a className="so-wordmark" href={homeLink()}>Saint Orson</a>
      <nav className="so-nav" aria-label="Primary navigation">
        <a href="#/shop">Shop all</a>
        <a href="#/collection">Collection</a>
        <a href="#/studio">Studio</a>
      </nav>
      <div className="so-tools">
        <button type="button" onClick={onSearch}>Search</button>
        <button type="button" onClick={onBag}>Bag ({bag})</button>
      </div>
    </header>
  );
}

function LookTicker() {
  return (
    <div className="so-ticker">
      <span className="accent">By appointment</span>
      <span>Mumbai</span>
      <span>New Delhi</span>
      <span>Bengaluru</span>
      <span>Hyderabad</span>
      <a href="#/studio">Book a fitting <i>→</i></a>
    </div>
  );
}

const HERO_IMAGES = [
  { src: 'home/hero-v1.jpg', alt: 'Saint Orson model in a black roll neck and tailored trousers', position: '55% center' },
  { src: 'home/morning-v1.jpg', alt: 'Woman in an ivory Saint Orson blazer suit with a silk scarf by a window', position: '50% 20%' },
];

function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setInterval(() => setActive((current) => (current + 1) % HERO_IMAGES.length), 4000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="so-hero" id="top">
      {HERO_IMAGES.map((image, index) => (
        <img
          key={image.src}
          className={active === index ? 'is-active' : ''}
          src={`${ASSET}${image.src}`}
          alt={index === 0 ? image.alt : ''}
          aria-hidden={index === 0 ? undefined : 'true'}
          style={{ objectPosition: image.position }}
        />
      ))}
      <div className="so-hero-shade" />
      <div className="so-hero-inner">
        <span className="so-hero-eyebrow">Autumn Winter 2026</span>
        <h1>A day, well cut.</h1>
        <p className="so-hero-sub">Tailoring and evening wear, cut in India for the hours that matter.</p>
        <a className="so-hero-cta" href="#/shop">Shop the collection <span>→</span></a>
      </div>
    </section>
  );
}

function Morning() {
  const blazer = PRODUCT_BY_SLUG['relaxed-tailored-blazer'];
  const scarf = PRODUCT_BY_SLUG['silk-print-scarf'];
  return (
    <section className="so-morning so-light" id="morning">
      <div className="so-morning-copy">
        <h2>Morning<br />structure</h2>
        <p>City light.<br />Considered silhouettes.<br />Purpose in every detail.</p>
      </div>
      <div className="so-morning-photo">
        <img src={`${ASSET}home/morning-v1.jpg`} alt="Woman wearing an ivory Saint Orson suit" loading="lazy" />
      </div>
      <div className="so-related">
        <a href={productHref(blazer.slug)} className="so-related-product">
          <div className="so-product-crop"><img src={`${ASSET}${blazer.shopImage}`} alt="Ivory tailored blazer" loading="lazy" style={{ objectPosition: blazer.shopPosition }} /></div>
          <div><span>{blazer.name}</span><small>Ivory<br />{formatINR(blazer.price)}</small><i aria-hidden="true">+</i></div>
        </a>
        <a href={productHref(scarf.slug)} className="so-related-product">
          <div className="so-product-crop"><img src={`${ASSET}${scarf.shopImage}`} alt="Navy silk scarf" loading="lazy" style={{ objectPosition: scarf.shopPosition }} /></div>
          <div><span>{scarf.name}</span><small>Navy / Red<br />{formatINR(scarf.price)}</small><i aria-hidden="true">+</i></div>
        </a>
      </div>
    </section>
  );
}

function Journey() {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);
  const [activeLook, setActiveLook] = useState(3);
  const [stripIn, setStripIn] = useState(false);
  const timerRef = useRef(0);
  const inViewRef = useRef(false);
  const hoverRef = useRef(false);

  // The auto-cycle runs only while the section is in view AND no look is hovered.
  // Pausing just clears the interval, so resuming continues from the current look.
  const syncCycle = useCallback(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldRun = !reduce && inViewRef.current && !hoverRef.current;
    if (shouldRun && !timerRef.current) {
      timerRef.current = window.setInterval(() => {
        setActiveLook((current) => (current + 1) % LOOKS.length);
      }, 2000);
    } else if (!shouldRun && timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = 0;
    }
  }, []);

  // Reveal the look cards the moment the strip enters view. IntersectionObserver
  // uses live geometry, so it fires reliably regardless of ScrollTrigger.refresh()
  // timing on this long, image-heavy page.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setStripIn(true); return undefined; }
    const strip = stripRef.current;
    if (!strip) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStripIn(true); io.disconnect(); }
    }, { threshold: 0.18 });
    io.observe(strip);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
      syncCycle();
    }, { threshold: 0.35 });
    observer.observe(section);
    return () => {
      observer.disconnect();
      if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = 0; }
    };
  }, [syncCycle]);

  return (
    <section className="so-journey" id="journey" ref={sectionRef}>
      <div className="so-journey-bg-stack" aria-hidden="true">
        {LOOKS.map((product, index) => (
          <img
            key={product.slug}
            src={`${ASSET}${LOOK_IMAGE_BY_SLUG[product.slug] || product.shopImage}`}
            alt=""
            loading={index === 3 ? 'eager' : 'lazy'}
            className={activeLook === index ? 'active' : ''}
          />
        ))}
      </div>
      <div className="so-journey-shade" />
      <div className="so-journey-copy">
        <h2>En route</h2>
        <p>The in-between.<br />Moments that<br />move the day forward.</p>
      </div>
      <div className={`so-look-strip ${stripIn ? 'is-in' : ''}`} ref={stripRef}>
        {LOOKS.map((product, index) => (
          <a
            key={product.slug}
            href={productHref(product.slug)}
            className={activeLook === index ? 'active' : ''}
            onMouseEnter={() => { setActiveLook(index); hoverRef.current = true; syncCycle(); }}
            onMouseLeave={() => { hoverRef.current = false; syncCycle(); }}
          >
            <span className={`so-look-thumb look-${index + 1}`}>
              <img src={`${ASSET}${LOOK_IMAGE_BY_SLUG[product.slug] || product.shopImage}`} alt="" loading="lazy" />
            </span>
            <small>Look {product.number}</small>
          </a>
        ))}
      </div>
    </section>
  );
}

function Fit() {
  return (
    <section className="so-fit" id="fit">
      <img src={`${ASSET}home/tailoring-v1.jpg`} alt="" aria-hidden="true" loading="lazy" />
      <div className="so-fit-shade" />
      <div className="so-fit-content">
        <span className="so-fit-eyebrow">The cut</span>
        <h2>Find<br />your<br />cut</h2>
        <p>A better fit changes everything.</p>
        <ul className="so-fit-points">
          <li><b>Shoulder</b><span>Set by hand</span></li>
          <li><b>Rise</b><span>Cut for you</span></li>
          <li><b>Hem</b><span>Finished clean</span></li>
        </ul>
        <a href="#discover">See the pieces <span>→</span></a>
      </div>
    </section>
  );
}

function Discover({ onAdd }) {
  const blazer = PRODUCT_BY_SLUG['relaxed-tailored-blazer'];
  const polo = PRODUCT_BY_SLUG['cashmere-polo-knit'];
  const dress = PRODUCT_BY_SLUG['draped-silk-dress'];
  const coat = PRODUCT_BY_SLUG['milano-coat'];
  const scarf = PRODUCT_BY_SLUG['silk-print-scarf'];
  const holdall = PRODUCT_BY_SLUG['weekend-holdall'];
  return (
    <section className="so-discover so-light" id="discover">
      <header>
        <div><h2>Discover</h2></div>
        <p>A working wardrobe, seen in fragments.<br />Seven pieces. One day.</p>
      </header>
      <div className="so-contact-sheet">
        <a href={productHref(blazer.slug)} className="so-discover-tile so-discover-woman" aria-label="Explore morning tailoring">
          <img src={`${ASSET}home/morning-v1.jpg`} alt="Woman in ivory Saint Orson tailoring" loading="lazy" />
          <span>Morning tailoring</span>
        </a>
        <a href={productHref(polo.slug)} className="so-discover-tile so-discover-man" aria-label="Explore the cashmere polo">
          <img src={`${ASSET}home/hero-v1.jpg`} alt="Man wearing a black cashmere polo" loading="lazy" />
          <span>Cashmere polo</span>
        </a>
        <a href={productHref(dress.slug)} className="so-discover-tile so-discover-night" aria-label="Explore evening dressing">
          <img src={`${ASSET}home/evening-v1.jpg`} alt="Woman in the evening collection" loading="lazy" />
          <span>After dark</span>
        </a>
        <a href={productHref(coat.slug)} className="so-discover-tile so-discover-atelier" aria-label="Explore tailoring details">
          <img src={`${ASSET}home/tailoring-v1.jpg`} alt="Saint Orson tailoring materials" loading="lazy" />
          <span>The cut within</span>
        </a>
        <a href={productHref(blazer.slug)} className="so-discover-tile so-discover-blazer" aria-label="Explore the ivory blazer">
          <img src={`${ASSET}${blazer.shopImage}`} alt="Ivory tailored blazer" loading="lazy" style={{ objectPosition: blazer.shopPosition }} />
          <span>Relaxed blazer <i>{formatINR(blazer.price)}</i></span>
        </a>
        <a href={productHref(scarf.slug)} className="so-discover-tile so-discover-scarf" aria-label="Explore the silk scarf">
          <img src={`${ASSET}${scarf.shopImage}`} alt="Navy and red silk scarf" loading="lazy" style={{ objectPosition: scarf.shopPosition }} />
          <span>Silk scarf <i>{formatINR(scarf.price)}</i></span>
        </a>
        <a href={productHref(dress.slug)} className="so-discover-tile so-discover-dress" aria-label="Explore the draped silk dress">
          <img src={`${ASSET}${dress.shopImage}`} alt="Black draped silk dress" loading="lazy" style={{ objectPosition: dress.shopPosition }} />
          <span>Draped silk <i>{formatINR(dress.price)}</i></span>
        </a>
        <article className="so-bag-feature">
          <img src={`${ASSET}${holdall.shopImage}`} alt="Dark chestnut weekend bag" loading="lazy" style={{ objectPosition: holdall.shopPosition }} />
          <div>
            <span>Weekend holdall</span>
            <small>Dark chestnut<br />{formatINR(holdall.price)}</small>
          </div>
          <button onClick={() => onAdd(holdall)} aria-label="Add weekend holdall">+</button>
          {/* Stretched link covers the tile (real anchor); the + button sits above it (z-index) to add instead. */}
          <a className="so-bag-link" href={productHref(holdall.slug)} aria-label="View weekend holdall" />
        </article>
      </div>
    </section>
  );
}

function Evening({ onAdd }) {
  const product = PRODUCT_BY_SLUG['draped-silk-dress'];
  const [color, setColor] = useState('black');
  const [size, setSize] = useState('S');
  const [saved, setSaved] = useState(false);
  return (
    <section className="so-evening" id="evening">
      <img src={`${ASSET}home/evening-v1.jpg`} alt="Woman in a draped black evening dress" loading="lazy" />
      <div className="so-evening-shade" />
      <div className="so-evening-copy">
        <h2>Evening<br />chapter</h2>
        <p>Nightfall calls<br />for ease and<br />elegance.</p>
      </div>
      <div className="so-evening-card">
        <div className="so-evening-card-head">
          <h3>{product.name}</h3>
          <b>{formatINR(product.price)}</b>
        </div>
        <div className="so-evening-card-row">
          <span>Colour</span>
          <div className="so-swatches">
            {['black', 'navy', 'wine'].map((item) => <button key={item} className={`${item} ${color === item ? 'active' : ''}`} aria-pressed={color === item} onClick={() => setColor(item)} aria-label={item} />)}
          </div>
        </div>
        <div className="so-evening-card-row">
          <span>Size</span>
          <div className="so-sizes">
            {['XS', 'S', 'M', 'L'].map((item) => <button key={item} className={size === item ? 'active' : ''} aria-pressed={size === item} onClick={() => setSize(item)}>{item}</button>)}
          </div>
        </div>
        <button className="so-evening-add" onClick={() => onAdd(product, { color: color.charAt(0).toUpperCase() + color.slice(1), size })}>Add to bag <b>{formatINR(product.price)}</b></button>
        <div className="so-evening-card-foot">
          <a href={productHref(product.slug)}>View full details <span>→</span></a>
          <button className="so-evening-save" onClick={() => setSaved((value) => !value)} aria-pressed={saved}>{saved ? 'Saved ✓' : 'Save'}</button>
        </div>
      </div>
    </section>
  );
}

function ShopCard({ product, index, onAdd }) {
  return (
    <article className={`so-shop-card so-shop-card-${index + 1}`}>
      <div>
        <a className="so-shop-media" href={productHref(product.slug)} aria-label={`View ${product.name}`}>
          {product.shopCrop ? (
            <span className={`so-shop-product-crop ${product.shopCrop}`}>
              <img src={`${ASSET}${product.shopImage}`} alt={product.name} loading="lazy" />
            </span>
          ) : (
            <img src={`${ASSET}${product.shopImage}`} alt={product.name} loading="lazy" style={{ objectPosition: product.shopPosition }} />
          )}
          <span className="so-shop-view">View piece <i>↗</i></span>
        </a>
        <div className="so-shop-card-info">
          <div>
            <span>{product.category}</span>
            <h2><a href={productHref(product.slug)}>{product.name}</a></h2>
          </div>
          <div className="so-shop-card-buy">
            <strong>{formatINR(product.price)}</strong>
            <button onClick={() => onAdd(product)} aria-label={`Add ${product.name} to bag`}>+</button>
          </div>
        </div>
      </div>
    </article>
  );
}

function CollectionPage({ onAdd }) {
  const root = useRef(null);
  const heroProducts = COLLECTION_PRODUCTS.slice(0, 3);
  const authorityProducts = COLLECTION_PRODUCTS.slice(0, 4);
  const railProducts = COLLECTION_PRODUCTS;

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from('.so-collection-hero img', { scale: 1.07, opacity: 0, duration: 1.05, ease: 'power3.out' }, 0)
        .from('.so-collection-hero h1, .so-collection-hero p, .so-collection-hero a', {
          y: 32,
          opacity: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: 'power3.out',
        }, 0.14)
        .from('.so-collection-product', {
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
        }, 0.28);

      gsap.from('.so-collection-proof > span', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.so-collection-proof', start: 'top 88%', once: true },
      });

      gsap.from('.so-collection-authority img, .so-collection-authority-copy > *', {
        y: 52,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.so-collection-authority', start: 'top 76%', once: true },
      });

      gsap.from('.so-collection-look, .so-collection-piece', {
        y: 58,
        opacity: 0,
        duration: 0.95,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.so-collection-looks', start: 'top 76%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main className="so-collection" ref={root}>
      <section className="so-collection-hero">
        <img src={`${ASSET}${COLLECTION_PRODUCTS[0].collectionImage}`} alt="Saint Orson collection tailoring in a private evening setting" />
        <div className="so-collection-hero-shade" />
        <div className="so-collection-hero-copy">
          <span>Collection 01</span>
          <h1>Authority, cut for the room.</h1>
          <p>Collection-only pieces for arrivals, dinners, boardrooms and the quiet hours between them.</p>
          <a href="#collection-pieces">Enter the edit <i>&rarr;</i></a>
        </div>
        <div className="so-collection-hero-products" aria-label="Featured collection pieces">
          {heroProducts.map((product) => (
            <a className="so-collection-product" href={productHref(product.slug)} key={product.slug}>
              <img src={`${ASSET}${product.shopImage}`} alt={product.name} loading="lazy" style={{ objectPosition: product.shopPosition }} />
              <b>{product.name}</b>
              <small>{formatINR(product.price)}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="so-collection-proof" aria-label="Collection proof points">
        <span><b>08</b> pieces</span>
        <span><b>Small</b> batches</span>
        <span><b>Private</b> styling</span>
        <span><b>India</b> delivery</span>
      </section>

      <section className="so-collection-authority">
        <img src={`${ASSET}${COLLECTION_PRODUCTS[1].collectionImage}`} alt="Saint Orson collection eveningwear in a quiet private room" loading="lazy" />
        <div className="so-collection-authority-copy">
          <span>Built as one edit</span>
          <h2>The pieces hold each other in place.</h2>
          <p>This is not a random catalogue. Each Collection piece is built as a separate purchase, but styled to carry the same authority across a full itinerary.</p>
          <div className="so-collection-authority-grid">
            {authorityProducts.map((product) => (
              <a href={productHref(product.slug)} key={product.slug}>
                <small>{product.number}</small>
                <b>{product.name}</b>
                <span>{product.category}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="so-collection-looks">
        <header>
          <span>The worn edit</span>
          <h2>Seen as complete looks before it is sold as pieces.</h2>
        </header>
        <a className="so-collection-look so-collection-look-large" href={productHref(COLLECTION_PRODUCTS[0].slug)}>
          <img src={`${ASSET}${COLLECTION_PRODUCTS[0].images[3]}`} alt="Saint Orson Midnight travel blazer editorial look" loading="lazy" />
          <div><span>En route</span><b>{COLLECTION_PRODUCTS[0].name}</b></div>
        </a>
        <a className="so-collection-look" href={productHref(COLLECTION_PRODUCTS[1].slug)}>
          <img src={`${ASSET}${COLLECTION_PRODUCTS[1].images[3]}`} alt="Saint Orson Obsidian silk column dress editorial look" loading="lazy" />
          <div><span>After dark</span><b>{COLLECTION_PRODUCTS[1].name}</b></div>
        </a>
      </section>

      <section className="so-collection-pieces" id="collection-pieces">
        <header>
          <span>Available now</span>
          <h2>Eight decisive entries.</h2>
        </header>
        <div>
          {railProducts.map((product, index) => (
            <article className="so-collection-piece" key={product.slug}>
              <a href={productHref(product.slug)}>
                <img src={`${ASSET}${product.shopImage}`} alt={product.name} loading="lazy" style={{ objectPosition: product.shopPosition }} />
              </a>
              <div>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3><a href={productHref(product.slug)}>{product.name}</a></h3>
                <strong>{formatINR(product.price)}</strong>
                <button type="button" onClick={() => onAdd(product)}>Add to bag</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="so-collection-service">
        <span>Private collection service</span>
        <h2>Let the edit arrive ready.</h2>
        <p>Send a brief and a Saint Orson advisor will build the first fitting selection around your calendar, body and preferred level of formality.</p>
        <a href="mailto:clients@saintorson.com?subject=Collection consultation">Request a private edit <i>&rarr;</i></a>
      </section>
    </main>
  );
}

function ShopPage({ onAdd }) {
  const root = useRef(null);
  const gridRef = useRef(null);
  const [filter, setFilter] = useState('All');
  const [displayFilter, setDisplayFilter] = useState('All');
  const [filtering, setFiltering] = useState(false);
  const filters = ['All', 'Tailoring', 'Knitwear', 'Evening', 'Accessories'];
  const group = (product) => {
    if (product.category.includes('Evening')) return 'Evening';
    if (['Accessories', 'Leather goods'].includes(product.category)) return 'Accessories';
    return product.category;
  };
  const visible = displayFilter === 'All' ? PRODUCTS : PRODUCTS.filter((product) => group(product) === displayFilter);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from('.so-shop-hero .so-number, .so-shop-hero h1, .so-shop-hero p', {
          y: 36, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out',
        })
        .from('.so-shop-filter', { y: 20, opacity: 0, duration: .8, ease: 'power3.out' }, .35);

      gsap.from('.so-shop-card', {
        y: 80,
        opacity: 0,
        duration: 1.05,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.so-shop-grid', start: 'top 82%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const changeFilter = (next) => {
    if (next === filter || filtering) return;
    setFilter(next);
    setFiltering(true);
    const grid = gridRef.current;
    gsap.to(grid, {
      opacity: 0,
      y: 18,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setDisplayFilter(next);
        window.requestAnimationFrame(() => {
          gsap.fromTo(grid, { opacity: 0, y: 18 }, {
            opacity: 1,
            y: 0,
            duration: 0.42,
            ease: 'power3.out',
            onComplete: () => setFiltering(false),
          });
        });
      },
    });
  };

  return (
    <main className="so-shop" ref={root}>
      <section className="so-shop-hero" id="shop-top">
        <div>
          <span className="so-number">Collection</span>
          <h1>The complete<br />Saint Orson edit.</h1>
        </div>
        <p>Ten pieces for a day considered from first light to after dark. Tailoring, silk, knitwear and leather, made in small numbers.</p>
      </section>

      <nav className="so-shop-filter" aria-label="Filter collection">
        <div>
          {filters.map((item) => (
            <button key={item} className={filter === item ? 'active' : ''} onClick={() => changeFilter(item)}>{item}</button>
          ))}
        </div>
        <span>{String(visible.length).padStart(2, '0')} pieces</span>
      </nav>

      <section className="so-shop-grid" ref={gridRef} aria-live="polite">
        {visible.map((product, index) => (
          <ShopCard key={product.slug} product={product} index={index} onAdd={onAdd} />
        ))}
      </section>

      <section className="so-shop-service">
        <span>Private client service</span>
        <h2>Not certain where<br />to begin?</h2>
        <p>A Saint Orson advisor can assemble a private edit around your wardrobe, travel and preferred fit.</p>
        <button onClick={() => { window.location.href = 'mailto:clients@saintorson.com?subject=' + encodeURIComponent('Private styling consultation'); }}>Arrange a consultation <i>→</i></button>
      </section>
    </main>
  );
}

function StudioPage() {
  const root = useRef(null);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.so-studio-hero h1, .so-studio-hero p, .so-studio-hero a', {
        y: 34,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
      });
      gsap.from('.so-studio-hero img', {
        scale: 1.06,
        opacity: 0,
        duration: 1.35,
        ease: 'power3.out',
      });
      gsap.from('.so-studio-step, .so-studio-fitting, .so-studio-note', {
        y: 56,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.so-studio-system', start: 'top 78%', once: true },
      });
      gsap.from('.so-studio-handwork img, .so-studio-handwork div', {
        y: 44,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.so-studio-handwork', start: 'top 76%', once: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <main className="so-studio" ref={root}>
      <section className="so-studio-hero">
        <img src={`${ASSET}studio/studio-hero-v1.jpg`} alt="Saint Orson atelier with a tailor cutting cloth at a work table" />
        <div className="so-studio-hero-shade" />
        <div>
          <span>Saint Orson studio</span>
          <h1>The room where fit becomes quiet.</h1>
          <p>Every garment begins with cloth, body and purpose. The studio is where those three are made to agree.</p>
          <a href="mailto:clients@saintorson.com?subject=Studio appointment">Request a studio appointment <i>→</i></a>
        </div>
      </section>

      <section className="so-studio-system">
        <header>
          <span>How the studio works</span>
          <h2>Measured slowly.<br />Finished by hand.</h2>
        </header>
        <article className="so-studio-step">
          <small>01</small>
          <h3>Cloth</h3>
          <p>We begin with weight, recovery and climate. A piece has to hold its line without fighting the body.</p>
        </article>
        <article className="so-studio-step">
          <small>02</small>
          <h3>Block</h3>
          <p>Shoulder, rise, sleeve pitch and length are adjusted against the way you actually stand and move.</p>
        </article>
        <article className="so-studio-step">
          <small>03</small>
          <h3>Finish</h3>
          <p>Edges, buttonholes and pressing are completed in small batches, with corrections kept visible to the studio.</p>
        </article>
        <figure className="so-studio-fitting">
          <img src={`${ASSET}studio/studio-fitting-v1.jpg`} alt="Tailor adjusting the shoulder of a navy blazer during a fitting" loading="lazy" />
        </figure>
        <aside className="so-studio-note">
          <b>Private fitting</b>
          <span>Mumbai by appointment</span>
          <p>Bring the pieces you actually wear. The studio reads proportion against your wardrobe, not against a mannequin.</p>
        </aside>
      </section>

      <section className="so-studio-handwork">
        <img src={`${ASSET}studio/studio-handwork-v1.jpg`} alt="Charcoal tailoring on a studio form beside cloth and finishing tools" loading="lazy" />
        <div>
          <span>Handwork</span>
          <h2>The last ten percent is never loud.</h2>
          <p>Pressing, canvas, thread tension and the fall of a lapel decide whether a piece feels composed after six hours of wear.</p>
          <dl>
            <div><dt>Canvas</dt><dd>Light structure, held where it earns its place.</dd></div>
            <div><dt>Buttonholes</dt><dd>Finished by hand on jackets and coats.</dd></div>
            <div><dt>Pressing</dt><dd>Shaped slowly so the garment settles, not shines.</dd></div>
          </dl>
        </div>
      </section>

      <section className="so-studio-cta">
        <span>Client studio</span>
        <h2>Bring the day you dress for.</h2>
        <a href="mailto:clients@saintorson.com?subject=Studio consultation">Begin with a fitting <i>→</i></a>
      </section>
    </main>
  );
}

function ProductPage({ product, onAdd }) {
  const root = useRef(null);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[Math.min(1, product.sizes.length - 1)]);
  const [added, setAdded] = useState(false);
  const [openDetail, setOpenDetail] = useState('Composition');
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);
  const [measureUnit, setMeasureUnit] = useState('cm');
  const [pincode, setPincode] = useState('');
  const [delivery, setDelivery] = useState('');

  const addProduct = () => {
    onAdd(product, { color, size });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  const estimateDelivery = (event) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setDelivery('Enter a valid 6-digit PIN code.');
      return;
    }
    setDelivery('Delivery in 2 to 4 working days · Complimentary');
  };

  const shareProduct = async () => {
    const data = { title: product.name, text: product.description, url: window.location.href };
    if (navigator.share) {
      await navigator.share(data).catch(() => {});
    } else {
      await navigator.clipboard?.writeText(window.location.href);
    }
  };

  useEffect(() => {
    const purchase = document.getElementById('pdp-purchase');
    if (!purchase) return undefined;
    const observer = new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting), { threshold: 0.12 });
    observer.observe(purchase);
    return () => observer.disconnect();
  }, [product.slug]);

  useEffect(() => {
    if (!sizeGuideOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const close = (event) => {
      if (event.key === 'Escape') setSizeGuideOpen(false);
    };
    window.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', close);
    };
  }, [sizeGuideOpen]);

  useLayoutEffect(() => {
    // No entrance animation on the page itself. The destination is revealed purely by the black
    // route screen slowly fading out over it (see the route transition in App + styles.css), so
    // the whole page eases into view together and nothing moves. Just land at the top.
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [product.slug]);

  const details = {
    Composition: product.material,
    Construction: product.construction,
    Care: product.care,
    Delivery: product.delivery,
  };
  const relatedProducts = (product.collectionOnly ? COLLECTION_PRODUCTS : PRODUCTS)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="so-pdp" ref={root}>
      <section className="so-pdp-opening">
        <a className="so-pdp-back" href="#/">← Back to Saint Orson</a>
        <div className="so-pdp-primary">
          <img src={`${ASSET}${product.images[activeImage]}`} alt={`${product.name} view ${activeImage + 1}`} />

          {/* (A + B) Thumbnail rail grouped in a frosted panel so it reads as a control,
              not faint boxes floating on the photo. */}
          <div className="so-pdp-thumbs" role="group" aria-label="Product views">
            {product.images.map((image, index) => (
              <button key={image} className={activeImage === index ? 'active' : ''} onClick={() => setActiveImage(index)} aria-pressed={activeImage === index} aria-label={`Show image ${index + 1}`}>
                <img src={`${ASSET}${image}`} alt="" />
              </button>
            ))}
          </div>
        </div>
        <aside className="so-pdp-buybox" id="pdp-purchase">
          <div className="so-pdp-buyhead">
            <span className="so-pdp-kicker">{product.chapter}</span>
            <div><button className={saved ? 'saved' : ''} onClick={() => setSaved(!saved)} aria-label="Save product">{saved ? '♥' : '♡'}</button><button onClick={shareProduct} aria-label="Share product">↗</button></div>
          </div>
          <h1>{product.display[0]}<br />{product.display[1]}</h1>
          <div className="so-pdp-price">{formatINR(product.price)} <small>MRP inclusive of all taxes</small></div>
          <p className="so-pdp-lede">{product.description}</p>
          <div className="so-pdp-rating"><a href="#reviews"><span>★★★★★</span> 4.8 · 38 reviews</a><b>Made in India</b></div>

          <div className="so-pdp-option">
            <div><span>Color</span><b>{color}</b></div>
            <div className="so-pdp-colors">
              {product.colors.map((item) => (
                <button
                  key={item}
                  className={color === item ? 'active' : ''}
                  style={{ backgroundColor: COLOR_HEX[item] || '#888' }}
                  onClick={() => setColor(item)}
                  aria-label={item}
                  aria-pressed={color === item}
                />
              ))}
            </div>
          </div>

          <div className="so-pdp-option">
            <div><span>Size</span><button className="so-size-guide" onClick={() => setSizeGuideOpen(true)}>Size &amp; fit guide</button></div>
            <div className="so-pdp-sizes">
              {product.sizes.map((item) => (
                <button key={item} className={size === item ? 'active' : ''} aria-pressed={size === item} onClick={() => setSize(item)}>{item}</button>
              ))}
            </div>
            <p className="so-pdp-stock"><i /> In stock · Ready to dispatch</p>
          </div>

          <button className={`so-pdp-add ${added ? 'added' : ''}`} onClick={addProduct}>
            <span>{added ? 'Added to bag' : 'Add to bag'}</span><span>{added ? '✓' : formatINR(product.price)}</span>
          </button>
          <form className="so-pdp-delivery" onSubmit={estimateDelivery}>
            <label htmlFor="delivery-pin">Delivery to your PIN code</label>
            <div><input id="delivery-pin" value={pincode} onChange={(event) => setPincode(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" placeholder="400001" /><button type="submit">Check</button></div>
            {delivery && <p className={delivery.startsWith('Enter') ? 'error' : ''}>{delivery}</p>}
          </form>
          <div className="so-pdp-trust">
            <div><b>Complimentary delivery</b><span>Across India</span></div>
            <div><b>Returns in 14 days</b><span>Collection available</span></div>
            <div><b>Secure payments</b><span>UPI · Cards · Netbanking</span></div>
          </div>
          <p className="so-pdp-note">{product.fitNote}</p>
        </aside>
      </section>

      <section className="so-pdp-detail-story">
        <div className="so-pdp-detail-copy">
          <small>The construction</small>
          <h2>{product.storyTitle.map((line) => <span key={line}>{line}<br /></span>)}</h2>
          <p>{product.storyCopy}</p>
          <span className="so-pdp-signature">{product.signature}</span>
        </div>
        <div className="so-pdp-detail-photo">
          <img src={`${ASSET}${product.images[1]}`} alt={`${product.name} construction detail`} loading="lazy" />
          <span>{product.materialLabel}</span>
        </div>
      </section>

      <section className="so-pdp-specification">
        <header><h2>The garment,<br />considered.</h2></header>
        <div className="so-pdp-accordions">
          {Object.entries(details).map(([title, text]) => (
            <article key={title} className={openDetail === title ? 'open' : ''}>
              <button onClick={() => setOpenDetail(openDetail === title ? '' : title)}><span>{title}</span><b>{openDetail === title ? '−' : '+'}</b></button>
              <div><p>{text}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="so-pdp-movement">
        <div className="so-pdp-rear-photo">
          <img src={`${ASSET}${product.images[2]}`} alt={`${product.name} rear view`} loading="lazy" />
        </div>
        <div className="so-pdp-movement-copy">
          <small>In movement</small>
          <h2>{product.movementTitle.map((line) => <span key={line}>{line}<br /></span>)}</h2>
          <p>{product.movementCopy}</p>
          <button onClick={addProduct}>Add size {size} to bag <span>{formatINR(product.price)}</span></button>
        </div>
      </section>

      <section className="so-pdp-reviews" id="reviews">
        <header>
          <div><small>Client notes</small><h2>Worn,<br />then known.</h2></div>
          <div className="so-review-score"><strong>4.8</strong><span>★★★★★<br />38 verified reviews</span></div>
        </header>
        <div className="so-review-grid">
          {[
            ['Ananya S.', 'Mumbai', 'The construction is exceptional. It holds at the waist and then moves beautifully without feeling formal.', 'Size S · True to size'],
            ['Meher K.', 'New Delhi', 'The silk has real weight, which makes the drape look far better in person than a lighter evening dress.', 'Size M · True to size'],
            ['Rhea D.', 'Bengaluru', 'Client service helped me choose between sizes and arranged collection for the return. Quietly excellent.', 'Size XS · Runs slightly long'],
          ].map(([name, city, review, fit]) => (
            <article key={name}>
              <div><span>★★★★★</span><small>Verified purchase</small></div>
              <p>“{review}”</p>
              <footer><b>{name}</b><span>{city}<br />{fit}</span></footer>
            </article>
          ))}
        </div>
      </section>

      <section className="so-pdp-related">
        <header><span>Continue the edit</span><h2>Consider with.</h2><a href="#/shop">View all pieces →</a></header>
        <div>
          {relatedProducts.map((item) => (
            <a key={item.slug} href={productHref(item.slug)}>
              <div>
                {item.shopCrop ? (
                  <span className={`so-shop-product-crop ${item.shopCrop}`}><img src={`${ASSET}${item.shopImage}`} alt={item.name} loading="lazy" /></span>
                ) : (
                  <img src={`${ASSET}${item.shopImage}`} alt={item.name} loading="lazy" style={{ objectPosition: item.shopPosition }} />
                )}
              </div>
              <span>{item.category}</span><h3>{item.name}</h3><b>{formatINR(item.price)}</b>
            </a>
          ))}
        </div>
      </section>

      <section className="so-pdp-closing">
        <div><span>Saint Orson</span><h2>Considered<br />for the hours<br />that matter.</h2></div>
        <button onClick={addProduct}><span>{added ? 'Added to bag' : `Add ${color} · ${size}`}</span><span>{added ? '✓' : `${formatINR(product.price)} →`}</span></button>
      </section>

      <div className={`so-pdp-sticky ${stickyVisible ? 'visible' : ''}`}>
        <div><span>{product.name}</span><b>{formatINR(product.price)}</b></div>
        <div><span>{color} · {size}</span><button onClick={addProduct}>{added ? 'Added ✓' : 'Add to bag'}</button></div>
      </div>

      {sizeGuideOpen && (
        <div className="so-size-modal" role="dialog" aria-modal="true" aria-label="Size and fit guide">
          <button className="so-modal-close" onClick={() => setSizeGuideOpen(false)} aria-label="Close size guide">×</button>
          <span className="so-number">Size &amp; fit</span>
          <h2>Find your Saint Orson size.</h2>
          <p>{product.fitNote}</p>
          <div className="so-unit-toggle"><button className={measureUnit === 'cm' ? 'active' : ''} onClick={() => setMeasureUnit('cm')}>CM</button><button className={measureUnit === 'in' ? 'active' : ''} onClick={() => setMeasureUnit('in')}>IN</button></div>
          {product.sizes.length === 1 ? (
            <div className="so-one-size"><b>One size</b><p>{product.fitNote}</p></div>
          ) : (
            <div className="so-size-table">
              <div><span>Size</span><span>Chest</span><span>Waist</span><span>Hip</span></div>
              {product.sizes.map((label, index) => {
                const numeric = /^\d+$/.test(label);
                const cm = numeric
                  ? [84 + index * 5, Number(label) * 2.54, 91 + index * 5]
                  : [82 + index * 5, 64 + index * 5, 90 + index * 5];
                const values = measureUnit === 'cm' ? cm.map((value) => Math.round(value)) : cm.map((value) => (value / 2.54).toFixed(1));
                return <div key={label}><b>{label}</b>{values.map((value, valueIndex) => <span key={valueIndex}>{value}</span>)}</div>;
              })}
            </div>
          )}
          <button className="so-size-help" onClick={() => { window.location.href = 'mailto:clients@saintorson.com?subject=' + encodeURIComponent('Fit advice for ' + product.name); }}>Speak to a fit advisor <span>→</span></button>
        </div>
      )}
    </main>
  );
}

function FinalCall() {
  return (
    <section className="so-final" id="collection">
      <img src={`${ASSET}home/hero-v1.jpg`} alt="" aria-hidden="true" loading="lazy" />
      <div className="so-final-shade" />
      <h2>Well dressed.<br />Well lived.</h2>
      <p>Clothing for<br />the hours that<br />matter most.</p>
      <a href="#morning">Enter the collection <span>→</span></a>
    </section>
  );
}

function Footer() {
  return (
    <footer className="so-footer">
      <a href="#top">Saint Orson</a>
      <nav><a href="#top">About</a><a href="#fit">Client services</a><a href="#top">Shipping</a><a href="#top">Returns</a><a href="#top">Terms</a><a href="#top">Privacy</a></nav>
      <div><a href="#discover">Instagram</a><a href="#discover">Journal</a></div>
    </footer>
  );
}

function CartDrawer({ open, items, count, total, onClose, onQty, onCheckout }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = previous; };
  }, [open, onClose]);
  return (
    <>
      <div className={`so-cart-scrim ${open ? 'open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`so-cart ${open ? 'open' : ''}`} aria-label="Shopping bag" aria-hidden={!open}>
        <header className="so-cart-head">
          <span>Your bag{count ? ` · ${count}` : ''}</span>
          <button onClick={onClose} aria-label="Close bag">Close ×</button>
        </header>
        {items.length === 0 ? (
          <div className="so-cart-empty">
            <p>Your bag is empty.</p>
            <a href="#/shop" onClick={onClose}>Browse the collection <span>→</span></a>
          </div>
        ) : (
          <>
            <ul className="so-cart-items">
              {items.map((line) => (
                <li key={line.key}>
                  <a className="so-cart-thumb" href={productHref(line.slug)} onClick={onClose}><img src={`${ASSET}${line.image}`} alt={line.name} loading="lazy" /></a>
                  <div className="so-cart-line">
                    <a href={productHref(line.slug)} onClick={onClose}>{line.name}</a>
                    <span>{line.color} · {line.size}</span>
                    <div className="so-cart-qty">
                      <button onClick={() => onQty(line.key, line.qty - 1)} aria-label="Decrease quantity">−</button>
                      <b>{line.qty}</b>
                      <button onClick={() => onQty(line.key, line.qty + 1)} aria-label="Increase quantity">+</button>
                      <button className="so-cart-remove" onClick={() => onQty(line.key, 0)}>Remove</button>
                    </div>
                  </div>
                  <span className="so-cart-price">{formatINR(line.price * line.qty)}</span>
                </li>
              ))}
            </ul>
            <footer className="so-cart-foot">
              <div className="so-cart-total"><span>Subtotal</span><b>{formatINR(total)}</b></div>
              <p>Complimentary delivery and returns within 14 days, across India.</p>
              <button className="so-cart-checkout" onClick={onCheckout}>Checkout <span>{formatINR(total)}</span></button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}

function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    if (!open) { setQuery(''); return undefined; }
    inputRef.current?.focus();
    const onKey = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = previous; };
  }, [open, onClose]);
  const term = query.trim().toLowerCase();
  const results = term
    ? PRODUCTS.filter((p) => `${p.name} ${p.category} ${p.chapter}`.toLowerCase().includes(term)).slice(0, 6)
    : [];
  return (
    <div className={`so-search ${open ? 'open' : ''}`} aria-hidden={!open}>
      <div className="so-search-scrim" onClick={onClose} aria-hidden="true" />
      <div className="so-search-panel">
        <div className="so-search-bar">
          <span className="so-search-label">Search</span>
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tailoring, silk, knitwear…" aria-label="Search the collection" />
          <button onClick={onClose} aria-label="Close search">Close ×</button>
        </div>
        {term ? (
          results.length ? (
            <ul className="so-search-results">
              {results.map((p) => (
                <li key={p.slug}>
                  <a href={productHref(p.slug)} onClick={onClose}>
                    <span className="so-search-thumb"><img src={`${ASSET}${p.images[0]}`} alt="" loading="lazy" /></span>
                    <span className="so-search-lines">
                      <span className="so-search-cat">{p.category}</span>
                      <span className="so-search-name">{p.name}</span>
                    </span>
                    <span className="so-search-price">{formatINR(p.price)}</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="so-search-empty">Nothing matches “{query}”. Try “tailoring”, “silk” or “coat”.</p>
          )
        ) : (
          <div className="so-search-suggest">
            <span>Popular</span>
            {['Tailoring', 'Knitwear', 'Evening', 'Coat'].map((tag) => <button key={tag} onClick={() => setQuery(tag)}>{tag}</button>)}
          </div>
        )}
      </div>
    </div>
  );
}

function Checkout({ items, total, onQty, onClear }) {
  const [placed, setPlaced] = useState(false);
  const [order, setOrder] = useState('');
  useLayoutEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }); }, []);

  const submit = (event) => {
    event.preventDefault();
    setOrder('SO' + String(Date.now()).slice(-6));
    setPlaced(true);
    onClear();
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (placed) {
    return (
      <main className="so-checkout so-checkout-message">
        <span className="so-number">Order {order}</span>
        <h1>Thank you.</h1>
        <p>Your order is confirmed. A note is on its way to your inbox, and your pieces will be prepared and dispatched with complimentary delivery across India.</p>
        <a href="#/shop">Continue the edit <span>→</span></a>
      </main>
    );
  }

  if (!items.length) {
    return (
      <main className="so-checkout so-checkout-message">
        <span className="so-number">Checkout</span>
        <h1>Your bag is empty.</h1>
        <p>Add a piece from the collection to begin.</p>
        <a href="#/shop">Browse the collection <span>→</span></a>
      </main>
    );
  }

  return (
    <main className="so-checkout">
      <header className="so-checkout-head">
        <a href="#/shop" className="so-checkout-back">← The complete edit</a>
        <h1>Checkout</h1>
      </header>
      <div className="so-checkout-grid">
        <form className="so-checkout-form" onSubmit={submit}>
          <fieldset>
            <legend>Contact</legend>
            <label>Email<input type="email" required placeholder="you@email.com" /></label>
            <label>Phone<input type="tel" required placeholder="+91" /></label>
          </fieldset>
          <fieldset>
            <legend>Delivery</legend>
            <label>Full name<input type="text" required placeholder="Name" /></label>
            <label>Address<input type="text" required placeholder="Flat, street, area" /></label>
            <div className="so-checkout-row">
              <label>City<input type="text" required placeholder="Mumbai" /></label>
              <label>PIN code<input type="text" inputMode="numeric" required placeholder="400001" /></label>
            </div>
          </fieldset>
          <p className="so-checkout-note">This is a demo checkout, so no payment is collected. You will not need any UPI, card or netbanking details.</p>
          <button type="submit">Place order · {formatINR(total)}</button>
        </form>
        <aside className="so-checkout-summary">
          <span className="so-checkout-sumlabel">Your order</span>
          <ul>
            {items.map((line) => (
              <li key={line.key}>
                <span className="so-checkout-thumb"><img src={`${ASSET}${line.image}`} alt={line.name} loading="lazy" /></span>
                <div>
                  <b>{line.name}</b>
                  <span>{line.color} · {line.size}</span>
                  <div className="so-checkout-qty">
                    <button type="button" onClick={() => onQty(line.key, line.qty - 1)} aria-label="Decrease quantity">−</button>
                    <i>{line.qty}</i>
                    <button type="button" onClick={() => onQty(line.key, line.qty + 1)} aria-label="Increase quantity">+</button>
                    <button type="button" className="so-checkout-remove" onClick={() => onQty(line.key, 0)}>Remove</button>
                  </div>
                </div>
                <strong>{formatINR(line.price * line.qty)}</strong>
              </li>
            ))}
          </ul>
          <dl className="so-checkout-totals">
            <div><dt>Subtotal</dt><dd>{formatINR(total)}</dd></div>
            <div><dt>Delivery</dt><dd>Complimentary · 2 to 4 days</dd></div>
            <div className="so-checkout-grand"><dt>Total</dt><dd>{formatINR(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </main>
  );
}

export default function App() {
  const rootRef = useRef(null);
  const routeTimer = useRef(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [route, setRoute] = useState(() => window.location.hash);
  const [transitioning, setTransitioning] = useState(false);
  const productSlug = route.match(/^#\/product\/([^?]+)/)?.[1];
  const product = productSlug ? ALL_PRODUCT_BY_SLUG[productSlug] : null;
  const productPage = Boolean(product);
  const shopPage = route === '#/shop';
  const collectionPage = route === '#/collection';
  const studioPage = route === '#/studio';
  const checkoutPage = route === '#/checkout';
  const interiorPage = productPage || shopPage || collectionPage || studioPage || checkoutPage;

  const bagCount = cart.reduce((sum, line) => sum + line.qty, 0);
  const cartTotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);
  const addToCart = (item, opts = {}) => {
    if (!item) return;
    const color = opts.color || item.colors?.[0] || 'One colour';
    const size = opts.size || item.sizes?.[Math.min(1, (item.sizes?.length || 1) - 1)] || 'One size';
    const key = `${item.slug}|${color}|${size}`;
    setCart((prev) => {
      const existing = prev.find((line) => line.key === key);
      if (existing) return prev.map((line) => (line.key === key ? { ...line, qty: line.qty + 1 } : line));
      return [...prev, { key, slug: item.slug, name: item.name, price: item.price, image: item.shopImage, color, size, qty: 1 }];
    });
    setCartOpen(true);
  };
  const setCartQty = (key, qty) => setCart((prev) => (qty <= 0 ? prev.filter((line) => line.key !== key) : prev.map((line) => (line.key === key ? { ...line, qty } : line))));
  const clearCart = () => setCart([]);

  useEffect(() => {
    // Under reduced motion the CSS overlay transition is instant, so don't sit on the cover
    // delay (it would just be a blank stall) — swap immediately. Otherwise keep the editorial timing.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // The black screen fades in over .6s (coverDelay matches it), holds ~1.1s so the destination
    // name is readable, then fades out over .9s to reveal the page (durations live in styles.css).
    const coverDelay = reduce ? 0 : 600;
    const holdDelay = reduce ? 0 : 1080;
    const onHash = () => {
      const next = window.location.hash;
      if (next === route) return;
      window.clearTimeout(routeTimer.current);
      setTransitioning(true);
      routeTimer.current = window.setTimeout(() => {
        setRoute(next);
        window.scrollTo({ top: 0, behavior: 'auto' });
        if (next === '#/' || next.startsWith('#/?section=')) {
          const section = new URLSearchParams(next.split('?')[1] || '').get('section');
          window.setTimeout(() => document.getElementById(section || 'top')?.scrollIntoView(), 40);
        }
        window.setTimeout(() => setTransitioning(false), holdDelay);
      }, coverDelay);
    };
    window.addEventListener('hashchange', onHash);
    return () => {
      window.clearTimeout(routeTimer.current);
      window.removeEventListener('hashchange', onHash);
    };
  }, [route]);

  useLayoutEffect(() => {
    if (interiorPage) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let heroPlayed = false;
    let heroTimeline;
    const ctx = gsap.context(() => {
      const revealSections = gsap.utils.toArray('.so-morning, .so-journey, .so-fit, .so-discover, .so-evening, .so-final');

      revealSections.forEach((section) => {
        const content = Array.from(section.querySelectorAll('h2, .so-number, p, a')).filter((element) => (
          !element.closest('.so-look-strip')
          && !element.closest('.so-contact-sheet')
          && !element.closest('.so-bag-feature')
          && !element.closest('.so-evening-card')
          && !element.closest('.so-related')
        ));
        gsap.from(content, {
          y: 34,
          opacity: 0,
          duration: 1,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: section, start: 'top 78%', once: true },
        });
      });

      heroTimeline = gsap.timeline({ paused: true })
        .from('.so-hero > img', { scale: 1.06, duration: 1.8, ease: 'power2.out' }, 0)
        .from('.so-hero-eyebrow', { y: 16, opacity: 0, duration: 1, ease: 'power3.out' }, 0.25)
        .from('.so-hero h1', { y: 26, opacity: 0, duration: 1.15, ease: 'power3.out' }, 0.4)
        .from('.so-hero-sub, .so-hero-cta', { y: 16, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power2.out' }, 0.7);

      gsap.to('.so-hero > img', {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { trigger: '.so-hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
      });

      gsap.from('.so-morning-photo', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.35,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.so-morning', start: 'top 72%', once: true },
      });
      gsap.from('.so-related-product', {
        x: 42,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.so-related', start: 'top 80%', once: true },
      });

      gsap.to('.so-journey-bg-stack', {
        xPercent: -3,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: { trigger: '.so-journey', start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      gsap.from('.so-discover-tile', {
        clipPath: 'inset(100% 0 0 0)',
        duration: 0.9,
        stagger: 0.07,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.so-contact-sheet', start: 'top 78%', once: true },
      });
      gsap.from('.so-bag-feature', {
        x: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.so-discover', start: 'top 72%', once: true },
      });

      gsap.from('.so-evening > img', {
        clipPath: 'inset(0 0 0 100%)',
        duration: 1.25,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.so-evening', start: 'top 72%', once: true },
      });
      gsap.from('.so-evening-card', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.so-evening', start: 'top 65%', once: true },
      });
    }, rootRef);

    const revealHero = () => {
      if (heroPlayed) return;
      heroPlayed = true;
      heroTimeline?.play();
      ScrollTrigger.refresh();
    };
    document.addEventListener('onepixel:loader-complete', revealHero, { once: true });
    const fallback = window.setTimeout(revealHero, 2600);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    // Lazy images settle after their reveal trigger is measured; refresh on each load so the
    // once:true triggers don't fire at stale positions on this long, image-heavy page.
    let refreshRaf = 0;
    const refreshSoon = () => { cancelAnimationFrame(refreshRaf); refreshRaf = requestAnimationFrame(() => ScrollTrigger.refresh()); };
    const imgs = Array.from(rootRef.current?.querySelectorAll('img') || []);
    imgs.forEach((img) => img.addEventListener('load', refreshSoon));

    return () => {
      window.clearTimeout(fallback);
      cancelAnimationFrame(refreshRaf);
      imgs.forEach((img) => img.removeEventListener('load', refreshSoon));
      document.removeEventListener('onepixel:loader-complete', revealHero);
      ctx.revert();
    };
  }, [interiorPage]);

  const transitionLabel = (() => {
    const nextSlug = window.location.hash.match(/^#\/product\/([^?]+)/)?.[1];
    if (window.location.hash === '#/shop') return 'The complete edit';
    if (window.location.hash === '#/collection') return 'Collection 01';
    if (window.location.hash === '#/studio') return 'The studio';
    if (window.location.hash === '#/checkout') return 'Checkout';
    return ALL_PRODUCT_BY_SLUG[nextSlug]?.name || 'Saint Orson';
  })();

  return (
    <div ref={rootRef}>
      <Loader duration={2200} mark="Saint Orson · Issue 01" />
      <OpxBar />
      <div className={`so-route-transition ${transitioning ? 'active' : ''}`} aria-hidden="true">
        <span>Saint Orson</span><strong>{transitionLabel}</strong><i />
      </div>
      <Header bag={bagCount} interiorPage={interiorPage} onBag={() => setCartOpen(true)} onSearch={() => setSearchOpen(true)} />
      {checkoutPage ? (
        <Checkout items={cart} total={cartTotal} onQty={setCartQty} onClear={clearCart} />
      ) : productPage ? (
        <ProductPage key={product.slug} product={product} onAdd={addToCart} />
      ) : collectionPage ? (
        <CollectionPage onAdd={addToCart} />
      ) : studioPage ? (
        <StudioPage />
      ) : shopPage ? (
        <ShopPage onAdd={addToCart} />
      ) : (
        <main>
          <Hero />
          <LookTicker />
          <Morning />
          <Journey />
          <Fit />
          <Discover onAdd={addToCart} />
          <Evening onAdd={addToCart} />
          <FinalCall />
        </main>
      )}
      <Footer />
      <CartDrawer
        open={cartOpen}
        items={cart}
        count={bagCount}
        total={cartTotal}
        onClose={() => setCartOpen(false)}
        onQty={setCartQty}
        onCheckout={() => { setCartOpen(false); window.location.hash = '/checkout'; }}
      />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
