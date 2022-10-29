import { render } from "../../../../../jest/utils";
import Layout from "../Layout.vue";

describe("Layout", () => {
  it("matches snapshot", async () => {
    const result = await render(Layout);
    expect(result.container).toMatchSnapshot();
  });
});
