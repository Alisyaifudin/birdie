import { Assets, Texture } from "pixi.js";
import { Obstacle } from "./obstacle";
import { SPEED_LEVEL } from "../lib/constants";

export class Plane extends Obstacle {
	constructor(texture: Texture) {
		super(texture, SPEED_LEVEL[2]);
	}
}

let texture: null | Texture = null;

export async function createPlane() {
	if (texture === null) {
		texture = await Assets.load("assets/plane.svg");
	}
	const food = new Plane(texture!);
	return food;
}
