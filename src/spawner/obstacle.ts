import { Sprite, Texture } from "pixi.js";
import { createSprite } from "./create-sprite";
import { RectCollision } from "../collision/hitbox";
import { ReactiveScreen } from "../lib/resize";
import { ReactiveState } from "../lib/reactive-state";

export class Obstacle {
	sprite: Sprite;
	private x: ReactiveState<number>;
	hitBox: RectCollision;
	constructor(
		texture: Texture,
		screen: ReactiveScreen,
		private readonly speed: number,
	) {
		this.sprite = createSprite(texture, screen);
		this.sprite.scale = 2;
		const width = this.sprite.width * 0.5;
		const height = this.sprite.height * 0.5;
		this.hitBox = new RectCollision({
			x: this.sprite.x,
			y: this.sprite.y,
			width,
			height,
		});

		this.x = new ReactiveState(this.sprite.x);
		screen.subscribe(({w, h}, old) => {
			this.x.val = this.x.val/old.w * w;
			this.sprite.y = this.sprite.y/old.h * h;
			this.hitBox.y = this.sprite.y/old.h * h;
		})
		this.x.subscribe((x) => {
			this.sprite.x = x;
			this.hitBox.x = x;
		});
	}
	onUpdate(dt: number) {
		this.x.val -= this.speed * dt;
	}
}
