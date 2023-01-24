<template>
 <div>
    <div class="home_user_header">
      <h3 class="comman-title">Transcription List</h3>
    </div>

    <div class="q-pa-md main-wrapper">
      <div class="custom-tabel-box">
        <table-component
          ref="userTableComponent"
          :apiUrl="ADMIN_TRANS.LIST"
          :columns="columns"
          rowKey="id"
          title="List"
          :reportData="fetchReportData"
          @delete="deleteItem"
          @edit="editItem"
          @view="showItem"
          @lock="lockUser"
          :extra-filter="{
            accountStatus: status,
            group: userGroup,
          }"
        >
        <template v-slot:filter>
            <q-btn color="primary" @click="calender = true" :label="
              dateRange?.from
                ? dateRange.from + ' to ' + dateRange.to
                : dateRange ?? 'Select Date'
            " />
            <q-btn v-if="dateRange" @click="clearFilter" icon="la la-times" />
          </template>
        </table-component>
      </div>
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
import { hospitalStore } from "src/stores/hospital";
import {ADMIN_TRANS } from "src/apis/constant";
import { useRouter } from "vue-router";
import notification from "src/boot/notification";

import moment from "moment";
import { Loading, QSpinnerGears } from "quasar";

const router = useRouter();
const store = hospitalStore();

const userTableComponent = ref();
const tableComponent = defineAsyncComponent(() =>
  import("src/components/table-component")
);
const calender = ref(false);
const dateRange = ref(null);
const columns = [
  {
    name: "id",
    label: "NO.",
    field: "index",
    // sortable: true,
    align: "left",
  },
  {
    name: "Name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.patient_name,
    format: (val) => `${val}`,
    // sortable: true,
  },
  {
    name: "TS Type",
    align: "center",
    label: "TS Type",
    field: (row) => row.ts_type,
    format: (val) => `${val}`,
    // sortable: true,
  },
  {
    name: "Gender",
    align: "center",
    label: "Gender",
    field: (row) => row.gender,
    format: (val) => `${val}`,
    // sortable: true,
  },
  {
    name: "Doctor Name",
    align: "center",
    label: "Doctor Name",
    field: (row) => row.doctorname.first_name+' '+row.doctorname.last_name,
    format: (val) => `${val}`,
    // sortable: true,
  },
  {
    name: "Hospital Name",
    align: "center",
    label: "Hospital Name",
    field: (row) => row.hospitalname.name,
    format: (val) => `${val}`,
    // sortable: true,
  },
  {
    name: "created at",
    align: "center",
    label: "Created At",
    field: (row) => row.created_at,
    format: (val) => `${val}`,
    // sortable: true,
  },

];

function selectDate() {
  applyFilter();
}
const fetchReportData = ref();
function applyFilter() {
  fetchReportData.value = {
    from_date: dateRange.value?.from ?? dateRange.value,
    to_date: dateRange.value?.to ?? dateRange.value,
  };
  userTableComponent.value.refresh();
}
function clearFilter() {
  dateRange.value = null;
  fetchReportData.value = {};
  userTableComponent.value.refresh();
}
</script>

<style lang="scss" scoped>
h3.comman-title {
  font-size: 25px;
  font-weight: bold;
  margin-left: 33px;
  padding-top: 20px;
}

// $

.bg-box {
  background: #ffffff;
  border: $value-1 solid #d7d7d7;
  border-radius: map-get($borderRadius, value12);
  padding: $value-30;

  .sub-box {
    border-radius: map-get($borderRadius, value12);
    width: $percentage-100;
    height: $value-118;
    @include hr-vr-center;

    &.sub-box-total {
      background: rgba(79, 45, 127, 0.2);
      border: $value-1 solid rgba(79, 45, 127, 0.6);
    }

    &.sub-box-active {
      background: rgba(84, 181, 94, 0.2);
      border: $value-1 solid rgba(84, 181, 94, 0.6);
    }

    &.sub-box-block {
      background: rgba(212, 97, 97, 0.2);
      border: $value-1 solid rgba(212, 97, 97, 0.6);
    }

    &.sub-box-online {
      background: rgba(84, 181, 94, 0.2);
      border: $value-1 solid rgba(84, 181, 94, 0.6);
    }

    img {
      width: $value-40;
      height: $value-40;
    }

    h5 {
      font-size: $value-25;
      font-weight: map-get($font-weights, bold);
    }

    .sub-img {
      border-radius: map-get($borderRadius, value10);
      width: $value-56;
      height: $value-56;
      @include hr-vr-center;

      &.sub-img-total {
        background: rgba(79, 45, 127, 0.5);
      }

      &.sub-img-active {
        background: rgba(84, 181, 94, 0.5);
      }

      &.sub-img-block {
        background: rgba(213, 97, 97, 0.5);
      }

      &.sub-img-online {
        background: rgba(161, 225, 138, 0.5);
      }
    }
  }
}

.filter-card {
  background: rgba(79, 45, 127, 0.06);
  border: $value-1 solid rgba(79, 45, 127, 0.31);
  border-radius: map-get($borderRadius, "value15");

  .q-field {
    .q-field__control {
      width: $value-360;
      height: $value-40;
      background: #ffffff;
      border: $value-1 solid #cccccc;
      border-radius: map-get($borderRadius, "value5");
      min-height: $value-40;
    }

    .q-field__marginal {
      height: $value-40;
    }
  }

  .filter-field {
    display: map-get($displays, "flex");

    .hr-form {
      @include box-vr-center;

      label {
        font-size: $value-16;
        font-weight: map-get($font-weights, medium);
      }
    }
  }

  .status-checkbox {
    @include box-vr-center;
    justify-content: flex-end;
    margin-right: $value-13;

    label {
      font-size: $value-16;
      font-weight: map-get($font-weights, medium);
    }
  }
}

.userlist-box {
  .head-sec {
    @include hr-vr-center-between;
  }
}
</style>
