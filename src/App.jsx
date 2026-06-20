import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Loader } from './Loader.jsx';
import { Nav } from './Nav.jsx';
import { Hero } from './Hero.jsx';
import { Marquee, Work } from './Work.jsx';
import { Services, Process } from './ServicesProcess.jsx';
import { Testimonials, FAQ, Contact, Hosting } from './Rest.jsx';
import { StartForm } from './StartForm.jsx';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      // Paras: dark is the default theme on first open; a returning visitor's
      // saved choice is still respected.
      const saved = localStorage.getItem('onepixel-theme');
      return saved ? saved === 'dark' : true;
    } catch (e) { return true; }
  });

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    try { localStorage.setItem('onepixel-theme', dark ? 'dark' : 'light'); } catch (e) {}
  }, [dark]);

  useEffect(() => {
    // Paras · 2026-06-18: .work-item AND .section-head removed here — both are now GSAP
    // reveals (Work.jsx, and the section-head effect below), so the IntersectionObserver
    // shouldn't also reveal them.
    const targets = document.querySelectorAll(
      '.svc-showcase, .testimonial, .faq-item, .proc-display, .proc-strip, .proc-mobile, .hosting-inner, .hero-foot, .marquee'
    );
    targets.forEach(t => t.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, []);

  // Paras · 2026-06-18: section headings reveal on scroll — the title animates word-by-word
  // (SplitText) with the number + sub-text fading up alongside; the coral “em” word lands last
  // since it's last in each title. Reduced-motion safe; SplitText is reverted on cleanup.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const splits = [];
    const ctx = gsap.context(() => {
      document.querySelectorAll('.section-head').forEach((head) => {
        const title = head.querySelector('.section-title');
        const split = title ? new SplitText(title, { type: 'words' }) : null;
        if (split) splits.push(split);
        const tl = gsap.timeline({ scrollTrigger: { trigger: head, start: 'top 80%' } });
        if (split) tl.from(split.words, { y: 20, opacity: 0, stagger: 0.045, duration: 0.6, ease: 'power3.out' }, 0);
        const others = head.querySelectorAll('.section-num, .section-sub');
        if (others.length) tl.from(others, { y: 18, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power3.out' }, 0.08);
      });
    });
    return () => { ctx.revert(); splits.forEach((s) => s.revert()); };
  }, []);

  useEffect(() => {
    const colors = ['#FF6B47', dark ? '#F5F1EA' : '#0A0A0A', '#C7DDD8'];
    let last = 0;
    const onMove = (e) => {
      const now = performance.now();
      if (now - last < 40) return;
      last = now;
      const el = document.createElement('div');
      el.className = 'pix-trail';
      const size = 4 + Math.random() * 4;
      el.style.width = el.style.height = size + 'px';
      el.style.left = (e.clientX - size / 2) + 'px';
      el.style.top = (e.clientY - size / 2) + 'px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.transition = 'opacity .8s ease, transform .8s ease';
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.opacity = '0';
        el.style.transform = `translate(${(Math.random() - .5) * 30}px, ${(Math.random() - .5) * 30}px)`;
      });
      setTimeout(() => el.remove(), 800);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [dark]);

  return (
    <>
      <Loader />
      <Nav dark={dark} onToggleTheme={() => setDark(d => !d)} />
      {/* Paras · 2026-06-20: the "Start a project" qualifying overlay. Mounted once, outside <main>;
          every CTA opens it via openStartForm() (a custom event), so the CTAs stay prop-free. */}
      <StartForm />
      {/* Paras · 2026-06-19: <main> landmark wraps the page content (Nav/Loader stay outside) so
          screen readers + crawlers have a clear primary-content region. */}
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Services />
        <Process />
        <Hosting />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </>
  );
}
