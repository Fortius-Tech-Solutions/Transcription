<template>
  <q-form @submit.prevent="onSubmit()">
    <div class="container">
      <section class="profile-sec q-mb-md">
        <div class="home_user_header">
          <h3 class="comman-title">{{ slug ? "Update" : "Create" }} User</h3>
        </div>
        <div class="q-pa-md main-wrapper">

          <div class="profile-card">
            <div class="text-center">
              <div class="profile-head edit-pro-head mob-pro-head">
                <div class="profile-avtar">
                  <!-- <img v-if="true" src="" alt="" /> -->
                  <img v-if="imgSrc" :src="imgSrc" alt="user" />
                  <img v-else src="~assets/images/user-avtart-img.png" alt="" />
                </div>
                <div class="avtar-edit-icon">
                  <input style="display: none" ref="imgInput" type="file" name="image" :accept="accept"
                    @change="setImage" />

                  <q-btn color="primary" icon="las la-pen" class="edit-pro-btn-avtar"
                    @click.prevent="showFileChooser" />
                </div>
              </div>
            </div>
            <div class="row q-col-gutter-lg q-mt-sm edit-avtar-field">
              <div class="col-md-6 col-sm-12 col-12 edit-field mob-edit-pa">
                <label class="lable-text q-mb-sm q-ml-sm q-mr-sm">Select User Type</label>
                <q-select outlined hide-bottom-space :dense="dense" class="q-ml-sm q-mr-sm" v-model="userTypeModel"
                  :options="userType" :error="errors.length > 0 ? true : false"
                  :error-message="serverValidationError(errors, 'user_type_id')" />
              </div>
              <div class="col-md-6 col-sm-12 col-12 edit-field mob-edit-pa">
                <label class="lable-text q-mb-sm q-ml-sm q-mr-sm">First Name</label>
                <q-input outlined hide-bottom-space v-model="first_name" :dense="dense" class="q-ml-sm q-mr-sm"
                  :rules="[(val) => required(val, 'First Name')]" :error="errors.length > 0 ? true : false"
                  :error-message="serverValidationError(errors, 'first_name')">
                </q-input>
              </div>
              <div class="col-md-6 col-sm-12 col-12 edit-field mob-edit-pa">
                <label class="lable-text q-mb-sm q-ml-sm q-mr-sm">Last Name</label>
                <q-input outlined hide-bottom-space v-model="last_name" :dense="dense"
                  :placeholder="$q.lang.user.edit_profile.name.placeHolder"
                  :rules="[(val) => required(val, 'Last Name')]" :error="errors.length > 0 ? true : false"
                  :error-message="serverValidationError(errors, 'last_name')" class="q-ml-sm q-mr-sm">
                </q-input>
              </div>

              <div class="col-md-6 col-sm-12 col-12 edit-field mob-edit-pa">
                <label class="lable-text q-mb-sm q-ml-sm q-mr-sm">Email</label>
                <q-input outlined hide-bottom-space v-model="email" :dense="dense" class="q-ml-sm q-mr-sm" :rules="[
    (val) => required(val, 'Email'),
    (val) => isEmail(val),
  ]" :error="errors.length > 0 ? true : false" :error-message="serverValidationError(errors, 'email')">
                </q-input>
              </div>
              <div v-if="!slug" class="col-md-6 col-sm-12 col-12 edit-field mob-edit-pa mob_digit">
                <div class="pass-feild">
                  <label class="lable-text q-mb-sm q-ml-sm q-mr-sm" for="">Password </label>
                  <q-btn label="Generate" @click="generate()" />
                </div>
                <q-input outlined hide-bottom-space v-model="password" :dense="dense" :rules="[
    (val) => required(val, 'Password'),
    (val) => validatePassword(val),
  ]" :error="errors.length > 0 ? true : false" :error-message="serverValidationError(errors, 'password')"
                  class="q-ml-sm q-mr-sm">
                </q-input>
              </div>
              <span v-if="userTypeModel.value == 2">
                <div class="col-md-6 col-sm-12 col-12 edit-field mob-edit-pa">
                  <label class="lable-text q-mb-sm q-ml-sm q-mr-sm">Specialty</label>
                  <q-input outlined hide-bottom-space v-model="specialty" :dense="dense"
                    :placeholder="$q.lang.user.edit_profile.specialty.placeHolder"
                    :rules="[(val) => required(val, 'Specialty')]" :error="errors.length > 0 ? true : false"
                    :error-message="serverValidationError(errors, 'specialty')" class="q-ml-sm q-mr-sm">
                  </q-input>
                </div>
                <div class="col-md-3 col-sm-12 col-12 edit-field mob-edit-pa  q-mt-xl">
                  <div class="uploder_box">
                    <div v-if="signatureImage" class="uploaded_img">
                      <q-btn color="primary" rounded icon="las la-times" class="close" @click="deleteImage('sign')" />
                      <img :src="signatureImage" />
                    </div>
                    <q-uploader v-else color="teal" label="Signature Image" url=""
                      @added="filesAdded($event, 'sign')" />
                  </div>
                </div>
              </span>
            </div>


            <div class="text-right q-pt-lg mob-action-btn">
              <q-btn outline @click="cancel" color="primary" :label="$q.lang.user.edit_profile.cancel_btn"
                class="edit-pro-btn" />
              <q-btn color="primary" :label="$q.lang.user.edit_profile.submit_btn" type="submit"
                class="edit-pro-btn q-ml-sm" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </q-form>
