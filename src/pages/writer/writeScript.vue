<template>
  <!-- <form autocorrect="on" autocapitalize="off" autocomplete="off" spellcheck="true">
    <q-editor model="editor" />
  </form> -->
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
  <AudioPlayer ref="audioRef" :option="{
    src: data.audio_filepath,
    title: data.audio_name,
    coverImage: '',
    coverRotate: '',
    progressBarColor: '',
    indicatorColor: '',
    autoplay: false
  }" />
  <q-form>
    <div class="q-pa-md main-wrapper">
      <div class="bg-box">
        <label for=""> Patient Name</label>
        <q-input outlined v-model="patient_name" :dense="dense" placeholder="Please Enter Patient Name"
          :disable="data.isNew" class="create-user-field-box" :rules="[(val) => required(val, 'Patient Name')]"
          :error="errors.length > 0 ? true : false" :error-message="serverValidationError(errors, 'Patient Name')" />
        <q-select v-model="selectModel" :options="options" :dense="dense" class="select_drop" outlined hide-bottom-space
          label="Select Type" :disable="data.isNew" />
        <div v-if="selectModel?.value == 'other'" class="q-mt-md">
          <label for="">Enter Other Type</label>
          <div class="btn_input_box">
            <q-input v-model="otherType" :dense="dense" outlined type="text" />
            <q-btn class="q-ml-md" color="primary" label="Add Type" @click="onSubmitType" />
          </div>
        </div>
        <div class="q-mt-lg">
          <label for="">Gender</label>
          <div class="q-gutter-sm">
            <q-radio v-model="gender" val="male" label="Male" :disable="data.isNew" />
            <q-radio v-model="gender" val="female" label="Female" :disable="data.isNew" />
            <q-radio v-model="gender" val="other" label="Don't want to Disclose" :disable="data.isNew" />
          </div>
        </div>
        <div class="q-mb-md q-mt-md">
          <label class=" q-mr-md" for="">Date of Service</label>
          <q-btn color="primary" icon="las la-calendar" @click="calender = true" :label="dateRange ?? 'Select Date'"
            :disable="data.isNew" />
          <q-btn v-if="dateRange" @click="clearFilter" icon="la la-times" />
        </div>
        <div class="q-mt-lg">
          <label for="">Transcription</label>
          <form autocorrect="on" autocapitalize="off" autocomplete="off" spellcheck="true">
            <q-editor v-model="transcription" :dense="dense" :definitions="{
              bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
            }" :rules="[(val) => required(val, 'Transcription')]" :error="errors.length > 0 ? true : false"
              :error-message="serverValidationError(errors, 'Transcription')" :disable="data.isNew" />
          </form>
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
  <q-dialog v-model="calender">
    <q-date v-model="dateRange" :options="dateOptions">
      <q-btn label="Submit" v-close-popup color="primary" />
    </q-date>
  </q-dialog>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import AudioPlayer from "vue3-audio-player";
import notification from "src/boot/notification";
import { Loading, QSpinnerGears } from "quasar";
import { date } from 'quasar'
import useServerError from "src/composables/useServerError";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { useWriterStore } from "src/stores/writer";
import { DOCTOR, TRANSCRIPTION } from "src/apis/constant";
import api from "src/apis/index";
import { useDoctorStore } from "src/stores/doctor";
import { useAuthStore } from "src/stores/auth";
const router = useRouter();
const route = useRoute();
const editor = ref('');
const calender = ref(false);
const dateRange = ref(null);
const store = useWriterStore();
const authStore = useAuthStore();
const doctorStore = useDoctorStore();
const { errors, serverValidationError } = useServerError();
const options = computed(() => store.getTsTypeList)
const selectModel = ref(null);
const patient_name = ref(null);
const gender = ref(null);
const transcription = ref(null);
const audioRef = ref(null);
const otherType = ref('')
const user = computed(() => authStore.getUser);
const draftStatus = computed(() => {
  return store.getDraftStatus;
});

onMounted(() => {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  store.fetchTsType().finally(() => {
    Loading.hide();
  });
})
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
  patient_name.value = data.value.patient_name;
  gender.value = data.value.gender;
  transcription.value = data.value.transcription;
  dateRange.value = data.value.date_of_service.split('T')[0]
  options.value.forEach(element => {
    if (element.value == data.value.TSType_id) {
      selectModel.value = element
    }
  });
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
    TSType_id: selectModel.value.value,
    date_of_service: dateRange.value
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
  console.log(data.value);
  const confirmData = {
    user_id: user.value.id,
    hospital_id: data.value.hospital_id,
    status_id: "3",
    patient_name: patient_name.value,
    gender: gender.value,
    transcription: transcription.value,
    TSType_id: selectModel.value.value,
    date_of_service: dateRange.value
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
function dateOptions(dateRange) {
  return dateRange <= date.formatDate(Date.now(), 'YYYY/MM/DD')
}
function onSubmitType() {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  const data = {
    name: otherType.value
  }
  api
    .post('writer/add-ts-type', data)
    .then((res) => {
      if (res.success) {
        store.tsType = [];
        store.fetchTsType()
        selectModel.value = ''
      }
    }).finally(() => {
      Loading.hide();
    });;
}

function clearFilter() {
  dateRange.value = null;
}

function cancel() {
  history.go(-1);
}

onBeforeRouteLeave((to, from, next) => {
  console.log("leave");
  store.resetList()
  doctorStore.resetList()
  clearFilter()
  next();
});
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

.btn_input_box {
  display: flex;
}

.q-field--outlined .q-field__control {
  height: 45px;
  min-height: 45px;
}

.q-field__marginal {
  height: 45px;
}

.select_drop {
  .q-field__label {
    top: 14px;
  }
}
</style>
