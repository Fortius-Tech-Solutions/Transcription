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
    userRoles: JSON.parse(LocalStorage.getItem("roles")) | "",
    accessToken: LocalStorage.getItem("access_token") || "",
  }),

  getters: {
    getUser() {
      return this.user;
    },
    isLoggedIn() {
      return !!this.accessToken;
    },
    isSuperAdmin() {
      if (this.user && this.user.usertype.id == 1) {
        return true
      }
      return false
    },
    isRole() {
      return this.userRoles
    }
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
              this.getProfile().then(() => {
                resolve(res);
              });
            } else {
              notification.error(res.message);
              resolve(res);
            }

          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async logout() {
      return new Promise((resolve, reject) => {
        api.get(LOGOUT).then((res) => {
          LocalStorage.remove("access_token");
          LocalStorage.remove("user");
          LocalStorage.remove("email");
          LocalStorage.remove("roles");
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    },

    async getProfile() {
      return new Promise((resolve, reject) => {
        api
          .get(ME)
          .then((res) => {
            if (res.success) {
              this.user = res.data[0];
              this.userRoles = res.data[0]?.usertype?.name
              LocalStorage.set("user", this.user);
              LocalStorage.set("roles", JSON.stringify(this.userRoles));

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
