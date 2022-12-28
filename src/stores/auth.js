import { defineStore } from "pinia";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
import notification from "src/boot/notification";
import { LocalStorage } from "quasar";


//TODO Prefix set for API
const API_PREFIX_1 = "auth"; // API_PREFIX_1 for auth
const LOGIN = API_PREFIX_1 + "/login";
const LOGOUT = API_PREFIX_1 + "/logout";
const ME = "/user/me";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: LocalStorage.getItem("user") || "",
    accessToken: LocalStorage.getItem("access_token") || "",
  }),

  getters: {
    getUser() {
      return this.user;
    },

    isLoggedIn() {
      return !!this.accessToken;
    },

  },

  actions: {
    async signIn(data) {
      return new Promise((resolve, reject) => {
        api
          .post(LOGIN, data)
          .then((res) => {
            if (res.success) {
              this.accessToken = res.data.token;
              LocalStorage.set("access_token", this.accessToken);
              this.getProfile();
            } else {
              notification.error(res.message);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async logout() {
      return new Promise((resolve, reject) => {
        api.get(LOGOUT);
        LocalStorage.remove("access_token");
        LocalStorage.remove("user");
        LocalStorage.remove("email");
      });
    },

    async getProfile() {
      return new Promise((resolve, reject) => {
        api
          .get(ME)
          .then((res) => {
            if (res.success) {
              this.user = res.data[0];
              LocalStorage.set("user", this.user);
            } else {
              notification.error(res.message);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
