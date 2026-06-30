import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Reveal } from './ui.jsx';

const plans = [
  { name: 'Basic', tag: 'side projects', price: 399, vcpu: '2', ram: '4 GB', disk: '40 GB', xfer: '2 TB', feats: ['Shared vCPU', 'IPv4 + IPv6', 'Snapshots'] },
  { name: 'General Purpose', tag: 'production', price: 799, vcpu: '4', ram: '8 GB', disk: '80 GB', xfer: '4 TB', feats: ['Dedicated vCPU option', 'Daily backups ready', 'Priority network'], hot: true },
  { name: 'Performance', tag: 'scaling apps', price: 1599, vcpu: '8', ram: '16 GB', disk: '160 GB', xfer: '8 TB', feats: ['Dedicated vCPU', 'Private networking', '99.99% SLA'] },
  { name: 'Dedicated', tag: 'heavy workloads', price: 3199, vcpu: '16', ram: '32 GB', disk: '320 GB', xfer: '20 TB', feats: ['Dedicated vCPU', 'NVMe RAID option', 'Priority support'] },
];

const inr = (n) => '₹' + n.toLocaleString('en-IN');

function PlanCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mt-12">
      {plans.map((p) => (
        <div key={p.name} className={`relative bg-base p-6 flex flex-col ${p.hot ? 'bg-electric/[0.04]' : ''}`}>
          {p.hot && <span className="absolute top-0 inset-x-0 h-0.5 bg-electric" aria-hidden="true" />}
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-xl">{p.name}</h3>
            {p.hot && <span className="font-mono text-[9px] uppercase tracking-widest text-electric border border-electric/40 px-2 py-0.5">Recommended</span>}
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-white/40 mt-2">Best for {p.tag}</p>
          <div className="mt-5">
            <span className="font-display text-3xl">{inr(p.price)}</span>
            <span className="text-white/45 text-sm"> /mo</span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-3 mt-5 font-mono text-[11px] text-white/55">
            <span>{p.vcpu} vCPU</span><span>{p.ram} RAM</span>
            <span>{p.disk} NVMe</span><span>{p.xfer} out</span>
          </div>
          <ul className="space-y-2 mt-6 mb-7">
            {p.feats.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/65">
                <Check className="w-3.5 h-3.5 text-electric shrink-0" />{f}
              </li>
            ))}
          </ul>
          <a href="/case-studies/pravah/auth/#signup" className={`mt-auto text-center py-2.5 text-sm font-medium transition-colors ${p.hot ? 'bg-electric text-black hover:bg-arc' : 'border border-white/15 hover:border-electric/60 text-white/85'}`}>
            Deploy {p.name}
          </a>
        </div>
      ))}
    </div>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="grid grid-cols-4 gap-px bg-white/10 border border-white/10">
      {options.map((o, i) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(i)}
          className={`px-1.5 py-2.5 text-[11px] sm:text-xs font-display leading-tight transition-colors ${value === i ? 'bg-electric text-black' : 'bg-base text-white/65 hover:bg-white/[0.05]'}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Stepper({ value, onChange, step = 1, min = 0, max = 99, suffix = '' }) {
  return (
    <div className="inline-flex border border-white/12">
      <button type="button" onClick={() => onChange(Math.max(min, value - step))} className="px-3.5 py-2 text-white/70 hover:bg-white/[0.06] border-r border-white/12" aria-label="decrease">−</button>
      <span className="px-4 py-2 font-mono text-sm tabular-nums text-center min-w-[5.5rem]">{value}{suffix}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + step))} className="px-3.5 py-2 text-white/70 hover:bg-white/[0.06] border-l border-white/12" aria-label="increase">+</button>
    </div>
  );
}

function Toggle({ on, onChange, label, note }) {
  return (
    <button type="button" onClick={() => onChange(!on)} className="flex items-center justify-between w-full py-2 text-left">
      <span>
        <span className="text-sm text-white/80">{label}</span>
        {note && <span className="block font-mono text-[10px] text-white/40 mt-0.5">{note}</span>}
      </span>
      <span className={`w-5 h-5 shrink-0 border flex items-center justify-center transition-colors ${on ? 'bg-electric border-electric' : 'border-white/25'}`}>
        {on && <Check className="w-3.5 h-3.5 text-black" />}
      </span>
    </button>
  );
}

function BillRow({ label, value, muted }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className={`text-sm ${muted ? 'text-white/45' : 'text-white/70'}`}>{label}</span>
      <span className={`font-mono text-sm tabular-nums ${muted ? 'text-white/45' : 'text-white/85'}`}>{value}</span>
    </div>
  );
}

function Estimator() {
  const [planIdx, setPlanIdx] = useState(1);
  const [servers, setServers] = useState(1);
  const [storage, setStorage] = useState(100);
  const [backups, setBackups] = useState(true);
  const [lb, setLb] = useState(false);

  const plan = plans[planIdx];
  const compute = plan.price * servers;
  const storageCost = storage * 3;
  const backupCost = backups ? Math.round(compute * 0.2) : 0;
  const lbCost = lb ? 600 : 0;
  const subtotal = compute + storageCost + backupCost + lbCost;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return (
    <div className="grid lg:grid-cols-[1.25fr_1fr] border border-white/10">
      {/* controls */}
      <div className="p-7 lg:p-8 space-y-7">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/45 block mb-3">Plan</span>
          <Segmented options={plans.map((p) => p.name)} value={planIdx} onChange={setPlanIdx} />
          <p className="font-mono text-[10px] text-white/40 mt-2.5">{plan.vcpu} vCPU · {plan.ram} · {plan.disk} NVMe · {plan.xfer} transfer</p>
        </div>

        <div className="flex flex-wrap gap-x-10 gap-y-6">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/45 block mb-3">Servers</span>
            <Stepper value={servers} onChange={setServers} min={1} max={20} />
          </div>
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-white/45 block mb-3">Block storage</span>
            <Stepper value={storage} onChange={setStorage} step={50} min={0} max={2000} suffix=" GB" />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/45 block mb-2">Add-ons</span>
          <Toggle on={backups} onChange={setBackups} label="Daily backups" note="+20% of compute" />
          <Toggle on={lb} onChange={setLb} label="Load balancer" note="+₹600 / mo" />
        </div>
      </div>

      {/* bill */}
      <div className="bg-panel border-t lg:border-t-0 lg:border-l border-white/10 p-7 lg:p-8 flex flex-col">
        <span className="font-mono text-[11px] uppercase tracking-wider text-white/45 mb-5">Monthly estimate</span>
        <BillRow label={`Compute · ${plan.name} ×${servers}`} value={inr(compute)} />
        <BillRow label={`Block storage · ${storage} GB`} value={inr(storageCost)} />
        {backups && <BillRow label="Daily backups" value={inr(backupCost)} />}
        {lb && <BillRow label="Load balancer" value={inr(lbCost)} />}
        <div className="border-t border-white/10 my-4" />
        <BillRow label="Subtotal" value={inr(subtotal)} muted />
        <BillRow label="GST 18%" value={inr(gst)} muted />
        <div className="border-t border-white/10 my-4" />
        <div className="flex items-end justify-between">
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/45">Total / month</span>
          <span className="font-display text-3xl tabular-nums">{inr(total)}</span>
        </div>
        <a href="/case-studies/pravah/auth/#signup" className="mt-6 bg-electric text-black text-center py-3 text-sm font-medium hover:bg-arc transition-colors inline-flex items-center justify-center gap-2">
          Deploy this config <ArrowRight className="w-4 h-4" />
        </a>
        <p className="font-mono text-[10px] text-white/40 mt-3 text-center">Per-second billing · cancel anytime</p>
      </div>
    </div>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="pv-eyebrow mb-4">// Pricing</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
              Honest pricing, in rupees.
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-wide text-white/45 max-w-xs">
              GST extra · no egress within India · per-second billing
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <PlanCards />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex items-end justify-between mt-16 mb-6">
            <h3 className="font-display text-2xl">Estimate your bill</h3>
            <span className="font-mono text-[11px] uppercase tracking-wide text-white/40">No card required</span>
          </div>
          <Estimator />
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 text-sm text-white/50">
            Need bare metal, GPUs or a committed-use discount?{' '}
            <a href="#" className="text-electric inline-flex items-center gap-1 hover:gap-2 transition-all">Talk to our team <ArrowRight className="w-3.5 h-3.5" /></a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
