import { Container, Rectangle } from "pixi.js";
import { ReactiveState } from "./reactive-state";

export type ReactiveScreen = ReactiveState<{ w: number, h: number }>

export function resizeListener(container: Container) {
	const screen: ReactiveScreen = new ReactiveState({ w: window.innerWidth, h: window.innerHeight });
	// Set pivot to center so scaling happens from middle
	// container.pivot.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);

	const update = () => {
		// const scale = calcRatio();
		const root = container.parent;
		if (root !== null) {
			root.hitArea = new Rectangle(0, 0, window.innerWidth, window.innerHeight);
		}
		screen.val = { w: window.innerWidth, h: window.innerHeight };
		// container.scale.set(scale);
		// Now just center the pivot point
		// container.x = window.innerWidth / 2;
		// container.y = window.innerHeight / 2;
	};

	update();
	window.addEventListener("resize", update);
	return screen;
}

// function calcRatio() {
// 	// resize to width
// 	const ratio = window.innerWidth / SCREEN_WIDTH;
// 	const height = SCREEN_HEIGHT * ratio;
// 	if (height < window.innerHeight) {
// 		return ratio;
// 	}
// 	// resize to height
// 	return window.innerHeight / SCREEN_HEIGHT;
// }
