import { render } from "../../pages/__tests__/utils";
import PeoplePicker from "../PeoplePicker.vue";

describe("PeoplePicker", () => {
  it("matches snapshot", () => {
    expect(render(PeoplePicker).container).toMatchSnapshot();
  });
  it.todo("contains all the people's names");
});
