<template>
<v-app id="inspire">
  <!-- right drawer page -->
  <v-navigation-drawer fixed v-model="drawerRight" right clipped app>
    <v-list dense>
        <v-list-tile-content>
          <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
        </v-list-tile-content>
    </v-list>
  </v-navigation-drawer>
  <!-- main page toolbar title-->
  <v-toolbar color="secondary" dark fixed app clipped-right>
    <v-toolbar-side-icon @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title>Toolbar</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="cyan" @click="face_signin">facebook</v-btn>
    <v-btn color="cyan" @click="twitter_signin">twitter</v-btn>
    <v-btn color="cyan" @click="google_signin">google</v-btn>
    <v-btn color="cyan" @click="kakao_signin">twitter</v-btn>
    <v-btn color="cyan" @click.native.stop="isSignup=!isSignup">SignUp</v-btn>
    <v-btn class="cyan" @click.native.stop="isSignin=!isSignin">SignIn</v-btn>
    <v-btn icon @click.stop="drawerRight =!drawerRight"><v-icon>exit_to_app</v-icon></v-btn>
  </v-toolbar>
  <!--signup dialog-->
  <v-dialog v-model="isSignup" max-width="500px">
    <v-card>
      <v-card-text>
        <v-text-field type="username" name="username" v-model="username" placeholder="username" />
        <v-text-field type="password" name="password" v-model="password" placeholder="password" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="signup">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- signin dialog-->
  <v-dialog v-model="isSignin" max-width="500px">
    <v-card>
      <v-card-text>
        <v-text-field type="username" name="username" v-model="username" placeholder="username" />
        <v-text-field type="password" name="password" v-model="password" placeholder="password" />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="signin">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- left drawer page -->
  <v-navigation-drawer fixed v-model="drawerLeft" app>
    <v-list dense>
        <v-list-tile-content>
          <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
        </v-list-tile-content>
    </v-list>
  </v-navigation-drawer>
 <!-- center content-form in main page -->
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-tooltip right>
        </v-tooltip>
      </v-layout>
    </v-container>
  </v-content>
  <!-- bottom-form in main page-->
  <v-footer color="blue-grey" class="white--text" app>
    <span>Vuetify</span>
    <v-spacer></v-spacer>
    <span>&copy; 2017</span>
  </v-footer>
</v-app>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      username: '',
      password: '',
      drawerLeft: false,
      drawerRight: false,
      isSignup: false,
      isSignin: false,
      success: '',
      msg: ''
    }
  },
  methods: {
    async signin () {
      const response = await AuthenticationService.signin({
        username: this.username,
        password: this.password
      })
      this.success = response.data.success
      if (this.success) {
        this.msg = response.data.token
      } else {
        this.$router.push('/')
        this.username = ''
        this.password = ''
        this.msg = response.data.msg
      }
      console.log('this login msg : ', this.msg)
    },
    async face_signin () {
      const response = await AuthenticationService.face_signin({

      })
      this.success = response.data.success
      if (this.success) {
        this.msg = response.data.token
      } else {
        this.msg = response.data.msg
      }
    },
    async twitter_signin () {

    },
    async kakao_signin () {

    },
    async signup () {
      this.$router.push('/register')
    }
  },
  props: {
    source: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
