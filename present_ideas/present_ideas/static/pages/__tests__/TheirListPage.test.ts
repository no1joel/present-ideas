import { render } from "../../../../../jest/utils";
import TheirListPage from "../TheirListPage.vue";

describe("TheirListPage", () => {
  it("matches snapshot", async () => {
    const result = await render(TheirListPage);
    expect(result.container).toMatchSnapshot();
  });
});
