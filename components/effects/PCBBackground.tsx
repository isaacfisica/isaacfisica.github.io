'use client';

import { useEffect, useRef } from 'react';

/**
 * 전류가 흐르는 PCB 회로 배경.
 * - 격자 위에 직각으로 꺾이는 트레이스(전선)와 솔더 패드를 무작위 생성 → 정적 레이어로 한 번만 그림.
 * - 각 트레이스를 따라 빛나는 "전류 펄스"가 흐르는 애니메이션을 매 프레임 덧그림.
 * pointer-events:none 이라 클릭은 그대로 아래(링크/배경)로 전달됩니다.
 */
export default function PCBBackground({ isDark }: { isDark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const color = isDark
      ? {
          trace: 'rgba(120,175,215,0.16)',
          pad: 'rgba(120,175,215,0.30)',
          pulse: '#2DE2FF',
          pulseSoft: 'rgba(45,226,255,0.9)',
        }
      : {
          trace: 'rgba(28,34,48,0.10)',
          pad: 'rgba(175,114,74,0.32)',
          pulse: '#16B6D2',
          pulseSoft: 'rgba(22,182,210,0.85)',
        };

    type Path = { pts: { x: number; y: number }[]; seg: number[]; total: number };
    type Pulse = { path: Path; dist: number; speed: number };

    let dpr = 1;
    let W = 0;
    let H = 0;
    let paths: Path[] = [];
    let pulses: Pulse[] = [];
    let stat: HTMLCanvasElement | null = null;

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    function buildPath(grid: number): Path {
      const cols = Math.floor(W / grid);
      const rows = Math.floor(H / grid);
      let cx = Math.floor(rnd(1, cols - 1));
      let cy = Math.floor(rnd(1, rows - 1));
      const pts = [{ x: cx * grid, y: cy * grid }];
      const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      let last = -1;
      const steps = Math.floor(rnd(3, 9));
      for (let s = 0; s < steps; s++) {
        let d = Math.floor(rnd(0, 4));
        if (d === (last ^ 1)) d = (d + 1) % 4; // 즉시 역주행 방지
        const len = Math.floor(rnd(1, 4));
        const nx = Math.max(0, Math.min(cols, cx + dirs[d][0] * len));
        const ny = Math.max(0, Math.min(rows, cy + dirs[d][1] * len));
        if (nx === cx && ny === cy) continue;
        cx = nx;
        cy = ny;
        pts.push({ x: cx * grid, y: cy * grid });
        last = d;
      }
      const seg: number[] = [];
      let total = 0;
      for (let i = 1; i < pts.length; i++) {
        const l = Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
        seg.push(l);
        total += l;
      }
      return { pts, seg, total };
    }

    function posAt(p: Path, dist: number) {
      let d = ((dist % p.total) + p.total) % p.total;
      for (let i = 0; i < p.seg.length; i++) {
        if (d <= p.seg[i]) {
          const t = p.seg[i] === 0 ? 0 : d / p.seg[i];
          const a = p.pts[i];
          const b = p.pts[i + 1];
          return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
        }
        d -= p.seg[i];
      }
      return p.pts[p.pts.length - 1];
    }

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = W + 'px';
      canvas!.style.height = H + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const grid = 46;
      const count = Math.min(30, Math.max(8, Math.floor((W * H) / 26000)));
      paths = [];
      for (let i = 0; i < count; i++) paths.push(buildPath(grid));

      // 정적 레이어(트레이스 + 패드)
      stat = document.createElement('canvas');
      stat.width = W * dpr;
      stat.height = H * dpr;
      const sc = stat.getContext('2d')!;
      sc.setTransform(dpr, 0, 0, dpr, 0, 0);
      sc.lineWidth = 1.4;
      sc.lineJoin = 'round';
      sc.lineCap = 'round';
      sc.strokeStyle = color.trace;
      for (const p of paths) {
        sc.beginPath();
        p.pts.forEach((pt, i) => (i ? sc.lineTo(pt.x, pt.y) : sc.moveTo(pt.x, pt.y)));
        sc.stroke();
      }
      sc.fillStyle = color.pad;
      for (const p of paths) {
        for (const pt of [p.pts[0], p.pts[p.pts.length - 1]]) {
          sc.beginPath();
          sc.arc(pt.x, pt.y, 2.6, 0, Math.PI * 2);
          sc.fill();
        }
      }

      pulses = paths
        .filter(() => Math.random() < 0.85)
        .map((path) => ({ path, dist: Math.random() * path.total, speed: rnd(55, 130) }));
    }

    let raf = 0;
    let prev = performance.now();
    function frame(now: number) {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      ctx!.clearRect(0, 0, W, H);
      if (stat) ctx!.drawImage(stat, 0, 0, W, H);

      const tail = 9;
      for (const pu of pulses) {
        pu.dist += pu.speed * dt;
        const head = posAt(pu.path, pu.dist);
        for (let k = tail; k >= 0; k--) {
          const pt = posAt(pu.path, pu.dist - k * 4.5);
          const a = (1 - k / tail) * 0.9;
          ctx!.globalAlpha = a;
          ctx!.fillStyle = k === 0 ? color.pulse : color.pulseSoft;
          ctx!.beginPath();
          ctx!.arc(pt.x, pt.y, k === 0 ? 2.4 : 1.8 * (1 - k / tail) + 0.6, 0, Math.PI * 2);
          ctx!.fill();
        }
        // 머리 글로우
        ctx!.globalAlpha = 1;
        ctx!.shadowBlur = 10;
        ctx!.shadowColor = color.pulse;
        ctx!.fillStyle = color.pulse;
        ctx!.beginPath();
        ctx!.arc(head.x, head.y, 2.4, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
      ctx!.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }

    build();
    raf = requestAnimationFrame(frame);

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(build, 180);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, [isDark]);

  return <canvas ref={canvasRef} className="fx-canvas fx-canvas--pcb" aria-hidden="true" />;
}
