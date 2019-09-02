import Vue from 'vue';
import KnobControl from 'vue-knob-control';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(KnobControl);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
