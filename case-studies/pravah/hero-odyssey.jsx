import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { Logo, Button } from './ui.jsx';

// WebGL lightning backdrop — "the current". Shader generated in code, no textures.
// `bolts` draws multiple independent strikes. An IntersectionObserver pauses the
// render loop when off-screen, so several instances across the page stay cheap.
// Reduced-motion paints a single static frame.
export const Lightning = ({ hue = 248, xOffset = 0, speed = 1, intensity = 1, size = 1, bolts = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return undefined;
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      uniform float uBolts;

      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));

          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv0 = fragCoord / iResolution.xy;
          uv0 = 2.0 * uv0 - 1.0;
          uv0.x *= iResolution.x / iResolution.y;
          uv0.x += uXOffset;

          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.5, 0.68));
          vec3 col = vec3(0.0);

          for (int i = 0; i < 5; i++) {
              if (float(i) >= uBolts) break;
              float fi = float(i);
              // spread the strikes across x, centred on the container
              float off = (fi - (uBolts - 1.0) * 0.5) * 0.9;
              vec2 uv = uv0;
              uv.x -= off;
              // each strike gets its own distortion seed + flicker phase
              uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed + fi * 11.0) - 1.0;
              float dist = abs(uv.x);
              float flick = mix(0.0, 0.07, hash11(iTime * uSpeed + fi * 5.0));
              col += baseColor * (flick / dist);
          }
          col *= uIntensity;
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return undefined;

    const program = gl.createProgram();
    if (!program) return undefined;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return undefined;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const u = (name) => gl.getUniformLocation(program, name);
    const iResolutionLocation = u('iResolution');
    const iTimeLocation = u('iTime');
    const uHueLocation = u('uHue');
    const uXOffsetLocation = u('uXOffset');
    const uSpeedLocation = u('uSpeed');
    const uIntensityLocation = u('uIntensity');
    const uSizeLocation = u('uSize');
    const uBoltsLocation = u('uBolts');

    const startTime = performance.now();
    let raf = null;
    let visible = true;

    const draw = () => {
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(iTimeLocation, (performance.now() - startTime) / 1000.0);
      gl.uniform1f(uHueLocation, hue);
      gl.uniform1f(uXOffsetLocation, xOffset);
      gl.uniform1f(uSpeedLocation, speed);
      gl.uniform1f(uIntensityLocation, intensity);
      gl.uniform1f(uSizeLocation, size);
      gl.uniform1f(uBoltsLocation, bolts);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const loop = () => {
      draw();
      raf = visible && !reduce ? requestAnimationFrame(loop) : null;
    };
    const start = () => { if (raf == null && visible && !reduce) raf = requestAnimationFrame(loop); };

    draw();
    if (!reduce) start();

    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting; if (visible) start(); },
      { threshold: 0, rootMargin: '120px' },
    );
    io.observe(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hue, xOffset, speed, intensity, size, bolts]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};

const navLinks = [
  ['Products', '#products'],
  ['Pricing', '#pricing'],
  ['Data Centres', '#regions'],
  ['Docs', '#console'],
  ['Company', '#company'],
];

const heroStats = [
  ['5', 'Indian regions'],
  ['99.99%', 'Uptime SLA'],
  ['40 Tbps', 'Network capacity'],
  ['₹399', 'per month, all-in'],
];

const regions = ['Mumbai', 'Chennai', 'Delhi NCR', 'Bengaluru', 'Hyderabad'];

const instanceSpecs = [
  ['Region', 'Mumbai · BOM-1'],
  ['Plan', 'General Purpose'],
  ['Compute', '4 vCPU · 8 GB'],
  ['Disk', '80 GB NVMe'],
  ['IPv4', '103.21.x.x'],
  ['Uptime', '412 days'],
];

