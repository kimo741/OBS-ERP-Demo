<template>
  <q-layout
    class="handel-height"
    view="hHh lpR fFf"
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
  height: 122vh;
}
</style>

