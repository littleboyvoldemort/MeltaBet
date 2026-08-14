import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { Dices, Trophy } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/betting/site-header";
import { MatchList } from "@/components/betting/match-list";
import { CasinoGrid } from "@/components/betting/casino-grid";
import { BetSlip } from "@/components/betting/bet-slip";
import { DepositDialog, WithdrawDialog } from "@/components/betting/wallet-dialogs";
import { formatBdt } from "@/lib/currency";
import { cn } from "@/lib/utils";
import type { CasinoGame } from "@/lib/casino-games";
import {
  useAccount,
  useDepositWallet,
  useInvalidateAccount,
  useMatches,
  useSession,
  type Match,
} from "@/lib/betting-hooks";
import { placeBet, requestWithdraw, submitDeposit, type Selection } from "@/lib/betting.functions";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "ApexBet — Live Sports Betting & Casino" },
      {
        name: "description",
        content:
          "Bet on football with 3-way odds, play live casino games, and deposit via bKash or Nagad on ApexBet.",
      },
      { property: "og:title", content: "ApexBet — Live Sports Betting & Casino" },
      {
        property: "og:description",
        content:
          "Bet on football with 3-way odds, play live casino games, and deposit via bKash or Nagad.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const { session } = useSession();
  const signedIn = !!session;
  const account = useAccount(signedIn);
  const matches = useMatches();
  const wallet = useDepositWallet();
  const invalidate = useInvalidateAccount();

  const [selections, setSelections] = useState<Selection[]>([]);
  const [stake, setStake] = useState("");
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"sports" | "casino">("sports");

  const placeBetFn = useServerFn(placeBet);
  const depositFn = useServerFn(submitDeposit);
  const withdrawFn = useServerFn(requestWithdraw);

  const balance = account.data?.profile?.balance ?? 0;

  const betMutation = useMutation({
    mutationFn: () => placeBetFn({ data: { selections, stake: Number(stake) } }),
    onSuccess: (res) => {
      toast.success(`Bet placed — potential payout ${formatBdt(res.payout)}`);
      setSelections([]);
      setStake("");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message || "Could not place bet"),
  });

  const depositMutation = useMutation({
    mutationFn: (vars: { amount: number; txId: string }) => depositFn({ data: vars }),
    onSuccess: () => {
      setDepositOpen(false);
      toast.success("Deposit submitted. Awaiting admin confirmation.");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message || "Could not submit deposit"),
  });

  const withdrawMutation = useMutation({
    mutationFn: (vars: { amount: number; wallet: string }) => withdrawFn({ data: vars }),
    onSuccess: () => {
      setWithdrawOpen(false);
      toast.success("Withdrawal request submitted. Pending admin processing.");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message || "Could not request withdrawal"),
  });

  function requireAuth() {
    if (!signedIn) {
      toast.error("Please sign in first");
      navigate({ to: "/auth" });
      return false;
    }
    return true;
  }

  function pick(match: Match, choice: "home" | "draw" | "away") {
    const odds =
      choice === "home" ? match.odds_home : choice === "draw" ? match.odds_draw : match.odds_away;
    const label = `${match.home_team} v ${match.away_team} — ${
      choice === "home" ? match.home_team : choice === "draw" ? "Draw" : match.away_team
    }`;
    setSelections((prev) => {
      const existing = prev.find((s) => s.matchId === match.id);
      if (existing && existing.pick === choice) return prev.filter((s) => s.matchId !== match.id);
      const next = prev.filter((s) => s.matchId !== match.id);
      return [...next, { matchId: match.id, pick: choice, odds, label }];
    });
  }

  const selectedMap = Object.fromEntries(selections.map((s) => [s.matchId, s.pick])) as Record<
    string,
    "home" | "draw" | "away"
  >;

  function handleCasinoPlay(game: CasinoGame) {
    if (!requireAuth()) return;
    toast.info(`${game.name} is launching soon — live dealer integration coming next.`);
  }

  const matchData = matches.data?.matches ?? [];
  const isDemoMatches = matches.data?.isDemo ?? false;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        signedIn={signedIn}
        onDeposit={() => requireAuth() && setDepositOpen(true)}
        onWithdraw={() => requireAuth() && setWithdrawOpen(true)}
        onSignOut={async () => {
          await supabase.auth.signOut();
          toast.success("Signed out");
          navigate({ to: "/auth", replace: true });
        }}
      />

      <main className="mx-auto max-w-7xl px-4 py-6">
        <section className="mb-6 overflow-hidden rounded-2xl border border-border bg-card p-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {activeTab === "sports" ? "Sportsbook" : "Live Casino"}
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            {activeTab === "sports"
              ? "Back your call. Beat the odds."
              : "Real dealers. Real action."}
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {activeTab === "sports"
              ? "Three-way markets on the biggest fixtures, instant bet slips, and bKash/Nagad deposits with manual security review on every payout."
              : "Stream live roulette, blackjack, baccarat and game shows — play with your ApexBet balance in real time."}
          </p>
        </section>

        <div className="mb-6 flex gap-2 rounded-xl border border-border bg-card p-1">
          <button
            type="button"
            onClick={() => setActiveTab("sports")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
              activeTab === "sports"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Trophy className="size-4" />
            Sportsbook
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("casino")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors",
              activeTab === "casino"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Dices className="size-4" />
            Live Casino
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div>
            {activeTab === "sports" ? (
              <>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Upcoming matches
                </h2>
                <MatchList
                  matches={matchData}
                  loading={matches.isLoading}
                  error={matches.isError ? (matches.error as Error).message : null}
                  isDemo={isDemoMatches}
                  selected={selectedMap}
                  onPick={pick}
                />
              </>
            ) : (
              <>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
                  Live casino games
                </h2>
                <CasinoGrid signedIn={signedIn} onPlay={handleCasinoPlay} />
              </>
            )}
          </div>

          {activeTab === "sports" ? (
            <aside className="lg:sticky lg:top-20 lg:h-fit">
              <BetSlip
                selections={selections}
                stake={stake}
                onStakeChange={setStake}
                onRemove={(id) => setSelections((p) => p.filter((s) => s.matchId !== id))}
                onClear={() => setSelections([])}
                onPlaceBet={() => requireAuth() && betMutation.mutate()}
                placing={betMutation.isPending}
                signedIn={signedIn}
                balance={balance}
              />
            </aside>
          ) : null}
        </div>
      </main>

      <DepositDialog
        open={depositOpen}
        onOpenChange={setDepositOpen}
        merchantNumber={wallet.data ?? ""}
        merchantLoading={wallet.isLoading}
        submitting={depositMutation.isPending}
        onSubmit={(amount, txId) => depositMutation.mutate({ amount, txId })}
      />
      <WithdrawDialog
        open={withdrawOpen}
        onOpenChange={setWithdrawOpen}
        balance={balance}
        submitting={withdrawMutation.isPending}
        onSubmit={(amount, w) => withdrawMutation.mutate({ amount, wallet: w })}
      />
    </div>
  );
}
