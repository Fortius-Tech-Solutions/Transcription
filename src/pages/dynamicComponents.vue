<template>
  <div class="custom-tabel-box">
    <table-component
      ref="userTableComponent"
      :apiUrl="USER.LIST"
      :columns="columns"
      rowKey="id"
      :title="$q.lang.user.table_title"
      createUrl="user/create"
      @delete="deleteItem"
      @edit="editItem"
      @view="showItem"
      @lock="lockUser"
      :extra-filter="{
        accountStatus: status,
        group: userGroup,
      }"
    >
      <template v-slot:filter>
        <q-checkbox
          v-model="status"
          val="100"
          :label="$q.lang.user.filter.status_checkbox.active_label"
          @click="applyFilter"
        />
        <q-checkbox
          v-model="status"
          val="0"
          :label="$q.lang.user.filter.status_checkbox.inactive_label"
          @click="applyFilter"
        />
        <q-checkbox
          v-model="status"
          val="200"
          :label="$q.lang.user.filter.status_checkbox.lock_label"
          @click="applyFilter"
        />
      </template>
    </table-component>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
</style>
