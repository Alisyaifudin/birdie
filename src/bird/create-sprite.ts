import { AnimatedSprite, Texture } from "pixi.js";
import { ReactiveScreen } from "../lib/resize";
import { MAX_BIRD_X, MIN_BIRD_X } from "./constants";
import { clamp } from "../lib/clamp";

export function createSprite(textures: Texture[], screen: ReactiveScreen) {
	const sprite = new AnimatedSprite(textures);
	sprite.scale = 2;
	sprite.x = clamp(MIN_BIRD_X, MAX_BIRD_X, screen.val.w / 10);
	sprite.y = screen.val.h / 2;
	screen.subscribe(({ w, h }, old) => {
		sprite.x = clamp(MIN_BIRD_X, MAX_BIRD_X, w / 10);
		sprite.y = (sprite.y / old.h) * h;
	});
	sprite.anchor.set(0.5);
	sprite.animationSpeed = 0.1;
	sprite.zIndex = 10
	sprite.play();
	return sprite;
}
