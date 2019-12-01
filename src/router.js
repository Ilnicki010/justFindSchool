import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SchoolFullInformationView from "@/views/SchoolFullInformationView.vue";
import FaqView from "@/views/FaqView.vue";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/szkola/:uid/",
      name: "schoolFullInfo",
      component: SchoolFullInformationView,
      props: true,
      meta: {
        keepAlive: false
      }
    },
    {
      path: "/faq",
      name: "faq",
      component: FaqView
    }
  ]
});
