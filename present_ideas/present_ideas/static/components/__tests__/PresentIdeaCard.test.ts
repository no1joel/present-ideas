import { render } from "../../../../../jest/utils";
import PresentIdeaCard from "../PresentIdeaCard.vue";

describe("PresentIdeaCard", () => {
  it("matches snapshot", async () => {
    const result = await render(PresentIdeaCard);
    expect(result.container).toMatchSnapshot();
  });
  it.todo("shows loading");
  it.todo("shows the right title");
  it.todo("shows the right notes");
  it.todo("shows the right price");
  it.todo("shows unclaimed if unclaimed");
  it.todo("shows who claimed it");
  it.todo("doesn't show claimed it if it's for you");
  it.todo("shows who added it");
  it.todo("lets you delete it if you added it");
  it.todo("lets you claim it if it's not yours");
});
