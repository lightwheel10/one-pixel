import React from 'react';
import { Shield } from 'lucide-react';
import { Lightning } from './hero-odyssey.jsx';
import { Reveal } from './ui.jsx';

const regions = [
  { code: 'DEL-1', city: 'Delhi NCR', coord: '28.61° N · 77.21° E', az: 3, lat: 'p50 14ms', x: 40, y: 15 },
  { code: 'BOM-1', city: 'Mumbai', coord: '19.08° N · 72.88° E', az: 4, lat: 'p50 6ms', x: 20, y: 52 },
  { code: 'HYD-1', city: 'Hyderabad', coord: '17.39° N · 78.49° E', az: 3, lat: 'p50 11ms', x: 46, y: 58 },
  { code: 'BLR-1', city: 'Bengaluru', coord: '12.97° N · 77.59° E', az: 3, lat: 'p50 9ms', x: 40, y: 82 },
  { code: 'MAA-1', city: 'Chennai', coord: '13.08° N · 80.27° E', az: 2, lat: 'p50 12ms', x: 58, y: 82 },
];
const stats = [
  ['5', 'Regions'], ['15', 'Availability zones'], ['40 Tbps', 'Backbone'], ['100%', 'India-hosted'],
];

function RegionMap() {
  return (
    <div className="relative w-full h-full min-h-[420px] overflow-hidden border border-white/12 bg-panel">
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-2.5 border-b border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/45">
        <span className="text-electric">Pravah backbone</span>
        <span className="inline-flex items-center gap-1.5 text-green-400"><i className="w-1.5 h-1.5 bg-green-400 inline-block" /> Live</span>
      </div>

      <img
        src="/case-studies/pravah/region-map.webp"
        alt="Pravah private fibre backbone connecting five Indian regions"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute bottom-0 inset-x-0 z-20 flex items-center justify-between px-4 py-2.5 border-t border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/45">
        <span className="inline-flex items-center gap-1.5"><i className="w-1.5 h-1.5 bg-electric inline-block" /> Region</span>
        <span>Private fibre backbone</span>
      </div>
    </div>
  );
}

export function Regions() {
  return (
    <section id="regions" className="relative overflow-hidden border-y border-white/10 py-24 px-4 sm:px-6 lg:px-8 pv-dots">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.16 }} aria-hidden="true">
        <Lightning hue={248} bolts={2} speed={1.2} intensity={0.168} size={2} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <Reveal>
          <p className="pv-eyebrow mb-4">// The network</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
              Five regions.<br />One country.
            </h2>
            <p className="text-white/55 max-w-md leading-relaxed">
              Every Pravah region sits inside India, wired to the others over our own fibre backbone. Your
              data is never copied across a border, so residency and compliance are the default.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12 items-stretch">
          <Reveal className="lg:col-span-7 min-w-0">
            <RegionMap />
          </Reveal>

          <Reveal delay={0.05} className="lg:col-span-5 min-w-0 flex flex-col gap-6">
            <div className="border border-white/12 bg-panel p-6">
              <div className="pv-image-slab mb-6 aspect-[16/9]">
                <img src="/case-studies/pravah/images/india-network-ops.webp" alt="Pravah network operations room monitoring India-hosted regions" loading="lazy" decoding="async" />
              </div>
              <Shield className="w-6 h-6 text-electric" />
              <h3 className="font-display text-xl mt-4">Your data stays in India</h3>
              <p className="text-white/55 text-sm mt-2 leading-relaxed">
                Owned-and-operated facilities, not reseller racks. MeitY-ready, with audited access and
                in-country backups, so compliance teams can say yes faster.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 flex-1">
              {stats.map(([v, l]) => (
                <div key={l} className="bg-base px-6 py-7 flex flex-col justify-center">
                  <div className="font-display text-3xl text-white">{v}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/45 mt-2">{l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10 mt-6">
          {regions.map((r, i) => (
            <div key={r.code} className={`group bg-base p-5 hover:bg-panel transition-colors${i === regions.length - 1 ? ' col-span-2 lg:col-span-1' : ''}`}>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-electric">{r.code}</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wide text-white/40">
                  <i className="w-1.5 h-1.5 bg-green-400 inline-block" /> Live
                </span>
              </div>
              <div className="font-display text-lg mt-3">{r.city}</div>
              <div className="font-mono text-[10px] text-white/40 mt-1.5">{r.coord}</div>
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-white/10 font-mono text-[10px] uppercase tracking-wide text-white/45">
                <span>{r.az} AZ</span><span>{r.lat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
