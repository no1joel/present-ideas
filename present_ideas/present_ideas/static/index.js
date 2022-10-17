import "vite/modulepreload-polyfill";
import { createApp } from "vue";
import linkify from "vue-linkify";
import router from "./router";
import getStore from "./store";

const store = getStore();

router.beforeEach((to, from, next) => {
  console.log("hello from the router!", to.path, to.name, from.path, from.name);
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

const app = createApp({
  mounted() {
    this.$store.dispatch("loadPeople");
  },
})
  .use(router)
  .use(store)
  .directive("linkified", linkify)
  .mount("#vue-app");
