import { Container, FederatedPointerEvent, PointData } from "pixi.js";
import { Move } from "../bird/class";
import { TOLERANCE } from "../lib/constants";
import { Signal } from "../lib/signal";

type Direction = "up" | "down";

export class Pointer {
	private pointerDownListener: (e: FederatedPointerEvent) => void;
	private pointerUpListener: () => void;
	private pointerMoveListener: (e: FederatedPointerEvent) => void;
	private pointerLeaveListener: () => void;
	pointerStart: PointData | null = null;
	pointerEnd: PointData | null = null;
	signal = new Signal<Direction | undefined>();
	constructor(private root: Container) {
		this.pointerDownListener = (e) => {
			const local = e.getLocalPosition(root);
			this.pointerStart = { x: local.x, y: local.y };
		};
		this.pointerUpListener = () => {
			this.pointerStart = null;
			this.pointerEnd = null;
			this.signal.emit(undefined);
		};
		this.pointerLeaveListener = () => {
			this.pointerStart = null;
			this.pointerEnd = null;
			this.signal.emit(undefined);
		};
		this.pointerMoveListener = (e) => {
			if (this.pointerStart === null) return;
			const local = e.getLocalPosition(this.root);
			this.pointerEnd = { x: local.x, y: local.y };
			const delta = this.pointerEnd.y - this.pointerStart.y;
			if (Math.abs(delta) < TOLERANCE) {
				this.signal.emit(undefined);
			} else if (delta > 0) {
				this.signal.emit("down");
			} else {
				this.signal.emit("up");
			}
		};
		root.on("pointerdown", this.pointerDownListener);
		root.on("pointerup", this.pointerUpListener);
		root.on("pointermove", this.pointerMoveListener);
		root.on("pointerleave", this.pointerLeaveListener);
	}
	// onUpdate(bird: Bird) {
	// 	if (!this.pointerIsDown || this.pointerEnd === null) {
	// 		bird.onMove("idle");
	// 	} else {
	// 		const delta = this.pointerEnd.y - bird.sprite.y;
	// 		if (Math.abs(delta) < TOLERANCE) {
	// 			bird.onMove("idle");
	// 		} else if (delta > 0) {
	// 			bird.onMove("down");
	// 		} else {
	// 			bird.onMove("up");
	// 		}
	// 	}
	// }
	cleanup() {
		this.root.off("pointerdown", this.pointerDownListener);
		this.root.off("pointerup", this.pointerDownListener);
		this.root.off("pointermove", this.pointerUpListener);
		this.root.off("pointerleave", this.pointerLeaveListener);
	}
}

export function birdPointerAdapter(direction?: Direction): Move {
	switch (direction) {
		case "down":
			return "down";
		case "up":
			return "up";
		default:
			return "idle";
	}
}
