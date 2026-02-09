import { AnimatedSprite, Assets, Texture } from "pixi.js";
import { birdImages } from "./sprite";
import { BIRD_SPEED, BIRD_X, HEADING_SPEED, SCREEN_HEIGHT } from "../lib/constants";
import { Position } from "../lib/position";

export type Move = "Up" | "Down";

class Bird {
	sprite: AnimatedSprite;
	speed = 0;
	position: Position;
	_rotation = 0;
	size: number;
	get rotation() {
		return this._rotation;
	}
	set rotation(v: number) {
		if (this.sprite !== undefined) {
			this.sprite.rotation = v;
		}
		this._rotation = v;
	}
	constructor(textures: Texture[]) {
		this.sprite = new AnimatedSprite(textures);
		this.size = this.sprite.height;
		this.position = new Position(BIRD_X, SCREEN_HEIGHT / 2, this.sprite);
		this.sprite.anchor.set(0.5);
		this.sprite.animationSpeed = 0.1;
		this.sprite.play();
	}
	onMove(move?: Move) {
		switch (move) {
			case "Down":
				this.speed = BIRD_SPEED;
				break;
			case "Up":
				this.speed = -1 * BIRD_SPEED;
				break;
			default:
				this.speed = 0;
		}
	}
	update(dt: number) {
		const y = this.position.y + this.speed * dt;
		this.updateY(y);
		this.updateRotation();
	}
	updateY(y: number) {
		if (y > SCREEN_HEIGHT - this.size / 2) {
			this.position.y = SCREEN_HEIGHT - this.size / 2;
			return;
		} else if (y < this.size / 2) {
			this.position.y = this.size / 2;
			return;
		}
		this.position.y = y;
	}
	updateRotation() {
		if (this.speed === 0) {
			if (this.rotation > 0) {
				this.rotation = Math.max(this.rotation - HEADING_SPEED, 0);
			} else if (this.rotation < 0) {
				this.rotation = Math.min(this.rotation + HEADING_SPEED, 0);
			}
		} else if (this.speed > 0) {
			if (this.rotation < 0) {
				this.rotation = 0;
			} else {
				this.rotation = Math.min(this.rotation + HEADING_SPEED, Math.PI / 2);
			}
		} else {
			if (this.rotation > 0) {
				this.rotation = 0;
			} else {
				this.rotation = Math.max(this.rotation - HEADING_SPEED, -Math.PI / 2);
			}
		}
	}
}

let cache: null | Bird = null;

export async function getBird() {
	if (cache === null) {
		const textures = await Promise.all(birdImages.map((path) => Assets.load(path)));
		cache = new Bird(textures);
	}
	return cache;
}
