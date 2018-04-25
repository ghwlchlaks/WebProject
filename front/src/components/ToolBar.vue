<template>
  <v-app>
    <!--Top ToolBar-->
    <v-toolbar color="grey lighten-5" fixed app><!-- clipped-left -->
      <v-toolbar-side-icon color="grey lighten-4" @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat class="display-1" color="grey darken-3" @click="goHome()">Title</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <!-- <v-btn color="grey darken-3" v-if="!$store.state.isUserLoggedin" flat @click="socialLogin('google')">google</v-btn>
        <v-btn color="grey darken-3" v-if="!$store.state.isUserLoggedin" flat @click="socialLogin('facebook')">facebook</v-btn> -->
        <v-btn color="grey darken-3" v-if="!$store.state.isUserLoggedin" flat @click.native.stop="isSignup=!isSignup">SignUp</v-btn>
        <v-btn color="grey darken-3" v-if="!$store.state.isUserLoggedin" flat @click.native.stop="isSignin=!isSignin">SignIn</v-btn>
        <v-btn color="grey darken-3" v-if="$store.state.isUserLoggedin"  flat @click="logout">logout</v-btn>
      </v-toolbar-items>
      <v-btn color="grey lighten-5" icon @click.stop="drawerRight =!drawerRight"><v-icon>exit_to_app</v-icon></v-btn>
    </v-toolbar>
     <!-- Left drawer page -->
    <v-navigation-drawer dark fixed v-model="drawerLeft" app width=230> <!--cliped-->
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
            <v-list-tile @click="goToVoiceChat({name:'VoiceChattingBoard', params: {boardId:'voice', index:1}})">
                <v-list-tile-content>
                  <v-list-tile-title>VoiceChatting Room</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-icon>directions_run</v-icon>
                </v-list-tile-action>
              </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <!--signup dialog-->
    <v-dialog v-model="isSignup" persistent max-width="700px">
      <v-card>
        <sign-up-form />
      </v-card>
    </v-dialog>
     <!-- signin dialog-->
    <v-dialog v-model="isSignin" max-width="400px">
      <v-card>
        <login-form />
      </v-card>
    </v-dialog>
    <v-footer class="pa-3" app clipped>
    <div>&copy; {{ new Date().getFullYear() }}</div>
  </v-footer>
  </v-app>
</template>
<script>
import LoginForm from './LoginForm.vue'
import SignUpForm from './SignUpForm.vue'
// import axios from 'axios'
export default {
  data () {
    return {
      success: '',
      msg: '',
      data: '',
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
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // redirect home page
      this.$router.push('/')
    },
    subItemClick (subTitle) {
      this.$router.push(subTitle)
    },
    goToVoiceChat (subTitle) {
      this.$router.push(subTitle)
    },
    goHome () {
      this.$router.push('/')
    }
  },
  props: {
    source: String
  },
  watch: {
    '$store.state.isSignUp': function () {
      this.isSignup = !this.isSignup
    }
  },
  components: {LoginForm, SignUpForm}
}
</script>
<style scoped>
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 30px;
  white-space: nowrap;
  font-size: 16px;
  color: #FFF;

  padding-right: 20px;
    height: 35px;
    background: none;
    display: block;
    background-size: 20px 50px;
    background-position: right center;
    background-repeat: no-repeat;
    border-radius: 4px;
    color: white;
    font-family:"Merriweather Sans", sans-serif;
    margin-bottom: 2px;
    width: 90%;
    border-bottom: 2px solid transparent;
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
    box-shadow: 0 4px 2px -2px gray;
    text-shadow: rgba(0, 0, 0, .5) -1px -1px 0;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Facebook */
.loginBtn--facebook {
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}


/* Google */
.loginBtn--google {
  /*font-family: "Roboto", Roboto, arial, sans-serif;*/
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}

</style>

