import { render } from "../../../../../jest/utils";
import Layout from "../Layout.vue";

describe("Layout", () => {
  it("matches snapshot", () => {
    expect(render(Layout).container).toMatchSnapshot();
  });
});
