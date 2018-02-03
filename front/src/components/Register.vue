<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense color="grey darken-1" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class='pl-4 pr-4 pt-2 pb-2'>
          <v-text-field type="username" name="username" v-model="username" placeholder="username" />
          <br />
          <v-text-field type="password" name="password" v-model="password" placeholder="password" />
          <br />
          <v-btn class="cyan" @click="signup">Register</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      username: '',
      password: '',
      success: false,
      msg: '',
      valid: true,
      usernameRules: [
        (v) => !!v || 'username is required',
        (v) => v.length <= 3 || 'Name must be less than 3 characters'
      ],
      passRules: [
        (v) => !!v || 'Password is required'
      ]
    }
  },
  // watch: {
  //   email (value) {
  //     console.log('email has changed', value)
  //   }
  // },
  methods: {
    async signup () {
      const response = await AuthenticationService.signup({
        username: this.username,
        password: this.password
      })
      this.success = response.data.success
      this.msg = response.data.msg
      console.log('msg', this.success, this.msg)
      if (this.success) {
        console.log('login success')
      } else {
        this.username = ''
        this.password = ''
        this.success = false
      }
    },
    clear () {
      this.username = ''
      this.password = ''
    }
  }
  // mounted () {
  //   setTimeout(() => {
  //     this.email = 'hello world'
  //   }, 2000)
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toolbar__title{
  color:red
}
</style>
