import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import VueLazyload from 'vue-lazyload';
import App from './App.vue';
import router from './router';


Vue.use(VueLazyload);
Vue.use(VueAnalytics, {
  id: 'UA-147954275-1',
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
