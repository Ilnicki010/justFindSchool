import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import schoolFullInfo from "./views/schoolFullInfo.vue";
import FAQ from "./views/FAQ.vue";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/szkola/:uid/",
      name: "schoolFullInfo",
      component: schoolFullInfo,
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/faq",
      name: "faq",
      component: FAQ
    }
  ]
});
