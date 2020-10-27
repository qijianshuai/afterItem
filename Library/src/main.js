import Vue from 'vue'
import App from './App.vue'
import '@/utils/element'
import router from './router/index'
import store from './store'
Vue.config.productionTip = false

new Vue({
  //绑定全局事件总线
  beforeMount() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store
}).$mount('#app')
