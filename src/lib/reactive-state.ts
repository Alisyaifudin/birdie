export class ReactiveState<T> {
	constructor(
		private _value: T,
		public cb?: (value: T) => void,
	) {}
	get val() {
		return this._value;
	}
	set val(v: T) {
		this._value = v;
		this.cb?.(v);
	}
}
