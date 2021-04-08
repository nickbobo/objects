import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import viewer from '@/views/viewer'
import exhibitor from '@/views/exhibitor'
import bannedWord from '@/views/bannedWord'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
      path: '/viewer',
      name: 'viewer',
      component: viewer
    },{
      path: '/exhibitor',
      name: 'exhibitor',
      component: exhibitor
    },{
      path: '/bannedWord',
      name: 'bannedWord',
      component: bannedWord
    }
  ]
})
