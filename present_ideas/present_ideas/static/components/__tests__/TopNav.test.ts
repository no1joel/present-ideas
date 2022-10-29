import { render } from "../../../../../jest/utils";
import TopNav from "../TopNav.vue";

describe("TopNav", () => {
  it("matches snapshot", async () => {
    const result = await render(TopNav);
    expect(result.container).toMatchSnapshot();
  });
  it.todo("lets you select who you are from a list of people");
  it.todo("lets you select who to view from a list of people");
});
