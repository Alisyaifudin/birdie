import { Assets, Container } from "pixi.js";
import { Bird } from "./class";
import { birdImages } from "./sprite";
import { ReactiveScreen } from "../lib/resize";

let cache: null | Bird = null;

export async function getBird(container: Container, screen: ReactiveScreen) {
	if (cache === null) {
		const textures = await Promise.all(birdImages.map((path) => Assets.load(path)));
		cache = new Bird({ textures, screen, container });
	}
	return cache;
}
