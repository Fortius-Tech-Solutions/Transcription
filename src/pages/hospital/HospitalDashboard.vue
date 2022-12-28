<template>
  <div>
    <div class="home_user_header">
      <h3 class="comman-title">{{ $q.lang.hospital.title }}</h3>
    </div>

    <div class="q-pa-md main-wrapper">
      <div class="custom-tabel-box">
        <table-component
          ref="userTableComponent"
          :apiUrl="HOSPITAL.LIST"
          :columns="columns"
          rowKey="id"
          :title="$q.lang.hospital.table_title"
          createUrl="hospital/create"
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
  <q-dialog v-model="showDialog">
    <q-card class="my-card comman-close-popup poli-card-width">
      <div class="close-top-posi">
        <i class="las la-times" v-close-popup></i>
      </div>
      <q-card-section class="q-pa-sm q-pl-md">
        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">{{ showItemData.name }}</div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-none newpolicy-popup">
        <q-item>
          <q-item-section>
            <q-item-label>
              <div class="col text-h6 ellipsis">
                {{ showItemData.email }}
              </div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { computed, defineAsyncComponent, ref } from "vue";
import { hospitalStore } from "src/stores/hospital";
import { HOSPITAL } from "src/apis/constant";
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

const showDialog = ref(false);
const showItemData = ref({});

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
    field: (row) => row.name,
    format: (val) => `${val}`,
    // sortable: true,
  },
  {
    name: "Address",
    align: "center",
    label: "Address",
    field: (row) => row.address,
    format: (val) => `${val}`,
    // sortable: true,
  },
  {
    name: "City",
    align: "center",
    label: "City",
    field: (row) => row.city,
    format: (val) => `${val}`,
    // sortable: true,
  },
  {
    name: "actions",
    label: "Actions",
    field: "actions",
  },
];

const status = ref([]);
const userGroup = ref(null);

function applyFilter() {
  userTableComponent.value.refresh();
}
// Emitted from table component
function deleteItem(item) {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  store
    .deleteHospital(item.id)
    .then((res) => {
      if (res.success == true) {
        applyFilter().then(() => {
          notification.success(res.message);
        });
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

function editItem(item) {
  router.push({
    name: "edit-hospital",
    params: { slug: item.id },
  });
}

function showItem(item) {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  store
    .fetchUser(item.id)
    .then((res) => {
      if (res.success == true) {
        showItemData.value = res.data;
        showDialog.value = true;
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
</script>

<style lang="scss">
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
