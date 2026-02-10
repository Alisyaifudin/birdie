import { Container } from "pixi.js";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./constants";

export function resizeListener(container: Container) {
    // Set pivot to center so scaling happens from middle
    container.pivot.set(SCREEN_WIDTH / 2, SCREEN_HEIGHT/2);
    
    const update = () => {
        const scale = calcRatio();
        container.scale.set(scale);
        // Now just center the pivot point
        container.x = window.innerWidth / 2;
        container.y = window.innerHeight / 2;
    };
    
    update();
    window.addEventListener("resize", update);
}

function calcRatio() {
	// resize to width
	const ratio = window.innerWidth / SCREEN_WIDTH;
	const height = SCREEN_HEIGHT * ratio;
	if (height < window.innerHeight) {
		return ratio;
	}
	// resize to height
	return window.innerHeight / SCREEN_HEIGHT;
}