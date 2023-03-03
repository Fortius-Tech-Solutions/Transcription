import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
import { TRANSCRIPTION } from "src/apis/constant";
import notification from "src/boot/notification";
export const useWriterStore = defineStore("writer", {
  state: () => ({
    data: LocalStorage.getItem("data") ?? [],
    draft: '',
    audioList: [],
    list: [],
    tsType: LocalStorage.getItem('ts-type') ?? []
  }),
  getters: {
    getData() {
      return this.data
    },
    getDraftStatus() {
      return this.draft
    },
    getAudioList() {
      return this.audioList
    },
    getList() {
      return this.list
    },
    getTsTypeList() {
      return this.tsType
    }
  },

  actions: {
    async fetchList() {
      return new Promise((resolve, reject) => {
        api
          .getWithParam(TRANSCRIPTION.LIST)
          .then((res) => {
            if (res.success) {
              const list = this.getList;
              const wrt = list.concat(...res.data);
              this.list = wrt;
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async fetchAudioList(data) {
      return new Promise((resolve, reject) => {
        api
          .getWithParam(TRANSCRIPTION.LIST_AUDIO, data)
          .then((res) => {
            if (res.success) {
              const audioList = this.getAudioList;
              const audio = audioList.concat(...res.data.data);
              this.audioList = audio;
              resolve(res);
            }
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async deleteAudio(data) {
      return new Promise((resolve, reject) => {
        api
          .delete(api.resolveApiUrl(TRANSCRIPTION.AUDIO_Delete, { id: data }))
          .then((res) => {
            if (res.success) {
              notification.success(res.message || "Audio has been deleted");
            }
            resolve(res);
          })
          .catch((error) => {
            notification.success(error.message);
            reject(error);
          });
      });
    },
    async saveTranscription(data, id) {
      return new Promise((resolve, reject) => {
        api
          .post(api.resolveApiUrl(TRANSCRIPTION.SAVE, { id: id }), data)
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
    async fetchTranscription(id) {
      return new Promise((resolve, reject) => {
        api
          .get(api.resolveApiUrl(TRANSCRIPTION.SAVE, { id: id }))
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
    async fetchTsType() {
      return new Promise((resolve, reject) => {
        api
          .getWithParam(TRANSCRIPTION.TS_TYPE)
          .then((res) => {
            if (res.success) {
              res.data.forEach(element => {
                this.tsType.push({ value: element.id, label: element.name })
              });
              this.tsType.push({ value: 'other', label: 'other' })
              LocalStorage.set('ts-type', this.tsType)
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
      this.audioList = [];
      this.list = [];
      this.tsType = [];
    }
  },
});
