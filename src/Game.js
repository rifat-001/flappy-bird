import PlayGround from './pages/PlayGround.js';
import HomePage from './pages/HomePage.js';
import InputHandler from './InputHandler.js';

class Game {
	/**
	 * @param canvas HTMLCanvas Element
	 */
	constructor(canvas) {
		this.canvas = canvas;
		this.height = canvas.height;
		this.width = canvas.width;
		this.ctx = canvas.getContext('2d');
		this.inputHandler = new InputHandler(this);

		/**
		 *  @game_container
		 *  all the necessary pages and components
		 */

		// the page stack; top element will be the acctive page
		this.pages = [
			new PlayGround(this, 0, 0, this.width, this.height),
			new HomePage(this, 0, 0, this.width, this.height),
		];
		this.activePage = this.pages[0];

		// user interactivity data
		this.keys = [];
		this.mouse = {
			x: 0,
			y: 0,
			pressed: false,
		};

		// game state
		this.speed = 3;

		this.debug = false;
	}

	/**
	 * @param deltaTime time between each frame or interval of two consecutive calls
	 */
	update(deltaTime) {
		this.activePage.update(deltaTime);
	}

	render() {
		// clearing the entire canvas
		this.ctx.clearRect(0, 0, this.width, this.height);

		// rendering active page
		this.activePage.render(this.ctx);
	}
}

export default Game;
