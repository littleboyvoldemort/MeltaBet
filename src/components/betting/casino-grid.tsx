import { Dices, Spade, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatBdt } from "@/lib/currency";
import {
  CATEGORY_LABELS,
  LIVE_CASINO_GAMES,
  type CasinoGame,
} from "@/lib/casino-games";

const CATEGORY_GRADIENT: Record<CasinoGame["category"], string> = {
  roulette: "from-red-600/30 via-rose-900/40 to-background",
  blackjack: "from-emerald-600/30 via-green-900/40 to-background",
  baccarat: "from-blue-600/30 via-indigo-900/40 to-background",
  "game-show": "from-amber-500/30 via-orange-900/40 to-background",
  poker: "from-violet-600/30 via-purple-900/40 to-background",
};

type Props = {
  signedIn: boolean;
  onPlay: (game: CasinoGame) => void;
};

function CasinoCard({ game, signedIn, onPlay }: { game: CasinoGame } & Props) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50">
      <div
        className={cn(
          "relative flex h-32 items-end bg-gradient-to-br p-4",
          CATEGORY_GRADIENT[game.category],
        )}
      >
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
          <span className="size-1.5 animate-pulse rounded-full bg-white" />
          Live
        </span>
        {game.featured ? (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">Hot</Badge>
        ) : null}
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
            {game.provider}
          </p>
          <h3 className="text-lg font-bold leading-tight">{game.name}</h3>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="size-3.5" />
            {game.players.toLocaleString()}
          </span>
          <span>Min {formatBdt(game.minBet)}</span>
        </div>
        <Button size="sm" onClick={() => onPlay(game)}>
          {signedIn ? "Play" : "Sign in"}
        </Button>
      </div>
    </article>
  );
}

export function CasinoGrid({ signedIn, onPlay }: Props) {
  const featured = LIVE_CASINO_GAMES.filter((g) => g.featured);
  const rest = LIVE_CASINO_GAMES.filter((g) => !g.featured);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Dices className="size-4 text-primary" />
        <span>Real dealers · HD streams · Instant payouts</span>
      </div>

      <div>
        <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          <Spade className="size-3.5" /> Featured tables
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {featured.map((game) => (
            <CasinoCard key={game.id} game={game} signedIn={signedIn} onPlay={onPlay} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          All live games
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((game) => (
            <CasinoCard key={game.id} game={game} signedIn={signedIn} onPlay={onPlay} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <Badge key={key} variant="secondary" className="text-xs">
            {label}
          </Badge>
        ))}
      </div>
    </div>
  );
}
