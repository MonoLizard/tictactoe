import { Vue, Component, Prop } from 'vue-property-decorator';
import { Mutation as MutationType } from 'vuex';
import { Mutation as MutationDecorator, State } from 'vuex-class';

import Player from 'enum/Player';
import Mutation from 'enum/Mutation';

import './cell.style';

@Component({
	components: {},
	template: require('./cell.template')
})
export default class Cell extends Vue{
	@Prop(Number) private readonly id!: number;
	@State(state => state.player) private readonly currentPlayer!: Player;
	@MutationDecorator(Mutation.PLAY) private readonly playMutation!: MutationType<number>;

	activePiece: Player = Player.NONE;

	private onItemClickHandler(): void{
		if(this.currentPlayer === Player.X) this.playMutation(this.id);
	}
}
