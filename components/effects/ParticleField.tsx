'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export interface ParticleFieldHandle {
  burst: (x: number, y: number) => void;
}

interface Props {
  isDark: boolean;
  tracksEnabled: boolean;
  decayEnabled: boolean;
  multiplicity: number;
}

/* ── 데이터 모델 ───────────────────────────────────────────── */
type Track = {
  x0: number;
  y0: number;
  theta: number; // 초기 진행 방향
  kappa: number; // 곡률(부호 = 전하). 자기장 속 하전입자는 원호를 그림
  kSpiral: number; // 곡률 증가율(에너지 손실 → 나선). e± 에 사용
  length: number;
  color: string;
  width: number;
  glow: boolean;
  dash: boolean; // 중성입자(전리 궤적 없음)는 점선
  startTime: number;
  growDur: number;
  hits: number; // 검출기 히트 점
  label?: string;
  labelColor?: string;
};
type Flash = { x: number; y: number; t0: number; color: string; r: number };
type EventObj = { tSpawn: number; hold: number; fade: number; tracks: Track[]; flashes: Flash[] };

const TAU = Math.PI * 2;
const R = Math.random;
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const sgn = () => (Math.random() < 0.5 ? -1 : 1);

/* ── 팔레트 ────────────────────────────────────────────────── */
function palette(isDark: boolean) {
  return isDark
    ? {
        cyan2: '#6CEBFF',
        proton: '#F0B33A',
        pion: '#3BE8FF',
        lepton: '#8FE7F2',
        kaon: '#D49A6B',
        hyperon: '#E7B33E',
        pbar: '#E06A93',
        neutral: 'rgba(150,170,200,0.55)',
        photon: 'rgba(230,180,70,0.55)',
        mix: ['#2DE2FF', '#6CEBFF', '#E7B33E', '#D49A6B', '#EAF6FF'],
      }
    : {
        cyan2: '#22D3EE',
        proton: '#D4862A',
        pion: '#1AA6C2',
        lepton: '#3EB6C9',
        kaon: '#B0744A',
        hyperon: '#D49A26',
        pbar: '#C2557A',
        neutral: 'rgba(70,80,100,0.5)',
        photon: 'rgba(190,150,40,0.55)',
        mix: ['#16B6D2', '#22D3EE', '#D49A26', '#AF724A', '#3A4254'],
      };
}
type Pal = ReturnType<typeof palette>;

/* ── 트랙 샘플러 (곡률·나선·직선 통합, 수치적분) ─────────────── */
function buildPoints(tk: Track, len: number): [number, number][] {
  const steps = Math.max(6, Math.min(140, Math.ceil(len / 3)));
  const ds = len / steps;
  let x = tk.x0;
  let y = tk.y0;
  let th = tk.theta;
  let acc = 0;
  const pts: [number, number][] = [[x, y]];
  for (let i = 0; i < steps; i++) {
    const kk = tk.kappa + tk.kSpiral * acc;
    th += kk * ds;
    x += Math.cos(th) * ds;
    y += Math.sin(th) * ds;
    acc += ds;
    pts.push([x, y]);
  }
  return pts;
}
function endOf(tk: Track) {
  const pts = buildPoints(tk, tk.length);
  const a = pts[pts.length - 1];
  const b = pts[pts.length - 2] || a;
  return { x: a[0], y: a[1], th: Math.atan2(a[1] - b[1], a[0] - b[0]) };
}

function mk(
  o: Partial<Track> &
    Pick<Track, 'x0' | 'y0' | 'theta' | 'length' | 'color' | 'startTime'>,
): Track {
  return { kappa: 0, kSpiral: 0, width: 1.6, glow: true, dash: false, hits: 0, growDur: 0.5, ...o };
}

