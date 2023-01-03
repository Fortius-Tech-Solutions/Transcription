<template>
  <div class="q-pa-md login_form">
    <div class="forgote-page-header">
      <div class="home_user_header">
        <h3 class="comman-title">Dashboard</h3>
      </div>
      <div class="q-pa-md main-wrapper">
        <div class="bg-box bg-res">
          <div class="row q-col-gutter-xl flex-direction">
            <router-link class="col-md-3 text-black" to="/">
              <div class="col-md-3">
                <div class="sub-box sub-box-total">
                  <div class="sub-img-total sub-img">
                    <img src="~assets/images/totaluser.svg" alt="" />
                  </div>
                  <div class="sub-box-text q-mt-md q-pl-md">
                    <h5 class="title">10000</h5>
                    <p>Total Users</p>
                  </div>
                </div>
              </div>
            </router-link>
            <router-link class="col-md-3 text-black" to="/">
              <div class="sub-box sub-box-online">
                <div class="sub-img-online sub-img">
                  <img src="~assets/images/onlineuser.svg" alt="" />
                </div>
                <div class="sub-box-text q-mt-md q-pl-md">
                  <h5 class="title">110</h5>
                  <p>Doctor</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="q-pa-md" v-if="user.usertype.id == 2">
      <q-table
        title="Assigned Hospitals"
        :rows="rows"
        :columns="columns"
        row-key="id"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
const userTableComponent = ref();
const tableComponent = defineAsyncComponent(() =>
  import("src/components/table-component")
);
const store = useAuthStore();
const user = computed(() => {
  return store.getUser;
});
console.log(user.value);
const rows = computed(() => {
  const data = [];
  user.value.DoctorHospitals.forEach((element) => {
    data.push(element.hospitalname);
  });
  return data;
});
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
];
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
