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
          class="page water_mark">
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
            <!-- Header Start -->
            <thead>
              <tr>
                <th colspan="2">
                  <img style="width:100%;" v-if="headerImage" :src="headerImage" alt="header image" />
                </th>
              </tr>
            </thead>
            <!-- Header End -->

            <!-- Body Start -->
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
            <!-- Body End -->

            <!-- Footer Start -->
            <tfoot style="page-break-inside:auto; width: 100%;">
              <tr>
                <td>
                  <img v-if="footerImage" :src="footerImage" alt="footer image"
                    style="width: 100%; margin-bottom: 40px;" />
                </td>
              </tr>
            </tfoot>
            <!-- Footer End -->
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { date, Loading, QSpinnerGears } from "quasar";
import html2pdf from 'html2pdf.js';

const props = defineProps({
  items: Object,
  images: Object,
});

const doctorName = computed(() => {
  if (props.items.first_name) {
    return props.items.first_name + " " + props.items.last_name;
  } else {
    return props.items.doctorname.first_name + " " + props.items.doctorname.last_name;
  }
});

const headerImage = ref(props.items.header_file ?? props.items.hospitalname.header_file);
const footerImage = ref(props.items.footer_file ?? props.items.hospitalname.footer_file);
const signature = ref(props.items.signature ?? props.items.doctorname.signature);

async function isImageExists(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}


// const headerImage = (() => {

//   if (props.items.header_file) {
//     return props.items.header_file;
//   } else {
//     return props.items.hospitalname.header_file;
//     // return toBase64(require(props.items.hospitalname.header_file), (base64Img) => {
//     //   return base64Img;
//     // });
//   }
// });

// const footerImage = (() => {
//   if (props.items.footer_file) {
//     return props.items.footer_file;
//   } else {
//     return props.items.hospitalname.footer_file;
//     // return toBase64(require(props.items.hospitalname.footer_file), (base64Img) => {
//     //   return base64Img;
//     // });
//   }
// });

const waterMark = computed(() => {
  if (props.items.water_mark) {
    return props.items.water_mark;
  } else {
    return props.items.hospitalname.water_mark;
  }
});

// const signature = computed(() => {
//   if (props.items.signature) {
//     return props.items.signature;
//   } else {
//     return props.items.doctorname.signature;
//   }
// });

// async function printPDF() {
setTimeout(() => {
  // printToPdf()
  // Loading.show({
  //   message: "Loading...",
  //   spinner: QSpinnerGears,
  // });
  // fetchPdf()
  // print();
}, 2000);
// }

// Loading.show({
//   message: "Loading...",
//   spinner: QSpinnerGears,
// });
// fetchPdf()


function fetchPdf() {
  setTimeout(() => {
    const pageBreak = document.getElementById("mode");
    if (isImageExists(headerImage.value)) {
      exportToPDF(document.getElementById("downloadPDF"), "", pageBreak);
    }
    Loading.hide();
  }, 2000);
}



async function exportToPDF(data) {
  await html2pdf(data, {
    margin: 0,
    filename: `${props.items.patient_name}_${date.formatDate(props.items.date_of_service, 'DD-MM-YYYY')}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 1, letterRendering: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  });
}

const splitContent = computed(() => {
  const content = props.items.transcription;
  const pages = [];
  let currentPage = '';
  const pageHeight = 500;
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
</script>

<style lang="scss">
@media print {
  * {
    box-sizing: border-box;
  }

  .water_mark {
    background: url("../assets/images/water-mark-pdf.png") bottom left no-repeat;
    background-size: 80%;
    background-color: #fff;
  }

  .page:last-child {
    page-break-after: avoid;
  }

  p {
    page-break-after: always;
  }

  .page {
    page-break-after: always;
    position: relative;
  }

  @page {
    margin: 0;
  }

  body {
    -webkit-print-color-adjust: exact;
    margin: 0;
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
}
</style>
