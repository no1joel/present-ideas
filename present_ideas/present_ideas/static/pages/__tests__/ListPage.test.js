import { render } from "@testing-library/vue";
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import getStore from "../../store";

import ListPage from "../ListPage.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ListPage", () => {
  // TODO: Just trying to get it to pass right now.
  // shouldn't mock fetch, shouldn't mess with global
  // Should probably use what vfp used with the api.
  beforeEach(() => {
    const json = async () => ({
      presents: [],
    });
    const response = { json };
    global.fetch = async () => response;
  });
  it("matches snapshot", () => {
    const mockRoute = { params: {} };
    const store = getStore();
    const mocks = { $route: mockRoute };
    const renderOptions = { mocks, localVue, store };

    expect(render(ListPage, renderOptions).container).toMatchSnapshot();
  });
});
