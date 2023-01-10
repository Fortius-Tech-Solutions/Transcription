import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
import { DOCTOR } from "src/apis/constant";
import notification from "src/boot/notification";
export const useDoctorStore = defineStore("doctor", {
  state: () => ({
    data: LocalStorage.getItem("data") ?? [],
    draft: ''
  }),
  getters: {
    getData() {
      return this.data
    },

  },

  actions: {
    async fetchTranscriptionList(data) {
      return new Promise((resolve, reject) => {
        api
          .getWithParam(DOCTOR.LIST_SCRIPT, data)
          .then((res) => {
            if (res.success) {
              resolve(res);
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
