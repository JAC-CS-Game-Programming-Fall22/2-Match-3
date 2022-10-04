/**
 * Timer-2
 *
 * Example used to showcase a simple way of implementing a timer that affects
 * some output on the screen, but with the Timer class to make the implementation
 * much more scalable and our lives a whole lot easier.
 */

import Timer from "./Timer.js";

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

let lastTime = 0;

const timer = new Timer();

/**
 * All of the definitions for our timer tasks. The timer will increment the
 * counter every interval seconds. The timer will stop after duration seconds.
 */
const timerDefinitions = [
	{ interval: 1, duration: 3, counter: 0, colour: 'white' },
	{ interval: 2, duration: 4, counter: 0, colour: 'white' },
	{ interval: 4, duration: 8, counter: 0, colour: 'white' },
	{ interval: 3, duration: 9, counter: 0, colour: 'white' },
	{ interval: 2, duration: 6, counter: 0, colour: 'white' },
];

/**
 * For each definition, add a new task to the timer. The function to be executed
 * each interval seconds is implemented by action. The function to be executed at
 * the very end of the timer's duration is implemented by callback.
 */
timerDefinitions.forEach((definition) => {
	const action = () => definition.counter++; // Gets executed every interval.
	const callback = () => definition.colour = 'green'; // Gets executed after duration.

	timer.addTask(action, definition.interval, definition.duration, callback);
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

	context.font = '30px Consolas, Courier';
	context.textAlign = 'center'
	context.fillText(`Timer-2`, canvas.width * 0.5, canvas.height * 0.15);

	context.font = '20px Consolas, Courier';

	// Prints out all the counters.
	timerDefinitions.forEach((definition, index) => {
		context.fillStyle = definition.colour;
		context.fillText(`Counter ${index + 1}: ${definition.counter} (every ${definition.interval}s for ${definition.duration} seconds total)`, canvas.width * 0.5, canvas.height * 0.3 + 40 * index);
	});

	context.fillStyle = 'white';

	// You should see this number going down as each timer task reaches its duration.
	context.fillText(`Timer tasks: ${timer.tasks.length}`, canvas.width * 0.5, canvas.height * 0.9);
}

gameLoop();

canvas.focus();
