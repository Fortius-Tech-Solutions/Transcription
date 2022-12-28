<template>
  <q-form @submit="onSubmit">
    <div class="home_user_header">
      <h3 class="comman-title">{{ slug ? "Update" : "Create" }} Hospital</h3>
    </div>
    <div class="q-pa-md main-wrapper">
      <div class="bg-box">
        <label for=""> Name</label>
        <q-input
          outlined
          v-model="name"
          :dense="dense"
          placeholder="Please Enter Hospital Name"
          class="create-user-field-box"
          :rules="[(val) => required(val, 'Name')]"
        />
        <!-- v-if="!slug" -->
        <div class="q-mt-lg">
          <label for="">City</label>
          <q-input
            outlined
            v-model="city"
            :dense="dense"
            placeholder="City"
            class="create-user-field-box"
            :rules="[(val) => required(val, 'City')]"
          />
        </div>
        <div class="q-mt-lg">
          <label for="">Address</label>
          <q-input
            outlined
            v-model="address"
            :dense="dense"
            placeholder="Address"
            class="create-user-field-box"
            :rules="[(val) => required(val, 'Address')]"
          />
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
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import { HOSPITAL } from "src/apis/constant";
import { hospitalStore } from "src/stores/hospital";
import notification from "src/boot/notification";
import { Loading, QSpinnerGears } from "quasar";

import { useRoute, useRouter } from "vue-router";
import api from "src/apis/index";
import { useAuthStore } from "src/stores/auth";
const tableComponent = defineAsyncComponent(() =>
  import("src/components/table-component")
);
const store = hospitalStore();
const router = useRouter();
const route = useRoute();
const isIdle = ref(false);

const tableRef = ref(null);
const selected = ref([]);
const filter = ref("");
const size = ref(12);
const name = ref("");
const city = ref("");
const address = ref("");

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

// Check if current route is edit
if (route.name == "edit-hospital") {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  slug.value = route.params.slug;

  api
    .get(api.resolveApiUrl(HOSPITAL.SHOW, { id: slug.value }))
    .then((res) => {
      if (res.success == true) {
        edit_id.value = res.data.id;
        name.value = res.data.name;
        address.value = res.data.address;
        city.value = res.data.city;
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
  if (route.name !== "edit-hospital") {
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
    name: name.value,
    address: address.value,
    city: city.value,
  };

  if (route.name == "edit-hospital") {
    store
      .updateHospital(data, edit_id.value)
      .then((res) => {
        if (res.success == true) {
          notification.success(
            res.message ? res.message : "Hospital Edited Successfully !"
          );
          router.push({ name: "hospital-dashboard" });
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
    store
      .saveNewHospital(data)
      .then((res) => {
        console.log(data);
        if (res.success == true) {
          notification.success(
            res.message ? res.message : "Hospital Created Successfully !"
          );
          router.push({ name: "hospital-dashboard" });
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
