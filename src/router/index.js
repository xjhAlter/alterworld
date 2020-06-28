import Vue from 'vue'
import Router from 'vue-router'
import home from '@modules/home/router'
import compDoc from '@modules/comp-doc/router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...home,
    ...compDoc
  ]
})
