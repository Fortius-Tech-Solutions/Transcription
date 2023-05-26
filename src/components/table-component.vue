<template>
  <div class="">
    <q-table ref="tableRef" :title="title" :rows="rows" :columns="columns" :row-key="rowKey"
      v-model:pagination="pagination" :loading="loading" :filter="filter" binary-state-sort @request="onRequest"
      :selection="selectionType" v-model:selected="selected" :selected-rows-label="getSelectedString"
      @selection="onSelection">
      <template v-slot:top-right>
        <div class="table_add_btn">
          <div>
            <q-select v-if="route.name == 'user-dashboard'" v-model="userTypeModel" :options="userType"
              @update:model-value="selectType(userTypeModel)" />
          </div>
          <div>
            <q-btn v-if="createUrl && user.user_type_id == 1" dense color="primary" icon="las la-plus"
              :label="$q.lang.button.create" :to="createUrl" no-caps>
            </q-btn>
          </div>
          <slot name="filter"></slot>
        </div>
      </template>
      <template v-slot:top-left>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template #body-cell-image="props">
        <q-td key="image" :props="props">
          <q-img style="height: 80px; max-width: 80px" :src="props.row.image ??
            props.row.category_icon ??
            props.row.icon ??
            props.row.quote_img ??
            props.row.platform.icon
            " />
        </q-td>
      </template>
      <template #body-cell-emoji="props">
        <q-td key="emoji" :props="props">
          <q-img style="height: 80px; max-width: 80px" :src="props.row.emoji" />
        </q-td>
      </template>
      <template #body-cell-url="props">
        <q-td key="url" :props="props">
          <a class="text-black" :href="props.row.url" target="_blank">{{
            props.row.url
          }}</a>
        </q-td>
      </template>

      <template #body-cell-actions="props">
        <q-td key="actions" :props="props">
          <q-btn v-if="(route.name == 'user-dashboard' && userTypeModel.value == 2) ||
            userTypeModel.value == 4
            " color="primary" label="Assign Hospital" size="sm" no-caps
            @click="assign(props.row, 'assign-hospital')" />
          <q-btn v-if="route.name == 'hospital-dashboard' || userTypeModel.value == 3
            " color="primary" label="Assign Doctor" size="sm" no-caps @click="assign(props.row, 'assign-doctor')" />
          <q-btn v-if="route.name == 'hospital-dashboard'" color="primary" label="Assign Receptionist" size="sm" no-caps
            @click="assign(props.row, 'assign-receptionist')" />
          <q-btn v-if="route.name == 'user-dashboard' && userTypeModel.value == 2" color="primary" label="Assign Writer"
            size="sm" no-caps @click="assign(props.row, 'assign-writer')" />
          <q-btn v-if="user.user_type_id == 1 && route.name !== 'transcription-dashboard'" color="secondary"
            icon="las la-pen" @click="$emit('edit', props.row)" size="sm" no-caps></q-btn>

          <q-btn v-if="user.user_type_id == 1 && route.name !== 'transcription-dashboard'" color="red"
            icon="las la-trash-alt" @click="deleteItem(props.row)" size="sm" no-caps></q-btn>
          <q-btn v-if="user.user_type_id == 2" color="primary" label="Transcription" :to="{
            name: 'confirm-transcript',
            params: { slug: props.row?.hospital_id },
          }" size="sm" no-caps></q-btn>
          <q-btn v-if="user.user_type_id == 4 && route.name !== 'transcription-list'" color="primary"
            label="Transcription" size="sm" no-caps :to="{
              name: 'transcription-list',
              params: { slug: props.row?.hospital_id },
            }"></q-btn>

          <q-btn v-if="user.user_type_id == 1 && route.name == 'transcription-dashboard'" color="primary" label="View"
            @click="showTrans(props.row)" size="sm" no-caps></q-btn>

          <q-btn
            v-if="user.user_type_id == 4 && route.name == 'transcription-list' || user.user_type_id == 1 && route.name == 'transcription-dashboard'"
            color="secondary" icon="las la-download" @click="downloadPDF(props.row)" size="sm" no-caps
            title="Report Download"></q-btn>
        </q-td>
      </template>
      <template #body-cell-download="props">
        <q-td key="actions" :props="props">
          <q-btn color="secondary" icon="las la-download" @click="downloadPDF(props.row)" size="sm" no-caps
            title="Report Download"></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="deleteDialog" class="alert-popup text-center">
    <q-card class="comman-close-popup">
      <q-card-section class="">
        <div class="alert-popup-content create_project_popup q_custum_popup new_common_popup_btn">
          <div class="img-area">
            <div class="close-top-posi">
              <i class="las la-times" v-close-popup></i>
            </div>
          </div>
          <div class="text-center">
            <h5 class="q-my-sm">Are You Sure!</h5>
            <p class="del-item">
              Want To Delete This <b>{{ deleteData.name }}?</b>
            </p>
          </div>
          <q-card-actions align="center" class="bg-white text-teal">
            <q-btn outline color="primary" label="Cancel" v-close-popup />
            <q-btn color="primary" label="Yes Delete It!" @click="$emit('delete', deleteData)" v-close-popup />
          </q-card-actions>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- style="display: none" -->
  <div style="display: none">
    <pdfComponent v-if="showPDF" :items="pdfData" id="downloadPDF" />
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  computed,
  defineAsyncComponent,
  defineComponent,
} from "vue";
import apis from "src/apis";
import { useRoute, useRouter } from "vue-router";
import { userStore } from "src/stores/users";
import notification from "src/boot/notification";
import { useMasterStore } from "src/stores/master";
import { useAuthStore } from "src/stores/auth";
import { date, exportFile, Loading, QSpinnerGears } from "quasar";
import moment from "moment";
import html2pdf from "html2pdf.js";
import { LocalStorage } from "quasar";
import { useWriterStore } from "src/stores/writer";
const pdfComponent = defineAsyncComponent(() =>
  import("src/components/dowloadPDF.vue")
);
const props = defineProps({
  columns: Array,
  apiUrl: String,
  title: String,
  rowKey: String,
  createUrl: String,
  selectionType: String,
  selectedItem: Object,
  extraFilter: Object,
  type: Object,
  reportData: Object,
  orgId: Object,
  reportType: Object,
  isPdfDownload: Boolean,
});
const store = useAuthStore();
const writerStore = useWriterStore();
const user = computed(() => {
  return store.getUser;
});
const now = new Date();
const router = useRouter();
const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const emit = defineEmits(["delete", "edit", "selected", "view", "lock"]);

