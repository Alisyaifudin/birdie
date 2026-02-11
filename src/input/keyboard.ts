import { Move } from "../bird/class";
import { Signal } from "../lib/signal";

type Key = "ArrowUp" | "ArrowDown";

export class Keyboard {
	private keydownListener: (e: KeyboardEvent) => void;
	private keyupListener: (e: KeyboardEvent) => void;
	signal = new Signal<Key | undefined>();
	constructor() {
		this.keydownListener = (e) => {
			switch (e.key) {
				case "ArrowUp":
					this.signal.emit(e.key);
					break;
				case "ArrowDown":
					this.signal.emit(e.key);
					break;
			}
		};
		this.keyupListener = () => {
			this.signal.emit(undefined);
		};
		window.addEventListener("keydown", this.keydownListener);
		window.addEventListener("keyup", this.keyupListener);
	}
	cleanup() {
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
