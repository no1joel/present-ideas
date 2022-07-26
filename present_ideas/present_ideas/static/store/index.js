import Vuex from "vuex";

const getStore = () =>
  new Vuex.Store({
    state: {
      people: [],
      loadingPeople: false,
      currentUser: undefined,
      viewingUser: undefined,
    },
    mutations: {
      setPeople(state, payload) {
        state.people = payload.people;
      },
      setCurrentUser(state, { currentUser }) {
        state.currentUser = currentUser;
      },
      setViewingUser(state, { viewingUser }) {
        state.viewingUser = viewingUser;
      },
      loadingPeople(state) {
        state.loadingPeople = true;
      },
      loadedPeople(state) {
        state.loadingPeople = false;
      },
    },
    actions: {
      async loadPeople({ commit }) {
        commit("loadingPeople");
        const response = await fetch("/api/person");

        const data = await response.json();
        const names = data.names;
        const people = names
          .sort()
          .map((person) => person[0].toUpperCase() + person.slice(1));

        commit("setPeople", { people });
        commit("loadedPeople");
      },
      async setCurrentUser({ commit, getters }, { currentUser }) {
        commit("setCurrentUser", { currentUser });
      },
      async setViewingUser({ commit, getters }, { viewingUser }) {
        commit("setViewingUser", { viewingUser });
      },
    },
    getters: {
      people: (state) => state.people,
      loadingPeople: (state) => state.loadingPeople,
      currentUser: (state) => state.currentUser,
      viewingUser: (state) => state.viewingUser,
    },
  });

export default getStore;
