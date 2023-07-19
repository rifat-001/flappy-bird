class GameOverUI {
	constructor(game, page) {
		this.game = game;
		this.page = page;
	}

	update() {}

	render(context) {
		const width = 200;
		const height = 120;
		const x = this.page.width * 0.5 - width * 0.5;
		const y = this.page.height * 0.5 - height * 0.5;

		const text = 'Game Over';
		const fontSize = 30;
		context.save();
		context.globalAlpha = 0.5;
		context.fillRect(x, y, width, height);
		context.restore();
		context.font = `${fontSize}px Arial`;
		// context.fillText('Game Over', 0, 30);
		const textX = x + width * 0.14;
		const textY = y + height * 0.35;
		context.fillText(text, textX, textY);
		context.fillText(
			`Score : ${this.page.score}`,
			textX,
			textY + fontSize + 10
		);
	}
}

export default GameOverUI;
