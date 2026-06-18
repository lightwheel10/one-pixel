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
  // Paras: the two dark accent pixels use currentColor (var(--ink)) instead of #0A0A0A
  // so they don't vanish on the dark nav; the coral/mint pixels stay fixed.
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden>
      <rect x="0" y="3" width="13" height="13" fill="currentColor" />
      <rect x="14" y="4" width="3" height="3" fill="#FF6B47" />
      <rect x="18" y="3" width="2" height="2" fill="#C7DDD8" />
      <rect x="14" y="9" width="2" height="2" fill="currentColor" />
      <rect x="17" y="10" width="3" height="3" fill="#FF6B47" />
      <rect x="13" y="14" width="2" height="2" fill="#FF6B47" />
      <rect x="15" y="17" width="2" height="2" fill="#C7DDD8" />
      <rect x="11" y="18" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

export function Nav({ dark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  // Paras: mobile dropdown open/closed. Desktop vs mobile show/hide is now pure CSS
  // (media queries), so the old `wide`/resize-listener logic is gone.
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className="nav" style={{ borderBottomColor: scrolled ? 'var(--line)' : 'transparent' }}>
      <a href="#top" className="nav-logo">
        <PixelMark />
        <span>OnePixel</span>
        <span className="nav-est">EST. ’24</span>
      </a>
      {/* Paras: desktop inline links — CSS hides these < 700px in favour of the dropdown. */}
      <div className="nav-links">
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#faq">FAQ</a>
      </div>
      <div className="nav-right">
        <ThemeToggle dark={dark} onToggle={onToggleTheme} />
        <a href="#contact" className="nav-cta">
          Start a project <span className="arr">→</span>
        </a>
        {/* Paras: hamburger — CSS shows it only < 700px; toggles the dropdown below. */}
        <button
          className="nav-burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`nav-burger-box ${menuOpen ? 'open' : ''}`} aria-hidden>
            <span></span><span></span>
          </span>
        </button>
      </div>
      {/* Paras: mobile dropdown — restores the section links (hidden on mobile) plus the
          CTA; tapping any item closes it. CSS reveals this only < 700px. */}
      <div className={`nav-mobile ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
        <a href="#work">Work</a>
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#faq">FAQ</a>
        <a href="#contact" className="nav-mobile-cta">Start a project <span className="arr">→</span></a>
      </div>
    </nav>
  );
}
