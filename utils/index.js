import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		//用户登录后生成的token
		token: '',
	},
	mutations: {
		saveGameInfoParams(state, gamelist) {
			state.gameInfoParams = gamelist
		}
	}
})

export default store
