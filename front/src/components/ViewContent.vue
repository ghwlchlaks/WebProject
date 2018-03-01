<template>
  <v-app>
    <v-content>
      {{this.$store.state.route.params.boardId}}
      {{this.$store.state.route.params.stateBoard}}
      {{this.$store.state.route.params.index}}
      <div>
        <b-form-textarea id="title" disabled v-model="viewData.title"></b-form-textarea>
      </div>
      <div>
        <b-form-textarea id="content" disabled v-model="viewData.content" :rows="3" :max-rows="6"></b-form-textarea>
      </div>
    </v-content>
  </v-app>
</template>
<script>
import NoticeBoardService from '../services/NoticeBoardService'
export default {
  data () {
    return {
      viewData: {
        title: null,
        content: null
      },
      boardId: null,
      stateBoard: null,
      index: null
    }
  },
  mounted () {
    this.refreshData()
  },
  methods: {
    async refreshData () {
      this.boardId = this.$store.state.route.params.boardId
      this.stateBoard = this.$store.state.route.params.stateBoard
      this.index = this.$store.state.route.params.index
      const response = await NoticeBoardService.contentView(this.boardId, this.stateBoard, this.index)
      console.log(response)
      this.viewData = response.data
      console.log(this.viewData)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
