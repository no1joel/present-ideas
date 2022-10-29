import { render } from "../../../../../jest/utils";
import PresentIdeaFormCard from "../PresentIdeaFormCard.vue";

describe("PresentIdeaFormCard", () => {
  it("matches snapshot", async () => {
    const result = await render(PresentIdeaFormCard);
    expect(result.container).toMatchSnapshot();
  });
  it.todo("posts data to correct endpoint");
  it.todo("disables while saving and enables after");
});
