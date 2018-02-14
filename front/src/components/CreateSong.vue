<template>
  <v-layout>
    <v-flex xs4>
      <div>
        <v-text-field required :rules="[rules.required]" label="Title" v-model="song.title"></v-text-field>
        <v-text-field label="Image URL" v-model="song.image"></v-text-field>
        <v-text-field label="YouTube ID" v-model="song.videolink"></v-text-field>
        <v-btn dark class="cyan" @click="create">create song</v-btn>
      </div>
      <div class=".danger-alert" v-if="error">This is a success alert.{{error}}</div>
    </v-flex>
  </v-layout>
</template>

<script>
import SongsService from '../services/SongsService'
export default {
  data () {
    return {
      error: null,
      song: {
        title: null,
        image: null,
        videolink: null
      },
      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  async mounted () {
    // Do a request backend service
  },
  methods: {
    async create () {
      this.error = null
      const areAllFieldsFilledIn = Object
        .keys(this.song)
        .every(key => !!this.song[key])
      if (!areAllFieldsFilledIn) {
        this.error = 'please fill in all the required field'
        return
      }
      try {
        await SongsService.post(this.song)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
