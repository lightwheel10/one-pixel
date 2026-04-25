import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const ref = useRef(null);
  const [variant, setVariant] = useState('');

  useEffect(() => {
    let raf;
    let tx = 0, ty = 0, x = 0, y = 0;

    const move = (e) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.25;
      y += (ty - y) * 0.25;
      if (ref.current) ref.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      const t = e.target;
      if (!t || !t.closest) { setVariant(''); return; }
      if (t.closest('a, button, .hc-pin, .hc-prop-row, [role="button"], [data-cursor="hover"]')) {
        setVariant('hover');
      } else if (t.closest('input, textarea, [contenteditable]')) {
        setVariant('text');
      } else {
        setVariant('');
      }
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className={`hc-cursor ${variant}`} aria-hidden="true" />;
}
