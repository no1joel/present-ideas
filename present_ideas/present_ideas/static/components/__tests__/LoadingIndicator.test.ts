import { render } from "../../../../../jest/utils";
import LoadingIndicator from "../LoadingIndicator.vue";

describe("LoadingIndicator", () => {
  it("matches snapshot", () => {
    expect(render(LoadingIndicator).container).toMatchSnapshot();
  });
});
