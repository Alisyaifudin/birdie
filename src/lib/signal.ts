type Listener<T> = (arg: T) => void;
export class Signal<T = void> {
	listeners: Listener<T>[] = [];
	constructor() {}
	subscribe(cb: Listener<T>) {
		this.listeners.push(cb);
	}
	emit(arg: T) {
		for (const l of this.listeners) {
			l(arg);
		}
	}
}
