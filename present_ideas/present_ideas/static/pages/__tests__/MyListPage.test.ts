import { render } from "../../../../../jest/utils";
import MyListPage from "../MyListPage.vue";

describe("MyListPage", () => {
  it("matches snapshot", async () => {
    const result = await render(MyListPage);
    expect(result.container).toMatchSnapshot();
  });
});
