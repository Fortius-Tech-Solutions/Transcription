import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
export const useMasterStore = defineStore("master", {
  state: () => ({
    layout: LocalStorage.getItem("layout") ?? "grid",
    data: []
  }),

  getters: {
    getData() {
      return this.data
    }
  },

  actions: {
    async fetchSelected(data) {
      return new Promise((resolve, reject) => {
        api
          .getWithParam("/admin", data)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
