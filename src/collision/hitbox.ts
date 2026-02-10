import { Rectangle } from "pixi.js";

export class RectCollision {
	hitbox: Rectangle;
  id: string;
	constructor({ x, y, width, height }: { x: number; y: number; width: number; height: number }) {
		this.hitbox = new Rectangle(x - width / 2, y - height / 2, width, height);
    this.id = crypto.randomUUID()
	}
	set x(v: number) {
		this.hitbox.x = v - this.hitbox.width / 2;
	}
	set y(v: number) {
		this.hitbox.y = v - this.hitbox.height / 2;
	}
}
