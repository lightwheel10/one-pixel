import { useEffect, useState } from 'react';
import { Nav } from './Nav.jsx';
import { Hero } from './Hero.jsx';
import { Marquee, Work } from './Work.jsx';
import { Services, Process } from './ServicesProcess.jsx';
import { Testimonials, FAQ, Contact } from './Rest.jsx';

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('onepixel-theme') === 'dark';
    } catch (e) { return false; }
  });

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    try { localStorage.setItem('onepixel-theme', dark ? 'dark' : 'light'); } catch (e) {}
  }, [dark]);

  useEffect(() => {
    const targets = document.querySelectorAll(
      'section .section-head, .work-item, .svc-card, .testimonial, .faq-item, .proc-display, .proc-strip, .hero-foot, .marquee'
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
      <Nav dark={dark} onToggleTheme={() => setDark(d => !d)} />
      <Hero />
      <Marquee />
      <Work />
      <Services />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
