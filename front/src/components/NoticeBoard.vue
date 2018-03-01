<template>
<v-app class='noticeboard'>
  <v-content>
  <v-alert type='success' :value='true'>{{board_name}}</v-alert>
  <b-table class='cyan' striped hover :items="items" @row-clicked="rowClick"></b-table>
  <b-pagination-nav class='pagination' :number-of-pages="5" :link-gen="linkGen" v-model="currentPage"></b-pagination-nav>
  </v-content>
  <v-btn dark  @click="AddContents({name:'AddBoard', params: {stateBoard:'Add'}})">Add</v-btn>
</v-app>
</template>
<script>
import NoticeBoardService from '@/services/NoticeBoardService'
export default {
  data () {
    return {
      board_name: null,
      currentPage: 1,
      baseurl: null,
      items: [{}]
    }
  },
  watch: {
    // table number initilze and routing when board changed
    '$route.params.boardId': async function (boardId) {
      this.initialize(boardId)
      this.getData(boardId, 1)
    },
    currentPage (val) {
      // '$route.params.boardId overap to function called when var === 1'
      this.getData(this.board_name, val)
    }
  },
  async mounted () {
    const boardId = this.$store.state.route.params.boardId
    this.getData(boardId, 1)
    this.initialize(boardId)
  },
  methods: {
    AddContents (route) {
      if (!this.$store.state.isUserLoggedin) {
        alert('로그인후 이용가능합니다.')
        this.$router.push('/')
        return
      }
      this.$router.push(route)
    },
    // event handler when table rowcliked
    rowClick (record, index) {
      var routerData = {name: 'ViewContent', params: {boardId: this.board_name, stateBoard: 'View', index: record.INDEX}}
      this.$router.push(routerData)
    },
    linkGen (pageNum) {
      return '/' + this.baseurl + '/' + pageNum
    },
    initialize (boardId) {
      this.board_name = boardId
      this.baseurl = '#/' + boardId
      this.currentPage = 1
      this.linkGen(1)
    },
    async getData (boardId, index) {
      const boardData = await NoticeBoardService.show(boardId, index)
      var indexBoardId = boardId + '_id'
      var changedData = [{}]
      for (var i = 0; i < boardData.data.length; i++) {
        // var jsonString = JSON.stringify(boardData.data[i])  to string from json
        // var json = JSON.parse(jsonString)  to json from string
        changedData[i] = {
          // 'boardId'_id index access
          'INDEX': boardData.data[i][indexBoardId],
          'TiTLE': boardData.data[i].title
        }
      }
      this.items = changedData
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.noticeboard {
  margin: 1%;
}
.pagination {
  margin-left: 45%
}
</style>