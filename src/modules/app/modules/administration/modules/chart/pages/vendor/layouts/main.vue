<template>
  <q-layout
    view="hHh lpR fFf"
    style="height: 122vh !important ; overflow-y: scroll"
    :class="{
      'bg-dark-blue-4': $q.dark.isActive,
      'bg-offwhite-blue': !$q.dark.isActive,
    }"
  >
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.handel-height {
  max-height: 125vh;
}
</style>

