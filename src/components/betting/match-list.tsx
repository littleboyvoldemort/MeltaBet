import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Match } from "@/lib/betting-hooks";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  matches: Match[];
  loading: boolean;
  error?: string | null;
  isDemo?: boolean;
  selected: Record<string, "home" | "draw" | "away">;
  onPick: (match: Match, pick: "home" | "draw" | "away") => void;
};

function OddsButton({
  label,
  value,
  active,
  onClick,
  disabled,
}: {
  label: string;
  value: number;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-1 flex-col items-center gap-0.5 rounded-md border border-border bg-secondary px-2 py-2 transition-colors",
        "hover:border-primary/70 hover:bg-secondary/70 disabled:cursor-not-allowed disabled:opacity-50",
        active && "border-primary bg-primary text-primary-foreground hover:bg-primary",
      )}
    >
      <span
        className={cn(
          "text-[10px] uppercase tracking-wide",
          active ? "text-primary-foreground/80" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
      <span className="text-sm font-bold tabular-nums">{value.toFixed(2)}</span>
    </button>
  );
}

export function MatchList({ matches, loading, error, isDemo, selected, onPick }: Props) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-center">
        <p className="text-sm font-medium text-destructive">Could not load matches</p>
        <p className="mt-1 text-xs text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">No upcoming matches right now. Check back soon.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {isDemo ? (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200/90">
          Showing demo matches — run your Supabase migrations to load live odds from the database.
        </p>
      ) : null}
      {matches.map((m) => {
        const pick = selected[m.id];
        return (
          <article key={m.id} className="rounded-xl border border-border bg-card p-4">
            <div className="mb-3 flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="rounded bg-secondary px-2 py-1 font-semibold uppercase tracking-wide text-primary">
                {m.league}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {new Date(m.start_time).toLocaleString(undefined, {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <h3 className="mb-3 text-base font-bold">
              {m.home_team} <span className="text-muted-foreground">vs</span> {m.away_team}
            </h3>
            <div className="flex gap-2">
              <OddsButton
                label="1 Home"
                value={m.odds_home}
                active={pick === "home"}
                disabled={!m.is_open}
                onClick={() => onPick(m, "home")}
              />
              <OddsButton
                label="X Draw"
                value={m.odds_draw}
                active={pick === "draw"}
                disabled={!m.is_open}
                onClick={() => onPick(m, "draw")}
              />
              <OddsButton
                label="2 Away"
                value={m.odds_away}
                active={pick === "away"}
                disabled={!m.is_open}
                onClick={() => onPick(m, "away")}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
