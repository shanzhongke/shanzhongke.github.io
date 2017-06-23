import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import wander from '../pages/wander'
import martial from '../pages/martial'
import article from '../pages/article'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/wander',
      name: 'wander',
      component: wander
    },
    {
      path: '/wander/:id',
      component: article
    },
    {
      path: '/martial',
      name: 'martial',
      component: martial
    },
    {
      path: '/martial/:id',
      component: article
    }
  ]
})
