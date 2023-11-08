<template>
  <div>
    <div class="q-pa-md main-wrapper">
      <div class="custom-tabel-box">
        <table-component ref="userTableComponent" :apiUrl="'receptionist/' + route.params.slug" :columns="columns"
          rowKey="id" title="List" @delete="deleteItem" @edit="editItem" :reportData="fetchReportData" @view="showItem"
          @lock="lockUser" :extra-filter="{
            accountStatus: status,
            group: userGroup,
          }">

          <template v-slot:filter>
            <q-btn color="primary" @click="calender = true" :label="dateRange?.from
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
import { DOCTOR, RECEPT, TRANSCRIPTION } from "src/apis/constant";
import { useRoute } from "vue-router";
const userTableComponent = ref();
const tableComponent = defineAsyncComponent(() =>
  import("src/components/table-component")
);
const route = useRoute();
const calender = ref(false);
const dateRange = ref(null);
const columns = [
  {
    name: "id",
    label: "NO.",
    field: "index",

    align: "left",
  },
  {
    name: "Patient Name",
    required: true,
    label: "Name",
    align: "left",
    field: (row) => row.patient_name,
    format: (val) => `${val}`,

  },
  {
    name: "type",
    align: "center",
    label: "Type",
    field: (row) => row.TSType_name,
    format: (val) => `${val}`,

  },
  {
    name: "audio name",
    required: true,
    label: "Audio Name",
    align: "left",
    field: (row) => row.audio_name,
    format: (val) => `${val}`,

  },
  {
    name: "duration",
    required: true,
    label: "Duration",
    align: "left",
    field: (row) => row.audio_duration,
    format: (val) => `${val}`,

  },
  {
    name: "date_of_service",
    required: true,
    label: "Date of Service",
    align: "left",
    field: (row) => row.date_of_service,
    format: (val) => `${val}`,
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
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

<style lang="scss" scoped></style>
