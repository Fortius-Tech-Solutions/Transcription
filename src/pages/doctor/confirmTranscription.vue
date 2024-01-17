<template>
  <div class="q-pa-md main-wrapper">
    <q-infinite-scroll @load="onLoadList" :offset="250" scroll-target="body" ref="scrollList">
      <q-card class="q-pa-lg" v-if="verifyList.length !== 0">
        <div class="patient_trans_list_bg" v-for="item in verifyList" :key="item">
          <div class="patient_trans_list" @click="
            item.name == 'Confirmed' || item.name == 'Published'
              ? null
              : confirmScript(item)
            ">
            <div class="paient_trans_head">
              <div class="left">
                <h2>
                  {{ item.patient_name }}
                  <q-chip dense color="primary" text-color="white">
                    {{ item.gender }}
                  </q-chip>
                </h2>
                <h6>{{ item.TSType_name }}</h6>
              </div>
              <div class="right">

                <div class="hospital_name">{{ item.hospital_name }}</div>
                <ul class="date_time">
                  <li>
                    <q-btn v-if="item.name == 'Published'" round color="primary" icon="las la-download" class="q-ml-sm"
                      padding="sm" @click="goToPdf(item)" title="Report Download" />
                  </li>
                  <li>
                    <q-chip :color="item.name == 'Confirmed' || item.name == 'Published'
                      ? 'green'
                      : item.name == 'Pending'
                        ? 'red'
                        : 'yellow'
                      " :label="item.name" />
                  </li>
                  <li>
                    Duration: <b>{{ item.audio_duration }}</b>
                  </li>
                  <li>
                    Updated at: <b>{{ item.updated_at.split("T")[0] }}</b>
                  </li>
                </ul>
              </div>
            </div>
            <p class="paient_trans_para" v-html="item.transcription">
            </p>
          </div>
        </div>
      </q-card>
      <q-card class="q-pa-lg" v-else-if="!loading">
        <div class="text-center">
          <q-btn class="not_found_icon" outline color="primary">
            <i class="las la-exclamation-triangle"></i>
          </q-btn>
          <h5>Data Not Found</h5>
        </div>
      </q-card>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>

  <!-- <div style="display: none">
    <pdfComponent v-if="showPDF" :items="pdfData" id="downloadPDF" />
  </div> -->
  <!-- style="display: none" -->
  <!-- <q-dialog v-model="showPDF" full-height full-width>
    <pdfComponent @callHeader="fetchPdf" :items="pdfData" id="downloadPDF" /> -->
  <!-- <q-btn color="primary" label="Print" @click="printPDF()" /> -->
  <!-- </q-dialog> -->
</template>

<script setup>
import api from "src/apis/index";
import { DOCTOR } from "src/apis/constant";
import { ref, computed, defineAsyncComponent } from "vue";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { Loading, QSpinnerGears, date } from "quasar";
import { useDoctorStore } from "src/stores/doctor";
import { useAuthStore } from "src/stores/auth";
import moment from "moment";
import html2pdf from "html2pdf.js";
import { useMasterStore } from "src/stores/master";
const pdfComponent = defineAsyncComponent(() =>
  import("src/components/dowloadPDF.vue")
);
const showPDF = ref(false);
const pdfData = ref([]);
const router = useRouter();
const route = useRoute();
const store = useDoctorStore();
const authStore = useAuthStore();
const master = useMasterStore();
const scrollList = ref(null);
const currentPage = ref(1);
const limit = ref(6);
const loading = ref(true);
const verifyList = computed(() => {
  return store.getTranscriptionList;
});
const user = computed(() => {
  return authStore.getUser;
});

const data = ref({
  hospitalId: route.params.slug.split('/')[0],
  statusId: route.params.slug.split('/')[1]
});
Loading.show({
  spinner: QSpinnerGears,
  message: "Loading...",
});

function onLoadList(index, done) {
  fetchList().then((res) => {
    if (res.success && res.data.data.length > 0) {
      currentPage.value = currentPage.value + 1;
      done();
    } else {
      loading.value = false;
      done(true);
    }
  }).catch((err) => {
    done(true);
  }).finally(() => {
    Loading.hide();
  });
}

