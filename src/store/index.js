import Vue from "vue";
import Vuex from "vuex";
import api from "../services/api";
Vue.use(Vuex);

const authModule = {
  namespaced: true,
  state: {
    id: null,
    email: "",
    hasToken: false,
    isLoggedIn: false,
  },
  mutations: {
    set(state, payload) {
      state.id = payload.user.id;
      state.email = payload.user.email;
      state.isLoggedIn = true;
      state.hasToken = true;
    },
    clear(state) {
      state.id = null;
      state.email = "";
      state.isLoggedIn = false;
      state.hasToken = false;
    },
  },
  actions: {
    login(context, payload) {
      console.log("login");
      return api
        .post("/auth/jwt/create/", {
          email: payload.email,
          password: payload.password
        });
    },
    logout(context) {
      return api
        .get("/auth/logout/")
        .then(response => {
          console.log(response.data);
          context.commit("clear");
        });
    },
    getMe(context) {
      return api.get("/auth/users/me/").then(response => {
        const user = response.data;
        console.log(user);
        console.log("getMe");
        context.commit("set", {user: user});
      });
    },
    refresh(context) {
      console.log("refresh");
      return api
        .post("/auth/jwt/refresh/")
        .then((response) => {
          console.log("set access with refresh");
          console.log(response);
          context.dispatch("getMe");
        });
    }
  }
};

const messageModule = {
  namespaced: true,
  state: {
    error: "",
    warnings: [],
    info: "",
  },
  mutations: {
    set(state, payload) {
      if (payload.error) {
        state.error = payload.error;
      }
      if (payload.warnings) {
        state.warnings = payload.warnings;
      }
      if (payload.info) {
        state.info = payload.info;
      }
    },
    clear(state) {
      state.error = "";
      state.warnings = [],
      state.info = "";
    }
  },
  actions: {
    setErrorMessage(context, payload) {
      context.commit("clear");
      context.commit("set", {error: payload.message});
    },
    setWarningMessages(context, payload) {
      context.commit("clear");
      context.commit("set", {warnings: payload.messages});
    },
    setInfoMessage(context, payload) {
      context.commit("clear");
      context.commit("set", {info: payload.message});
    },
    clearMessages(context) {
      context.commit("clear");
    }
  }
};

const store = new Vuex.Store({
  modules: {
    auth: authModule,
    message: messageModule
  }
});

export default store;

