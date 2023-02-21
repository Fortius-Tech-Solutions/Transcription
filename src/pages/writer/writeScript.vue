<template>
  <q-form>
    <div class="home_user_header">
      <h3 class="comman-title">
        {{
          router.currentRoute.value.name !== "confirm-script"
          ? "Create"
          : "Confirm"
        }}
        Transcription
      </h3>
    </div>
    <AudioPlayer :option="{
      src: data.audio_filepath,
      title: data.audio_name,
      coverImage: '',
      coverRotate: '',
      progressBarColor: '',
      indicatorColor: '',
    }" />

    <div class="q-pa-md main-wrapper">
      <div class="bg-box">
        <label for=""> Patient Name</label>
        <q-input outlined v-model="patient_name" :dense="dense" placeholder="Please Enter Patient Name"
          class="create-user-field-box" :rules="[(val) => required(val, 'Patient Name')]"
          :error="errors.length > 0 ? true : false" :error-message="serverValidationError(errors, 'Patient Name')"
          :readonly="router.currentRoute.value.name == 'confirm-script'" />
        <q-select v-model="selectModel" :options="options" :dense="dense" class="" outlined hide-bottom-space
          :readonly="router.currentRoute.value.name == 'confirm-script'" />
        <div class="q-mt-lg">
          <label for="">Gender</label>
          <div class="q-gutter-sm">
            <q-radio v-model="gender" val="male" label="Male"
              :disable="router.currentRoute.value.name == 'confirm-script'" />
            <q-radio v-model="gender" val="female" label="Female"
              :disable="router.currentRoute.value.name == 'confirm-script'" />
            <q-radio v-model="gender" val="other" label="Don't want to Disclose"
              :disable="router.currentRoute.value.name == 'confirm-script'" />
          </div>
        </div>
        <div class="q-mt-lg">
          <label for="">Transcription</label>
          <q-editor v-model="transcription" :dense="dense" :readonly="router.currentRoute.value.name == 'confirm-script'"
            :definitions="{
              bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
            }" :rules="[(val) => required(val, 'Transcription')]" :error="errors.length > 0 ? true : false"
            :error-message="serverValidationError(errors, 'Transcription')" />
        </div>
      </div>
      <div class="form_comon_btn q-mt-md q-mr-md q-mb-md" v-if="router.currentRoute.value.name !== 'confirm-script'">
        <q-btn outline color="primary" label="Cancel" @click="cancel" />
        <q-btn color="primary" label="Save as Draft" class="q-ml-md" @click="onSubmit('Draft')" />
        <q-btn color="primary" label="Save & Confirmed" class="q-ml-md" @click="onSubmit('Confirmed')" />
      </div>
      <div v-else class="form_comon_btn q-mt-md q-mr-md q-mb-md">
        <q-btn color="primary" label="Confirmed" class="q-ml-md" @click="confirmScript()" />
      </div>
    </div>
  </q-form>
</template>
<script setup>
import { ref, computed } from "vue";
import AudioPlayer from "vue3-audio-player";
import notification from "src/boot/notification";
import { Loading, QSpinnerGears } from "quasar";
import useServerError from "src/composables/useServerError";
import { useRoute, useRouter } from "vue-router";
import { useWriterStore } from "src/stores/writer";
import { DOCTOR, TRANSCRIPTION } from "src/apis/constant";
import api from "src/apis/index";
import { useDoctorStore } from "src/stores/doctor";
import { useAuthStore } from "src/stores/auth";
const router = useRouter();
const route = useRoute();
const store = useWriterStore();
const authStore = useAuthStore();
const doctorStore = useDoctorStore();
const { errors, serverValidationError } = useServerError();
const options = ref(["operation", "child neurology", "opd"]);
const selectModel = ref(null);
const patient_name = ref(null);
const gender = ref(null);
const transcription = ref(null);
const user = computed(() => authStore.getUser);
const draftStatus = computed(() => {
  return store.getDraftStatus;
});

const data = computed(() => {
  if (router.currentRoute.value.name == "confirm-script") {
    return doctorStore.getData;
  } else {
    return store.getData;
  }
});
if (draftStatus.value == 1) {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });

  api
    .get(api.resolveApiUrl(TRANSCRIPTION.SAVE, { id: route.params.slug }))
    .then((res) => {
      if (res.success == true) {
        selectModel.value = res.data[0].ts_type;
        patient_name.value = res.data[0].patient_name;
        gender.value = res.data[0].gender;
        transcription.value = res.data[0].transcription;
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
      Loading.hide();
    });
} else if (router.currentRoute.value.name == "confirm-script") {
  selectModel.value = data.value.TSType;
  patient_name.value = data.value.patient_name;
  gender.value = data.value.gender;
  transcription.value = data.value.transcription;
}

function onSubmit(type) {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  const data = {
    patient_name: patient_name.value,
    gender: gender.value,
    transcription: transcription.value,
    TSType: selectModel.value,
  };
  if (type === "Draft") {
    data.draft = "draft";
  }

  store
    .saveTranscription(data, route.params.slug)
    .then((res) => {
      if (res.success == true) {
        notification.success(
          res.message ? res.message : "Transcription Created Successfully !"
        );
        history.go(-1);
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

function confirmScript() {
  const confirmData = {
    user_id: user.value.id,
    hospital_id: data.value.hospital_id,
    status_id: "3",
  };
  api
    .post(
      api.resolveApiUrl(DOCTOR.CONFIRM, { id: route.params.slug }),
      confirmData
    )
    .then((res) => {
      if (res.success) {
        history.go(-1);
      }
    });
}

function cancel() {
  history.go(-1);
}
</script>

<style lang="scss">
// $
@import "vue3-audio-player/dist/style.css";

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
