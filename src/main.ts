import { Application, Container } from "pixi.js";
import "./global.css";
import { getBird } from "./bird";
import { birdAdapter, Keyboard } from "./input/keyboard";
import { FoodSpawner } from "./food-spawner";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./lib/constants";

async function main() {
	// Create a new application
	const app = new Application();

	// Initialize the application
	await app.init({ background: "#1099bb", resizeTo: window });

	// Append the application canvas to the document body
	document.getElementById("app")!.appendChild(app.canvas);

	const container = new Container();
	container.width = SCREEN_WIDTH;
	container.height = SCREEN_HEIGHT;
	resizeListener(container);
	app.stage.addChild(container);

	// bird
	const bird = await getBird();
	container.addChild(bird.sprite);
	const foodSpawner = new FoodSpawner(container);

	// foreground

	// input
	const keyboard = new Keyboard();
	keyboard.listeners.push((key) => {
		const move = birdAdapter(key);
		bird.onMove(move);
	});

	app.ticker.add((ticker) => {
		bird.onUpdate(ticker.deltaTime);
		foodSpawner.onUpdate(ticker.deltaTime, bird.hitBox);
	});
}

function resizeListener(container: Container) {
    // Set pivot to center so scaling happens from middle
    container.pivot.set(SCREEN_WIDTH / 2, 0);
    
    const update = () => {
        const scale = calcRatio();
        container.scale.set(scale);
        // Now just center the pivot point
        container.x = window.innerWidth / 2;
    };
    
    update();
    window.addEventListener("resize", update);
}

function calcRatio() {
	// resize to width
	const ratio = window.innerWidth / SCREEN_WIDTH;
	const height = SCREEN_HEIGHT * ratio;
	if (height < window.innerHeight) {
		return ratio;
	}
	// resize to height
	return window.innerHeight / SCREEN_HEIGHT;
}

main();