/* ── 그리기 ────────────────────────────────────────────────── */
function drawTrack(ctx: CanvasRenderingContext2D, tk: Track, now: number, alpha: number) {
  const tt = (now - tk.startTime) / 1000;
  if (tt <= 0) return;
  const grow = Math.min(1, tt / tk.growDur);
  const len = tk.length * (1 - Math.pow(1 - grow, 3));
  if (len < 0.5) return;
  const pts = buildPoints(tk, len);

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.lineWidth = tk.width;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = tk.color;
  if (tk.glow) {
    ctx.shadowBlur = 9;
    ctx.shadowColor = tk.color;
  }
  if (tk.dash) ctx.setLineDash([4, 5]);
  ctx.beginPath();
  for (let i = 0; i < pts.length; i++) i ? ctx.lineTo(pts[i][0], pts[i][1]) : ctx.moveTo(pts[i][0], pts[i][1]);
  ctx.stroke();
  ctx.setLineDash([]);

  const head = pts[pts.length - 1];
  if (tk.hits > 0) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = tk.color;
    for (let h = 1; h <= tk.hits; h++) {
      const idx = Math.round(((pts.length - 1) * h) / (tk.hits + 1));
      const pp = pts[idx];
      ctx.beginPath();
      ctx.arc(pp[0], pp[1], tk.width * 0.85, 0, TAU);
      ctx.fill();
    }
  }
  if (!tk.dash) {
    ctx.shadowBlur = tk.glow ? 9 : 0;
    ctx.fillStyle = tk.color;
    ctx.beginPath();
    ctx.arc(head[0], head[1], tk.width * 1.1, 0, TAU);
    ctx.fill();
  }
  if (tk.label && grow > 0.5) {
    ctx.shadowBlur = 0;
    ctx.fillStyle = tk.labelColor || tk.color;
    ctx.font = '600 12px "IBM Plex Mono", monospace';
    ctx.fillText(tk.label, head[0] + 7, head[1] - 7);
  }
  ctx.restore();
}

function drawFlash(ctx: CanvasRenderingContext2D, f: Flash, now: number, alpha: number) {
  const fa = (now - f.t0) / 1000;
  if (fa < 0 || fa > 0.45) return;
  const k = fa / 0.45;
  ctx.save();
  ctx.globalAlpha = (1 - k) * 0.85 * alpha;
  ctx.strokeStyle = f.color;
  ctx.lineWidth = 2;
  ctx.shadowBlur = 12;
  ctx.shadowColor = f.color;
  ctx.beginPath();
  ctx.arc(f.x, f.y, f.r * k, 0, TAU);
  ctx.stroke();
  ctx.globalAlpha = (1 - k) * 0.6 * alpha;
  ctx.fillStyle = f.color;
  ctx.beginPath();
  ctx.arc(f.x, f.y, Math.max(0, 3 * (1 - k)), 0, TAU);
  ctx.fill();
  ctx.restore();
}

function drawEvent(ctx: CanvasRenderingContext2D, ev: EventObj, now: number, alpha: number) {
  for (const f of ev.flashes) drawFlash(ctx, f, now, alpha);
  for (const tk of ev.tracks) drawTrack(ctx, tk, now, alpha);
}

/* ── (2) 프로필 클릭: 이벤트 디스플레이 트랙 분출 ──────────── */
function makeBurst(x: number, y: number, isDark: boolean, mult: number): EventObj {
  const p = palette(isDark);
  const now = performance.now();
  const n = Math.max(1, Math.min(60, Math.round(mult)));
  const tracks: Track[] = [];
  for (let i = 0; i < n; i++) {
    const s = sgn();
    tracks.push(
      mk({
        x0: x, y0: y,
        theta: R() * TAU,
        kappa: s * (0.0015 + Math.pow(R(), 2) * 0.03),
        length: 55 + R() * 150,
        color: p.mix[Math.floor(R() * p.mix.length)],
        width: 1.1 + R() * 1.4,
        startTime: now + R() * 140,
        growDur: 0.32 + R() * 0.33,
        hits: R() < 0.5 ? 2 + Math.floor(R() * 4) : 0,
      }),
    );
  }
  return { tSpawn: now, hold: 1.3, fade: 1.2, tracks, flashes: [{ x, y, t0: now, color: p.cyan2, r: 26 }] };
}

/* ── (3) 배경 클릭: 여러 붕괴 채널 ─────────────────────────── */
type Chan = { tracks: Track[]; flashes: Flash[] };

