import { Container, Rectangle } from "pixi.js";
import { createFood } from "./plane";
import { Food } from "./plane/class";
import { DESTROY_THRESHOLD, SPAWN_RATE } from "./constants";
import { Signal } from "../lib/signal";

export class FoodSpawner {
	foods: Food[] = [];
	private duration = 0;
	constructor(private container: Container) {}
	signal = new Signal();
	onUpdate(dt: number, birdHitbox: Rectangle) {
		this.duration += dt;
		if (this.duration > SPAWN_RATE) {
			this.duration -= SPAWN_RATE;
			this.addFood();
		}
		this.move(dt, birdHitbox);
	}
	async addFood() {
		const food = await createFood();
		this.foods.push(food);
		this.container.addChild(food.sprite);
	}
	move(dt: number, birdHitbox: Rectangle) {
		const removedFoods: Food[] = [];
		for (const food of this.foods) {
			food.onUpdate(dt);
			if (food.sprite.x < DESTROY_THRESHOLD) {
				removedFoods.push(food);
			}
			if (food.hitBox.intersects(birdHitbox)) {
				removedFoods.push(food);
				this.signal.emit();
			}
		}
		this.destroyFoods(removedFoods);
	}
	destroyFoods(foods: Food[]) {
		for (const removedFood of foods) {
			this.container.removeChild(removedFood.sprite);
			this.foods = this.foods.filter((f) => f !== removedFood);
		}
	}
}
