import { api } from "boot/axios";
import Notify from "boot/notification";
import { LocalStorage, Quasar } from "quasar";

export default {
  get(url) {
    return new Promise((resolve, reject) => {
      api
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          this.showApiError(error);
          reject(error);
        });
    });
  },

  getWithParam(url, params, config = {}) {
    return new Promise((resolve, reject) => {
      api
        .get(url, { params: params, headers: config.headers })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          this.showApiError(error);
          reject(error);
        });
    });
  },

  post(url, data, config = {}) {
    return new Promise((resolve, reject) => {
      api
        .post(url, data, config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          this.showApiError(error);

          reject(error);
        });
    });
  },

  postWithParam(url, data, params, config = {}) {
    return new Promise((resolve, reject) => {
      api
        .post(url, data, { params: params, headers: config.headers })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          this.showApiError(error);

          reject(error);
        });
    });
  },

  put(url, data) {
    return new Promise((resolve, reject) => {
      api
        .put(url, data)
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          this.showApiError(error);

          reject(error);
        });
    });
  },

  delete(url, data) {
    return new Promise((resolve, reject) => {
      api
        .delete(url, { data: data })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          this.showApiError(error);

          reject(error);
        });
    });
  },

  resolveApiUrl(url, json) {
    for (var key of Object.keys(json)) {
      url = url.replace(`:${key}`, json[key]);
    }
    return url;
  },

  showApiError(error) {
    if (error.response) {
      if (error.response.status == 401) {
        LocalStorage.remove("access_token");
        LocalStorage.remove("user");
        Notify.error("Your session has expired. Please login again.");
        location.reload();
      } else if (error.response.status == 419) {
        location.reload();
      } else if (error.response.status == 500) {
        Notify.error(
          "There's been a glitch. We're not quite sure what went wrong. Please try again later."
        );
      } else if (error.response.status == 404) {
        if (!error.response.data.message) {
          Notify.error("The requested resource was not found.");
        }
      } else {
        let errorMessage = error?.response?.data?.errors;
        if (errorMessage) {
          if (errorMessage.required) {
          } else {
            Notify.error("Data validation failed");
            return;
          }
        } else if (error?.response?.data?.code) {
          const code = error?.response?.data?.code;
          if (code == "ER_DUP_ENTRY") {
            Notify.error(
              "Please check your input. This value is already in use."
            );
          } else if (code == "E_ROW_NOT_FOUND") {
            Notify.error(Quasar.lang.props.errors.notFound);
          }
        }
      }
    } else if (error.request) {
      Notify.error("The request was made but no response was received");
    } else {
      Notify.error(error.message);
    }
  },
};
