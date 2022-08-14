import { render } from "../../../../../jest/utils";
import TheirListPage from "../TheirListPage.vue";

describe("TheirListPage", () => {
  it("matches snapshot", () => {
    expect(render(TheirListPage).container).toMatchSnapshot();
  });
});
