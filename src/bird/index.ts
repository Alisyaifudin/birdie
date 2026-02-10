import { Assets } from "pixi.js";
import { Bird } from "./class";
import { birdImages } from "./sprite";

let cache: null | Bird = null;

export async function getBird() {
	if (cache === null) {
		const textures = await Promise.all(birdImages.map((path) => Assets.load(path)));
		cache = new Bird(textures);
	}
	return cache;
}
