class Piller {
	constructor(game, page, x, y, height) {
		this.game = game;
		this.page = page;
		this.height = height;
		this.width = 48;
		this.y = y;
		this.x = x;
		this.image = document.getElementById('pillar-image');

		// image data]
		this.spriteWidth = 32;
		this.spriteHeight = 80;
		this.frameX = Math.floor(Math.random() * 4);
		this.frameY = Math.floor(Math.random() * 2);

		this.markForDeletion = false;
	}

	update(deltaTime) {
		// scroll the piller from right to left
		this.x -= this.game.speed;

		if (this.x + this.width < 0) this.markForDeletion = true;
	}

	render(context) {
		if (this.game.debug) {
			context.strokeRect(this.x, this.y, this.width, this.height);
		}
		context.drawImage(
			this.image,
			this.frameX * this.spriteWidth,
			this.frameY * this.spriteHeight,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}
}

export default Piller;
