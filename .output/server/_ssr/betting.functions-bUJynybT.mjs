import { t as createServerFn } from "./ssr.mjs";
import { n as isValidBdMobile, r as requireSupabaseAuth } from "./currency-CcJur0Rs.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/betting.functions-bUJynybT.js
var getMyAccount_createServerFn_handler = createServerRpc({
	id: "dda031e118da545a38ec567093d778335858489cbe90b5b4237d13d7b123f8a8",
	name: "getMyAccount",
	filename: "src/lib/betting.functions.ts"
}, (opts) => getMyAccount.__executeServer(opts));
var getMyAccount = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyAccount_createServerFn_handler, async ({ context }) => {
	const { supabase, userId } = context;
	const [{ data: profile }, { data: roles }] = await Promise.all([supabase.from("profiles").select("id, username, balance").eq("id", userId).maybeSingle(), supabase.from("user_roles").select("role").eq("user_id", userId)]);
	return {
		profile: profile ? {
			id: profile.id,
			username: profile.username,
			balance: Number(profile.balance)
		} : null,
		isAdmin: (roles ?? []).some((r) => r.role === "admin")
	};
});
var getMyTransactions_createServerFn_handler = createServerRpc({
	id: "ced47682977496baa9a158f2dd8a270bac990571dafb3c83ca9a88f21b204b6b",
	name: "getMyTransactions",
	filename: "src/lib/betting.functions.ts"
}, (opts) => getMyTransactions.__executeServer(opts));
var getMyTransactions = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyTransactions_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("transactions").select("id, type, amount, status, tx_id, wallet_address, created_at").eq("user_id", context.userId).order("created_at", { ascending: false }).limit(25);
	if (error) throw new Error(error.message);
	return (data ?? []).map((t) => ({
		...t,
		amount: Number(t.amount)
	}));
});
var getMyBets_createServerFn_handler = createServerRpc({
	id: "316746d20ccd0a791dabfa38f0a1c6e5b46d55e3220e99550984016b5635b15c",
	name: "getMyBets",
	filename: "src/lib/betting.functions.ts"
}, (opts) => getMyBets.__executeServer(opts));
var getMyBets = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(getMyBets_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("bets").select("id, selections, stake, total_odds, potential_payout, status, created_at").eq("user_id", context.userId).order("created_at", { ascending: false }).limit(25);
	if (error) throw new Error(error.message);
	return (data ?? []).map((b) => ({
		...b,
		stake: Number(b.stake),
		total_odds: Number(b.total_odds),
		potential_payout: Number(b.potential_payout),
		selections: b.selections
	}));
});
var placeBet_createServerFn_handler = createServerRpc({
	id: "60d3dd4d6e9fee451ac573cd74084b59aacba430fcb8a11f7c6ba62f450cad1f",
	name: "placeBet",
	filename: "src/lib/betting.functions.ts"
}, (opts) => placeBet.__executeServer(opts));
var placeBet = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => {
	if (!Number.isFinite(input.amount) || input.amount < 50) throw new Error(`Minimum bet is ৳50`);
	if (!Number.isFinite(input.odds) || input.odds <= 1) throw new Error("Invalid odds");
	return {
		amount: Math.round(input.amount * 100) / 100,
		odds: input.odds,
		matchId: input.matchId
	};
}).handler(placeBet_createServerFn_handler, async ({ data, context }) => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const userId = context.userId;
	let odds = data.odds;
	if (data.matchId && /^[0-9a-f-]{36}$/i.test(data.matchId)) {
		const { data: match, error: matchError } = await supabaseAdmin.from("matches").select("id, odds_home, is_open").eq("id", data.matchId).maybeSingle();
		if (matchError) throw new Error(matchError.message);
		if (!match) throw new Error("Match not found");
		if (!match.is_open) throw new Error("Betting is closed for this match");
		odds = Number(match.odds_home);
	}
	const stake = data.amount;
	const { data: profile, error: profileError } = await supabaseAdmin.from("profiles").select("balance").eq("id", userId).single();
	if (profileError) throw new Error(profileError.message);
	const balance = Number(profile.balance);
	if (balance < stake) throw new Error("Insufficient balance");
	const won = Math.random() < 1 / odds;
	const payout = won ? Math.round(stake * odds * 100) / 100 : 0;
	const newBalance = Math.round((balance - stake + payout) * 100) / 100;
	const { data: updated, error: updateError } = await supabaseAdmin.from("profiles").update({ balance: newBalance }).eq("id", userId).gte("balance", stake).select("balance");
	if (updateError) throw new Error(updateError.message);
	if (!updated || updated.length === 0) throw new Error("Insufficient balance");
	const status = won ? "won" : "lost";
	if (data.matchId) await supabaseAdmin.from("bets").insert({
		user_id: userId,
		selections: [{
			matchId: data.matchId,
			pick: "home",
			odds,
			label: "Home"
		}],
		stake,
		total_odds: odds,
		potential_payout: Math.round(stake * odds * 100) / 100,
		status
	});
	return {
		status,
		payout,
		new_balance: Number(updated[0].balance)
	};
});
var submitDeposit_createServerFn_handler = createServerRpc({
	id: "d9882b96d1ae5a052a8c772650bd3a3b68f58e86e29ad9ebead9def9ce3cda7d",
	name: "submitDeposit",
	filename: "src/lib/betting.functions.ts"
}, (opts) => submitDeposit.__executeServer(opts));
var submitDeposit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => {
	if (!Number.isFinite(input.amount) || input.amount < 50) throw new Error(`Minimum deposit is ৳50`);
	if (!input.txId || input.txId.trim().length < 6) throw new Error("Enter a valid transaction ID");
	return {
		amount: Math.round(input.amount * 100) / 100,
		txId: input.txId.trim().slice(0, 200)
	};
}).handler(submitDeposit_createServerFn_handler, async ({ data, context }) => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const { error } = await supabaseAdmin.from("transactions").insert({
		user_id: context.userId,
		type: "deposit",
		amount: data.amount,
		tx_id: data.txId,
		status: "pending"
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
var requestWithdraw_createServerFn_handler = createServerRpc({
	id: "4cb8264cda65b07ebc21fdbf5f45bb810728e748abf35da3431f087a091529b9",
	name: "requestWithdraw",
	filename: "src/lib/betting.functions.ts"
}, (opts) => requestWithdraw.__executeServer(opts));
var requestWithdraw = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => {
	if (!Number.isFinite(input.amount) || input.amount < 200) throw new Error(`Minimum withdrawal is ৳200`);
	const number = input.wallet?.trim() ?? "";
	if (!isValidBdMobile(number)) throw new Error("Enter a valid bKash/Nagad number");
	return {
		amount: Math.round(input.amount * 100) / 100,
		wallet: number
	};
}).handler(requestWithdraw_createServerFn_handler, async ({ data, context }) => {
	const { supabaseAdmin } = await import("./client.server-KzwUIAkW.mjs");
	const userId = context.userId;
	const { data: profile, error: profileError } = await supabaseAdmin.from("profiles").select("balance").eq("id", userId).single();
	if (profileError) throw new Error(profileError.message);
	const balance = Number(profile.balance);
	if (balance < data.amount) throw new Error("Insufficient balance");
	const { data: updated, error: updateError } = await supabaseAdmin.from("profiles").update({ balance: Math.round((balance - data.amount) * 100) / 100 }).eq("id", userId).gte("balance", data.amount).select("balance");
	if (updateError) throw new Error(updateError.message);
	if (!updated || updated.length === 0) throw new Error("Insufficient balance");
	const { error } = await supabaseAdmin.from("transactions").insert({
		user_id: userId,
		type: "withdraw",
		amount: data.amount,
		wallet_address: data.wallet,
		status: "pending"
	});
	if (error) {
		await supabaseAdmin.from("profiles").update({ balance }).eq("id", userId);
		throw new Error(error.message);
	}
	return { balance: Number(updated[0].balance) };
});
//#endregion
export { getMyAccount_createServerFn_handler, getMyBets_createServerFn_handler, getMyTransactions_createServerFn_handler, placeBet_createServerFn_handler, requestWithdraw_createServerFn_handler, submitDeposit_createServerFn_handler };
