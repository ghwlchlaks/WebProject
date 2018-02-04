<template>
<v-app id="inspire">
  <v-navigation-drawer fixed v-model="drawerRight" :stateless="right" right clipped app>
    <v-list dense>
      <v-list-tile @click.stop="right = !right">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar color="blue-grey" dark fixed app clipped-right>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    <v-toolbar-title>Toolbar</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-text-field type="username" name="username" v-model="username" placeholder="username" />
    <v-text-field type="password" name="password" v-model="password" placeholder="password" />
    <v-btn class="cyan" @click="signip">SignIp</v-btn>
    <v-btn class="cyan" @click="signup">SignUp</v-btn>
    <v-btn icon @click.stop="drawerRight =!drawerRight"><v-icon>exit_to_app</v-icon></v-btn>
  </v-toolbar>
  <v-navigation-drawer fixed v-model="drawer" :stateless="left" app>
    <v-list dense>
      <v-list-tile @click.stop="left = !left">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Open Temporary Drawer</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-navigation-drawer temporary v-model="left" fixed></v-navigation-drawer>
  <v-content>
    <v-container fluid fill-height>
      <v-layout justify-center align-center>
        <v-tooltip right>
        </v-tooltip>
      </v-layout>
    </v-container>
  </v-content>
  <v-navigation-drawer right temporary v-model="right" fixed></v-navigation-drawer>
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
      drawer: null,
      drawerRight: null,
      right: null,
      left: null
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
    signup () {
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
