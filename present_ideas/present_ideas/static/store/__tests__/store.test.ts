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
