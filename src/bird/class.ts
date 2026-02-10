import { AnimatedSprite, Texture } from "pixi.js";
import { MIN_SPEED, ROTATION_SPEED } from "./constants";
import { ReactiveState } from "../lib/reactive-state";
import { calcSpeed } from "./calc-speed";
import { headBack } from "./head-back";
import { createSprite } from "./create-sprite";
import { SCREEN_HEIGHT } from "../lib/constants";
import { RectCollision } from "../collision/hitbox";

export type Move = "up" | "down" | "idle";

export class Bird {
	sprite: AnimatedSprite;
	private speed = MIN_SPEED;
	private y: ReactiveState<number>;
	private move: Move = "idle";
	private rotation: ReactiveState<number>;
	hitBox: RectCollision;
	stop() {
		this.sprite.stop();
	}
	constructor(textures: Texture[]) {
		this.sprite = createSprite(textures);
		this.hitBox = new RectCollision({
			x: this.sprite.x,
			y: this.sprite.y,
			width: this.sprite.width * 0.5,
			height: this.sprite.height * 0.5,
		});

		this.y = new ReactiveState(this.sprite.y, (y) => {
			this.sprite.y = y;
			this.hitBox.y = y;
		});
		this.rotation = new ReactiveState(
			this.sprite.rotation,
			(rotation) => (this.sprite.rotation = rotation),
		);
	}
	onMove(move: Move) {
		this.move = move;
	}
	onUpdate(dt: number) {
		this.updateY(dt);
		this.updateRotation(dt);
	}

	private updateY(dt: number) {
		if (this.rotation.val === 0) return;
		this.speed = calcSpeed({ dt, isAcc: this.move !== "idle", speed: this.speed });
		const y = this.y.val + Math.sin(this.rotation.val) * this.speed * dt;
		if (y > SCREEN_HEIGHT - this.sprite.height / 2) {
			this.y.val = SCREEN_HEIGHT - this.sprite.height / 2;
			return;
		} else if (y < this.sprite.height / 2) {
			this.y.val = this.sprite.height / 2;
			return;
		}
		this.y.val = y;
	}
	private updateRotation(dt: number) {
		switch (this.move) {
			case "up":
				this.rotation.val = Math.max(-Math.PI / 4, this.rotation.val - ROTATION_SPEED * dt);
				break;
			case "down":
				this.rotation.val = Math.min(Math.PI / 4, this.rotation.val + ROTATION_SPEED * dt);
				break;
			case "idle":
				this.rotation.val = headBack(dt, this.rotation.val);
				break;
		}
	}
}