</template>

<script setup>
import { uid, copyToClipboard } from 'quasar'
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import { USER } from "src/apis/constant";
import { userStore } from "src/stores/users";
import notification from "src/boot/notification";
import { Loading, QSpinnerGears } from "quasar";
import * as RandExp from "randexp";
import useServerError from "src/composables/useServerError";
import { useRoute, useRouter } from "vue-router";
import api from "src/apis/index";
import { useAuthStore } from "src/stores/auth";
const tableComponent = defineAsyncComponent(() =>
  import("src/components/table-component")
);
const { errors, serverValidationError } = useServerError();

const storeUser = userStore();
storeUser.fetchUserTypeList();
const router = useRouter();
const route = useRoute();
const isIdle = ref(false);
const authStore = useAuthStore();
const isSuperUser = computed(() => {
  return authStore.isSuperUser;
});
const userType = computed(() => {
  return storeUser.getUserType;
});

const tableRef = ref(null);
const selected = ref([]);
const filter = ref("");
const characters = ref("a-z,A-Z,0-9,#");
const size = ref(12);
const userTypeModel = ref("");
const first_name = ref("");
const last_name = ref("");
const email = ref("");
const password = ref("");
const specialty = ref("");
const signatureImage = ref("");

function generate() {
  const s1 = new RandExp(/[A-Z]{1}/gm).gen();
  const s2 = new RandExp(/[a-z]{3,5}/gm).gen();
  const s3 = new RandExp(/[@#$%^&*!]{1}/gm).gen();
  const s4 = new RandExp(/[0-9]{3,5}/gm).gen();

  password.value = s1 + s2 + s3 + s4;
  copyToClipboard(password.value);
}

function onSelection(rows, added) {
  if (added) {
    rows.forEach((item, index) => {
      selected.value.push(item.id);
    });
  } else {
    rows.forEach((item) => {
      selected.value.forEach((items, index, object) => {
        if (items == item.id) {
          object.splice(index, 1);
        }
      });
    });
  }
}

const slug = ref(null);
const edit_id = ref(null);
const selectedGroups = ref([]);

const imgInput = ref("");
const imgSrc = ref("");
function showFileChooser() {
  imgInput.value.click();
}

async function setImage(e) {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  const file = e.target.files[0];
  const render = new FileReader();
  render.onloadend = () => {
    imgSrc.value = render.result;
    Loading.hide();
  };
  render.readAsDataURL(file);
}

const filesAdded = (files, type) => {
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type == 'sign') {
        signatureImage.value = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  });
};


if (route.name == "edit-user") {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  slug.value = route.params.slug;

  api
    .get(api.resolveApiUrl(USER.SHOW, { id: slug.value }))
    .then((res) => {
      if (res.success == true) {
        edit_id.value = res.data[0].id;
        userTypeModel.value = {
          label: res.data[0].usertype.name,
          value: res.data[0].usertype.id,
        };
        first_name.value = res.data[0].first_name;
        last_name.value = res.data[0].last_name;
        email.value = res.data[0].email;
        imgSrc.value = res.data[0].avtar;
        specialty.value = res.data[0].speciality;
        // headerImage.value = res.data[0].header_file;
        // footerImage.value = res.data[0].footer_file;
        // waterMarkImage.value = res.data[0].water_mark;
        signatureImage.value = res.data[0].signature;
        Loading.hide();
      } else if (res.success == false) {
        notification.error(res.message);
        Loading.hide();
      }
    })
    .catch((error) => {
      console.log(error);
      Loading.hide();
    })
    .finally(() => {
      isIdle.value = true;
      Loading.hide();
    });
}

