import { Link } from "@tanstack/react-router";
import { LogOut, Shield, Wallet, ArrowDownToLine, ArrowUpFromLine, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
  username?: string | null | undefined;
  balance?: number | null | undefined;
  isAdmin?: boolean | undefined;
  loading?: boolean | undefined;
  signedIn: boolean;
  onDeposit: () => void;
  onWithdraw: () => void;
  onSignOut: () => void;
};

export function SiteHeader({
  username,
  balance,
  isAdmin,
  loading,
  signedIn,
  onDeposit,
  onWithdraw,
  onSignOut,
}: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-md bg-primary font-black text-primary-foreground">
            M
          </span>
          <span className="text-lg font-black tracking-tight">
            MELTA<span className="text-primary">BET</span>
          </span>
        </Link>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {signedIn ? (
            <>
              <div className="flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2">
                <Wallet className="size-4 text-primary" />
                <div className="leading-none">
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    {username ?? "Player"}
                  </div>
                  <div className="text-sm font-bold tabular-nums">
                    {loading ? (
                      <Loader2 className="size-3 animate-spin" />
                    ) : (
                      `৳${(balance ?? 0).toLocaleString("en-BD", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                    )}
                  </div>
                </div>
              </div>
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
