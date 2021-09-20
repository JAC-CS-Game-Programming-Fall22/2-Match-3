/**
 * Timer-0
 *
 * Example used to showcase a simple way of implementing
 * a timer that affects some output on the screen.
 */

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let lastTime = 0;
let currentSecond = 0;
let secondTimer = 0;

function gameLoop(currentTime) {
	if (currentTime) {
		update((currentTime - lastTime) / 1000);
		lastTime = currentTime;
	}

	requestAnimationFrame(gameLoop);
}

function update(dt) {
	secondTimer += dt;

	if (secondTimer > 1) {
		currentSecond++;
		secondTimer %= 1;
	}

	render();
}

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = 'white';
	context.font = '30px Consolas, Courier';
	context.textAlign = 'center'
	context.fillText(`Timer-1`, canvas.width * 0.5, canvas.height * 0.15);
	context.textAlign = 'left'
	context.font = '20px Consolas, Courier';
	context.fillText(`Current Second: ${currentSecond} seconds`, canvas.width * 0.2, canvas.height * 0.4);
	context.fillText(`Second Timer: ${secondTimer} seconds`, canvas.width * 0.2, canvas.height * 0.6);
}

gameLoop();

canvas.focus();
