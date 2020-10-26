import LandingPage from "../pages/LandingPage.vue";
import ListPage from "../pages/ListPage.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/:user/:viewing/", component: ListPage, name: "list", props: true },
];

export default routes;
