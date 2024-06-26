<template>

  <div id="downloadPDF" class="dialogpdf"
    style="width: 100%; height: 100%; display: inline-block; background-color: white;">
    <div v-if="pdfData.hospital_id === 2">
      <span v-html="pdfData.transcription ?? pdfData" />
      <div v-if="cc_mail" v-html="cc_mail"></div>
    </div>
    <div v-else style="
        margin: 0 auto;
        width: 100%;
        z-index: 1;
        position: relative;
        height: 100%;
      ">
      <div style="display: flex; height: 100%; width:100%; flex-direction: column;">
        <div style="width:100%; padding: 38px 60px 0 60px;" v-for="(content, index) in splitContent" :key="index"
          class="page water_mark split_content_loop" :style="{ backgroundImage: `url(${waterMark})` }">
          <div class="pdf_header">
            <img style="width:100%;" v-if="headerImage" :src="headerImage" alt="header image" />
          </div>
          <table border="0" style="
            margin: 0;
            width: 100%;
            padding: 0;
            font-size: 12px;
            color: #000;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: normal;
            border-collapse: collapse;
            border: none;
            vertical-align: top;
          ">
            <tbody style="vertical-align: top; height: 800px;">
              <tr>
                <td colspan="2" style="padding-top: 5px; vertical-align: text-top">
                  <div v-html="content"></div><br />

                  <div v-if="index === splitContent.length - 1">
                    <img v-if="signature" :src="signature" style="width: 100px;" alt="signature"><br />
                    <span style="padding-bottom: 10px; display: inline-block;">
                      {{ doctorName }}<br />
                      {{ speciality }}
                    </span>
                  </div>
                  <div style="width:100%; padding: 30px 60px 0 0;" v-if="cc_mail" v-html="cc_mail"></div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pdf_footer">
            <img v-if="footerImage" :src="footerImage" alt="footer image" style="width: 100%; margin-bottom: 40px;" />
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script setup>
import { computed, ref, defineProps } from "vue";
import { useMasterStore } from "src/stores/master";
import { date } from "quasar";

const master = useMasterStore();
const pdfData = computed(() => {
  return master.pdfData;
})
const doctorName = computed(() => {
  if (pdfData.value.first_name) {
    return pdfData.value.first_name + " " + pdfData.value.last_name;
  } else {
    return pdfData.value.doctorname.first_name + " " + pdfData.value.doctorname.last_name;
  }
});
const patientName = ref(pdfData.value?.patient_name ?? "");
const headerImage = ref(pdfData.value?.header_file ?? pdfData.value?.hospitalname?.header_file);
const footerImage = ref(pdfData.value?.footer_file ?? pdfData.value?.hospitalname?.footer_file);
const waterMark = ref(pdfData.value?.water_mark ?? pdfData.value?.hospitalname?.water_mark);
const signature = ref(pdfData.value?.signature ?? pdfData.value?.doctorname?.signature);
const speciality = ref(pdfData.value?.speciality ?? pdfData.value?.doctorname?.speciality)
const cc_mail = ref(pdfData.value?.cc_mail ?? "")

const splitContent = computed(() => {
  const content = pdfData.value.transcription ?? pdfData.value;

  const pages = [];
  let currentPage = '';
  const pageHeight = 1020;
  const lineHeight = 20;
  const linesPerPage = Math.floor(pageHeight / lineHeight);
  const lines = content?.split('\n');
  let currentLine = 0;
  lines?.forEach(line => {
    if (currentLine + 1 > linesPerPage) {
      pages.push(currentPage);
      currentPage = '';
      currentLine = 0;
    }
    currentPage += line;
    currentLine++;
  });
  if (currentPage) {
    pages.push(currentPage);
  }

  return pages;
});

setTimeout(() => {
  if (![2, 9].includes(pdfData.value.hospital_id)) {
    var tempTitle = document.title;
    document.title = `${patientName.value}_${date.formatDate(pdfData.value?.date_of_service, "DD-MM-YYYY")}`;
    window.print();
    document.title = tempTitle;
  }
}, 2000);

</script>

<style lang="scss">
//$
@media print {
  @page {
    margin: 0;
  }

  .page {
    page-break-after: always !important;
    position: relative;
  }

  body * {
    visibility: hidden;
  }

  .dialogpdf * {
    visibility: visible;
  }

  .dialogpdf {
    position: absolute;
    left: 0;
    top: 0;
  }


  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    margin: 0;
  }

  .split_content_loop {

    padding-top: 150px !important;
  }

  .pdf_header {
    position: fixed;
    top: 10px;
    left: 0;
    width: 100%;
    padding: 0 60px;
  }

  .pdf_footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 60px;
  }


}



.water_mark {
  background-size: 80%;
  background-color: #fff;
  background-position: bottom left;
  background-repeat: no-repeat;
}
</style>
