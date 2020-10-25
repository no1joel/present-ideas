import LandingPage from "./components/LandingPage.vue";
import BlahPage from "./components/BlahPage.vue";
import MyListPage from "./components/MyListPage.vue";

const routes = [
    { path: '/', component: LandingPage },
    { path: '/:user/me/', component: MyListPage, name: "myList" },
    { path: '/blah', component: BlahPage }
];

export default routes;