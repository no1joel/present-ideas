import { render } from "../../../../../jest/utils";
import LoadingIndicator from "../LoadingIndicator.vue";

describe("LoadingIndicator", () => {
  it("matches snapshot", async () => {
    const result = await render(LoadingIndicator);
    expect(result.container).toMatchSnapshot();
  });
});
