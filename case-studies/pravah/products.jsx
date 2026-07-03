import React from 'react';
import { Cpu, HardDrive, Database, Network, Save } from 'lucide-react';
import { Reveal, Placeholder } from './ui.jsx';

/* ----- small sharp technical diagrams, one per product ----- */


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

            {/* Facility image */}
            <div className="lg:col-span-2 bg-base">
              <Placeholder label="Pravah data centre, Mumbai" src="/case-studies/pravah/facility-mumbai.webp" className="h-full min-h-[210px]" />
            </div>

            {/* Bare Metal */}
            <div className="lg:col-span-2 bg-base p-7 flex flex-col">
              <CellHead icon={Cpu} name="Bare Metal" price="from ₹6,999/mo" />
              <div className="pv-image-slab mt-5 aspect-[16/10]">
                <img src="/case-studies/pravah/images/bare-metal-racks.webp" alt="Bare metal rack servers inside a Pravah data centre" loading="lazy" decoding="async" />
              </div>
              <img
                src="/case-studies/pravah/images/bare-metal-diagram.svg"
                alt="Bare metal host diagram showing CPU, memory, NVMe RAID, and 10G network"
                className="pv-card-diagram mt-5"
                loading="lazy"
                decoding="async"
              />
              <p className="font-mono text-[11px] uppercase tracking-wide text-white/40 mt-auto pt-5">Ryzen &amp; EPYC · NVMe RAID</p>
            </div>

            {/* Storage */}
            <div className="lg:col-span-2 bg-base p-7 flex flex-col">
              <CellHead icon={HardDrive} name="Block & Object Storage" />
              <div className="pv-image-slab mt-5 aspect-[16/10]">
                <img src="/case-studies/pravah/images/storage-array.webp" alt="NVMe storage array with live status lights" loading="lazy" decoding="async" />
              </div>
              <img
                src="/case-studies/pravah/images/storage-diagram.svg"
                alt="Storage diagram showing app data flowing into block volumes and object buckets"
                className="pv-card-diagram mt-5"
                loading="lazy"
                decoding="async"
              />
              <p className="font-mono text-[11px] uppercase tracking-wide text-white/40 mt-auto pt-5">11 nines · from ₹3/GB</p>
            </div>

            {/* Databases */}
            <div className="lg:col-span-3 bg-base p-7 flex flex-col">
              <CellHead icon={Database} name="Managed Databases" />
              <div className="pv-image-slab mt-5 aspect-[16/10]">
                <img src="/case-studies/pravah/images/managed-databases.webp" alt="Managed database cluster hardware with high-availability storage" loading="lazy" decoding="async" />
              </div>
              <p className="font-mono text-[11px] uppercase tracking-wide text-white/40 mt-auto pt-3">Postgres · MySQL · Redis · HA</p>
            </div>

            {/* Backups */}
            <div className="lg:col-span-3 bg-base p-7 flex flex-col">
              <CellHead icon={Save} name="Backups & Snapshots" />
              <div className="pv-image-slab mt-5 aspect-[16/10]">
                <img src="/case-studies/pravah/images/backups-snapshots.webp" alt="Backup and snapshot storage arrays in a Pravah data centre" loading="lazy" decoding="async" />
              </div>
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
                  <img
                    src="/case-studies/pravah/images/network-topology.svg"
                    alt="Networking topology from internet to load balancer, servers, and Postgres"
                    className="pv-network-diagram"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
