import MyListPage from "../MyListPage.vue";
import { render } from "./utils";

describe("MyListPage", () => {
  it("matches snapshot", () => {
    expect(render(MyListPage).container).toMatchSnapshot();
  });
});
