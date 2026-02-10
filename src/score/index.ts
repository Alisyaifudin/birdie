import { Text } from "pixi.js";
import { highscoreStyle, scoreStyle } from "./style";
import { SCREEN_WIDTH } from "../lib/constants";
import { localHighscore } from "./highscore";

export class Score {
	scoreText: Text;
	highScoreText: Text;
	score = 0;
	highscore = 0;
	constructor() {
		this.scoreText = new Text({ text: "Score: 0", style: scoreStyle });
		this.highScoreText = new Text({
			text: "Highscore: " + localHighscore.get(),
			style: highscoreStyle,
			anchor: { x: 1, y: 0 },
			x: SCREEN_WIDTH,
		});
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
