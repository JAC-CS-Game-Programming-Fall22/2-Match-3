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

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d')

const flappyRed = new Image(38, 24);
const flappyGreen = new Image(38, 24);
flappyRed.src = './flappy_red.png';
flappyGreen.src = './flappy_green.png';

// Length of time in seconds we want it to take to move flappy across screen.
const MAX_DURATION = 10;

// Timer for interpolating the X value.
let timer = new Timer();

let lastTime = 0;

const birds = [];

for (let i = 0; i < 1000; i++) {
	birds.push({
		x: Math.random() * (canvas.width - flappyRed.width),
		y: Math.random() * (canvas.height - flappyRed.height),
		endX: Math.random() * (canvas.width - flappyRed.width),
		endY: Math.random() * (canvas.height - flappyRed.height),
		duration: Math.random() * MAX_DURATION,
		opacity: 0,
		sprite: flappyRed,
	});
}

birds.forEach((bird) => {
	timer.tween(
		bird,
		['x', 'y', 'opacity'],
		[bird.endX, bird.endY, 1],
		bird.duration,
		() => bird.sprite = flappyGreen,
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
	context.clearRect(0, 0, canvas.width, canvas.height);

	birds.forEach((bird) => {
		context.globalAlpha = bird.opacity;
		context.drawImage(bird.sprite, bird.x, bird.y);
	});

	context.globalAlpha = 1;
	context.fillStyle = 'white';
	context.font = '20px Consolas, Courier';
	context.fillText(`Longest should take ~${MAX_DURATION} seconds.`, 20, 30);
}

gameLoop();

canvas.focus();
