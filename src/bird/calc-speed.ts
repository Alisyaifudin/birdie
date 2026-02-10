import { ACC, MAX_SPEED, MIN_SPEED } from "./constants";

export function calcSpeed({
	dt,
	isAcc,
	speed,
}: {
	dt: number;
	speed: number;
	isAcc: boolean;
}): number {
	switch (isAcc) {
		case true:
			return Math.min(MAX_SPEED, speed + ACC * dt);
		case false:
			return Math.max(MIN_SPEED, speed - ACC * dt);
	}
}
