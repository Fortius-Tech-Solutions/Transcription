<template>
  <div class="">
    <q-table
      ref="tableRef"
      :title="title"
      :rows="rows"
      :columns="columns"
      row-key="index"
      v-model:pagination="pagination"
      :loading="loading"
      :filter="filter"
      binary-state-sort
      @request="onRequest"
      :selection="selectionType"
      v-model:selected="selected"
      :selected-rows-label="getSelectedString"
      @selection="onSelection"
    >
      <template v-slot:top-right>
        <div class="table_add_btn">
          <slot name="import"></slot>
          <q-btn
            v-if="props.type == 'report' && !props.isPdfDownload"
            dense
            color="secondary"
            icon="las la-download"
            @click="downloadPDF(reportData)"
            no-caps
          ></q-btn>
          <q-btn
            v-if="createUrl"
            dense
            color="primary"
            icon="las la-plus"
            :label="$q.lang.button.create"
            :to="createUrl"
            no-caps
          >
          </q-btn>

          <!-- <q-btn color="primary" icon-right="archive" label="Export to csv" no-caps @click="downloadTable" /> -->
        </div>
      </template>
      <template v-slot:top-left>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <slot name="filter"></slot>
      </template>
      <template #body-cell-image="props">
        <q-td key="image" :props="props">
          <q-img
            style="height: 80px; max-width: 80px"
            :src="
              props.row.image ??
              props.row.category_icon ??
              props.row.icon ??
              props.row.quote_img ??
              props.row.platform.icon
            "
          />
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
          <q-btn
            color="secondary"
            icon="las la-pen"
            @click="$emit('edit', props.row)"
            size="sm"
            no-caps
          ></q-btn>

          <q-btn
            color="red"
            icon="las la-trash-alt"
            @click="deleteItem(props.row)"
            size="sm"
            no-caps
          ></q-btn>
        </q-td>
      </template>
      <template #body-cell-download="props">
        <q-td key="actions" :props="props">
          <q-btn
            color="secondary"
            icon="las la-download"
            @click="downloadPDF(props.row)"
            size="sm"
            no-caps
          ></q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="deleteDialog" class="alert-popup text-center">
    <q-card class="comman-close-popup">
      <q-card-section class="">
        <div
          class="
            alert-popup-content
            create_project_popup
            q_custum_popup
            new_common_popup_btn
          "
        >
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
            <q-btn
              color="primary"
              label="Yes Delete It!"
              @click="$emit('delete', deleteData)"
              v-close-popup
            />
          </q-card-actions>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <div style="display: none">
    <readinessComponent
      v-if="showReadiness"
      :items="pdfData"
      id="downloadPDF"
    />
  </div>
  <div style="display: none">
    <phqComponent v-if="showPhq" :items="pdfData" id="downloadPDF" />
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
import { useRoute } from "vue-router";
import { userStore } from "src/stores/users";
import notification from "src/boot/notification";
import { useMasterStore } from "src/stores/master";
import { date, exportFile, Loading, QSpinnerGears } from "quasar";
import moment from "moment";
import html2pdf from "html2pdf.js";

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

const now = new Date();

const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

const emit = defineEmits(["delete", "edit", "selected", "view", "lock"]);

const showPhq = ref(false);
const showReadiness = ref(false);
const showImage = ref(false);
const route = useRoute();
const storeUser = userStore();
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
const selected = ref(props.selectedItem ?? []);
const image = ref();

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

function exportToPDF(data, item, pageBreak) {
  html2pdf(data, {
    margin: 0,
    filename: `${props.title}_${
      item.patient_cr ? item.patient_cr : formatDate(Date.now())
    }.pdf`,

    pagebreak: { after: ".sautDePage" },
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, letterRendering: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  });
}
async function downloadPDF(item) {
  //console.log(item);
  var data = {
    patient_id: item?.patient_id,
    org_id: item?.org_id,
    from_date:
      props.reportData?.from_date ?? moment(firstDay).format("YYYY-MM-DD"),
    to_date: props.reportData?.to_date ?? moment(lastDay).format("YYYY-MM-DD"),
  };

  if (props.reportType == "readiness") {
    Loading.show({
      message: "Loading...",
      spinner: QSpinnerGears,
    });
    await apis.post("report/readinessRuler", data).then((res) => {
      showReadiness.value = true;
      fetchPdf(res, item);
    });
  } else if (props.reportType == "phq9") {
    await apis.post("report/phq", data).then((res) => {
      Loading.show({
        message: "Loading...",
        spinner: QSpinnerGears,
      });
      showPhq.value = true;
      fetchPdf(res, item);
    });
  }
}

function fetchPdf(res, item) {
  pdfData.value = res.data;
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

async function downloadTable(e) {
  Loading.show({
    message: "Loading...",
    spinner: QSpinnerGears,
  });
  const { page, rowsPerPage, sortBy, descending } = tableRef.value.pagination;
  const filter = tableRef.value.filter;
  const params = {
    page: page,
    limit: "all",
    q: filter,
    sortBy: sortBy,
    orderBy: descending,
  };
  if (props.extraFilter) {
    for (let [key, value] of Object.entries(props.extraFilter)) {
      params[key] = props.extraFilter[key];
    }
  }
  //console.log(tableRef.value);
  if (props.type == "report") {
    await apis
      .postWithParam(
        props.apiUrl,
        props.reportData ?? {
          from_date: moment(firstDay).format("YYYY-MM-DD"),
          to_date: moment(lastDay).format("YYYY-MM-DD"),
        },
        { limit: totalLimit.value }
      )
      .then((res) => {
        exportTable(res.data.data.data ?? res.data.data ?? res.data.res.data);
      })
      .finally(() => {
        Loading.hide();
      });
  } else {
    await apis
      .getWithParam(props.apiUrl, params)
      .then((res) => {
        exportTable(res.data);
      })
      .finally(() => {
        Loading.hide();
      });
  }
}

function exportTable(data) {
  // naive encoding to csv format
  const totalPoints = total.value
    ? props.columns.map((col) => {
        return wrapCsvValue(col.name == "points" ? `Total ${total.value}` : "");
      })
    : "";
  const content = [
    props.columns.map((col) => {
      if (col.label !== "Actions") {
        return wrapCsvValue(col.label);
      }
    }),
  ]

    .concat(
      data.map((row, index) =>
        props.columns
          .map((col) =>
            wrapCsvValue(
              col.field == "index"
                ? index + 1
                : typeof col.field === "function"
                ? col.field(row, index)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(",")
      )
    )

    .join("\r\n");
  //console.log(content.concat("\n", totalPoints));
  const status = exportFile(
    `${props.title}-${formatDate(Date.now())}.csv`,
    content.concat("\n", totalPoints),
    "text/csv"
  );

  if (status !== true) {
    $q.notify({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning",
    });
  }
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

        console.log(res.data.data);

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
    : `${selected.value.length} record${
        selected.value.length > 1 ? "s" : ""
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

const deleteData = ref("");
function deleteItem(item) {
  deleteData.value = item;
  deleteDialog.value = true;
}
</script>
