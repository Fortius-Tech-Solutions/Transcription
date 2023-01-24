<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="custom_header">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> </q-toolbar-title>
        <div class="header-profile-box">
          <q-avatar v-if="user.avtar" rounded>
            <img :src="user.avtar">
          </q-avatar>
          <div v-else class="logo-text">{{ profileText }}</div>
          <div class="profile-user-name q-ml-sm">
            <h5>{{ user.first_name }}&nbsp; {{ user.last_name }}</h5>
          </div>
        </div>
        <div class="q-ml-sm">
          <q-btn flat dense round color="primary" :label="$q.lang.mainLayout.profileDropdown.label3" @click="logout" />
        </div>
      </q-toolbar>
    </q-header>

    <!-- <Sidebar /> -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header class="logo_sidebar">
          <img src="~assets/images/logo.png" alt="" />
        </q-item-label>
        <q-list class="sidbar-collaps-right-border">
          <q-expansion-item :to="{ name: 'home' }" icon="home" :label="$q.lang.mainLayout.sidebar.home"
            class="hide_arrow">
          </q-expansion-item>
          <q-expansion-item v-if="store.isSuperAdmin" :to="{ name: 'user-dashboard' }" icon="las la-users"
            :label="$q.lang.mainLayout.sidebar.users" class="hide_arrow">
          </q-expansion-item>
          <q-expansion-item v-if="store.isSuperAdmin" :label="$q.lang.mainLayout.sidebar.hospital"
            icon="las la-hospital-alt" class="hide_arrow" :to="{ name: 'hospital-dashboard' }">
          </q-expansion-item>
          <q-expansion-item v-if="store.isSuperAdmin" :label="$q.lang.mainLayout.sidebar.transcription"
            icon="las la-hospital-alt" class="hide_arrow" :to="{ name: 'transcription-dashboard' }">
          </q-expansion-item>
        </q-list>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component, route }" :key="$route.fullPath">
        <transition :name="route.meta.transition || 'slide-up'">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";
const store = useAuthStore();
const user = computed(() => {
  return store.getUser;
});

const profileText = computed(() => {
  if (user.value) {
    return `${user.value.first_name.charAt(0)}${user.value.last_name.charAt(
      0
    )}`;
  } else {
    return "";
  }
});
const router = useRouter();
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

function logout() {
  store.logout().then((res) => {
    router.push({ name: "sign-in" });
  });
}
</script>
