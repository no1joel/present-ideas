import { render } from "../../pages/__tests__/utils";
import TopNav from "../TopNav.vue";

describe("TopNav", () => {
  it("matches snapshot", () => {
    expect(render(TopNav).container).toMatchSnapshot();
  });
  it.todo("lets you select who you are from a list of people");
  it.todo("lets you select who to view from a list of people");
});
