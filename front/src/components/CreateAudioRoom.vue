<template>
  <div class="container" id="createRoomForm">
    <div class="omb_login">
    	<h3 class="omb_authTitle">CreateRoom</h3>

		  <div class="row omb_row-sm-offset-2">
			  <div class="col-sm-12">	
			    <form class="omb_loginForm">
					  <div class="input-group">
						  <span class="input-group-addon"><i class="fa fa-user"></i></span>
						  <input type="text" v-model="roomname" class="form-control" name="roomname" placeholder="Room Name">
					  </div>
					  <span class="help-block"></span>

            
					  <div class="input-group">
						  <span class="input-group-addon"><i class="fa fa-lock"></i></span>
						  <input type="password" id='roompass' v-model="roompass" class="form-control" name="roompass" placeholder="Room Password" disabled='disabled'>
              <div class="col-sm-2">
                <v-checkbox v-model="enabledRoomPass"></v-checkbox>
              </div>
					  </div>
        
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs1>
                </v-flex>
                <v-flex xs10>
                  <v-select
                      :items="items"
                      v-model="e2"
                      label="Select people number"
                      class="input-group--focused"
                      item-value="text"
                    ></v-select>
                </v-flex>
              </v-layout>
            </v-container>

            <div id="createBtn">
					    <button class="btn-lg btn-success btn-block" @click="local_signIn()">Create</button>
            </div>
				  </form>
			  </div>
    	</div>
	  </div>
  </div>
</template>
<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      roomname: null,
      roompass: null,
      success: null,
      msg: null,
      e2: null,
      items: [
        {text: '1'},
        {text: '2'}
      ],
      enabledRoomPass: false
    }
  },
  watch: {
    enabledRoomPass (val) {
      if (val === true) {
        document.getElementById('roompass').removeAttribute('disabled')
      } else {
        document.getElementById('roompass').setAttribute('disabled', 'disabled')
      }
    }
  },
  methods: {
    async local_signIn () {
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
    async socialLogin (provider) {
      this.res = null
      var this_ = this
      var data = null
      // request token 1 -> authentication code 서버로 전달 2
      await this_.$auth.authenticate(provider).then(function (authResponse) {
        if (provider === 'google') {
          console.log('google api called block')
        } else if (provider === 'facebook') {
          console.log('facebook api called block')
        }
        if (authResponse.data.success === true) {
          data = authResponse.data.user
        }
      })
      if (data !== null) {
        this.$store.dispatch('setUser', data)
        this.$store.dispatch('setToken', data.jwtToken)
      } else {
        this.$store.dispatch('setUser', null)
        this.$store.dispatch('setToken', null)
        this.$router.push('/')
      }
      window.location.reload()
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loginBtn {
  margin-top: 10px
}
.input-group-addon {
  margin-right: 1%;
  margin-top: 1%
}

@media (min-width: 33px) {
    .omb_row-sm-offset-3 div:first-child[class*="col-"] {
        margin-left: 25%;
    }
}

.omb_login .omb_authTitle {
    text-align: center;
	line-height: 300%;
}
	
.omb_login .omb_socialButtons a {
	color: white;
	opacity:0.9;
}
.omb_login .omb_socialButtons a:hover {
    color: white;
	opacity:1;    	
}
.omb_login .omb_socialButtons .omb_btn-facebook {background: #3b5998;}
.omb_login .omb_socialButtons .omb_btn-twitter {background: #00aced;}
.omb_login .omb_socialButtons .omb_btn-google {background: #c32f10;}


.omb_login .omb_loginOr {
	position: relative;
	font-size: 1.5em;
	color: #aaa;
	margin-top: 0.5em;
	margin-bottom: 0.5em;
	padding-top: 0.5em;
	padding-bottom: 0.4em;
}
.omb_login .omb_loginOr .omb_hrOr {
	background-color: #cdcdcd;
	height: 1px;
	margin-top: 0px !important;
	margin-bottom: 0px !important;
}
.omb_login .omb_loginOr .omb_spanOr {
	display: block;
	position: absolute;
	left: 50%;
	top: -0.6em;
	margin-left: -1.5em;
	background-color: white;
	width: 3em;
	text-align: center;
}			

.omb_login .omb_loginForm .input-group.i {
	width: 2em;
}
.omb_login .omb_loginForm  .help-block {
    color: red;
}

	
@media (min-width: 33px) {
    .omb_login .omb_forgotPwd {
        text-align: right;
		margin-top:10px;
 	}		
}
</style>
