import React, { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import {
  Shield, IndianRupee, Headset, Gauge, Check, Copy, Zap,
  ArrowRight, ArrowLeft,
} from 'lucide-react';
import { Loader } from '../../src/Loader.jsx';
import { HeroSection, Lightning } from './hero-odyssey.jsx';
import { Products } from './products.jsx';
import { Regions } from './network.jsx';
import { Pricing } from './pricing.jsx';
import { Console } from './console.jsx';
import { Logo, Button, Reveal } from './ui.jsx';

function OpxBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-8 flex items-center gap-3 px-4 sm:px-6 lg:px-8 bg-black/80 backdrop-blur border-b border-white/5 text-[11px] font-mono uppercase tracking-wider text-white/45">
      <span className="hidden sm:block truncate">A OnePixel sample site · figures, logos and images are placeholder</span>
      <a href="/" className="ml-auto inline-flex items-center gap-1.5 text-white/70 hover:text-electric transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to OnePixel
      </a>
    </div>
  );
}

// Faint multi-strike lightning as a section backdrop ("the current" running through the page).
function SectionLightning({ opacity = 0.3, bolts = 2, intensity = 0.24, speed = 1.3 }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity }} aria-hidden="true">
      <Lightning hue={248} bolts={bolts} speed={speed} intensity={intensity} size={2} />
    </div>
  );
}

