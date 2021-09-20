import Fonts from "../lib/Fonts.js";
import Images from "../lib/Images.js";
import Sounds from "../lib/Sounds.js";
import StateMachine from "../lib/StateMachine.js";

export const canvas = document.querySelector('canvas');
export const context = canvas.getContext('2d');

export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

export const TILE_SIZE = 32;
export const BOARD_SIZE = 8;

export const BOARD_POSITION_CENTER = {
	x: (CANVAS_WIDTH - (BOARD_SIZE * TILE_SIZE)) / 2,
	y: (CANVAS_HEIGHT - (BOARD_SIZE * TILE_SIZE)) / 2,
};

export const keys = {};
export const sounds = new Sounds();
export const images = new Images(context);
export const fonts = new Fonts();
export const stateMachine = new StateMachine();
