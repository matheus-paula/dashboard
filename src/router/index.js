import Vue from 'vue'
import Router from 'vue-router'
import LineStatus from '@/components/LineStatus'
import Page404 from '@/components/Page404'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:linename?',
      alias: '/',
      name: 'LineStatus',
      meta: {
        title: 'Latécoère'
      },
      component: LineStatus,
      props:true
    },
    { 
      path: '*', 
      component: Page404,
      meta: {
        title: '404 - Página não econtrada'
      }
     }
  ]
})
