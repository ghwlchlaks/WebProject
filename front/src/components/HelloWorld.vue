<template>
<div>
  <input type="email" name="email" placeholder="email" /><br />
  <input type="password" name="password" placeholder="password" /><br />
  <button @click="SignIn">Sign In</button>
  <button @click="SignUp">Sign Up</button>
</div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    SignIn () {

    },
    SignUp () {
      this.$router.push('/register')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
