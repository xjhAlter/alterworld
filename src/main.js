// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import awui from './components/common'
import '@assets/css/common.scss'
import '@assets/css/iconfont.scss'
import '@assets/js/common.js'
import '@assets/js/my-lodash.js'
import '@assets/js/my-heart.js'

import ElementUi from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(awui)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