function fetchList() {
  const data = {
    hospitalId: route.params.slug.split('/')[0],
    statusId: route.params.slug.split('/')[1],
    limit: limit.value,
    page: currentPage.value,
  };
  return store.fetchTranscriptionList(data)
}


function confirmScript(item) {
  item.hospital_id = route.params.slug.split('/')[0],
    item.isNew = route.params.slug.split('/')[1] == 1 ? true : false
  store.data = item;
  router.push({ name: "confirm-script", params: { slug: item.id } });
}

// async function downloadPDF(res) {
//   Loading.show({
//     message: "Loading...",
//     spinner: QSpinnerGears,
//   });
//   showPDF.value = true;
//   fetchPdf(res);
// }

// async function goToPdf(data) {
//   master.pdfData = data
//   router.push({ name: 'transcription-pdf' })
// }

async function goToPdf(data) {
  // showPDF.value = true;
  // pdfData.value = data;
  master.pdfData = data
  router.push({ name: 'transcription-pdf' })
}

// async function fetchPdf(res, item) {
//   pdfData.value = res;
//   setTimeout(() => {
//     const pageBreak = document.getElementById("mode");
//     exportToPDF(document.getElementById("downloadPDF"), item ?? "", pageBreak);
//     Loading.hide();
//   }, 4000);
// }


// function ExportToDoc(element, filename = '') {
//   var html = document.getElementById(element).innerHTML;
//   var blob = new Blob(['\ufeff', html], {
//     type: 'application/msword'
//   });
//   // Specify link url
//   var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
//   // Specify file name
//   filename = filename ? filename + '.doc' : 'document.doc';
//   // Create download link element
//   var downloadLink = document.createElement("a");

//   document.body.appendChild(downloadLink);

//   if (navigator.msSaveOrOpenBlob) {
//     navigator.msSaveOrOpenBlob(blob, filename);
//   } else {
//     // Create a link to the file
//     downloadLink.href = url;

//     // Setting the file name
//     downloadLink.download = filename;

//     //triggering the function
//     downloadLink.click();
//   }
//   document.body.removeChild(downloadLink);
// }

// function exportToPDF(data) {
//   html2pdf(data, {
//     margin: 0,
//     filename: `${pdfData.value.patient_name}_${date.formatDate(pdfData.value.date_of_service, 'DD-MM-YYYY')}.pdf`,
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: { scale: 1, letterRendering: true },
//     jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
//   });
// }

function clearFilter() {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  // dateRange.value = null;
  store.transcriptionList = []
  currentPage.value = 1;
  loading.value = true;
  scrollList.value.reset();
  scrollList.value.resume();
  scrollList.value.trigger();
}
onBeforeRouteLeave((to, from, next) => {
  console.log("leave");
  store.resetList()

  next();
});
</script>

<style lang="scss" scoped>
h3.comman-title {
  font-size: 25px;
  font-weight: bold;
  margin-left: 33px;
  padding-top: 20px;
}

.patient_trans_list {
  background: #f8ffeb;
  border: 1px solid #cbd6b8;
  padding: $value-15;
  margin-bottom: $value-10;
  border-radius: $value-15;

  .paient_trans_head {
    display: flex;
    justify-content: space-between;

    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 400;
      display: flex;

      .q-chip {
        margin: 0 0 0 5px !important;
      }
    }

    h6 {
      margin: 0;
      font-size: 14px;
      color: #d67206;
    }

    .right {
      .date_time {
        margin: 0;
        padding: 0;
        list-style-type: none;

        li {
          display: inline-flex;
          font-size: 12px;
          color: #454545;
          margin-left: $value-10;

          b {
            padding-left: 2px;
          }
        }
      }
    }
  }

  .paient_trans_para {
    margin: 5px 0 0 0;
    color: #454545;
    word-break: break-word;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    display: -webkit-box;
  }
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

      .audio__player-play>img {
        width: $value-50;
        height: $value-50;
        display: none;
      }

      .audio__player-play-icon {
        top: $value-0;
        left: $value-0;
        background: $blue;
      }

      .audio__player-play-icon>img {
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

.hospital_name {
  text-align: right;
  font-size: 18px;
  font-weight: 500;
  color: #000;
}
</style>
