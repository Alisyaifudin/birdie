import { Assets, Texture } from "pixi.js";
import { Obstacle } from "./obstacle";
import { SPEED_LEVEL } from "../lib/constants";

export class Food extends Obstacle {
	constructor(texture: Texture) {
		super(texture, SPEED_LEVEL[1]);
	}
}

let texture: null | Texture = null;

export async function createFood() {
	if (texture === null) {
		texture = await Assets.load("assets/food.svg");
	}
	const food = new Food(texture!);
	return food;
}
