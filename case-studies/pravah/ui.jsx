import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

// Shared, sharp-edged primitives for Pravah Cloud. No rounded corners anywhere.

export function Logo({ withDeva = true, className = '' }) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2.5 ${className}`}>
      <Zap className="w-5 h-5 text-electric" fill="currentColor" strokeWidth={0} />
      <span className="font-display text-lg font-semibold tracking-tight text-ink">Pravah</span>
      {withDeva && <span className="font-deva text-sm text-muted hidden sm:inline">प्रवाह</span>}
    </a>
  );
}

export function Button({ as = 'a', variant = 'primary', className = '', children, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors duration-200';
  const variants = {
    primary: 'bg-electric text-black hover:bg-arc',
    light: 'bg-ink text-black hover:bg-white',
    ghost: 'text-ink/85 border border-white/15 hover:border-electric/60 hover:text-ink',
  };
  const Comp = as;
  return (
    <Comp className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  );
}

// Swappable visual slot: pass `src` later to replace the labelled placeholder.
export function Placeholder({ label, sub, src, className = '' }) {
  return (
    <div className={`pv-ph pv-ticks ${className}`}>
      {src ? (
        <img src={src} alt={label} loading="lazy" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <span className="font-mono text-[10px] tracking-[0.3em] text-electric uppercase mb-2">Image</span>
          <span className="font-mono text-xs text-muted">{label}</span>
          {sub && <span className="font-mono text-[10px] text-white/30 mt-1.5">{sub}</span>}
        </div>
      )}
    </div>
  );
}

const revealVariant = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      variants={revealVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
