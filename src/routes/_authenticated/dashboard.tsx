import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { SiteHeader } from "@/components/betting/site-header";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatBdt } from "@/lib/currency";
import { useAccount, useMyBets } from "@/lib/betting-hooks";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — ApexBet" },
      {
        name: "description",
        content: "View your bet history, balance, and account activity on ApexBet.",
      },
    ],
  }),
  component: DashboardPage,
});

function statusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status.toLowerCase()) {
    case "won":
      return "default";
    case "lost":
      return "destructive";
    default:
      return "secondary";
  }
}

function DashboardPage() {
  const navigate = useNavigate();
  const account = useAccount(true);
  const bets = useMyBets(true);

  const username = account.data?.profile?.username;
  const balance = account.data?.profile?.balance ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        signedIn
        onDeposit={() => navigate({ to: "/" })}
        onWithdraw={() => navigate({ to: "/" })}
        onSignOut={async () => {
          await supabase.auth.signOut();
          toast.success("Signed out");
          navigate({ to: "/auth", replace: true });
        }}
      />

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Dashboard</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">
            Welcome back{username ? `, ${username}` : ""}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your current balance is{" "}
            <span className="font-bold text-foreground">{formatBdt(balance)}</span>.
          </p>
        </div>

        <section className="rounded-xl border border-border bg-card">
          <div className="border-b border-border px-4 py-4">
            <h2 className="text-lg font-bold">Bet history</h2>
            <p className="text-sm text-muted-foreground">Your recent wagers and outcomes.</p>
          </div>

          {bets.isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : bets.isError ? (
            <p className="px-4 py-8 text-sm text-destructive">
              {(bets.error as Error).message || "Could not load bet history."}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bet Amount (৳)</TableHead>
                  <TableHead>Odds</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Payout (৳)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(bets.data ?? []).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                      No bets yet.{" "}
                      <Link to="/" className="font-medium text-primary hover:underline">
                        Place your first bet
                      </Link>
                    </TableCell>
                  </TableRow>
                ) : (
                  (bets.data ?? []).map((bet) => (
                    <TableRow key={bet.id}>
                      <TableCell className="font-medium tabular-nums">
                        {formatBdt(bet.amount)}
                      </TableCell>
                      <TableCell className="tabular-nums">{bet.odds.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(bet.status)} className="capitalize">
                          {bet.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium tabular-nums">
                        {formatBdt(bet.payout)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </section>
      </main>
    </div>
  );
}
