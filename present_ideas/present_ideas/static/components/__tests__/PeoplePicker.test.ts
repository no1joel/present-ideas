import { render } from "../../../../../jest/utils";
import PeoplePicker from "../PeoplePicker.vue";

describe("PeoplePicker", () => {
  it("matches snapshot", async () => {
    const result = await render(PeoplePicker);
    expect(result.container).toMatchSnapshot();
  });
  it.todo("contains all the people's names");
});
