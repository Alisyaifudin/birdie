import { Container } from "pixi.js";
import { DESTROY_THRESHOLD, SPAWN_RATE_FOOD, SPAWN_RATE_PLANE } from "./constants";
import { Signal } from "../lib/signal";
import { createFood, Food } from "./food";
import { createPlane, Plane } from "./plane";
import { Obstacle } from "./obstacle";
import { SPEED_LEVEL } from "../lib/constants";
import { ReactiveScreen } from "../lib/resize";

export class Spawner {
	obstacles: Obstacle[] = [];
	private duration = {
		food: 0,
		plane: 0,
	};
	spawnRate = {
		food: SPAWN_RATE_FOOD,
		plane: SPAWN_RATE_PLANE,
	};
	speed = {
		food: SPEED_LEVEL[1] as number,
		plane: SPEED_LEVEL[2] as number,
	};
	constructor(private container: Container, private readonly screen: ReactiveScreen) {}
	signal = {
		add: new Signal<Obstacle>(),
		delete: new Signal<Obstacle>(),
	};
	onUpdate(dt: number) {
		this.duration.food += dt;
		this.duration.plane += dt;
		if (this.duration.food > this.spawnRate.food) {
			this.duration.food -= this.spawnRate.food;
			this.add("food");
		}
		if (this.duration.plane > this.spawnRate.plane) {
			this.duration.plane -= this.spawnRate.plane;
			this.add("plane");
		}
		this.move(dt);
	}
	private async add(kind: "food" | "plane") {
		const obstacle = await createObstacle(kind, this.screen, this.speed[kind]);
		this.obstacles.push(obstacle);
		this.container.addChild(obstacle.sprite);
		this.signal.add.emit(obstacle);
	}
	move(dt: number) {
		const removed: (Food | Plane)[] = [];
		for (const obstacle of this.obstacles) {
			obstacle.onUpdate(dt);
			if (obstacle.sprite.x < DESTROY_THRESHOLD) {
				removed.push(obstacle);
			}
		}
		this.destroyMany(removed);
	}
	destroyMany(obstacles: Obstacle[]) {
		for (const obstacle of obstacles) {
			this.destroy(obstacle);
		}
	}
	destroy(obstacle: Obstacle) {
		this.container.removeChild(obstacle.sprite);
		this.obstacles = this.obstacles.filter((f) => f !== obstacle);
		this.signal.delete.emit(obstacle);
	}
}

export function createObstacle(kind: "food" | "plane",screen: ReactiveScreen, speed: number) {
	switch (kind) {
		case "food":
			return createFood(screen, speed);
		case "plane":
			return createPlane(screen, speed);
	}
}
