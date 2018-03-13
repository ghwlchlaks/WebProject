<template>
<v-app class='content'>
  <v-content>
  <v-alert type='success' :value='true'>{{board_name}}</v-alert>
  <b-table class='cyan' striped hover :items="items" @row-clicked="rowClick"></b-table>
  <b-pagination-nav class='pagination' :number-of-pages=total_pages_number :link-gen="linkGen" v-model="currentPage"></b-pagination-nav><br /><br />
  <v-btn id='addBtn' dark @click="AddContents({name:'AddBoard', params: {stateBoard:'Add'}})">Add</v-btn>
  </v-content>
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
      items: [{}],
      total_pages_number: 0
    }
  },
  watch: {
    // table number initilze and routing when board changed
    '$route.params.boardId': async function (boardId) {
      this.initialize(boardId)
      this.getData(boardId, 1)
      this.total_page(boardId)
    },
    currentPage (val) {
      // '$route.params.boardId overap to function called when var === 1'
      this.getData(this.board_name, val)
      // console.log(val)
    }
    // '$route.params.index': function (index) {
    //   this.getData(this.board_name, index)
    //   // console.log(index)
    // }
  },
  async mounted () {
    const boardId = this.$store.state.route.params.boardId
    this.getData(boardId, 1)
    this.initialize(boardId)
    this.total_page(boardId)
  },
  methods: {
    // get total page number
    async total_page (boardId) {
      const response = await NoticeBoardService.totalPages(boardId)
      if (response.data.success === true) {
        this.total_pages_number = Math.ceil(response.data.message / 10)
      }
    },
    // Add content
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
    // table pagination button click event
    linkGen (pageNum) {
      // console.log(pageNum)
      return '/' + this.baseurl + '/' + pageNum
    },
    // board initialize
    initialize (boardId) {
      this.board_name = boardId
      this.baseurl = '#/board/' + boardId
      this.currentPage = 1
      this.linkGen(1)
    },
    // get data that match to pagination number
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
#addBtn {
  width: 30%;
  margin-left: 35%;
}
.pagination {
  margin-left: 45%
}
</style>