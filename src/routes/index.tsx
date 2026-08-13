import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Dices, Trophy } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/betting/site-header";
import { MatchList } from "@/components/betting/match-list";
import { CasinoGrid } from "@/components/betting/casino-grid";
import { DepositDialog, WithdrawDialog } from "@/components/betting/wallet-dialogs";
import { cn } from "@/lib/utils";
import type { CasinoGame } from "@/lib/casino-games";
import {
  useAccount,
  useInvalidateAccount,
  useMatches,
  useSession,
} from "@/lib/betting-hooks";
import { requestWithdraw, submitDeposit } from "@/lib/betting.functions";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "MeltaBet — Live Sports Betting & Casino" },
      {
        name: "description",
        content:
          "Bet on football with 3-way odds, play live casino games, and deposit via bKash or Nagad on MeltaBet.",
      },
      { property: "og:title", content: "MeltaBet — Live Sports Betting & Casino" },
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
  const invalidate = useInvalidateAccount();

  const [displayBalance, setDisplayBalance] = useState<number | null>(null);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"sports" | "casino">("sports");

  const depositFn = useServerFn(submitDeposit);
  const withdrawFn = useServerFn(requestWithdraw);

  const accountBalance = account.data?.profile?.balance ?? 0;
  const balance = displayBalance ?? accountBalance;

  useEffect(() => {
    if (account.data?.profile?.balance != null) {
      setDisplayBalance(account.data.profile.balance);
    }
  }, [account.data?.profile?.balance]);

  const depositMutation = useMutation({
    mutationFn: (vars: { amount: number; txId: string }) => depositFn({ data: vars }),
    onSuccess: () => {
      setDepositOpen(false);
      toast.success("Deposit request submitted! Please wait for admin approval.");
      invalidate();
    },
    onError: (e: Error) => toast.error(e.message || "Could not submit deposit"),
  });

  const withdrawMutation = useMutation({
    mutationFn: (vars: { amount: number; wallet: string }) => withdrawFn({ data: vars }),
    onSuccess: (res) => {
      setWithdrawOpen(false);
      setDisplayBalance(res.balance);
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
        username={account.data?.profile?.username}
        balance={balance}
        isAdmin={account.data?.isAdmin}
        loading={account.isLoading}
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
              ? "Pick a match, enter your bet amount, and place instantly. Deposits via bKash/Nagad."
              : "Stream live roulette, blackjack, baccarat and game shows — play with your MeltaBet balance in real time."}
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
              signedIn={signedIn}
              onRequireAuth={requireAuth}
              onBalanceUpdate={setDisplayBalance}
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
      </main>

      <DepositDialog
        open={depositOpen}
        onOpenChange={setDepositOpen}
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
