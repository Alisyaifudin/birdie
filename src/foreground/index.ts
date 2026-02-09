import { Assets, Sprite, Texture } from "pixi.js";
import { cloudImages } from "./clouds";
import { SCREEN_WIDTH } from "../lib/constants";

export class Foreground {
	sprites: Sprite[] = [];
	constructor(textures: Texture[]) {
		const n = textures.length;
		const delta = SCREEN_WIDTH / n;
		textures.forEach((texture, i) => {
			const sprite = new Sprite(texture);
			sprite.x = delta * i
      this.sprites.push(sprite);
		});
	}
}
let cache: null | Foreground = null;

export async function getBird() {
	if (cache === null) {
		const textures = await Promise.all(cloudImages.map((path) => Assets.load(path)));
		cache = new Foreground(textures);
	}
	return cache;
}
