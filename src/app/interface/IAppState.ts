import Player from 'enum/Player';
import IMove from 'interface/IMove';

export default interface IAppState{
	cells: Player[];
	drawCount: number;
	moves: IMove[];
	oWinCount: number;
	player: Player;
	turn: number;
	xWinCount: number;
	winner: Player;
}
