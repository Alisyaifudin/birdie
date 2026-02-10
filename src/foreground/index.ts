import { Assets, Sprite, Texture } from "pixi.js";
import { cloudImages } from "./clouds";
import { SCREEN_HEIGHT, SCREEN_WIDTH, SPEED_LEVEL } from "../lib/constants";

export class Foreground {
	sprites: Sprite[] = [];
	n: number;
	delta: number;
	constructor(textures: Texture[]) {
		this.n = textures.length;
		this.delta = (SCREEN_WIDTH * 2) / (this.n - 1);
		textures.forEach((texture, i) => {
			const sprite = new Sprite(texture);
			sprite.x = this.delta * i - SCREEN_WIDTH / 2;
			sprite.y = SCREEN_HEIGHT;
			sprite.anchor = 0.5;
			this.sprites.push(sprite);
		});
	}
	onUpdate(dt: number) {
		for (const sprite of this.sprites) {
			sprite.x -= SPEED_LEVEL[1] * dt;
			if (sprite.x < -(SCREEN_WIDTH / 2 + sprite.width / 2)) {
				sprite.x = SCREEN_HEIGHT * 1.5 + sprite.width / 2;
			}
		}
	}
}
let cache: null | Foreground = null;

export async function getForeground() {
	if (cache === null) {
		const textures = await Promise.all(cloudImages.map((path) => Assets.load(path)));
		cache = new Foreground(textures);
	}
	return cache;
}
