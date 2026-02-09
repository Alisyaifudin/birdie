import { Sprite } from "pixi.js";

export class Position {
	constructor(
		private _x: number,
		private _y: number,
		public sprite?: Sprite,
	) {
		if (sprite) {
			sprite.x = _x;
			sprite.y = _y;
		}
	}
	get x() {
		return this._x;
	}
	get y() {
		return this._y;
	}
	set x(v: number) {
		if (this.sprite) {
			this.sprite.x = v;
		}
		this._x = v;
	}
	set y(v: number) {
		if (this.sprite) {
			this.sprite.y = v;
		}
		this._y = v;
	}
}
