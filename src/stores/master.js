import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
export const useMasterStore = defineStore("master", {
  state: () => ({
    data: LocalStorage.getItem("data") ?? [],
    pdfData: LocalStorage.getItem("pdfData") ?? []
  }),
  getters: {
    getData() {
      return this.data
    },
    getPdfData() {
      return this.pdfData
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
    async pdfDownload(id) {
      return new Promise((resolve, reject) => {
        api
          .get("/doctor/generate-pdf/" + id)
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
