import { rest } from "msw";
import { server } from "../../../../../jest/mock_server";
import { getVueAndStore } from "../../pages/__tests__/utils";

describe("getters", () => {
  it("returns an empty list for people initially", () => {
    const [_vue, store] = getVueAndStore();
    expect(store.getters.people).toEqual([]);
  });
  it("returns false for loading people initially", () => {
    const [_vue, store] = getVueAndStore();
    expect(store.getters.loadingPeople).toBeFalsy();
  });
  it("returns undefined for currentUser initially", () => {
    const [_vue, store] = getVueAndStore();
    expect(store.getters.currentUser).toBeUndefined();
  });
  it("returns undefined for viewingUser initially", () => {
    const [_vue, store] = getVueAndStore();
    expect(store.getters.viewingUser).toBeUndefined();
  });
});

describe("actions", () => {
  it("loads people from correct endpoint", async () => {
    const [_vue, store] = getVueAndStore();

    server.use(
      rest.get("/api/person", (req, res, context) => {
        return res(
          context.status(200),
          context.json({ names: ["Bob", "Charlie", "alice"] })
        );
      })
    );

    await store.dispatch("loadPeople");

    // TODO: This is actually wrong, but I'm not fixing it right now.
    expect(store.getters.people).toEqual(["Bob", "Charlie", "Alice"]);
  });
  it("sets correct viewingUser", async () => {
    const [_vue, store] = getVueAndStore();

    await store.dispatch("setViewingUser", { viewingUser: "Bob" });

    expect(store.getters.viewingUser).toEqual("Bob");
  });
  it("sets correct currentUser", async () => {
    const [_vue, store] = getVueAndStore();

    await store.dispatch("setCurrentUser", { currentUser: "Bob" });

    expect(store.getters.currentUser).toEqual("Bob");
  });
});
