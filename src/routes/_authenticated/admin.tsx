import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Check, Loader2, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  getAdminOverview,
  decideDeposit,
  markWithdrawPaid,
  updateDepositWallet,
} from "@/lib/admin.functions";
import { formatBdt } from "@/lib/currency";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin console — ApexBet" },
      { name: "description", content: "Approve deposits, process withdrawals and manage payout settings." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const overviewFn = useServerFn(getAdminOverview);
  const decideFn = useServerFn(decideDeposit);
  const payFn = useServerFn(markWithdrawPaid);
  const walletFn = useServerFn(updateDepositWallet);
  const [wallet, setWallet] = useState("");

  const overview = useQuery({ queryKey: ["admin-overview"], queryFn: () => overviewFn(), retry: false });

  useEffect(() => {
    if (overview.data?.walletAddress) setWallet(overview.data.walletAddress);
  }, [overview.data?.walletAddress]);

  useEffect(() => {
    if (overview.isError) {
      toast.error("You don't have access to the admin console.");
      navigate({ to: "/", replace: true });
    }
  }, [overview.isError, navigate]);

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin-overview"] });

  const decide = useMutation({
    mutationFn: (vars: { id: string; approve: boolean }) => decideFn({ data: vars }),
    onSuccess: (_d, vars) => {
      toast.success(vars.approve ? "Deposit approved and credited" : "Deposit rejected");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const pay = useMutation({
    mutationFn: (id: string) => payFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Withdrawal marked as paid");
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveWallet = useMutation({
    mutationFn: () => walletFn({ data: { address: wallet } }),
    onSuccess: () => {
      toast.success("Merchant number updated");
      queryClient.invalidateQueries({ queryKey: ["deposit-wallet"] });
      refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const txs = overview.data?.transactions ?? [];
  const pendingDeposits = txs.filter((t) => t.type === "deposit" && t.status === "pending");
  const pendingWithdrawals = txs.filter((t) => t.type === "withdraw" && t.status === "pending");
  const history = txs.filter((t) => t.status !== "pending").slice(0, 25);

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Admin console</h1>
            <p className="text-sm text-muted-foreground">Approve deposits, process withdrawals, and set the merchant number.</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="size-4" /> Back to sportsbook
            </Link>
          </Button>
        </div>

        {overview.isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Loading admin data…
          </div>
        ) : (
          <>
            <section className="rounded-xl border border-border bg-card p-4">
              <h2 className="mb-3 text-lg font-bold">Pending deposits</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>TxID</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingDeposits.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-muted-foreground">
                          No pending deposits.
                        </TableCell>
                      </TableRow>
                    ) : (
                      pendingDeposits.map((t) => (
                        <TableRow key={t.id}>
                          <TableCell className="font-medium">{t.username}</TableCell>
                          <TableCell className="tabular-nums">{formatBdt(t.amount)}</TableCell>
                          <TableCell className="max-w-[240px] truncate font-mono text-xs">{t.tx_id}</TableCell>
                          <TableCell className="space-x-2 text-right">
                            <Button
                              size="sm"
                              disabled={decide.isPending}
                              onClick={() => decide.mutate({ id: t.id, approve: true })}
                            >
                              <Check className="size-4" /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={decide.isPending}
                              onClick={() => decide.mutate({ id: t.id, approve: false })}
                            >
                              <X className="size-4" /> Reject
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-4">
              <h2 className="mb-3 text-lg font-bold">Pending withdrawals</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>bKash/Nagad Number</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingWithdrawals.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-muted-foreground">
                          No pending withdrawals.
                        </TableCell>
                      </TableRow>
                    ) : (
                      pendingWithdrawals.map((t) => (
                        <TableRow key={t.id}>
                          <TableCell className="font-medium">{t.username}</TableCell>
                          <TableCell className="tabular-nums">{formatBdt(t.amount)}</TableCell>
                          <TableCell className="max-w-[260px] truncate font-mono text-xs">
                            {t.wallet_address}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button size="sm" disabled={pay.isPending} onClick={() => pay.mutate(t.id)}>
                              <Check className="size-4" /> Mark as paid
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-4">
              <h2 className="mb-3 text-lg font-bold">Deposit merchant number (bKash/Nagad)</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="wallet">Number shown to users on the deposit page</Label>
                  <Input
                    id="wallet"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    placeholder="Merchant bKash or Nagad number"
                    inputMode="tel"
                    maxLength={11}
                  />
                </div>
                <Button onClick={() => saveWallet.mutate()} disabled={saveWallet.isPending}>
                  {saveWallet.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                  Save
                </Button>
              </div>
            </section>

            <section className="rounded-xl border border-border bg-card p-4">
              <h2 className="mb-3 text-lg font-bold">Recent processed transactions</h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-muted-foreground">
                          Nothing processed yet.
                        </TableCell>
                      </TableRow>
                    ) : (
                      history.map((t) => (
                        <TableRow key={t.id}>
                          <TableCell>{t.username}</TableCell>
                          <TableCell className="capitalize">{t.type}</TableCell>
                          <TableCell className="tabular-nums">{formatBdt(t.amount)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="capitalize">
                              {t.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
