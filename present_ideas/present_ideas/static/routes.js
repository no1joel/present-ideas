import LandingPage from "./pages/LandingPage.vue";
import BlahPage from "./pages/BlahPage.vue";
import MyListPage from "./pages/MyListPage.vue";

const routes = [
    { path: '/', component: LandingPage },
    { path: '/:user/me/', component: MyListPage, name: "myList" },
    { path: '/blah', component: BlahPage }
];

export default routes;