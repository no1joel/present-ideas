import LandingPage from "../LandingPage.vue";
import { render } from "./utils";

describe("LandingPage", () => {
  it("matches snapshot", () => {
    expect(render(LandingPage).container).toMatchSnapshot();
  });
});