onMounted(() => {
  if (route.name !== "edit-user") {
    isIdle.value = true;
  }
});

function cancel() {
  history.go(-1);
}

const deleteImage = (type) => {
  if (type == 'sign') {
    signatureImage.value = '';
  }
};

async function onSubmit() {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });

  const formData = new FormData();
  formData.append("user_type_id", userTypeModel.value.value);
  formData.append("first_name", first_name.value);
  formData.append("last_name", last_name.value);
  formData.append("email", email.value);

  if (password.value) {
    formData.append("password", password.value);
  }

  if (imgSrc.value?.startsWith('https://')) {
    formData.append("avtar", imgSrc.value);
  } else if (imgSrc.value) {
    const response = await fetch(imgSrc.value);
    const blob = await response.blob();
    const image = new File([blob], `profile`);
    formData.append("avtar", image, `profile`);
  } else {
    formData.append("avtar", "");
  }

  if (userTypeModel.value.value == 2) {
    formData.append("speciality", specialty.value);
    if (signatureImage.value?.startsWith('https://')) {
      formData.append("signature", signatureImage.value);
    } else if (signatureImage.value) {
      const response = await fetch(signatureImage.value);
      const blob = await response.blob();
      const signature = new File([blob], `signature`);
      formData.append("signature", signature, `signature`);
    } else {
      formData.append("signature", "");
    }
  }

  if (route.name == "edit-user") {
    storeUser
      .updateUser(formData, edit_id.value)
      .then((res) => {
        if (res.success == true) {
          notification.success(
            res.message ? res.message : "User Edited Successfully !"
          );
          router.push({ name: "user-dashboard" });
          Loading.hide();
        } else if (res.success == false) {
          notification.error(res.message);
          Loading.hide();
        }
      })
      .finally(() => {
        Loading.hide();
      });
  } else {
    storeUser
      .saveNewUser(formData)
      .then((res) => {
        if (res.success == true) {
          notification.success(
            res.message ? res.message : "User Created Successfully !"
          );
          router.push({ name: "user-dashboard" });
          Loading.hide();
        } else {
          errors.value = res.errors;
        }
      })
      .catch((err) => {
        if (err.response) {
          errors.value = err.response.data.errors;
        }
      })
      .finally(() => {
        Loading.hide();
      });
  }
}
</script>

<style lang="scss">
@import "src/css/user.scss";
@import "src/css/responsive.scss";
@import "src/css/mobileapp-profile.scss";

// $
.pass-feild {
  @include hr-vr-center-between;
}

.add_option_gruop {
  @include box-vr-center;

  .add_user_grup_btn {

    width: 33.33%;
    height: $value-86;
    margin-right: $percentage-2;
    padding-right: $value-10;
    @include hr-vr-center;

    a {
      text-decoration: none;
      font-size: $value-20;
      margin-left: $value-10;
      color: #000000;
      font-weight: map-get($font-weights, medium);
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .icon-btn {
    font-size: $value-50;
  }
}

h3.comman-title {
  font-size: $value-25;
  font-weight: map-get($font-weights, medium);
  margin-left: $value-33;
  padding-top: $value-20;
}

.create_user-text {
  p {
    font-size: $value-16;
    font-weight: map-get($font-weights, medium);
  }
}

.q-table__card {
  box-shadow: none;
}

.main-wrapper {
  .create-user-field-box {
    .q-field__control {
      height: $value-45;
    }
  }
}

.profile-card .q-field--auto-height .q-field__control,
.profile-card .q-field--auto-height .q-field__native {
  min-height: auto;
}

.profile-card .q-field__marginal {
  height: auto;
}

.uploder_box {
  padding-left: 8px;
  padding-right: 8px;
  position: relative;

  .q-uploader {
    width: 100%;

    .q-uploader__subtitle {
      display: none;
    }

    .q-uploader__list {
      min-height: auto;
      padding: 0;

      .q-uploader__file {
        padding: 8px;
      }
    }
  }

  .close {
    position: absolute;
    top: -12px;
    right: -4px;
    padding: 0;
    width: 25px;
    height: 25px;
    min-height: auto;
  }
}

.uploaded_img {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-height: 100%;
  }

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>
