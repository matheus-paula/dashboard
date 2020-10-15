// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Dashboard from './Dashboard'
import router from './router'
import VueI18n from 'vue-i18n'
import messages from "./i18n_translations.js"
import axios from 'axios'
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"
import "npm-font-open-sans/open-sans.css"
import fullscreen from 'vue-fullscreen'
import VueToastr from 'vue-toastr'

/* TOASTR */
Vue.use(VueToastr)

/* FULLSCREEN */
Vue.use(fullscreen)

/* VUE CONFIG */
Vue.config.productionTip = false

/* JQUERY*/
window.$ = require('jquery')
window.JQuery = require('jquery')

/* AXIOS */ 
window.axios = axios;
/* IMPORTANT!! 
  SET THE CORRECT DATABASE DEFAULT/ROOT URL 
  Like the example: 'http://localhost:3102/'
*/
axios.defaults.baseURL = 'http://localhost:3102/';
Vue.use(axios);



/* INTERNACIONALIZATION */
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: (localStorage.getItem("settings") !== null) ? JSON.parse(localStorage.getItem("settings")).lang : 'br', 
  messages, 
})

/* TV MODE Global */
var tvmode = new Vue({
  data:{ 
    status: false,
    linename: '',
    defaultData: (localStorage.getItem("settings") !== null) ? JSON.parse(localStorage.getItem("settings")).defaultData : 2
}})
tvmode.install = function(){
  Object.defineProperty(Vue.prototype, '$tvmode', {
    get () { return tvmode }
  })
}
Vue.use(tvmode);

/* WORKSTATION DETAILS GLOBAL */
var workstationDetails = new Vue({
  data:{ 
    status: (localStorage.getItem("settings") !== null) ? JSON.parse(localStorage.getItem("settings")).workstationDetails : false
}})
workstationDetails.install = function(){
  Object.defineProperty(Vue.prototype, '$workstationDetails', {
    get () { return workstationDetails }
  })
}
Vue.use(workstationDetails);


/* ALWAYS SHOW TUTORIAL */
var alwaysShowTutorial = new Vue({
  data:{ 
    enabled: (localStorage.getItem("settings") !== null) ? JSON.parse(localStorage.getItem("settings")).alwaysShowTutorial : true
}})
alwaysShowTutorial.install = function(){
  Object.defineProperty(Vue.prototype, '$alwaysShowTutorial', {
    get () { return alwaysShowTutorial }
  })
}
Vue.use(alwaysShowTutorial);

/* VUE CONSTRUCTOR */
new Vue({
  router,
  i18n,
  render: h => h(Dashboard)
}).$mount('#app')
