import { Sprite, Texture } from "pixi.js";
import { SPAWN_X_EXTEND, SPAWN_X_DELTA, SPAWN_Y_PADDING } from "./constants";
import { ReactiveScreen } from "../lib/resize";

export function createSprite(texture: Texture, screen: ReactiveScreen) {
	const sprite = new Sprite(texture);
	sprite.x = SPAWN_X_EXTEND + screen.val.w + Math.random() * SPAWN_X_DELTA;
	sprite.y = Math.random() * (screen.val.h - 2 * SPAWN_Y_PADDING) + SPAWN_Y_PADDING;
	sprite.anchor.set(0.5);
	return sprite;
}
