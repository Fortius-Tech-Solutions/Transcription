<template>
  <div class="q-pa-md main-wrapper">
    <div class="custom-tabel-box">
      <table-component
        ref="userTableComponent"
        :apiUrl="api"
        :columns="columns"
        rowKey="id"
        :title="$q.lang.user.table_title"
        createUrl="user/create"
        @delete="deleteItem"
        @edit="editItem"
        @view="showItem"
        @lock="lockUser"
        :extra-filter="{
          accountStatus: status,
          group: userGroup,
        }"
        :selectionType="
          route.params.slug == 'assign-writer' ? 'single' : 'multiple'
        "
        :selectedItem="selectedAssign"
        @selected="onSelection"
      >
      </table-component>
      <q-btn
        color="primary"
        type="submit"
        :label="$q.lang.button.submit"
        class="q-ml-md"
        @click="assign()"
      />
    </div>
  </div>
</template>

<script setup>
import { Loading } from "quasar";
import { HOSPITAL, USER } from "src/apis/constant";
import { hospitalStore } from "src/stores/hospital";
import { useMasterStore } from "src/stores/master";
import { userStore } from "src/stores/users";
import { computed, defineAsyncComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const tableComponent = defineAsyncComponent(() =>
  import("src/components/table-component")
);
const route = useRoute();
const router = useRouter();
const store = useMasterStore();
const storeUser = userStore();
const storeHospital = hospitalStore();
const data = computed(() => store.getData);
console.log(data.value);
const selectedAssign = ref([]);
const selected = ref([]);
const api = ref("");
const edit_id = ref(data.value.id);
const first_name = ref(data.value.first_name);
const last_name = ref(data.value.last_name);
const email = ref(data.value.email);
const user_type_id = ref(data.value.user_type_id);
const name = ref(data.value.name);
const city = ref(data.value.city);
const address = ref(data.value.address);
const columns = ref([]);

Loading.show({
  message: "Loading...",
});
if (
  route.params.slug == "assign-doctor" ||
  route.params.slug == "assign-receptionist"
) {
  if (user_type_id.value == 3) {
    store
      .fetchSelected({ id: data.value.id, userTypeId: data.value.user_type_id })
      .then((res) => {
        if (route.params.slug == "assign-doctor") {
          res.data[0].WriterDoctors.forEach((element) => {
            selectedAssign.value.push(element.doctarname);
          });
        }
        onSelection(selectedAssign.value, true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        Loading.hide();
      });
  } else {
    storeHospital
      .fetchHospitalAssign(data.value.id)
      .then((res) => {
        if (route.params.slug == "assign-doctor") {
          res.data[0].DoctorHospitals.forEach((element) => {
            selectedAssign.value.push(element.doctarname);
          });
        } else if (route.params.slug == "assign-receptionist") {
          res.data[0].ReceptionistHospitals.forEach((element) => {
            selectedAssign.value.push(element.receptionistname);
          });
        }
        onSelection(selectedAssign.value, true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        Loading.hide();
      });
  }
} else if (
  route.params.slug == "assign-hospital" ||
  route.params.slug == "assign-writer"
) {
  store
    .fetchSelected({ id: data.value.id, userTypeId: data.value.user_type_id })
    .then((res) => {
      if (route.params.slug == "assign-hospital") {
        if (res.data[0].DoctorHospitals) {
          res.data[0].DoctorHospitals.forEach((element) => {
            selectedAssign.value.push(element.hospitalname);
          });
        } else if (res.data[0].ReceptionistHospitals) {
          res.data[0].ReceptionistHospitals.forEach((element) => {
            selectedAssign.value.push(element.hospitalname);
          });
        }
      } else if (route.params.slug == "assign-writer") {
        res.data[0].DoctorsWriter.forEach((element) => {
          selectedAssign.value.push(element.writername);
        });
      } else if (route.params.slug == "assign-doctor") {
        res.data[0].WriterDoctors.forEach((element) => {
          selectedAssign.value.push(element.doctarname);
        });
      }

      onSelection(selectedAssign.value, true);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      Loading.hide();
    });
}

if (route.params.slug == "assign-hospital") {
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
  ];
  api.value = HOSPITAL.LIST;
} else if (
  route.params.slug == "assign-doctor" ||
  route.params.slug == "assign-receptionist" ||
  route.params.slug == "assign-writer"
) {
  api.value = USER.LIST;
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
      field: (row) => row.first_name + " " + row.last_name,
      format: (val) => `${val}`,
      // sortable: true,
    },
    {
      name: "email",
      align: "center",
      label: "Email",
      field: (row) => row.email,
      format: (val) => `${val}`,
      // sortable: true,
    },
  ];
}

function onSelection(rows, added) {
  if (added) {
    rows.forEach((item, index) => {
      selected.value.push(item.id);
    });
  } else {
    rows.forEach((item) => {
      selected.value.forEach((items, index, object) => {
        if (items == item.id) {
          object.splice(index, 1);
        }
      });
    });
  }
}

function assign() {
  Loading.show({
    message: "Loading...",
  });
  if (
    route.params.slug == "assign-hospital" ||
    route.params.slug == "assign-writer"
  ) {
    var data = {
      user_type_id: user_type_id.value,
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
    };
    if (route.params.slug == "assign-hospital") {
      if (user_type_id.value == 2) {
        data.hospitals = selected.value;
      } else if (user_type_id.value == 4) {
        data.receptionist = selected.value;
      }
    }
    if (route.params.slug == "assign-writer") {
      data.writer = selected.value;
    }
    storeUser
      .updateUser(data, edit_id.value)
      .then((res) => {
        if (res.success == true) {
          router.push({ name: "user-dashboard" });
          Loading.hide();
        } else if (res.success == false) {
          notification.error(res.message);
          Loading.hide();
        }
      })
      .finally(() => {
        Loading.hide();
      });
  } else if (
    route.params.slug == "assign-doctor" ||
    route.params.slug == "assign-receptionist"
  ) {
    if (user_type_id.value == 3) {
      const data = {
        user_type_id: user_type_id.value,
        first_name: first_name.value,
        last_name: last_name.value,
        email: email.value,
      };

      if (route.params.slug == "assign-doctor") {
        data.doctor = selected.value;
      }

      storeUser
        .updateUser(data, edit_id.value)
        .then((res) => {
          if (res.success == true) {
            router.push({ name: "user-dashboard" });
            Loading.hide();
          } else if (res.success == false) {
            notification.error(res.message);
            Loading.hide();
          }
        })
        .finally(() => {
          Loading.hide();
        });
    } else {
      const data = {
        name: name.value,
        address: address.value,
        city: city.value,
      };

      if (route.params.slug == "assign-doctor") {
        data.users = selected.value;
      } else if (route.params.slug == "assign-receptionist") {
        data.receptionist = selected.value;
      }
      storeHospital
        .updateHospital(data, edit_id.value)
        .then((res) => {
          if (res.success == true) {
            router.push({ name: "hospital-dashboard" });
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
  }
}
</script>

<style lang="scss" scoped>
</style>
