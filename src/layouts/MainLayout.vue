<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="custom_header">
      <q-toolbar>
        <div>
          <router-link to="/" class="header_logo"><img src="~assets/images/logo.png" alt="" />
          </router-link>
        </div>
        <div>
          <ul class="header_nav">
            <li v-if="store.isSuperAdmin">
              <router-link :to="{ name: 'home' }">{{
                $q.lang.mainLayout.sidebar.home
              }}</router-link>
            </li>
            <li v-if="store.isSuperAdmin">
              <router-link :to="{ name: 'user-dashboard' }" icon="las la-users">{{ $q.lang.mainLayout.sidebar.users
              }}</router-link>
            </li>
            <li v-if="store.isSuperAdmin">
              <router-link :to="{ name: 'hospital-dashboard' }">{{
                $q.lang.mainLayout.sidebar.hospital
              }}</router-link>
            </li>
            <li v-if="store.isSuperAdmin">
              <router-link :to="{ name: 'transcription-dashboard' }">{{
                $q.lang.mainLayout.sidebar.transcription
              }}</router-link>
            </li>
          </ul>
        </div>

        <div class="header_col3">
          <div class="header-profile-box">
            <q-avatar v-if="user.avtar" rounded>
              <img :src="user.avtar" />
            </q-avatar>
            <div v-else class="logo-text">{{ profileText }}</div>
            <div class="profile-user-name q-ml-sm">
              <h5>{{ user.first_name }}&nbsp; {{ user.last_name }}</h5>
            </div>
          </div>
          <div class="q-ml-sm">
            <q-btn dense color="primary" :label="$q.lang.mainLayout.profileDropdown.label3" @click="logout" />
          </div>
        </div>
      </q-toolbar>
    </q-header><q-page-container>
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
