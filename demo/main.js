import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import AdaptiveCards from '../src/index'

Vue.use(VueRouter)
Vue.use(AdaptiveCards)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Installation',
      component: App
    }
  ]
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  render: h => h(App)
})
