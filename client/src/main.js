// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//new
require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import vueResource from 'vue-resource'
Vue.use(vueResource)
//end New 

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
