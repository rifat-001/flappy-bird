class UI {
	constructor(game) {
		this.game = game;
	}

	renderGameOverUI(context) {
		const width = 200;
		const height = 100;
		const x = this.game.width * 0.5 - width * 0.5;
		const y = this.game.height * 0.5 - height * 0.5;
		const text = 'Game Over';
		const textLength = text.length;
		const fontSize = 30;
		context.save();
		context.globalAlpha = 0.5;
		context.fillRect(x, y, width, height);
		context.restore();
		context.font = `${fontSize}px Arial`;
		// context.fillText('Game Over', 0, 30);
		context.fillText(text, x + width * 0.14, y + height * 0.55);
	}
}

export default UI;
