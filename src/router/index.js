import Vue from 'vue'
import Router from 'vue-router'
import home from '@modules/home/router'
import compDoc from '@modules/comp-doc/router'
import cosmos from '@modules/cosmos/router'
import tool from '@modules/tool/router'
import user from '@modules/user/router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...home,
    ...compDoc,
    ...cosmos,
    ...tool,
    ...user
  ]
})
