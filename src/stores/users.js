import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
import { USER } from "src/apis/constant";
import notification from "src/boot/notification";
export const userStore = defineStore("user", {
  state: () => ({
    serviceList: [],
    userList: [],
    userType: [],
    currentUser: {},
    userCounter: [],
  }),

  getters: {
    getUser() {
      return this.currentUser;
    },
    getUserType() {
      let type = []
      this.userType.forEach(element => {
        type.push({ label: element.name, value: element.id })
      });
      return type;
    },
  },

  actions: {
    async fetchUserList(data) {
      return new Promise((resolve, reject) => {
        api
          .get(USER.LIST)
          .then((res) => {
            if (res.success) {
              this.userList = res.data;
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async saveNewUser(data) {
      return new Promise((resolve, reject) => {
        api
          .post(USER.SAVE, data)
          .then((res) => {
            if (res.success) {
              this.userList.push(res.data);
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async updateUser(data, id) {
      return new Promise((resolve, reject) => {
        api
          .post(api.resolveApiUrl(USER.UPDATE, { id: id }), data)
          .then((res) => {
            if (res.success) {
              this.userList.push(res.data);
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async deleteUser(data) {
      return new Promise((resolve, reject) => {
        api
          .delete(api.resolveApiUrl(USER.DELETE, { id: data }))
          .then((res) => {
            if (res.success) {
              notification.success(res.message || "user has been deleted");
            }
            resolve(res);
          })
          .catch((error) => {
            notification.success(error.message);
            reject(error);
          });
      });
    },

    async fetchUser(slug) {
      return new Promise((resolve, reject) => {
        api
          .get(api.resolveApiUrl(USER.SHOW, { id: slug }))
          .then((res) => {
            if (res.success) {
              this.currentUser = res.data;
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    async fetchUserTypeList(data) {
      return new Promise((resolve, reject) => {
        api
          .get('/userType')
          .then((res) => {
            if (res.success) {
              this.userType = res.data
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
