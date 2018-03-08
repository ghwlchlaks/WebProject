import Vue from 'vue'
import Vuex from 'vuex'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'

Vue.use(VueAxios, axios)
Vue.use(Vuex)

// baseUrl: 'http://localhost:8082/login',
//     providers: {
//         google: {
//             clientId: '373179483442-a134eajj5vhh5dbil9hi0l951vhm15kb.apps.googleusercontent.com',
//             redirectUri: 'http://localhost:8080/google/callback'
//         }
//     }
// Vue.use(VueAuthenticate, {
//     bindRequestInterceptor: function () {
//         this.$http.interceptors.request.use((config) => {
//             console.log('token ', config)
//           if (this.isAuthenticated()) {
//             config.headers['Authorization'] = [
//               this.options.tokenType, this.getToken()
//             ].join(' ')
//           } else {
//             delete config.headers['Authorization']
//           }
//           return config
//         })
//       },
//     bindResponseInterceptor: function () {
//         this.$http.interceptors.response.use((response) => {
//             console.log(response)
//             this.setToken(response)
//             return response
//         })},
//     baseUrl: 'http://localhost:8082/login',
//     providers: {
//         google: {
//             clientId: '373179483442-a134eajj5vhh5dbil9hi0l951vhm15kb.apps.googleusercontent.com',
//             redirectUri: 'http://localhost:8080/google/callback'
//         }
//     }
// })

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        isUserLoggedin: false,
        // isAuthenticated: false
    },
    message: null,
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
        // isAuthenticated (state, payload) {
        //     state.isAuthenticated = payload.isAuthenticated
        // }
    },
    actions: {
        setToken({commit}, token){
            commit('setToken',token)
        },
        setUser({commit}, user){
            commit('setUser',user)
        }
        // login (context, payload) {
        //     vueAuth.login(payload.user, payload.requestOptions).then((response) => {
        //         context.commit('isAuthenticated', {
        //             isAuthenticated: vueAuth.isAuthenticated()
        //         })
        //     })
        // }
    },
    // getters: {
    //     isAuthenticated () {
    //         return vueAuth.isAuthenticated()
    //     }
    // }
})
