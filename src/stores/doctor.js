import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
import { DOCTOR } from "src/apis/constant";
import notification from "src/boot/notification";
export const useDoctorStore = defineStore("doctor", {
  state: () => ({
    data: LocalStorage.getItem("data") ?? [],
    draft: '',
    list: [],
    transcriptionList: []
  }),
  getters: {
    getData() {
      return this.data
    },
    getList() {
      return this.list
    },
    getTranscriptionList() {
      return this.transcriptionList
    }
  },

  actions: {
    async fetchList(data) {
      return new Promise((resolve, reject) => {
        api
          .getWithParam(DOCTOR.LIST_HOSPITAL, data)
          .then((res) => {
            if (res.success) {
              const list = this.getList;
              const doc = list.concat(...res.data);
              this.list = doc;
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async fetchTranscriptionList(data) {
      return new Promise((resolve, reject) => {
        api
          .getWithParam(DOCTOR.LIST_SCRIPT, data)
          .then((res) => {
            if (res.success) {
              const transList = this.getTranscriptionList;
              const trans = transList.concat(...res.data.data);
              this.transcriptionList = trans;
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async resetList() {
      this.list = [];
      this.transcriptionList = [];
    }


  },
});
