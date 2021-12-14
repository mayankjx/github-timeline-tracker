import { createStore } from "vuex";

export default createStore({
  state: {
    status: "requested",
    events: [],
    error: null,
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },

    setData(state, data) {
      state.events = data;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    async getPublicData({ commit }, { username }) {
      console.log(username);
      try {
        commit("setStatus", "loading");
        const response = await fetch(
          `https://api.github.com/users/${username}/events/public`
        );
        let eventData = await response.json();

        if (response.status !== 200) {
          if (eventData.message) {
            commit("setError", eventData.message);
          } else {
            commit("setError", "An Uncexpected error occured");
          }
          commit("setStatus", "failed");
        } else {
          eventData.forEach((event) => {
            event.created_at = event.created_at.slice(0, 10);
            event.type = event.type.slice(0, -5);
          });
          commit("setData", eventData);
          commit("setStatus", "fetched");
          commit("setError", null);
        }
      } catch (error) {
        commit("setStatus", "failed");
        commit("setError", error);
        console.log(error);
      }
    },

    async getRepoData({ commit }, { username, repo }) {
      try {
        commit("setStatus", "loading");
        const response = await fetch(
          `https://api.github.com/repos/${username}/${repo}/events`
        );
        let eventData = await response.json();

        if (response.status !== 200) {
          if (eventData.message) {
            commit("setError", eventData.message);
          } else {
            commit("setError", "An Uncexpected error occured");
          }
          commit("setStatus", "failed");
        } else {
          eventData.forEach((event) => {
            event.created_at = event.created_at.slice(0, 10);
            event.type = event.type.slice(0, -5);
          });
          commit("setData", eventData);
          commit("setStatus", "fetched");
          commit("setError", null);
        }
      } catch (error) {
        commit("setStatus", "failed");
        commit("setError", error);
        console.log(error);
      }
    },
  },
  modules: {},
});
