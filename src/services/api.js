import axios from "axios";
import store from "@/store";
import nonInterceptors from "./nonInterceptors";


const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true
});

async function getCsrfToken() {
  const response = await nonInterceptors.get("/auth/csrftoken/");
  return response.data.csrftoken;
}

async function hasRefresh() {
  const response = await nonInterceptors.get("/auth/has-refresh-token/");
  return response.data.has_refresh_token;
}

api.interceptors.request.use(
  async config => {
    if (!["GET", "HEAD", "OPTIONS", "TRACE"].includes(config.method.toUpperCase())) {
      console.log(config.method);
      const csrftoken = await getCsrfToken();
      config.headers["X-CSRFToken"] = csrftoken;
    }

    console.log(config.method);
    return config;
  },
  error => {
    console.log("interceptors.request.error");
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    console.log("error.response= ", error.response);
    const status = error.response ? error.response.status : 500;
    let message;
    if (status === 400) {
      const messages = [].concat.apply([], Object.values(error.response.data));
      store.dispatch("message/setWarningMessages", { messages: messages });
    } else if (status === 401) {
        message = "authentication error";
        store.dispatch("message/setErrorMessage", {message: message});
        if (await hasRefresh()) {
          store.dispatch("auth/refresh");
          store.dispatch("message/setInfoMessage", {message: "token expired. so executed refreshed."})
        } else {
          store.dispatch("auth/logout");
        }
    } else if (status === 403) {
      message = "authorization error";
      store.dispatch("message/setErrorMessage", {message: message});
    } else {
      message = "unexpected error";
      store.dispatch("message/setErrorMessage", {message: message});
    }
    return Promise.reject(error);
  }
);

export default api;


