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
         <div>
        <v-alert id="step1_alert" type='error' :value="step1_alert" icon="warning" transition="slide-y-transition">User Information Required Fulled. </v-alert>
      </div>
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
      <div>
        <v-alert id="step2_alert" type='error' :value="step2_alert" icon="warning" transition="slide-y-transition">not match authentication code or server error. </v-alert>
      </div>
       <div class="row">
    <div class="col-md-12">
      <div class="jumbotron text-center">
        <h2>Enter the verification code</h2>
          <div class="col-md-12 col-sm-12">
            <div class="form-group form-group-lg">
              <input type="text" :disable="isEmailConfirm" v-model="authenticationCode" placeholder="Enter verification code" class="form-control col-md-6 col-sm-6 col-sm-offset-2" name="verifyCode" required>
              <label id='emailTimer'></label>
              <v-btn color="warning" class="btn-primary col-md-6 col-sm-2" :disabled="emailBtnCondition" @click="emailValidation('sendToEmail')">Request </v-btn> <br />
              <v-btn color="success" class="btn-primary col-md-6 col-sm-2" :disabled="isEmailConfirm" @click="emailValidation('confirmCode')">veritication</v-btn>
              <v-btn color="primary" class="btn-primary col-md-6 col-sm-2" :disabled="!isEmailConfirm" @click="local_signup()">Continue</v-btn>
              <v-btn color="error" id="step2_cancel" class="btn-primary col-md-6 col-sm-2" @click="modalCancel()">Cancel</v-btn>
            </div>
          </div>
      </div>
    </div>
       </div>
      </v-stepper-content>

<!--step 3 -->
      <v-stepper-content step="3">

        <div>
          <v-alert type='error' :value="step3_alert" icon="warning" transition="slide-y-transition">User Information Required Fulled. </v-alert>
        </div>
        <div class="jumbotron text-center">
          <div class="row text-center">
            <div class="col-sm-12 col-sm-offset-3">
              <br> <h1 style="color:#0fad00">Success</h1>
              <!-- <img src="http://osmhotels.com//assets/check-true.jpg"> -->
              <p style="font-size:20px;color:#5C5C5C;">Thank you for register my page. <br />
                After login you can enjoy my page </p>
              <v-btn color="success" @click.native="step(3)">Log In</v-btn>
            </div>
          </div>
        </div>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import AuthenticationService from '../services/AuthenticationService'
