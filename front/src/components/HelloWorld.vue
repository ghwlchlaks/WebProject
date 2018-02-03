<template>
<div>
  <input type="username" name="username" v-model="username" placeholder="email" /><br />
  <input type="password" name="password" v-model="password" placeholder="password" /><br />
  <button @click="signin">Sign In</button>
  <button @click="signup">Sign Up</button>
</div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      username: '',
      password: ''
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
