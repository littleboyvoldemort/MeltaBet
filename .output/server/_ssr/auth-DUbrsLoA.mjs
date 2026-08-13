import { r as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as cn, n as Input, r as Label, t as Button } from "./label-Cq5SXjoZ.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { l as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-BsC7W_eT.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-DUbrsLoA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
					children: ["MELTA", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "BET"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Sign in to place bets, deposit via bKash/Nagad, and withdraw."
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
export { AuthPage as component };
