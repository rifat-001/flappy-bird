class ScoreUI {
	constructor(game, page) {
		this.game = game;
		this.page = page;
		this.x = 0;
		this.y = 0;
		this.width = 200;
		this.height = 50;
	}

	update(deltaTime) {}

	render(context) {
		context.fillStyle = '#ddd33f';
		context.save();
		context.globalAlpha = 0.5;
		context.fillRect(this.x, this.y, this.width, this.height);
		context.restore();
		context.fillStyle = '#444';
		context.font = '20px Arial';
		context.fillText(`Score : ${this.page.score}`, this.x + 5, this.y + 30);
	}
}

export default ScoreUI;
