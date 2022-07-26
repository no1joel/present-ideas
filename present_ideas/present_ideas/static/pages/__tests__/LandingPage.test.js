import { render } from "@testing-library/vue";
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import getStore from "../../store";
import LandingPage from "../LandingPage.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("LandingPage", () => {
  it("matches snapshot", () => {
    const store = getStore();
    expect(
      render(LandingPage, { localVue, store }).container
    ).toMatchSnapshot();
  });
});
