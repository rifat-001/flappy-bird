class Game {
	/**
	 * @param canvas HTMLCanvas Element
	 */
	constructor(canvas) {
		this.canvas = canvas;
		this.height = canvas.height;
		this.width = canvas.width;
		this.ctx = canvas.getContext('2d');
	}
}
