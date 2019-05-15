import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'index',
      component: () => import(/* webpackChunkName: "about" */ './views/index.vue')
    },
    {
      path: '/test',
      component: () => import(/* webpackChunkName: "about" */ './views/test.vue')
    },
    {
      path: '/watermelonVideo',
      name: 'watermelonVideo',
      component: () => import(/* webpackChunkName: "about" */ './views/watermelon-video.vue')
    },
    {
      path: '/smallVideo',
      name: 'smallVideo',
      component: () => import(/* webpackChunkName: "about" */ './views/small-video.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "about" */ './views/search.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import(/* webpackChunkName: "about" */ './views/me.vue')
    },
    {
      path: '/*',
      redirect: '/index'
    }
  ]
})
