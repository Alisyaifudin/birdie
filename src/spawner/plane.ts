import { Assets, Texture } from "pixi.js";
import { Obstacle } from "./obstacle";
import { ReactiveScreen } from "../lib/resize";

export class Plane extends Obstacle {
	constructor(texture: Texture, screen: ReactiveScreen, speed: number) {
		super(texture, screen, speed);
	}
}

let texture: null | Texture = null;

export async function createPlane(screen: ReactiveScreen, speed: number) {
	if (texture === null) {
		texture = await Assets.load("/assets/plane.svg");
	}
	const food = new Plane(texture!, screen, speed);
	return food;
}
