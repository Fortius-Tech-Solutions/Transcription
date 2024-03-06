import { boot } from "quasar/wrappers";
import axios from "axios";
import { LocalStorage } from "quasar";

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: "application/json",
  },
});


const authInterceptor = (config) => {
  const token = LocalStorage.getItem("access_token");
  if (token && token !== "undefined" && token.length > 0) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  return config;
};

api.interceptors.request.use(authInterceptor);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { axios, api };
