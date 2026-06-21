'use client';

import { useRef, useState } from 'react';
import {
  links,
  slots,
  profile,
  showSlots,
  fxDefaults,
} from '@/lib/data';
import {
  LinkIcon,
  AtomIcon,
  ArrowIcon,
  EmailIcon,
  PlusIcon,
} from '@/design-system/icons';
import PCBBackground from './effects/PCBBackground';
import ParticleField, { type ParticleFieldHandle } from './effects/ParticleField';
import FXPanel, { type FXState } from './effects/FXPanel';
import { useTheme } from '@/lib/theme-context';

export default function LinkHub() {
  const { isDark } = useTheme();

  // FX 기믹 상태 (런타임 토글)
  const [fx, setFx] = useState<FXState>({
    pcb: fxDefaults.pcb,
    tracks: fxDefaults.tracks,
    decay: fxDefaults.decay,
  });
  const [multiplicity, setMultiplicity] = useState(fxDefaults.multiplicity);
  const [panelOpen, setPanelOpen] = useState(false);
  const fieldRef = useRef<ParticleFieldHandle>(null);

  const toggleFx = (key: keyof FXState, value: boolean) =>
    setFx((s) => ({ ...s, [key]: value }));

  // (2) 프로필 클릭 → 아바타 중심에서 트랙 분출
  const handleAvatar = (el: HTMLElement | null) => {
    if (!fx.tracks || !el) return;
    const r = el.getBoundingClientRect();
    fieldRef.current?.burst(r.left + r.width / 2, r.top + r.height / 2);
  };

  return (
    <div className="hub">
      {/* (1) 전류가 흐르는 PCB 회로 배경 */}
      {fx.pcb && <PCBBackground isDark={isDark} />}

      {/* 배경 PCB 트레이스 (정적 장식) */}
      <svg className="deco deco--tl" width="180" height="180" viewBox="0 0 160 160" fill="none" stroke="var(--copper)" strokeWidth={1.4} aria-hidden="true">
        <path d="M0 30 H42 L62 50 H112" />
        <path d="M0 72 H30 L56 98 H92 L112 78 H160" />
        <circle cx="112" cy="50" r="3.2" fill="var(--copper)" stroke="none" />
        <circle cx="92" cy="98" r="3.2" fill="var(--copper)" stroke="none" />
        <circle cx="112" cy="78" r="2.6" fill="var(--copper)" stroke="none" />
      </svg>
      <svg className="deco deco--br" width="180" height="180" viewBox="0 0 160 160" fill="none" stroke="var(--cyan)" strokeWidth={1.4} aria-hidden="true">
        <path d="M0 30 H42 L62 50 H112" />
        <path d="M0 72 H30 L56 98 H92 L112 78 H160" />
        <circle cx="112" cy="50" r="3.2" fill="var(--cyan)" stroke="none" />
        <circle cx="92" cy="98" r="3.2" fill="var(--cyan)" stroke="none" />
      </svg>

      <main className="main">
        {/* ───────── TOP BAR ───────── */}
        <div className="topbar">
          <span className="rec">
            <span className="rec__dot" />
            {profile.recTag}
          </span>
        </div>

        {/* ───────── HERO ───────── */}
        <div className="hero">
          <div
            className={'avatar' + (fx.tracks ? ' avatar--click' : '')}
            role={fx.tracks ? 'button' : undefined}
            tabIndex={fx.tracks ? 0 : undefined}
            aria-label={fx.tracks ? '프로필 — 클릭하면 입자 트랙이 나옵니다' : undefined}
            title={fx.tracks ? '클릭 — 이벤트 디스플레이' : undefined}
            onClick={(e) => handleAvatar(e.currentTarget)}
            onKeyDown={(e) => {
              if (fx.tracks && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleAvatar(e.currentTarget);
              }
            }}
          >
            <svg className="avatar__rings" width="212" height="212" viewBox="0 0 212 212" fill="none" aria-hidden="true">
              <circle cx="106" cy="106" r="100" stroke="var(--grid-strong)" strokeWidth={1} />
              <circle cx="106" cy="106" r="84" stroke="var(--cyan)" strokeWidth={1} strokeOpacity={0.4} strokeDasharray="3 7" />
              <circle cx="106" cy="106" r="68" stroke="var(--copper)" strokeWidth={1} strokeOpacity={0.34} strokeDasharray="1 8" />
            </svg>
            <div className="avatar__inner">
              <div className="avatar__clip">
                {/* 캐릭터 이미지를 넣으려면 public/character.png 파일을 추가하고
                    아래 <div.avatar__ph> 대신 다음 줄의 주석을 해제하세요. */}
                <img className="avatar__img" src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/character.png`} alt={profile.nameKo} />
                {/* <div className="avatar__ph"> */}
                  {/* <span>캐릭터 일러스트</span> */}
                {/* </div> */}
              </div>
              {/* 옷깃 원자(atom) 핀 */}
              <span className="atom-pin">
                <AtomIcon />
              </span>
            </div>
          </div>

          <h1 className="name">
            {profile.nameKo} <em>{profile.nameEn}</em>
          </h1>
          <p className="tagline">{profile.tagline.split("//").map((v,i) => <span key={ `tagline-${i}` }>{v}<br /></span>)}</p>
          <div className="chips">
            {profile.chips.map((c) => (
              <span className="chip" key={c}>
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* 오실로스코프 파형 구분선 */}
        <svg className="divider" viewBox="0 0 460 26" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 13 H150 l6 -8 l6 16 l7 -19 l6 19 l6 -8 H212 C 244 13 244 4 274 4 S 318 22 348 13 H460" fill="none" stroke="var(--cyan)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
        </svg>

        {/* ───────── MAIN LINKS ───────── */}
        <div className="section-head">
          <span>LINKS</span>
          <span className="line" />
        </div>
        <div className="links">
          {links.map((link) => (
            <a
              className="link-card"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.label}
            >
              <span className="link-card__tile">
                <span className="dot" />
                <LinkIcon name={link.icon} />
              </span>
              <span className="link-card__text">
                <span className="link-card__label">{link.label}</span>
                <span className="link-card__sub">{link.sub}</span>
              </span>
              <span className="link-card__arrow">
                <ArrowIcon />
              </span>
            </a>
          ))}
        </div>
        <div className="section-head">
          <span>CONTACT</span>
          <span className="line" />
        </div>
        <div className="links">
          <div className="link-card">
              <span className="link-card__tile">
                <span className="dot" />
                <EmailIcon />
              </span>
              <span className="link-card__text">
                <span className="link-card__label">Email</span>
                <span className="link-card__sub">{profile.email}</span>
                <span className="link-card__sub">NOSPAM 을 지우고 입력하십시오</span>

              </span>
              {/* <span className="link-card__arrow"> */}
                {/* <ArrowIcon /> */}
              {/* </span> */}
            </div>
        </div>

        {/* ───────── 확장 슬롯 (준비 중) ───────── */}
        {showSlots && (
          <div>
            <div className="section-head">
              <span>확장 슬롯 · SOON</span>
              <span className="line" />
            </div>
            <div className="slots">
              {slots.map((slot) => (
                <div className="slot" key={slot.label}>
                  <div className="slot__head">
                    <span className="slot__icon">
                      <PlusIcon />
                    </span>
                    <span className="slot__label">{slot.label}</span>
                  </div>
                  <span className="slot__note">
                    <span className="ndot" />
                    {slot.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* (2)(3) 입자 캔버스 오버레이 */}
      {(fx.tracks || fx.decay) && (
        <ParticleField
          ref={fieldRef}
          isDark={isDark}
          tracksEnabled={fx.tracks}
          decayEnabled={fx.decay}
          multiplicity={multiplicity}
        />
      )}

      {/* FX 컨트롤 패널 */}
      <FXPanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        fx={fx}
        onToggle={toggleFx}
        multiplicity={multiplicity}
        onMultiplicity={setMultiplicity}
      />
    </div>
  );
}
