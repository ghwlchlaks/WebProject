<template>
<v-app>
  <v-content class='content'>
    <v-text-field label="title" v-model="saveData.title"></v-text-field>
    <br>
    <v-text-field label="content" v-model="saveData.content"></v-text-field>
    <br>
    <v-btn dark  @click="SaveContents">save</v-btn>
  </v-content>
</v-app>
</template>
<script>
import NoticeBoardService from '@/services/NoticeBoardService'
export default {
  data () {
    return {
      boardId: null,
      stateBoard: null,
      saveData: {
        title: null,
        content: null,
        username: 'test'
      }
    }
  },
  async mounted () {
    this.boardId = this.$store.state.route.params.boardId
    this.stateBoard = this.$store.state.route.params.stateBoard
    // const data = await NoticeBoardService.show(boardId)
    console.log('this before board id : ', this.boardId)
    console.log('this before current id : ', this.stateBoard)
  },
  methods: {
    async SaveContents () {
      const responsedata = await NoticeBoardService.add(this.boardId, this.stateBoard, this.saveData)
      if (responsedata.data.success === true) {
        alert('게시물이 등록 되었습니다.')
      } else {
        alert('게시물 등록에 실패하였습니다.')
      }
      this.$router.push(`/board/${this.boardId}/1`)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
