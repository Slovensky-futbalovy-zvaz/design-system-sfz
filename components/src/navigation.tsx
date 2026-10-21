import * as React from "react";
import { Icon, IconName } from "./icons";

const cx = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(" ");

/* ---------- Tabs ---------- */
export interface TabItem { id: string; label: string; icon?: IconName | string; count?: number; disabled?: boolean }
export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  /** segmented = iOS segmented control (max. 4 položky); underline = podčiarknuté záložky (viac položiek, posúvateľné). */
  variant?: "underline" | "segmented";
  className?: string;
  "aria-label"?: string;
}

export function Tabs({ items, value, onChange, variant = "underline", className, ...rest }: TabsProps) {
  const refs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const enabled = items.map((it, idx) => (!it.disabled ? idx : -1)).filter((x) => x >= 0);
    const pos = enabled.indexOf(i);
    let next = -1;
    if (e.key === "ArrowRight") next = enabled[(pos + 1) % enabled.length]!;
    if (e.key === "ArrowLeft") next = enabled[(pos - 1 + enabled.length) % enabled.length]!;
    if (e.key === "Home") next = enabled[0]!;
    if (e.key === "End") next = enabled[enabled.length - 1]!;
    if (next >= 0) { e.preventDefault(); onChange(items[next]!.id); refs.current[next]?.focus(); }
  };
  return (
    <div className={cx("sfz-tabs", `sfz-tabs--${variant}`, className)} role="tablist" aria-label={rest["aria-label"]}>
      {items.map((it, i) => (
        <button
          key={it.id}
          ref={(el) => { refs.current[i] = el; }}
          type="button"
          role="tab"
          id={`tab-${it.id}`}
          aria-selected={value === it.id}
          aria-controls={`panel-${it.id}`}
          tabIndex={value === it.id ? 0 : -1}
          disabled={it.disabled}
          className={cx("sfz-tab", value === it.id && "is-active")}
          onClick={() => onChange(it.id)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {it.icon && <Icon name={it.icon} size={18} />}
          <span>{it.label}</span>
          {typeof it.count === "number" && <span className="sfz-tab__count">{it.count}</span>}
        </button>
      ))}
    </div>
  );
}

/* ---------- NavBar (desktop, ≥768 px) ---------- */
export interface NavItem { id: string; label: string; href?: string; icon?: IconName | string; active?: boolean; onClick?: () => void }
export interface NavBarProps {
  /** Logo: obrázok (napr. sfz-D-farebne.svg) alebo text. */
  brand: React.ReactNode;
  brandHref?: string;
  items: NavItem[];
  /** Pravá strana: avatar, tlačidlá, vyhľadávanie. */
  actions?: React.ReactNode;
  /** Modrý variant pre verejné weby; light pre aplikácie. */
  tone?: "light" | "brand";
  /** Zobrazí hamburger pod 768 px a volá tento handler (otvorí Drawer). */
  onMenu?: () => void;
  className?: string;
}

export function NavBar({ brand, brandHref = "/", items, actions, tone = "light", onMenu, className }: NavBarProps) {
  return (
    <header className={cx("sfz-navbar", `sfz-navbar--${tone}`, className)}>
      <div className="sfz-navbar__inner">
        {onMenu && (
          <button type="button" className="sfz-navbar__menu" aria-label="Menu" onClick={onMenu}><Icon name="menu" size={22} /></button>
        )}
        <a className="sfz-navbar__brand" href={brandHref}>{brand}</a>
        <nav className="sfz-navbar__nav" aria-label="Hlavná navigácia">
          {items.map((it) => (
            <a key={it.id} href={it.href ?? "#"} onClick={it.onClick} className={cx("sfz-navbar__link", it.active && "is-active")} aria-current={it.active ? "page" : undefined}>
              {it.icon && <Icon name={it.icon} size={18} />}
              {it.label}
            </a>
          ))}
        </nav>
        {actions && <div className="sfz-navbar__actions">{actions}</div>}
      </div>
    </header>
  );
}

/* ---------- TabBar (mobil, <768 px) ---------- */
export interface TabBarItem { id: string; label: string; icon: IconName | string; href?: string; badge?: number; onClick?: () => void }
export interface TabBarProps {
  items: TabBarItem[];
  value: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function TabBar({ items, value, onChange, className }: TabBarProps) {
  return (
    <nav className={cx("sfz-tabbar", className)} aria-label="Navigácia">
      {items.slice(0, 5).map((it) => {
        const active = it.id === value;
        return (
          <a
            key={it.id}
            href={it.href ?? "#"}
            className={cx("sfz-tabbar__item", active && "is-active")}
            aria-current={active ? "page" : undefined}
            onClick={(e) => { if (!it.href) e.preventDefault(); it.onClick?.(); onChange?.(it.id); }}
          >
            <span className="sfz-tabbar__icon">
              <Icon name={it.icon} size={24} />
              {it.badge ? <span className="sfz-tabbar__badge">{it.badge > 99 ? "99+" : it.badge}</span> : null}
            </span>
            <span className="sfz-tabbar__label">{it.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ---------- Modal ---------- */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  /** Tlačidlá v päte; na mobile sa skladajú pod seba. */
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  /** Na mobile vysunie zdola ako iOS sheet (predvolené). */
  sheetOnMobile?: boolean;
}

function useLockBody(open: boolean) {
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);
}

function useEscape(open: boolean, onClose: () => void) {
  React.useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);
}

export function Modal({ open, onClose, title, children, footer, size = "md", sheetOnMobile = true }: ModalProps) {
  useLockBody(open);
  useEscape(open, onClose);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { if (open) ref.current?.focus(); }, [open]);
  if (!open) return null;
  const id = `sfz-modal-${title.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <div className="sfz-overlay" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby={id} className={cx("sfz-modal", `sfz-modal--${size}`, sheetOnMobile && "sfz-modal--sheet")}>
        <header className="sfz-modal__head">
          <h2 id={id} className="sfz-modal__title">{title}</h2>
          <button type="button" className="sfz-modal__close" aria-label="Zavrieť" onClick={onClose}><Icon name="x" size={20} /></button>
        </header>
        <div className="sfz-modal__body">{children}</div>
        {footer && <footer className="sfz-modal__foot">{footer}</footer>}
      </div>
    </div>
  );
}

/* ---------- Drawer ---------- */
export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  side?: "left" | "right";
  children: React.ReactNode;
  /** Šírka na desktope v px (predvolené 320); na mobile 85 % šírky. */
  width?: number;
}

export function Drawer({ open, onClose, title, side = "left", children, width = 320 }: DrawerProps) {
  useLockBody(open);
  useEscape(open, onClose);
  if (!open) return null;
  return (
    <div className="sfz-overlay sfz-overlay--drawer" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <aside role="dialog" aria-modal="true" aria-label={title ?? "Panel"} className={cx("sfz-drawer", `sfz-drawer--${side}`)} style={{ width: `min(85vw, ${width}px)` }}>
        <header className="sfz-drawer__head">
          {title && <h2 className="sfz-drawer__title">{title}</h2>}
          <button type="button" className="sfz-modal__close" aria-label="Zavrieť" onClick={onClose}><Icon name="x" size={20} /></button>
        </header>
        <div className="sfz-drawer__body">{children}</div>
      </aside>
    </div>
  );
}
