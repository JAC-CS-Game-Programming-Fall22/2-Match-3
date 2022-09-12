/**
 * Tween-2
 *
 * Example used to showcase a simple way of "tweening" (interpolating) some value
 * over a period of time, in this case by moving Flappy Bird horizontally across
 * the screen. This example instantiates a large number of birds all moving at
 * different rates to show a more scaled example than Tween-0 but uses
 * Timer.tween() to do it; it also tweens their opacity.
 */

import Timer from './Timer.js';

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

// Length of time in seconds we want it to take to move flappy across screen.
const MAX_DURATION = 10;

// Timer for interpolating the X value.
let timer = new Timer();

let lastTime = 0;

const birds = [];

for (let i = 0; i < 1000; i++) {
	birds.push({
		x: Math.random() * (canvas.width),
		y: Math.random() * (canvas.height),
		endX: Math.random() * (canvas.width),
		endY: Math.random() * (canvas.height),
		duration: Math.random() * MAX_DURATION,
		opacity: 0,
		sprite: '🐣',
	});
}

birds.forEach((bird) => {
	timer.tween(
		bird,
		['x', 'y', 'opacity'],
		[bird.endX, bird.endY, 1],
		bird.duration,
		() => bird.sprite = '🐥',
	);
});

function gameLoop(currentTime) {
	if (currentTime) {
		update((currentTime - lastTime) / 1000);
		lastTime = currentTime;
	}

	requestAnimationFrame(gameLoop);
}

function update(dt) {
	timer.update(dt);
	render();
}

function render() {
	context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	birds.forEach((bird) => {
		context.globalAlpha = bird.opacity;
		context.font = '60px Consolas, Courier';
		context.fillText(bird.sprite, bird.x, bird.y);
	});

	context.globalAlpha = 0.75;
	context.fillStyle = 'black';
	context.fillRect(0, 0, CANVAS_WIDTH, 50);
	context.globalAlpha = 1;
	context.fillStyle = 'white';
	context.font = '20px Consolas, Courier';
	context.fillText(`Longest should take ~${MAX_DURATION} seconds.`, 20, 30);
}

gameLoop();
