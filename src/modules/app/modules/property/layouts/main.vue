<template>
  <q-layout
    view="hHh lpR fFf"
    style="height: 131vh !important"
    :class="{
      'bg-dark-blue-4': $q.dark.isActive,
      'bg-offwhite-blue': !$q.dark.isActive,
    }"
  >
    <q-page-container class="full-height">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
// .handel-height {
//   max-height: 140vh;
// }
</style>

