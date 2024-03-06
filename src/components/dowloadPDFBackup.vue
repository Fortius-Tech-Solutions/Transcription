<template>
  <div style="width: 100%; height: 100%; display: inline-block">
    <div style="
        margin: 0 auto;
        width: 100%;
        z-index: 1;
        position: relative;
        height: 100%;
      ">
      <div style="display: flex; height: 100%; width:100%; flex-direction: column;">
        <div style="width:100%; padding: 0 30px;" v-for="(content, index) in splitContent" :key="index"
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
                <th style="
                  text-align: left;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 15px;
                ">
                  <span style="
                    font-size: 14px;
                    font-weight: bold;
                    text-transform: uppercase;
                    padding-top: 20px;
                    display: inline-block;
                  ">
                    {{ props.items.first_name ?? props.items.doctorname.first_name
                    }}{{ " " }}{{ props.items.last_name ?? props.items.doctorname.last_name }}
                  </span>
                  <p style="font-weight: normal; margin-bottom: 0; color: #666">
                    <span style="font-style: italic">MBBS, MS(ORTHO), FRACS, FAORTHA</span><br />
                    ORTHOPAEDIC SURGEON
                  </p>
                  <div style="font-weight: normal; color: #666">
                    <b>T</b>: 03 9862 3493<br />
                    <b>F</b>: 03 8204 6009<br />
                    <b>E</b>: mrviralshahreception@gmail.com<br />
                  </div>
                </th>
                <th style="
                  text-align: right;
                  border-bottom: 1px solid #ddd;
                  padding-bottom: 15px;
                ">
                  <img :src="require('assets/images/ortho-logo.png')" alt="" style="width: 120px" /><br />
                </th>
              </tr>
            </thead>
            <!-- Header End -->

            <!-- Body Start -->
            <tbody style="vertical-align: top; height: 860px;">
              <tr>
                <td colspan="2" style="padding-top: 5px; vertical-align: text-top">
                  <div v-html="content"></div><br />
                  <div v-if="index === splitContent.length - 1">
                    <img :src="require('assets/images/signature.png')" style="width: 100px;" alt="signature"><br />
                    <span style="padding-bottom: 10px; display: inline-block;">{{ props.items.first_name ??
          props.items.doctorname.first_name
                      }}{{ " " }}{{ props.items.last_name ?? props.items.doctorname.last_name }}</span>

                  </div>
                </td>
                <!-- Signature Start -->
                <!-- <td colspan="2" v-if="index === splitContent.length - 1">
                  <span colspan="2" style="vertical-align:bottom;">
                    <img :src="require('assets/images/signature.png')" style="width: 100px;" alt="signature"><br />
                    <span style="padding-bottom: 10px; display: inline-block;">{{ props.items.first_name ??
                      props.items.doctorname.first_name
                    }}{{ " " }}{{ props.items.last_name ?? props.items.doctorname.last_name }}</span>
                  </span>
                </td> -->
                <!-- Signature End -->
              </tr>

              <!-- Signature Start -->
              <!-- <tr v-if="index === splitContent.length - 1">
                <td colspan="2" style="vertical-align:top;">
                  <img :src="require('assets/images/signature.png')" style="width: 100px;" alt="signature"><br />
                  <span style="padding-bottom: 10px; display: inline-block;">{{ props.items.first_name ??
                    props.items.doctorname.first_name
                  }}{{ " " }}{{ props.items.last_name ?? props.items.doctorname.last_name }}</span>
                </td>
              </tr> -->
              <!-- Signature End -->

            </tbody>
            <!-- Body End -->

            <!-- Footer Start -->
            <tfoot style="page-break-inside:auto; width: 100%;">
              <tr>
                <td style="border-top: 2px solid #21627e">
                  <div style="display: flex; padding-top: 15px">
                    <div style="width: 50%">
                      <p style="margin: 0; font-weight: bold; color: #666666">
                        CONSULTING AT
                      </p>
                      <ul style="margin: 0; padding: 0 0 0 8px; color: #666666">
                        <li>Shepparton, Cobram</li>
                        <li>Kyabram rooms</li>
                      </ul>
                    </div>
                    <div style="width: 50%">
                      <p style="margin: 0; font-weight: bold; color: #666666">
                        OPERATING AT
                      </p>
                      <ul style="margin: 0; padding: 0 0 0 8px; color: #666666">
                        <li>Shepparton Private Hospital</li>
                        <li>Numurkah Hospital</li>
                        <li>Kyabram Regional Hospital</li>
                        <li>GV Health</li>
                      </ul>
                    </div>
                  </div>
                </td>
                <td style="border-top: 2px solid #21627e; text-align: right">
                  <img :src="require('assets/images/fracs-foot1.png')" alt="" style="width: 230px" />
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
import { date } from "quasar";

const props = defineProps({
  items: Object,
});

const splitContent = computed(() => {
  const content = props.items.transcription;
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
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

.water_mark {
  background: url("../assets/images/water-mark-pdf.png") bottom left no-repeat;
  background-size: 80%;
}

.page {
  page-break-after: always;
  position: relative;
}

.page:last-child {
  page-break-after: avoid;
}

@media print {
  @page {
    margin: 0;
  }
}
</style>
