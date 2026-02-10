import { Rectangle, Sprite, Texture } from "pixi.js";
import { ReactiveState } from "../lib/reactive-state";
import { createSprite } from "./create-sprite";
import { createHitbox } from "./create-hitbox";
import { FOOD_SPEED } from "./constants";

export class Food {
	sprite: Sprite;
	private x: ReactiveState<number>;
	hitBox: Rectangle;
	constructor(texture: Texture) {
		this.sprite = createSprite(texture);
		const width = this.sprite.width * 0.5;
		const height = this.sprite.height * 0.5;
		this.hitBox = createHitbox({
			x: this.sprite.x,
			y: this.sprite.y,
			width,
			height,
		});

		this.x = new ReactiveState(this.sprite.x, (x) => {
			this.sprite.x = x;
			this.hitBox.x = x - height / 2;
		});
	}
	onUpdate(dt: number) {
		this.x.val -= FOOD_SPEED * dt;
	}
}
