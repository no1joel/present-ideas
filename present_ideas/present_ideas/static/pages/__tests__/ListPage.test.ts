import { render } from "../../../../../jest/utils";

import ListPage from "../ListPage.vue";

describe("ListPage", () => {
  // TODO: Just trying to get it to pass right now.
  // shouldn't mock fetch, shouldn't mess with global
  // Should probably use what vfp used with the api.
  beforeEach(() => {
    const json = async () => ({
      presents: [],
    });
    const response = { json };
    // @ts-ignore
    global.fetch = async () => response;
  });
  it("matches snapshot", async () => {
    const result = await render(ListPage);
    expect(result.container).toMatchSnapshot();
  });
});
