import TheirListPage from "../TheirListPage.vue";
import { render } from "./utils";

describe("TheirListPage", () => {
  it("matches snapshot", () => {
    expect(render(TheirListPage).container).toMatchSnapshot();
  });
});
