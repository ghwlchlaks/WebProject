<template>
  <v-app>
    <!--Top ToolBar-->
    <v-toolbar color="primary" fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.state.isUserLoggedin" flat @click="socialLogin('google')">google</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedin" flat @click="socialLogin('facebook')">facebook</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedin" flat @click.native.stop="isSignup=!isSignup">SignUp</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedin" flat @click.native.stop="isSignin=!isSignin">SignIn</v-btn>
      <v-btn v-if="$store.state.isUserLoggedin"  flat @click="logout">logout</v-btn>
      <v-btn icon @click.stop="drawerRight =!drawerRight"><v-icon>exit_to_app</v-icon></v-btn>
    </v-toolbar>
     <!-- Left drawer page -->
    <v-navigation-drawer fixed v-model="drawerLeft" clipped app>
      <v-list>
          <v-list-group
              v-model="item.active"
              v-for="item in items"
              :key="item.title"
              :prepend-icon="item.action"
              no-action
            >
              <v-list-tile slot="activator">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="subItemClick({name:'NoticeBoard', params: {boardId:subItem.route_name, index:1}})">
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>{{ subItem.action }}</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
    <!--signup dialog-->
    <v-dialog v-model="isSignup" max-width="500px">
      <v-card>
      <v-card-text>
        <v-text-field type="email" name="email" v-model="email" placeholder="email" />
        <v-text-field type="password" name="password" v-model="password" placeholder="password" />
        <v-text-field type="username" name="username" v-model="username" placeholder="username" />
        <v-text-field type="country" name="country" v-model="country" placeholder="country" />
        <v-text-field type="wantedLanguage" name="wantedLanguage" v-model="wantedLanguage" placeholder="wantedLanguage" />
        <v-text-field type="nickName" name="nickName" v-model="nickName" placeholder="nickName" />
        <v-text-field type="sex" name="sex" v-model="sex" placeholder="sex" />
      </v-card-text>
        <v-card-actions>
          <v-btn @click="local_signup">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
     <!-- signin dialog-->
    <v-dialog v-model="isSignin" max-width="500px">
      <v-card>
        <v-card-text>
          <v-text-field type="email" name="email" v-model="email" placeholder="email" />
          <v-text-field type="password" name="password" v-model="password" placeholder="password" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="local_signin">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-footer class="pa-3" app clipped>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
  </v-app>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: '',
      username: '',
      country: '',
      wantedLanguage: '',
      nickName: '',
      sex: '',
      success: '',
      msg: '',
      drawerLeft: false,
      drawerRight: false,
      isSignup: false,
      isSignin: false,
      res: null,
      items: [
        {
          action: 'videogame_asset',
          title: 'Game',
          items: [
            {title: 'Shotting Game', route_name: 'shotting'}
          ]
        },
        {
          action: 'shopping_basket',
          title: 'Shop',
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' }
          ]
        },
        {
          action: 'directions_run',
          title: 'Sports',
          items: [
            {title: 'Soccer', route_name: 'soccer'},
            {title: 'basketball', route_name: 'basketball'},
            {title: 'baseball', route_name: 'baseball'}
          ]
        },
        {
          action: 'queue_music',
          title: 'Music',
          items: [
            {title: 'K-pop', route_name: 'kpop'},
            { title: 'pop', route_name: 'pop' }
          ]
        },
        {
          action: 'airplanemode_active',
          title: 'Travel',
          items: [
            { title: 'North America', route_name: 'northamerica' },
            { title: 'Asia', route_name: 'asia' }
          ]
        }
      ]
    }
  },
  methods: {
    socialLogin (provider) {
      this.res = null
      var this_ = this
      // request token 1 -> authentication code 서버로 전달 2
      this_.$auth.authenticate(provider).then(function (authResponse) {
        if (provider === 'google') {
          // Use token to call google api
          axios.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect').then(function (res) {
            this_.res = res
            const response = AuthenticationService.social_login(this_.res, provider)
            console.log(response['[[PromiseValue]]'])
          })
        }
      })
    },
    async local_signup () {
      const response = await AuthenticationService.local_signup({
        email: this.email,
        password: this.password,
        username: this.username,
        country: this.country,
        wantedLanguage: this.wantedLanguage,
        nickName: this.nickName,
        sex: this.sex
      })
      this.success = response.data.success
      this.msg = response.data.message
      if (this.success) {
        console.log('token! ', response.data.token)
      } else {
        this.msg = response.data.error
        console.log('signup fail! ', this.msg)
      }
    },
    async local_signin () {
      const response = await AuthenticationService.local_signin({
        email: this.email,
        password: this.password
      })
      this.$store.dispatch('setToken', response.data.token)
      this.$store.dispatch('setUser', response.data.user.local)
      console.log(response)
      this.success = response.data.success
      if (this.success) {
        this.msg = response.data.token
        this.isSignin = false
      } else {
        this.$router.push('/')
        this.username = ''
        this.password = ''
        this.msg = response.data.msg
      }
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // redirect home page
      this.$router.push('/')
    },
    subItemClick (subTitle) {
      this.$router.push(subTitle)
    }
  },
  props: {
    source: String
  }
}
</script>

<style scoped>

</style>
