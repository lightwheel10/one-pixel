import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Check, ChevronDown, Plus, Minus, ArrowRight, ArrowLeft,
  Mail, Headset, Activity, MapPin,
} from 'lucide-react';
import { Lightning } from '../hero-odyssey.jsx';

const SITE = '/case-studies/pravah/';

function BrandLogo({ className = '' }) {
  return (
    <a href={SITE} className={`inline-flex items-center gap-2.5 ${className}`}>
      <Zap className="w-5 h-5 text-electric" fill="currentColor" strokeWidth={0} />
      <span className="font-display text-lg font-semibold text-ink">Pravah</span>
      <span className="font-deva text-sm text-muted hidden sm:inline">प्रवाह</span>
    </a>
  );
}

function Field({ label, type = 'text', name, placeholder, autoComplete, required = true, optional }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-wider text-white/45">
        {label}{optional && <span className="text-white/25 normal-case tracking-normal"> (optional)</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-electric focus:outline-none transition-colors"
      />
    </label>
  );
}

function SelectField({ label, options }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-wider text-white/45">{label}</span>
      <div className="relative mt-2">
        <select
          name="topic"
          className="w-full appearance-none bg-white/[0.03] border border-white/15 px-4 py-3 pr-10 text-sm text-white focus:border-electric focus:outline-none transition-colors"
        >
          {options.map((o) => <option key={o} className="bg-[#0a0c14] text-white">{o}</option>)}
        </select>
        <ChevronDown className="w-4 h-4 text-white/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </label>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div>
        <div className="w-12 h-12 border border-electric/30 bg-electric/10 flex items-center justify-center">
          <Check className="w-6 h-6 text-electric" />
        </div>
        <h2 className="font-display text-2xl tracking-tight mt-6">Message sent</h2>
        <p className="text-white/55 text-sm mt-3 leading-relaxed max-w-md">
          Thanks for reaching out. This is a OnePixel demo so nothing was really delivered, but on the real
          thing we&rsquo;d reply within a few hours.
        </p>
        <button type="button" onClick={() => setSent(false)} className="inline-flex items-center gap-2 mt-7 text-electric hover:gap-3 transition-all text-sm">
          <ArrowLeft className="w-4 h-4" /> Send another
        </button>
      </div>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <h2 className="font-display text-2xl tracking-tight">Send us a message</h2>
      <p className="text-white/50 text-sm mt-2">We usually reply within a few hours.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-7">
        <Field label="Full name" name="name" placeholder="Ananya Rao" autoComplete="name" />
        <Field label="Work email" type="email" name="email" placeholder="you@company.in" autoComplete="email" />
      </div>
      <div className="mt-4">
        <Field label="Company" name="company" placeholder="Acme Pvt Ltd" autoComplete="organization" required={false} optional />
      </div>
      <div className="mt-4">
        <SelectField label="Topic" options={['Sales enquiry', 'Technical support', 'Billing', 'Partnership', 'Something else']} />
      </div>
      <div className="mt-4">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/45">Message</span>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us what you need…"
            className="mt-2 w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-electric focus:outline-none transition-colors resize-none"
          />
        </label>
      </div>
      <button type="submit" className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-electric text-black px-7 py-3 text-sm font-medium hover:bg-arc transition-colors">
        Send message <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

const channels = [
  { icon: Mail, label: 'Sales', value: 'sales@pravah.cloud', href: 'mailto:sales@pravah.cloud', sub: 'Plans, quotes and committed use' },
  { icon: Headset, label: 'Support', value: 'support@pravah.cloud', href: 'mailto:support@pravah.cloud', sub: '24/7 · median reply < 5 min' },
  { icon: Activity, label: 'Status', value: 'status.pravah.cloud', href: '#', sub: 'All systems operational' },
  { icon: MapPin, label: 'Office', value: 'Mumbai, Maharashtra', href: '#', sub: 'Lower Parel · by appointment' },
];

function Channels() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-px bg-white/10 border border-white/10">
      {channels.map((c) => (
        <a key={c.label} href={c.href} className="group bg-base p-6 hover:bg-panel transition-colors flex gap-4">
          <div className="w-10 h-10 shrink-0 bg-electric/10 border border-electric/20 flex items-center justify-center group-hover:bg-electric/20 transition-colors">
            <c.icon className="w-5 h-5 text-electric" />
          </div>
          <div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">{c.label}</div>
            <div className="text-sm text-white/90 mt-1">{c.value}</div>
            <div className="font-mono text-[10px] text-white/40 mt-1">{c.sub}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

const faqs = [
  { q: 'Where is my data stored?', a: 'In India, always. All five Pravah regions are inside the country: Mumbai, Chennai, Delhi NCR, Bengaluru and Hyderabad. Data is never replicated across a border, so residency and MeitY readiness are the default.' },
  { q: 'How does billing work?', a: 'Everything is priced in rupees with per-second metering. Pay by UPI, NetBanking or card, and download GST invoices from the console. No currency conversion and no surprises.' },
  { q: 'Do you charge for bandwidth?', a: 'Every plan includes generous transfer, and traffic between Pravah regions inside India is free. You only pay metered rates for egress that leaves our network.' },
  { q: 'Can you help me migrate from another cloud?', a: 'Yes. Our team helps you move servers, databases and storage with minimal downtime, and committed-use customers get a dedicated migration engineer.' },
  { q: 'What support do I get?', a: 'Real engineers, 24/7, on every plan, with a median first reply under five minutes. Customers on our larger plans also get a named solutions engineer and a 99.99% SLA.' },
  { q: 'Is there a free trial?', a: 'New accounts get ₹500 in credit with no card required, so you can deploy and test before committing to anything.' },
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-white/10 mt-10">
      {faqs.map((f, i) => (
        <div key={f.q} className="border-b border-white/10">
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-display text-lg">{f.q}</span>
            <span className="shrink-0 text-electric">{open === i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}</span>
          </button>
          {open === i && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="text-white/55 text-sm leading-relaxed pb-6 max-w-2xl"
            >
              {f.a}
            </motion.p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ContactApp() {
  return (
    <div className="min-h-screen bg-base text-ink flex flex-col">
      {/* OnePixel chrome */}
      <div className="h-8 shrink-0 flex items-center gap-3 px-4 sm:px-6 lg:px-8 border-b border-white/5 text-[11px] font-mono uppercase tracking-wider text-white/45">
        <span className="hidden sm:block truncate">A OnePixel sample site · figures and details are placeholder</span>
        <a href="/" className="ml-auto inline-flex items-center gap-1.5 text-white/70 hover:text-electric transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to OnePixel
        </a>
      </div>

      {/* Slim header */}
      <header className="border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <BrandLogo />
        <div className="flex items-center gap-3">
          <a href="/case-studies/pravah/auth/" className="hidden sm:block text-sm text-white/65 hover:text-white transition-colors">Console login</a>
          <a href="/case-studies/pravah/auth/#signup" className="bg-electric text-black px-5 py-2.5 text-sm font-medium hover:bg-arc transition-colors">Get started</a>
        </div>
      </header>

      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden border-b border-white/10 px-4 sm:px-6 lg:px-8 py-16">
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.14 }} aria-hidden="true">
            <Lightning hue={248} bolts={2} speed={1.1} intensity={0.22} size={2} />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto">
            <p className="pv-eyebrow mb-4">// Contact</p>
            <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight">Talk to us.</h1>
            <p className="text-white/55 mt-5 max-w-xl leading-relaxed">
              Questions about plans, migrations or what runs where? Send a note or reach the right team
              directly. Real engineers, based in India, answer fast.
            </p>
          </div>
        </section>

        {/* Form + channels */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 border border-white/10 bg-panel p-7 sm:p-9">
              <ContactForm />
            </div>
            <div className="lg:col-span-5">
              <div className="pv-image-slab aspect-[16/9] mb-6">
                <img src="/case-studies/pravah/images/support-engineer.webp" alt="Pravah support engineer monitoring infrastructure" loading="lazy" decoding="async" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-white/45 mb-4">Or reach a team directly</p>
              <Channels />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-white/10 px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-3xl mx-auto">
            <p className="pv-eyebrow mb-4">// FAQ</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight">Questions, answered.</h2>
            <Faq />
            <p className="text-white/50 text-sm mt-10">
              Still stuck?{' '}
              <a href="mailto:support@pravah.cloud" className="text-electric hover:underline">Email support</a>{' '}
              and we&rsquo;ll take it from there.
            </p>
          </div>
        </section>
      </main>

      {/* Slim footer */}
      <footer className="border-t border-white/10 px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-white/40">
        <span className="inline-flex items-center gap-2">
          <Zap className="w-4 h-4 text-electric" fill="currentColor" strokeWidth={0} /> Pravah प्रवाह · © 2026 · A OnePixel sample project
        </span>
        <a href="/" className="inline-flex items-center gap-1.5 hover:text-electric transition-colors uppercase tracking-wide">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to OnePixel
        </a>
      </footer>
    </div>
  );
}
