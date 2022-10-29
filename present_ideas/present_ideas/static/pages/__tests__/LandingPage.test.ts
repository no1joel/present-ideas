import { render } from "../../../../../jest/utils";
import LandingPage from "../LandingPage.vue";

describe("LandingPage", () => {
  it("matches snapshot", async () => {
    const result = await render(LandingPage);
    expect(result.container).toMatchSnapshot();
  });
});
