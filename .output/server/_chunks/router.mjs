import { r as __toESM } from "../_runtime.mjs";
import { a as createServerFn, i as createMiddleware, o as getRequest, t as useServerFn } from "../_libs/@tanstack/react-start+[...].mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { A as redirect, _ as useRouter, c as HeadContent, d as Outlet, g as useNavigate, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as useQueryClient, n as useQuery, r as QueryClientProvider, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast, t as Toaster$1 } from "../_libs/sonner.mjs";
import { _ as ArrowLeft, a as Trash2, c as Shield, d as LoaderCircle, f as Dices, g as ArrowUpFromLine, h as Check, i as Trophy, l as Save, m as Clock, n as Wallet, o as Ticket, p as Copy, r as Users, s as Spade, t as X, u as LogOut, v as ArrowDownToLine } from "../_libs/lucide-react.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { t as supabase } from "./client.mjs";
import processModule from "node:process";
//#region src/styles.css?transform-only
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
//#endregion
//#region src/styles.css?url
var styles_default = "/assets/styles-Uihsm0iu.css";
//#endregion
//#region src/components/ui/sonner.tsx
var import_jsx_runtime = require_jsx_runtime();
var Toaster = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$4 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "ApexBet — Crypto Sportsbook" },
			{
				name: "description",
				content: "Place 3-way football bets, manage your balance and deposit with USDT on ApexBet."
			},
			{
				property: "og:title",
				content: "ApexBet — Crypto Sportsbook"
			},
			{
				property: "og:description",
				content: "Place 3-way football bets, manage your balance and deposit with USDT on ApexBet."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}, {
			rel: "icon",
			href: "/favicon.ico",
			type: "image/x-icon"
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$4.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			richColors: true,
			position: "top-center"
		})]
	});
}
//#endregion
//#region src/lib/utils.ts
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/components/ui/button.tsx
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region src/components/betting/site-header.tsx
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
//#endregion
//#region src/components/ui/skeleton.tsx
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-primary/10", className),
		...props
	});
}
//#endregion
//#region src/components/betting/match-list.tsx
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
//#endregion
//#region src/components/ui/badge.tsx
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
//#region src/lib/casino-games.ts
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
//#endregion
//#region src/components/betting/casino-grid.tsx
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
//#endregion
//#region src/components/ui/input.tsx
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
//#endregion
//#region src/components/ui/label.tsx
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
//#endregion
//#region src/components/betting/bet-slip.tsx
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
//#endregion
//#region src/components/ui/dialog.tsx
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
//#endregion
//#region src/components/betting/wallet-dialogs.tsx
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
//#endregion
//#region src/integrations/supabase/auth-middleware.ts
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
var requireSupabaseAuth = createMiddleware({ type: "function" }).server(async ({ next }) => {
	const SUPABASE_URL = processModule.env["SUPABASE_URL"];
	const SUPABASE_PUBLISHABLE_KEY = processModule.env["SUPABASE_PUBLISHABLE_KEY"];
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${[...!SUPABASE_URL ? ["SUPABASE_URL"] : [], ...!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY"] : []].join(", ")}. Connect Supabase in Lovable Cloud.`;
		console.error(`[Supabase] ${message}`);
		throw new Error(message);
	}
	const request = getRequest();
	if (!request?.headers) throw new Error("Unauthorized: No request headers available");
	const authHeader = request.headers.get("authorization");
	if (!authHeader) throw new Error("Unauthorized: No authorization header provided");
	if (!authHeader.startsWith("Bearer ")) throw new Error("Unauthorized: Only Bearer tokens are supported");
	const token = authHeader.replace("Bearer ", "");
	if (!token) throw new Error("Unauthorized: No token provided");
	if (token.split(".").length !== 3) throw new Error("Unauthorized: Invalid token");
	const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		global: {
			fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY),
			headers: { Authorization: `Bearer ${token}` }
		},
		auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		}
	});
	const { data, error } = await supabase.auth.getClaims(token);
	if (error || !data?.claims) throw new Error("Unauthorized: Invalid token");
	if (!data.claims.sub) throw new Error("Unauthorized: No user ID found in token");
	return next({ context: {
		supabase,
		userId: data.claims.sub,
		claims: data.claims
	} });
});
//#endregion
//#region src/lib/betting.functions.ts
var getMyAccount = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
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
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
	const { data, error } = await context.supabase.from("transactions").select("id, type, amount, status, tx_id, wallet_address, created_at").eq("user_id", context.userId).order("created_at", { ascending: false }).limit(25);
	if (error) throw new Error(error.message);
	return (data ?? []).map((t) => ({
		...t,
		amount: Number(t.amount)
	}));
});
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
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
var placeBet = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	if (!Array.isArray(input.selections) || input.selections.length === 0) throw new Error("Your bet slip is empty");
	if (!Number.isFinite(input.stake) || input.stake <= 0) throw new Error("Enter a valid stake");
	return input;
}).handler(async ({ data, context }) => {
	const { supabaseAdmin } = await import("./client.server.mjs");
	const userId = context.userId;
	const matchIds = [...new Set(data.selections.map((s) => s.matchId))];
	if (matchIds.length !== data.selections.length) throw new Error("Only one selection per match is allowed");
	const { data: matches, error: matchError } = await supabaseAdmin.from("matches").select("id, home_team, away_team, odds_home, odds_draw, odds_away, is_open").in("id", matchIds);
	if (matchError) throw new Error(matchError.message);
	if (!matches || matches.length !== matchIds.length) throw new Error("Match not found");
	const trusted = data.selections.map((s) => {
		const m = matches.find((x) => x.id === s.matchId);
		if (!m.is_open) throw new Error("Betting is closed for one of your matches");
		const odds = s.pick === "home" ? Number(m.odds_home) : s.pick === "draw" ? Number(m.odds_draw) : Number(m.odds_away);
		const label = s.pick === "home" ? m.home_team : s.pick === "draw" ? "Draw" : m.away_team;
		return {
			matchId: m.id,
			pick: s.pick,
			odds,
			label: `${m.home_team} v ${m.away_team} — ${label}`
		};
	});
	const stake = Math.round(data.stake * 100) / 100;
	const totalOdds = Math.round(trusted.reduce((acc, s) => acc * s.odds, 1) * 100) / 100;
	const payout = Math.round(stake * totalOdds * 100) / 100;
	const { data: profile, error: profileError } = await supabaseAdmin.from("profiles").select("balance").eq("id", userId).single();
	if (profileError) throw new Error(profileError.message);
	const balance = Number(profile.balance);
	if (balance < stake) throw new Error("Insufficient balance");
	const { data: updated, error: updateError } = await supabaseAdmin.from("profiles").update({ balance: Math.round((balance - stake) * 100) / 100 }).eq("id", userId).gte("balance", stake).select("balance");
	if (updateError) throw new Error(updateError.message);
	if (!updated || updated.length === 0) throw new Error("Insufficient balance");
	const { error: betError } = await supabaseAdmin.from("bets").insert({
		user_id: userId,
		selections: trusted,
		stake,
		total_odds: totalOdds,
		potential_payout: payout
	});
	if (betError) {
		await supabaseAdmin.from("profiles").update({ balance }).eq("id", userId);
		throw new Error(betError.message);
	}
	return {
		balance: Number(updated[0].balance),
		stake,
		totalOdds,
		payout
	};
});
var submitDeposit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error("Enter a valid amount");
	if (!input.txId || input.txId.trim().length < 6) throw new Error("Enter a valid transaction ID");
	return {
		amount: Math.round(input.amount * 100) / 100,
		txId: input.txId.trim().slice(0, 200)
	};
}).handler(async ({ data, context }) => {
	const { supabaseAdmin } = await import("./client.server.mjs");
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
var requestWithdraw = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	if (!Number.isFinite(input.amount) || input.amount <= 0) throw new Error("Enter a valid amount");
	if (!input.wallet || input.wallet.trim().length < 8) throw new Error("Enter a valid wallet address");
	return {
		amount: Math.round(input.amount * 100) / 100,
		wallet: input.wallet.trim().slice(0, 200)
	};
}).handler(async ({ data, context }) => {
	const { supabaseAdmin } = await import("./client.server.mjs");
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
//#region src/lib/demo-matches.ts
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
//#endregion
//#region src/lib/betting-hooks.ts
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
//#endregion
//#region src/routes/index.tsx
var Route$3 = createFileRoute("/")({
	ssr: false,
	head: () => ({ meta: [
		{ title: "ApexBet — Live Sports Betting & Crypto Sportsbook" },
		{
			name: "description",
			content: "Bet on football with 3-way odds, build multi-selection slips, deposit with USDT BEP20 and cash out fast on ApexBet."
		},
		{
			property: "og:title",
			content: "ApexBet — Live Sports Betting & Crypto Sportsbook"
		},
		{
			property: "og:description",
			content: "Bet on football with 3-way odds, build multi-selection slips, deposit with USDT BEP20 and cash out fast."
		}
	] }),
	component: Home
});
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
//#region src/routes/_authenticated/route.tsx
var Route$2 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
});
//#endregion
//#region src/components/ui/tabs.tsx
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
//#endregion
//#region src/routes/auth.tsx
var Route$1 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign in or register — ApexBet Sportsbook" },
		{
			name: "description",
			content: "Create your ApexBet account or log in to place bets, deposit crypto and track your balance."
		},
		{
			property: "og:title",
			content: "Sign in or register — ApexBet Sportsbook"
		},
		{
			property: "og:description",
			content: "Create your ApexBet account or log in to place bets, deposit crypto and track your balance."
		}
	] }),
	component: AuthPage
});
function AuthPage() {
	const navigate = useNavigate();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [username, setUsername] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({
				to: "/",
				replace: true
			});
		});
	}, [navigate]);
	async function signIn(e) {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setLoading(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Welcome back");
		navigate({
			to: "/",
			replace: true
		});
	}
	async function signUp(e) {
		e.preventDefault();
		setLoading(true);
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { username: username || email.split("@")[0] },
				emailRedirectTo: `${window.location.origin}/`
			}
		});
		setLoading(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		if (!data.session) {
			toast.success("Account created. Check your email to confirm, then log in.");
			return;
		}
		toast.success("Account created. You can start betting now.");
		navigate({
			to: "/",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-border bg-card p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-2xl font-black tracking-tight",
					children: ["APEX", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "BET"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Sign in to place bets, deposit and withdraw."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "login",
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "grid w-full grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "login",
								children: "Log in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "register",
								children: "Register"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "login",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "space-y-4",
								onSubmit: signIn,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "login-email",
											children: "Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "login-email",
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "login-password",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "login-password",
											type: "password",
											required: true,
											value: password,
											onChange: (e) => setPassword(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										className: "w-full",
										disabled: loading,
										children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, " Log in"]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
							value: "register",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "space-y-4",
								onSubmit: signUp,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "reg-username",
											children: "Username"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "reg-username",
											value: username,
											onChange: (e) => setUsername(e.target.value),
											placeholder: "highroller"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "reg-email",
											children: "Email"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "reg-email",
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "reg-password",
											children: "Password"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "reg-password",
											type: "password",
											required: true,
											minLength: 6,
											value: password,
											onChange: (e) => setPassword(e.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "submit",
										className: "w-full",
										disabled: loading,
										children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, " Create account"]
									})
								]
							})
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/components/ui/table.tsx
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
//#endregion
//#region src/lib/admin.functions.ts
async function assertAdmin(context) {
	const { data, error } = await context.supabase.rpc("has_role", {
		_user_id: context.userId,
		_role: "admin"
	});
	if (error) throw new Error(error.message);
	if (!data) throw new Error("Forbidden");
}
var getAdminOverview = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server.mjs");
	const [{ data: txs }, { data: profiles }, { data: setting }] = await Promise.all([
		supabaseAdmin.from("transactions").select("id, user_id, type, amount, status, tx_id, wallet_address, created_at").order("created_at", { ascending: false }).limit(200),
		supabaseAdmin.from("profiles").select("id, username, balance"),
		supabaseAdmin.from("settings").select("value").eq("key", "deposit_wallet_usdt_bep20").maybeSingle()
	]);
	const names = new Map((profiles ?? []).map((p) => [p.id, p.username]));
	return {
		transactions: (txs ?? []).map((t) => ({
			...t,
			amount: Number(t.amount),
			username: names.get(t.user_id) ?? "unknown"
		})),
		users: (profiles ?? []).map((p) => ({
			...p,
			balance: Number(p.balance)
		})),
		walletAddress: setting?.value ?? ""
	};
});
var decideDeposit = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(async ({ data, context }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server.mjs");
	const { data: tx, error } = await supabaseAdmin.from("transactions").select("id, user_id, amount, type, status").eq("id", data.id).single();
	if (error) throw new Error(error.message);
	if (tx.type !== "deposit" || tx.status !== "pending") throw new Error("Transaction is not a pending deposit");
	if (data.approve) {
		const { data: profile, error: pErr } = await supabaseAdmin.from("profiles").select("balance").eq("id", tx.user_id).single();
		if (pErr) throw new Error(pErr.message);
		const next = Math.round((Number(profile.balance) + Number(tx.amount)) * 100) / 100;
		const { error: uErr } = await supabaseAdmin.from("profiles").update({ balance: next }).eq("id", tx.user_id);
		if (uErr) throw new Error(uErr.message);
	}
	const { error: sErr } = await supabaseAdmin.from("transactions").update({
		status: data.approve ? "approved" : "rejected",
		processed_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", tx.id).eq("status", "pending");
	if (sErr) throw new Error(sErr.message);
	return { ok: true };
});
var markWithdrawPaid = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => input).handler(async ({ data, context }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server.mjs");
	const { error } = await supabaseAdmin.from("transactions").update({
		status: "completed",
		processed_at: (/* @__PURE__ */ new Date()).toISOString()
	}).eq("id", data.id).eq("type", "withdraw").eq("status", "pending");
	if (error) throw new Error(error.message);
	return { ok: true };
});
var updateDepositWallet = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	if (!input.address || input.address.trim().length < 8) throw new Error("Enter a valid wallet address");
	return { address: input.address.trim().slice(0, 200) };
}).handler(async ({ data, context }) => {
	await assertAdmin(context);
	const { supabaseAdmin } = await import("./client.server.mjs");
	const { error } = await supabaseAdmin.from("settings").upsert({
		key: "deposit_wallet_usdt_bep20",
		value: data.address,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	});
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
//#region src/routes/_authenticated/admin.tsx
var Route = createFileRoute("/_authenticated/admin")({
	head: () => ({ meta: [
		{ title: "Admin console — ApexBet" },
		{
			name: "description",
			content: "Approve deposits, process withdrawals and manage payout settings."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: AdminPage
});
function AdminPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const overviewFn = useServerFn(getAdminOverview);
	const decideFn = useServerFn(decideDeposit);
	const payFn = useServerFn(markWithdrawPaid);
	const walletFn = useServerFn(updateDepositWallet);
	const [wallet, setWallet] = (0, import_react.useState)("");
	const overview = useQuery({
		queryKey: ["admin-overview"],
		queryFn: () => overviewFn(),
		retry: false
	});
	(0, import_react.useEffect)(() => {
		if (overview.data?.walletAddress) setWallet(overview.data.walletAddress);
	}, [overview.data?.walletAddress]);
	(0, import_react.useEffect)(() => {
		if (overview.isError) {
			toast.error("You don't have access to the admin console.");
			navigate({
				to: "/",
				replace: true
			});
		}
	}, [overview.isError, navigate]);
	const refresh = () => queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
	const decide = useMutation({
		mutationFn: (vars) => decideFn({ data: vars }),
		onSuccess: (_d, vars) => {
			toast.success(vars.approve ? "Deposit approved and credited" : "Deposit rejected");
			refresh();
		},
		onError: (e) => toast.error(e.message)
	});
	const pay = useMutation({
		mutationFn: (id) => payFn({ data: { id } }),
		onSuccess: () => {
			toast.success("Withdrawal marked as paid");
			refresh();
		},
		onError: (e) => toast.error(e.message)
	});
	const saveWallet = useMutation({
		mutationFn: () => walletFn({ data: { address: wallet } }),
		onSuccess: () => {
			toast.success("Deposit wallet updated");
			queryClient.invalidateQueries({ queryKey: ["deposit-wallet"] });
			refresh();
		},
		onError: (e) => toast.error(e.message)
	});
	const txs = overview.data?.transactions ?? [];
	const pendingDeposits = txs.filter((t) => t.type === "deposit" && t.status === "pending");
	const pendingWithdrawals = txs.filter((t) => t.type === "withdraw" && t.status === "pending");
	const history = txs.filter((t) => t.status !== "pending").slice(0, 25);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-4 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-black tracking-tight",
					children: "Admin console"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Approve deposits, process withdrawals, set the payout wallet."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), " Back to sportsbook"]
					})
				})]
			}), overview.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }), " Loading admin data…"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-lg font-bold",
						children: "Pending deposits"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "TxID" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Action"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: pendingDeposits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 4,
							className: "text-muted-foreground",
							children: "No pending deposits."
						}) }) : pendingDeposits.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium",
								children: t.username
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "tabular-nums",
								children: ["$", t.amount.toFixed(2)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "max-w-[240px] truncate font-mono text-xs",
								children: t.tx_id
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "space-x-2 text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									disabled: decide.isPending,
									onClick: () => decide.mutate({
										id: t.id,
										approve: true
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Approve"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									disabled: decide.isPending,
									onClick: () => decide.mutate({
										id: t.id,
										approve: false
									}),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), " Reject"]
								})]
							})
						] }, t.id)) })] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-lg font-bold",
						children: "Pending withdrawals"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Wallet address" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
								className: "text-right",
								children: "Action"
							})
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: pendingWithdrawals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 4,
							className: "text-muted-foreground",
							children: "No pending withdrawals."
						}) }) : pendingWithdrawals.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "font-medium",
								children: t.username
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "tabular-nums",
								children: ["$", t.amount.toFixed(2)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "max-w-[260px] truncate font-mono text-xs",
								children: t.wallet_address
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									disabled: pay.isPending,
									onClick: () => pay.mutate(t.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Mark as paid"]
								})
							})
						] }, t.id)) })] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-lg font-bold",
						children: "Deposit wallet (USDT BEP20)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-3 sm:flex-row sm:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "wallet",
								children: "Address shown to users"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "wallet",
								value: wallet,
								onChange: (e) => setWallet(e.target.value),
								className: "font-mono"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => saveWallet.mutate(),
							disabled: saveWallet.isPending,
							children: [saveWallet.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), "Save"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-3 text-lg font-bold",
						children: "Recent processed transactions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "User" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Type" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Amount" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" })
						] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
							colSpan: 4,
							className: "text-muted-foreground",
							children: "Nothing processed yet."
						}) }) : history.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: t.username }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
								className: "capitalize",
								children: t.type
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
								className: "tabular-nums",
								children: ["$", t.amount.toFixed(2)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								className: "capitalize",
								children: t.status
							}) })
						] }, t.id)) })] })
					})]
				})
			] })]
		})
	});
}
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$3.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$4
});
var AuthenticatedRouteRoute = Route$2.update({
	id: "/_authenticated",
	getParentRoute: () => Route$4
});
var AuthRoute = Route$1.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$4
});
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRoute: Route.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
}) };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AuthRoute
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