// Live instance card — fills the right of the hero, "powered" by the current behind it.
function InstanceCard() {
  const bars = [34, 48, 41, 60, 50, 72, 57, 66, 81, 62, 74, 55, 69, 47];
  return (
    <div className="relative border border-white/15 bg-[#070912]/85 backdrop-blur-md">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
        <div className="flex items-center gap-2.5 font-mono text-xs text-white/70">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="w-2.5 h-2.5 bg-white/15" /><i className="w-2.5 h-2.5 bg-white/15" /><i className="w-2.5 h-2.5 bg-white/15" />
          </span>
          srv-7f3
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-green-400">
          <i className="w-1.5 h-1.5 bg-green-400" /> Running
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-white/10">
        {instanceSpecs.map(([k, v]) => (
          <div key={k} className="bg-[#070912] px-5 py-3.5">
            <div className="font-mono text-[10px] uppercase tracking-wider text-white/40">{k}</div>
            <div className="text-sm text-white/85 mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="px-5 py-5 border-t border-white/10">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wide text-white/45 mb-3">
          <span>Network · egress</span><span className="text-electric">2.4 Gbps</span>
        </div>
        <div className="flex items-end gap-1 h-16" aria-hidden="true">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 bg-electric/35" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      <a href="#" className="flex items-center justify-between px-5 py-3.5 border-t border-white/10 font-mono text-[11px] uppercase tracking-wide text-white/55 hover:text-white transition-colors">
        Open console <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  );
}

export const HeroSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { y: 22, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
  };

  return (
    <header className="relative w-full bg-black text-white overflow-hidden min-h-screen flex flex-col">
      {/* Top nav */}
      <div className="relative z-30 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.nav
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between h-16 border-b border-white/10"
        >
          <div className="flex items-center gap-10">
            <Logo />
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map(([label, href]) => (
                <a key={label} href={href} className="text-sm text-white/65 hover:text-white transition-colors">{label}</a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/case-studies/pravah/auth/" className="hidden md:block text-sm text-white/65 hover:text-white transition-colors">Console login</a>
            <Button href="/case-studies/pravah/auth/#signup" variant="primary">Get started</Button>
            <button
              className="lg:hidden p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-[9999] bg-black/95 backdrop-blur-lg"
          >
            <div className="flex flex-col items-center justify-center h-full gap-7 text-lg">
              <button className="absolute top-6 right-6 p-2" onClick={() => setMobileMenuOpen(false)} aria-label="Close navigation">
                <X className="h-6 w-6" />
              </button>
              {navLinks.map(([label, href]) => (
                <a key={label} href={href} onClick={() => setMobileMenuOpen(false)}>{label}</a>
              ))}
              <a href="/case-studies/pravah/auth/">Console login</a>
              <Button href="/case-studies/pravah/auth/#signup" variant="primary" className="mt-2">Get started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero content — two columns so the right side carries a live instance card */}
      <div className="relative z-20 flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p variants={item} className="pv-eyebrow mb-6">
              Cloud · Bare metal · Storage · hosted in India
            </motion.p>
            <motion.h1 variants={item} className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[0.98] tracking-tight">
              India&rsquo;s cloud,<br />built for <span className="text-electric">builders</span>.
            </motion.h1>
            <motion.p variants={item} className="text-white/60 text-lg mt-7 max-w-xl leading-relaxed">
              Cloud servers, bare metal and block storage across five Indian data centres. Honest rupee
              pricing, data that stays in the country, and engineers who pick up the phone.
            </motion.p>
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 mt-9">
              <Button href="/case-studies/pravah/auth/#signup" variant="primary">Get started <ArrowRight className="w-4 h-4" /></Button>
              <Button href="#pricing" variant="ghost">See pricing</Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
          >
            <InstanceCard />
          </motion.div>
        </div>

        {/* Spec bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mt-16"
        >
          {heroStats.map(([value, label]) => (
            <div key={label} className="bg-black/60 backdrop-blur-sm px-5 py-5">
              <div className="font-display text-2xl sm:text-3xl text-white">{value}</div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-white/45 mt-1.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Region strip */}
      <div className="relative z-20 border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-wider text-white/50">
          <span className="text-electric">Live regions</span>
          {regions.map((r) => (
            <span key={r} className="inline-flex items-center gap-2">
              <i className="w-1.5 h-1.5 bg-electric inline-block" aria-hidden="true" />{r}
            </span>
          ))}
          <span className="ml-auto inline-flex items-center gap-2 text-white/60">
            <i className="w-1.5 h-1.5 bg-green-400 inline-block" aria-hidden="true" />All operational
          </span>
        </div>
      </div>

      {/* Background: multiple strikes grounding into the power-grid floor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black"></div>
        <div className="absolute inset-0 opacity-70">
          <Lightning hue={248} bolts={3} xOffset={0} speed={1.4} intensity={0.196} size={2} />
        </div>
        <div className="pv-floor"></div>
        <div className="absolute bottom-[52%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent"></div>
      </motion.div>
    </header>
  );
};
