import Game from './src/Game.js';

function init() {
	const canvas = document.getElementById('canvas');
	canvas.height = 500;
	canvas.width = (canvas.height * 16) / 9; // 16 : 9 ratio

	// global game object
	const game = new Game(canvas);

	// the @timer value of previous animate loop
	let previousTime = 0;

	/**
	 * @param timer how much time has passed till the animation start
	 */
	function animate(timer) {
		// time between two iteration
		const deltaTime = timer - previousTime;
		previousTime = timer;

		game.render();
		game.update(deltaTime);
		requestAnimationFrame(animate);
	}

	// initialize the animate with the timer value of 0
	animate(0);
}

init();
