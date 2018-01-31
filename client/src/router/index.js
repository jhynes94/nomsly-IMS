import Vue from 'vue'
import Router from 'vue-router'
import TriviaQuestion from '@/components/TriviaQuestion'
import NewQuestion from '@/components/NewQuestion'
import TV from '@/components/TV'
import nav from '@/components/nav'
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
      path: '/NewQuestion',
      name: 'NewQuestion',
      component: NewQuestion
    },
    {
      path: '/TV',
      name: 'TV',
      component: TV
    },
    {
      path: '/question',
      name: 'TriviaQuestion',
      component: TriviaQuestion
    },
  ] 
})
