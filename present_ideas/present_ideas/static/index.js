import "vite/modulepreload-polyfill";
import Vue from "vue";
import linkify from "vue-linkify";
import VueRouter from "vue-router";
import Vuex from "vuex";
import router from "./router";
import getStore from "./store";

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.directive("linkified", linkify);

const store = getStore();

router.beforeEach((to, from, next) => {
  const currentUser = store.getters.currentUser;
  const viewingUser = store.getters.viewingUser;
  if (to.name === "list") {
    if (to.params.user !== currentUser) {
      console.log("updatingCurrentUser from route", to.params.user);
      store.dispatch("setCurrentUser", { currentUser: to.params.user });
    }
    if (to.params.viewing !== viewingUser) {
      console.log("updatingViewingUser from route", to.params.viewing);
      store.dispatch("setViewingUser", { viewingUser: to.params.viewing });
    }
  }
  next();
});

const app = new Vue({
  router,
  store,
  mounted() {
    this.$store.dispatch("loadPeople");
  },
}).$mount("#vue-app");
