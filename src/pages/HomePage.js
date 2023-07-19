import Page from '../Page.js';

export default class HomePage extends Page {
	constructor(...args) {
		super(...args);
	}

	update() {}

	render(context) {
		console.log(this.centerX, this.centerY);
		context.fillStyle = 'black';
		context.fillText('Home Screen', this.centerX, this.centerY);
	}
}
