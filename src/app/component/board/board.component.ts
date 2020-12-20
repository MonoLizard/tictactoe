import { Vue, Component, Watch, Ref } from 'vue-property-decorator';
import { Mutation as MutationDecorator, State } from 'vuex-class';
import { Mutation as MutationType } from 'vuex';

import Cell from 'component/cell/cell.component';
import IMove from 'interface/IMove';
import Player from 'enum/Player';
import Mutation from 'enum/Mutation';

import './board.style';

@Component({
	components: {
		Cell
	},
	template: require('./board.template')
})
export default class Board extends Vue{
	@Ref() private readonly cells!: Cell[];
	@MutationDecorator(Mutation.END_TURN) private readonly endTurnMutation!: MutationType<void>;
	@State(state => state.moves) private readonly moves!: IMove[];
	@State(state => state.winner) private readonly winner!: Player;
	@State(state => state.xWinCount) readonly xWinCount!: number;
	@State(state => state.oWinCount) readonly oWinCount!: number;
	@State(state => state.drawCount) readonly drawCount!: number;

	winnerText: string = '';
	showWinner: boolean = false;

	@Watch('winner')
	private onWinnerUpdated(winner: Player){
		if(winner !== Player.NULL){
			this.showWinner = true;
			if(winner === Player.X) this.winnerText = 'YOU WIN';
			else if(winner === Player.O) this.winnerText = 'AI WIN';
			else this.winnerText = 'DRAW';
			setTimeout(() => { this.showWinner = false; }, 1000);
		}
	}

	@Watch('moves')
	private onMovesUpdated(moves: IMove[]): void{
		this.resetCells();
		if(moves.length > 0){
			for (const move of moves) this.cells[move.index - 1].activePiece = move.player;
			setTimeout(this.endTurnMutation, 1000);
		}
	};

	private resetCells(): void{
		for (const cell of this.cells) cell.activePiece = Player.NONE;
	}
}
