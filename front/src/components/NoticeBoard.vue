<template>
<v-app class='noticeboard'>
  <v-content>
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
      board_content: null,
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
  async mounted () {
    const boardId = this.$store.state.route.params.boardId
    const data = await NoticeBoardService.show(boardId)
    this.baseurl = '#/' + boardId
    console.log(data)
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
