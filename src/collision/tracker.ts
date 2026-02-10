import { RectCollision } from "./hitbox";

type Callback = () => void;

export class CollisionTracker {
	private pairs: { pair: [RectCollision, RectCollision]; cb: Callback }[] = [];
	add(pair: [RectCollision, RectCollision], cb: Callback) {
		this.pairs.push({ pair, cb });
	}
	remove(removedPair: [RectCollision, RectCollision]) {
		for (let i = 0; i < this.pairs.length; i++) {
			const { pair } = this.pairs[i];
			const first = pair[0].id === removedPair[0].id && pair[1].id === removedPair[1].id;
			const second = pair[0].id === removedPair[1].id && pair[1].id === removedPair[0].id;

			if (first || second) {
				this.pairs.splice(i, 1);
				return;
			}
		}
	}
	onUpdate() {
		for (const { pair, cb } of this.pairs) {
			if (pair[0].hitbox.intersects(pair[1].hitbox)) {
				cb();
			}
		}
	}
}
