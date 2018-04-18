// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload'
import VueQuillEditor from 'vue-quill-editor'
import VueRouter from 'vue-router'
//相当于from './store/index.js'
import store from './store'

//可能需要每一次使用都引入？
import 'element-ui/lib/theme-chalk/index.css';
import { resolve } from 'upath';

Vue.config.productionTip = false


Vue.use(VueQuillEditor)
Vue.use(ElementUI)
Vue.use(VueLazyLoad,{
  loading:require('common/imgs/loading.gif'),
  error: require('./common/imgs/error.gif'),
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render:h=>h(App)
})
