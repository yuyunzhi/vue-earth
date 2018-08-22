import Vue from 'vue'
import Router from 'vue-router'
import Earth from '@/components/Earth.vue'
import Demo from '@/components/Demo.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Demo',
      component: Demo
    }
  ]
})
