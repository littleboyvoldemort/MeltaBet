import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { isValidBdMobile } from "@/lib/currency";
import { LEGACY_MERCHANT_SETTING_KEY, MERCHANT_SETTING_KEY } from "@/lib/settings";

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden");
}

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [{ data: txs }, { data: profiles }, { data: setting }, { data: legacySetting }] =
      await Promise.all([
      supabaseAdmin
        .from("transactions")
        .select("id, user_id, type, amount, status, tx_id, wallet_address, created_at")
        .order("created_at", { ascending: false })
        .limit(200),
      supabaseAdmin.from("profiles").select("id, username, balance"),
      supabaseAdmin.from("settings").select("value").eq("key", MERCHANT_SETTING_KEY).maybeSingle(),
      supabaseAdmin
        .from("settings")
        .select("value")
        .eq("key", LEGACY_MERCHANT_SETTING_KEY)
        .maybeSingle(),
    ]);

    const rawMerchant = setting?.value ?? legacySetting?.value ?? "";
    const merchantNumber = rawMerchant.startsWith("0x") ? "" : rawMerchant;

    const names = new Map((profiles ?? []).map((p) => [p.id, p.username]));
    return {
      transactions: (txs ?? []).map((t) => ({
        ...t,
        amount: Number(t.amount),
        username: names.get(t.user_id) ?? "unknown",
      })),
      users: (profiles ?? []).map((p) => ({ ...p, balance: Number(p.balance) })),
      walletAddress: merchantNumber,
    };
  });

export const decideDeposit = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { id: string; approve: boolean }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: tx, error } = await supabaseAdmin
      .from("transactions")
      .select("id, user_id, amount, type, status")
      .eq("id", data.id)
      .single();
    if (error) throw new Error(error.message);
    if (tx.type !== "deposit" || tx.status !== "pending") throw new Error("Transaction is not a pending deposit");

    if (data.approve) {
      const { data: profile, error: pErr } = await supabaseAdmin
        .from("profiles")
        .select("balance")
        .eq("id", tx.user_id)
        .single();
      if (pErr) throw new Error(pErr.message);
      const next = Math.round((Number(profile.balance) + Number(tx.amount)) * 100) / 100;
      const { error: uErr } = await supabaseAdmin
        .from("profiles")
        .update({ balance: next })
        .eq("id", tx.user_id);
      if (uErr) throw new Error(uErr.message);
    }

    const { error: sErr } = await supabaseAdmin
      .from("transactions")
      .update({ status: data.approve ? "approved" : "rejected", processed_at: new Date().toISOString() })
      .eq("id", tx.id)
      .eq("status", "pending");
    if (sErr) throw new Error(sErr.message);
    return { ok: true };
  });

export const markWithdrawPaid = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("transactions")
      .update({ status: "completed", processed_at: new Date().toISOString() })
      .eq("id", data.id)
      .eq("type", "withdraw")
      .eq("status", "pending");
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const updateDepositWallet = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((input: { address: string }) => {
    const address = input.address?.trim() ?? "";
    if (!address) throw new Error("Enter a bKash/Nagad merchant number");
    if (!isValidBdMobile(address)) throw new Error("Enter a valid bKash/Nagad number");
    return { address };
  })
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("settings")
      .upsert({
        key: MERCHANT_SETTING_KEY,
        value: data.address,
        updated_at: new Date().toISOString(),
      });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
