import Vue from 'vue'
import Router from 'vue-router'
import Manager from '@/components/Manager'
import nomslyClient from '@/components/nomslyClient'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'nomslyClient',
      component: nomslyClient
    },
    {
      path: '/client/:accountNumber',
      name: 'nomslyClient',
      component: nomslyClient
    },
    {
      path: '/Manager',
      name: 'Manager',
      component: Manager
    },
  ] 
})
