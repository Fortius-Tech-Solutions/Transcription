<template>
  <q-form @submit="onSubmit">
    <div class="home_user_header">
      <h3 class="comman-title">{{ slug ? "Update" : "Create" }} Hospital</h3>
    </div>
    <div class="q-pa-md main-wrapper">
      <div class="bg-box">
        <label for=""> Name</label>
        <q-input outlined v-model="name" :dense="dense" placeholder="Please Enter Hospital Name"
          class="create-user-field-box" :rules="[(val) => required(val, 'Name')]"
          :error="errors.length > 0 ? true : false" :error-message="serverValidationError(errors, 'Name')" />
        <!-- v-if="!slug" -->
        <div class="q-mt-lg">
          <label for="">City</label>
          <q-input outlined v-model="city" :dense="dense" placeholder="City" class="create-user-field-box"
            :rules="[(val) => required(val, 'City')]" :error="errors.length > 0 ? true : false"
            :error-message="serverValidationError(errors, 'City')" />
        </div>
        <div class="q-mt-lg">
          <label for="">Address</label>
          <q-input outlined v-model="address" :dense="dense" placeholder="Address" class="create-user-field-box"
            :rules="[(val) => required(val, 'Address')]" :error="errors.length > 0 ? true : false"
            :error-message="serverValidationError(errors, 'Address')" />
        </div>

        <div class="row">
          <div class="col-md-3 col-sm-12 col-12 edit-field mob-edit-pa q-mt-xl">
            <div class="uploder_box">
              <div v-if="headerImage" class="uploaded_img">
                <q-btn color="primary" rounded icon="las la-times" class="close" @click="deleteImage('header')" />
                <img :src="headerImage" />
              </div>
              <q-uploader v-else color="teal" label="Header Image" url="" @added="filesAdded($event, 'header')" />
            </div>
          </div>
          <div class="col-md-3 col-sm-12 col-12 edit-field mob-edit-pa q-mt-xl">
            <div class="uploder_box">
              <div v-if="footerImage" class="uploaded_img">
                <q-btn color="primary" rounded icon="las la-times" class="close" @click="deleteImage('footer')" />
                <img :src="footerImage" />
              </div>
              <q-uploader v-else color="teal" label="Footer Image" url="" @added="filesAdded($event, 'footer')" />
            </div>
          </div>
          <div class="col-md-3 col-sm-12 col-12 edit-field mob-edit-pa  q-mt-xl">
            <div class="uploder_box">
              <div v-if="waterMarkImage" class="uploaded_img">
                <q-btn color="primary" rounded icon="las la-times" class="close" @click="deleteImage('water-mark')" />
                <img :src="waterMarkImage" />
              </div>
              <q-uploader v-else color="teal" label="Water Mark Image" url=""
                @added="filesAdded($event, 'water-mark')" />
            </div>
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
import { ref, computed, onMounted, defineAsyncComponent } from "vue";
import { HOSPITAL } from "src/apis/constant";
import { hospitalStore } from "src/stores/hospital";
import notification from "src/boot/notification";
import { Loading, QSpinnerGears, uid } from "quasar";
import useServerError from "src/composables/useServerError";

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
const { errors, serverValidationError } = useServerError();

const tableRef = ref(null);
const selected = ref([]);
const filter = ref("");
const size = ref(12);
const name = ref("");
const city = ref("");
const address = ref("");
const headerImage = ref("");
const footerImage = ref("");
const waterMarkImage = ref("");

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

const filesAdded = (files, type) => {
  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type == 'header') {
        headerImage.value = e.target.result;
      } else if (type == 'footer') {
        footerImage.value = e.target.result;
      } else if (type == 'water-mark') {
        waterMarkImage.value = e.target.result;
      }
    };
    reader.readAsDataURL(file);
  });
};

const deleteImage = (type) => {
  if (type == 'header') {
    headerImage.value = '';
  } else if (type == 'footer') {
    footerImage.value = '';
  } else if (type == 'water-mark') {
    waterMarkImage.value = '';
  }
};

const slug = ref(null);
const edit_id = ref(null);


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
        headerImage.value = res.data.header_file;
        footerImage.value = res.data.footer_file;
        waterMarkImage.value = res.data.water_mark;
        Loading.hide();
      } else if (res.success == false) {
        notification.error(res.message);
        Loading.hide();
        errors.value = res.errors;
      }
    })
    .catch((error) => {
      if (error.response) {
        errors.value = error.response.data.errors;
      }
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

async function onSubmit() {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("address", address.value);
  formData.append("city", city.value);

  if (headerImage.value?.startsWith('https://')) {
    formData.append("header_file", headerImage.value);
  } else if (headerImage.value) {
    const response = await fetch(headerImage.value);
    const blob = await response.blob();
    const header = new File([blob], `header`);
    formData.append("header_file", header, `header`);
  } else {
    formData.append("header_file", "");

  }
  if (footerImage.value?.startsWith('https://')) {
    formData.append("footer_file", footerImage.value);
  } else if (footerImage.value) {
    const response = await fetch(footerImage.value);
    const blob = await response.blob();
    const footer = new File([blob], `footer`);
    formData.append("footer_file", footer, `footer`);
  } else {
    formData.append("footer_file", "");
  }

  if (waterMarkImage.value?.startsWith('https://')) {
    formData.append("water_mark", waterMarkImage.value);
  } else if (waterMarkImage.value) {
    const response = await fetch(waterMarkImage.value);
    const blob = await response.blob();
    const waterMark = new File([blob], `waterMark.png`);
    formData.append("water_mark", waterMark, `waterMark.png`);
  } else {
    formData.append("water_mark", "");
  }

  if (route.name == "edit-hospital") {
    store
      .updateHospital(formData, edit_id.value)
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
      .saveNewHospital(formData)
      .then((res) => {

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
