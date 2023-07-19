import Page from '../Page.js';
import Player from '../components/Player.js';
import Piller from '../components/Piller.js';
import { rectCollision } from '../utility.js';
import GameOverUI from '../ui/playGroundUI/GameOverUI.js';
import ScoreUI from '../ui/playGroundUI/ScoreUI.js';

class PlayGround extends Page {
	constructor(...args) {
		super(...args);
		this.player = new Player(this.game);
		this.scoreUI = new ScoreUI(this.game, this, 0, 0, 200, 50);
		this.gameOverUI = new GameOverUI(this.game, this);

		// piller container
		this.pillersTop = [];
		this.pillersBottom = [];

		this.pilllerDefaultX = this.game.width + 20;
		this.horizontalPillerGap = 250;
		this.verticalPillerGap = 240;

		// game condition
		this.gameOver = false;

		// score utility
		this.score = 0;
		this.scoreTimer = 0;
		this.scoreInterval = 1000;
		this.currentScorePointPerSecond = 5;
	}

	update(deltaTime) {
		// if game is over then nothing to update
		if (this.gameOver && !this.checkGameRestartCondition()) {
			return;
		}

		if (this.scoreTimer >= this.scoreInterval) {
			this.score += this.currentScorePointPerSecond;
			this.scoreTimer = 0;
		} else this.scoreTimer += deltaTime;

		// update player
		this.player.update(deltaTime);

		// update all piller
		this.pillersTop.forEach((piller) => piller.update());
		this.pillersTop = this.pillersTop.filter(
			(piller) => !piller.markForDeletion
		);
		this.pillersBottom.forEach((piller) => piller.update());
		this.pillersBottom = this.pillersBottom.filter(
			(piller) => !piller.markForDeletion
		);

		// adding new piller
		const pillerBottomLength = this.pillersBottom.length;
		if (pillerBottomLength * this.horizontalPillerGap < this.game.width) {
			this.addNewPiller();
		}

		// checking Game over condition
		this.checkGameOverCondition();

		// updating score UI if necessary
		this.scoreUI.update();
	}

	render(context) {
		this.player.render(context);
		// rendering all pillers
		this.pillersTop.forEach((piller) => piller.render(context));
		this.pillersBottom.forEach((piller) => piller.render(context));

		if (this.gameOver) {
			this.gameOverUI.render(context);
		}
		this.scoreUI.render(context);
	}

	addNewPiller() {
		// adding new piller to the right of last piller of the pillers array by pillerGap or add it on the default position
		const pillerBottomLength = this.pillersBottom.length;
		const pillerBottomX =
			this.pillersBottom.length > 0
				? this.pillersBottom[pillerBottomLength - 1].x +
				  this.horizontalPillerGap
				: this.pilllerDefaultX;

		// between 50 to 200
		const pillerBottomHeight = Math.random() * 150 + 50;

		// the Y cords of bottom piller will be [pillerBottomHeight]px top from the canvas bottom
		const pillerBottomY = this.game.height - pillerBottomHeight;

		this.pillersBottom.push(
			new Piller(
				this.game,
				this,
				pillerBottomX,
				pillerBottomY,
				pillerBottomHeight
			)
		);

		// constructing Top piller from the bottom piller
		// the absolute difference between piller top X and piller bottom X will be 0 to 10;
		const pillerTopX = pillerBottomX + Math.random() * 40 - 20;

		const pillerTopY = 0;

		// ensuring that the gap between top and bottom piller is 80% to 100% of [verticalPillerGap]
		const pillerTopHeight =
			this.game.height -
			pillerBottomHeight -
			this.verticalPillerGap * (Math.random() * 0.2 + 0.8);

		this.pillersTop.push(
			new Piller(this.game, this, pillerTopX, pillerTopY, pillerTopHeight)
		);
	}

	checkGameOverCondition() {
		// checking collision for bottom piller
		this.pillersBottom.forEach((piller) => {
			if (rectCollision(piller, this.player)) this.gameOver = true;
		});

		// checking collision for top piller
		this.pillersTop.forEach((piller) => {
			if (rectCollision(piller, this.player)) this.gameOver = true;
		});

		// checking if player touches the ground
		if (this.player.isOnGround || this.player.isOnTop) this.gameOver = true;
	}

	checkGameRestartCondition() {
		if (
			this.gameOver &&
			(this.game.keys.includes('space') || this.game.mouse.pressed)
		) {
			// game should be restart

			// removing all the piller
			this.pillersBottom = [];
			this.pillersTop = [];

			// updating player position
			this.player = new Player(this.game);

			this.gameOver = false;

			this.score = 0;
			this.scoreTimer = 0;
		} else return false; // game should not restart
	}
}

export default PlayGround;
