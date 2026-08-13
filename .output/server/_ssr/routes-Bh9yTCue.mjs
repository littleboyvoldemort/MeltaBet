import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as createServerFn } from "./ssr.mjs";
import { i as cn, n as Input, r as Label, t as Button } from "./label-Cq5SXjoZ.mjs";
import { n as createSsrRpc, r as useServerFn, t as Badge } from "./createSsrRpc-CkdAslde.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-D6DsnQQB.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Trash2, c as Shield, d as LoaderCircle, f as Dices, g as ArrowUpFromLine, i as Trophy, m as Clock, n as Wallet, o as Ticket, p as Copy, r as Users, s as Spade, t as X, u as LogOut, v as ArrowDownToLine } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-BsC7W_eT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bh9yTCue.js
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
					children: "1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-lg font-black tracking-tight",
					children: ["APEX", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin" }) : `$${(balance ?? 0).toFixed(2)}`
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
function OddsButton({ label, value, active, onClick, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		disabled,
		className: cn("flex flex-1 flex-col items-center gap-0.5 rounded-md border border-border bg-secondary px-2 py-2 transition-colors", "hover:border-primary/70 hover:bg-secondary/70 disabled:cursor-not-allowed disabled:opacity-50", active && "border-primary bg-primary text-primary-foreground hover:bg-primary"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("text-[10px] uppercase tracking-wide", active ? "text-primary-foreground/80" : "text-muted-foreground"),
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-bold tabular-nums",
			children: value.toFixed(2)
		})]
	});
}
function MatchList({ matches, loading, error, isDemo, selected, onPick }) {
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-28 w-full rounded-xl" }, i))
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
		}) : null, matches.map((m) => {
			const pick = selected[m.id];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
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
						className: "mb-3 text-base font-bold",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsButton, {
								label: "1 Home",
								value: m.odds_home,
								active: pick === "home",
								disabled: !m.is_open,
								onClick: () => onPick(m, "home")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsButton, {
								label: "X Draw",
								value: m.odds_draw,
								active: pick === "draw",
								disabled: !m.is_open,
								onClick: () => onPick(m, "draw")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OddsButton, {
								label: "2 Away",
								value: m.odds_away,
								active: pick === "away",
								disabled: !m.is_open,
								onClick: () => onPick(m, "away")
							})
						]
					})
				]
			}, m.id);
		})]
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Min $", game.minBet] })]
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dices, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Real dealers · HD streams · Instant crypto payouts" })]
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
function BetSlip({ selections, stake, onStakeChange, onRemove, onClear, onPlaceBet, placing, signedIn, balance }) {
	const totalOdds = selections.reduce((acc, s) => acc * s.odds, 1);
	const stakeNumber = Number(stake) || 0;
	const payout = stakeNumber * totalOdds;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "flex items-center gap-2 text-sm font-bold uppercase tracking-wide",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticket, { className: "size-4 text-primary" }),
						" Bet slip",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-primary px-1.5 text-xs font-black text-primary-foreground",
							children: selections.length
						})
					]
				}), selections.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onClear,
					className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" }), " Clear"]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[40vh] space-y-2 overflow-y-auto px-4 py-3 lg:max-h-[50vh]",
				children: selections.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-center text-sm text-muted-foreground",
					children: "Tap any odds to add a selection."
				}) : selections.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-2 rounded-md border border-border bg-secondary px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: s.label.split(" — ")[0]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold",
								children: s.label.split(" — ")[1]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold tabular-nums text-primary",
							children: s.odds.toFixed(2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => onRemove(s.matchId),
							"aria-label": "Remove selection",
							className: "text-muted-foreground hover:text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				}, s.matchId))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 border-t border-border px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Total odds"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold tabular-nums",
							children: totalOdds.toFixed(2)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "stake",
							className: "text-xs text-muted-foreground",
							children: "Stake ($)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "stake",
							inputMode: "decimal",
							value: stake,
							onChange: (e) => onStakeChange(e.target.value),
							placeholder: "0.00"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Potential payout"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-lg font-black tabular-nums text-primary",
							children: ["$", payout.toFixed(2)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "w-full",
						size: "lg",
						onClick: onPlaceBet,
						disabled: placing || selections.length === 0 || stakeNumber <= 0,
						children: [placing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, signedIn ? "Place bet" : "Sign in to bet"]
					}),
					signedIn && stakeNumber > balance ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-destructive",
						children: "Stake exceeds your balance."
					}) : null
				]
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
function DepositDialog({ open, onOpenChange, walletAddress, walletLoading, submitting, onSubmit }) {
	const [amount, setAmount] = (0, import_react.useState)("");
	const [txId, setTxId] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Deposit with USDT (BEP20)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Send USDT on the BEP20 network to the address below, then submit your transaction ID." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Deposit address" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-md border border-border bg-secondary p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "min-w-0 flex-1 truncate font-mono text-xs",
							children: walletLoading ? "Loading…" : walletAddress || "Not configured yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								navigator.clipboard.writeText(walletAddress);
								toast.success("Address copied");
							},
							disabled: !walletAddress,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "dep-amount",
						children: "Amount (USDT)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "dep-amount",
						inputMode: "decimal",
						value: amount,
						onChange: (e) => setAmount(e.target.value),
						placeholder: "100"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "dep-tx",
						children: "Transaction ID (TxID)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "dep-tx",
						value: txId,
						onChange: (e) => setTxId(e.target.value),
						placeholder: "0x…",
						className: "font-mono"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full",
					disabled: submitting,
					onClick: () => {
						onSubmit(Number(amount), txId);
						setAmount("");
						setTxId("");
					},
					children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, " I have paid"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs text-muted-foreground",
					children: "Your balance updates only after an admin confirms the payment."
				})
			]
		})] })
	});
}
function WithdrawDialog({ open, onOpenChange, balance, submitting, onSubmit }) {
	const [amount, setAmount] = (0, import_react.useState)("");
	const [wallet, setWallet] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Withdraw funds" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: ["Available balance: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-bold text-foreground",
			children: ["$", balance.toFixed(2)]
		})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "wd-amount",
						children: "Amount (USDT)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "wd-amount",
						inputMode: "decimal",
						value: amount,
						onChange: (e) => setAmount(e.target.value),
						placeholder: "50"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "wd-wallet",
						children: "Your USDT (BEP20) wallet address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "wd-wallet",
						value: wallet,
						onChange: (e) => setWallet(e.target.value),
						placeholder: "0x…",
						className: "font-mono"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "w-full",
					disabled: submitting,
					onClick: () => {
						onSubmit(Number(amount), wallet);
						setAmount("");
						setWallet("");
					},
					children: [submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, " Request withdraw"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs text-muted-foreground",
					children: "The amount is deducted immediately and paid out after admin processing."
				})
			]
		})] })
	});
}
var getMyAccount = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("dda031e118da545a38ec567093d778335858489cbe90b5b4237d13d7b123f8a8"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("ced47682977496baa9a158f2dd8a270bac990571dafb3c83ca9a88f21b204b6b"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("316746d20ccd0a791dabfa38f0a1c6e5b46d55e3220e99550984016b5635b15c"));
var placeBet = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	if (!Array.isArray(input.selections) || input.selections.length === 0) throw new Error("Your bet slip is empty");
	if (!Number.isFinite(input.stake) || input.stake <= 0) throw new Error("Enter a valid stake");
	return input;
}).handler(createSsrRpc("60d3dd4d6e9fee451ac573cd74084b59aacba430fcb8a11f7c6ba62f450cad1f"));
var submitDeposit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error("Enter a valid amount");
	if (!input.txId || input.txId.trim().length < 6) throw new Error("Enter a valid transaction ID");
	return {
		amount: Math.round(input.amount * 100) / 100,
		txId: input.txId.trim().slice(0, 200)
	};
}).handler(createSsrRpc("d9882b96d1ae5a052a8c772650bd3a3b68f58e86e29ad9ebead9def9ce3cda7d"));
var requestWithdraw = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error("Enter a valid amount");
	if (!input.wallet || input.wallet.trim().length < 8) throw new Error("Enter a valid wallet address");
	return {
		amount: Math.round(input.amount * 100) / 100,
		wallet: input.wallet.trim().slice(0, 200)
	};
}).handler(createSsrRpc("4cb8264cda65b07ebc21fdbf5f45bb810728e748abf35da3431f087a091529b9"));
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
function useDepositWallet() {
	return useQuery({
		queryKey: ["deposit-wallet"],
		queryFn: async () => {
			const { data, error } = await supabase.from("settings").select("value").eq("key", "deposit_wallet_usdt_bep20").maybeSingle();
			if (error) {
				console.warn("[settings] Supabase unavailable:", error.message);
				return "";
			}
			return data?.value ?? "";
		},
		retry: false,
		staleTime: 6e4
	});
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
	const wallet = useDepositWallet();
	const invalidate = useInvalidateAccount();
	const [selections, setSelections] = (0, import_react.useState)([]);
	const [stake, setStake] = (0, import_react.useState)("");
	const [depositOpen, setDepositOpen] = (0, import_react.useState)(false);
	const [withdrawOpen, setWithdrawOpen] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("sports");
	const placeBetFn = useServerFn(placeBet);
	const depositFn = useServerFn(submitDeposit);
	const withdrawFn = useServerFn(requestWithdraw);
	const balance = account.data?.profile?.balance ?? 0;
	const betMutation = useMutation({
		mutationFn: () => placeBetFn({ data: {
			selections,
			stake: Number(stake)
		} }),
		onSuccess: (res) => {
			toast.success(`Bet placed — potential payout $${res.payout.toFixed(2)}`);
			setSelections([]);
			setStake("");
			invalidate();
		},
		onError: (e) => toast.error(e.message || "Could not place bet")
	});
	const depositMutation = useMutation({
		mutationFn: (vars) => depositFn({ data: vars }),
		onSuccess: () => {
			setDepositOpen(false);
			toast.success("Deposit submitted. Awaiting admin confirmation.");
			invalidate();
		},
		onError: (e) => toast.error(e.message || "Could not submit deposit")
	});
	const withdrawMutation = useMutation({
		mutationFn: (vars) => withdrawFn({ data: vars }),
		onSuccess: () => {
			setWithdrawOpen(false);
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
	function pick(match, choice) {
		const odds = choice === "home" ? match.odds_home : choice === "draw" ? match.odds_draw : match.odds_away;
		const label = `${match.home_team} v ${match.away_team} — ${choice === "home" ? match.home_team : choice === "draw" ? "Draw" : match.away_team}`;
		setSelections((prev) => {
			const existing = prev.find((s) => s.matchId === match.id);
			if (existing && existing.pick === choice) return prev.filter((s) => s.matchId !== match.id);
			return [...prev.filter((s) => s.matchId !== match.id), {
				matchId: match.id,
				pick: choice,
				odds,
				label
			}];
		});
	}
	const selectedMap = Object.fromEntries(selections.map((s) => [s.matchId, s.pick]));
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
								children: activeTab === "sports" ? "Three-way markets on the biggest fixtures, instant bet slips, and crypto deposits with manual security review on every payout." : "Stream live roulette, blackjack, baccarat and game shows — play with your ApexBet balance in real time."
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 lg:grid-cols-[1fr_340px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: activeTab === "sports" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground",
							children: "Upcoming matches"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatchList, {
							matches: matchData,
							loading: matches.isLoading,
							error: matches.isError ? matches.error.message : null,
							isDemo: isDemoMatches,
							selected: selectedMap,
							onPick: pick
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground",
							children: "Live casino games"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasinoGrid, {
							signedIn,
							onPlay: handleCasinoPlay
						})] }) }), activeTab === "sports" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							className: "lg:sticky lg:top-20 lg:h-fit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BetSlip, {
								selections,
								stake,
								onStakeChange: setStake,
								onRemove: (id) => setSelections((p) => p.filter((s) => s.matchId !== id)),
								onClear: () => setSelections([]),
								onPlaceBet: () => requireAuth() && betMutation.mutate(),
								placing: betMutation.isPending,
								signedIn,
								balance
							})
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepositDialog, {
				open: depositOpen,
				onOpenChange: setDepositOpen,
				walletAddress: wallet.data ?? "",
				walletLoading: wallet.isLoading,
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
