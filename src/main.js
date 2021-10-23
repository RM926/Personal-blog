import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/share/toast'

import './assets/css/index.js'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
Vue.use(ElementUI);

Vue.use(toast)
Vue.prototype.$bus = new Vue()

import Myheader from '@/components/front/component/MyHeader.vue'
Vue.component('MyHeader',Myheader)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
