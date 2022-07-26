import { render } from "@testing-library/vue";
import BlahPage from "../BlahPage.vue";

describe("BlahPage", () => {
  it("is a good place to write dummy tests", () => {
    expect(true).toBe(true);
  });

  it("matches snapshot", () => {
    expect(render(BlahPage).container).toMatchSnapshot();
  });
});
