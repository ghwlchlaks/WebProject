<template>
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
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
