class InputHandler {
	constructor(game) {
		this.game = game;

		// event listener

		window.addEventListener('mousedown', (e) => {
			this.game.mouse.x = e.x;
			this.game.mouse.y = e.y;
			this.game.mouse.pressed = true;
		});

		window.addEventListener('mouseup', (e) => {
			this.game.mouse.pressed = false;
		});

		window.addEventListener('keydown', (e) => {
			let key = this.getKeyName(e.key);

			if (!this.game.keys.includes(key)) this.game.keys.push(key);
		});

		window.addEventListener('keyup', (e) => {
			let key = this.getKeyName(e.key);

			this.game.keys = this.game.keys.filter((k) => k !== key);
		});

		window.addEventListener('keyup', (e) => {
			let key = this.getKeyName(e.key);
			this.game.keys = this.game.keys.filter(
				(existingKey) => existingKey !== key
			);
		});
	}

	getKeyName(key) {
		switch (key) {
			case ' ':
				return 'space';
				break;
			default:
				return key;
		}
	}
}

export default InputHandler;
