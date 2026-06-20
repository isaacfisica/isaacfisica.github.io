'use client';

import { AtomIcon } from '@/components/icons';

export interface FXState {
  pcb: boolean;
  tracks: boolean;
  decay: boolean;
}

function Switch({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      className={'fxsw' + (on ? ' is-on' : '')}
      onClick={() => onChange(!on)}
    >
      <span className="fxsw__knob" />
    </button>
  );
}

export default function FXPanel({
  open,
  onOpenChange,
  fx,
  onToggle,
  multiplicity,
  onMultiplicity,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  fx: FXState;
  onToggle: (key: keyof FXState, value: boolean) => void;
  multiplicity: number;
  onMultiplicity: (v: number) => void;
}) {
  return (
    <>
      <button
        type="button"
        className="fx-fab"
        data-fx-exclude="true"
        aria-label="FX 설정 패널 열기"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      >
        <AtomIcon />
      </button>

      {open && (
        <div className="fx-panel" data-fx-exclude="true" role="dialog" aria-label="FX 설정">
          <div className="fx-panel__head">
            <span className="fx-panel__title">FX · 실험 장치</span>
            <button
              type="button"
              className="fx-panel__close"
              aria-label="닫기"
              onClick={() => onOpenChange(false)}
            >
              ✕
            </button>
          </div>

          <div className="fx-row">
            <div>
              <div className="fx-row__label">PCB 회로 배경</div>
              <div className="fx-row__sub">전류가 흐르는 고전압 보드</div>
            </div>
            <Switch on={fx.pcb} onChange={(v) => onToggle('pcb', v)} label="PCB 회로 배경" />
          </div>

          <div className="fx-row">
            <div>
              <div className="fx-row__label">이벤트 디스플레이</div>
              <div className="fx-row__sub">프로필 클릭 → 입자 트랙</div>
            </div>
            <Switch on={fx.tracks} onChange={(v) => onToggle('tracks', v)} label="이벤트 디스플레이" />
          </div>

          {fx.tracks && (
            <div className="fx-mult">
              <div className="fx-mult__top">
                <span>MULTIPLICITY</span>
                <span className="fx-mult__val">{multiplicity}</span>
              </div>
              <input
                className="fx-range"
                type="range"
                min={2}
                max={48}
                step={1}
                value={multiplicity}
                aria-label="Multiplicity (트랙 개수)"
                onChange={(e) => onMultiplicity(Number(e.target.value))}
              />
            </div>
          )}

          <div className="fx-row">
            <div>
              <div className="fx-row__label">입자 붕괴</div>
              <div className="fx-row__sub">배경 클릭 → Λ⁰ → p + π⁻</div>
            </div>
            <Switch on={fx.decay} onChange={(v) => onToggle('decay', v)} label="입자 붕괴" />
          </div>

          <div className="fx-hint">프로필·배경을 클릭해보세요</div>
        </div>
      )}
    </>
  );
}
