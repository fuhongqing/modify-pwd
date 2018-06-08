import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  author:'fhq',
}
const mutations = {
  setUserName(state, val) {
    state.author = val
  }
}
//methods  this.$store.commit(setUserID,msg);
// this.$store.state.author
export default new Vuex.Store({
  state, mutations
})
