import Vue from 'vue';

import Store from 'state/state';
import Game from 'component/game/game.component';

import './index.scss';

const App = new Vue({
	el: '#app',
	components: {
		Game
	},
	store: Store
});
