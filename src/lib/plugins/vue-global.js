import Vue from 'vue'
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog'

export function init () {
  Vue.prototype.$goRoute = function (pageRoute, openInNewTab = false) {
    if (openInNewTab) {
      let href = this.$router.resolve(pageRoute).href
      window.open(href, '_blank')
    } else {
      if (pageRoute) {
        this.$router.push(pageRoute)
      }
    }
  }
  Vue.prototype.$dialog = {
    confirm: Confirm,
    alert: Alert,
    toast: Toast,
    notify: Notify,
    loading: Loading
  }
}
