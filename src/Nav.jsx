import { useEffect, useState } from 'react';

function SunIcon({ small }) {
  const s = small ? 10 : 12;
  return (
    <svg width={s} height={s} viewBox="0 0 12 12" aria-hidden>
      <rect x="4" y="4" width="4" height="4" fill="currentColor" />
      <rect x="3" y="3" width="1" height="1" fill="currentColor" />
      <rect x="8" y="3" width="1" height="1" fill="currentColor" />
      <rect x="3" y="8" width="1" height="1" fill="currentColor" />
      <rect x="8" y="8" width="1" height="1" fill="currentColor" />
      <rect x="5" y="0" width="2" height="1" fill="currentColor" />
      <rect x="5" y="11" width="2" height="1" fill="currentColor" />
      <rect x="0" y="5" width="1" height="2" fill="currentColor" />
      <rect x="11" y="5" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

function MoonIcon({ small }) {
  const s = small ? 10 : 12;
  return (
    <svg width={s} height={s} viewBox="0 0 12 12" aria-hidden>
      <rect x="4" y="1" width="4" height="1" fill="currentColor" />
      <rect x="2" y="2" width="2" height="1" fill="currentColor" />
      <rect x="2" y="3" width="1" height="1" fill="currentColor" />
      <rect x="1" y="3" width="1" height="6" fill="currentColor" />
      <rect x="2" y="9" width="1" height="1" fill="currentColor" />
      <rect x="2" y="10" width="2" height="1" fill="currentColor" />
      <rect x="4" y="11" width="4" height="1" fill="currentColor" />
      <rect x="7" y="10" width="2" height="1" fill="currentColor" />
      <rect x="8" y="9" width="1" height="1" fill="currentColor" />
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
        <span className="theme-toggle-thumb" style={{ transform: dark ? 'translateX(22px)' : 'translateX(0)' }}>
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
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', marginLeft: 8, letterSpacing: '0.1em' }}>STUDIO ’24</span>
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
