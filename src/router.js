import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Join from './views/Join.vue';
import schoolFullInfo from './views/schoolFullInfo.vue';

Vue.use(Router);
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      props: true,
      component: Home,
    },
    {
      path: '/szkola/:uid/',
      name: 'schoolFullInfo',
      component: schoolFullInfo,
      props: true,
    }, {
      path: '/join',
      name: 'join',
      component: Join,
    },

  ],
});
