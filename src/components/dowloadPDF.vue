<template>
  <div id="downloadPDF" class="dialogpdf"
    style="width: 100%; height: 100%; display: inline-block; background-color: white;">
    <div style="
        margin: 0 auto;
        width: 100%;
        z-index: 1;
        position: relative;
        height: 100%;
      ">
      <div style="display: flex; height: 100%; width:100%; flex-direction: column;">
        <div style="width:100%; padding: 38px 60px 0 60px;" v-for="(content, index) in splitContent" :key="index"
          class="page water_mark" :style="{ backgroundImage: `url(${waterMark})` }">
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
            <thead>
              <tr>
                <th colspan="2">
                  <img style="width:100%;" v-if="headerImage" :src="headerImage" alt="header image" />
                </th>
              </tr>
            </thead>
            <tbody style="vertical-align: top; height: 800px;">
              <tr>
                <td colspan="2" style="padding-top: 5px; vertical-align: text-top">
                  <div v-html="content"></div><br />
                  <div v-if="index === splitContent.length - 1">
                    <img v-if="signature" :src="signature" style="width: 100px;" alt="signature"><br />
                    <span style="padding-bottom: 10px; display: inline-block;">
                      {{ doctorName }}
                    </span>

                  </div>
                </td>

              </tr>
            </tbody>
            <tfoot style="page-break-inside:auto; width: 100%; ">
              <tr>
                <td>
                  <img v-if="footerImage" :src="footerImage" alt="footer image"
                    style="width: 100%; margin-bottom: 40px;" />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineProps } from "vue";
import { useMasterStore } from "src/stores/master";

const master = useMasterStore();
const pdfData = computed(() => {
  return master.pdfData;
})

// const props = defineProps({
//   items: {
//     type: Object,
//     required: true,
//   },
// });
// console.log(props.items);
// const pdfData = ref(props.items);

const doctorName = computed(() => {
  if (pdfData.value.first_name) {
    return pdfData.value.first_name + " " + pdfData.value.last_name;
  } else {
    return pdfData.value.doctorname.first_name + " " + pdfData.value.doctorname.last_name;
  }
});

const headerImage = ref(pdfData.value.header_file ?? pdfData.value.hospitalname.header_file);
const footerImage = ref(pdfData.value.footer_file ?? pdfData.value.hospitalname.footer_file);
const waterMark = ref(pdfData.value.water_mark ?? pdfData.value.hospitalname.water_mark);
const signature = ref(pdfData.value.signature ?? pdfData.value.doctorname.signature);

const splitContent = computed(() => {
  const content = pdfData.value.transcription;
  const pages = [];
  let currentPage = '';
  const pageHeight = 1300;
  const lineHeight = 20;
  const linesPerPage = Math.floor(pageHeight / lineHeight);
  const lines = content.split('\n');
  let currentLine = 0;
  lines.forEach(line => {
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
  print();
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

}

.water_mark {
  // background: url("../assets/images/water-mark-pdf.png") bottom left no-repeat;
  background-size: 80%;
  background-color: #fff;
  background-position: bottom left;
  background-repeat: no-repeat;
}
</style>
