<template>
  <q-form @submit="onSubmit">
    <div class="home_user_header">
      <h3 class="comman-title">{{ slug ? "Update" : "Create" }} User</h3>
    </div>
    <div class="q-pa-md main-wrapper">
      <div class="bg-box">
        <label for="">Select User Type</label>
        <q-select
          hide-bottom-space
          outlined
          class="create-user-field-box"
          style="min-width: 300px"
          v-model="userTypeModel"
          :options="userType"
        />
        <label for="">First Name</label>
        <q-input
          outlined
          v-model="first_name"
          :dense="dense"
          placeholder="Please Enter First Name"
          class="create-user-field-box"
          :rules="[(val) => required(val, 'Name')]"
        />
        <label for="">Last Name</label>
        <q-input
          outlined
          v-model="last_name"
          :dense="dense"
          placeholder="Please Enter Last Name"
          class="create-user-field-box"
          :rules="[(val) => required(val, 'Name')]"
        />
        <!-- v-if="!slug" -->
        <div class="q-mt-lg">
          <label for="">Email</label>
          <q-input
            outlined
            v-model="email"
            :dense="dense"
            placeholder="Email"
            class="create-user-field-box"
            :rules="[(val) => required(val, 'Email'), (val) => isEmail(val)]"
          />
        </div>
        <div v-if="!slug" class="q-mt-lg">
          <div class="pass-feild">
            <label for="">Password </label>
            <q-btn label="Generate" @click="generate()" />
          </div>
          <div>
            <q-input
              outlined
              v-model="password"
              :dense="dense"
              placeholder="Password"
              class="create-user-field-box"
              :rules="[
                (val) => required(val, 'Password'),
                (val) => validatePassword(val),
              ]"
            />
          </div>
        </div>
      </div>
      <div class="form_comon_btn q-mt-md q-mr-md q-mb-md">
        <q-btn outline color="primary" label="Cancel" @click="cancel" />
        <q-btn color="primary" type="submit" label="Submit" class="q-ml-md" />
      </div>
    </div>
  </q-form>
</template>
<script setup>
import { copyToClipboard } from "quasar";
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import { USER } from "src/apis/constant";
import { userStore } from "src/stores/users";
import notification from "src/boot/notification";
import { Loading, QSpinnerGears } from "quasar";
import * as RandExp from "randexp";

import { useRoute, useRouter } from "vue-router";
import api from "src/apis/index";
import { useAuthStore } from "src/stores/auth";
const tableComponent = defineAsyncComponent(() =>
  import("src/components/table-component")
);

const tab = ref("group");
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

function onSubmit() {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  const data = {
    user_type_id: userTypeModel.value.value,
    first_name: first_name.value,
    last_name: last_name.value,
    email: email.value,
  };

  if (password.value) {
    data.password = password.value;
  }

  if (route.name == "edit-user") {
    storeUser
      .updateUser(data, edit_id.value)
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
      .saveNewUser(data)
      .then((res) => {
        console.log(data);
        if (res.success == true) {
          notification.success(
            res.message ? res.message : "User Created Successfully !"
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
  }
}
</script>

<style lang="scss">
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
