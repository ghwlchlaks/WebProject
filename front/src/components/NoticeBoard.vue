<template>
<v-app>
  <v-btn dark  @click="AddContents({name:'AddBoard', params: {stateBoard:'Add'}})">Add</v-btn>
</v-app>
</template>
<script>
import NoticeBoardService from '@/services/NoticeBoardService'
export default {
  data () {
    return {
      board_content: null
    }
  },
  async mounted () {
    const boardId = this.$store.state.route.params.boardId
    const data = await NoticeBoardService.show(boardId)
    console.log(data)
  },
  methods: {
    AddContents (route) {
      this.$router.push(route)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
