<template>
  <div>
    <div class="home_user_header">
      <h3 class="comman-title">
        Welcome {{ user.first_name }} {{ user.last_name }}
      </h3>
    </div>

    <div class="q-pa-md main-wrapper" v-if="user.user_type_id !== 1">
      <div class="custom-tabel-box">
        <table-component
          v-if="user.user_type_id !== 1"
          ref="userTableComponent"
          :apiUrl="api ? api : null"
          :columns="columns"
          rowKey="id"
          title="List"
          createUrl="user/create"
          @delete="deleteItem"
          @edit="editItem"
          @view="showItem"
          @lock="lockUser"
          :extra-filter="{
            accountStatus: status,
            group: userGroup,
          }"
        >
        </table-component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { DOCTOR, TRANSCRIPTION } from "src/apis/constant";
const userTableComponent = ref();
const tableComponent = defineAsyncComponent(() =>
  import("src/components/table-component")
);
const store = useAuthStore();
const user = computed(() => {
  return store.getUser;
});
console.log(user.value.user_type_id);
const columns = ref([]);
const api = ref("");
if (user.value.user_type_id == 3) {
  api.value = TRANSCRIPTION.LIST;
  columns.value = [
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
      field: (row) =>
        row.doctarname.first_name + " " + row.doctarname.last_name,
      format: (val) => `${val}`,
      // sortable: true,
    },
    {
      name: "email",
      align: "center",
      label: "Email",
      field: (row) => row.doctarname.email,
      format: (val) => `${val}`,
      // sortable: true,
    },
    {
      name: "actions",
      label: "Actions",
      field: "actions",
    },
  ];
} else if (user.value.user_type_id == 2) {
  api.value = DOCTOR.LIST_HOSPITAL;

  columns.value = [
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
      field: (row) => row.hospitalname.name,
      format: (val) => `${val}`,
      // sortable: true,
    },
    {
      name: "actions",
      label: "Actions",
      field: "actions",
    },
  ];
}
</script>

<style lang="scss">
@import "src/css/home.scss";
@import "src/css/userDashboard.scss";
@import "src/css/responsive.scss";

// $
.archive-box {
  opacity: 0.5;
}
</style>
