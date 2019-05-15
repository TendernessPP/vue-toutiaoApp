import Vue from 'vue'
import { Switch, Cell, Radio, Spinner, Loadmore, Actionsheet, DatetimePicker, Field, Button, Search } from 'mint-ui'

// Vue.component('check-box', require('./checkBox.vue').default)
// mint里的组件使用注册
var mintComponent = {
  'mint-switch': Switch,
  'mint-cell': Cell,
  'mint-radio': Radio,
  'mint-spinner': Spinner,
  'mint-loadmore': Loadmore,
  'mint-actionsheet': Actionsheet,
  'mint-date': DatetimePicker,
  'mint-field': Field,
  'mint-button': Button,
  'mint-search': Search
}
for (let key in mintComponent) {
  Vue.component(key, mintComponent[key])
}
