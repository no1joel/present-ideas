import "vite/modulepreload-polyfill";
import { createApp } from "vue";
import linkify from "vue-linkify";
import router from "./router";
import getStore from "./store";

const store = getStore();

router.beforeEach((to, from, next) => {
  const currentUser = store.getters.currentUser;
  const viewingUser = store.getters.viewingUser;
  if (to.name === "list") {
    if (to.params.user !== currentUser) {
      store.dispatch("setCurrentUser", { currentUser: to.params.user });
    }
    if (to.params.viewing !== viewingUser) {
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

const shakeDetector = new ShakeDetector({
  threshold: 8, // optional shake strength threshold
  debounceDelay: 500, // optional, determines the frequency of event generation
});

document.addEventListener("DOMContentLoaded", () => {
  addSnowflakes(getSnowflakeCount());

  shakeDetector.requestPermission().then(() => shakeDetector.start());
  window.addEventListener(
    shakeDetector.SHAKE_EVENT,
    () => {
      addSnowflakes(Math.ceil(10 + Math.random() * 30), true);
    },
    false
  );
});

alert("hi");
