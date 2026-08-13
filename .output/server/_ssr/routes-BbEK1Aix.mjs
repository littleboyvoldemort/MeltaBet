import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { i as cn, n as Input, r as Label, t as Button } from "./label-Cq5SXjoZ.mjs";
import { n as createSsrRpc, r as useServerFn, t as Badge } from "./createSsrRpc-CkdAslde.mjs";
import { n as isValidBdMobile, r as requireSupabaseAuth, t as formatBdt } from "./currency-CcJur0Rs.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Spade, c as LogOut, d as Clock, h as ArrowDownToLine, i as Trophy, l as LoaderCircle, n as Wallet, o as Shield, p as ArrowUpFromLine, r as Users, t as X, u as Dices } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-BsC7W_eT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BbEK1Aix.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SiteHeader({ username, balance, isAdmin, loading, signedIn, onDeposit, onWithdraw, onSignOut }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-card/95 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-8 place-items-center rounded-md bg-primary font-black text-primary-foreground",
					children: "M"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-lg font-black tracking-tight",
					children: ["MELTA", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "BET"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ml-auto flex flex-wrap items-center gap-2",
				children: signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-md border border-border bg-secondary px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-wide text-muted-foreground",
								children: username ?? "Player"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-bold tabular-nums",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin" }) : `৳${(balance ?? 0).toLocaleString("en-BD", {
									minimumFractionDigits: 0,
									maximumFractionDigits: 2
								})}`
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: onDeposit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownToLine, { className: "size-4" }), " Deposit"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: onWithdraw,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpFromLine, { className: "size-4" }), " Withdraw"]
					}),
					isAdmin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" }), " Admin"]
						})
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onSignOut,
						"aria-label": "Log out",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						children: "Sign in / Register"
					})
				})
			})]
		})
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
var getMyAccount = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("dda031e118da545a38ec567093d778335858489cbe90b5b4237d13d7b123f8a8"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("ced47682977496baa9a158f2dd8a270bac990571dafb3c83ca9a88f21b204b6b"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("316746d20ccd0a791dabfa38f0a1c6e5b46d55e3220e99550984016b5635b15c"));
var placeBet = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => {
	if (!Number.isFinite(input.amount) || input.amount < 50) throw new Error(`Minimum bet is ৳50`);
	if (!Number.isFinite(input.odds) || input.odds <= 1) throw new Error("Invalid odds");
	return {
		amount: Math.round(input.amount * 100) / 100,
		odds: input.odds,
		matchId: input.matchId
	};
}).handler(createSsrRpc("60d3dd4d6e9fee451ac573cd74084b59aacba430fcb8a11f7c6ba62f450cad1f"));
var submitDeposit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => {
	if (!Number.isFinite(input.amount) || input.amount < 50) throw new Error(`Minimum deposit is ৳50`);
	if (!input.txId || input.txId.trim().length < 6) throw new Error("Enter a valid transaction ID");
	return {
		amount: Math.round(input.amount * 100) / 100,
		txId: input.txId.trim().slice(0, 200)
	};
}).handler(createSsrRpc("d9882b96d1ae5a052a8c772650bd3a3b68f58e86e29ad9ebead9def9ce3cda7d"));
var requestWithdraw = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).validator((input) => {
	if (!Number.isFinite(input.amount) || input.amount < 200) throw new Error(`Minimum withdrawal is ৳200`);
	const number = input.wallet?.trim() ?? "";
	if (!isValidBdMobile(number)) throw new Error("Enter a valid bKash/Nagad number");
	return {
		amount: Math.round(input.amount * 100) / 100,
		wallet: number
	};
}).handler(createSsrRpc("4cb8264cda65b07ebc21fdbf5f45bb810728e748abf35da3431f087a091529b9"));
function MatchList({ matches, loading, error, isDemo, signedIn, onRequireAuth, onBalanceUpdate }) {
	const placeBetFn = useServerFn(placeBet);
	const [amounts, setAmounts] = (0, import_react.useState)({});
	const [placingId, setPlacingId] = (0, import_react.useState)(null);
	async function handlePlaceBet(match) {
		if (!onRequireAuth()) return;
		const amount = Number(amounts[match.id]);
		if (!Number.isFinite(amount) || amount < 50) {
			toast.error(`Minimum bet is ${formatBdt(50)}`);
			return;
		}
		if (!match.is_open) {
			toast.error("Betting is closed for this match");
			return;
		}
		setPlacingId(match.id);
		try {
			const res = await placeBetFn({ data: {
				amount,
				odds: match.odds_home,
				matchId: match.id
			} });
			onBalanceUpdate(res.new_balance);
			setAmounts((prev) => ({
				...prev,
				[match.id]: ""
			}));
			if (res.status === "won") toast.success(`Congratulations! You won ${formatBdt(res.payout)}`);
			else toast.error("You lost! Better luck next time.");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Could not place bet");
		} finally {
			setPlacingId(null);
		}
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full rounded-xl" }, i))
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-destructive/40 bg-destructive/10 p-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium text-destructive",
			children: "Could not load matches"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-muted-foreground",
			children: error
		})]
	});
	if (matches.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-border bg-card p-8 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "No upcoming matches right now. Check back soon."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [isDemo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200/90",
			children: "Showing demo matches — run your Supabase migrations to load live odds from the database."
		}) : null, matches.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-xl border border-border bg-card p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between gap-2 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded bg-secondary px-2 py-1 font-semibold uppercase tracking-wide text-primary",
						children: m.league
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), new Date(m.start_time).toLocaleString(void 0, {
							day: "numeric",
							month: "short",
							hour: "2-digit",
							minute: "2-digit"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "mb-2 text-base font-bold",
					children: [
						m.home_team,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "vs"
						}),
						" ",
						m.away_team
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-4 text-sm text-muted-foreground",
					children: ["Home odds: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-primary",
						children: m.odds_home.toFixed(2)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: `bet-${m.id}`,
							children: "Bet Amount (Min 50)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: `bet-${m.id}`,
							inputMode: "decimal",
							value: amounts[m.id] ?? "",
							onChange: (e) => setAmounts((prev) => ({
								...prev,
								[m.id]: e.target.value
							})),
							placeholder: "50",
							disabled: !m.is_open || placingId === m.id
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "sm:w-36",
						disabled: !m.is_open || placingId === m.id,
						onClick: () => handlePlaceBet(m),
						children: placingId === m.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : signedIn ? "Place Bet" : "Sign in to bet"
					})]
				})
			]
		}, m.id))]
	});
}
var LIVE_CASINO_GAMES = [
	{
		id: "live-roulette",
		name: "Live Roulette",
		provider: "Evolution",
		category: "roulette",
		players: 842,
		minBet: 1,
		featured: true
	},
	{
		id: "lightning-roulette",
		name: "Lightning Roulette",
		provider: "Evolution",
		category: "roulette",
		players: 1204,
		minBet: 1,
		featured: true
	},
	{
		id: "live-blackjack",
		name: "Live Blackjack",
		provider: "Pragmatic Play",
		category: "blackjack",
		players: 567,
		minBet: 5,
		featured: true
	},
	{
		id: "speed-baccarat",
		name: "Speed Baccarat",
		provider: "Evolution",
		category: "baccarat",
		players: 391,
		minBet: 1
	},
	{
		id: "crazy-time",
		name: "Crazy Time",
		provider: "Evolution",
		category: "game-show",
		players: 2103,
		minBet: .5,
		featured: true
	},
	{
		id: "mega-ball",
		name: "Mega Ball",
		provider: "Evolution",
		category: "game-show",
		players: 678,
		minBet: .5
	},
	{
		id: "dragon-tiger",
		name: "Dragon Tiger",
		provider: "Pragmatic Play",
		category: "baccarat",
		players: 445,
		minBet: 1
	},
	{
		id: "casino-holdem",
		name: "Casino Hold'em",
		provider: "Evolution",
		category: "poker",
		players: 289,
		minBet: 2
	}
];
var CATEGORY_LABELS = {
	roulette: "Roulette",
	blackjack: "Blackjack",
	baccarat: "Baccarat",
	"game-show": "Game Shows",
	poker: "Poker"
};
var CATEGORY_GRADIENT = {
	roulette: "from-red-600/30 via-rose-900/40 to-background",
	blackjack: "from-emerald-600/30 via-green-900/40 to-background",
	baccarat: "from-blue-600/30 via-indigo-900/40 to-background",
	"game-show": "from-amber-500/30 via-orange-900/40 to-background",
	poker: "from-violet-600/30 via-purple-900/40 to-background"
};
function CasinoCard({ game, signedIn, onPlay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-primary/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("relative flex h-32 items-end bg-gradient-to-br p-4", CATEGORY_GRADIENT[game.category]),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 animate-pulse rounded-full bg-white" }), "Live"]
				}),
				game.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					className: "absolute left-3 top-3 bg-primary text-primary-foreground",
					children: "Hot"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
					children: game.provider
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-lg font-bold leading-tight",
					children: game.name
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2 border-t border-border px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3.5" }), game.players.toLocaleString()]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Min ", formatBdt(game.minBet)] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				onClick: () => onPlay(game),
				children: signedIn ? "Play" : "Sign in"
			})]
		})]
	});
}
function CasinoGrid({ signedIn, onPlay }) {
	const featured = LIVE_CASINO_GAMES.filter((g) => g.featured);
	const rest = LIVE_CASINO_GAMES.filter((g) => !g.featured);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Real dealers · HD streams · Instant payouts" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spade, { className: "size-3.5" }), " Featured tables"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: featured.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasinoCard, {
					game,
					signedIn,
					onPlay
				}, game.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground",
				children: "All live games"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: rest.map((game) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasinoCard, {
					game,
					signedIn,
					onPlay
				}, game.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: Object.entries(CATEGORY_LABELS).map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "secondary",
					className: "text-xs",
					children: label
				}, key))
			})
		]
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
function DepositDialog({ open, onOpenChange, submitting, onSubmit }) {
	const [amount, setAmount] = (0, import_react.useState)("");
	const [txId, setTxId] = (0, import_react.useState)("");
	function handleSubmit() {
		const parsed = Number(amount);
		if (!Number.isFinite(parsed) || parsed < 50) {
			toast.error(`Minimum deposit is ${formatBdt(50)}`);
			return;
		}
		if (!txId.trim() || txId.trim().length < 6) {
			toast.error("Enter a valid bKash/Nagad transaction ID");
			return;
		}
		onSubmit(parsed, txId.trim());
		setAmount("");
		setTxId("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Deposit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Send money via bKash or Nagad, then submit your deposit request below. Your balance updates after admin approval." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "dep-amount",
						children: "Amount (Min ৳50)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "dep-amount",
						inputMode: "decimal",
						value: amount,
						onChange: (e) => setAmount(e.target.value),
						placeholder: "50"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "dep-tx",
						children: "bKash/Nagad Transaction ID"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "dep-tx",
						value: txId,
						onChange: (e) => setTxId(e.target.value),
						placeholder: "Enter your bKash or Nagad TxID"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full",
					disabled: submitting,
					onClick: handleSubmit,
					children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "Submit Deposit Request"]
				})
			]
		})] })
	});
}
function WithdrawDialog({ open, onOpenChange, balance, submitting, onSubmit }) {
	const [amount, setAmount] = (0, import_react.useState)("");
	const [mobileNumber, setMobileNumber] = (0, import_react.useState)("");
	function handleSubmit() {
		const parsed = Number(amount);
		if (!Number.isFinite(parsed) || parsed < 200) {
			toast.error(`Minimum withdrawal is ${formatBdt(200)}`);
			return;
		}
		const number = mobileNumber.trim();
		if (!isValidBdMobile(number)) {
			toast.error("Enter a valid bKash/Nagad number");
			return;
		}
		if (parsed > balance) {
			toast.error("Amount exceeds your available balance");
			return;
		}
		onSubmit(parsed, number);
		setAmount("");
		setMobileNumber("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Withdraw funds" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
			"Available balance:",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-bold text-foreground",
				children: formatBdt(balance)
			}),
			". Minimum withdrawal ",
			formatBdt(200),
			"."
		] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "wd-mobile",
							children: "User's bKash/Nagad Number"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "wd-mobile",
							inputMode: "tel",
							value: mobileNumber,
							onChange: (e) => setMobileNumber(e.target.value),
							placeholder: "Your bKash or Nagad number",
							maxLength: 11
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Enter the bKash or Nagad number where you want to receive the money."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "wd-amount",
							children: "Amount (৳)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "wd-amount",
							inputMode: "decimal",
							value: amount,
							onChange: (e) => setAmount(e.target.value),
							placeholder: `Min 200`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["Minimum withdrawal ", formatBdt(200)]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full",
					disabled: submitting,
					onClick: handleSubmit,
					children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, " Request withdrawal"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs text-muted-foreground",
					children: "The amount is deducted immediately and sent to your number after admin processing."
				})
			]
		})] })
	});
}
var day = (n) => new Date(Date.now() + n * 864e5).toISOString();
var DEMO_MATCHES = [
	{
		id: "demo-1",
		league: "La Liga",
		home_team: "Real Madrid",
		away_team: "Barcelona",
		start_time: day(1),
		odds_home: 2.1,
		odds_draw: 3.4,
		odds_away: 3.2,
		is_open: true
	},
	{
		id: "demo-2",
		league: "Friendly",
		home_team: "Brazil",
		away_team: "Argentina",
		start_time: day(2),
		odds_home: 2.55,
		odds_draw: 3.1,
		odds_away: 2.8,
		is_open: true
	},
	{
		id: "demo-3",
		league: "Premier League",
		home_team: "Manchester City",
		away_team: "Liverpool",
		start_time: day(3),
		odds_home: 1.95,
		odds_draw: 3.6,
		odds_away: 3.75,
		is_open: true
	},
	{
		id: "demo-4",
		league: "Serie A",
		home_team: "Juventus",
		away_team: "Inter Milan",
		start_time: day(4),
		odds_home: 2.7,
		odds_draw: 3.05,
		odds_away: 2.65,
		is_open: true
	},
	{
		id: "demo-5",
		league: "Champions League",
		home_team: "Chelsea",
		away_team: "AC Milan",
		start_time: day(7),
		odds_home: 2.25,
		odds_draw: 3.25,
		odds_away: 3.1,
		is_open: true
	}
];
function useSession() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
			setSession(s);
			setLoading(false);
		});
		supabase.auth.getSession().then(({ data }) => {
			setSession(data.session);
			setLoading(false);
		});
		return () => sub.subscription.unsubscribe();
	}, []);
	return {
		session,
		loading
	};
}
function useAccount(enabled) {
	const fetchAccount = useServerFn(getMyAccount);
	return useQuery({
		queryKey: ["account"],
		queryFn: () => fetchAccount(),
		enabled
	});
}
function useInvalidateAccount() {
	const queryClient = useQueryClient();
	return () => {
		queryClient.invalidateQueries({ queryKey: ["account"] });
		queryClient.invalidateQueries({ queryKey: ["transactions"] });
		queryClient.invalidateQueries({ queryKey: ["bets"] });
	};
}
function useMatches() {
	return useQuery({
		queryKey: ["matches"],
		queryFn: async () => {
			const { data, error } = await supabase.from("matches").select("id, league, home_team, away_team, start_time, odds_home, odds_draw, odds_away, is_open").order("start_time", { ascending: true });
			if (error) {
				console.warn("[matches] Supabase unavailable, using demo data:", error.message);
				return {
					matches: DEMO_MATCHES,
					isDemo: true
				};
			}
			const matches = (data ?? []).map((m) => ({
				...m,
				odds_home: Number(m.odds_home),
				odds_draw: Number(m.odds_draw),
				odds_away: Number(m.odds_away)
			}));
			if (matches.length === 0) return {
				matches: DEMO_MATCHES,
				isDemo: true
			};
			return {
				matches,
				isDemo: false
			};
		},
		retry: false,
		staleTime: 6e4
	});
}
function Home() {
	const navigate = useNavigate();
	const { session } = useSession();
	const signedIn = !!session;
	const account = useAccount(signedIn);
	const matches = useMatches();
	const invalidate = useInvalidateAccount();
	const [displayBalance, setDisplayBalance] = (0, import_react.useState)(null);
	const [depositOpen, setDepositOpen] = (0, import_react.useState)(false);
	const [withdrawOpen, setWithdrawOpen] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("sports");
	const depositFn = useServerFn(submitDeposit);
	const withdrawFn = useServerFn(requestWithdraw);
	const accountBalance = account.data?.profile?.balance ?? 0;
	const balance = displayBalance ?? accountBalance;
	(0, import_react.useEffect)(() => {
		if (account.data?.profile?.balance != null) setDisplayBalance(account.data.profile.balance);
	}, [account.data?.profile?.balance]);
	const depositMutation = useMutation({
		mutationFn: (vars) => depositFn({ data: vars }),
		onSuccess: () => {
			setDepositOpen(false);
			toast.success("Deposit request submitted! Please wait for admin approval.");
			invalidate();
		},
		onError: (e) => toast.error(e.message || "Could not submit deposit")
	});
	const withdrawMutation = useMutation({
		mutationFn: (vars) => withdrawFn({ data: vars }),
		onSuccess: (res) => {
			setWithdrawOpen(false);
			setDisplayBalance(res.balance);
			toast.success("Withdrawal request submitted. Pending admin processing.");
			invalidate();
		},
		onError: (e) => toast.error(e.message || "Could not request withdrawal")
	});
	function requireAuth() {
		if (!signedIn) {
			toast.error("Please sign in first");
			navigate({ to: "/auth" });
			return false;
		}
		return true;
	}
	function handleCasinoPlay(game) {
		if (!requireAuth()) return;
		toast.info(`${game.name} is launching soon — live dealer integration coming next.`);
	}
	const matchData = matches.data?.matches ?? [];
	const isDemoMatches = matches.data?.isDemo ?? false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {
				signedIn,
				username: account.data?.profile?.username,
				balance,
				isAdmin: account.data?.isAdmin,
				loading: account.isLoading,
				onDeposit: () => requireAuth() && setDepositOpen(true),
				onWithdraw: () => requireAuth() && setWithdrawOpen(true),
				onSignOut: async () => {
					await supabase.auth.signOut();
					toast.success("Signed out");
					navigate({
						to: "/auth",
						replace: true
					});
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-4 py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mb-6 overflow-hidden rounded-2xl border border-border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-[0.2em] text-primary",
								children: activeTab === "sports" ? "Sportsbook" : "Live Casino"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-3xl font-black tracking-tight sm:text-4xl",
								children: activeTab === "sports" ? "Back your call. Beat the odds." : "Real dealers. Real action."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-xl text-sm text-muted-foreground",
								children: activeTab === "sports" ? "Pick a match, enter your bet amount, and place instantly. Deposits via bKash/Nagad." : "Stream live roulette, blackjack, baccarat and game shows — play with your MeltaBet balance in real time."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex gap-2 rounded-xl border border-border bg-card p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveTab("sports"),
							className: cn("flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors", activeTab === "sports" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-4" }), "Sportsbook"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setActiveTab("casino"),
							className: cn("flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors", activeTab === "casino" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-4" }), "Live Casino"]
						})]
					}),
					activeTab === "sports" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground",
						children: "Upcoming matches"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchList, {
						matches: matchData,
						loading: matches.isLoading,
						error: matches.isError ? matches.error.message : null,
						isDemo: isDemoMatches,
						signedIn,
						onRequireAuth: requireAuth,
						onBalanceUpdate: setDisplayBalance
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground",
						children: "Live casino games"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasinoGrid, {
						signedIn,
						onPlay: handleCasinoPlay
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepositDialog, {
				open: depositOpen,
				onOpenChange: setDepositOpen,
				submitting: depositMutation.isPending,
				onSubmit: (amount, txId) => depositMutation.mutate({
					amount,
					txId
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WithdrawDialog, {
				open: withdrawOpen,
				onOpenChange: setWithdrawOpen,
				balance,
				submitting: withdrawMutation.isPending,
				onSubmit: (amount, w) => withdrawMutation.mutate({
					amount,
					wallet: w
				})
			})
		]
	});
}
//#endregion
export { Home as component };
