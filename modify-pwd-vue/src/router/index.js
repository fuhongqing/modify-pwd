import Vue from 'vue'
import Router from 'vue-router'
import Modify from '@/components/Modify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Modify',
      component: Modify,
      meta: {
        keepAlive: true // 需要缓存
      }
    }
  ]
})
