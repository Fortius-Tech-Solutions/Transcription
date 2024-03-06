import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
import { HOSPITAL } from "src/apis/constant";
import notification from "src/boot/notification";
export const hospitalStore = defineStore("hospital", {
  state: () => ({
    serviceList: [],
    hospitalList: [],
  }),

  getters: {
    getHospital() {
      return this.currentHospital;
    },
    getHospitalList() {
      let data = []
      this.hospitalList.forEach(h => {
        data.push({ value: h.id, label: h.name })
      })
      return data
    },
  },

  actions: {
    async fetchHospitalList() {
      return new Promise((resolve, reject) => {
        api
          .getWithParam(HOSPITAL.LIST)
          .then((res) => {
            if (res.success) {
              this.hospitalList = res.data;
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async saveNewHospital(data) {
      return new Promise((resolve, reject) => {
        api
          .post(HOSPITAL.SAVE, data)
          .then((res) => {
            if (res.success) {
              this.hospitalList.push(res.data);
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async updateHospital(data, id) {
      return new Promise((resolve, reject) => {
        api
          .post(api.resolveApiUrl(HOSPITAL.UPDATE, { id: id }), data)
          .then((res) => {
            if (res.success) {
              this.hospitalList.push(res.data);
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async deleteHospital(data) {
      return new Promise((resolve, reject) => {
        api
          .delete(api.resolveApiUrl(HOSPITAL.DELETE, { id: data }))
          .then((res) => {
            if (res.success) {
              notification.success(res.message || "hospital has been deleted");
            }
            resolve(res);
          })
          .catch((error) => {
            notification.success(error.message);
            reject(error);
          });
      });
    },

    async fetchHospital(slug) {
      return new Promise((resolve, reject) => {
        api
          .get(api.resolveApiUrl(HOSPITAL.SHOW, { id: slug }))
          .then((res) => {
            if (res.success) {
              this.currentHospital = res.data;
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async fetchHospitalAssign(slug) {
      return new Promise((resolve, reject) => {
        api
          .getWithParam(HOSPITAL.ASSIGN, { id: slug })
          .then((res) => {
            if (res.success) {
              this.currentHospital = res.data;
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
