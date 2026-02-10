import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint"; // Add this import

export default defineConfig(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		rules: {},
	},
);
