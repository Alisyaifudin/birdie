export function clamp(min: number, max: number, v: number) {
	if (v < min) return min;
	if (v > max) return max;
	return v;
}
