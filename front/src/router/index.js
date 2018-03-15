import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import NoticeBoard from '@/components/NoticeBoard'
import AddBoard from '@/components/AddBoard'
import ViewContent from '@/components/ViewContent'

Vue.use(Router)

export default new Router({
  routes: [
    // main page
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    // board view
    {
      path: '/board/:boardId/:index',
      name: 'NoticeBoard',
      component: NoticeBoard
    },
    // board add
    {
      path: '/board/:boardId/:stateBoard',
      name: 'AddBoard',
      component: AddBoard
    },
    // board contents view
    {
      path: '/board/:boardId/:stateBoard/:index',
      name: 'ViewContent',
      component: ViewContent
    }
  ]
})
