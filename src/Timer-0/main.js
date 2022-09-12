/**
 * Timer-0
 *
 * Example used to showcase a simple way of implementing
 * a timer that affects some output on the screen.
 */

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 360;

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1'); // Allows the canvas to have user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

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
		secondTimer = 0;
	}

	render();
}

function render() {
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	context.fillStyle = 'white';
	context.font = '30px Consolas, Courier';
	context.textAlign = 'center'
	context.fillText(`Timer-0`, canvas.width * 0.5, canvas.height * 0.15);
	context.font = '20px Consolas, Courier';
	context.fillText(`Current Second: ${currentSecond} seconds`, canvas.width * 0.5, canvas.height * 0.4);
	context.fillText(`Second Timer: ${secondTimer.toFixed(2)} seconds`, canvas.width * 0.5, canvas.height * 0.6);
}

gameLoop();

canvas.focus();
