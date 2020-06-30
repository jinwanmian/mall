import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toast from 'components/common/toast';
import VueLazyLoad from 'vue-lazyload';

Vue.config.productionTip = false;
Vue.use(Toast);
Vue.use(VueLazyLoad, {
  loading: require('assets/images/common/default_img.jpg'),
  err: require('assets/images/common/err_img.jpg')
})

Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
