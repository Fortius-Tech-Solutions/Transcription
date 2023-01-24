<template>
  <q-form @submit.prevent="onSubmit()">
    <div class="container">
      <section class="profile-sec q-mb-md">
        <div class="home_user_header">
          <h3 class="comman-title">{{ slug? "Update": "Create" }} User</h3>
        </div>
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

                <q-btn color="primary" icon="las la-pen" class="edit-pro-btn-avtar" @click.prevent="showFileChooser" />
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
                :placeholder="$q.lang.user.edit_profile.name.placeHolder" :rules="[(val) => required(val, 'Last Name')]"
                :error="errors.length > 0 ? true : false" :error-message="serverValidationError(errors, 'last_name')"
                class="q-ml-sm q-mr-sm">
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
                <label for="">Password </label>
                <q-btn label="Generate" @click="generate()" />
              </div>
              <q-input outlined hide-bottom-space v-model="password" :dense="dense" :rules="[
                (val) => required(val, 'Password'),
                (val) => validatePassword(val),
              ]" :error="errors.length > 0 ? true : false" :error-message="serverValidationError(errors, 'password')"
                class="q-ml-sm q-mr-sm">
              </q-input>
            </div>
          </div>

          <div class="text-right q-pt-lg mob-action-btn">
            <q-btn outline @click="cancel" color="primary" :label="$q.lang.user.edit_profile.cancel_btn"
              class="edit-pro-btn" />
            <q-btn color="primary" :label="$q.lang.user.edit_profile.submit_btn" type="submit"
              class="edit-pro-btn q-ml-sm" />
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

// Check if current route is edit
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

  if (imgSrc.value.startsWith('https://')) {
    formData.append("avtar", imgSrc.value);
  } else if (imgSrc.value) {
    const response = await fetch(imgSrc.value);
    const blob = await response.blob();
    const image = new File([blob], `image${uid()}.png`);
    formData.append("avtar", image, `image${uid()}.png`);
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
          console.log(res);
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
    // background: #d9d9d9;
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
</style>
