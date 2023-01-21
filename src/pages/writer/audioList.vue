<template>
  <div class="q-pa-md main-wrapper">
    <q-card class="q-pa-lg" v-if="audioList.length !== 0">
      <div class="audio_list_bg" v-for="item in audioList" :key="item">
        <div class="audio_list_item">
          <div class="audio_list_col1">
            <div class="audioplayer_col">
              <span class="play_icon"><i class="las la-play"></i></span>
              <div class="audio_info">
                <p class="audio_heading">{{ item.audio_name }}</p>
                <div class="audio_meta">
                  <ul class="audio_meta_list">
                    <li>
                      Duration: <b>{{ item.audio_duration }}</b>
                    </li>
                    <li>
                      Created at: <b>{{ getHumanReadable(item.created_at) }}</b>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="audio_list_action">
            <q-btn
              v-if="item.name == 'Published'"
              round
              color="primary"
              icon="las la-download"
              class="q-ml-sm"
              padding="sm"
              @click="downloadPdf(item.id)"
            />
            <q-btn
              v-if="item.name == 'Confirmed'"
              color="green"
              label="Publish"
              class="q-ml-sm"
              @click="publishAudio(item)"
            />
            <q-chip
              :color="
                item.name == 'Confirmed' || item.name == 'Published'
                  ? 'green'
                  : item.name == 'Pending'
                  ? 'red'
                  : 'yellow'
              "
              :label="item.name"
            />

            <q-btn
              round
              color="secondary"
              icon="las la-edit"
              class="q-ml-sm"
              padding="sm"
              :disable="item.name !== 'Pending'"
              @click="setTranscription(item)"
            />
          </div>
        </div>
      </div>
    </q-card>
    <q-card class="q-pa-lg" v-else>
      <div class="text-center">
        <q-btn class="not_found_icon" outline color="primary">
          <i class="las la-exclamation-triangle"></i>
        </q-btn>
        <h5>Data Not Found</h5>
      </div>
    </q-card>
  </div>
  <div style="display: none">
    <pdfComponent v-if="showPDF" :items="pdfData" id="downloadPDF" />
  </div>
</template>

<script setup>
import AudioPlayer from "vue3-audio-player";
import api from "src/apis/index";
import { TRANSCRIPTION, DOCTOR } from "src/apis/constant";
import { ref, computed, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWriterStore } from "src/stores/writer";
import { Loading, QSpinnerGears } from "quasar";
import moment from "moment";
import html2pdf from "html2pdf.js";
const pdfComponent = defineAsyncComponent(() =>
  import("src/components/dowloadPDF.vue")
);
const router = useRouter();
const route = useRoute();
const showPDF = ref(false);
const pdfData = ref([]);
const store = useWriterStore();
console.log(route.params.slug);
Loading.show({
  spinner: QSpinnerGears,
  message: "Loading...",
});
const audioList = ref([]);
store
  .fetchAudioList({ user_id: route.params.slug })
  .then((res) => {
    audioList.value = res.data.data;
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    Loading.hide();
  });
function setTranscription(item) {
  store.draft = item.draft;
  store.data = item;
  router.push({ name: "write-script", params: { slug: item.id } });
}

function publishAudio(item) {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  api
    .post(api.resolveApiUrl(TRANSCRIPTION.SAVE, { id: item.id }), {
      status_id: "4",
    })
    .then((res) => {
      console.log(res);
      audioList.value.forEach((element, index, object) => {
        if (element.id == item.id) {
          element.name = "Published";
        }
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      Loading.hide();
    });
}

function downloadPdf(id) {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  api
    .getWithParam(DOCTOR.DOWNLOAD, { id: id })
    .then((res) => {
      if (res.success) {
        console.log(res);
        showPDF.value = true;
        fetchPdf(res);
      }
    })
    .catch((err) => console.log(err))
    .finally(() => Loading.hide());
}

async function fetchPdf(res) {
  pdfData.value = res.data;
  setTimeout(() => {
    exportToPDF(document.getElementById("downloadPDF"));
    Loading.hide();
  }, 4000);
}

function exportToPDF(data) {
  html2pdf(data, {
    margin: 0,
    filename: `${pdfData.value[0].patient_name}_${Date.now()}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 1, letterRendering: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  });
}
</script>

<style lang="scss">
@import "vue3-audio-player/dist/style.css";

h3.comman-title {
  font-size: 25px;
  font-weight: bold;
  margin-left: 33px;
  padding-top: 20px;
}

.audio_list_item {
  background: $white;
  border: 1px solid #ccc;
  padding: $value-15;
  margin-bottom: $value-10;
  border-radius: $value-15;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.audio_list_col1 {
  display: flex;
  .play_btn {
    flex: 0 0 auto;
  }
  .audio_name {
    .name {
      margin: 0;
      font-weight: 500;
      color: #2398c8;
    }
    .time {
      color: #666;
    }
  }
}

.audio_list_col1 {
  width: 70%;
}
.audioplayer_col {
  width: 100%;
  display: flex;
  .audio__player {
    flex-direction: column;
    align-items: flex-start;
    .audio__player-play-and-title {
      flex: 0 0 auto;
      .audio__player-title {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        max-width: 600px;
      }
      .audio__player-play > img {
        width: $value-50;
        height: $value-50;
        display: none;
      }
      .audio__player-play-icon {
        top: $value-0;
        left: $value-0;
        background: $blue;
      }
      .audio__player-play-icon > img {
        width: $value-20;
        height: $value-20;
      }
      .audio__player-title {
        padding-left: $value-50;
      }
    }
    .audio__player-progress-container {
      padding-left: 54px;
      position: relative;
      align-items: center;
      margin-top: $value-5;
      flex-direction: row;
    }
    .audio__player-time {
      flex: 0 0 auto;
      padding-left: 10px;
      margin: 0;
      span {
        font-weight: 500;
        color: #666;
      }
    }
    .audio__player-progress-wrap {
      width: 100%;
      margin: 0;
      .audio__player-progress-point {
        box-shadow: none !important;
      }
    }
  }
  .play_icon {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: #5d9ebc;
    display: inline-flex;
    color: #fff;
    font-size: 22px;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
  }
  .audio_info {
    padding-left: 15px;
    .audio_meta_list {
      margin: 0;
      padding: 0;
      list-style-type: none;
      li {
        display: inline-flex;
        font-size: 12px;
        color: #454545;
        margin-right: $value-10;
        b {
          padding-left: 2px;
        }
      }
    }
    .audio_heading {
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 30%;
    }
  }
}

.not_found_icon {
  padding: 0;
  margin-bottom: 20px;
  i {
    font-size: 60px;
  }
  &:before {
    height: 80px;
    border-radius: 50%;
    width: 80px;
    border-width: 2px;
  }
  .q-btn__content {
    padding: 10px 0 0 11px;
  }
}
</style>
