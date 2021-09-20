/**
 * Match-3-0
 * The "Day-0" Update
 *
 * Original Lua by: Colton Ogden (cogden@cs50.harvard.edu)
 * Adapted to JS by: Vikram Singh (vikram.singh@johnabbott.qc.ca)
 *
 * Match-3 has taken several forms over the years, with its roots in games
 * like Tetris in the 80s. Bejeweled, in 2001, is probably the most recognized
 * version of this game, as well as Candy Crush from 2012, though all these
 * games owe Shariki, a DOS game from 1994, for their inspiration.
 * The goal of the game is to match any three tiles of the same pattern by
 * swapping any two adjacent tiles; when three or more tiles match in a line,
 * those tiles add to the player's score and are removed from play, with new
 * tiles coming from the ceiling to replace them.
 *
 * As per previous projects, we'll be adopting a retro, NES-quality aesthetic.
 *
 * Credit for graphics:
 * https://opengameart.org/users/buch
 *
 * Credit for music:
 * http://freemusicarchive.org/music/RoccoW/
 *
 * Cool texture generator, used for background:
 * http://cpetry.github.io/TextureGenerator-Online/
 */

import { StateName } from "./enums.js";
import Game from "../lib/Game.js";
import {
	canvas,
	context,
	images,
	stateMachine,
} from "./globals.js";
import PlayState from "./states/PlayState.js";

// Fetch the asset definitions from config.json.
const {
	images: imageDefinitions,
	// @ts-ignore
} = await fetch('./src/config.json').then((response) => response.json());

// Load all the assets from their definitions.
images.load(imageDefinitions);

// Add all the states to the state machine.
stateMachine.add(StateName.Play, new PlayState());

const game = new Game(stateMachine, context, canvas.width, canvas.height);

game.start();

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();
