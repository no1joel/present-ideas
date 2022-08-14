import { render } from "../../../../../jest/utils";
import LandingPage from "../LandingPage.vue";

describe("LandingPage", () => {
  it("matches snapshot", () => {
    expect(render(LandingPage).container).toMatchSnapshot();
  });
});
