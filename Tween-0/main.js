/**
 * Tween-0
 *
 * Example used to showcase a simple way of "tweening" (interpolating)
 * some value over a period of time, in this case by moving Flappy Bird
 * horizontally across the screen.
 */

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')

const flappy = new Image(38, 24);
flappy.src = './flappy.png';

// The final X position for our interpolation.
const END_X = canvas.width - flappy.width;

// The current X position.
let flappyX = 0;

// Length of time in seconds we want it to take to move flappy across screen.
const DURATION = 5;

// Timer for interpolating the X value.
let timer = 0;

let lastTime = 0;

function gameLoop(currentTime) {
	if (currentTime) {
		update((currentTime - lastTime) / 1000);
		lastTime = currentTime;
	}

	requestAnimationFrame(gameLoop);
}

function update(dt) {
	if (timer < DURATION) {
		timer += dt;

		/**
		 * Math.min() ensures we don't go past the end.
		 * timer / duration is a ratio that we multiply our
		 * X by each turn to make it seem as if we're moving right.
		 */
		flappyX = Math.min(END_X, END_X * (timer / DURATION));
	}

	render();
}

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	context.drawImage(flappy, flappyX, canvas.height / 2);

	context.fillStyle = 'white';
	context.font = '20px Consolas, Courier';
	context.fillText(`Timer: ${timer} seconds`, 20, 30);
	context.fillText(`(should take ~${DURATION} seconds)`, 20, 60);
}

gameLoop();

canvas.focus();
