import { TextStyle } from "pixi.js";

// --- Score (Clean, minimal) ---
export const scoreStyle = new TextStyle({
	fontFamily: "Arial",
	fontSize: 24,
	fill: "#ffffff",
	fontWeight: "normal",
	letterSpacing: 2,
});

export const highscoreStyle = new TextStyle({
	fontFamily: "Arial Black",
	fontSize: 24,
	fill: "#ffffff", // Single color only (no gradient arrays)
	fontWeight: "bold",
	stroke: {
		color: "#b8860b",
		width: 4,
	},
	dropShadow: {
		// Now an object, not boolean
		color: "#8b4513",
		blur: 6,
		angle: Math.PI / 4,
		distance: 4,
	},
});
