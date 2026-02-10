import { Application } from "pixi.js";
import "./global.css";
import { getBird } from "./bird";
import { birdAdapter, Keyboard } from "./input/keyboard";
import { createContainer } from "./container";
import { getForeground } from "./foreground";
import { Score } from "./score";
import { Spawner } from "./spawner";
import { CollisionTracker } from "./collision/tracker";
import { Food } from "./spawner/food";
import { Plane } from "./spawner/plane";

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
	const spawner = new Spawner(container);

	// input
	const keyboard = new Keyboard();
	keyboard.listeners.push((key) => {
		const move = birdAdapter(key);
		bird.onMove(move);
	});

	// text
	const score = new Score();
	container.addChild(score.scoreText);
	container.addChild(score.highScoreText);

	//collision tracker
	let gameOver = false;
	const collisionTracker = new CollisionTracker();
	spawner.signal.add.subscribe((obstacle) => {
		collisionTracker.add([obstacle.hitBox, bird.hitBox], () => {
			if (obstacle instanceof Food) {
				spawner.destroy(obstacle);
				score.inc();
			} else if (obstacle instanceof Plane) {
				gameOver = true;
				bird.stop();
			}
		});
	});
	spawner.signal.delete.subscribe((obstacle) => {
		collisionTracker.remove([obstacle.hitBox, bird.hitBox]);
	});

	app.ticker.add((ticker) => {
		if (gameOver) return;
		bird.onUpdate(ticker.deltaTime);
		spawner.onUpdate(ticker.deltaTime);
		foreground.onUpdate(ticker.deltaTime);
		collisionTracker.onUpdate();
	});
}

main();
