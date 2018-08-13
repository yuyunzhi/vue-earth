import Vue from 'vue'
import Router from 'vue-router'
import earth from '@/components/earth.vue'
//import demo from '@/components/demo.vue'
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
