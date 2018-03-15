import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: {
        // user login
        token: null,
        user: null,
        isUserLoggedin: false,
        // signup modal
        isSignUp: false
    },
    mutations: {
        setToken(state,token){
            state.token= token
            if(token){
                state.isUserLoggedin =true
            } else{
                state.isUserLoggedin =false
            }
        },
        setUser(state, user){
            state.user = user
        },
        setSignUp(state, isSignUp) {
            state.isSignUp = isSignUp
        }
    },
    actions: {
        setToken({commit}, token){
            commit('setToken',token)
        },
        setUser({commit}, user){
            commit('setUser',user)
        },
        setSignUp({commit}, isSignUp) {
            commit('setSignUp', isSignUp)
        }
    }
})
