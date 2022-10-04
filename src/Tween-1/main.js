/**
 * Tween-1
 *
 * Example used to showcase a simple way of "tweening" (interpolating) some value
 * over a period of time, in this case by moving Flappy Bird horizontally across
 * the screen. This example instantiates a large number of birds all moving at
 * different rates to show a more scaled example than Tween-0.
 */

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d') || new CanvasRenderingContext2D();
const CANVAS_WIDTH = 640;
const CANVAS_HEIGHT = 360;

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1'); // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

// The final X position for our interpolation.
const END_X = canvas.width - 70;

// Length of time in seconds we want it to take to move flappy across screen.
const DURATION = 10;

// Timer for interpolating the X value.
let timer = 0;

let lastTime = 0;

const birds = [];

for (let i = 0; i < 1000; i++) {
	birds.push({
		x: 0,
		y: Math.random() * canvas.height,

		/**
		 * Random duration between half a second and our max, floating point
		 * math.random() by itself will generate a random float between 0 and 1,
		 * so we add that to math.random(max) to get a number between 0 and 10,
		 * floating-point.
		 */
		duration: Math.random() * DURATION,
		sprite: '🐣'
	});
}

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
		birds.forEach((bird) => {
			bird.x = Math.min(END_X, END_X * (timer / bird.duration));
			bird.x >= END_X ? bird.sprite = '🐥' : '🐣';
		});
	}

	render();
}

function render() {
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	birds.forEach((bird) => {
		context.font = '60px Consolas, Courier';
		context.fillText(bird.sprite, bird.x, bird.y);
	});

	context.fillStyle = 'white';
	context.font = '20px Consolas, Courier';
	context.fillText(`Timer: ${timer.toFixed(2)} seconds`, 20, 30);
	context.fillText(`(should take ~${DURATION} seconds)`, 20, 60);
}

gameLoop();
