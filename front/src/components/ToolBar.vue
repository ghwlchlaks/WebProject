<template>
  <v-app>
      <!-- Left drawer page -->
    <v-navigation-drawer fixed v-model="drawerLeft" clipped app>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!--Top ToolBar-->
    <v-toolbar color="primary" fixed app clipped-left>
      <v-toolbar-side-icon @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.state.isUserLoggedin" flat >facebook</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedin" flat >twitter</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedin" flat >google</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedin" flat >twitter</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedin" flat  @click.native.stop="isSignup=!isSignup">SignUp</v-btn>
      <v-btn v-if="!$store.state.isUserLoggedin" flat  @click.native.stop="isSignin=!isSignin">SignIn</v-btn>
      <v-btn v-if="$store.state.isUserLoggedin"  flat @click="logout">logout</v-btn>
      <v-btn icon @click.stop="drawerRight =!drawerRight"><v-icon>exit_to_app</v-icon></v-btn>
    </v-toolbar>
    <!--signup dialog-->
    <v-dialog v-model="isSignup" max-width="500px">
      <v-card>
      <v-card-text>
        <v-text-field type="email" name="email" v-model="email" placeholder="email" />
        <v-text-field type="password" name="password" v-model="password" placeholder="password" />
        <v-text-field type="username" name="username" v-model="username" placeholder="username" />
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
  </v-app>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      username: '',
      password: '',
      email: '',
      success: '',
      msg: '',
      drawerLeft: false,
      drawerRight: false,
      isSignup: false,
      isSignin: false,
      items: [
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          title: 'More',
          model: false,
          children: [
            { title: 'Import' },
            { title: 'Export' },
            { title: 'Print' },
            { title: 'Undo changes' },
            { title: 'Other contacts' }
          ]
        }
      ]
    }
  },
  methods: {
    async local_signup () {
      const response = await AuthenticationService.local_signup({
        email: this.email,
        password: this.password,
        username: this.username
      })
      this.success = response.data.success
      this.msg = response.data.message
      if (this.success) {
        this.msg = response.data.message
        console.log('signup success! ', this.msg)
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
    }
  },
  props: {
    source: String
  }
}
</script>

<style scoped>

</style>
