import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { isValidBdMobile, MIN_DEPOSIT_BDT, MIN_WITHDRAW_BDT } from "@/lib/currency";

export type Selection = {
  matchId: string;
  label: string;
  pick: "home" | "draw" | "away";
  odds: number;
};

export const getMyAccount = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const [{ data: profile }, { data: roles }] = await Promise.all([
      supabase.from("profiles").select("id, username, balance").eq("id", userId).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", userId),
    ]);
    return {
      profile: profile
        ? { id: profile.id, username: profile.username, balance: Number(profile.balance) }
        : null,
      isAdmin: (roles ?? []).some((r) => r.role === "admin"),
    };
  });

export const getMyTransactions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("transactions")
      .select("id, type, amount, status, tx_id, wallet_address, created_at")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(25);
    if (error) throw new Error(error.message);
    return (data ?? []).map((t) => ({ ...t, amount: Number(t.amount) }));
  });

export type MyBet = {
  id: string;
  amount: number;
  odds: number;
  status: string;
  payout: number;
  created_at: string;
};

export const getMyBets = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("bets")
      .select("id, amount, total_odds, status, payout, created_at")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(25);
    if (error) throw new Error(error.message);
    return (data ?? []).map(
      (b): MyBet => ({
        id: b.id,
        amount: Number(b.amount),
        odds: Number(b.total_odds),
        status: b.status,
        payout: Number(b.payout),
        created_at: b.created_at,
      }),
    );
  });

export const placeBet = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { selections: Selection[]; stake: number }) => {
    if (!Array.isArray(input.selections) || input.selections.length === 0) {
      throw new Error("Your bet slip is empty");
    }
    if (!Number.isFinite(input.stake) || input.stake <= 0) {
      throw new Error("Enter a valid stake");
    }
    return input;
  })
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;

    const matchIds = [...new Set(data.selections.map((s) => s.matchId))];
    if (matchIds.length !== data.selections.length) {
      throw new Error("Only one selection per match is allowed");
    }

    const { data: matches, error: matchError } = await supabaseAdmin
      .from("matches")
      .select("id, home_team, away_team, odds_home, odds_draw, odds_away, is_open")
      .in("id", matchIds);
    if (matchError) throw new Error(matchError.message);
    if (!matches || matches.length !== matchIds.length) throw new Error("Match not found");

    // Recompute odds server-side; never trust the client.
    const trusted: Selection[] = data.selections.map((s) => {
      const m = matches.find((x) => x.id === s.matchId)!;
      if (!m.is_open) throw new Error("Betting is closed for one of your matches");
      const odds =
        s.pick === "home"
          ? Number(m.odds_home)
          : s.pick === "draw"
            ? Number(m.odds_draw)
            : Number(m.odds_away);
      const label =
        s.pick === "home" ? m.home_team : s.pick === "draw" ? "Draw" : m.away_team;
      return { matchId: m.id, pick: s.pick, odds, label: `${m.home_team} v ${m.away_team} — ${label}` };
    });

    const stake = Math.round(data.stake * 100) / 100;
    const totalOdds = Math.round(trusted.reduce((acc, s) => acc * s.odds, 1) * 100) / 100;
    const payout = Math.round(stake * totalOdds * 100) / 100;

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("balance")
      .eq("id", userId)
      .single();
    if (profileError) throw new Error(profileError.message);
    const balance = Number(profile.balance);
    if (balance < stake) throw new Error("Insufficient balance");

    const { data: updated, error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ balance: Math.round((balance - stake) * 100) / 100 })
      .eq("id", userId)
      .gte("balance", stake)
      .select("balance");
    if (updateError) throw new Error(updateError.message);
    if (!updated || updated.length === 0) throw new Error("Insufficient balance");

    const { error: betError } = await supabaseAdmin.from("bets").insert({
      user_id: userId,
      amount: stake,
      total_odds: totalOdds,
      payout,
    });
    if (betError) {
      await supabaseAdmin.from("profiles").update({ balance }).eq("id", userId);
      throw new Error(betError.message);
    }

    return { balance: Number(updated[0]!.balance), stake, totalOdds, payout };
  });

export const submitDeposit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { amount: number; txId: string }) => {
    if (!Number.isFinite(input.amount) || input.amount < MIN_DEPOSIT_BDT) {
      throw new Error(`Minimum deposit is ৳${MIN_DEPOSIT_BDT}`);
    }
    if (!input.txId || input.txId.trim().length < 6) throw new Error("Enter a valid transaction ID");
    return { amount: Math.round(input.amount * 100) / 100, txId: input.txId.trim().slice(0, 200) };
  })
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("transactions").insert({
      user_id: context.userId,
      type: "deposit",
      amount: data.amount,
      tx_id: data.txId,
      status: "pending",
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const requestWithdraw = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { amount: number; wallet: string }) => {
    if (!Number.isFinite(input.amount) || input.amount < MIN_WITHDRAW_BDT) {
      throw new Error(`Minimum withdrawal is ৳${MIN_WITHDRAW_BDT}`);
    }
    const number = input.wallet?.trim() ?? "";
    if (!isValidBdMobile(number)) {
      throw new Error("Enter a valid bKash/Nagad number");
    }
    return { amount: Math.round(input.amount * 100) / 100, wallet: number };
  })
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;

    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("balance")
      .eq("id", userId)
      .single();
    if (profileError) throw new Error(profileError.message);
    const balance = Number(profile.balance);
    if (balance < data.amount) throw new Error("Insufficient balance");

    const { data: updated, error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ balance: Math.round((balance - data.amount) * 100) / 100 })
      .eq("id", userId)
      .gte("balance", data.amount)
      .select("balance");
    if (updateError) throw new Error(updateError.message);
    if (!updated || updated.length === 0) throw new Error("Insufficient balance");

    const { error } = await supabaseAdmin.from("transactions").insert({
      user_id: userId,
      type: "withdraw",
      amount: data.amount,
      wallet_address: data.wallet,
      status: "pending",
    });
    if (error) {
      await supabaseAdmin.from("profiles").update({ balance }).eq("id", userId);
      throw new Error(error.message);
    }
    return { balance: Number(updated[0]!.balance) };
  });
