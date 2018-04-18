import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
//修改state的时候在控制台打印state的状态
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

//在调试时开启debug  线上时关闭提高效率process.env
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    strict:debug,
    plugin:debug?[createLogger()]:[]
})