import React, { useState } from 'react';
import {
  Terminal, Code, Boxes, Webhook, Plus, ArrowUpRight,
  Server, Database, HardDrive, Network, Save, Settings,
} from 'lucide-react';
import { Lightning } from './hero-odyssey.jsx';
import { Reveal } from './ui.jsx';

/* ---- code tabs: one create-a-server flow across every interface ---- */
const tabs = [
  {
    id: 'cli', label: 'CLI', lines: [
      '$ pravah server create \\',
      '    --name web-01 \\',
      '    --plan general-purpose \\',
      '    --region bom-1 \\',
      '    --image ubuntu-24.04',
      '',
      '✓ web-01 · 103.21.84.12 · ready in 38s',
      '',
      '$ pravah ssh web-01',
    ],
  },
  {
    id: 'tf', label: 'Terraform', lines: [
      'resource "pravah_server" "web" {',
      '  name     = "web-01"',
      '  plan     = "general-purpose"',
      '  region   = "bom-1"',
      '  image    = "ubuntu-24.04"',
      '  ssh_keys = [pravah_ssh_key.deploy.id]',
      '}',
      '',
      'output "ipv4" {',
      '  value = pravah_server.web.ipv4',
      '}',
    ],
  },
  {
    id: 'api', label: 'API', lines: [
      '$ curl -X POST https://api.pravah.cloud/v1/servers \\',
      '    -H "Authorization: Bearer $PRAVAH_TOKEN" \\',
      '    -d \'{"name":"web-01","plan":"general-purpose","region":"bom-1"}\'',
      '',
      '# 201 Created',
      '# { "id": "srv_7f3", "ipv4": "103.21.84.12" }',
    ],
  },
  {
    id: 'go', label: 'Go SDK', lines: [
      'client := pravah.New(os.Getenv("PRAVAH_TOKEN"))',
      '',
      'srv, err := client.Servers.Create(ctx, &pravah.ServerCreate{',
      '    Name:   "web-01",',
      '    Plan:   "general-purpose",',
      '    Region: "bom-1",',
      '    Image:  "ubuntu-24.04",',
      '})',
      'if err != nil {',
      '    log.Fatal(err)',
      '}',
      'fmt.Println(srv.IPv4)',
    ],
  },
];

function colorize(text) {
  // Highlight quoted strings only — the code text is preserved exactly.
  return text.split(/("[^"]*"|'[^']*')/g).map((p, i) =>
    p && (p[0] === '"' || p[0] === "'")
      ? <span key={i} className="text-sky-300/90">{p}</span>
      : <span key={i}>{p}</span>,
  );
}

function renderLine(line) {
  if (line === '') return ' ';
  const t = line.trimStart();
  if (t.startsWith('#') || t.startsWith('//')) return <span className="text-white/35">{line}</span>;
  if (t.startsWith('✓')) return <span className="text-emerald-400">{line}</span>;
  if (line.startsWith('$')) return <><span className="text-electric">$</span>{colorize(line.slice(1))}</>;
  return <>{colorize(line)}</>;
}

function CodeTabs() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  return (
    <div className="border border-white/12 bg-[#080a11] flex flex-col h-full">
      <div className="flex border-b border-white/10">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(i)}
            className={`px-4 py-3 text-xs font-mono uppercase tracking-wide border-r border-white/10 transition-colors ${i === active ? 'text-electric bg-electric/[0.06]' : 'text-white/45 hover:text-white/75'}`}
          >
            {t.label}
          </button>
        ))}
        <span className="ml-auto hidden sm:block px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-white/30">create a server</span>
      </div>
      <div className="p-5 font-mono text-[12px] leading-6 text-white/85 overflow-x-auto flex-1" style={{ fontVariantLigatures: 'none' }}>
        {tab.lines.map((line, i) => (
          <div key={i} className="whitespace-pre">{renderLine(line)}</div>
        ))}
      </div>
      <a href="#" className="flex items-center justify-between px-5 py-3 border-t border-white/10 font-mono text-[11px] uppercase tracking-wide text-white/55 hover:text-white transition-colors">
        Read the docs <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  );
}

