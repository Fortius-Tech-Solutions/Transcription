<template>
  <div>
    <div class="home_user_header">
      <h3 class="comman-title">
        Welcome, <span class="name">{{ user.first_name }} {{ user.last_name }}</span>
      </h3>
    </div>

    <div class="q-pa-md main-wrapper" v-if="user.user_type_id !== 1">
      <div class="custom-tabel-box">
        <table-component v-if="user.user_type_id !== 1" ref="userTableComponent" :apiUrl="api ? api : null"
          :columns="columns" rowKey="id" title="List" createUrl="user/create" @delete="deleteItem" @edit="editItem"
          @view="showItem" @lock="lockUser" :extra-filter="{
            accountStatus: status,
            group: userGroup,
          }">
        </table-component>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { DOCTOR, RECEPT, TRANSCRIPTION } from "src/apis/constant";
const userTableComponent = ref();
const tableComponent = defineAsyncComponent(() =>
  import("src/components/table-component")
);
const store = useAuthStore();
const user = computed(() => {
  return store.getUser;
});
const columns = ref([]);
const api = ref("");
if (user.value.user_type_id == 4) {
  api.value = RECEPT.LIST_HOSPITAL;

  columns.value = [
    {
      name: "id",
      label: "NO.",
      field: "index",

      align: "left",
    },
    {
      name: "Name",
      required: true,
      label: "Name",
      align: "left",
      field: (row) => row.hospitalname.name,
      format: (val) => `${val}`,

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

  &:hover {
    box-shadow: 0 5px 15px #ddd;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    width: 23.5%;
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


  }
}

.comman-title {
  .name {
    font-size: 20px;
    color: #7a7a7a;
  }
}
</style>
