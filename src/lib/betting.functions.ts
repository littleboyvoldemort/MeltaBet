import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { isValidBdMobile, MIN_BET_BDT, MIN_DEPOSIT_BDT, MIN_WITHDRAW_BDT } from "@/lib/currency";

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

export const getMyBets = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("bets")
      .select("id, selections, stake, total_odds, potential_payout, status, created_at")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(25);
    if (error) throw new Error(error.message);
    return (data ?? []).map((b) => ({
      ...b,
      stake: Number(b.stake),
      total_odds: Number(b.total_odds),
      potential_payout: Number(b.potential_payout),
      selections: b.selections as unknown as Selection[],
    }));
  });

export const placeBet = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { amount: number; odds: number; matchId?: string }) => {
    if (!Number.isFinite(input.amount) || input.amount < MIN_BET_BDT) {
      throw new Error(`Minimum bet is ৳${MIN_BET_BDT}`);
    }
    if (!Number.isFinite(input.odds) || input.odds <= 1) {
      throw new Error("Invalid odds");
    }
    return {
      amount: Math.round(input.amount * 100) / 100,
      odds: input.odds,
      matchId: input.matchId,
    };
  })
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;

    let odds = data.odds;

    if (data.matchId && /^[0-9a-f-]{36}$/i.test(data.matchId)) {
      const { data: match, error: matchError } = await supabaseAdmin
        .from("matches")
        .select("id, odds_home, is_open")
        .eq("id", data.matchId)
        .maybeSingle();
      if (matchError) throw new Error(matchError.message);
      if (!match) throw new Error("Match not found");
      if (!match.is_open) throw new Error("Betting is closed for this match");
      odds = Number(match.odds_home);
    }

    const stake = data.amount;
    const { data: profile, error: profileError } = await supabaseAdmin
      .from("profiles")
      .select("balance")
      .eq("id", userId)
      .single();
    if (profileError) throw new Error(profileError.message);

    const balance = Number(profile.balance);
    if (balance < stake) throw new Error("Insufficient balance");

    const won = Math.random() < 1 / odds;
    const payout = won ? Math.round(stake * odds * 100) / 100 : 0;
    const newBalance = Math.round((balance - stake + payout) * 100) / 100;

    const { data: updated, error: updateError } = await supabaseAdmin
      .from("profiles")
      .update({ balance: newBalance })
      .eq("id", userId)
      .gte("balance", stake)
      .select("balance");
    if (updateError) throw new Error(updateError.message);
    if (!updated || updated.length === 0) throw new Error("Insufficient balance");

    const status = won ? "won" : "lost";

    if (data.matchId) {
      await supabaseAdmin.from("bets").insert({
        user_id: userId,
        selections: [{ matchId: data.matchId, pick: "home", odds, label: "Home" }] as unknown as never,
        stake,
        total_odds: odds,
        potential_payout: Math.round(stake * odds * 100) / 100,
        status,
      });
    }

    return {
      status,
      payout,
      new_balance: Number(updated[0]!.balance),
    };
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
