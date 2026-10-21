import * as React from "react";
import { Icon } from "./icons";
import { Input, Select, IconButton } from "./controls";
import { EmptyState } from "./display";

const cx = (...a: Array<string | false | null | undefined>) => a.filter(Boolean).join(" ");

/* ---------- Table (jednoduchá) ---------- */
export interface Column<T> {
  key: keyof T & string;
  header: string;
  /** right pre čísla (tabular-nums). */
  align?: "left" | "right" | "center";
  width?: string;
  render?: (row: T) => React.ReactNode;
  /** Zoraďovateľný stĺpec (DataTable). */
  sortable?: boolean;
  /** Skryť pod bp-md; stĺpec sa ukáže až na tablete. */
  hideOnMobile?: boolean;
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  /** Zvýrazniť riadok pri hoveri a kliknúť. */
  onRowClick?: (row: T) => void;
  /** compact = 36 px riadky. */
  density?: "comfortable" | "compact";
  caption?: string;
  /** Na mobile zobrazí každý riadok ako kartu (label: hodnota). */
  stackOnMobile?: boolean;
  /** Aktívne zoradenie (DataTable ho riadi; dá sa použiť aj samostatne). */
  sort?: { key: string; dir: "asc" | "desc" } | null;
  onSort?: (key: string) => void;
  className?: string;
}