const sidebarIcons = [Server, Database, HardDrive, Network, Save, Settings];
const servers = [
  { name: 'web-01', region: 'BOM-1', plan: 'General Purpose', status: 'Running', ip: '103.21.84.12' },
  { name: 'api-01', region: 'BOM-1', plan: 'Performance', status: 'Running', ip: '103.21.84.31' },
  { name: 'worker-1', region: 'MAA-1', plan: 'Basic', status: 'Running', ip: '103.27.12.9' },
  { name: 'db-01', region: 'DEL-1', plan: 'Performance', status: 'Running', ip: '103.41.6.55' },
  { name: 'cache-1', region: 'BLR-1', plan: 'Basic', status: 'Provisioning', ip: 'assigning' },
];

function ConsoleMock() {
  return (
    <div className="border border-white/12 bg-[#070912] h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="w-2.5 h-2.5 bg-white/15" /><i className="w-2.5 h-2.5 bg-white/15" /><i className="w-2.5 h-2.5 bg-white/15" />
        </span>
        <span className="ml-2 font-mono text-[11px] text-white/40">console.pravah.cloud</span>
        <span className="ml-auto font-mono text-[10px] text-white/45 inline-flex items-center gap-1.5"><i className="w-1.5 h-1.5 bg-emerald-400 inline-block" /> 4 running</span>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="w-12 shrink-0 border-r border-white/10 flex flex-col items-center py-3 gap-1">
          {sidebarIcons.map((Icon, i) => (
            <span key={i} className={`w-9 h-9 flex items-center justify-center ${i === 0 ? 'bg-electric/15 text-electric' : 'text-white/30'}`}>
              <Icon className="w-4 h-4" />
            </span>
          ))}
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
            <div className="font-display text-base">Servers</div>
            <span className="inline-flex items-center gap-1.5 bg-electric text-black px-3 py-1.5 text-[11px] font-medium">
              <Plus className="w-3.5 h-3.5" /> Create server
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full min-w-[520px] text-left border-collapse">
              <thead>
                <tr className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  <th className="font-normal px-4 py-2.5">Name</th>
                  <th className="font-normal px-4 py-2.5">Region</th>
                  <th className="font-normal px-4 py-2.5">Plan</th>
                  <th className="font-normal px-4 py-2.5">Status</th>
                  <th className="font-normal px-4 py-2.5">IPv4</th>
                </tr>
              </thead>
              <tbody>
                {servers.map((s) => (
                  <tr key={s.name} className="border-t border-white/10">
                    <td className="px-4 py-3 font-mono text-[12px] text-white/85">{s.name}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-white/55">{s.region}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-white/55">{s.plan}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide ${s.status === 'Running' ? 'text-emerald-400' : 'text-amber-400'}`}>
                        <i className={`w-1.5 h-1.5 inline-block ${s.status === 'Running' ? 'bg-emerald-400' : 'bg-amber-400'}`} /> {s.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-white/55">{s.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-3 border-t border-white/10 font-mono text-[10px] uppercase tracking-wider text-white/35">
            5 servers · 4 regions · per-second billing
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  { icon: Terminal, title: 'One CLI', body: 'Drive every resource from a single pravah binary.' },
  { icon: Code, title: 'Typed SDKs', body: 'First-party Go, Python, Node and Rust libraries.' },
  { icon: Boxes, title: 'Terraform provider', body: 'Declare and version your whole fleet as code.' },
  { icon: Webhook, title: 'Webhooks', body: 'Subscribe to lifecycle events in real time.' },
];

export function Console() {
  return (
    <section id="console" className="relative overflow-hidden border-y border-white/10 py-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.14 }} aria-hidden="true">
        <Lightning hue={248} bolts={2} speed={1.1} intensity={0.154} size={2} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <Reveal>
          <p className="pv-eyebrow mb-4">// Console & API</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight">
              Click it, or script it.
            </h2>
            <p className="text-white/55 max-w-md leading-relaxed">
              A clean console for when you want to see things, and one API behind the CLI, SDKs and
              Terraform for when you want to automate them. Same actions, either way.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-12 items-stretch">
          <Reveal className="lg:col-span-7 min-w-0">
            <ConsoleMock />
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-5 min-w-0">
            <CodeTabs />
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mt-6">
          {features.map((f) => (
            <div key={f.title} className="bg-base p-6">
              <f.icon className="w-5 h-5 text-electric" />
              <h3 className="font-display text-base mt-4">{f.title}</h3>
              <p className="text-white/55 text-sm mt-1.5 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
