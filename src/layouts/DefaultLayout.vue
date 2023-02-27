<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, defineAsyncComponent, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";
import { LocalStorage } from "quasar";
const store = useAuthStore();
const user = computed(() => {
  return store.getUser;
});
const logo = defineAsyncComponent(() => import("../components/vha-logo.vue"));

const profileText = computed(() => {
  if (user.value) {
    const name = user.value.name?.split(" ");
    return `${name[0].charAt(0)}${name[1] ? name[1]?.charAt(0) : ""}`;
  } else {
    return "";
  }
});

const router = useRouter();
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
function changePassword() {
  router.push({ name: "change-password" });
}
function changeTwoFactor() {

  router.push({ name: "change-two-factor-security" });
}
function logout() {
  router.push({ name: "sign-in" });
  store.logout();
}
</script>