// Λ⁰ → p + π⁻
function chLambda(x: number, y: number, now: number, p: Pal): Chan {
  const th = R() * TAU;
  const lam = mk({ x0: x, y0: y, theta: th, length: 70 + R() * 50, color: p.neutral, width: 1.5, glow: false, dash: true, startTime: now, label: 'Λ⁰', labelColor: p.neutral });
  const e = endOf(lam);
  const t1 = now + 500;
  const b = sgn();
  return {
    tracks: [
      lam,
      mk({ x0: e.x, y0: e.y, theta: e.th - rand(0.22, 0.34), kappa: b * rand(0.004, 0.008), length: 120 + R() * 70, color: p.proton, width: 1.9, startTime: t1, growDur: 0.55, label: 'p', labelColor: p.proton }),
      mk({ x0: e.x, y0: e.y, theta: e.th + rand(0.5, 0.8), kappa: -b * rand(0.012, 0.022), length: 80 + R() * 55, color: p.pion, width: 1.5, startTime: t1, growDur: 0.55, label: 'π⁻', labelColor: p.pion }),
    ],
    flashes: [{ x, y, t0: now, color: p.neutral, r: 14 }, { x: e.x, y: e.y, t0: t1, color: p.cyan2, r: 24 }],
  };
}

// K⁰ₛ → π⁺ + π⁻
function chKshort(x: number, y: number, now: number, p: Pal): Chan {
  const th = R() * TAU;
  const k = mk({ x0: x, y0: y, theta: th, length: 60 + R() * 50, color: p.neutral, width: 1.5, glow: false, dash: true, startTime: now, label: 'K⁰ₛ', labelColor: p.neutral });
  const e = endOf(k);
  const t1 = now + 480;
  const b = sgn();
  const op = rand(0.35, 0.6);
  return {
    tracks: [
      k,
      mk({ x0: e.x, y0: e.y, theta: e.th - op, kappa: b * rand(0.01, 0.018), length: 95 + R() * 60, color: p.pion, width: 1.6, startTime: t1, growDur: 0.55, label: 'π⁺', labelColor: p.pion }),
      mk({ x0: e.x, y0: e.y, theta: e.th + op, kappa: -b * rand(0.01, 0.018), length: 95 + R() * 60, color: p.pion, width: 1.6, startTime: t1, growDur: 0.55, label: 'π⁻', labelColor: p.pion }),
    ],
    flashes: [{ x, y, t0: now, color: p.neutral, r: 13 }, { x: e.x, y: e.y, t0: t1, color: p.cyan2, r: 22 }],
  };
}

// γ → e⁺ + e⁻ (쌍생성, 나선)
function chGamma(x: number, y: number, now: number, p: Pal): Chan {
  const th = R() * TAU;
  const g = mk({ x0: x, y0: y, theta: th, length: 45 + R() * 45, color: p.photon, width: 1.3, glow: false, dash: true, startTime: now, label: 'γ', labelColor: p.photon });
  const e = endOf(g);
  const t1 = now + 430;
  const b = sgn();
  return {
    tracks: [
      g,
      mk({ x0: e.x, y0: e.y, theta: e.th - rand(0.05, 0.18), kappa: b * 0.02, kSpiral: b * 0.0009, length: 110 + R() * 60, color: p.lepton, width: 1.3, startTime: t1, growDur: 0.6, label: 'e⁺', labelColor: p.lepton }),
      mk({ x0: e.x, y0: e.y, theta: e.th + rand(0.05, 0.18), kappa: -b * 0.02, kSpiral: -b * 0.0009, length: 110 + R() * 60, color: p.lepton, width: 1.3, startTime: t1, growDur: 0.6, label: 'e⁻', labelColor: p.lepton }),
    ],
    flashes: [{ x: e.x, y: e.y, t0: t1, color: p.lepton, r: 18 }],
  };
}

