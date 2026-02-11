const KEY = "__BIRDIE_SCORE";
export const localHighscore = {
	get() {
		const raw = localStorage.getItem(KEY);
		if (raw === null) {
			return 0;
		}
		const num = Number(raw);
		if (isNaN(num) || !isFinite(num) || !Number.isInteger(num)) {
			return 0;
		}
		return num;
	},
	set(num: number) {
		if (isNaN(num) || !isFinite(num) || !Number.isInteger(num)) {
			return;
		}
		localStorage.setItem(KEY, String(num));
	},
};
