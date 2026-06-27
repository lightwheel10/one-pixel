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
const links = [
  ['DEL-1', 'BOM-1'], ['DEL-1', 'HYD-1'], ['BOM-1', 'HYD-1'],
  ['BOM-1', 'BLR-1'], ['HYD-1', 'BLR-1'], ['HYD-1', 'MAA-1'], ['BLR-1', 'MAA-1'],
];
const byId = Object.fromEntries(regions.map((r) => [r.code, r]));
const latencyLabels = [
  ['DEL-1', 'BOM-1', '18ms'], ['BOM-1', 'HYD-1', '11ms'], ['HYD-1', 'BLR-1', '6ms'], ['BLR-1', 'MAA-1', '5ms'],
];
const stats = [
  ['5', 'Regions'], ['15', 'Availability zones'], ['40 Tbps', 'Backbone'], ['100%', 'India-hosted'],
];

function RegionMap() {
  return (
    <div className="relative w-full h-full min-h-[420px] border border-white/12 bg-panel pv-dots pv-ticks">
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 py-2.5 border-b border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/45">
        <span className="text-electric">Pravah backbone</span>
        <span className="inline-flex items-center gap-1.5 text-green-400"><i className="w-1.5 h-1.5 bg-green-400 inline-block" /> Live</span>
      </div>

      <svg viewBox="0 0 80 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        {[18, 36, 54, 72, 90].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="80" y2={y} stroke="rgba(255,255,255,0.045)" strokeWidth="0.3" />
        ))}
        {[20, 40, 60].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="100" stroke="rgba(255,255,255,0.045)" strokeWidth="0.3" />
        ))}
        {links.map(([a, b]) => (
          <line key={a + b} x1={byId[a].x} y1={byId[a].y} x2={byId[b].x} y2={byId[b].y}
            stroke="#5b8cff" strokeOpacity="0.35" strokeWidth="0.4" className="pv-link" />
        ))}
      </svg>

      {regions.map((r) => {
        const labelLeft = r.code === 'BLR-1';
        return (
          <div key={r.code} className="absolute" style={{ left: `${r.x}%`, top: `${r.y}%`, transform: 'translate(-50%,-50%)' }}>
            <span className="pv-node block w-2 h-2 bg-electric" />
            <span className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] text-electric ${labelLeft ? 'right-3.5 text-right' : 'left-3.5'}`}>
              {r.code}
            </span>
          </div>
        );
      })}

      {latencyLabels.map(([a, b, t]) => {
        const mx = (byId[a].x + byId[b].x) / 2;
        const my = (byId[a].y + byId[b].y) / 2;
        return (
          <span key={a + b} className="absolute -translate-x-1/2 -translate-y-1/2 font-mono text-[9px] text-white/35 px-1 bg-panel/70"
            style={{ left: `${mx}%`, top: `${my}%` }}>{t}</span>
        );
      })}

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
        <Lightning hue={248} bolts={2} speed={1.2} intensity={0.24} size={2} />
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
          {regions.map((r) => (
            <div key={r.code} className="group bg-base p-5 hover:bg-panel transition-colors">
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
