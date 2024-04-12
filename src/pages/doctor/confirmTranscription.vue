<template>
  <div class="q-pa-md main-wrapper">
    <div class="text-right d-flex filter_search_box">
      <div class="search">
        <q-input v-model="search" debounce="500" outlined dense placeholder="Search" @update:model-value="filterSearch">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div>
        <q-btn color="primary" @click="calender = true" :label="dateRange?.from
          ? dateRange.from + ' to ' + dateRange.to
          : dateRange ?? 'Select Date'
          " />
        <q-btn v-if="dateRange" @click="clearFilter" icon="la la-times" />
      </div>
    </div>
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

    <div style="display: none">
      <pdfComponent v-if="showPDF" id="downloadPDF" />
    </div>
  </div>
  <q-dialog v-model="calender">
    <q-date v-model="dateRange" range>
      <q-btn label="Submit" @click="selectDate" v-close-popup type="submit" color="primary" />
    </q-date>
  </q-dialog>
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
import { useMasterStore } from "src/stores/master";
import { ExportToDoc } from "src/composables/utility";
const pdfComponent = defineAsyncComponent(() => import("src/components/dowloadPDF.vue"));

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
const calender = ref(false);
const dateRange = ref(null);
const search = ref(null)
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
    ...fetchReportData.value,
    hospitalId: route.params.slug.split('/')[0],
    statusId: route.params.slug.split('/')[1],
    limit: limit.value,
    page: currentPage.value,
    q: search.value,
  };
  return store.fetchTranscriptionList(data)
}


function confirmScript(item) {
  item.hospital_id = route.params.slug.split('/')[0],
    item.isNew = route.params.slug.split('/')[1] == 1 ? true : false
  store.data = item;
  router.push({ name: "confirm-script", params: { slug: item.id } });
}
const showPDF = ref(false);
async function goToPdf(data) {
  Loading.show({
    spinner: QSpinnerGears,
  });
  master.pdfData = data
  showPDF.value = true;
  if (data.hospital_id === 2) {
    setTimeout(() => {
      Loading.hide();
      ExportToDoc("downloadPDF", `${data.patient_name}`);
    }, 2000);
  } else {
    router.push({ name: 'transcription-pdf' })
    Loading.hide();
  }
}

function selectDate() {
  applyFilter();
}
const fetchReportData = ref();
function applyFilter() {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  fetchReportData.value = {
    from_date: dateRange.value?.from ?? dateRange.value,
    to_date: dateRange.value?.to ?? dateRange.value,
  };
  store.transcriptionList = []
  currentPage.value = 1;
  loading.value = true;
  scrollList.value.reset();
  scrollList.value.resume();
  scrollList.value.trigger();
}

function clearFilter() {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  dateRange.value = null;
  fetchReportData.value = {}
  store.transcriptionList = []
  currentPage.value = 1;
  loading.value = true;
  scrollList.value.reset();
  scrollList.value.resume();
  scrollList.value.trigger();
}
function filterSearch() {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  store.transcriptionList = []
  currentPage.value = 1;
  loading.value = true;
  scrollList.value.reset();
  scrollList.value.resume();
  scrollList.value.trigger();
}
onBeforeRouteLeave((to, from, next) => {
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

.filter_search_box {
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;

  .search {
    width: 240px;

    .q-field__control {
      height: 35px;
    }
  }
}
</style>
