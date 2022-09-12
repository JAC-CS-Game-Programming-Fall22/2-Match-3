/**
 * Timer-1
 *
 * Example used to showcase a simple way of implementing a timer that affects
 * some output on the screen, but with more timers to illustrate scaling.
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
let currentSecond2 = 0;
let secondTimer2 = 0;
let currentSecond3 = 0;
let secondTimer3 = 0;
let currentSecond4 = 0;
let secondTimer4 = 0;
let currentSecond5 = 0;
let secondTimer5 = 0;

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

	secondTimer2 += dt;

	if (secondTimer2 > 2) {
		currentSecond2++;
		secondTimer2 = 0;
	}

	secondTimer3 += dt;

	if (secondTimer3 > 4) {
		currentSecond3++;
		secondTimer3 = 0;
	}

	secondTimer4 += dt;

	if (secondTimer4 > 3) {
		currentSecond4++;
		secondTimer4 = 0;
	}

	secondTimer5 += dt;

	if (secondTimer5 > 2) {
		currentSecond5++;
		secondTimer5 = 0;
	}

	render();
}

function render() {
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	context.fillStyle = 'white';
	context.font = '30px Consolas, Courier';
	context.textAlign = 'center';
	context.fillText(`Timer-1`, canvas.width * 0.5, canvas.height * 0.15);
	context.font = '20px Consolas, Courier';
	context.fillText(`Counter 1: ${currentSecond} (every 1s)`, canvas.width * 0.5, canvas.height * 0.4);
	context.fillText(`Counter 2: ${currentSecond2} (every 2s)`, canvas.width * 0.5, canvas.height * 0.5);
	context.fillText(`Counter 3: ${currentSecond3} (every 4s)`, canvas.width * 0.5, canvas.height * 0.6);
	context.fillText(`Counter 4: ${currentSecond4} (every 3s)`, canvas.width * 0.5, canvas.height * 0.7);
	context.fillText(`Counter 5: ${currentSecond5} (every 2s)`, canvas.width * 0.5, canvas.height * 0.8);
}

gameLoop();

canvas.focus();
