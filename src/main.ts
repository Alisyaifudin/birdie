import { Application, Rectangle } from "pixi.js";
import "./global.css";
import { getBird } from "./bird";
import { birdAdapter, Keyboard } from "./input/keyboard";
import { birdPointerAdapter, Pointer } from "./input/pointer";
import { getForeground } from "./foreground";
import { Score } from "./score";
import { Spawner } from "./spawner";
import { Food } from "./spawner/food";
import { Plane } from "./spawner/plane";
import { resizeListener } from "./lib/resize";
import { CollisionTracker } from "./collision/tracker";
import { SPAWN_RATE_DELTA, SPAWN_RATE_FOOD_MIN, SPAWN_RATE_PLANE_MIN } from "./spawner/constants";
import { SPEED_LEVEL, SPEED_MULT } from "./lib/constants";

async function main() {
	// Create a new application
	const app = new Application();

	// Initialize the application
	await app.init({ background: "#1099bb", resizeTo: window, antialias: true });
	app.stage.eventMode = "static";
	app.stage.hitArea = new Rectangle(0, 0, window.innerWidth, window.innerHeight);

	// Append the application canvas to the document body
	document.getElementById("app")!.appendChild(app.canvas);
	const container = app.stage;
	const screen = resizeListener(container);
	const [foreground, bird] = await Promise.all([
		getForeground(container, screen),
		getBird(container, screen),
	]);

	const spawner = new Spawner(container, screen);

	// input
	const keyboard = new Keyboard();
	keyboard.signal.subscribe((key) => {
		const move = birdAdapter(key);
		bird.onMove(move);
	});
	app.stage.eventMode = "static";
	const pointer = new Pointer(app.stage);
	pointer.signal.subscribe((key) => {
		const move = birdPointerAdapter(key);
		bird.onMove(move);
	});

	// // text
	const score = new Score(screen);
	container.addChild(score.scoreText);
	container.addChild(score.highScoreText);

	// //collision tracker
	let gameOver = false;
	const collisionTracker = new CollisionTracker();
	spawner.signal.add.subscribe((obstacle) => {
		collisionTracker.add([obstacle.hitBox, bird.hitBox], () => {
			if (obstacle instanceof Food) {
				spawner.destroy(obstacle);
				score.inc();
				spawner.spawnRate.plane = Math.max(
					SPAWN_RATE_PLANE_MIN,
					spawner.spawnRate.plane - SPAWN_RATE_DELTA,
				);
				spawner.spawnRate.food = Math.max(
					SPAWN_RATE_FOOD_MIN,
					spawner.spawnRate.food - SPAWN_RATE_DELTA,
				);
				spawner.speed.food = Math.min(SPEED_LEVEL[2], spawner.speed.food * SPEED_MULT);
				spawner.speed.plane = Math.min(SPEED_LEVEL[3], spawner.speed.plane * SPEED_MULT);
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
