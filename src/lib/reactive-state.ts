type Listener<T> = (newVal: T, oldVal: T) => void;

export class ReactiveState<T> {
	listeners: Listener<T>[] = [];
	private _value: T;
	constructor(init: T) {
		this._value = init;
	}
	get val() {
		return this._value;
	}
	subscribe(listener: Listener<T>, initRun = true) {
		if (initRun) listener(this.val, this.val);
		this.listeners.push(listener);
	}
	set val(v: T) {
		this.listeners.forEach((l) => l(v, this._value));
		this._value = v;
	}
}
