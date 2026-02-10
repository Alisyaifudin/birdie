import { AnimatedSprite, Texture } from "pixi.js";
import { SCREEN_HEIGHT } from "../lib/constants";
import { BIRD_X } from "./constants";

export function createSprite(textures: Texture[]) {
	const sprite = new AnimatedSprite(textures);
	sprite.x = BIRD_X;
	sprite.y = SCREEN_HEIGHT / 2;
	sprite.anchor.set(0.5);
	sprite.animationSpeed = 0.1;
	sprite.play();
	return sprite;
}
