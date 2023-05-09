<template>
  <div style="margin: 0 auto; width: 700px; background-color: #fff;">
    <div style="display: flex;">
      <div style="width: 550px; display: inline-block; padding-right: 25px; padding-top: 20px;">
        <table
          style="margin: 0; width: 100%; padding: 0; font-size: 14px; color: #000; font-family: Arial, Helvetica, sans-serif;">
          <tbody style="padding-top: 20px;">
            <tr>
              <td style="padding-top:20px;"><b>Hospital Name:</b> {{ props.items[0].hospital_name }}
              </td>
            </tr>
            <tr>
              <td style="padding-top:20px;"><b>Service Date:</b> {{ date.formatDate(props.items[0].updated_at,
                'DD-MM-YYYY') }}
              </td>
            </tr>
            <tr>
              <td style="padding-top:15px;"><b>Doctor Name:</b>
                {{ props.items[0].first_name ??
                  props.items[0].doctorname.first_name }} {{ " " }}{{
    props.items[0].last_name ?? props.items[0].doctorname.last_name
  }}
              </td>
            </tr>
            <tr>
              <td style="padding-top:15px;"><b>Patient Name:</b> {{ props.items[0].patient_name }}</td>
            </tr>
            <tr>
              <td style="padding-top:15px;"><b>TSType:</b> {{ props.items[0].TSType_name }}</td>
            </tr>
            <tr>
              <td style="padding-top:15px;"><b>Transcription Details:</b></td>
            </tr>
            <tr>
              <td style="padding-top:5px; font-size:14px;" v-html="props.items[0].transcription"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { date } from "quasar";

const props = defineProps({
  items: Object,
});
</script>

<style lang="scss"></style>
