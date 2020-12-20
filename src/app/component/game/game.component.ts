import { Vue, Component, Watch } from 'vue-property-decorator';
import { Mutation as MutationDecorator, State } from 'vuex-class';
import { Mutation as MutationType } from 'vuex';

import Board from 'component/board/board.component';
import AI from '../../entity/AI';
import IMove from 'interface/IMove';
import Mutation from 'enum/Mutation';
import Player from 'enum/Player';

import './game.style';
import { getDefaultState } from 'state/state';

@Component({
	components: {
		Board
	},
	template: require('./game.template')
})
export default class Game extends Vue{
	@State(state => state.turn) private readonly turn!: number;
	@State(state => state.moves) private readonly moves!: IMove[];
	@State(state => state.player) private readonly player!: Player;
	@State(state => state.cells) private readonly cells!: Player[];
	@MutationDecorator(Mutation.PLAY) private readonly playMutation!: MutationType<number>;
	@MutationDecorator(Mutation.RESET) private readonly resetMutation!: MutationType<Player>;

	private readonly ai: AI;

	constructor(){
		super();

		this.ai = new AI();

		window.onpopstate = this.historyBack;
	}

	private historyBack(){
		this.$store.replaceState(window.history.state || Object.assign(this.$store.state, getDefaultState()));
	}

	@Watch('turn')
	private onTurnEnd(turn: number): void{
		let winner = Player.NONE;
		let canWinWith: number = -1;
		let result: {winner: Player, canWinWith: number} = {winner: Player.NONE, canWinWith: -1};
		for(let i = 0; i < this.cells.length; i++){
			if(i % 3 === 0){
				result = this.checkWinner(i, i + 1, i + 2);
				if(winner === Player.NONE) winner = result.winner;
				if(canWinWith < 0) canWinWith = result.canWinWith;
			}
			if(Math.floor(i / 3) === 0){
				result = this.checkWinner(i, i + 3, i + 6);
				if(winner === Player.NONE) winner = result.winner;
				if(canWinWith < 0) canWinWith = result.canWinWith;
			}
			if(i === 0){
				result = this.checkWinner(i, i + 4, i + 8);
				if(winner === Player.NONE) winner = result.winner;
				if(canWinWith < 0) canWinWith = result.canWinWith;
			}
			if(i === 2){
				result = this.checkWinner(i, i + 2, i + 4);
				if(winner === Player.NONE) winner = result.winner;
				if(canWinWith < 0) canWinWith = result.canWinWith;
			}
		}
		if(winner !== Player.NONE || (winner === Player.NONE && this.moves.length === 9)) this.resetMutation(winner);
		else if(this.player === Player.O) this.playMutation(this.ai.calculatePlay(this.cells));
	}

	private checkWinner(index1: number, index2: number, index3: number): {winner: Player, canWinWith: number} {
		const cell1 = this.cells[index1];
		const cell2 = this.cells[index2];
		const cell3 = this.cells[index3];
		if(cell1 === '' && cell2 === '' && cell3 === '') return {winner: Player.NONE, canWinWith: -1};
		if(cell1 === cell2 && cell1 === cell3)
			return {winner: cell1 as Player, canWinWith: -1};
		let canWinWith: number = -1;
		if(cell1 === '' && cell2 === cell3) canWinWith = index1 + 1;
		else if(cell2 === '' && cell1 === cell3) canWinWith = index2 + 1;
		else if(cell3 === '' && cell1 === cell2) canWinWith = index3 + 1;
		return {winner: Player.NONE, canWinWith};
	}
}
