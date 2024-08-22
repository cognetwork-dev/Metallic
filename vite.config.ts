import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { ChemicalVitePlugin } from "chemicaljs";
import { ViteMinifyPlugin } from "vite-plugin-minify";
//@ts-ignore
import { generateFile } from "./src/util/generateFileVite";
//@ts-ignore
import { generateThemes } from "./src/util/generateThemes";
import themes from "./src/themes.json";

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: "build",
	},
	plugins: [
		ChemicalVitePlugin(),
		generateFile([
			{
				contentType: "text/css",
				output: "themes.css",
				data: generateThemes(themes),
			},
		]),
		ViteMinifyPlugin(),
		preact(),
	],
});
