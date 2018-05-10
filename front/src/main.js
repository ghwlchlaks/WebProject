// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from '../store/store'
import {sync} from 'vuex-router-sync'
import BootstrapVue from 'bootstrap-vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueAuthenticate from 'vue-authenticate'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8082',
  providers: {
    google: {
      clientId: '373179483442-qdu2so3q9u38es1r9o93n920ds01p3dg.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/auth/callback'
    },
    facebook: {
      clientId: '147138082759931',
      redirectUri: 'http://localhost:8080/auth/callback'
    }
  }
})
Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
