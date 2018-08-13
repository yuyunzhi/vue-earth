import Vue from 'vue'
import Router from 'vue-router'
import earth from '@/components/earth.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'earth',
      component: earth
    }
  ]
})
