//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CyxZKWNg.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "M:/APEXBET/src/routes/__root.tsx",
		children: [
			"/",
			"/_authenticated",
			"/auth"
		],
		preloads: ["/assets/index-CdqUtLOx.js", "/assets/useRouter-Dpb7RwMI.js"],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-CdqUtLOx.js"
		} }]
	},
	"/": {
		filePath: "M:/APEXBET/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-BQ9VHsgh.js",
			"/assets/auth-middleware-C1xAIqky.js",
			"/assets/label-DRxuTaxF.js",
			"/assets/dist-DYr2N4_J.js"
		]
	},
	"/_authenticated": {
		filePath: "M:/APEXBET/src/routes/_authenticated/route.tsx",
		children: ["/_authenticated/admin"],
		preloads: ["/assets/route-B3YbHp7J.js"]
	},
	"/auth": {
		filePath: "M:/APEXBET/src/routes/auth.tsx",
		children: void 0,
		preloads: [
			"/assets/auth-CSi0ivac.js",
			"/assets/label-DRxuTaxF.js",
			"/assets/dist-DYr2N4_J.js"
		]
	},
	"/_authenticated/admin": {
		filePath: "M:/APEXBET/src/routes/_authenticated/admin.tsx",
		children: void 0,
		preloads: [
			"/assets/admin-L-dMCsaD.js",
			"/assets/auth-middleware-C1xAIqky.js",
			"/assets/label-DRxuTaxF.js"
		]
	}
} });
//#endregion
export { tsrStartManifest };
