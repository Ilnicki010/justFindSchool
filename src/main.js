import Vue from 'vue';
import {
  VueReCaptcha
} from 'vue-recaptcha-v3';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;



new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
