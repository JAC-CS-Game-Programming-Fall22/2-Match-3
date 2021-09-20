import Board from "../objects/Board.js";
import { BOARD_POSITION_CENTER } from "../globals.js";
import State from "../../lib/State.js";

export default class PlayState extends State {
	constructor() {
		super();

		this.board = new Board(BOARD_POSITION_CENTER.x, BOARD_POSITION_CENTER.y);
	}

	render() {
		this.board.render();
	}
}
