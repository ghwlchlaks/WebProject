import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        isUserLoggedin: false
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
        }
    },
    actions: {
        setToken({commit}, token){
            commit('setToken',token)
        },
        setUser({commit}, user){
            commit('setUser',user)
        }
    }
})
