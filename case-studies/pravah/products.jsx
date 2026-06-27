import React from 'react';
import { Server, Cpu, HardDrive, Database, Network, Save, ArrowRight } from 'lucide-react';
import { Reveal, Placeholder } from './ui.jsx';

/* ----- small sharp technical diagrams, one per product ----- */

const ladder = [
  { n: 'Spark', s: '2 vCPU · 4 GB', p: '₹399', w: 28 },
  { n: 'Surge', s: '4 vCPU · 8 GB', p: '₹799', w: 48, hot: true },
  { n: 'Storm', s: '8 vCPU · 16 GB', p: '₹1,599', w: 72 },
  { n: 'Bolt', s: '16 vCPU · 32 GB', p: '₹3,199', w: 100 },
];

function PlanLadder() {
  return (
    <div className="mt-6 border border-white/10">
      {ladder.map((p) => (
        <div
          key={p.n}
          className={`flex items-center gap-4 px-4 py-3 border-b border-white/10 last:border-b-0 transition-colors hover:bg-white/[0.03] ${p.hot ? 'bg-electric/[0.06]' : ''}`}
        >
          <span className="w-12 shrink-0 font-display text-sm">{p.n}</span>
          <div className="flex-1 h-1.5 bg-white/[0.06] relative">
            <div className="absolute inset-y-0 left-0 bg-electric/60" style={{ width: `${p.w}%` }} />
          </div>
          <span className="hidden sm:block w-28 shrink-0 text-right font-mono text-[11px] text-white/45">{p.s}</span>
          <span className="w-16 shrink-0 text-right font-mono text-sm text-electric">{p.p}</span>
        </div>
      ))}
    </div>
  );
}

function RackUnit() {
  return (
    <svg viewBox="0 0 140 44" className="w-full mt-5" aria-hidden="true">
      <rect x="0.5" y="0.5" width="139" height="43" fill="none" stroke="rgba(255,255,255,0.14)" />
      {Array.from({ length: 9 }).map((_, i) => (
        <rect key={i} x={9 + i * 9} y="9" width="5.5" height="26" fill="rgba(91,140,255,0.16)" stroke="rgba(91,140,255,0.4)" strokeWidth="0.5" />
      ))}
      <rect x="116" y="9" width="15" height="6" fill="#5b8cff" />
      <rect x="116" y="19" width="15" height="3" fill="rgba(255,255,255,0.18)" />
      <rect x="116" y="25" width="15" height="3" fill="rgba(255,255,255,0.18)" />
    </svg>
  );
}

