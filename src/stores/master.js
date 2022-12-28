import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
export const useMasterStore = defineStore("master", {
  state: () => ({
    layout: LocalStorage.getItem("layout") ?? "grid",
    data: []
  }),

  getters: {
    getLayoutType() {
      return this.layout;
    },
  },

  actions: {
    async getHospital(data) {
      return new Promise((resolve, reject) => {
        api
          .get("/hospital")
          .then((res) => {
            // if (res.success) {
            this.accessToken = res.token;
            LocalStorage.set("access_token", this.accessToken);
            // this.getProfile();
            // } else {
            // notification.error(res.message);
            // }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },


  },
});
