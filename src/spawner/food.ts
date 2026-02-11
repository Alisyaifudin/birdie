import { Assets, Texture } from "pixi.js";
import { Obstacle } from "./obstacle";
import { ReactiveScreen } from "../lib/resize";

export class Food extends Obstacle {
	constructor(texture: Texture, screen: ReactiveScreen, speed: number) {
		super(texture, screen, speed);
	}
}

let texture: null | Texture = null;

export async function createFood(screen: ReactiveScreen, speed: number) {
	if (texture === null) {
		texture = await Assets.load("/assets/food.svg");
	}
	const food = new Food(texture!, screen, speed);
	return food;
}