export function Table<T>({ columns, rows, rowKey, onRowClick, density = "comfortable", caption, stackOnMobile = true, sort, onSort, className }: TableProps<T>) {
  return (
    <div className={cx("sfz-table-wrap", className)}>
      <table className={cx("sfz-table", `sfz-table--${density}`, stackOnMobile && "sfz-table--stack", onRowClick && "is-clickable")}>
        {caption && <caption className="sfz-visually-hidden">{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" style={{ width: c.width, textAlign: c.align }} className={cx(c.hideOnMobile && "sfz-hide-mobile")} aria-sort={c.sortable && sort?.key === c.key ? (sort.dir === "asc" ? "ascending" : "descending") : undefined}>
                {c.sortable && onSort ? (
                  <button type="button" className={cx("sfz-table__sort", sort?.key === c.key && "is-active")} onClick={() => onSort(c.key)}>
                    {c.header}
                    <Icon name={sort?.key === c.key ? (sort.dir === "asc" ? "chevron-up" : "chevron-down") : "arrow-up-down"} size={14} />
                  </button>
                ) : c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={rowKey(r)} onClick={onRowClick ? () => onRowClick(r) : undefined} tabIndex={onRowClick ? 0 : undefined} onKeyDown={onRowClick ? (e) => { if (e.key === "Enter") onRowClick(r); } : undefined}>
              {columns.map((c) => (
                <td key={c.key} data-label={c.header} style={{ textAlign: c.align }} className={cx(c.align === "right" && "is-num", c.hideOnMobile && "sfz-hide-mobile")}>
                  {c.render ? c.render(r) : String((r as any)[c.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- DataTable (filter, sort, stránkovanie) ---------- */
export interface DataTableProps<T> extends Omit<TableProps<T>, "rows"> {
  rows: T[];
  /** Hľadá vo všetkých textových stĺpcoch. */
  searchable?: boolean;
  searchPlaceholder?: string;
  /** Výberové filtre: kľúč stĺpca → zoznam hodnôt. */
  filters?: Array<{ key: keyof T & string; label: string; options: string[] }>;
  pageSize?: number;
  /** Panel nástrojov vpravo (export, nový záznam). */
  toolbar?: React.ReactNode;
  emptyTitle?: string;
}

export function DataTable<T>({ rows, columns, searchable = true, searchPlaceholder = "Hľadať", filters = [], pageSize = 10, toolbar, emptyTitle = "Žiadne záznamy", ...tableProps }: DataTableProps<T>) {
  const [q, setQ] = React.useState("");
  const [sort, setSort] = React.useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = React.useState(0);
  const [fvals, setFvals] = React.useState<Record<string, string>>({});

  const filtered = React.useMemo(() => {
    let out = rows;
    if (q.trim()) {
      const needle = q.toLowerCase();
      out = out.filter((r) => columns.some((c) => String((r as any)[c.key] ?? "").toLowerCase().includes(needle)));
    }
    for (const [k, v] of Object.entries(fvals)) if (v) out = out.filter((r) => String((r as any)[k]) === v);
    if (sort) {
      const dir = sort.dir === "asc" ? 1 : -1;
      out = [...out].sort((a, b) => {
        const av = (a as any)[sort.key], bv = (b as any)[sort.key];
        if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
        return String(av ?? "").localeCompare(String(bv ?? ""), "sk") * dir;
      });
    }
    return out;
  }, [rows, q, fvals, sort, columns]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pages - 1);
  const slice = filtered.slice(safePage * pageSize, safePage * pageSize + pageSize);

  return (
    <div className="sfz-datatable">
      <div className="sfz-datatable__bar">
        {searchable && <Input icon="search" placeholder={searchPlaceholder} value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} aria-label={searchPlaceholder} />}
        {filters.map((f) => (
          <Select key={f.key} placeholder={f.label} aria-label={f.label} options={f.options.map((o) => ({ value: o, label: o }))} value={fvals[f.key] ?? ""} onChange={(e) => { setFvals({ ...fvals, [f.key]: e.target.value }); setPage(0); }} />
        ))}
        {toolbar && <div className="sfz-datatable__tools">{toolbar}</div>}
      </div>
      {slice.length === 0 ? (
        <EmptyState icon="search" title={emptyTitle} description={q ? `Pre „${q}“ sa nič nenašlo.` : undefined} />
      ) : (
        <Table
          {...tableProps}
          rows={slice}
          columns={columns}
          sort={sort}
          onSort={(key) => setSort((s) => (s?.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }))}
        />
      )}
      <div className="sfz-datatable__foot">
        <span className="sfz-datatable__count">{filtered.length} záznamov</span>
        <div className="sfz-datatable__pager">
          <IconButton icon="chevron-left" label="Predchádzajúca strana" size="sm" disabled={safePage === 0} onClick={() => setPage(safePage - 1)} />
          <span className="sfz-datatable__page">{safePage + 1} / {pages}</span>
          <IconButton icon="chevron-right" label="Ďalšia strana" size="sm" disabled={safePage >= pages - 1} onClick={() => setPage(safePage + 1)} />
        </div>
      </div>
    </div>
  );
}

/* ---------- Calendar ---------- */
export interface CalendarEvent { date: string; label?: string; tone?: "brand" | "success" | "warning" | "danger" }
export interface CalendarProps {
  /** Vybraný dátum ISO (YYYY-MM-DD). */
  value?: string;
  onChange?: (iso: string) => void;
  /** Zobrazený mesiac ISO (YYYY-MM); predvolene mesiac value alebo dnešok. */
  month?: string;
  onMonthChange?: (iso: string) => void;
  events?: CalendarEvent[];
  min?: string;
  max?: string;
  className?: string;
}

const SK_MONTHS = ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december"];
const SK_DAYS = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function Calendar({ value, onChange, month, onMonthChange, events = [], min, max, className }: CalendarProps) {
  const today = iso(new Date());
  const [innerMonth, setInnerMonth] = React.useState(() => (month ?? value ?? today).slice(0, 7));
  const m = month ?? innerMonth;
  const [y, mo] = m.split("-").map(Number) as [number, number];
  const first = new Date(y, mo - 1, 1);
  const offset = (first.getDay() + 6) % 7; // pondelok = 0
  const daysIn = new Date(y, mo, 0).getDate();
  const cells: Array<Date | null> = [...Array(offset).fill(null), ...Array.from({ length: daysIn }, (_, i) => new Date(y, mo - 1, i + 1))];
  while (cells.length % 7) cells.push(null);
  const evByDay = React.useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    for (const e of events) (map[e.date] ??= []).push(e);
    return map;
  }, [events]);
  const setMonth = (delta: number) => {
    const d = new Date(y, mo - 1 + delta, 1);
    const next = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    onMonthChange ? onMonthChange(next) : setInnerMonth(next);
  };
  return (
    <div className={cx("sfz-calendar", className)}>
      <div className="sfz-calendar__head">
        <IconButton icon="chevron-left" label="Predchádzajúci mesiac" size="sm" onClick={() => setMonth(-1)} />
        <span className="sfz-calendar__month" aria-live="polite">{SK_MONTHS[mo - 1]} {y}</span>
        <IconButton icon="chevron-right" label="Nasledujúci mesiac" size="sm" onClick={() => setMonth(1)} />
      </div>
      <div className="sfz-calendar__grid" role="grid">
        {SK_DAYS.map((d) => <span key={d} className="sfz-calendar__dow" role="columnheader">{d}</span>)}
        {cells.map((d, i) => {
          if (!d) return <span key={i} className="sfz-calendar__cell is-empty" />;
          const k = iso(d);
          const disabled = (min && k < min) || (max && k > max);
          const evs = evByDay[k] ?? [];
          return (
            <button
              key={k}
              type="button"
              role="gridcell"
              className={cx("sfz-calendar__cell", k === value && "is-selected", k === today && "is-today", d.getDay() === 0 && "is-sunday")}
              disabled={!!disabled}
              aria-selected={k === value}
              aria-label={`${d.getDate()}. ${SK_MONTHS[mo - 1]} ${y}${evs.length ? `, ${evs.length} udalostí` : ""}`}
              onClick={() => onChange?.(k)}
            >
              <span className="sfz-calendar__num">{d.getDate()}</span>
              {evs.length > 0 && (
                <span className="sfz-calendar__dots" aria-hidden="true">
                  {evs.slice(0, 3).map((e, j) => <span key={j} className={cx("sfz-calendar__dot", `is-${e.tone ?? "brand"}`)} />)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

