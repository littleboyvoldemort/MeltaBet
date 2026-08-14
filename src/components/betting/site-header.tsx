import { Link } from "@tanstack/react-router";
import {
  LogOut,
  Shield,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Loader2,
  LayoutDashboard,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { getMyAccount } from "@/lib/betting.functions";
import { formatBdt } from "@/lib/currency";

type Props = {
  signedIn: boolean;
  onDeposit: () => void;
  onWithdraw: () => void;
  onSignOut: () => void;
};

export function SiteHeader({ signedIn, onDeposit, onWithdraw, onSignOut }: Props) {
  const fetchAccount = useServerFn(getMyAccount);
  const account = useQuery({
    queryKey: ["account"],
    queryFn: () => fetchAccount(),
    enabled: signedIn,
  });

  const balance = account.data?.profile?.balance ?? 0;
  const username = account.data?.profile?.username;
  const isAdmin = account.data?.isAdmin ?? false;
  const loading = account.isLoading;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-md bg-primary font-black text-primary-foreground">
            1
          </span>
          <span className="text-lg font-black tracking-tight">
            APEX<span className="text-primary">BET</span>
          </span>
        </Link>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {signedIn ? (
            <>
              <div className="flex items-center gap-3 rounded-lg border-2 border-primary/30 bg-primary/10 px-4 py-2">
                <Wallet className="size-5 shrink-0 text-primary" />
                <div className="leading-tight">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {username ?? "Player"} · Balance
                  </div>
                  <div className="text-xl font-black tabular-nums text-primary">
                    {loading ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      formatBdt(balance)
                    )}
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="size-4" /> Dashboard
                </Link>
              </Button>
              <Button size="sm" onClick={onDeposit}>
                <ArrowDownToLine className="size-4" /> Deposit
              </Button>
              <Button size="sm" variant="secondary" onClick={onWithdraw}>
                <ArrowUpFromLine className="size-4" /> Withdraw
              </Button>
              {isAdmin ? (
                <Button size="sm" variant="outline" asChild>
                  <Link to="/admin">
                    <Shield className="size-4" /> Admin
                  </Link>
                </Button>
              ) : null}
              <Button size="sm" variant="ghost" onClick={onSignOut} aria-label="Log out">
                <LogOut className="size-4" />
              </Button>
            </>
          ) : (
            <Button size="sm" asChild>
              <Link to="/auth">Sign in / Register</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
