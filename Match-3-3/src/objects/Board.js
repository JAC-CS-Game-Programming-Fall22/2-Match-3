import { BOARD_SIZE, context, sounds, TILE_SIZE, timer } from '../globals.js';
import Tile from './Tile.js';
import { SoundName, TileColour } from '../enums.js';
import { getRandomPositiveInteger, pickRandomElement } from '../../lib/RandomNumberHelpers.js';
import { roundedRectangle } from '../../lib/DrawingHelpers.js';

export default class Board {
	/**
	 * The Board is our arrangement of Tiles with which we must try
	 * to find matching sets of three horizontally or vertically.
	 *
	 * @param {Number} x
	 * @param {Number} y
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.matches = [];
		this.tiles = [];
		this.minMatchLength = 3;
		this.tileSprites = Tile.generateSprites();

		this.initializeBoard();
	}

	render() {
		this.renderBoard();
		this.renderMatches();
	}

	// Loops through the tiles and renders them at their location.
	renderBoard() {
		for (let row = 0; row < BOARD_SIZE; row++) {
			for (let column = 0; column < BOARD_SIZE; column++) {
				this.tiles[row][column].render(this.x, this.y);
			}
		}
	}

	// Highlights all the matches.
	renderMatches() {
		context.save();

		this.matches.forEach((match) => {
			const direction = match[0].boardX === match[1].boardX ? 'vertical' : 'horizontal';

			context.strokeStyle = 'red';
			context.lineWidth = 4;

			if (direction === 'horizontal') {
				roundedRectangle(
					context,
					match[match.length - 1].x + this.x,
					match[0].y + this.y,
					match.length * TILE_SIZE,
					TILE_SIZE
				);
			}
			else {
				roundedRectangle(
					context,
					match[0].x + this.x,
					match[match.length - 1].y + this.y,
					TILE_SIZE,
					match.length * TILE_SIZE
				);
			}
		});

		context.restore();
	}

	initializeBoard() {
		this.tiles = [];

		// For each row in the board...
		for (let row = 0; row < BOARD_SIZE; row++) {
			// Insert a new array to represent the row.
			this.tiles.push([]);

			// For each column in the row...
			for (let column = 0; column < BOARD_SIZE; column++) {
				this.tiles[row].push(this.generateTile(column, row));
			}
		}

		this.calculateMatches();

		// Recursively initialize if matches exist so we always start with a matchless board.
		while (this.matches.length > 0) {
			this.initializeBoard();
		}
	}

	generateTile(x, y) {
		const colourList = [
			TileColour.Beige,
			TileColour.Pink,
			TileColour.Purple,
			TileColour.LightGreen,
			TileColour.Blue,
			TileColour.Orange,
		];
		const patternRange = [0, 0];
		const colour = pickRandomElement(colourList);
		const pattern = getRandomPositiveInteger(patternRange[0], patternRange[1]);

		return new Tile(x, y, colour, pattern, this.tileSprites);
	}

	async swapTiles(selectedTile, highlightedTile) {
		const temporaryTile = new Tile(selectedTile.boardX, selectedTile.boardY);

		sounds.play(SoundName.Whip);

		// Swap canvas positions by tweening so the swap is animated.
		timer.tweenAsync(highlightedTile, ['x', 'y'], [temporaryTile.x, temporaryTile.y], 0.2);
		await timer.tweenAsync(selectedTile, ['x', 'y'], [highlightedTile.x, highlightedTile.y], 0.2);

		// Swap board positions.
		selectedTile.boardX = highlightedTile.boardX;
		selectedTile.boardY = highlightedTile.boardY;
		highlightedTile.boardX = temporaryTile.boardX;
		highlightedTile.boardY = temporaryTile.boardY;

		// Swap tiles in the tiles array.
		this.tiles[selectedTile.boardY][selectedTile.boardX] = selectedTile;
		this.tiles[highlightedTile.boardY][highlightedTile.boardX] = highlightedTile;
	}

	/**
	 * Goes left to right, top to bottom in the board, calculating matches by
	 * counting consecutive tiles of the same color. Doesn't need to check the
	 * last tile in every row or column if the last two haven't been a match.
	 */
	calculateMatches() {
		this.matches = [];
		this.resolveHorizontalMatches();
		this.resolveVerticalMatches();
	}

	resolveHorizontalMatches() {
		for (let y = 0; y < BOARD_SIZE; y++) {
			let matchCounter = 1;
			let colourToMatch = this.tiles[y][0].colour;
			let rowMatches = [];

			// For every horizontal tile...
			for (let x = 1; x < BOARD_SIZE; x++) {
				// If this is the same colour as the one we're trying to match...
				if (this.tiles[y][x].colour === colourToMatch) {
					matchCounter++;
				}
				else {
					// Set this as the new colour we want to watch for.
					colourToMatch = this.tiles[y][x].colour;

					// If we have a match of 3 or more up until now, add it to our matches array.
					if (matchCounter >= this.minMatchLength) {
						const match = [];

						// Go backwards from here by matchCounter.
						for (let x2 = x - 1; x2 >= x - matchCounter; x2--) {
							// Add each tile to the match that's in that match.
							match.push(this.tiles[y][x2]);
						}

						// Add this match to our total matches array.
						rowMatches.push(match);
					}

					matchCounter = 1;

					// We don't need to check last two if they won't be in a match.
					if (x >= BOARD_SIZE - 2) {
						break;
					}
				}
			}

			// Account for matches at the end of a row.
			if (matchCounter >= this.minMatchLength) {
				let match = [];

				// Go backwards from here by matchCounter.
				for (let x = BOARD_SIZE - 1; x >= BOARD_SIZE - matchCounter; x--) {
					match.push(this.tiles[y][x]);
				}

				// Add this match to our total matches array.
				rowMatches.push(match);
			}

			// Insert matches into the board matches array.
			rowMatches.forEach(match => this.matches.push(match));
		}
	}

	resolveVerticalMatches() {
		for (let x = 0; x < BOARD_SIZE; x++) {
			let matchCounter = 1;
			let colourToMatch = this.tiles[0][x].colour;
			let columnMatches = [];

			// For every vertical tile...
			for (let y = 1; y < BOARD_SIZE; y++) {
				// If this is the same colour as the one we're trying to match...
				if (this.tiles[y][x].colour === colourToMatch) {
					matchCounter++;
				}
				else {
					// Set this as the new colour we want to watch for.
					colourToMatch = this.tiles[y][x].colour;

					// If we have a match of 3 or more up until now, add it to our matches array.
					if (matchCounter >= this.minMatchLength) {
						const match = [];

						// Go backwards from here by matchCounter.
						for (let y2 = y - 1; y2 >= y - matchCounter; y2--) {
							// Add each tile to the match that's in that match.
							match.push(this.tiles[y2][x]);
						}

						// Add this match to our total matches array.
						columnMatches.push(match);
					}

					matchCounter = 1;

					// We don't need to check last two if they won't be in a match.
					if (y >= BOARD_SIZE - 2) {
						break;
					}
				}
			}

			// Account for matches at the end of a column.
			if (matchCounter >= this.minMatchLength) {
				let match = [];

				// Go backwards from here by matchCounter.
				for (let y = BOARD_SIZE - 1; y >= BOARD_SIZE - matchCounter; y--) {
					match.push(this.tiles[y][x]);
				}

				// Add this match to our total matches array.
				columnMatches.push(match);
			}

			// Insert matches into the board matches array.
			columnMatches.forEach(match => this.matches.push(match));
		}
	}
}
