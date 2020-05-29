import Vue from 'vue'
import Router from 'vue-router'
import home from '@modules/home/router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...home
  ]
})
