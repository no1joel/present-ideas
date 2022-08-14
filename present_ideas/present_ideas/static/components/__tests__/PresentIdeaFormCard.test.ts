import { render } from "../../pages/__tests__/utils";
import PresentIdeaFormCard from "../PresentIdeaFormCard.vue";

describe("PresentIdeaFormCard", () => {
  it("matches snapshot", () => {
    expect(render(PresentIdeaFormCard).container).toMatchSnapshot();
  });
  it.todo("posts data to correct endpoint");
  it.todo("disables while saving and enables after");
});
