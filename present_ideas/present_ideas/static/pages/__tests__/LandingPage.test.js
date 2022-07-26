import { render } from "@testing-library/vue";
import getStore from "../../store";
import LandingPage from "../LandingPage.vue";
import { getVueWithVuex } from "./utils";

describe("LandingPage", () => {
  it("matches snapshot", () => {
    expect(
      render(LandingPage, { localVue: getVueWithVuex(), store: getStore() })
        .container
    ).toMatchSnapshot();
  });
});
