import type { IconName } from '@/lib/data';

const DEFAULT_SIZE: Record<IconName, number> = {
  youtube: 22,
  stream: 22,
  x: 19,
  discord: 22,
  support: 21,
};

/* 플랫폼 아이콘 — 새 아이콘이 필요하면 IconName에 키를 추가하고
   아래 switch에 case를 하나 더 넣으세요. */
export function LinkIcon({ name, size }: { name: IconName; size?: number }) {
  const s = size ?? DEFAULT_SIZE[name];
  switch (name) {
    case 'youtube':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .7 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.3 12 31 31 0 0 0 23 7.5ZM9.8 15.3V8.7l5.7 3.3Z" />
        </svg>
      );
    case 'stream':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2.5" y="6" width="14" height="12" rx="2" />
          <path d="M8.5 10.5 12 12 8.5 13.5z" fill="currentColor" stroke="none" />
          <path d="M19.5 8.2c1.3 1.4 1.3 6.2 0 7.6M22 5.6c2.4 2.6 2.4 10.2 0 12.8" />
        </svg>
      );
    case 'x':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.5 3h3l-7 8 8.2 10h-6.4l-5-6.1L4 21H1l7.5-8.6L.6 3H7l4.5 5.6L17.5 3Zm-1.1 16h1.7L7.7 4.8H5.9L16.4 19Z" />
        </svg>
      );
    case 'discord':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19.5 5.6A16 16 0 0 0 15.6 4.4l-.2.4a14.8 14.8 0 0 1 3.3 1.3 12.5 12.5 0 0 0-10.8 0A14.8 14.8 0 0 1 11.2 4.8L11 4.4A16 16 0 0 0 7.1 5.6C3.6 10.8 2.7 15.8 3.1 20.8a16.2 16.2 0 0 0 4.9 2.5l.4-.6c-.8-.3-1.5-.6-2.2-1l.5-.4a11.6 11.6 0 0 0 9.9 0l.5.4c-.7.4-1.4.7-2.2 1l.4.6a16.1 16.1 0 0 0 4.9-2.5c.5-5.8-.9-10.7-3.7-15.2ZM9.3 17c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm5.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
        </svg>
      );
    case 'support':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 21s-7.4-4.6-9.6-9A5.1 5.1 0 0 1 12 6.6 5.1 5.1 0 0 1 21.6 12C19.4 16.4 12 21 12 21Z" />
        </svg>
      );
  }
}

export function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19" />
    </svg>
  );
}

export function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width={13} height={13} fill="currentColor" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function AtomIcon() {
  return (
    <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <circle cx="12" cy="12" r="1.7" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M12 6v12M6 12h12" />
    </svg>
  );
}
