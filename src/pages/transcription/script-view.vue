<template>
  <div>
    <div class="home_user_header">
      <h3 class="comman-title">
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
        <q-input outlined v-model="patient_name" readonly :dense="dense" placeholder="Please Enter Patient Name"
          class="create-user-field-box" />
        <q-select v-model="selectModel" :options="options" :dense="dense" class="" outlined hide-bottom-space disable />
        <div class="q-mt-lg">
          <label for="">Gender</label>
          <div class="q-gutter-sm">
            <q-radio disable v-model="gender" val="male" label="Male" />
            <q-radio disable v-model="gender" val="female" label="Female" />
            <q-radio disable v-model="gender" val="other" label="Don't want to Disclose" />
          </div>
        </div>
        <div class="q-mt-lg">
          <label for="">Transcription</label>
          <q-editor v-model="transcription" :dense="dense" :definitions="{
            bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
          }" readonly />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AudioPlayer from "vue3-audio-player";
import { useRoute, useRouter } from "vue-router";
import { useWriterStore } from "src/stores/writer";
const router = useRouter();
const route = useRoute();
const store = useWriterStore();
const data = computed(() => {
  return store.getData;
});

const options = ref(["operation", "child neurology", "opd"]);
const selectModel = ref(data.value.ts_type);
const patient_name = ref(data.value.patient_name);
const gender = ref(data.value.gender);
const transcription = ref(data.value.transcription);
</script>

<style lang="scss" scoped>
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
</style>
