<template>
  <div class="row justify-end full-width">
    <q-btn
      :label="$t('app.administration.charts.chartsProperty.add_owner')"
      dense
      padding="5px 30px"
      outline
      :disable="isAvilableRat || avilableShipRat == 0 || is_review_from_card"
      @click="addOwner"
    />
  </div>
  <!-- table -->
  <div class="row">
    <div style="8px" class="q-ma-md">#</div>
    <div class="col-3 q-ma-md">Owner Name</div>
    <div class="col-3 q-ma-md">Ownership %</div>
  </div>
  <transition-group v-if="unitForm.owners.length !== 0" name="slide-fade">
    <div
      class="row items-center"
      v-for="(owner, i) in unitForm.owners"
      :key="i"
    >
      <!-- /////////// -->
      <!-- vendorId -->
      <!-- /////////// -->
      <div style="8px" class="q-ma-md">{{ i + 1 }}</div>
      <div class="col-3 q-px-md q-mt-xs">
        <q-select
          v-model="owner['vendorId']"
          :options="owners_option"
          emit-value
          dense
          clearable
          option-value="id"
          map-options
          :label="
            $t('app.administration.settings.property_unit.taps.owner.col')
          "
        ></q-select>
        <!-- :rules="[(val) => val || 'owner Is Required']" -->
      </div>
      <!-- /////// -->
      <!-- company Name -->
      <!-- /////// -->
      <div class="col-3 q-px-md q-mt-lg">
        <q-input
          type="number"
          v-model="owner['ownerShipRate']"
          :label="
            $t('app.administration.charts.chartsProperty.owner_ship_rate')
          "
          @keyup="handelMaxRate($event.target)"
          :error="isAvilableRat"
          dense
          :error-message="
            avilableShipRat +
            $t('app.administration.charts.chartsProperty.max_ship_rate_err')
          "
        >
          <template v-slot:append>
            <q-avatar size="lg"> % </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col-2 q-px-sm q-mt-lg">
        <q-btn
          v-if="i > 0"
          flat
          icon="eva-close-circle-outline"
          @click="deleteOwner(i)"
        />
      </div>
    </div>
  </transition-group>
</template>

<script setup>
import { unitForm } from "../form/unit-model-form";
import { ref } from "vue";
const { useActions: propertyAction } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { onBeforeMount } from "vue";
const owners_option = ref([]);
const avilableShipRat = ref(100);
const isAvilableRat = ref(false);
const { getVendorsList } = propertyAction(["getVendorsList"]);
const handelMaxRate = (e) => {
  let curentShipRat = 0;
  let opj = unitForm.value;
  // calc my all ships rate
  opj.owners.forEach((el) => {
    curentShipRat += Number(el.ownerShipRate);
  });
  // chech
  if (curentShipRat <= 100) {
    isAvilableRat.value = false;
    avilableShipRat.value = 100 - curentShipRat;
  } else {
    avilableShipRat.value = 100 - curentShipRat + Number(e.value);
    isAvilableRat.value = true;
  }
};
const deleteOwner = (index) => {
  const obj = unitForm.value;
  obj.owners.splice(index, 1);
};
// add vendor
const addOwner = () => {
  const obj = unitForm.value;
  const scima = {
    vendorId: "",
    ownerShipRate: avilableShipRat.value == 100 ? null : avilableShipRat.value,
  };
  obj.owners.push(scima);
};
// get blocks dropdown
const getOwnersOptions = () => {
  getVendorsList()
    .then((res) => {
      owners_option.value = res.data.value;
    })
    .catch((_error) => {
      console.log(_error);
    });
};
onBeforeMount(() => {
  getOwnersOptions();
});
</script>

<style>
</style>
