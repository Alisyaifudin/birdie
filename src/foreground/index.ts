import { Assets, Container, Sprite, Texture } from "pixi.js";
import { cloudImages } from "./clouds";
import { SPEED_LEVEL } from "../lib/constants";
import { ReactiveState } from "../lib/reactive-state";

const EXTEND = 150;

export class Foreground {
	sprites: Sprite[] = [];
	private _container!: Container;
	get container() {
		return this._container;
	}
	set container(c: Container) {
		this._container = c;
	}
	// private textures: Texture[];
	screen: ReactiveState<{ w: number; h: number }>;
	constructor({
		textures,
		screen,
		container,
	}: {
		container: Container;
		textures: Texture[];
		screen: ReactiveState<{ w: number; h: number }>;
	}) {
		this.screen = screen;
		const generateSprite = (n: number) => {
			this.sprites.forEach((s) => container.removeChild(s));
			this.sprites = [];
			for (let i = 0; i < n; i++) {
				const texture = textures[i % textures.length];
				const sprite = new Sprite(texture);
				sprite.cullable = true;
				sprite.anchor = 0.5;
				this.sprites.push(sprite);
			}
			this.sprites.forEach((s) => container.addChild(s));
		};
		textures.forEach((texture) => {
			const sprite = new Sprite(texture);
			sprite.cullable = true;
			sprite.anchor = 0.5;
			this.sprites.push(sprite);
		});
		this.screen.subscribe(({ w, h }: { w: number; h: number }) => {
			const n = Math.ceil((screen.val.w + EXTEND * 2) / EXTEND);
			generateSprite(n);
			const delta = (w + EXTEND * 2) / (n - 1);
			this.sprites.forEach((sprite, i) => {
				sprite.x = delta * i - EXTEND;
				sprite.y = h;
			});
		});
	}
	onUpdate(dt: number) {
		for (const sprite of this.sprites) {
			sprite.x -= SPEED_LEVEL[1] * dt;
			if (sprite.x < -EXTEND) {
				sprite.x = this.screen.val.w + EXTEND;
			}
		}
	}
}
let cache: null | Foreground = null;

export async function getForeground(
	container: Container,
	screen: ReactiveState<{ w: number; h: number }>,
) {
	if (cache === null) {
		const textures = await Promise.all(cloudImages.map((path) => Assets.load(path)));
		cache = new Foreground({ container, screen, textures });
	}
	return cache;
}
