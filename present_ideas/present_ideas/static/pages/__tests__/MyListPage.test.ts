import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { server } from "../../../../../jest/mock_server/server";
import { render } from "../../../../../jest/utils";
import MyListPage from "../MyListPage.vue";

describe("MyListPage", () => {
  const presents: { Thing: string; Notes: string; Price: number }[] = [];
  beforeEach(() => {
    server.use(
      rest.get("http://localhost/api/my_list/:name", (req, res, ctx) => {
        return res(
          ctx.json({
            presents: presents.map((present, index) => ({ ...present, index })),
          })
        );
      }),
      rest.post("http://localhost/api/delete_idea/", async (req, res, ctx) => {
        const { index } = await req.json();
        presents.splice(index, 1);
        return res(ctx.json({}));
      })
    );
  });
  afterEach(() => {
    presents.splice(0);
  });
  it("matches snapshot", async () => {
    const screen = await render(MyListPage);
    expect(screen.container).toMatchSnapshot();
  });
  it("removes when you click delete", async () => {
    // TODO: Need to set up route to be current user's name and assert that
    // the name is there
    const user = userEvent.setup();
    presents.push({
      Thing: "A present",
      Notes: "asdf",
      Price: 100,
    });
    await render(MyListPage);

    const deleteButton = await waitFor(() => screen.getAllByText("Delete")[0]);
    await user.click(deleteButton);
    const yesButton = await waitFor(() => screen.getAllByText("Yep!")[0]);
    await user.click(yesButton);
    await waitFor(() =>
      expect(screen.queryAllByText("Delete")).toHaveLength(0)
    );
  });
  it("removes the correct one when you click delete", async () => {
    const user = userEvent.setup();
    presents.push({
      Thing: "first present",
      Notes: "",
      Price: 1,
    });
    presents.push({
      Thing: "second present",
      Notes: "",
      Price: 2,
    });
    presents.push({
      Thing: "third present",
      Notes: "",
      Price: 3,
    });
    await render(MyListPage);

    await waitFor(() =>
      expect(screen.getAllByRole("button", { name: "Delete" })).toHaveLength(3)
    );
    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });
    await user.click(deleteButtons[0]);
    const yesButtons = await screen.findAllByText("Yep!");
    await user.click(yesButtons[0]);
    await waitFor(() =>
      expect(screen.queryAllByText("Delete")).toHaveLength(2)
    );
    expect(screen.queryByText("third present")).toBeNull();
    screen.getByText("second present");
    screen.getByText("first present");
  });
});
