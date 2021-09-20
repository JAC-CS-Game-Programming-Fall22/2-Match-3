/**
 * Tween-1
 *
 * Example used to showcase a simple way of "tweening" (interpolating) some value
 * over a period of time, in this case by moving Flappy Bird horizontally across
 * the screen. This example instantiates a large number of birds all moving at
 * different rates to show a more scaled example than Tween-0.
 */

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')

const flappy = new Image(38, 24);
flappy.src = './flappy.png';

// The final X position for our interpolation.
const END_X = canvas.width - flappy.width;

// Length of time in seconds we want it to take to move flappy across screen.
const DURATION = 10;

// Timer for interpolating the X value.
let timer = 0;

let lastTime = 0;

const birds = [];

for (let i = 0; i < 1000; i++) {
	birds.push({
		x: 0,
		y: Math.random() * (canvas.height - flappy.height),

		/**
		 * Random duration between half a second and our max, floating point
		 * math.random() by itself will generate a random float between 0 and 1,
		 * so we add that to math.random(max) to get a number between 0 and 10,
		 * floating-point.
		 */
		duration: Math.random() * DURATION,
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
		});
	}

	render();
}

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);

	birds.forEach((bird) => {
		context.drawImage(flappy, bird.x, bird.y);
	});

	context.fillStyle = 'white';
	context.font = '20px Consolas, Courier';
	context.fillText(`Timer: ${timer} seconds`, 20, 30);
	context.fillText(`(should take ~${DURATION} seconds)`, 20, 60);
}

gameLoop();

canvas.focus();
