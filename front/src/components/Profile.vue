<template>
  <v-layout column>
    <v-flex xs6 offset offset-xs3>
      <div v-for="song in songs" :key="song.title">
        {{song.title}}
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
import SongsService from '../services/SongsService'
export default {
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    // Do a request backend service
    this.songs = await SongsService.index()
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
