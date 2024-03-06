<template>
  <div>
    <div class="home_user_header">
      <h3 class="comman-title">
        Welcome, <span class="name">{{ user.first_name }} {{ user.last_name }}</span>
      </h3>
    </div>

    <div class="q-pa-md main-wrapper">
      <!-- <div class="text-right q-mb-md">
        <q-btn color="primary" icon="las la-calendar" @click="calender = true" :label="
          dateRange?.from
            ? dateRange.from + ' to ' + dateRange.to
            : dateRange ?? 'Select Date'
        " />
        <q-btn v-if="dateRange" @click="clearFilter" icon="la la-times" />
      </div> -->
      <q-card flat bordered class="my-card bg-grey-1">
        <q-card-section>
          <q-infinite-scroll @load="onLoadList" :offset="250" scroll-target="body" ref="scrollList">
            <div class="row  col_spacing_row">
              <div class="col-md-4 q-mb-lg" v-for="item in list" :key="item">
                <div class="white_card_box">
                  <div class="header">
                    <div class="title_info">
                      <h6 class="doctor_name">{{ item.user_name }}</h6>
                      <h5 class="hospital_name">{{ item.hospital_name }}</h5>
                    </div>
                    <q-badge class="date_counter" rounded color="primary">
                      Total: {{ item.total ?? 0 }}
                    </q-badge>
                  </div>
                  <div class="number_counter_row">
                    <div class="number_counter_item bg1">
                      <router-link :to="{ name: 'audio-list', params: { slug: item.user_id + '/' + 1 } }">
                        <p>New</p>
                        <h6>{{ item.new_status ?? 0 }}</h6>
                      </router-link>
                    </div>
                    <div class="number_counter_item bg2">
                      <router-link :to="{ name: 'audio-list', params: { slug: item.user_id + '/' + 2 } }">
                        <p>Pending</p>
                        <h6>{{ item.verify_status ?? 0 }}</h6>
                      </router-link>
                    </div>
                    <div class="number_counter_item bg3" @click="goToAudioList(3, item)">
                      <!-- <router-link :to="{ name: 'audio-list', params: { slug: item.user_id + '/' + 3 } }"> -->
                      <p>Published</p>
                      <h6>{{ item.confirm_status ?? 0 }}</h6>
                      <!-- </router-link> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary" size="40px" />
              </div>
            </template>
          </q-infinite-scroll>

        </q-card-section>
      </q-card>
    </div>
  </div>
  <q-dialog v-model="calender">
    <q-date v-model="dateRange" range>
      <q-btn label="Submit" @click="selectDate" v-close-popup type="submit" color="primary" />
    </q-date>
  </q-dialog>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { Loading, QSpinnerGears, date, LocalStorage } from "quasar";
import { useWriterStore } from "src/stores/writer";
import { onBeforeRouteLeave, useRouter } from "vue-router";
const store = useAuthStore();
const router = useRouter()
const writer = useWriterStore()
const user = computed(() => {
  return store.getUser;
});
const scrollList = ref(null);
const currentPage = ref(1);
const limit = ref(6);
const loading = ref(true);
const calender = ref(false);
const dateRange = ref(null);
const list = computed(() => writer.getList)
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

const goToAudioList = (status, data) => {
  router.push({ name: 'audio-list', params: { slug: data.user_id + '/' + status } })
  data.hospital_id.split(',').forEach((id, index) => {
    writer.wrtHospitals.push({ label: data.hospital_name.split(',')[index], value: id });
  });
}

function fetchList() {
  const data = {
    from_date: dateRange.value?.from,
    to_date: dateRange.value?.to,
    limit: limit.value,
    page: currentPage.value,
  };
  return writer.fetchList()
}


function selectDate() {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  currentPage.value = 1;
  loading.value = true;
  writer.list = []
  onLoadList()
}

function clearFilter() {
  Loading.show({
    spinner: QSpinnerGears,
    message: "Loading...",
  });
  dateRange.value = null;
  writer.list = []
  currentPage.value = 1;
  loading.value = true;
  scrollList.value.reset();
  scrollList.value.resume();
  scrollList.value.trigger();
}

onBeforeRouteLeave((to, from, next) => {
  writer.resetList()
  next();
});
</script>

<style lang="scss">
@import "src/css/home.scss";
@import "src/css/userDashboard.scss";
@import "src/css/responsive.scss";

// $
.archive-box {
  opacity: 0.5;
}

.date_counter {
  border-radius: 5px;
  padding: 10px 10px;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  background: #d8d1f5 !important;
  color: #000;
  border: 1px solid #b4aadf;
}

.white_card_box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    box-shadow: 0 5px 15px #ddd;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.col_spacing_row {
  margin-left: -10px;
  margin-right: -10px;
}

.col_spacing_row>div {
  padding-left: 10px;
  padding-right: 10px;
}

.doctor_name {
  margin: 0 0 5px 0;
  font-size: 18px;
}

.hospital_name {
  margin: 0;
  font-size: 16px;
  color: #454545;
}

.number_counter_row {
  width: 100%;
  border-top: 1px solid #ddd;
  padding-top: 10px;
  margin-top: 20px;

  .number_counter_item {
    background: #ccc;
    display: inline-block;
    width: 32%;
    text-align: center;
    padding: 10px 5px;
    border-radius: 10px;
    margin-right: 2%;
    margin-top: 2%;

    &:last-child {
      margin-right: 0;
    }

    &.bg1 {
      background: #fbb;
    }

    &.bg2 {
      background: #fbe5b5;
    }

    &.bg3 {
      background: #b4df9a;
    }

    &.bg4 {
      background: #b5d6ff;
    }

    p {
      margin: 0 0 5px 0;
    }

    h6 {
      margin: 0;
      line-height: normal;
    }

    a {
      color: inherit;
    }
  }
}

.comman-title {
  .name {
    font-size: 20px;
    color: #7a7a7a;
  }
}
</style>
