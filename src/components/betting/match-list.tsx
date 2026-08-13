import { useState } from "react";
import { Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { placeBet } from "@/lib/betting.functions";
import type { Match } from "@/lib/betting-hooks";
import { formatBdt, MIN_BET_BDT } from "@/lib/currency";

type Props = {
  matches: Match[];
  loading: boolean;
  error?: string | null;
  isDemo?: boolean;
  signedIn: boolean;
  onRequireAuth: () => boolean;
  onBalanceUpdate: (balance: number) => void;
};

export function MatchList({
  matches,
  loading,
  error,
  isDemo,
  signedIn,
  onRequireAuth,
  onBalanceUpdate,
}: Props) {
  const placeBetFn = useServerFn(placeBet);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [placingId, setPlacingId] = useState<string | null>(null);

  async function handlePlaceBet(match: Match) {
    if (!onRequireAuth()) return;

    const amount = Number(amounts[match.id]);
    if (!Number.isFinite(amount) || amount < MIN_BET_BDT) {
      toast.error(`Minimum bet is ${formatBdt(MIN_BET_BDT)}`);
      return;
    }
    if (!match.is_open) {
      toast.error("Betting is closed for this match");
      return;
    }

    setPlacingId(match.id);
    try {
      const res = await placeBetFn({
        data: {
          amount,
          odds: match.odds_home,
          matchId: match.id,
        },
      });

      onBalanceUpdate(res.new_balance);
      setAmounts((prev) => ({ ...prev, [match.id]: "" }));

      if (res.status === "won") {
        toast.success(`Congratulations! You won ${formatBdt(res.payout)}`);
      } else {
        toast.error("You lost! Better luck next time.");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not place bet");
    } finally {
      setPlacingId(null);
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-xl" />
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
      {matches.map((m) => (
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
          <h3 className="mb-2 text-base font-bold">
            {m.home_team} <span className="text-muted-foreground">vs</span> {m.away_team}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Home odds: <span className="font-bold text-primary">{m.odds_home.toFixed(2)}</span>
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor={`bet-${m.id}`}>Bet Amount (Min 50)</Label>
              <Input
                id={`bet-${m.id}`}
                inputMode="decimal"
                value={amounts[m.id] ?? ""}
                onChange={(e) => setAmounts((prev) => ({ ...prev, [m.id]: e.target.value }))}
                placeholder="50"
                disabled={!m.is_open || placingId === m.id}
              />
            </div>
            <Button
              className="sm:w-36"
              disabled={!m.is_open || placingId === m.id}
              onClick={() => handlePlaceBet(m)}
            >
              {placingId === m.id ? (
                <Loader2 className="size-4 animate-spin" />
              ) : signedIn ? (
                "Place Bet"
              ) : (
                "Sign in to bet"
              )}
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
