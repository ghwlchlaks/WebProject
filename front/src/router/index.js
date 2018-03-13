import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NoticeBoard from '@/components/NoticeBoard'
import AddBoard from '@/components/AddBoard'
import ViewContent from '@/components/ViewContent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/board/:boardId/:index',
      name: 'NoticeBoard',
      component: NoticeBoard
    },
    {
      path: '/board/:boardId/:stateBoard',
      name: 'AddBoard',
      component: AddBoard
    },
    {
      path: '/board/:boardId/:stateBoard/:index',
      name: 'ViewContent',
      component: ViewContent
    }
  ]
})