// Ξ⁻ → π⁻ + (Λ⁰ → p + π⁻)  캐스케이드
function chXi(x: number, y: number, now: number, p: Pal): Chan {
  const th = R() * TAU;
  const b = sgn();
  const xi = mk({ x0: x, y0: y, theta: th, kappa: b * rand(0.002, 0.0035), length: 60 + R() * 30, color: p.hyperon, width: 1.7, startTime: now, label: 'Ξ⁻', labelColor: p.hyperon });
  const e1 = endOf(xi);
  const t1 = now + 480;
  const lam = mk({ x0: e1.x, y0: e1.y, theta: e1.th + rand(-0.12, 0.12), length: 55 + R() * 35, color: p.neutral, width: 1.4, glow: false, dash: true, startTime: t1, label: 'Λ⁰', labelColor: p.neutral });
  const e2 = endOf(lam);
  const t2 = t1 + 460;
  const b2 = sgn();
  return {
    tracks: [
      xi,
      mk({ x0: e1.x, y0: e1.y, theta: e1.th - b * rand(0.45, 0.7), kappa: -b * rand(0.012, 0.02), length: 75 + R() * 45, color: p.pion, width: 1.5, startTime: t1, growDur: 0.55, label: 'π⁻', labelColor: p.pion }),
      lam,
      mk({ x0: e2.x, y0: e2.y, theta: e2.th - rand(0.22, 0.34), kappa: b2 * rand(0.004, 0.008), length: 110 + R() * 60, color: p.proton, width: 1.9, startTime: t2, growDur: 0.55, label: 'p', labelColor: p.proton }),
      mk({ x0: e2.x, y0: e2.y, theta: e2.th + rand(0.5, 0.8), kappa: -b2 * rand(0.012, 0.022), length: 75 + R() * 45, color: p.pion, width: 1.5, startTime: t2, growDur: 0.55, label: 'π⁻', labelColor: p.pion }),
    ],
    flashes: [{ x, y, t0: now, color: p.hyperon, r: 12 }, { x: e1.x, y: e1.y, t0: t1, color: p.cyan2, r: 20 }, { x: e2.x, y: e2.y, t0: t2, color: p.cyan2, r: 22 }],
  };
}

// Ω⁻ → K⁻ + (Λ⁰ → p + π⁻)  캐스케이드
function chOmega(x: number, y: number, now: number, p: Pal): Chan {
  const th = R() * TAU;
  const b = sgn();
  const om = mk({ x0: x, y0: y, theta: th, kappa: b * rand(0.002, 0.004), length: 55 + R() * 30, color: p.hyperon, width: 1.8, startTime: now, label: 'Ω⁻', labelColor: p.hyperon });
  const e1 = endOf(om);
  const t1 = now + 470;
  const lam = mk({ x0: e1.x, y0: e1.y, theta: e1.th + rand(-0.1, 0.1), length: 55 + R() * 35, color: p.neutral, width: 1.4, glow: false, dash: true, startTime: t1, label: 'Λ⁰', labelColor: p.neutral });
  const e2 = endOf(lam);
  const t2 = t1 + 460;
  const b2 = sgn();
  return {
    tracks: [
      om,
      mk({ x0: e1.x, y0: e1.y, theta: e1.th - b * rand(0.4, 0.65), kappa: -b * rand(0.008, 0.013), length: 85 + R() * 50, color: p.kaon, width: 1.7, startTime: t1, growDur: 0.55, label: 'K⁻', labelColor: p.kaon }),
      lam,
      mk({ x0: e2.x, y0: e2.y, theta: e2.th - rand(0.22, 0.34), kappa: b2 * rand(0.004, 0.008), length: 110 + R() * 60, color: p.proton, width: 1.9, startTime: t2, growDur: 0.55, label: 'p', labelColor: p.proton }),
      mk({ x0: e2.x, y0: e2.y, theta: e2.th + rand(0.5, 0.8), kappa: -b2 * rand(0.012, 0.022), length: 75 + R() * 45, color: p.pion, width: 1.5, startTime: t2, growDur: 0.55, label: 'π⁻', labelColor: p.pion }),
    ],
    flashes: [{ x, y, t0: now, color: p.hyperon, r: 12 }, { x: e1.x, y: e1.y, t0: t1, color: p.cyan2, r: 20 }, { x: e2.x, y: e2.y, t0: t2, color: p.cyan2, r: 22 }],
  };
}

