import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BASE = '/case-studies/atlas-aangan/';
const homeAsset = (name) => `${BASE}home/${name}`;
const pageAsset = (folder, name) => `${BASE}${folder}/${name}`;

const stats = [
  ['15+', 'Years of trust'],
  ['50,000+', 'Happy travellers'],
  ['120+', 'Countries'],
  ['4.8/5', 'Traveller rating'],
];

const homeDestinations = [
  ['Europe', 'Timeless cities & romantic escapes', homeAsset('destination-europe.webp')],
  ['Japan', 'Culture. Calm. Connection.', homeAsset('destination-japan.webp')],
  ['Bali', 'Island soul, beach bliss', homeAsset('destination-bali.webp')],
  ['Dubai', 'Iconic stays, endless energy', homeAsset('destination-dubai.webp')],
  ['New Zealand', 'Pure nature, open roads', homeAsset('destination-new-zealand.webp')],
  ['South Africa', 'Wild safaris, vast landscapes', homeAsset('destination-south-africa.webp')],
];

const featuredDestinations = [
  ['Europe', 'Timeless cities & iconic landscapes', pageAsset('destinations', 'featured-europe.webp')],
  ['Japan', 'Culture. Calm. Connection.', pageAsset('destinations', 'featured-japan.webp')],
  ['Bali', 'Island soul, beach bliss', pageAsset('destinations', 'featured-bali.webp')],
  ['Dubai', 'Iconic stays, endless energy', pageAsset('destinations', 'featured-dubai.webp')],
  ['New Zealand', 'Pure nature, open roads', pageAsset('destinations', 'featured-new-zealand.webp')],
  ['South Africa', 'Wild safaris, vast landscapes', pageAsset('destinations', 'featured-south-africa.webp')],
];

const packages = [
  ['Culture', 'Japan Unplugged', '8 Nights / 9 Days', '₹2,45,900', 'Visa on arrival for Indians', pageAsset('destinations', 'package-japan.webp'), `${BASE}japan-unplugged/`],
  ['Nature', 'Swiss Horizons', '7 Nights / 8 Days', '₹2,35,000', 'Schengen visa required', pageAsset('destinations', 'package-swiss.webp'), `${BASE}plan/`],
  ['Honeymoon', 'Bali Bliss', '5 Nights / 6 Days', '₹1,35,000', 'Visa on arrival for Indians', pageAsset('destinations', 'package-bali.webp'), `${BASE}plan/`],
  ['Family', 'South Africa Safari', '9 Nights / 10 Days', '₹2,85,000', 'eVisa required', pageAsset('destinations', 'package-south-africa.webp'), `${BASE}plan/`],
];

const process = [
  ['Discover', 'Share your ideas and inspiration'],
  ['Design', 'We craft a custom itinerary for you'],
  ['Book', 'Seamless bookings, handled end-to-end'],
  ['Support', '24/7 support, while you travel and beyond'],
];

const trust = [
  ['Visa guidance', 'Expert assistance for a smooth process'],
  ['Indian payment support', 'Pay in INR via UPI, cards or net banking'],
  ['24/7 trip care', 'Real people, always by your side'],
  ['Curated hotels', 'Handpicked stays for every style'],
];

const itinerary = [
  ['Day 1', 'Arrival in Tokyo', 'Meet & greet and private transfer to your hotel. Evening at leisure.', pageAsset('trip', 'itinerary-tokyo.webp')],
  ['Day 2', 'Tokyo discovered', 'Asakusa, Meiji Shrine, Shibuya and a local guided experience.', pageAsset('trip', 'itinerary-temple.webp')],
  ['Day 3', 'Hakone escape', 'Scenic drive to Hakone. Onsen experience with views of Mt. Fuji.', pageAsset('trip', 'itinerary-hakone.webp')],
  ['Day 4 - 5', 'Kyoto chronicles', 'Temples, tea rituals and timeless lanes. One full day at leisure.', pageAsset('trip', 'itinerary-kyoto.webp')],
  ['Day 6', 'Nara day trip', 'Deer park, Todaiji Temple and serene gardens.', pageAsset('trip', 'itinerary-nara.webp')],
  ['Day 7 - 9', 'Alpine Japan', 'Shinkansen to Takayama. Villages, mountains and quiet beauty.', pageAsset('trip', 'itinerary-alpine.webp')],
  ['Day 10', 'Departure', 'Private transfer to Nagoya airport for your onward journey.', pageAsset('trip', 'itinerary-departure.webp')],
];

