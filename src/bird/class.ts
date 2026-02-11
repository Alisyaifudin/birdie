import { AnimatedSprite, Container, Texture } from "pixi.js";
import { MIN_SPEED, ROTATION_SPEED } from "./constants";
import { calcSpeed } from "./calc-speed";
import { headBack } from "./head-back";
import { createSprite } from "./create-sprite";
import { RectCollision } from "../collision/hitbox";
import { ReactiveScreen } from "../lib/resize";
import { ReactiveState } from "../lib/reactive-state";

export type Move = "up" | "down" | "idle";

export class Bird {
	sprite: AnimatedSprite;
	private speed = MIN_SPEED;
	private y: ReactiveState<number>;
	private move: Move = "idle";
	private rotation: ReactiveState<number>;
	private screen: ReactiveScreen;
	hitBox: RectCollision;
	stop() {
		this.sprite.stop();
	}
	constructor({
		textures,
		container,
		screen,
	}: {
		textures: Texture[];
		container: Container;
		screen: ReactiveScreen;
	}) {
		this.screen = screen
		this.sprite = createSprite(textures, screen);
		
		this.hitBox = new RectCollision({
			x: this.sprite.x,
			y: this.sprite.y,
			width: this.sprite.width * 0.5,
			height: this.sprite.height * 0.5,
		});

		this.y = new ReactiveState(this.sprite.y);
		this.y.subscribe((y) => {
			this.sprite.y = y;
			this.hitBox.y = y;
		});
		this.rotation = new ReactiveState(this.sprite.rotation);
		this.rotation.subscribe((rotation) => (this.sprite.rotation = rotation));
		container.addChild(this.sprite)
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
		if (y > this.screen.val.h - this.sprite.height / 2) {
			this.y.val = this.screen.val.h - this.sprite.height / 2;
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