// p̄ 소멸(annihilation) — 여러 파이온이 별처럼 분출
function chAnnih(x: number, y: number, now: number, p: Pal): Chan {
  const thIn = R() * TAU;
  const inLen = 70 + R() * 45;
  const pbar = mk({ x0: x - Math.cos(thIn) * inLen, y0: y - Math.sin(thIn) * inLen, theta: thIn, length: inLen, color: p.pbar, width: 1.8, startTime: now, label: 'p̄', labelColor: p.pbar });
  const t1 = now + 470;
  const tracks: Track[] = [pbar];
  const n = 3 + Math.floor(R() * 3); // 3~5
  for (let i = 0; i < n; i++) {
    const s = sgn();
    const ang = thIn + rand(-1.4, 1.4) + (R() < 0.3 ? Math.PI : 0);
    tracks.push(
      mk({ x0: x, y0: y, theta: ang, kappa: s * rand(0.008, 0.018), length: 70 + R() * 70, color: p.pion, width: 1.5, startTime: t1, growDur: 0.5, label: i === 0 ? 'π⁺' : i === 1 ? 'π⁻' : undefined, labelColor: p.pion }),
    );
  }
  return { tracks, flashes: [{ x, y, t0: t1, color: p.pbar, r: 30 }, { x, y, t0: t1, color: p.cyan2, r: 18 }] };
}

// μ⁻ → e⁻ (+ 보이지 않는 ν) — 꺾임(kink)
function chMuon(x: number, y: number, now: number, p: Pal): Chan {
  const th = R() * TAU;
  const b = sgn();
  const mu = mk({ x0: x, y0: y, theta: th, kappa: b * rand(0.004, 0.008), length: 95 + R() * 50, color: p.lepton, width: 1.6, startTime: now, growDur: 0.55, label: 'μ⁻', labelColor: p.lepton });
  const e = endOf(mu);
  const t1 = now + 560;
  return {
    tracks: [
      mu,
      mk({ x0: e.x, y0: e.y, theta: e.th + sgn() * rand(0.6, 1.3), kappa: -b * 0.02, kSpiral: -b * 0.001, length: 80 + R() * 45, color: p.lepton, width: 1.2, startTime: t1, growDur: 0.6, label: 'e⁻', labelColor: p.lepton }),
    ],
    flashes: [{ x: e.x, y: e.y, t0: t1, color: p.lepton, r: 16 }],
  };
}

function makeDecay(x: number, y: number, isDark: boolean): EventObj {
  const p = palette(isDark);
  const now = performance.now();
  const r = R();
  let ch: Chan;
  if (r < 0.17) ch = chLambda(x, y, now, p);
  else if (r < 0.33) ch = chKshort(x, y, now, p);
  else if (r < 0.49) ch = chGamma(x, y, now, p);
  else if (r < 0.65) ch = chXi(x, y, now, p);
  else if (r < 0.79) ch = chOmega(x, y, now, p);
  else if (r < 0.91) ch = chAnnih(x, y, now, p);
  else ch = chMuon(x, y, now, p);

  let maxEnd = 0;
  for (const t of ch.tracks) {
    const e = (t.startTime - now) / 1000 + t.growDur;
    if (e > maxEnd) maxEnd = e;
  }
  return { tSpawn: now, hold: maxEnd + 0.9, fade: 1.3, tracks: ch.tracks, flashes: ch.flashes };
}

/* ── 컴포넌트 ─────────────────────────────────────────────── */
const ParticleField = forwardRef<ParticleFieldHandle, Props>(function ParticleField(props, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eventsRef = useRef<EventObj[]>([]);
  const propsRef = useRef(props);
  propsRef.current = props;

  const push = (ev: EventObj) => {
    const list = eventsRef.current;
    list.push(ev);
    if (list.length > 10) list.shift();
  };

  useImperativeHandle(ref, () => ({
    burst: (x: number, y: number) => {
      const p = propsRef.current;
      if (!p.tracksEnabled) return;
      push(makeBurst(x, y, p.isDark, p.multiplicity));
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    const frame = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const evs = eventsRef.current;
      for (let i = evs.length - 1; i >= 0; i--) {
        const ev = evs[i];
        const age = (now - ev.tSpawn) / 1000;
        let a = 1;
        if (age > ev.hold) a = 1 - (age - ev.hold) / ev.fade;
        if (a <= 0) {
          evs.splice(i, 1);
          continue;
        }
        drawEvent(ctx, ev, now, a);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onClick = (e: MouseEvent) => {
      const p = propsRef.current;
      if (!p.decayEnabled) return;
      const t = e.target;
      if (t instanceof Element && t.closest('a, button, input, label, .avatar, [data-fx-exclude]')) return;
      push(makeDecay(e.clientX, e.clientY, p.isDark));
    };
    window.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return <canvas ref={canvasRef} className="fx-canvas fx-canvas--particles" aria-hidden="true" />;
});

export default ParticleField;
