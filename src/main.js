import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vue-ydui/dist/ydui.base.css'
// register components
import './components/mint-ui-index'
import './components/ydui-index'
// refreshRem
import '../src/lib/plugins/refresh-rem'
import '../src/assets/iconfont/iconfont.css'
// 全局配置
require('@/lib/plugins/vue-global').init()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
