class Page {
	constructor(game, pageX, pageY, pageWidth, pageHeight) {
		this.game = game;
		this.x = pageX;
		this.y = pageY;
		this.width = pageWidth;
		this.height = pageHeight;

		// some utility
		this.centerX = this.x + this.width * 0.5;
		this.centerY = this.y + this.height * 0.5;
	}
}

export default Page;
