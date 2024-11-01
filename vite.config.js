import { sentryVitePlugin } from "@sentry/vite-plugin";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/ 
export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
			"/public": {
				target: "http://localhost:3000",
				changeOrigin: true,
			},
		},
	},

	plugins: [
		TanStackRouterVite(),
		react(),
		sentryVitePlugin({
			org: "betsegaw",
			project: "padre-gianos-pizza-store",
		}),
	],

	build: {
		sourcemap: true,
	},
});
