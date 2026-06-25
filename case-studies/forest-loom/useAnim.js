import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduce = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Fade-and-rise reveals as elements enter; [data-reveal] one element,
// [data-reveal-group] staggers its direct children (grids, lists).
function reveals(root) {
  root.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 34, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 86%' },
    });
  });
  root.querySelectorAll('[data-reveal-group]').forEach((g) => {
    gsap.from(g.children, {
      opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', stagger: 0.09,
      scrollTrigger: { trigger: g, start: 'top 84%' },
    });
  });
}

// ScrollTrigger measures on creation; re-measure once fonts/images settle.
function refreshLater() {
  const r = () => ScrollTrigger.refresh();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(r);
  window.addEventListener('load', r, { once: true });
  setTimeout(r, 450);
}

export function useReveals(ref) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduce()) return;
    const ctx = gsap.context(() => reveals(root), ref);
    refreshLater();
    return () => ctx.revert();
  }, [ref]);
}

// Product page: an orchestrated entrance (gallery settles, thumbs and info
// stagger in), plus the usual scroll reveals for the band and related grid.
export function useProductAnim(ref) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduce()) return;
    const ctx = gsap.context(() => {
      reveals(root);
      const main = root.querySelector('.fl-pd-main');
      const thumbs = root.querySelectorAll('.fl-pd-thumb');
      const info = root.querySelectorAll('.fl-pd-cat, .fl-pd-name, .fl-pd-rating, .fl-pd-price, .fl-pd-line, .fl-pd-colour, .fl-pd-buy, .fl-pd-deliver, .fl-pd-trust, .fl-pd-pay, .fl-pd-maker, .fl-pd-acc');
      const crumb = root.querySelector('.fl-crumb');
      if (main) gsap.set(main, { opacity: 0, scale: 1.04 });
      gsap.set(thumbs, { opacity: 0, x: -12 });
      gsap.set(info, { opacity: 0, y: 26 });
      if (crumb) gsap.set(crumb, { opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      if (crumb) tl.to(crumb, { opacity: 1, duration: 0.5 }, 0);
      if (main) tl.to(main, { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' }, 0.05);
      tl.to(thumbs, { opacity: 1, x: 0, duration: 0.6, stagger: 0.08 }, 0.3)
        .to(info, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.35);
    }, ref);
    refreshLater();
    return () => ctx.revert();
  }, [ref]);
}

export function useHomeAnim(ref) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || reduce()) return;
    let played = false, fb;

    const ctx = gsap.context(() => {
      // hold the hero hidden, then reveal it once the intro loader lifts
      gsap.set(root.querySelectorAll('.fl-hero-title .fl-hl'), { y: 48, opacity: 0 });
      gsap.set(root.querySelectorAll('.fl-hero-eyebrow, .fl-hero-scrollcue, .fl-hero-card'), { opacity: 0, y: 18 });
      gsap.set(root.querySelector('.fl-hero-img'), { scale: 1.12, transformOrigin: 'center center' });
      reveals(root);
    }, ref);

    const play = () => {
      if (played) return; played = true;
      ctx.add(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.to('.fl-hero-img', { scale: 1, duration: 2.0, ease: 'power2.out' }, 0)
          .to('.fl-hero-eyebrow', { opacity: 1, y: 0, duration: 0.7 }, 0.35)
          .to('.fl-hero-title .fl-hl', { y: 0, opacity: 1, duration: 1.0, stagger: 0.13 }, 0.45)
          .to('.fl-hero-card', { opacity: 1, y: 0, duration: 0.8 }, 0.95)
          .to('.fl-hero-scrollcue', { opacity: 1, y: 0, duration: 0.6 }, 1.15);
      });
    };

    if (document.querySelector('.loader')) {
      document.addEventListener('onepixel:loader-complete', play, { once: true });
      fb = setTimeout(play, 3200);
    } else {
      play();
    }
    refreshLater();

    return () => {
      if (fb) clearTimeout(fb);
      document.removeEventListener('onepixel:loader-complete', play);
      ctx.revert();
    };
  }, [ref]);
}
