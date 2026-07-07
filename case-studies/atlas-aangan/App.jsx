import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Loader } from '../../src/Loader.jsx';

gsap.registerPlugin(ScrollTrigger);

const BASE = '/case-studies/atlas-aangan/';
const homeAsset = (name) => `${BASE}home/${name}`;
const pageAsset = (folder, name) => `${BASE}${folder}/${name}`;
const brandAsset = (name) => `${BASE}${name}`;

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
  ['South Africa', 'Wild safaris, vast landscapes', homeAsset('destination-south-africa-v2.webp')],
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
  return <img className="aa-logo-mark" src={brandAsset('atlas-aangan-logo-3d.webp')} alt="" aria-hidden="true" />;
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
        <a href={BASE}>Home</a>
        <a href={`${BASE}destinations/`}>Destinations</a>
        <a href={`${BASE}plan/#visa`}>Visa Help</a>
      </nav>
      <a className="aa-header-cta" href={`${BASE}plan/`}>Talk to an expert <Arrow /></a>
    </header>
  );
}

function TripPlanner({ inline = false }) {
  const [planner, setPlanner] = useState({
    destination: 'Japan',
    month: 'Anytime',
    travellers: '2 Adults',
    type: 'Culture',
  });
  const [openField, setOpenField] = useState(null);

  const fields = [
    ['pin', 'destination', 'Where to?', ['Japan', 'Europe', 'Bali', 'Dubai', 'New Zealand', 'South Africa', 'Switzerland']],
    ['calendar', 'month', 'When?', ['Anytime', 'Dec - Mar', 'Apr - Jun', 'Jul - Sep', 'Oct - Nov']],
    ['user', 'travellers', "Who's travelling?", ['Solo', '2 Adults', 'Family', 'Friends', 'Group']],
    ['bag', 'type', 'Trip type', ['Culture', 'Nature', 'Island', 'City', 'Safari']],
  ];

  return (
    <form className={inline ? 'aa-planner aa-planner--inline' : 'aa-planner'} id={inline ? 'destination-planner' : 'planner'}>
      <h2>Start with a direction</h2>
      <p>Pick the basics. Our planners shape the route, stays and support around you.</p>
      <div className="aa-planner-grid">
        {fields.map(([icon, name, label, options]) => (
          <div className={openField === name ? 'aa-planner-field is-open' : 'aa-planner-field'} key={name}>
            <button
              className="aa-planner-trigger"
              type="button"
              aria-expanded={openField === name}
              onClick={() => setOpenField((current) => (current === name ? null : name))}
            >
              <Icon type={icon} />
              <span>
                <small>{label}</small>
                <strong>{planner[name]}</strong>
              </span>
              <span aria-hidden="true">⌄</span>
            </button>
            {openField === name && (
              <div className="aa-planner-options" role="listbox" aria-label={label}>
                {options.map((option) => (
                  <button
                    className={planner[name] === option ? 'is-selected' : ''}
                    type="button"
                    role="option"
                    aria-selected={planner[name] === option}
                    key={option}
                    onClick={() => {
                      setPlanner((current) => ({ ...current, [name]: option }));
                      setOpenField(null);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <a className="aa-planner-submit" href={`${BASE}japan-unplugged/`}>Explore trips <Arrow /></a>
    </form>
  );
}

function Hero() {
  return (
    <section className="aa-hero" id="top">
      <div className="aa-hero-copy reveal">
        <p className="aa-kicker">Curated international journeys</p>
        <h1>Private trips,<br />properly planned<span>.</span></h1>
        <p>International holidays shaped by specialists in India, with visas, stays and support handled carefully.</p>
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
      <div className="aa-section-head aa-section-head--stacked reveal">
        <h2>Choose the mood, not just the map.</h2>
        <p>Japan in quiet season, Europe by rail, islands for rest, cities for appetite. Every destination starts with how you want to feel.</p>
        <a href={`${BASE}destinations/`}>View all destinations <Arrow /></a>
      </div>
      <DestinationCards />
    </section>
  );
}

function Process() {
  const processAssets = ['process-discover-3d.webp', 'process-design-3d.webp', 'process-book-3d.webp', 'process-support-3d.webp'];
  return (
    <section className="aa-section aa-process" id="process">
      <div className="aa-process-head reveal">
        <p className="aa-kicker">How we plan</p>
        <h2>Planning that removes the guesswork.</h2>
        <p>We turn a loose idea into a route you can trust, then stay close until you are back home.</p>
      </div>
      <ol className="aa-process-steps">
        {process.map(([title, copy], index) => (
          <li className="aa-process-step reveal" key={title}>
            <span className="aa-process-icon"><img src={homeAsset(processAssets[index])} alt="" loading="lazy" aria-hidden="true" /></span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function TrustStrip() {
  const trustAssets = ['trust-visa-3d.webp', 'trust-payment-3d.webp', 'trust-care-icon-3d.webp', 'trust-hotel-3d.webp'];
  return (
    <section className="aa-trust" id="visa">
      <div className="aa-trust-intro reveal">
        <h2>Built for Indian travellers.</h2>
        <p>Clear visa steps, INR-friendly payments, careful hotel choices and reachable humans while you travel.</p>
        <img className="aa-trust-art" src={homeAsset('trust-care-3d.webp')} alt="" loading="lazy" aria-hidden="true" />
      </div>
      {trust.map(([title, copy], index) => (
        <article className="reveal" key={title}>
          <img className="aa-trust-card-art" src={homeAsset(trustAssets[index])} alt="" loading="lazy" aria-hidden="true" />
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
        <p className="aa-kicker">Planner promise</p>
        <blockquote>A good holiday should feel easy long before the flight. The work is in the details you never have to chase.</blockquote>
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
  const footerLinks = [
    ['Home', BASE],
    ['Destinations', `${BASE}destinations/`],
    ['Japan Unplugged', `${BASE}japan-unplugged/`],
    ['About', `${BASE}about/`],
    ['Plan trip', `${BASE}plan/`],
    ['Contact', '#contact'],
  ];

  const travelCare = ['Visa guidance', 'INR payment support', 'On-trip support'];

  return (
    <footer className="aa-footer" id="contact">
      <section className="aa-footer-callout" aria-label="Plan your journey">
        <div>
          <p>Private journeys, planned from India</p>
          <h2>Travel should feel looked after.</h2>
        </div>
        <a className="aa-footer-cta" href={`${BASE}plan/`}>Talk to an expert <Arrow /></a>
      </section>

      <div className="aa-footer-brand">
        <Brand />
        <p>Curated international holidays for Indian travellers who want careful planning, quiet service, and no loose ends.</p>
      </div>

      <nav className="aa-footer-links" aria-label="Footer navigation">
        <h3>Explore</h3>
        {footerLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
      </nav>

      <div className="aa-footer-contact">
        <h3>Concierge desk</h3>
        <p>Atlas & Aangan Travel Pvt. Ltd.<br />101, The Globe, 1st Floor,<br />Dr. D.N. Road, Fort,<br />Mumbai 400001, India</p>
        <a href="tel:+912266201234">+91 22 6620 1234</a>
        <a href="mailto:hello@atlasandaangan.com">hello@atlasandaangan.com</a>
      </div>

      <div className="aa-footer-care">
        <h3>Travel care</h3>
        <p>Mon - Sat: 10:00 AM - 7:00 PM IST<br />(By appointment)</p>
        <div>
          {travelCare.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>

      <div className="aa-footer-bottom">
        <small>Copyright 2026 Atlas & Aangan Travel Pvt. Ltd.</small>
        <div className="aa-footer-legal" aria-label="Legal notes"><span>Privacy Policy</span><span>Terms & Conditions</span><span>Sustainability</span></div>
      </div>
    </footer>
  );
}


function DestinationsPage() {
  return (
    <>
      <section className="aa-page-hero aa-map-hero">
        <div className="reveal">
          <h1>Explore curated<br />international trips<span>.</span></h1>
          <i />
          <p>Handpicked places. Thoughtfully designed journeys. Made for how you want to travel.</p>
        </div>
      </section>
      <section className="aa-destination-planner reveal">
        <TripPlanner inline />
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
        <div className="aa-trip-hero-copy reveal">
          <p className="aa-breadcrumb">Home / Destinations / Japan</p>
          <p className="aa-kicker">Private Japan journey</p>
          <h1>Japan, unhurried.</h1>
          <p>Tokyo energy, mountain ryokans and Kyoto quiet, paced for travellers who want depth.</p>
          <div className="aa-trip-hero-actions">
            <a className="aa-button" href={`${BASE}plan/`}>Plan this trip <Arrow /></a>
            <a className="aa-trip-text-link" href="#aa-trip-route">View the route <Arrow /></a>
          </div>
        </div>
        <aside className="aa-trip-hero-card reveal">
          <p>Starting from</p>
          <strong>₹ 3,65,000</strong>
          <small>Per person, excluding flights</small>
          <dl>
            <div><dt>Length</dt><dd>9 Nights / 10 Days</dd></div>
            <div><dt>Season</dt><dd>Dec - Mar</dd></div>
            <div><dt>Travellers</dt><dd>2+</dd></div>
          </dl>
        </aside>
      </section>
      <section className="aa-trip-dossier">
        <section className="aa-trip-overview reveal">
          <h2>A slow route through the good parts.</h2>
          <p>This is not a checklist tour. It is a private route across cities, shrines, onsen towns and mountain villages, with enough space to actually feel Japan.</p>
          <div className="aa-overview-grid">
            {[
              ['Private rhythm', 'Drivers, guides and stays arranged around your pace.'],
              ['Indian comfort', 'Food guidance, visa clarity and INR payment support.'],
              ['Local texture', 'Temples, tea rooms, ryokans and neighborhood walks.'],
              ['Trip care', 'A real team stays reachable while you travel.'],
            ].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>
        <aside className="aa-trip-aside">
          <p>Designed for</p>
          <strong>Couples, families and friends who prefer depth.</strong>
          <small>Every departure is shaped after a consultation, not sold as a fixed group package.</small>
          <a className="aa-button" href={`${BASE}plan/`}>Plan this trip <Arrow /></a>
          <dl>
            <div><dt>Visa</dt><dd>Guidance for Indian citizens</dd></div>
            <div><dt>Transfers</dt><dd>Private car and rail support</dd></div>
            <div><dt>Stay style</dt><dd>Boutique hotels and ryokans</dd></div>
            <div><dt>Support</dt><dd>On-trip concierge access</dd></div>
          </dl>
        </aside>
      </section>
      <section className="aa-trip-route" id="aa-trip-route">
        <div className="aa-trip-route-head reveal">
          <h2>Ten days, paced like a story.</h2>
          <p>Arrive bright, move slower, leave with space between the memories.</p>
        </div>
        <div className="aa-itinerary">
          {itinerary.map(([day, title, copy, image], index) => (
            <article className="aa-itinerary-row reveal" key={title}>
              <span className="aa-itinerary-count">{String(index + 1).padStart(2, '0')}</span>
              <i aria-hidden="true" />
              <div className="aa-itinerary-copy"><small>{day}</small><h3>{title}</h3><p>{copy}</p></div>
              <img src={image} alt={title} loading="lazy" />
            </article>
          ))}
        </div>
      </section>
      <section className="aa-section aa-stays">
        <div className="aa-stays-copy reveal">
          <h2>Stay where the trip changes pace.</h2>
          <p>City polish, hot-spring quiet, old Kyoto texture and a final mountain pause. Each stay is chosen for the feeling it adds to the route.</p>
          <a href={`${BASE}plan/`}>Shape your stays <Arrow /></a>
        </div>
        <div className="aa-stay-grid">
          {stays.map(([city, type, image]) => <article className="reveal" key={city}><img src={image} alt={`${city} ${type}`} loading="lazy" /><div><strong>{city}</strong><small>{type}</small></div></article>)}
        </div>
      </section>
      <FaqSection />
      <TripFinale />
    </>
  );
}

function FaqSection() {
  const questions = [
    ['Is visa required for this trip?', 'Yes. Indian citizens need a Japan visa, and our team guides documentation, appointment prep and timing.'],
    ['Can this itinerary be customised?', 'Yes. The route, stays and pace are adjusted after the first consultation.'],
    ['What is the best time to visit Japan?', 'December to March works beautifully for winter scenery, onsen stays and clearer Fuji views.'],
    ['What kind of food can we expect?', 'We plan around your comfort, including Indian meals, vegetarian preferences and local meals worth trying.'],
  ];
  return (
    <section className="aa-faq">
      <div className="aa-faq-intro reveal">
        <h2>The practical parts, handled.</h2>
        <p>Visa guidance, dietary comfort, pacing and on-trip support are built into the plan before anything is booked.</p>
      </div>
      <div className="aa-faq-list">
        {questions.map(([q, a]) => (
          <details className="reveal" key={q}>
            <summary>{q}<span>+</span></summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function TripFinale() {
  return (
    <section className="aa-trip-finale">
      <img src={pageAsset('trip', 'stay-kyoto.webp')} alt="Kyoto machiya stay prepared for a private Japan journey" loading="lazy" />
      <div className="reveal">
        <h2>Bring us the dates. We will build the Japan around them.</h2>
        <p>Tell us who is travelling, what feels essential and what should be avoided. The first draft comes back calm, detailed and ready to refine.</p>
        <a className="aa-button" href={`${BASE}plan/`}>Plan this trip <Arrow /></a>
      </div>
    </section>
  );
}

function PlanPage() {
  const expectationSteps = [
    ['expect-listen.webp', 'Listen first', 'We understand pace, people, food, budget and the kind of trip you actually want.'],
    ['expect-route.webp', 'Shape the route', 'We turn the brief into a clear itinerary with stays, transfers and optional experiences.'],
    ['expect-details.webp', 'Lock the details', 'Visas, payments, confirmations and traveller notes are checked before you leave.'],
    ['expect-support.webp', 'Stay close', 'You travel with reachable support and room for sensible changes along the way.'],
  ];
  const planPromises = [
    ['user', 'Personal', 'No bots, no templates.', 'promise-personal.webp'],
    ['map', 'Tailored', 'Routes shaped around you.', 'promise-tailored.webp'],
    ['shield', 'Protected', 'Details handled carefully.', 'promise-protected.webp'],
  ];
  const planFaqs = [
    ['How much does it cost to plan with you?', 'Planning is quoted after we understand the route, traveller count and service depth. The first conversation is used to scope the trip clearly before anything is confirmed.'],
    ['Can you help with visas and documentation?', 'Yes. We guide Indian travellers on visa steps, document checklists, appointment timing and practical notes for the destination.'],
    ['Can I customize the itinerary later?', 'Yes. The route stays flexible during planning, and sensible changes can be made before bookings are locked.'],
    ['Will I have support during my trip?', 'Yes. A real planning desk remains reachable while you travel for confirmations, hotel coordination and reasonable on-trip changes.'],
    ['Can you work around Indian food preferences?', 'Yes. We can plan restaurant notes, hotel breakfast choices, vegetarian options and comfort stops where the route needs them.'],
    ['Do you book flights too?', 'We can coordinate around your flights, and where needed we can help compare sensible flight timings before the ground plan is locked.'],
  ];

  return (
    <>
      <section className="aa-plan-page">
        <main className="reveal">
          <div className="aa-plan-intro">
            <p className="aa-kicker">Plan your trip</p>
            <h1>Tell us where<br />you want to go<span>.</span></h1>
            <p>Share the loose idea. A senior planner turns it into a route, budget and care plan that fits your people.</p>
          </div>
          <div className="aa-plan-points" aria-label="Planning promise">
            {planPromises.map(([icon, title, copy, image]) => (
              <article
                className="aa-plan-promise"
                key={title}
                style={{ '--promise-image': `url(${pageAsset('plan', image)})` }}
              >
                <Icon type={icon} />
                <div>
                  <strong>{title}</strong>
                  <small>{copy}</small>
                </div>
              </article>
            ))}
          </div>
          <div className="aa-form-progress"><b>01</b><i /><b>02</b><i /><b>03</b><i /><b>04</b></div>
          <TravelForm />
        </main>
        <PlannerPanel />
      </section>
      <section className="aa-expect">
        {expectationSteps.map(([image, title, copy]) => <article className="reveal" key={title}><img className="aa-expect-icon" src={pageAsset('plan', image)} alt="" loading="lazy" aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}
      </section>
      <section className="aa-plan-faq" id="visa">
        <div className="aa-plan-faq-head reveal">
          <p className="aa-kicker">FAQ</p>
          <h2>Questions before we begin.</h2>
        </div>
        <div className="aa-plan-faq-list">
          {planFaqs.map(([question, answer], index) => (
            <details className="reveal" key={question}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {question}
                <b aria-hidden="true">+</b>
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

function AboutPage() {
  const principles = [
    ['trust-visa-3d.webp', 'India-first clarity', 'Visa, payment and timing decisions are explained before the trip is sold.'],
    ['process-route-3d.webp', 'Routes with restraint', 'We choose fewer places, better stays and calmer transfers.'],
    ['trust-care-3d.webp', 'Humans stay close', 'A real planning desk remains reachable before and during travel.'],
  ];

  const craft = [
    ['promise-personal.webp', 'Listen', 'Every route starts with people, pace and comfort, not a package code.'],
    ['promise-tailored.webp', 'Shape', 'Hotels, transfers and experiences are arranged around the traveller.'],
    ['promise-protected.webp', 'Check', 'Documents, confirmations and practical notes are reviewed before departure.'],
  ];

  return (
    <>
      <section className="aa-about-hero">
        <div className="aa-about-hero-copy reveal">
          <p className="aa-breadcrumb">Home / About</p>
          <p className="aa-kicker">Atlas & Aangan</p>
          <h1>Travel, designed from India with care<span>.</span></h1>
          <p>We are a Mumbai planning desk for Indian travellers who want international trips to feel personal, calm and properly handled.</p>
          <a className="aa-button" href={`${BASE}plan/`}>Plan with us <Arrow /></a>
        </div>
        <div className="aa-about-hero-visual reveal" aria-hidden="true">
          <img className="aa-about-hero-photo" src={homeAsset('hero-japan-fuji.webp')} alt="" loading="eager" />
          <img className="aa-about-floating aa-about-floating-one" src={homeAsset('process-route-3d.webp')} alt="" loading="lazy" />
          <img className="aa-about-floating aa-about-floating-two" src={brandAsset('atlas-aangan-logo-3d.webp')} alt="" loading="lazy" />
        </div>
      </section>

      <section className="aa-about-proof">
        <article className="reveal">
          <strong>15+</strong>
          <span>years of travel planning</span>
        </article>
        <article className="reveal">
          <strong>42</strong>
          <span>countries planned for Indian families</span>
        </article>
        <article className="reveal">
          <strong>24/7</strong>
          <span>trip care while you travel</span>
        </article>
      </section>

      <section className="aa-about-story">
        <div className="aa-about-story-copy reveal">
          <p className="aa-kicker">Why we exist</p>
          <h2>The best trips feel easy because someone cared about the details.</h2>
          <p>Atlas & Aangan was built for travellers who do not want generic tours, confusing visa steps or hotel choices made by chance. We bring the taste of a private travel desk and the practical rhythm Indian families need.</p>
        </div>
        <figure className="reveal">
          <img src={homeAsset('planner-terrace.webp')} alt="A quiet premium terrace stay arranged for international travel" loading="lazy" />
          <figcaption>Planning is quiet work. The trip should feel effortless.</figcaption>
        </figure>
      </section>

      <section className="aa-about-principles">
        {principles.map(([image, title, copy], index) => (
          <article className="reveal" key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <img src={homeAsset(image)} alt="" loading="lazy" aria-hidden="true" />
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className="aa-about-craft">
        <div className="aa-about-craft-head reveal">
          <p className="aa-kicker">How we work</p>
          <h2>Personal first, then precise.</h2>
          <p>Every journey is shaped through a short planning loop that keeps taste, comfort and practical travel care in the same conversation.</p>
        </div>
        <div className="aa-about-craft-grid">
          {craft.map(([image, title, copy]) => (
            <article className="reveal" key={title}>
              <img src={pageAsset('plan', image)} alt="" loading="lazy" aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="aa-about-close">
        <img src={pageAsset('plan', 'possibility-japan.webp')} alt="Curated Japan travel inspiration" loading="lazy" />
        <div className="reveal">
          <p className="aa-kicker">Concierge desk</p>
          <h2>Bring us the loose idea. We will make it travel-ready.</h2>
          <a className="aa-button" href={`${BASE}plan/`}>Start planning <Arrow /></a>
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
      <figure>
        <img src={pageAsset('plan', 'possibility-japan.webp')} alt="Curated Japan journey inspiration" loading="lazy" />
      </figure>
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
        {['possibility-alps.webp', 'possibility-coast.webp', 'possibility-cappadocia.webp'].map((name) => <img key={name} src={pageAsset('plan', name)} alt="" loading="lazy" />)}
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
      <PlannerNote />
      <TrustStrip />
    </>
  );
}

function pageFromPath() {
  const path = window.location.pathname;
  if (path.includes('/destinations')) return 'destinations';
  if (path.includes('/japan-unplugged')) return 'trip';
  if (path.includes('/about')) return 'about';
  if (path.includes('/plan')) return 'plan';
  return 'home';
}

function OpxBar() {
  // Leaving the case study clears the session flag, so the loader replays on a fresh entry.
  const exit = () => { try { sessionStorage.removeItem('aa:loaded'); } catch { /* ignore */ } };
  return (
    <div className="aa-opx">
      <span className="aa-opx-note">A OnePixel sample site &middot; trips, prices and details are placeholder</span>
      <a className="aa-opx-back" href="/" onClick={exit}>&larr; Back to OnePixel</a>
    </div>
  );
}

// The OnePixel loader plays only on the FIRST Atlas & Aangan page of a session (the landing).
// Internal navigation between the MPA pages skips it; a fresh entry after exiting replays it.
// (MPA pages share sessionStorage per tab, so the flag survives navigation but not a closed tab.)
function EntryLoader({ mark = 'Atlas & Aangan' }) {
  const [show] = useState(() => {
    try {
      if (sessionStorage.getItem('aa:loaded')) return false;
      sessionStorage.setItem('aa:loaded', '1');
      return true;
    } catch {
      return true;
    }
  });
  return show ? <Loader duration={2400} mark={mark} /> : null;
}

export default function App() {
  const root = useRef(null);
  const page = pageFromPath();

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    const handleInternalNavigation = (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target && link.target !== '_self') return;

      const nextUrl = new URL(link.href, window.location.href);
      const currentUrl = new URL(window.location.href);
      const isAtlasPage = nextUrl.origin === currentUrl.origin && nextUrl.pathname.startsWith(BASE);
      const isSamePageHash = nextUrl.pathname === currentUrl.pathname && nextUrl.hash;
      if (!isAtlasPage || isSamePageHash) return;

      event.preventDefault();
      const targetHref = new URL(nextUrl.href);
      if (nextUrl.hash) {
        sessionStorage.setItem('aaPendingAnchor', JSON.stringify({ path: nextUrl.pathname, hash: nextUrl.hash }));
        targetHref.hash = '';
      }

      gsap.to(root.current, {
        opacity: 0,
        y: -10,
        duration: 0.28,
        ease: 'power2.inOut',
        onComplete: () => {
          window.location.href = targetHref.href;
        },
      });
    };

    document.addEventListener('click', handleInternalNavigation);

    const refreshScrollTriggers = () => ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const introSelectors = {
        home: [
          '.aa-hero-copy .aa-kicker',
          '.aa-hero-copy h1',
          '.aa-hero-copy > p:not(.aa-kicker)',
          '.aa-hero-actions',
          '.aa-hero-media img',
          '.aa-planner',
        ],
        destinations: [
          '.aa-page-hero .aa-kicker',
          '.aa-page-hero h1',
          '.aa-page-hero i',
          '.aa-page-hero p:last-child',
          '.aa-destination-planner',
        ],
        trip: [
          '.aa-trip-hero > img',
          '.aa-trip-hero-copy .aa-breadcrumb',
          '.aa-trip-hero-copy .aa-kicker',
          '.aa-trip-hero-copy h1',
          '.aa-trip-hero-copy > p:not(.aa-kicker):not(.aa-breadcrumb)',
          '.aa-trip-hero-actions',
          '.aa-trip-hero-card',
        ],
        plan: [
          '.aa-plan-intro .aa-kicker',
          '.aa-plan-intro h1',
          '.aa-plan-intro > p:last-child',
          '.aa-plan-promise',
          '.aa-form-progress',
          '.aa-travel-form',
          '.aa-planner-panel',
        ],
        about: [
          '.aa-about-hero-copy .aa-breadcrumb',
          '.aa-about-hero-copy .aa-kicker',
          '.aa-about-hero-copy h1',
          '.aa-about-hero-copy > p:last-of-type',
          '.aa-about-hero-copy .aa-button',
          '.aa-about-hero-photo',
          '.aa-about-floating',
        ],
      };

      const introItems = gsap.utils.toArray(introSelectors[page] || []);
      const headerItems = gsap.utils.toArray('.aa-header .aa-brand, .aa-nav a, .aa-menu');

      gsap.set(root.current, { opacity: 1 });
      gsap.from(headerItems, {
        opacity: 0,
        y: -12,
        duration: 0.55,
        stagger: 0.045,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
      gsap.from('.aa-header-cta', {
        opacity: 0,
        duration: 0.45,
        delay: 0.18,
        ease: 'power2.out',
        clearProps: 'opacity',
      });
      gsap.from(introItems, {
        opacity: 0,
        y: 28,
        scale: (index, target) => (target.matches('img, .aa-planner, .aa-trip-hero-card, .aa-travel-form, .aa-planner-panel') ? 0.985 : 1),
        duration: 0.9,
        stagger: 0.075,
        delay: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      const pendingAnchor = sessionStorage.getItem('aaPendingAnchor');
      if (pendingAnchor) {
        try {
          const { path, hash } = JSON.parse(pendingAnchor);
          if (path === window.location.pathname && hash) {
            sessionStorage.removeItem('aaPendingAnchor');
            gsap.delayedCall(0.38, () => {
              const target = document.querySelector(hash);
              if (!target) return;
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              window.history.replaceState(null, '', `${window.location.pathname}${hash}`);
            });
          }
        } catch {
          sessionStorage.removeItem('aaPendingAnchor');
        }
      }

      gsap.utils.toArray('.reveal').forEach((item) => {
        if (item.closest('.aa-hero, .aa-page-hero, .aa-trip-hero, .aa-plan-page, .aa-about-hero')) return;
        gsap.from(item, {
          opacity: 0,
          y: 26,
          duration: 0.72,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        });
      });

      const parallaxTarget = page === 'trip' ? '.aa-trip-hero > img' : '.aa-hero-media img';
      const parallaxTrigger = page === 'trip' ? '.aa-trip-hero' : '.aa-hero';
      if (document.querySelector(parallaxTarget) && document.querySelector(parallaxTrigger)) {
        gsap.to(parallaxTarget, {
        yPercent: -4,
        ease: 'none',
          scrollTrigger: { trigger: parallaxTrigger, start: 'top top', end: 'bottom top', scrub: 0.9 },
        });
      }

      window.addEventListener('load', refreshScrollTriggers, { once: true });
    }, root);

    return () => {
      document.removeEventListener('click', handleInternalNavigation);
      window.removeEventListener('load', refreshScrollTriggers);
      ctx.revert();
    };
  }, [page]);

  return (
    <div ref={root}>
      <EntryLoader mark="Atlas & Aangan" />
      <OpxBar />
      <Header />
      <main>
        {page === 'home' && <HomePage />}
        {page === 'destinations' && <DestinationsPage />}
        {page === 'trip' && <TripDetailPage />}
        {page === 'about' && <AboutPage />}
        {page === 'plan' && <PlanPage />}
      </main>
      <Footer />
    </div>
  );
}
