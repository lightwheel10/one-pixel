import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Eye, EyeOff, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Lightning } from '../hero-odyssey.jsx';

const SITE = '/case-studies/pravah/';

function useHashRoute() {
  const get = () => {
    const h = window.location.hash.replace('#', '');
    return h === 'signup' || h === 'forgot' ? h : 'login';
  };
  const [route, setRoute] = useState(get);
  useEffect(() => {
    const on = () => setRoute(get());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}

function BrandLogo({ className = '' }) {
  return (
    <a href={SITE} className={`inline-flex items-center gap-2.5 ${className}`}>
      <Zap className="w-5 h-5 text-electric" fill="currentColor" strokeWidth={0} />
      <span className="font-display text-lg font-semibold text-ink">Pravah</span>
      <span className="font-deva text-sm text-muted">प्रवाह</span>
    </a>
  );
}

function Field({ label, labelExtra, type = 'text', name, placeholder, autoComplete, rightEl }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-white/45">{label}</span>
        {labelExtra}
      </div>
      <div className="relative">
        <input
          type={type}
          name={name}
          required
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full bg-white/[0.03] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-electric focus:outline-none transition-colors ${rightEl ? 'pr-11' : ''}`}
        />
        {rightEl}
      </div>
    </label>
  );
}

function PasswordField({ label = 'Password', labelExtra, name = 'password', autoComplete = 'current-password' }) {
  const [show, setShow] = useState(false);
  return (
    <Field
      label={label}
      labelExtra={labelExtra}
      name={name}
      type={show ? 'text' : 'password'}
      placeholder="••••••••"
      autoComplete={autoComplete}
      rightEl={(
        <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors">
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      )}
    />
  );
}

function PrimaryButton({ children }) {
  return (
    <button type="submit" className="w-full bg-electric text-black py-3 text-sm font-medium hover:bg-arc transition-colors inline-flex items-center justify-center gap-2">
      {children}
    </button>
  );
}

function OAuth() {
  return (
    <div className="space-y-3">
      <button type="button" className="w-full border border-white/15 py-3 text-sm text-white/85 hover:border-electric/50 transition-colors">Continue with Google</button>
      <button type="button" className="w-full border border-white/15 py-3 text-sm text-white/85 hover:border-electric/50 transition-colors">Continue with GitHub</button>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 my-6">
      <span className="h-px flex-1 bg-white/10" />
      <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">or</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function Done({ title, body, children }) {
  return (
    <div>
      <div className="w-12 h-12 border border-electric/30 bg-electric/10 flex items-center justify-center">
        <Check className="w-6 h-6 text-electric" />
      </div>
      <h1 className="font-display text-3xl tracking-tight mt-6">{title}</h1>
      <p className="text-white/55 text-sm mt-3 leading-relaxed">{body}</p>
      {children}
    </div>
  );
}

function Login() {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <Done title="You&rsquo;re signed in" body="This is a OnePixel demo, so no real session was created.">
        <a href={SITE} className="inline-flex items-center gap-2 mt-7 text-electric hover:gap-3 transition-all text-sm">Go to console <ArrowRight className="w-4 h-4" /></a>
      </Done>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <h1 className="font-display text-3xl tracking-tight">Sign in to Pravah</h1>
      <p className="text-white/50 text-sm mt-2">Welcome back. Pick up where you left off.</p>
      <div className="space-y-4 mt-8">
        <Field label="Email" type="email" name="email" placeholder="you@company.in" autoComplete="email" />
        <PasswordField labelExtra={<a href="#forgot" className="font-mono text-[11px] text-electric hover:underline">Forgot?</a>} />
      </div>
      <div className="mt-6"><PrimaryButton>Sign in <ArrowRight className="w-4 h-4" /></PrimaryButton></div>
      <Divider />
      <OAuth />
      <p className="text-sm text-white/50 mt-8 text-center">
        New to Pravah? <a href="#signup" className="text-electric hover:underline">Create an account</a>
      </p>
    </form>
  );
}

function Signup() {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <Done title="Account created" body="A OnePixel demo, so nothing was really provisioned. On the real thing, your console would be ready now.">
        <a href="#login" className="inline-flex items-center gap-2 mt-7 text-electric hover:gap-3 transition-all text-sm">Continue to sign in <ArrowRight className="w-4 h-4" /></a>
      </Done>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <h1 className="font-display text-3xl tracking-tight">Create your account</h1>
      <p className="text-white/50 text-sm mt-2">Get ₹500 in free credit. No card required.</p>
      <div className="space-y-4 mt-8">
        <Field label="Full name" name="name" placeholder="Ananya Rao" autoComplete="name" />
        <Field label="Work email" type="email" name="email" placeholder="you@company.in" autoComplete="email" />
        <PasswordField label="Password" autoComplete="new-password" />
      </div>
      <div className="mt-6"><PrimaryButton>Create account <ArrowRight className="w-4 h-4" /></PrimaryButton></div>
      <p className="text-[11px] text-white/35 mt-3 leading-relaxed">
        By creating an account you agree to the <a href="#" className="text-white/55 hover:text-white underline">Terms</a> and <a href="#" className="text-white/55 hover:text-white underline">Privacy Policy</a>.
      </p>
      <Divider />
      <OAuth />
      <p className="text-sm text-white/50 mt-8 text-center">
        Already have an account? <a href="#login" className="text-electric hover:underline">Sign in</a>
      </p>
    </form>
  );
}

function Forgot() {
  const [done, setDone] = useState(false);
  if (done) {
    return (
      <Done title="Check your inbox" body="If an account exists for that email, a password reset link is on its way. The link expires in 30 minutes.">
        <a href="#login" className="inline-flex items-center gap-2 mt-7 text-electric hover:gap-3 transition-all text-sm"><ArrowLeft className="w-4 h-4" /> Back to sign in</a>
      </Done>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <h1 className="font-display text-3xl tracking-tight">Reset your password</h1>
      <p className="text-white/50 text-sm mt-2">Enter your email and we&rsquo;ll send a reset link.</p>
      <div className="space-y-4 mt-8">
        <Field label="Email" type="email" name="email" placeholder="you@company.in" autoComplete="email" />
      </div>
      <div className="mt-6"><PrimaryButton>Send reset link <ArrowRight className="w-4 h-4" /></PrimaryButton></div>
      <p className="text-sm text-white/50 mt-8 text-center">
        Remembered it? <a href="#login" className="text-electric hover:underline">Sign in</a>
      </p>
    </form>
  );
}

const features = [
  'Deploy your first server in under a minute',
  'Five Indian regions, data that stays home',
  'Honest rupee pricing, no egress games',
];

export default function AuthApp() {
  const route = useHashRoute();
  const Form = route === 'signup' ? Signup : route === 'forgot' ? Forgot : Login;

  return (
    <div className="min-h-screen bg-base text-ink flex flex-col">
      {/* OnePixel chrome */}
      <div className="h-8 shrink-0 flex items-center gap-3 px-4 sm:px-6 lg:px-8 border-b border-white/5 text-[11px] font-mono uppercase tracking-wider text-white/45">
        <span className="hidden sm:block truncate">A OnePixel sample site · this is a demo sign-in</span>
        <a href="/" className="ml-auto inline-flex items-center gap-1.5 text-white/70 hover:text-electric transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to OnePixel
        </a>
      </div>

      <div className="flex-1 grid lg:grid-cols-2">
        {/* Brand panel */}
        <div className="relative hidden lg:flex flex-col justify-between p-12 border-r border-white/10 overflow-hidden pv-dots">
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.2 }} aria-hidden="true">
            <Lightning hue={248} bolts={2} speed={1.2} intensity={0.24} size={2} />
          </div>
          <div className="relative z-10"><BrandLogo /></div>
          <div className="relative z-10">
            <h2 className="font-display text-4xl leading-tight tracking-tight">
              India&rsquo;s cloud,<br />built for <span className="text-electric">builders</span>.
            </h2>
            <ul className="space-y-3 mt-8">
              {features.map((t) => (
                <li key={t} className="flex items-center gap-3 text-white/60 text-sm">
                  <Check className="w-4 h-4 text-electric shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-white/40">
            <span>console.pravah.cloud</span>
            <span className="inline-flex items-center gap-2"><i className="w-1.5 h-1.5 bg-emerald-400 inline-block" /> 5 regions live</span>
          </div>
        </div>

        {/* Form panel */}
        <div className="flex items-center justify-center px-6 py-14 sm:p-12">
          <div className="w-full max-w-sm">
            <BrandLogo className="lg:hidden mb-10" />
            <motion.div key={route} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
              <Form />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
