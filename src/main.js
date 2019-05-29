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
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
Vue.use(VueVideoPlayer/* {
  options: global default options,
  events: global videojs events
} */)
//vue-socket.io
// import VueSocketio from 'vue-socket.io'
// import socketio from 'socket.io-client'
// Vue.use(VueSocketio, socketio('http://socketserver.com:1923'), store)//xxx填后台给的socket地址
// 全局配置
require('@/lib/plugins/vue-global').init()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
