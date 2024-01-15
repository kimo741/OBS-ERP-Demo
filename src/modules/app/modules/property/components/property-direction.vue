<template>
  <div class="row">
    <div class="col-12">
      <q-input
        type="number"
        placeholder="Deg"
        label="north"
        v-model="northModel"
      />
    </div>
    <div class="col-12">
      <q-input
        type="number"
        placeholder="Deg"
        label="thout"
        v-model="thouthModel"
      />
    </div>
    <div class="col-12">
      <q-input
        type="number"
        placeholder="Deg "
        label="eastern"
        v-model="easternModel"
      />
    </div>
    <div class="col-12">
      <q-input
        type="number"
        placeholder="Deg"
        label="western"
        v-model="westernModel"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  northernBorderBy: {
    type: String,
    default: "",
  },
  southernBorderBy: {
    type: String,
    default: "",
  },
  easternBorderBy: {
    type: String,
    default: "",
  },
  westernBorderBy: {
    type: String,
    default: "",
  },
});
const emits = defineEmits([
  "update:northernBorderBy",
  "update:southernBorderBy",
  "update:easternBorderBy",
  "update:westernBorderBy",
]);
const northModel = computed({
  get() {
    return props.northernBorderBy;
  },
  set(value) {
    return emits("update:northernBorderBy", value);
  },
});
const thouthModel = computed({
  get() {
    return props.southernBorderBy;
  },
  set(value) {
    return emits("update:southernBorderBy", value);
  },
});
const easternModel = computed({
  get() {
    return props.easternBorderBy;
  },
  set(value) {
    return emits("update:easternBorderBy", value);
  },
});
const westernModel = computed({
  get() {
    return props.westernBorderBy;
  },
  set(value) {
    return emits("update:westernBorderBy", value);
  },
});
</script>

<style>
</style>
