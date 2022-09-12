/**
 * Tween-0
 *
 * Example used to showcase a simple way of "tweening" (interpolating)
 * some value over a period of time, in this case by moving Flappy Bird
 * horizontally across the screen.
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

// The final X position for our interpolation.
const END_X = CANVAS_WIDTH - 70;

// The current X position.
const bird = {
	x: 0,
	y: CANVAS_HEIGHT / 2,
	sprite: '🐣',
};

// Length of time in seconds we want it to take to move flappy across screen.
const DURATION = 10;

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
	if (timer <= DURATION) {
		timer += dt;

		/**
		 * Math.min() ensures we don't go past the end.
		 * timer / duration is a ratio that we multiply our
		 * X by each turn to make it seem as if we're moving right.
		 */
		bird.x = Math.min(END_X, END_X * (timer / DURATION));
	}
	else {
		bird.sprite = '🐥';
	}

	render();
}

function render() {
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	context.font = '60px Consolas, Courier';
	context.fillText(bird.sprite, bird.x, bird.y);

	context.fillStyle = 'white';
	context.font = '20px Consolas, Courier';
	context.fillText(`Timer: ${timer.toFixed(2)} seconds`, 20, 30);
	context.fillText(`(should take ~${DURATION} seconds)`, 20, 60);
}

gameLoop();
