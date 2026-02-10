import { ROTATION_SPEED } from "./constants";

export function headBack(dt: number, rotation: number) {
	if (rotation > 0) {
		return Math.max(0, rotation - ROTATION_SPEED * dt);
	} else if (rotation < 0) {
		return Math.min(0, rotation + ROTATION_SPEED * dt);
	}
	return rotation;
}