export default {
  data () {
    return {
      step1_alert: false,
      step2_alert: false,
      step3_alert: false,
      emailMessage: '',
      nameMessage: '',
      passwordMessage: '',
      confirmPassMessage: '',
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      res: null,
      e1: 1, // current step
      sex: 'male',
      sexOptions: [
        { text: 'Male', value: 'male' },
        { text: 'Female', value: 'female' }
      ],
      // step 2
      authenticationCode: '',
      timerId: null,
      isEmailConfirm: false,
      emailBtnCondition: false,
      isSignUp: false
      // step 3
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
      if (response.data.success) {
        this.isSignUp = true
        this.step(2)
        console.log('token! ', response.data.token)
      } else {
        document.getElementById('step2_alert').classList.remove('success')
        document.getElementById('step2_alert').classList.add('error')
        document.getElementById('step2_alert').firstChild.innerHTML = 'warning'
        document.getElementById('step2_alert').innerHTML = 'error not save server'
        console.log('signup fail! ', response.data.message)
      }
    },
    modalCancel () {
      // step 1 clear
      this.emailMessage = ''
      this.passwordMessage = ''
      this.confirmPassMessage = ''
      this.nameMessage = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.username = ''
      this.sex = 'male'
      this.e1 = 1
      // step 2 clear
      this.authenticationCode = ''
      this.isEmailConfirm = false
      clearInterval(this.timerId)
      document.getElementById('emailTimer').innerHTML = ''
      this.emailBtnCondition = false
      this.isSignUp = false
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
            this.step1_alert = true
            setTimeout(this.triggerAlert, 1000 * 3)
          }
          break
        case 2:
          // email confirm
          if (this.isEmailConfirm === true && this.isSignUp === true) {
            this.e1 = 3
          } else {
            this.step2_alert = true
            setTimeout(this.triggerAlert, 1000 * 3)
          }
          break
        case 3:
          // sign up success -> modal dialog close
          this.modalCancel()
          break
        default:
      }
    },
    triggerAlert () {
      this.step1_alert = false
      this.step2_alert = false
    },
    // step 2
    async emailValidation (state) {
      if (state === 'sendToEmail') {
        this.emailBtnCondition = true // 이메일로 인증번호 보내기 버튼 비활성화
        const response = await AuthenticationService.local_email_validation({
          email: this.email
        }, state)
        if (response.data.success === true) {
          document.getElementById('step2_alert').classList.remove('error')
          document.getElementById('step2_alert').classList.add('success')
          document.getElementById('step2_alert').firstChild.innerHTML = 'info' // success icon load problem
          document.getElementById('step2_alert').lastChild.innerHTML = 'success authentication code send to email'
          this.timerStart()
          // 보내기 성공 alert , timer 3분 시작
        } else {
          // 이메일 보내기 실패 오류 메세지
          document.getElementById('step2_alert').classList.remove('success')
          document.getElementById('step2_alert').classList.add('error')
          document.getElementById('step2_alert').firstChild.innerHTML = 'warning'
          document.getElementById('step2_alert').innerHTML = 'error not to send authentication code to email'
          this.emailBtnCondition = false // 이메일로 인증번호 보내기 실패시 버튼 다시 활성화
        }
      } else if (state === 'confirmCode') {
        const response = await AuthenticationService.local_email_validation({
          email: this.email,
          authenticationCode: this.authenticationCode
        }, state)
        if (response.data.success === true) {
          // 인증 성공 다음 step open
          document.getElementById('step2_alert').classList.remove('error')
          document.getElementById('step2_alert').classList.add('success')
          document.getElementById('step2_alert').firstChild.innerHTML = 'info' // success icon load problem
          document.getElementById('step2_alert').lastChild.innerHTML = 'success match to authenticaiton code'
          clearInterval(this.timerId)
          document.getElementById('emailTimer').innerHTML = ''
          console.log('success authentication code')
          this.isEmailConfirm = true
        } else {
          // 일치하지 않거나 오류 메세지
          document.getElementById('step2_alert').classList.remove('success')
          document.getElementById('step2_alert').classList.add('error')
          document.getElementById('step2_alert').firstChild.innerHTML = 'warning'
          document.getElementById('step2_alert').lastChild.innerHTML = 'error not to match authentcation code'
        }
      }
      this.step(2)
    },
    timerStart () {
      var time = 180
      var timer = document.getElementById('emailTimer')
      this.timerId = window.setInterval(function () {
        if (time >= 0) {
          timer.innerHTML = setMinSec(time)
          time--
        } else {
          clearInterval(this.timerId)
          alert('expired time!')
          window.location.reload()
        }
      }, 1000)
      function setMinSec (time) {
        var hour = Math.floor(time / 3600)
        var min = Math.floor((time - (hour * 3600)) / 60)
        var sec = time - (hour * 3600) - (min * 60)
        if (min < 10) {
          min = '0' + min
        }
        if (sec < 10) {
          sec = '0' + sec
        }
        return (min + ':' + sec)
      }
    }
  },
  watch: {
    // user imformation validation checked
    email: function (val) {
      var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
      if (val !== '' && regex.test(val) === false) {
        this.emailMessage = 'email형식에 맞지 않습니다.'
      } else {
        this.emailMessage = ''
      }
    },
    username: function (val) {
      var regex = /^[a-zA-Z]{2,10}[a-zA-Z]{2,10}$/
      if (val !== '' && regex.test(val) === false) {
        this.nameMessage = 'name형식에 맞지않습니다. 영문만 사용하여 2~10자이내'
      } else {
        this.nameMessage = ''
      }
    },
    password: function (val) {
      var regex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/
      if (val !== '' && regex.test(val) === false) {
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
/* step2 email vertification form design */
#emailTimer {
  padding-left: inherit;
}
.jumbotron.text-center {
    height: 25em;
}

input.form-control.col-md-6 {
    margin-right: 0em;
    display: inline;
}

div#notes {
    margin-top: 2%;
    width: 98%;
    margin-left: 1%;
}

/* step3 register success form design */
</style>
