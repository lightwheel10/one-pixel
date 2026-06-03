import { useEffect, useState } from 'react';

function SunIcon({ small }) {
  const s = small ? 13 : 15;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ small }) {
  const s = small ? 13 : 15;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
    </svg>
  );
}

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="theme-toggle"
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb" style={{ transform: dark ? 'translateX(28px)' : 'translateX(0)' }}>
          {dark ? <MoonIcon /> : <SunIcon />}
        </span>
        <span className="theme-toggle-icon left" aria-hidden><SunIcon small /></span>
        <span className="theme-toggle-icon right" aria-hidden><MoonIcon small /></span>
      </span>
    </button>
  );
}

export function PixelMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden>
      <rect x="0" y="3" width="13" height="13" fill="currentColor" />
      <rect x="14" y="4" width="3" height="3" fill="#FF6B47" />
      <rect x="18" y="3" width="2" height="2" fill="#C7DDD8" />
      <rect x="14" y="9" width="2" height="2" fill="#0A0A0A" />
      <rect x="17" y="10" width="3" height="3" fill="#FF6B47" />
      <rect x="13" y="14" width="2" height="2" fill="#FF6B47" />
      <rect x="15" y="17" width="2" height="2" fill="#C7DDD8" />
      <rect x="11" y="18" width="2" height="2" fill="#0A0A0A" />
    </svg>
  );
}

export function Nav({ dark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [wide, setWide] = useState(() => typeof window === 'undefined' ? true : window.innerWidth >= 700);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setWide(window.innerWidth >= 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return (
    <nav className="nav" style={{ borderBottomColor: scrolled ? 'var(--line)' : 'transparent' }}>
      <a href="#top" className="nav-logo">
        <PixelMark />
        <span>OnePixel</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', marginLeft: 8, letterSpacing: '0.1em' }}>EST. ’24</span>
      </a>
      <div className="nav-links" style={{ display: wide ? 'flex' : 'none' }}>
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#faq">FAQ</a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <ThemeToggle dark={dark} onToggle={onToggleTheme} />
        <a href="#contact" className="nav-cta">
          Start a project <span className="arr">→</span>
        </a>
      </div>
    </nav>
  );
}
