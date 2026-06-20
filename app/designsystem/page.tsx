'use client';

import type { IconName } from '@/lib/data';
import { LinkIcon, ArrowIcon, all_icons } from '@/components/icons';
import { IconTile, DSSectionHead, DSCardLabel, DSCard, DSGrid } from '@/lib/blocks';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/lib/theme-context';
import {
  ACCENT_SWATCHES,
  SURFACE_SWATCHES,
  TYPE_SCALE,
  RADII,
} from '@/lib/designsystem-data';

const MONO = "'IBM Plex Mono',monospace";
const SORA = "'Sora','Noto Sans KR',sans-serif";

const ICON_NAMES: IconName[] = ['youtube', 'stream', 'x', 'discord', 'support'];

export default function DesignSystemPage() {
  const { isDark, setTheme } = useTheme();
  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        color: 'var(--ink)',
        fontFamily: "'Noto Sans KR',system-ui,sans-serif",
        backgroundColor: 'var(--paper)',
        backgroundImage:
          'linear-gradient(var(--grid) 1px,transparent 1px), linear-gradient(90deg,var(--grid) 1px,transparent 1px), linear-gradient(var(--grid-strong) 1px,transparent 1px), linear-gradient(90deg,var(--grid-strong) 1px,transparent 1px)',
        backgroundSize: '26px 26px,26px 26px,130px 130px,130px 130px',
        transition: 'background-color .45s ease,color .45s ease',
      }}
    >
      {/* ===================== HERO ===================== */}
      <header
        style={{
          position: 'relative',
          maxWidth: 1080,
          margin: '0 auto',
          padding: '54px 28px 14px',
          overflow: 'hidden',
        }}
      >
        <svg
          width="180"
          height="180"
          viewBox="0 0 160 160"
          fill="none"
          stroke="var(--copper)"
          strokeWidth="1.4"
          style={{ position: 'absolute', top: -22, right: -30, opacity: 0.16, pointerEvents: 'none' }}
        >
          <path d="M0 30 H42 L62 50 H112" />
          <path d="M0 72 H30 L56 98 H92 L112 78 H160" />
          <circle cx="112" cy="50" r="3.2" fill="var(--copper)" stroke="none" />
          <circle cx="92" cy="98" r="3.2" fill="var(--copper)" stroke="none" />
        </svg>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: '.16em',
              color: 'var(--ink-soft)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--cyan)',
                boxShadow: '0 0 8px var(--glow)',
              }}
            />
            SPEC SHEET · 디자인 시스템
          </span>
        </div>

        <h1
          style={{
            fontFamily: SORA,
            fontWeight: 700,
            fontSize: 40,
            lineHeight: 1.08,
            letterSpacing: '-.015em',
            margin: '14px 0 0',
            color: 'var(--ink)',
          }}
        >
          이삭 ISAAC{' '}
          <span style={{ color: 'var(--accent-text)', fontWeight: 600 }}>디자인 시스템</span>
        </h1>
        <p style={{ maxWidth: 600, margin: '14px 0 0', fontSize: 15, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
          "실험실 작업대" 무드를 기준으로 링크 허브와 검출기 원리 페이지에서 추출한 토큰·타이포·컴포넌트 명세.
          우상단 토글로 라이트(연구실 벤치) / 다크(지하 검출기 홀) 두 테마를 모두 검수할 수 있습니다.
        </p>
      </header>

      <main
        style={{
          maxWidth: 1080,
          margin: '0 auto',
          padding: '14px 28px 96px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {/* ===================== 01 · 색상 ===================== */}
        <section style={{ marginTop: 24 }}>
          <DSSectionHead no="01" label="COLOR · 색상 토큰" />

          <DSCardLabel style={{ margin: '0 0 12px 2px' }}>▸ 액센트 / 시그널</DSCardLabel>
          <DSGrid cols={4}>
            {ACCENT_SWATCHES.map((sw) => (
              <DSCard key={sw.token} style={{ overflow: 'hidden' }}>
                <div style={{ height: 78, background: sw.css, position: 'relative' }}>
                  <span
                    style={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,.7)',
                    }}
                  />
                </div>
                <div style={{ padding: '11px 13px 13px' }}>
                  <div style={{ fontFamily: SORA, fontWeight: 600, fontSize: 13.5, color: 'var(--ink)' }}>
                    {sw.name}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 10.5, color: 'var(--ink-soft)', marginTop: 3 }}>
                    {sw.token}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 10.5, color: 'var(--accent-text)', marginTop: 6 }}>
                    {isDark ? sw.dark : sw.light}
                  </div>
                </div>
              </DSCard>
            ))}
          </DSGrid>

          <DSCardLabel style={{ margin: '22px 0 12px 2px' }}>▸ 표면 / 텍스트 / 보더</DSCardLabel>
          <DSGrid cols={4}>
            {SURFACE_SWATCHES.map((sw) => (
              <DSCard key={sw.token} style={{ overflow: 'hidden' }}>
                <div style={{ height: 64, background: sw.css, borderBottom: '1px solid var(--border)' }} />
                <div style={{ padding: '11px 13px 13px' }}>
                  <div style={{ fontFamily: SORA, fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>
                    {sw.name}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: 10.5, color: 'var(--ink-soft)', marginTop: 3 }}>
                    {sw.token}
                  </div>
                </div>
              </DSCard>
            ))}
          </DSGrid>
        </section>

        {/* ===================== 02 · 타이포 ===================== */}
        <section style={{ marginTop: 30 }}>
          <DSSectionHead no="02" label="TYPE · 타이포그래피" />
          <DSGrid cols={3} style={{ marginBottom: 14 }}>
            <DSCard style={{ padding: 18 }}>
              <DSCardLabel>DISPLAY · 제목</DSCardLabel>
              <div
                style={{
                  fontFamily: "'Sora',sans-serif",
                  fontWeight: 700,
                  fontSize: 40,
                  lineHeight: 1,
                  margin: '14px 0 8px',
                  color: 'var(--ink)',
                }}
              >
                Sora
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                제목·라벨·강조. 700/600 위주. letter-spacing -.015em.
              </div>
            </DSCard>
            <DSCard style={{ padding: 18 }}>
              <DSCardLabel>BODY · 본문</DSCardLabel>
              <div
                style={{
                  fontFamily: "'Noto Sans KR',sans-serif",
                  fontWeight: 700,
                  fontSize: 36,
                  lineHeight: 1,
                  margin: '14px 0 8px',
                  color: 'var(--ink)',
                }}
              >
                본문 Aa
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                한글 본문·설명. Noto Sans KR 400/500/700.
              </div>
            </DSCard>
            <DSCard style={{ padding: 18 }}>
              <DSCardLabel>MONO · 라벨/수치</DSCardLabel>
              <div
                style={{
                  fontFamily: MONO,
                  fontWeight: 500,
                  fontSize: 32,
                  lineHeight: 1,
                  margin: '14px 0 8px',
                  color: 'var(--accent-text)',
                }}
              >
                B = 2.0 T
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.6 }}>
                캡션·태그·수치·코드. IBM Plex Mono, 넓은 자간.
              </div>
            </DSCard>
          </DSGrid>

          <DSCard style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {TYPE_SCALE.map((t) => (
              <div
                key={t.meta}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 18,
                  borderBottom: '1px solid var(--border)',
                  paddingBottom: 14,
                }}
              >
                <span style={{ flex: '0 0 92px', fontFamily: MONO, fontSize: 10.5, color: 'var(--ink-soft)' }}>
                  {t.meta}
                </span>
                <span
                  style={{
                    fontFamily: t.font,
                    fontWeight: t.weight,
                    fontSize: t.px,
                    lineHeight: 1.15,
                    color: 'var(--ink)',
                  }}
                >
                  {t.sample}
                </span>
              </div>
            ))}
          </DSCard>
        </section>

        {/* ===================== 03 · 폼 ===================== */}
        <section style={{ marginTop: 30 }}>
          <DSSectionHead no="03" label="FORM · 라운드 · 그림자 · 그리드" />
          <DSGrid cols={2}>
            <DSCard style={{ padding: 20 }}>
              <DSCardLabel style={{ marginBottom: 16 }}>RADIUS · 모서리</DSCardLabel>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
                {RADII.map((r) => (
                  <div key={r.label} style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: 62,
                        height: 62,
                        background: 'var(--card-2)',
                        border: '1px solid var(--border)',
                        borderBottom: '2px solid var(--cyan)',
                        borderRadius: r.px,
                      }}
                    />
                    <div style={{ fontFamily: MONO, fontSize: 10, color: 'var(--ink-soft)', marginTop: 8 }}>
                      {r.label}
                    </div>
                  </div>
                ))}
              </div>
            </DSCard>

            <DSCard style={{ padding: 20 }}>
              <DSCardLabel style={{ marginBottom: 20 }}>ELEVATION · 그림자 &amp; 글로우</DSCardLabel>
              <div style={{ display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 74,
                      height: 54,
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 12,
                      boxShadow: 'var(--shadow)',
                    }}
                  />
                  <div style={{ fontFamily: MONO, fontSize: 10, color: 'var(--ink-soft)', marginTop: 10 }}>
                    --shadow
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 74,
                      height: 54,
                      background: 'var(--card)',
                      border: '1px solid var(--cyan)',
                      borderRadius: 12,
                      boxShadow: '0 0 0 1px var(--cyan), 0 12px 30px var(--glow)',
                    }}
                  />
                  <div style={{ fontFamily: MONO, fontSize: 10, color: 'var(--ink-soft)', marginTop: 10 }}>
                    hover glow
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: '50%',
                      background: 'var(--cyan)',
                      boxShadow: '0 0 14px var(--glow), 0 0 0 6px var(--glow)',
                    }}
                  />
                  <div style={{ fontFamily: MONO, fontSize: 10, color: 'var(--ink-soft)', marginTop: 10 }}>
                    --glow
                  </div>
                </div>
              </div>
            </DSCard>
          </DSGrid>

          <DSCard
            style={{
              marginTop: 12,
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              flexWrap: 'wrap',
            }}
          >
            <DSCardLabel>GRID · 배경 모눈</DSCardLabel>
            <div
              style={{
                flex: 1,
                minWidth: 200,
                height: 60,
                borderRadius: 10,
                border: '1px solid var(--border)',
                backgroundColor: 'var(--paper)',
                backgroundImage:
                  'linear-gradient(var(--grid) 1px,transparent 1px), linear-gradient(90deg,var(--grid) 1px,transparent 1px), linear-gradient(var(--grid-strong) 1px,transparent 1px), linear-gradient(90deg,var(--grid-strong) 1px,transparent 1px)',
                backgroundSize: '26px 26px,26px 26px,130px 130px,130px 130px',
              }}
            />
            <div style={{ fontFamily: MONO, fontSize: 10.5, color: 'var(--ink-soft)', lineHeight: 1.7 }}>
              26px 미세 모눈
              <br />
              130px 강조 모눈
            </div>
          </DSCard>
        </section>

        {/* ===================== 04 · 컴포넌트 ===================== */}
        <section style={{ marginTop: 30 }}>
          <DSSectionHead no="04" label="COMPONENTS · 컴포넌트" />
          <DSGrid cols={2}>
            {/* 링크 카드 */}
            <DSCard style={{ padding: 20 }}>
              <DSCardLabel style={{ marginBottom: 14 }}>LINK CARD · 링크 카드</DSCardLabel>
              <a
                href="#"
                className="ds-link-card"
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '13px 15px',
                  minHeight: 66,
                  background: 'var(--card-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 15,
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow)',
                }}
              >
                <IconTile>
                  <LinkIcon name="youtube" />
                </IconTile>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0, flex: 1 }}>
                  <span style={{ fontFamily: SORA, fontWeight: 600, fontSize: 16, lineHeight: 1.2 }}>YouTube</span>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-soft)' }}>메인 채널 · 풀영상</span>
                </span>
                <span style={{ color: 'var(--ink-soft)', display: 'flex' }}>
                  <ArrowIcon />
                </span>
              </a>
              <DSCardLabel style={{ marginTop: 10 }}>hover → translateY(-2px) + cyan ring + glow</DSCardLabel>
            </DSCard>

            {/* 버튼 / 칩 */}
            <DSCard style={{ padding: 20 }}>
              <DSCardLabel style={{ marginBottom: 14 }}>PILL · 버튼 / 칩 / 태그</DSCardLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                <a href="#" className="pill" onClick={(e) => e.preventDefault()}>
                  About
                  <svg
                    viewBox="0 0 24 24"
                    width="13"
                    height="13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
                {['물리 교양', '게임', '개그과학'].map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginTop: 14 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    fontFamily: MONO,
                    fontSize: 11,
                    color: 'var(--ink)',
                    background: 'var(--card-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 999,
                    padding: '5px 11px',
                    boxShadow: 'var(--shadow)',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-flex',
                      width: 13,
                      height: 13,
                      borderRadius: '50%',
                      border: '1.4px solid var(--mustard)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--mustard)',
                      fontSize: 9,
                    }}
                  >
                    ✕
                  </span>
                  B = 2.0 T
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: 'var(--ink)',
                    background: 'var(--card-2)',
                    border: '1px solid var(--border)',
                    borderRadius: 999,
                    padding: '5px 11px',
                    boxShadow: 'var(--shadow)',
                  }}
                >
                  μ⁻ · p = 10 GeV
                </span>
              </div>
              <DSCardLabel style={{ marginTop: 12 }}>데이터 칩 = 모노 라벨 + 시그널 도트</DSCardLabel>
            </DSCard>

            {/* 아이콘 타일 */}
            <DSCard style={{ padding: 20 }}>
              <DSCardLabel style={{ marginBottom: 14 }}>ICON TILE · 아이콘</DSCardLabel>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {ICON_NAMES.map((k) => (
                  <div key={k} style={{ textAlign: 'center' }}>
                    <IconTile>
                      <LinkIcon name={k} />
                    </IconTile>
                    <div style={{ fontFamily: MONO, fontSize: 9, color: 'var(--ink-soft)', marginTop: 6 }}>{k}</div>
                  </div>
                ))}
              </div>
              <DSCardLabel style={{ marginTop: 14 }}>stroke 1.7 / fill · 22px · 다크 타일 위 시안 도트</DSCardLabel>
            </DSCard>

            {/* 토글 + 섹션 라벨 */}
            <DSCard style={{ padding: 20 }}>
              <DSCardLabel style={{ marginBottom: 16 }}>CONTROLS · 토글 / 구분</DSCardLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                <span style={{ fontFamily: MONO, fontSize: 11, color: 'var(--ink-soft)' }}>
                  테마 토글 · {isDark ? '다크 → 라이트' : '라이트 → 다크'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22 }}>
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.18em', color: 'var(--ink-soft)' }}>
                  LINKS
                </span>
                <span style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,var(--border),transparent)' }} />
              </div>
              <DSCardLabel style={{ marginTop: 8 }}>섹션 라벨: 모노 + 자간 .18em + 페이드 라인</DSCardLabel>
            </DSCard>
          </DSGrid>
        </section>

        {/* ===================== 05 · 시그니처 장식 ===================== */}
        <section style={{ marginTop: 30 }}>
          <DSSectionHead no="05" label="MOTIFS · 시그니처 장식" />
          <DSGrid cols={3}>
            {/* 오실로스코프 파형 */}
            <DSCard
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <DSCardLabel>WAVEFORM · 파형 구분선</DSCardLabel>
              <svg
                width="100%"
                height="40"
                viewBox="0 0 280 40"
                preserveAspectRatio="none"
                style={{ display: 'block', margin: '18px 0' }}
              >
                <path
                  d="M0 20 H90 l6 -12 l6 24 l7 -28 l6 28 l6 -12 H132 C 156 20 156 6 180 6 S 214 34 240 20 H280"
                  fill="none"
                  stroke="var(--cyan)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <DSCardLabel>섹션 사이 리듬용 · cyan stroke</DSCardLabel>
            </DSCard>

            {/* PCB 트레이스 */}
            <DSCard
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <DSCardLabel>PCB TRACE · 회로 트레이스</DSCardLabel>
              <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0' }}>
                <svg width="130" height="100" viewBox="0 0 160 130" fill="none" stroke="var(--copper)" strokeWidth="1.6">
                  <path d="M0 30 H42 L62 50 H140" />
                  <path d="M0 80 H30 L56 106 H110 L130 86 H160" />
                  <circle cx="140" cy="50" r="3.4" fill="var(--copper)" stroke="none" />
                  <circle cx="110" cy="106" r="3.4" fill="var(--copper)" stroke="none" />
                  <circle cx="130" cy="86" r="2.8" fill="var(--copper)" stroke="none" />
                </svg>
              </div>
              <DSCardLabel>코너 배경 장식 · copper, opacity ~.16</DSCardLabel>
            </DSCard>

            {/* 검출기 동심원 + 원자 */}
            <DSCard
              style={{
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <DSCardLabel>DETECTOR · 동심원 / 원자</DSCardLabel>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 14,
                  margin: '10px 0',
                  height: 100,
                }}
              >
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  style={{ animation: 'spin-slow 90s linear infinite' }}
                >
                  <circle cx="50" cy="50" r="47" stroke="var(--grid-strong)" strokeWidth="1" />
                  <circle cx="50" cy="50" r="38" stroke="var(--cyan)" strokeWidth="1" strokeOpacity=".5" strokeDasharray="3 7" />
                  <circle cx="50" cy="50" r="29" stroke="var(--copper)" strokeWidth="1" strokeOpacity=".44" strokeDasharray="1 8" />
                </svg>
                <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="var(--accent-text)" strokeWidth="1.4">
                  <circle cx="12" cy="12" r="1.7" fill="var(--accent-text)" />
                  <ellipse cx="12" cy="12" rx="9" ry="3.6" />
                  <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
                </svg>
              </div>
              <DSCardLabel>아바타 링 · 원자 핀 · 90s 회전</DSCardLabel>
            </DSCard>
          </DSGrid>
        </section>

        {/* ===================== 06 · 아이콘 ===================== */}
        <section style={{ marginTop: 30 }}>
          <DSSectionHead no="06" label="AVAILABLE ICONS · 사용가능한 아이콘" />
          <DSCard style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {all_icons.map((k) => (
                <div key={`icon-${k.name}`} style={{ textAlign: 'center' }}>
                  <IconTile>
                    {k.icon()}
                  </IconTile>
                  <div style={{ fontFamily: MONO, fontSize: 9, color: 'var(--ink-soft)', marginTop: 6 }}>{k.name}</div>
                </div>
              ))}
            </div>
          </DSCard>
        </section>

        {/* ===================== FOOTER ===================== */}
        <footer
          style={{
            marginTop: 42,
            paddingTop: 22,
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '.06em', color: 'var(--ink-soft)' }}>
            이삭 ISAAC · DESIGN SYSTEM v1.0 · 2026
          </span>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: MONO,
              fontSize: 10.5,
              letterSpacing: '.06em',
              color: 'var(--ink-soft)',
            }}
          >
            <span
              style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--glow)' }}
            />
            REC · 작업대 무드
          </span>
        </footer>
      </main>
    </div>
  );
}
