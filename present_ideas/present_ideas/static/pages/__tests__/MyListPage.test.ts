import { render } from "../../../../../jest/utils";
import MyListPage from "../MyListPage.vue";

describe("MyListPage", () => {
  it("matches snapshot", () => {
    expect(render(MyListPage).container).toMatchSnapshot();
  });
});
