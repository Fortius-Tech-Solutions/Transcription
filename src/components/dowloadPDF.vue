<template>
  <div class="patient_pdf_bg">
    <div class="patient_pdf_head">
      <div class="patient_info">
        <div class="patient_pdf_head_name">
          <h4>{{ props.items[0].patient_name }}</h4>
          <span>{{ props.items[0].gender }}</span>
        </div>
        <div class="patient_type">
          {{ props.items[0].ts_type }}
        </div>
      </div>
      <div class="hospital_name" v-if="props.items[0].hospitalname">
        {{ props.items[0].hospitalname.name }}
      </div>
    </div>
    <div class="patient_pdf_detail">
      <p>{{ props.items[0].transcription }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import moment from "moment";

const props = defineProps({
  items: Object,
});
</script>

<style lang="scss">
@page {
  margin: 30px;
}
.patient_pdf_bg {
  margin: 20px auto 0 auto;
  width: 650px;
  border: 1px solid #ccc;
  padding: 20px;
}
.patient_pdf_detail {
  display: block;
  p {
    text-align: justify;
    margin: 0;
  }
}

.patient_pdf_head_name {
  display: flex;
  h4 {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
  }
  span {
    display: inline-block;
    background: #ce3538;
    color: #fff;
    font-size: 14px;
    padding: 2px 10px 0px 10px;
    line-height: normal;
    border-radius: 50px;
    margin-left: 10px;
  }
}
.patient_pdf_head {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  .patient_type {
    margin: 0;
    font-size: 14px;
    color: #d67206;
    font-weight: 500;
    margin-top: 5px;
  }
  .hospital_name {
    font-weight: 500;
    font-size: 16px;
  }
}
</style>
