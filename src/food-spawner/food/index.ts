import { Assets, Texture } from "pixi.js";
import { Food } from "./class";

let texture: null | Texture = null;

export async function createFood() {
	if (texture === null) {
		texture = await Assets.load("assets/food.svg");
	}
	const food = new Food(texture!);
	return food;
}
