import { Text } from "pixi.js";
import { highscoreStyle, scoreStyle } from "./style";
import { localHighscore } from "./highscore";
import { ReactiveScreen } from "../lib/resize";

const PADDING = 5

export class Score {
	scoreText: Text;
	highScoreText: Text;
	score = 0;
	highscore = 0;
	constructor(readonly screen: ReactiveScreen) {
		this.scoreText = new Text({ text: "Score: 0", style: scoreStyle, x: PADDING, y: PADDING });
		this.highScoreText = new Text({
			text: "Highscore: " + localHighscore.get(),
			style: highscoreStyle,
			anchor: { x: 1, y: 0 },
			y: PADDING
		});
		screen.subscribe(({w}) => {
			this.highScoreText.x = w - PADDING;
		})
	}
	inc() {
		this.score++;
		if (this.score > this.highscore) {
			this.highscore++;
			localHighscore.set(this.highscore);
			this.updateHighscore();
		}
		this.updateScore();
	}
	updateScore() {
		this.scoreText.text = "Score: " + this.score;
	}
	updateHighscore() {
		this.highScoreText.text = "Highscore: " + this.highscore;
	}
}
