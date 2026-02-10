import { Container } from "pixi.js";
import { resizeListener } from "./lib/resize";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./lib/constants";

export function createContainer() {
	const container = new Container();
	container.width = SCREEN_WIDTH;
	container.height = SCREEN_HEIGHT;
	resizeListener(container);
	return container;
}
