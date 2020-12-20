import Vue from 'vue';
import Vuex from 'vuex';

import Mutation from 'enum/Mutation';
import Player from 'enum/Player';
import IAppState from 'interface/IAppState';

Vue.use(Vuex);

export const getDefaultState = () => {
	return {
		cells: new Array(9).fill(Player.NONE),
		moves: [],
		player: Player.X,
		turn: 1
	}
}

const Store = new Vuex.Store<IAppState>({
	state: {
		...getDefaultState(),
		drawCount: 0,
		oWinCount: 0,
		xWinCount: 0,
		winner: Player.NULL
	},
	mutations: {
		[Mutation.PLAY](state, index: number){
			state.winner = Player.NULL;
			state.moves.push({player: state.player, index});
			Vue.set(state.cells, index - 1, state.player);
		},
		[Mutation.END_TURN](state){
			state.player = state.player === Player.X ? Player.O : Player.X;
			state.turn++;
			if(state.player === Player.O) window.history.pushState(state, 'gameState');
		},
		[Mutation.RESET](state, player: Player){
			state.winner = player;
			if(player === Player.X) state.xWinCount++;
			else if(player === Player.O) state.oWinCount++;
			else if(player === Player.NONE) state.drawCount++;
			Object.assign(state, getDefaultState());
		}
	}
});

export default Store;
