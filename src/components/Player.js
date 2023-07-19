export default class Player {
	constructor(game) {
		this.game = game;

		this.x = 50;
		this.y = this.game.height * 0.4;

		// image data
		this.image1 = document.getElementById('bird-1');
		this.image2 = document.getElementById('bird-2');
		this.image3 = document.getElementById('bird-3');
		this.images = [this.image1, this.image2, this.image3];

		// randomly choosing an image from 3
		const index = Math.floor(Math.random() * 3);
		this.image = this.images[index];

		// scale the croped image
		this.scale = 2.5;

		// the dimension of cropping rectangle
		this.spriteWidth = 16;
		this.spriteHeight = 16;

		// scaling the croped image by the scale
		this.width = this.scale * this.spriteWidth;
		this.height = this.scale * this.spriteHeight;

		console.log(index);

		this.frameX = 0;
		this.frameY = 0;
		this.maxFrameX = 4;

		// frame change timer, every [frameChangeInterval]ms the sprite will be updated
		this.frameChangeTimer = 0;
		this.frameChangeInterval = 100;

		// physics
		this.velocityX = 3;
		this.velocityY = 3;
		this.gravity = 0.5;

		// game state
		this.isOnGround = false;
		this.isOnTop = false;

		// fly timer utility
		this.flyTimer = 0;
		this.flyInterval = 15;
		this.flyUpValue = 7;
	}

	update(deltaTime) {
		// updating sprite
		if (this.frameChangeTimer >= this.frameChangeInterval) {
			this.frameX = (this.frameX + 1) % this.maxFrameX;
			this.frameChangeTimer = 0;
		} else this.frameChangeTimer += deltaTime;

		// flying the bird if user press 'Space'
		if (
			(this.game.keys.includes('space') || this.game.mouse.pressed) &&
			this.flyTimer >= this.flyInterval
		) {
			this.fly();
			this.flyTimer = 0;
		} else this.flyTimer += deltaTime;

		// updating physics
		this.velocityY += this.gravity;
		this.y += this.velocityY;

		if (this.y < 0) this.isOnTop = true;
		if (this.y > this.game.height - this.height) this.isOnGround = true;
		// console.log(this.y);
	}

	render(context) {
		if (this.game.debug) {
			context.strokeRect(this.x, this.y, this.width, this.height);
		}

		context.drawImage(
			this.image,
			this.spriteWidth * this.frameX,
			this.spriteHeight * this.frameY,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height
		);
	}

	fly() {
		this.velocityY = -this.flyUpValue;
	}
}
