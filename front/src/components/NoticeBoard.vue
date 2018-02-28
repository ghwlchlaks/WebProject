<template>
<v-app class='noticeboard'>
  <v-content>
  <v-alert type='success' :value='true'>{{board_name}}</v-alert>
  <b-table class='cyan' striped hover :items="items" @row-clicked="test"></b-table>
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
      items: [{
        value: false,
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%'
      },
      {
        value: false,
        name: 'Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%'
      }
      ]
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
      if (val !== 1) {
        this.getData(this.board_name, val)
      }
    }
  },
  async mounted () {
    const boardId = this.$store.state.route.params.boardId
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
    test (record, index) {
      console.log('record : ', record)
      console.log('index : ', index)
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
      console.log('boardId ' + boardId + 'index ' + index)
      const data = await NoticeBoardService.show(boardId, index)
      console.log(data)
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