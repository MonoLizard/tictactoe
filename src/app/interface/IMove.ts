import Player from 'enum/Player';

export default interface IMove {
	readonly [index: string]: Player | number;
	player: Player;
	index: number;
}
