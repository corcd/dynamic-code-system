import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import ProLayout from '@ant-design-vue/pro-layout'
import TreeView from "vue-json-tree-view"

import 'ant-design-vue/dist/antd.css'
// import './utils/lazy_use'
import './permission'
import './global.less'

Vue.config.productionTip = false

Vue.use(Antd)
Vue.component('pro-layout', ProLayout)
Vue.use(TreeView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
