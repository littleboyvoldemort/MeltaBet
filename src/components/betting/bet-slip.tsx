import { Loader2, Ticket, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatBdt } from "@/lib/currency";
import type { Selection } from "@/lib/betting.functions";

type Props = {
  selections: Selection[];
  stake: string;
  onStakeChange: (value: string) => void;
  onRemove: (matchId: string) => void;
  onClear: () => void;
  onPlaceBet: () => void;
  placing: boolean;
  signedIn: boolean;
  balance: number;
};

export function BetSlip({
  selections,
  stake,
  onStakeChange,
  onRemove,
  onClear,
  onPlaceBet,
  placing,
  signedIn,
  balance,
}: Props) {
  const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1);
  const stakeNumber = Number(stake) || 0;
  const payout = stakeNumber * totalOdds;

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
          <Ticket className="size-4 text-primary" /> Bet slip
          <span className="rounded bg-primary px-1.5 text-xs font-black text-primary-foreground">
            {selections.length}
          </span>
        </h2>
        {selections.length > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="size-3" /> Clear
          </button>
        ) : null}
      </div>

      <div className="max-h-[40vh] space-y-2 overflow-y-auto px-4 py-3 lg:max-h-[50vh]">
        {selections.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            Tap any odds to add a selection.
          </p>
        ) : (
          selections.map((s) => (
            <div
              key={s.matchId}
              className="flex items-start gap-2 rounded-md border border-border bg-secondary px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs text-muted-foreground">{s.label.split(" — ")[0]}</p>
                <p className="text-sm font-semibold">{s.label.split(" — ")[1]}</p>
              </div>
              <span className="text-sm font-bold tabular-nums text-primary">{s.odds.toFixed(2)}</span>
              <button
                type="button"
                onClick={() => onRemove(s.matchId)}
                aria-label="Remove selection"
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="size-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="space-y-3 border-t border-border px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total odds</span>
          <span className="font-bold tabular-nums">{totalOdds.toFixed(2)}</span>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="stake" className="text-xs text-muted-foreground">
            Stake (৳)
          </Label>
          <Input
            id="stake"
            inputMode="decimal"
            value={stake}
            onChange={(e) => onStakeChange(e.target.value)}
            placeholder="0.00"
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Potential payout</span>
          <span className="text-lg font-black tabular-nums text-primary">{formatBdt(payout)}</span>
        </div>
        <Button
          className="w-full"
          size="lg"
          onClick={onPlaceBet}
          disabled={placing || selections.length === 0 || stakeNumber <= 0}
        >
          {placing ? <Loader2 className="size-4 animate-spin" /> : null}
          {signedIn ? "Place bet" : "Sign in to bet"}
        </Button>
        {signedIn && stakeNumber > balance ? (
          <p className="text-center text-xs text-destructive">Stake exceeds your balance.</p>
        ) : null}
      </div>
    </div>
  );
}
