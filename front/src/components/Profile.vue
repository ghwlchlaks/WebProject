<template>
  <v-layout column>
    <v-flex xs6 offset offset-xs3>
      <router-link :to="{name: 'Songs-create'}">
        <v-btn  @click="navigateTo({name: 'Songs-create'})" fab class="cyan accent-2" light middle>
          <v-icon>add</v-icon>
        </v-btn>
      </router-link>
      <div v-for="song in songs" :key="song.title">
        <v-layout>
          <v-flex xs6>
            <div class="song-title">
               {{song.title}}
            </div>
          </v-flex>
           <v-flex xs6>
            <div class="song-title">
               {{song.videolink}}
            </div>
            <v-btn class="cyan" @click="navigateTo({name:'Song',params: {songId:song.title}})">
              View
            </v-btn>
          </v-flex>
           <v-flex xs6>
             <img class="image" :src="song.image">
          </v-flex>
        </v-layout>
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
    this.songs = (await SongsService.index()).data
    console.log(this.songs)
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.image {
  width: 70%;
  margin: 0 auto;
}
</style>