const stays = [
  ['Tokyo', 'Boutique Hotel', pageAsset('trip', 'stay-tokyo.webp')],
  ['Hakone', 'Onsen Ryokan', pageAsset('trip', 'stay-hakone.webp')],
  ['Kyoto', 'Machiya Stay', pageAsset('trip', 'stay-kyoto.webp')],
  ['Takayama', 'Luxury Ryokan', pageAsset('trip', 'stay-takayama.webp')],
];

function Arrow() {
  return <span aria-hidden="true">-&gt;</span>;
}

function LogoMark() {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true" className="aa-logo-mark">
      <rect x="8" y="4" width="28" height="36" rx="14" />
      <path d="M14 38V18c0-7 4-11 8-11s8 4 8 11v20" />
      <path d="M14 23h16" />
      <path d="M22 7v31" />
      <path d="m16 29 6-6 6 6" />
    </svg>
  );
}

function Icon({ type }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="aa-icon">
      {type === 'pin' && <><path d="M12 21s7-5.2 7-12a7 7 0 0 0-14 0c0 6.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.6" /></>}
      {type === 'calendar' && <><path d="M5 5h14v15H5z" /><path d="M8 3v4M16 3v4M5 10h14" /></>}
      {type === 'user' && <><circle cx="12" cy="8" r="3.2" /><path d="M5.5 20c1-4 4-6 6.5-6s5.5 2 6.5 6" /></>}
      {type === 'bag' && <><path d="M7 8h10l1 12H6L7 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></>}
      {type === 'compass' && <><circle cx="12" cy="12" r="8" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>}
      {type === 'map' && <><path d="m4 6 5-2 6 2 5-2v14l-5 2-6-2-5 2V6Z" /><path d="M9 4v14M15 6v14" /></>}
      {type === 'shield' && <><path d="M12 3 5 6v5c0 4.8 3 8 7 10 4-2 7-5.2 7-10V6l-7-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>}
      {type === 'phone' && <><path d="M7 4h10v16H7z" /><path d="M10 17h4" /></>}
      {type === 'globe' && <><circle cx="12" cy="12" r="8" /><path d="M4 12h16M12 4c2 2.2 3 4.8 3 8s-1 5.8-3 8M12 4c-2 2.2-3 4.8-3 8s1 5.8 3 8" /></>}
      {type === 'card' && <><rect x="4" y="6" width="16" height="12" rx="1.5" /><path d="M4 10h16M8 15h3" /></>}
      {type === 'headset' && <><path d="M5 13a7 7 0 0 1 14 0" /><path d="M5 13v4h3v-5H5ZM19 13v4h-3v-5h3ZM16 19c-1 1-2.2 1.5-4 1.5" /></>}
      {type === 'hotel' && <><path d="M5 20V7l7-3 7 3v13" /><path d="M9 20v-5h6v5M9 9h.01M12 9h.01M15 9h.01M9 12h.01M12 12h.01M15 12h.01" /></>}
      {type === 'rupee' && <><path d="M8 5h9M8 9h9M8 5c4.5 0 7 1.5 7 4.5S12.5 14 8 14l7 6" /></>}
      {type === 'mail' && <><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></>}
      {type === 'clock' && <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></>}
    </svg>
  );
}

function Brand() {
  return (
    <a className="aa-brand" href={BASE} aria-label="Atlas & Aangan home">
      <LogoMark />
      <span><strong>Atlas & Aangan</strong><small>Journeys designed for you</small></span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="aa-header">
      <Brand />
      <button className="aa-menu" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>
        <i /><i /><span className="sr-only">Toggle navigation</span>
      </button>
      <nav className={open ? 'aa-nav is-open' : 'aa-nav'} onClick={() => setOpen(false)}>
        <a href={`${BASE}destinations/`}>Destinations</a>
        <a href={`${BASE}destinations/#packages`}>Packages</a>
        <a href={`${BASE}destinations/#honeymoons`}>Honeymoons</a>
        <a href={`${BASE}plan/#visa`}>Visa Help</a>
        <a href={`${BASE}#about`}>About</a>
        <a href={`${BASE}plan/`}>Contact</a>
      </nav>
      <a className="aa-header-cta" href={`${BASE}plan/`}>Talk to an expert <Arrow /></a>
    </header>
  );
}

function TripPlanner() {
  const items = [
    ['pin', 'Where to?', 'Any destination'],
    ['calendar', 'When?', 'Anytime'],
    ['user', "Who's travelling?", '2 Adults'],
    ['bag', 'Trip type', 'Any type'],
  ];

  return (
    <form className="aa-planner" id="planner">
      <h2>Plan your journey</h2>
      <div className="aa-planner-grid">
        {items.map(([icon, label, value]) => (
          <button type="button" key={label}>
            <Icon type={icon} />
            <span><small>{label}</small><strong>{value}</strong></span>
            <Arrow />
          </button>
        ))}
      </div>
      <a className="aa-planner-submit" href={`${BASE}destinations/`}>Explore trips <Arrow /></a>
    </form>
  );
}

function Hero() {
  return (
    <section className="aa-hero" id="top">
      <div className="aa-hero-copy reveal">
        <p className="aa-kicker">Curated international journeys</p>
        <h1>Global trips,<br />planned<br />properly<span>.</span></h1>
        <p>Thoughtful planning. Trusted support. Memories that last a lifetime.</p>
        <div className="aa-hero-actions">
          <a className="aa-button" href={`${BASE}plan/`}>Talk to an expert <Arrow /></a>
          <a className="aa-watch" href="#process"><span><Icon type="compass" /></span>How we plan</a>
        </div>
      </div>
      <div className="aa-hero-media reveal" aria-label="Curated international destination collage">
        <img className="aa-hero-main" src={homeAsset('hero-alpine-village.webp')} alt="Alpine village and mountain for European holidays" />
        <img className="aa-hero-side-top" src={homeAsset('hero-japan-fuji.webp')} alt="Mount Fuji and Japanese pagoda" />
        <img className="aa-hero-side-bottom" src={homeAsset('hero-coastline.webp')} alt="Coastal international destination at sunset" />
      </div>
      <TripPlanner />
    </section>
  );
}

function Stats() {
  return (
    <section className="aa-stats" aria-label="Atlas and Aangan travel proof">
      {stats.map(([value, label]) => (
        <article key={label} className="reveal">
          <span>+</span>
          <strong>{value}</strong>
          <small>{label}</small>
        </article>
      ))}
    </section>
  );
}

function DestinationCards({ items = homeDestinations, featured = false }) {
  return (
    <div className={featured ? 'aa-feature-grid' : 'aa-destination-grid'}>
      {items.map(([name, copy, image]) => (
        <article className={featured ? 'aa-feature-card reveal' : 'aa-destination-card reveal'} key={name}>
          <img src={image} alt={`${name} travel package`} loading="lazy" />
          <div>
            <h3>{name}</h3>
            <p>{copy}</p>
            <a href={name === 'Japan' ? `${BASE}japan-unplugged/` : `${BASE}plan/`}>Explore <Arrow /></a>
          </div>
        </article>
      ))}
    </div>
  );
}

function Destinations() {
  return (
    <section className="aa-section aa-destinations" id="destinations">
      <div className="aa-section-head reveal">
        <p className="aa-kicker">Discover the world</p>
        <h2>Handpicked destinations</h2>
        <a href={`${BASE}destinations/`}>View all destinations <Arrow /></a>
      </div>
      <DestinationCards />
    </section>
  );
}

function Process() {
  const icons = ['compass', 'map', 'bag', 'headset'];
  return (
    <section className="aa-section aa-process" id="process">
      <p className="aa-kicker reveal">How we plan your journey</p>
      <div className="aa-process-line" aria-hidden="true" />
      <div className="aa-process-grid">
        {process.map(([title, copy], index) => (
          <article className="reveal" key={title}>
            <span><Icon type={icons[index]} /></span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TrustStrip() {
  const icons = ['globe', 'card', 'headset', 'hotel'];
  return (
    <section className="aa-trust" id="visa">
      {trust.map(([title, copy], index) => (
        <article className="reveal" key={title}>
          <Icon type={icons[index]} />
          <div>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

function PlannerNote() {
  return (
    <section className="aa-planner-note" id="about">
      <article className="reveal">
        <p className="aa-kicker">From our planner</p>
        <blockquote>We believe in journeys that feel just right. Thoughtfully planned, seamlessly executed, and always personal.</blockquote>
        <footer>
          <span className="aa-avatar" aria-hidden="true">AM</span>
          <div><strong>Ananya Mehra</strong><small>Travel Planner</small></div>
        </footer>
      </article>
      <img src={homeAsset('planner-terrace.webp')} alt="Premium terrace stay overlooking the sea" loading="lazy" />
    </section>
  );
}

function Footer() {
  return (
    <footer className="aa-footer" id="contact">
      <div className="aa-footer-brand">
        <Brand />
        <p>Curated international holidays for Indian travellers.</p>
        <div className="aa-socials" aria-label="Social links"><a>ig</a><a>f</a><a>yt</a><a>in</a></div>
      </div>
      <div>
        <h3>Quick links</h3>
        <a href={`${BASE}destinations/`}>Destinations</a>
        <a href={`${BASE}destinations/#packages`}>Packages</a>
        <a href={`${BASE}destinations/#honeymoons`}>Honeymoons</a>
        <a href={`${BASE}plan/#visa`}>Visa Help</a>
        <a href={`${BASE}#about`}>About Us</a>
        <a href={`${BASE}plan/`}>Contact Us</a>
      </div>
      <div>
        <h3>Our office</h3>
        <p>Atlas & Aangan Travel Pvt. Ltd.<br />101, The Globe, 1st Floor,<br />Dr. D.N. Road, Fort,<br />Mumbai 400001, India</p>
        <a href="tel:+912266201234">+91 22 6620 1234</a>
        <a href="mailto:hello@atlasandaangan.com">hello@atlasandaangan.com</a>
      </div>
      <div>
        <h3>Hours</h3>
        <p>Mon - Sat: 10:00 AM - 7:00 PM IST<br />(By appointment)</p>
        <h3>Plan your journey</h3>
        <p>Share your travel plans and our experts will craft the perfect trip.</p>
        <a className="aa-footer-cta" href={`${BASE}plan/`}>Talk to an expert <Arrow /></a>
      </div>
      <div className="aa-footer-bottom">
        <small>© 2026 Atlas & Aangan Travel Pvt. Ltd. All rights reserved.</small>
        <nav><a>Privacy Policy</a><a>Terms & Conditions</a></nav>
      </div>
    </footer>
  );
}

function DestinationsPage() {
  return (
    <>
      <section className="aa-page-hero aa-map-hero">
        <div className="reveal">
          <p className="aa-breadcrumb">Home / Destinations</p>
          <h1>Explore curated<br />international trips<span>.</span></h1>
          <i />
          <p>Handpicked places. Thoughtfully designed journeys. Made for how you want to travel.</p>
        </div>
        <div className="aa-world-map" aria-hidden="true">
          <span /><span /><span /><span /><span /><span />
        </div>
      </section>
      <section className="aa-filter-bar reveal">
        {[
          ['bag', 'Destination type', 'All Types'],
          ['calendar', 'Month', 'Anytime'],
          ['rupee', 'Budget (per person)', 'Any Budget'],
          ['user', 'Traveller type', 'Any Type'],
        ].map(([icon, label, value]) => (
          <button type="button" key={label}><Icon type={icon} /><span><small>{label}</small>{value}</span><b>⌄</b></button>
        ))}
        <button className="aa-apply" type="button">Apply filters</button>
      </section>
      <section className="aa-section">
        <div className="aa-section-head reveal">
          <h2>Featured destinations</h2>
          <a href="#packages">View all destinations <Arrow /></a>
        </div>
        <DestinationCards items={featuredDestinations} featured />
      </section>
      <PackagesSection />
      <TrustStrip />
      <section className="aa-cta-band reveal">
        <div>
          <h2>Not sure where to go?</h2>
          <p>Our travel experts will help you plan the perfect trip.</p>
        </div>
        <a href={`${BASE}plan/`}>Talk to an expert <Arrow /></a>
      </section>
    </>
  );
}

function PackagesSection() {
  return (
    <section className="aa-section aa-packages" id="packages">
      <div className="aa-section-head reveal">
        <h2>Curated trip packages</h2>
        <a href={`${BASE}plan/`}>View all packages <Arrow /></a>
      </div>
      <div className="aa-package-grid">
        {packages.map(([tag, title, days, price, note, image, href]) => (
          <article className="aa-package-card reveal" key={title}>
            <div className="aa-package-image">
              <img src={image} alt={`${title} package`} loading="lazy" />
              <span>{tag}</span>
              <button type="button" aria-label={`Save ${title}`}>♡</button>
            </div>
            <div>
              <h3>{title}</h3>
              <small>{days}</small>
              <strong>{price}</strong>
              <p>{note}</p>
              <a href={href}>View details <Arrow /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TripDetailPage() {
  return (
    <>
      <section className="aa-trip-hero">
        <img src={pageAsset('trip', 'trip-hero-japan.webp')} alt="Mount Fuji and Chureito Pagoda in Japan" />
        <div className="reveal">
          <p className="aa-breadcrumb">Home / Destinations / Japan / Japan Unplugged</p>
          <p className="aa-kicker">Curated journey</p>
          <h1>Japan<br />Unplugged</h1>
          <p>Slow down. Tune in. Experience Japan, the way it’s meant to be.</p>
          <ul>
            <li><Icon type="clock" />9 Nights / 10 Days</li>
            <li><Icon type="calendar" />Dec - Mar</li>
            <li><Icon type="user" />2+ Travellers</li>
          </ul>
        </div>
      </section>
      <section className="aa-trip-layout">
        <main>
          <section className="aa-trip-overview reveal">
            <p className="aa-kicker">Overview</p>
            <p>A thoughtfully paced journey across Japan’s timeless cities, serene landscapes and rich traditions. Curated for Indian travellers who seek depth over rush.</p>
            <div className="aa-overview-grid">
              {[
                ['Curated stays', 'Ryokans, boutique hotels and character stays'],
                ['Expertly curated', 'Experiences designed around local insights'],
                ['Private travel', 'Seamless transfers and private experiences'],
                ['Round-the-clock care', 'On-ground support throughout your trip'],
              ].map(([title, copy]) => <article key={title}><Icon type="shield" /><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
          </section>
          <section className="aa-itinerary">
            <p className="aa-kicker reveal">Itinerary</p>
            {itinerary.map(([day, title, copy, image]) => (
              <article className="aa-itinerary-row reveal" key={title}>
                <span />
                <div><small>{day}</small><h3>{title}</h3><p>{copy}</p></div>
                <img src={image} alt={title} loading="lazy" />
              </article>
            ))}
          </section>
        </main>
        <aside className="aa-trip-aside reveal">
          <p>Starting from</p>
          <strong>₹ 3,65,000</strong>
          <small>Per person (excl. flights)</small>
          <a className="aa-button" href={`${BASE}plan/`}>Plan this trip <Arrow /></a>
          <a className="aa-outline-button" href={`${BASE}plan/`}>Talk to an expert</a>
          <dl>
            <dt>Best season</dt><dd>Dec - Mar</dd>
            <dt>Visa requirement</dt><dd>Required for Indian citizens</dd>
            <dt>Ideal for</dt><dd>Couples, Friends, Families</dd>
            <dt>Trip style</dt><dd>Cultural · Scenic · Immersive</dd>
          </dl>
        </aside>
      </section>
      <section className="aa-section aa-stays">
        <div className="aa-section-head reveal"><h2>Stays</h2><a href={`${BASE}plan/`}>View all stays <Arrow /></a></div>
        <div className="aa-stay-grid">
          {stays.map(([city, type, image]) => <article className="reveal" key={city}><img src={image} alt={`${city} ${type}`} loading="lazy" /><div><strong>{city}</strong><small>{type}</small></div></article>)}
        </div>
      </section>
      <FaqSection />
    </>
  );
}

function FaqSection() {
  const questions = ['Is visa required for this trip?', 'Can this itinerary be customised?', 'What is the best time to visit Japan?', 'What kind of food can we expect?'];
  return <section className="aa-faq">{questions.map((q) => <button type="button" key={q}>{q}<span>+</span></button>)}</section>;
}

function PlanPage() {
  return (
    <>
      <section className="aa-plan-page">
        <main className="reveal">
          <p className="aa-kicker">Plan your trip</p>
          <h1>Tell us where<br />you want to go<span>.</span></h1>
          <div className="aa-plan-points">
            <span><Icon type="user" />100% Personal<br /><small>No bots, no templates.</small></span>
            <span><Icon type="map" />Designed Around You<br /><small>Trips curated to your style.</small></span>
            <span><Icon type="shield" />Secure & Trusted<br /><small>Your details are safe.</small></span>
          </div>
          <div className="aa-form-progress"><b>01</b><i /><b>02</b><i /><b>03</b><i /><b>04</b></div>
          <TravelForm />
        </main>
        <PlannerPanel />
      </section>
      <section className="aa-expect">
        {process.map(([title, copy], index) => <article className="reveal" key={title}><Icon type={['headset', 'map', 'shield', 'bag'][index]} /><h3>We {title.toLowerCase()}</h3><p>{copy}</p></article>)}
        <div className="aa-expect-faq reveal">
          {['How much does it cost to plan with you?', 'Can you help with visas and documentation?', 'Can I customize the itinerary later?', 'Will I have support during my trip?'].map((q) => <button type="button" key={q}>{q}<span>+</span></button>)}
        </div>
      </section>
    </>
  );
}

function TravelForm() {
  const fields = [
    ['pin', 'Where do you want to go?', 'e.g. Switzerland, Japan, New Zealand'],
    ['calendar', 'When do you plan to travel?', 'Select month'],
    ['user', "Who’s travelling?", 'e.g. 2 Adults, 2 Kids'],
    ['rupee', 'What’s your budget? (INR)', 'e.g. 3,00,000 - 6,00,000'],
    ['bag', 'What’s the occasion?', 'e.g. Anniversary, Family Vacation'],
    ['globe', 'Do you need visa assistance?', 'Yes, please'],
    ['user', 'Your name', 'Enter your full name'],
    ['mail', 'Email', 'name@email.com'],
    ['phone', 'Phone / WhatsApp', '+91 98765 43210'],
  ];

  return (
    <form className="aa-travel-form">
      {fields.map(([icon, label, placeholder]) => (
        <label key={label} className={label === 'Your name' ? 'is-wide' : ''}>
          <span>{label}</span>
          <div><Icon type={icon} /><input placeholder={placeholder} /></div>
        </label>
      ))}
      <label className="is-wide"><span>Anything we should know?</span><textarea placeholder="Tell us about your preferences, must-haves, or any special requests." /></label>
      <label className="aa-consent"><input type="checkbox" />I agree to the Privacy Policy and consent to be contacted.</label>
      <button className="aa-planner-submit" type="button">Save & continue <Arrow /></button>
      <p><Icon type="shield" />Your details are secure and never shared.</p>
    </form>
  );
}

function PlannerPanel() {
  return (
    <aside className="aa-planner-panel reveal">
      <p className="aa-kicker">Your journey, personalized</p>
      <div className="aa-planner-person">
        <img src={pageAsset('plan', 'planner-ananya.webp')} alt="Ananya Mehra travel planner" />
        <div><strong>Ananya Mehra</strong><small>Senior Travel Designer<br />15+ years designing journeys</small></div>
      </div>
      <ul>
        <li><Icon type="phone" />+91 22 6620 1234</li>
        <li><Icon type="mail" />hello@atlasandaangan.com</li>
        <li><Icon type="clock" />Within 2 working hours</li>
      </ul>
      <h3>Trip care, always</h3>
      <p>24/7 on-trip support, curated stays, flexible changes and trusted local partners.</p>
      <h3>Endless possibilities</h3>
      <div className="aa-plan-collage">
        {['possibility-alps.webp', 'possibility-japan.webp', 'possibility-coast.webp', 'possibility-cappadocia.webp'].map((name) => <img key={name} src={pageAsset('plan', name)} alt="" loading="lazy" />)}
      </div>
    </aside>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Destinations />
      <Process />
      <TrustStrip />
      <PlannerNote />
    </>
  );
}

function pageFromPath() {
  const path = window.location.pathname;
  if (path.includes('/destinations')) return 'destinations';
  if (path.includes('/japan-unplugged')) return 'trip';
  if (path.includes('/plan')) return 'plan';
  return 'home';
}

export default function App() {
  const root = useRef(null);
  const page = pageFromPath();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.aa-header > *', { opacity: 0, y: -12, duration: 0.75, stagger: 0.06, ease: 'power3.out' });
      gsap.from('.aa-planner, .aa-trip-aside, .aa-planner-panel', { opacity: 0, y: 28, duration: 0.85, delay: 0.2, ease: 'power3.out' });
      gsap.utils.toArray('.reveal').forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 26,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 86%', once: true },
        });
      });
      gsap.to('.aa-hero-media img, .aa-trip-hero img', {
        yPercent: -4,
        ease: 'none',
        scrollTrigger: { trigger: page === 'trip' ? '.aa-trip-hero' : '.aa-hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
      });
    }, root);

    return () => ctx.revert();
  }, [page]);

  return (
    <div ref={root}>
      <Header />
      <main>
        {page === 'home' && <HomePage />}
        {page === 'destinations' && <DestinationsPage />}
        {page === 'trip' && <TripDetailPage />}
        {page === 'plan' && <PlanPage />}
      </main>
      <Footer />
    </div>
  );
}
