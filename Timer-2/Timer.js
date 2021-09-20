export default class Timer {
	constructor() {
		this.tasks = [];
	}

	update(dt) {
		this.updateTasks(dt)
		this.removeFinishedTasks();
	}

	/**
	 * Adds a task to the timer's list of tasks to be run.
	 *
	 * @param {function} action The function to execute after a certain period of time.
	 * @param {number} interval How often the action should execute (frequency).
	 * @param {number} duration How long the task will be tracked in this.tasks.
	 * @param {function} callback The function to execute after duration has passed.
	 */
	addTask(action, interval, duration = 0, callback = () => { }) {
		this.tasks.push(new Task(action, interval, duration, callback));
	}

	/**
	 * Loops through the tasks and updates them accordingly based on delta time.
	 *
	 * @param {number} dt How much time has elapsed since the last time this was called.
	 */
	updateTasks(dt) {
		this.tasks.forEach((task) => {
			task.update(dt);
		});
	}

	/**
	 * Removes the finished tasks by looping through each tasks and checking the isDone flag.
	 *
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
	 */
	removeFinishedTasks() {
		this.tasks = this.tasks.filter(task => !task.isDone);
	}
}

class Task {
	/**
	 * Represents an action to be done after a certain period of time.
	 *
	 * @param {function} action The function to execute after a certain period of time.
	 * @param {number} interval How often the action should execute (frequency).
	 * @param {number} duration How long the task will be tracked in this.tasks.
	 * @param {function} callback The function to execute after duration has passed.
	 */
	constructor(action, interval, duration = 0, callback = () => { }) {
		this.action = action;
		this.interval = interval;
		this.intervalTimer = 0;
		this.totalTime = 0;
		this.duration = duration;
		this.callback = callback;
		this.isDone = false;
	}

	update(dt) {
		this.intervalTimer += dt; // Counts from 0 until interval.
		this.totalTime += dt; // Counts from 0 until duration.

		// Every interval, execute the action.
		if (this.intervalTimer >= this.interval) {
			this.action(dt);
			this.intervalTimer %= this.interval;
		}

		// At the end of the duration, execute the callback.
		if (this.duration !== 0 && this.totalTime >= this.duration) {
			this.callback();
			this.isDone = true;
		}
	}
}
