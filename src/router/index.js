import Vue from 'vue'
import Router from 'vue-router'
import index from '../pages/index'
import wander from '../pages/wander'

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
    }
  ]
})
