import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import api from "src/apis/index"; // Custom middle api js to handle all api requests and custom
import { TRANSCRIPTION } from "src/apis/constant";
import notification from "src/boot/notification";
export const useWriterStore = defineStore("writer", {
  state: () => ({
    data: LocalStorage.getItem("data") ?? [],
    draft: '',
    audioList: []
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
    }
  },

  actions: {
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
    }
  },
});
