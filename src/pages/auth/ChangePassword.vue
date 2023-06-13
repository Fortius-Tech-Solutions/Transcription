<template>
  <q-form @submit.prevent="onSubmit()">
    <div class="q-pa-md login_form">
      <div class="authentication-container auth-content">
        <div class="align-center-box">
          <div class="user_account_header">
            <h3 class="title q-my-sm">
              {{ $q.lang.authentication.changePassword.title }}
            </h3>
          </div>
          <div class="log-alert-msg" v-if="error">
            <div class="alert-txt">
              <p class="q-mb-none q-ml-sm">{{ error }}</p>
            </div>
          </div>
          <div class="user_account_body">
            <div class="q-mb-md">
              <label class="lable-text">{{
                $q.lang.authentication.changePassword.current_Password.label
              }}</label>
              <q-input outlined hide-bottom-space v-model="data.current_password" :placeholder="$q.lang.authentication.changePassword.current_Password
                .placeHolder
                " :dense="dense" debounce="500" :type="isPwd2 ? 'password' : 'text'" :rules="[
    (val) => required(val, 'current password'),
    (val) => validatePassword(val),
  ]" :error="errors['currentPassword'] ? true : false" :error-message="serverValidationError(errors, 'currentPassword')
  ">
                <template v-slot:append>
                  <div>
                    <q-icon class="geet-icon" :name="isPwd2 ? 'visibility_off' : 'visibility'"
                      @click="isPwd2 = !isPwd2" />
                  </div>
                </template>
              </q-input>
            </div>

            <div class="q-mb-md">
              <label class="lable-text">{{
                $q.lang.authentication.changePassword.password.label
              }}</label>
              <q-input outlined hide-bottom-space v-model="data.password" :placeholder="$q.lang.authentication.changePassword.password.placeHolder
                " :dense="dense" debounce="500" :type="isPwd ? 'password' : 'text'" :rules="[
    (val) => required(val, 'password'),
    (val) => validatePassword(val),
    (val) => min(val, 6, 'password'),
  ]" :error="errors['data.password'] ? true : false" :error-message="serverValidationError(errors, 'data.password')">
                <template v-slot:append>
                  <div>
                    <q-icon class="geet-icon" :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd" />
                  </div>
                </template>
              </q-input>
            </div>

            <div class="q-mb-md">
              <label class="lable-text">{{
                $q.lang.authentication.changePassword.confirm_password.label
              }}</label>
              <q-input outlined hide-bottom-space v-model="data.password_confirmation" :placeholder="$q.lang.authentication.changePassword.confirm_password
                .placeHolder
                " :type="isPwd1 ? 'password' : 'text'" :dense="dense" debounce="500" :rules="[
    (val) => required(val, 'Confirm Password'),
    (val) => validateConfirmPassword(val),
    (val) => min(val, 6, 'Confirm Password'),
  ]" :error="errors['data.password_confirmation'] ? true : false" :error-message="serverValidationError(errors, 'data.password_confirmation')
  ">
                <template v-slot:append>
                  <div>
                    <q-icon class="geet-icon" :name="isPwd1 ? 'visibility_off' : 'visibility'"
                      @click="isPwd1 = !isPwd1" />
                  </div>
                </template>
              </q-input>
            </div>
            <div class="text-right q-pt-lg mob-action-btn">
              <q-btn outline @click="cancel" color="primary" :label="$q.lang.user.edit_profile.cancel_btn"
                class="edit-pro-btn" />
              <q-btn color="primary" :label="$q.lang.user.edit_profile.submit_btn" type="submit"
                class="edit-pro-btn q-ml-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-form>
</template>
<script setup>
import { LocalStorage } from "quasar";
import notification from "src/boot/notification";
import useServerError from "src/composables/useServerError";
import { useAuthStore } from "src/stores/auth";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const error = ref("");
const isPwd = ref(true);
const isPwd1 = ref(true);
const isPwd2 = ref(true);
const router = useRouter();
const store = useAuthStore();
const user = computed(() => {
  return store.getUser;
});
const { errors, serverValidationError } = useServerError();
const data = ref({
  current_password: "",
  password: "",
  password_confirmation: "",
});
function validateConfirmPassword() {
  if (data.value.password !== data.value.password_confirmation) {
    return "Please Type Same Password";
  }
}

function onSubmit() {
  var formData = {
    currentPassword: data.value.current_password,
    newPassword: data.value.password_confirmation,
  };
  store
    .changePassword(formData)
    .then((res) => {
      if (res.success == true) {
        notification.success(res.message);
        if (user.value.user_type_id == 3) {
          router.push({ name: 'writer-dashboard' })
        } else if (user.value.user_type_id == 2) {
          router.push({ name: 'doctor-dashboard' })
        } else {
          router.push({ name: 'home' })
        }
      } else if (res.success == false) {
        error.value = res.message;
        // errors.value = res.message;
      }
    })
    .catch((err) => {
      if (err.response) {
        errors.value = err.response.message;
      }
    });
}


function cancel() {
  history.go(-1);
}
</script>

<style lang="scss">
@import "src/css/auth.scss";
//$
</style>
