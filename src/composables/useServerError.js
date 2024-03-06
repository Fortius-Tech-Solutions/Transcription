import { ref } from "vue";

export default function useServerError() {
  const errors = ref([]);

  const serverValidationError = (errors, fieldName) => {
    let err = ''
    if (errors.length !== 0) {
      errors.forEach(element => {
        if (element.field === fieldName) {
          err = element.field === fieldName ? element.message : false;
        }
      });
    }
    return err

  }

  return {
    errors,
    serverValidationError,
  };
}
