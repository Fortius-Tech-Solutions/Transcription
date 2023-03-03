<template>
  <div style="margin: 0 auto; width: 700px; background-color: #fff;">
    <div style="display: flex;">
      <div style="width: 550px; display: inline-block; padding-right: 25px; padding-top: 20px;">
        <table
          style="margin: 0; width: 100%; padding: 0; font-size: 14px; color: #000; font-family: Arial, Helvetica, sans-serif;">
          <thead>
            <tr>
              <th style="text-align: left; border-bottom: 2px solid #4270c4; padding-bottom: 5px;">
                <h2 style="margin: 0 0 2px 0; font-size: 18px; color: #4270c4;">{{ props.items[0].first_name ??
                  props.items[0].doctorname.first_name }} {{
    props.items[0].last_name ?? props.items[0].doctorname.last_name
  }}</h2>
              </th>
            </tr>
          </thead>
          <tbody style="padding-top: 20px;">
            <tr>
              <td style="padding-top: 20px;">
                {{ date.formatDate(props.items[0].updated_at, 'DD-MM-YYYY') }}
              </td>
            </tr>
            <tr>
              <td style="font-weight: 600; padding-top: 20px;">RE: {{ props.items[0].patient_name }}</td>
            </tr>
            <tr>
              <td style="padding-top: 5px;">DOB – </td>
            </tr>
            <tr>
              <td style="padding-top: 5px;">Mob. - </td>
            </tr>
            <tr>
              <td style="padding-top: 5px;">Medicare No. – </td>
            </tr>
            <tr>
              <td style="padding-top: 20px; line-height: 24px;" v-html="props.items[0].transcription"></td>
            </tr>
            <tr>
              <td style="padding-top: 30px;">Thank you for your ongoing care and referral.</td>
            </tr>
            <tr>
              <td style="padding-top: 5px;">Kind Regards</td>
            </tr>
            <tr>
              <td style="padding-top: 40px;">
                <h5 style="margin: 0 0 5px 0; font-size: 16px;">{{ props.items[0].first_name ??
                  props.items[0].doctorname.first_name }} {{
    props.items[0].last_name ?? props.items[0].doctorname.last_name
  }}
                </h5>
              </td>
            </tr>
            <tr>
              <td style="padding-top: 20px; line-height: 22px;">
                All Correspondence for Shepparton:<br />
                <a style="color: inherit; text-decoration: none;"
                  href="mailto:reception@drgaurangshahsurgical.com.au">reception@drgaurangshahsurgical.com.au</a><br />
                <a style="color: inherit; text-decoration: none;"
                  href="mailto:reception@drgaurangshahsurgical.com.au">accounts@drgaurangshahsurgical.com.au</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="width: 200px; display: inline-block; padding: 15px; background-color: #ddeaf6; margin-top: 20px;">
        <img style="max-width: 100%;" src="~src/assets/images/pdf-right-image.jpg" alt="">
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
