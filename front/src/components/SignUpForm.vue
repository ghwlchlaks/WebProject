<template>

 <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step step="1" :complete="e1 > 1">Input Imformation</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="2" :complete="e1 > 2">Email confirm</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">Login success</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
<!--step 1 -->
      <v-stepper-content step="1">
        <form>
        <div class="form-group">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" id="email" v-model="email" required placeholder="Enter your Email"/>
								</div>
                {{emailMessage}}
						</div>
        	<div class="form-group">
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" id="name" v-model="username" required placeholder="Enter your Name"/>
								</div>
							</div>
              {{nameMessage}}
						</div>
						<div class="form-group">
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" autocomplete class="form-control" id="password" v-model="password" required placeholder="Enter your Password" />
								</div>
							</div>
              {{passwordMessage}}
						</div>
						<div class="form-group">
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" autocomplete class="form-control" id="confirm" v-model="confirmPassword" required placeholder="Confirm your Password" />
								</div>
							</div>
              {{confirmPassMessage}}
						</div>
            </form>
            <b-form-group class="sexForm">
              <b-form-radio-group id="radios1" v-model="sex" :options="sexOptions">
              </b-form-radio-group>
            </b-form-group>
        <div class="signupBtn">
        <v-btn large color="primary" @click.native="step(1)">Continue</v-btn> <!--e1 = 2-->
        <v-btn large color="error" @click="modalCancel()">Cancel</v-btn>
        </div>
      </v-stepper-content>

<!--step 2 -->
      <v-stepper-content step="2">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click.native="step(2)">Continue</v-btn>
        <v-btn flat @click="modalCancel()">Cancel</v-btn>
      </v-stepper-content>

<!--step 3 -->
      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click.native="step(3)">Continue</v-btn>
        <v-btn flat @click="modalCancel()">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>


</template>
<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      emailMessage: '',
      nameMessage: '',
      passwordMessage: '',
      confirmPassMessage: '',
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      res: null,
      success: null,
      msg: null,
      e1: 0,
      sex: 'male',
      sexOptions: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ]
    }
  },
  methods: {
    async local_signup () {
      const response = await AuthenticationService.local_signup({
        email: this.email,
        password: this.password,
        username: this.username,
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
    modalCancel () {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.username = ''
      this.sex = 'male'
      this.e1 = 1
      this.$store.dispatch('setSignUp', !this.$store.state.isSignUp)
    },
    step (stepNum) {
      switch (stepNum) {
        case 1:
          // user information total vaildation checked
          if (this.email !== '' && this.username !== '' && this.password !== '' && this.confirmPassword !== '' &&
          this.emailMessage === '' && this.nameMessage === '' && this.passwordMessage === '' && this.confirmPassMessage === '') {
            this.e1 = 2
          } else {
            // error message output
            console.log('error')
          }
          break
        case 2:
          // email confirm
          this.e1 = 3
          break
        case 3:
          // sign up success -> modal dialog close
          this.e1 = 1
          break
        default:
      }
    }
  },
  watch: {
    // user imformation validation checked
    email: function (val) {
      var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
      if (val !== null && regex.test(val) === false) {
        this.emailMessage = 'email형식에 맞지 않습니다.'
      } else {
        this.emailMessage = ''
      }
    },
    username: function (val) {
      var regex = /^[a-zA-Z]{2,10}[a-zA-Z]{2,10}$/
      if (val !== null && regex.test(val) === false) {
        this.nameMessage = 'name형식에 맞지않습니다. 영문만 사용하여 2~10자이내'
      } else {
        this.nameMessage = ''
      }
    },
    password: function (val) {
      var regex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/
      if (val !== null && regex.test(val) === false) {
        this.passwordMessage = 'password형식에 맞지않습니다. 영문 숫자를 혼합하여 6~20자 이내'
      } else {
        this.passwordMessage = ''
      }
    },
    confirmPassword: function (val) {
      if (this.password !== val) {
        this.confirmPassMessage = 'password확인란과 password란이 일치하지 않습니다'
      } else {
        this.confirmPassMessage = ''
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main{
 	margin-top: 50px;
}

h1.title { 
	font-size: 50px;
	font-family: 'Passion One', cursive; 
	font-weight: 400; 
}

hr{
	width: 10%;
	color: #fff;
}

.form-group{
	/* margin-bottom: 15px; */
  margin-bottom: 10px;
  /* padding-top: 10px; */
  padding-top: 10px;
  margin-left: 2px;
  margin-right: 2px;
}

label{
	margin-bottom: 10px;
}

input,
input::-webkit-input-placeholder {
    font-size: 15px;
    padding-top: 3px;
}

.main-login{
 	background-color: #fff;
    /* shadows and rounded borders */
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);

}
.input-group {
  margin-bottom: 10px
}
.main-center{
 	margin-top: 30px;
 	margin: 0 auto;
 	max-width: 330px;
    padding: 40px 40px;

}

.login-button{
	margin-top: 5px;
}

.login-register{
	font-size: 11px;
	text-align: center;
}
.sexForm{
  margin-left: 30%;
}
.custom-control {
  margin: 10%
}
#radios1 {
  margin-left: 10%
}
/* signup button css */
.signupBtn {
  align-content: center;
  margin-left: 23%;

}
</style>
