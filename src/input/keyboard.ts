import { Move } from "../bird/class";

type Key = "ArrowUp" | "ArrowDown";
type Listener = (key?: Key) => void;

export class Keyboard {
	keydownListener: (e: KeyboardEvent) => void = () => {};
	keyupListener: (e: KeyboardEvent) => void = () => {};
	listeners: Listener[] = [];
	notify(key?: Key) {
		this.listeners.forEach((l) => l(key));
	}
	constructor() {
		this.keydownListener = (e) => {
			switch (e.key) {
				case "ArrowUp":
					this.notify(e.key);
					break;
				case "ArrowDown":
					this.notify(e.key);
					break;
			}
		};
		this.keyupListener = () => {
			this.notify();
		};
		window.addEventListener("keydown", this.keydownListener);
		window.addEventListener("keyup", this.keyupListener);
	}
	cleanup() {
		this.listeners = [];
		window.removeEventListener("keydown", this.keydownListener);
		window.removeEventListener("keyup", this.keyupListener);
	}
}

export function birdAdapter(key?: Key): Move {
	switch (key) {
		case "ArrowDown":
			return "down";
		case "ArrowUp":
			return "up";
		default:
			return "idle";
	}
}
