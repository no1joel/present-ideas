import { render } from "@testing-library/vue";
import getStore from "../../store";

import MyListPage from "../MyListPage.vue";
import { getVueWithVuex, mockRoute } from "./utils";

describe("MyListPage", () => {
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
    const mocks = { $route: mockRoute };
    const renderOptions = {
      mocks,
      localVue: getVueWithVuex(),
      store: getStore(),
    };

    expect(render(MyListPage, renderOptions).container).toMatchSnapshot();
  });
});
