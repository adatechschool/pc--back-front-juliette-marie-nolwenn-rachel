import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    furnitures: [],
    displayFurnitures: [],
    rows: 0,
    showSpinner: false,
  },
  mutations: {
    SET_FURNITURES(state, furnitures) {
      state.furnitures = furnitures;
    },
    SET_ROWS(state, rows) {
      state.rows = rows;
    },
    SET_DISPLAY_FURNITURES(state, displayFurnitures) {
      state.displayFurnitures = displayFurnitures;
    },
    SET_SPINNER(state, spinner) {
      state.showSpinner = spinner;
    },
  },
  actions: {
    async fetchData({ commit }) {
      commit("SET_SPINNER", true);
      return new Promise((resolve) => {
        setTimeout(async () => {
          const res = await fetch("furnitures.json");
          const val = await res.json();
          resolve(val);
          commit("SET_SPINNER", false);
        }, 1000);
      });
    },
    updatePagination({ commit, dispatch }, { myJson, currentPage, perPage }) {
      commit("SET_FURNITURES", myJson);
      commit("SET_ROWS", myJson.length);
      dispatch("paginate", { currentPage, perPage });
    },
    async fetchFurnitures({ dispatch }) {
      const myJson = await dispatch("fetchData");
      dispatch("updatePagination", { myJson, currentPage: 1, perPage: 3 });
      return myJson;
    },
    async paginate({ commit, state }, { currentPage, perPage }) {
      const start = (currentPage - 1) * perPage;
      const furnitures = state.furnitures.slice(start, start + 3);
      commit("SET_DISPLAY_FURNITURES", furnitures);
    },
    async search({ dispatch }, { text }) {
      const myJson = await dispatch("fetchData");
      const values = myJson.filter((val) => {
        
        return val.name.toLowerCase().includes(text.toLowerCase());
      });

      dispatch("updatePagination", {
        myJson: values,
        currentPage: 1,
        perPage: 3,
      });
    },
  },
  getters: {
    getFurnitures(state) {
      return state.furnitures;
    },
    getRows(state) {
      return state.rows;
    },
    getDisplayFurnitures(state) {
      return state.displayFurnitures;
    },
    getSpinner(state) {
      return state.showSpinner;
    },
  },
  modules: {},
});