/* ---------------- Trust ---------------- */
function TrustStrip() {
  const names = ['Finbox', 'Dukaan', 'Vahan', 'Setu', 'Zolve', 'Nimbus', 'Khatabook'];
  return (
    <section className="border-b border-white/10 py-9 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center gap-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40 shrink-0">
          Builders running on Pravah
        </p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-white/40 font-display text-lg">
          {names.map((n) => <span key={n} className="hover:text-white/70 transition-colors">{n}</span>)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Products: see products.jsx ---------------- */

/* ---------------- Data centre network: see network.jsx ---------------- */

/* ---------------- Pricing: see pricing.jsx ---------------- */

/* ---------------- Console & API: see console.jsx ---------------- */

/* ---------------- Metrics ---------------- */
const metrics = [
  ['99.99%', 'Uptime, measured'],
  ['<5 min', 'Median support reply'],
  ['40 Tbps', 'Backbone capacity'],
  ['1.2 M+', 'Cores under management'],
];

function Metrics() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
        {metrics.map(([value, label]) => (
          <Reveal key={label} className="bg-base px-6 py-10 text-center">
            <div className="font-display text-4xl md:text-5xl font-medium text-white">{value}</div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/45 mt-3">{label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Why Pravah ---------------- */
const reasons = [
  { icon: Shield, title: 'Data stays in India', body: 'Every byte is stored and processed inside Indian borders, in facilities we own and run.', proof: '5/5 regions in-country · MeitY-ready' },
  { icon: IndianRupee, title: 'Billed in rupees', body: 'Transparent INR pricing with no currency surprises, paid the way Indian teams actually pay.', proof: 'UPI · NetBanking · GST invoices' },
  { icon: Headset, title: 'Engineers on call', body: 'Talk to people who run the platform, any hour, not a tiered queue of scripted replies.', proof: '< 5 min median reply · 24/7' },
  { icon: Gauge, title: 'Price for performance', body: 'NVMe on every plan, generous transfer, and no charge to move data between our regions.', proof: 'NVMe everywhere · ₹0 in-India egress' },
];

const compare = [
  ['Data residency', 'All 5 regions in India', 'Often processed offshore'],
  ['Billing', 'Rupees · UPI · GST invoice', 'USD · card · reverse-charge GST'],
  ['Support', 'Engineers, 24/7, < 5 min', 'Paid tiers and ticket queues'],
  ['Egress within India', 'Free', 'Metered per GB'],
  ['Entry price', '₹399 / month', '₹1,500+ equivalent'],
  ['First server', 'Under a minute', 'Quota and account review'],
];

function WhyPravah() {
  return (
    <section className="border-t border-white/10 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="pv-eyebrow mb-4">// Why Pravah</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight max-w-xl">
              Built like infrastructure should be.
            </h2>
            <p className="text-white/55 max-w-md leading-relaxed">
              The reliability you expect from a global cloud, with the residency, pricing and support an
              Indian team actually needs.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mt-12">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 4) * 0.05} className="bg-base p-7 h-full flex flex-col">
              <r.icon className="w-6 h-6 text-electric" />
              <h3 className="font-display text-lg mt-5">{r.title}</h3>
              <p className="text-white/55 text-sm mt-2 leading-relaxed">{r.body}</p>
              <p className="font-mono text-[10px] uppercase tracking-wide text-electric/90 mt-auto pt-5">{r.proof}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05}>
          <div className="mt-6 overflow-x-auto">
            <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-px bg-white/10 border border-white/10 min-w-[680px]">
              <div className="bg-base px-5 py-4" />
              <div className="bg-electric/[0.06] px-5 py-4 font-display text-base text-electric inline-flex items-center gap-2">
                <Zap className="w-4 h-4" fill="currentColor" strokeWidth={0} /> Pravah
              </div>
              <div className="bg-base px-5 py-4 font-mono text-[11px] uppercase tracking-wide text-white/45 flex items-center">Typical global cloud</div>
              {compare.map(([f, a, b]) => (
                <React.Fragment key={f}>
                  <div className="bg-base px-5 py-4 font-mono text-[11px] uppercase tracking-wide text-white/45 flex items-center">{f}</div>
                  <div className="bg-electric/[0.04] px-5 py-4 text-sm text-white/90 flex items-center gap-2"><Check className="w-4 h-4 text-electric shrink-0" />{a}</div>
                  <div className="bg-base px-5 py-4 text-sm text-white/45 flex items-center">{b}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CopyCommand({ cmd }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(cmd).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-2 sm:gap-3 max-w-full border border-white/15 bg-black/40 backdrop-blur-sm px-4 py-2.5 font-mono text-xs sm:text-sm hover:border-electric/50 transition-colors"
    >
      <span className="text-electric">$</span>
      <span className="text-white/85 truncate">{cmd}</span>
      <span className="ml-1 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-white/40 group-hover:text-electric transition-colors shrink-0">
        {copied
          ? <><Check className="w-3.5 h-3.5" /><span className="hidden sm:inline">Copied</span></>
          : <><Copy className="w-3.5 h-3.5" /><span className="hidden sm:inline">Copy</span></>}
      </span>
    </button>
  );
}

function CallToAction() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/10">
      <SectionLightning opacity={0.4} bolts={2} intensity={0.26} />
      <div className="absolute top-0 left-0 right-0 z-10 pv-current" aria-hidden="true" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[360px] bg-electric/10 blur-[120px] z-0" aria-hidden="true" />
      <Reveal className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tight">
          Start building on Pravah.
        </h2>
        <p className="text-white/55 mt-5 max-w-xl mx-auto leading-relaxed">
          Spin up your first server in under a minute, or pull the CLI and script it from your terminal.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
          <Button href="/case-studies/pravah/auth/#signup" variant="primary">Get started <ArrowRight className="w-4 h-4" /></Button>
          <Button href="mailto:sales@pravah.cloud" variant="ghost">Talk to sales</Button>
        </div>
        <div className="mt-8 flex justify-center">
          <CopyCommand cmd="curl -fsSL https://pravah.cloud/cli | sh" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-wide text-white/40 mt-6">₹500 free credit · no credit card · cancel anytime</p>
      </Reveal>
    </section>
  );
}

/* ---------------- Footer ---------------- */
const footerCols = [
  ['Products', ['Cloud Servers', 'Bare Metal', 'Storage', 'Databases', 'Networking', 'Backups']],
  ['Data Centres', ['Mumbai', 'Chennai', 'Delhi NCR', 'Bengaluru', 'Hyderabad']],
  ['Developers', ['Docs', 'API reference', 'CLI', 'Terraform', 'Status']],
  ['Company', ['About', 'Careers', 'Blog', 'Contact']],
  ['Legal', ['Privacy', 'Terms', 'Security', 'GST & billing']],
];

function Footer() {
  return (
    <footer id="company" className="relative border-t border-white/10 px-4 sm:px-6 lg:px-8 pt-16 pb-10 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto grid gap-10 md:grid-cols-[1.6fr_repeat(5,1fr)]">
        <div>
          <Logo />
          <p className="text-white/45 text-sm mt-4 max-w-xs leading-relaxed">
            India&rsquo;s cloud, built for builders. Cloud servers, bare metal and storage, hosted in India.
          </p>
          <a href="#" className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-white/50 hover:text-white transition-colors">
            <i className="w-1.5 h-1.5 bg-emerald-400 inline-block" /> All systems operational
          </a>
        </div>
        {footerCols.map(([heading, items]) => (
          <div key={heading}>
            <div className="font-mono text-[11px] uppercase tracking-wider text-white/40 mb-4">{heading}</div>
            <ul className="space-y-2.5">
              {items.map((l) => (
                <li key={l}>
                  <a href={l === 'Contact' ? '/case-studies/pravah/contact/' : '#'} className="text-sm text-white/65 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/40">
        <span>© 2026 Pravah Cloud · A OnePixel sample project</span>
        <div className="flex items-center gap-5 uppercase tracking-wide">
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">X</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="/" className="inline-flex items-center gap-1.5 text-white/50 hover:text-electric transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> OnePixel</a>
        </div>
      </div>

      <div
        className="pointer-events-none select-none absolute -bottom-[3vw] inset-x-0 z-0 text-center font-deva leading-none text-white/[0.035]"
        style={{ fontSize: '22vw' }}
        aria-hidden="true"
      >
        प्रवाह
      </div>
    </footer>
  );
}

export default function App() {
  const still = new URLSearchParams(window.location.search).has('still');

  return (
    <MotionConfig reducedMotion="user">
      {!still && <Loader duration={2400} mark="Pravah Cloud" />}
      <OpxBar />
      <main id="top" className="bg-base text-ink">
        <HeroSection />
        <TrustStrip />
        <Products />
        <Regions />
        <Pricing />
        <Console />
        <Metrics />
        <WhyPravah />
        <CallToAction />
        <Footer />
      </main>
    </MotionConfig>
  );
}
