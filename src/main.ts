import { Application } from "pixi.js";
import "./global.css";
import { getBird } from "./bird";
import { birdAdapter, Keyboard } from "./input/keyboard";
import { FoodSpawner } from "./food-spawner";
import { createContainer } from "./container";
import { getForeground } from "./foreground";
import { Score } from "./score";

async function main() {
	// Create a new application
	const app = new Application();

	// Initialize the application
	await app.init({ background: "#1099bb", resizeTo: window, antialias: true });

	// Append the application canvas to the document body
	document.getElementById("app")!.appendChild(app.canvas);

	const container = createContainer();
	app.stage.addChild(container);

	const [foreground, bird] = await Promise.all([getForeground(), getBird()]);
	// foreground
	foreground.sprites.forEach((s) => container.addChild(s));

	// bird
	container.addChild(bird.sprite);
	const foodSpawner = new FoodSpawner(container);

	// input
	const keyboard = new Keyboard();
	keyboard.listeners.push((key) => {
		const move = birdAdapter(key);
		bird.onMove(move);
	});

	// text
	const score = new Score();
	foodSpawner.signal.subscribe(() => {
		score.inc();
	});
	container.addChild(score.scoreText);
	container.addChild(score.highScoreText);

	app.ticker.add((ticker) => {
		bird.onUpdate(ticker.deltaTime);
		foodSpawner.onUpdate(ticker.deltaTime, bird.hitBox);
		foreground.onUpdate(ticker.deltaTime);
	});
}

main();
