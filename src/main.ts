import { Application } from "pixi.js";
import "./global.css";
import { getBird } from "./bird";
import { birdAdapter, Keyboard } from "./input/keyboard";



async function main() {
	// Create a new application
	const app = new Application();

	// Initialize the application
	await app.init({ background: "#1099bb", resizeTo: window });

	// Append the application canvas to the document body
	document.getElementById("app")!.appendChild(app.canvas);

	// bird
	const bird = await getBird();
	app.stage.addChild(bird.sprite);
  // foreground

	// input
	const keyboard = new Keyboard();
	keyboard.listeners.push((key) => {
		const move = birdAdapter(key);
		bird.onMove(move);
	});

	app.ticker.add((ticker) => {
		bird.update(ticker.deltaTime);
	});
}

main();
