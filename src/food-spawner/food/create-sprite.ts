import { Sprite, Texture } from "pixi.js";
import { SCREEN_HEIGHT } from "../../lib/constants";
import { SPAWN_X, SPAWN_X_DELTA, SPAWN_Y_PERCENT } from "./constants";

export function createSprite(texture: Texture) {
	const sprite = new Sprite(texture);
	sprite.x = SPAWN_X + Math.random() * SPAWN_X_DELTA;
	sprite.y =
		Math.random() * SCREEN_HEIGHT * SPAWN_Y_PERCENT + (SCREEN_HEIGHT * (1 - SPAWN_Y_PERCENT)) / 2;
	sprite.anchor.set(0.5);
	return sprite;
}
