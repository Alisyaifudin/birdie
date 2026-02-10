import { Rectangle } from "pixi.js";

export function createHitbox({
	x,
	y,
	width,
	height,
}: {
	x: number;
	y: number;
	width: number;
	height: number;
}) {
	const hitbox = new Rectangle(x - width / 2, y - height / 2, width, height);
	return hitbox;
}