const showPDF = ref(false);
const showImage = ref(false);
const route = useRoute();
const storeUser = userStore();
const userType = computed(() => {
  return storeUser.getUserType;
});
const userTypeModel = ref({ label: "All", value: "" });
const tableRef = ref();
const rows = ref([]);
const filter = ref("");
const loading = ref(false);
const deleteDialog = ref(false);
const previousTotal = ref(1);
const total = ref();
const totalLimit = ref();
const pagination = ref({
  sortBy: "desc",
  descending: false,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 10,
});
const master = useMasterStore();
const selected = ref([{ id: 3 }]);
const image = ref();
function selectType(val) {
  refresh();
}
const pdfData = ref([]);
// ************* DATE FORMATE FUNCTION ******************//

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("-");
}

//             *********************

/////////// *************** EXPORT TO PDF *************** ///////////

function exportToPDF(data) {
  html2pdf(data, {
    margin: 0,
    filename: `${pdfData.value.patient_name}_${date.formatDate(pdfData.value.date_of_service, 'DD-MM-YYYY')}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 1, letterRendering: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  });
}
async function downloadPDF(res) {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  showPDF.value = true;
  fetchPdf(res);
}
async function showTrans(data) {
  writerStore.data = data
  router.push({ name: 'script-view' })
}
function fetchPdf(res, item) {
  pdfData.value = res;
  setTimeout(() => {
    const pageBreak = document.getElementById("mode");

    exportToPDF(document.getElementById("downloadPDF"), item ?? "", pageBreak);
    Loading.hide();
  }, 2000);
}
/////////// ***************************** ///////////

function imagePreview(val) {
  image.value = val;
  showImage.value = true;
}

/////////// *************** EXPORT TO CSV *************** ///////////

function wrapCsvValue(val, formatFn, row) {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);

  formatted = formatted.split('"').join('""');

  return `"${formatted}"`;
}

/////////// ***************************** ///////////

async function onRequest(events) {
  const { page, rowsPerPage, sortBy, descending } = events.pagination;
  const filter = events.filter;

  loading.value = true;

  const fetchCount =
    rowsPerPage === 0 ? pagination.value.rowsNumber : rowsPerPage;

  const params = {
    org_id: props.orgId,
    page: page,
    limit: fetchCount,
    q: filter,
    sortBy: sortBy,
    orderBy: descending,
  };

  if (route.name == "user-dashboard") {
    params.type = userTypeModel.value.value;
  } else if (route.path == "/assign-doctor") {
    params.type = 2;
  } else if (route.path == "/assign-receptionist") {
    params.type = 4;
  } else if (route.path == "/assign-writer") {
    params.type = 3;
  }
  if (props.extraFilter) {
    for (let [key, value] of Object.entries(props.extraFilter)) {
      params[key] = props.extraFilter[key];
    }
  }

  if (page != 1) {
    previousTotal.value = page * rowsPerPage + 1 - rowsPerPage;
  } else {
    previousTotal.value = 1;
  }

  if (props.type == "report") {
    await apis
      .postWithParam(
        props.apiUrl,
        props.reportData ?? {
          from_date: moment(firstDay).format("YYYY-MM-DD"),
          to_date: moment(lastDay).format("YYYY-MM-DD"),
        },
        params
      )
      .then((res) => {
        rows.value.splice(
          0,
          rows.value.length,
          ...(res.data.data.data ?? res.data.data ?? res.data.res.data)
        );

        total.value = res.data.total;

        rows.value.forEach((row) => {
          row.index = previousTotal.value;
          previousTotal.value++;
        });



        totalLimit.value = res.data.meta.total;

        // don't forget to update local pagination object
        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;
        pagination.value.rowsNumber =
          res.data.meta.total ?? res.data.res.meta.total;
        loading.value = false;
      })
      .catch((err) => {
        loading.value = false;
      });
  } else {
    params.from_date = date.formatDate(
      props.reportData?.from_date,
      "YYYY-MM-DD"
    );
    params.to_date = date.formatDate(props.reportData?.to_date, "YYYY-MM-DD");
    await apis
      .getWithParam(props.apiUrl, params)
      .then((res) => {
        rows.value.splice(0, rows.value.length, ...res.data);

        rows.value.forEach((row) => {
          row.index = previousTotal.value;
          previousTotal.value++;
        });

        // don't forget to update local pagination object
        pagination.value.page = page;
        pagination.value.rowsPerPage = rowsPerPage;
        pagination.value.sortBy = sortBy;
        pagination.value.descending = descending;
        pagination.value.rowsNumber = res.meta.total;
        loading.value = false;
      })
      .catch((err) => {
        loading.value = false;
      });
  }
}
function getSelectedString() {

  return selected.value.length === 0
    ? ""
    : `${selected.value.length} record${selected.value.length > 1 ? "s" : ""
    } selected of ${rows.value.length}`;
}
function onSelection({ rows, added }) {
  emit("selected", rows, added);
}

function updateUserLock(item) {
  storeUser.toggleUser(item.id).then((res) => {
    if (res.success == true) {
      storeUser.fetchUserCounter();
      notification.success(res.message);
    } else if (res.success == false) {
      notification.error(res.message);
    }
  });
  rows.value.find((row) => {
    if (row.id == item.id) {
      row.account_status = item.account_status == 0 ? 100 : 0;
    }
  });
}
function unblockUser(item) {
  storeUser.unblockUser(item.id).then((res) => {
    if (res.success == true) {
      notification.success(res.message);
    } else if (res.success == false) {
      notification.error(res.message);
    }
  });
}
function resetTwoFactor(item) {
  storeUser.resetTwoFA(item.id).then((res) => {
    if (res.success == true) {
      notification.success(res.message);
    } else if (res.success == false) {
      notification.error(res.message);
    }
  });
}

onMounted(() => {
  refresh();
  selected.value = props.selectedItem ?? [];
});

function refresh() {
  tableRef.value.requestServerInteraction();
}
defineExpose({
  refresh,
});

function assign(data, item) {
  master.data = data;
  LocalStorage.set("data", master.data);
  if (item == "assign-hospital") {
    router.push({
      name: "component",
      params: { slug: "assign-hospital" },
    });
  } else if (item == "assign-doctor") {
    router.push({
      name: "component",
      params: { slug: "assign-doctor" },
    });
  } else if (item == "assign-receptionist") {
    router.push({
      name: "component",
      params: { slug: "assign-receptionist" },
    });
  } else if (item == "assign-writer") {
    router.push({
      name: "component",
      params: { slug: "assign-writer" },
    });
  }
}
function setAudioWriter(data) {


}

const deleteData = ref("");
function deleteItem(item) {
  deleteData.value = item;
  deleteDialog.value = true;
}
</script>
