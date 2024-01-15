<template>
  <transition-group v-if="unitForm.owners.length !== 0" name="slide-fade">
    <div class="row" v-for="(owner, i) in unitForm.owners" :key="i">
      <!-- /////////// -->
      <!-- vendorId -->
      <!-- /////////// -->
      <div class="col-6 q-px-sm q-mt-lg">
        <q-select
          v-model="owner['vendorId']"
          :options="owners_option"
          emit-value
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
      <div class="col-3 q-px-sm q-mt-lg">
        <q-input
          type="number"
          v-model="owner['ownerShipRate']"
          :label="
            $t('app.administration.charts.chartsProperty.owner_ship_rate')
          "
          @keyup="handelMaxRate($event.target)"
          :error="isAvilableRat"
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
          v-if="i"
          flat
          icon="eva-close-circle-outline"
          @click="deleteOwner(i)"
        />
      </div>
    </div>
    <div class="row justify-center items-center">
      <q-btn
        class="col-6"
        :label="$t('app.administration.settings.property_unit.taps.owner.add')"
        outline
        :disable="isAvilableRat || avilableShipRat == 0"
        color="primary"
        @click="addOwner"
      />
      <div class="col-6"></div>
    </div>
  </transition-group>
</template>

<script setup>
import { unitForm } from "./unit-form";
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
    ownerShipRate: unitForm.value,
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