function StorageStack() {
  return (
    <div className="mt-5 flex items-end gap-1.5 h-14" aria-hidden="true">
      {[38, 52, 66, 80, 100].map((h, i) => (
        <div key={i} className="flex-1 border border-electric/30 bg-electric/10" style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

function ReplicaSet() {
  return (
    <svg viewBox="0 0 140 60" className="w-full mt-5" aria-hidden="true">
      <line x1="70" y1="18" x2="34" y2="44" stroke="#5b8cff" strokeOpacity="0.45" strokeWidth="0.7" className="pv-link" />
      <line x1="70" y1="18" x2="106" y2="44" stroke="#5b8cff" strokeOpacity="0.45" strokeWidth="0.7" className="pv-link" />
      <rect x="58" y="6" width="24" height="14" fill="rgba(91,140,255,0.22)" stroke="#5b8cff" strokeWidth="0.7" />
      <rect x="22" y="44" width="24" height="12" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" />
      <rect x="94" y="44" width="24" height="12" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.7" />
    </svg>
  );
}

function SnapshotTimeline() {
  return (
    <div className="mt-7 mb-1 relative h-4" aria-hidden="true">
      <div className="absolute top-1/2 left-0 right-0 h-px bg-white/15" />
      {[8, 24, 40, 56, 72].map((x, i) => (
        <span key={i} className="absolute top-1/2 -translate-y-1/2 w-px h-2.5 bg-white/30" style={{ left: `${x}%` }} />
      ))}
      <span className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-electric" style={{ left: '88%' }} />
    </div>
  );
}

const topoBox = 'border border-white/15 px-3 py-2 font-mono text-[10px] text-white/70 whitespace-nowrap';
function Conn() {
  return <span className="pv-current w-5 sm:w-8 shrink-0" aria-hidden="true" />;
}
function Topology() {
  return (
    <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto py-2" aria-hidden="true">
      <span className={topoBox}>Internet</span>
      <Conn />
      <span className={`${topoBox} !text-electric !border-electric/40`}>Load balancer</span>
      <Conn />
      <div className="flex flex-col gap-1.5">
        <span className={topoBox}>srv-1</span>
        <span className={topoBox}>srv-2</span>
        <span className={topoBox}>srv-3</span>
      </div>
      <Conn />
      <span className={topoBox}>Postgres</span>
    </div>
  );
}

function CellHead({ icon: Icon, name, price }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 shrink-0 bg-electric/10 border border-electric/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-electric" />
        </div>
        <h3 className="font-display text-lg">{name}</h3>
      </div>
      {price && <span className="font-mono text-[11px] text-electric whitespace-nowrap mt-1">{price}</span>}
    </div>
  );
}

export function Products() {
  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="pv-eyebrow mb-4">// Products</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight max-w-xl">
              One platform. Every layer of your stack.
            </h2>
            <p className="text-white/55 max-w-md leading-relaxed">
              Compute, storage, data and networking that already speak to each other. Provision from the
              console, the API or Terraform.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-px bg-white/10 border border-white/10 mt-12">
            {/* Featured: Cloud Servers */}
            <div className="lg:col-span-4 lg:row-span-2 bg-base p-7 flex flex-col">
              <CellHead icon={Server} name="Cloud Servers" price="from ₹399/mo" />
              <p className="text-white/55 text-sm mt-4 max-w-lg leading-relaxed">
                Virtual servers on shared or dedicated vCPU, NVMe everywhere. Resize, snapshot and clone in
                seconds — pick a size and you are live in under a minute.
              </p>
              <PlanLadder />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-auto pt-6">
                <a href="/case-studies/pravah/auth/#signup" className="inline-flex items-center gap-2 bg-electric text-black px-5 py-2.5 text-sm font-medium hover:bg-arc transition-colors">
                  Deploy a server <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#pricing" className="font-mono text-[11px] uppercase tracking-wide text-white/55 hover:text-white transition-colors">Compare all plans</a>
              </div>
            </div>

            {/* Facility image */}
            <div className="lg:col-span-2 bg-base">
              <Placeholder label="Mumbai · DC1" sub="facility photo" className="h-full min-h-[210px]" />
            </div>

            {/* Bare Metal */}
            <div className="lg:col-span-2 bg-base p-7 flex flex-col">
              <CellHead icon={Cpu} name="Bare Metal" price="from ₹6,999/mo" />
              <RackUnit />
              <p className="font-mono text-[11px] uppercase tracking-wide text-white/40 mt-auto pt-5">Ryzen &amp; EPYC · NVMe RAID</p>
            </div>

            {/* Storage */}
            <div className="lg:col-span-2 bg-base p-7 flex flex-col">
              <CellHead icon={HardDrive} name="Block & Object Storage" />
              <StorageStack />
              <p className="font-mono text-[11px] uppercase tracking-wide text-white/40 mt-auto pt-5">11 nines · from ₹3/GB</p>
            </div>

            {/* Databases */}
            <div className="lg:col-span-2 bg-base p-7 flex flex-col">
              <CellHead icon={Database} name="Managed Databases" />
              <ReplicaSet />
              <p className="font-mono text-[11px] uppercase tracking-wide text-white/40 mt-auto pt-3">Postgres · MySQL · Redis · HA</p>
            </div>

            {/* Backups */}
            <div className="lg:col-span-2 bg-base p-7 flex flex-col">
              <CellHead icon={Save} name="Backups & Snapshots" />
              <SnapshotTimeline />
              <p className="font-mono text-[11px] uppercase tracking-wide text-white/40 mt-auto pt-5">Cross-region · from ₹0.50/GB</p>
            </div>

            {/* Networking — full width */}
            <div className="lg:col-span-6 bg-base p-7">
              <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                <div className="lg:w-1/3">
                  <CellHead icon={Network} name="Networking" price="included" />
                  <p className="text-white/55 text-sm mt-4 leading-relaxed">
                    Private networks, load balancers, floating IPs and firewalls, wired across your whole
                    fleet with a built-in DDoS shield.
                  </p>
                </div>
                <div className="lg:flex-1 lg:border-l border-white/10 lg:pl-8">
                  <Topology />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
