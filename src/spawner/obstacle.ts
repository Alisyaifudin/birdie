import { Sprite, Texture } from "pixi.js";
import { createSprite } from "./create-sprite";
import { ReactiveState } from "../lib/reactive-state";
import { RectCollision } from "../collision/hitbox";

export class Obstacle {
	sprite: Sprite;
	private x: ReactiveState<number>;
	hitBox: RectCollision;
	constructor(
		texture: Texture,
		private readonly speed: number,
	) {
		this.sprite = createSprite(texture);
		const width = this.sprite.width * 0.5;
		const height = this.sprite.height * 0.5;
		this.hitBox = new RectCollision({
			x: this.sprite.x,
			y: this.sprite.y,
			width,
			height,
		});

		this.x = new ReactiveState(this.sprite.x, (x) => {
			this.sprite.x = x;
			this.hitBox.x = x;
		});
	}
	onUpdate(dt: number) {
		this.x.val -= this.speed * dt;
	}
}

