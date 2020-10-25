import Vue from 'vue';
import VueRouter from "vue-router";
import routes from "./routes";
import linkify from 'vue-linkify';

Vue.use(VueRouter);
Vue.directive('linkified', linkify)

const router = new VueRouter({ routes });
const app = new Vue({
    router
}).$mount("#vue-app");