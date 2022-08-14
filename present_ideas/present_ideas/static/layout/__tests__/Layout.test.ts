import { render } from "../../pages/__tests__/utils";
import Layout from "../Layout.vue";

describe("Layout", () => {
  it("matches snapshot", () => {
    expect(render(Layout).container).toMatchSnapshot();
  });
});
