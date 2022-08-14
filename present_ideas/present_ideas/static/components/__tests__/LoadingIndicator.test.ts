import { render } from "../../pages/__tests__/utils";
import LoadingIndicator from "../LoadingIndicator.vue";

describe("LoadingIndicator", () => {
  it("matches snapshot", () => {
    expect(render(LoadingIndicator).container).toMatchSnapshot();
  });
});
