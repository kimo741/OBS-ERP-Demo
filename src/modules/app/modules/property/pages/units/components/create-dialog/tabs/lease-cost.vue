<template>
  <div class="row items-cenetr">
    <div class="col-6 row aria-section">
      <!-- //////////// -->
      <!-- Area section -->
      <!-- //////////// -->
      <div class="col-12 row justify-around">
        <div class="col-12 row justify-around q-mb-md">
          <div class="input-width title-style">Areas & Prices</div>
          <div class="input-width"></div>
        </div>
        <!-- Unit Area m2 -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.areaM2"
            type="number"
            label="Unit Area m2"
            @update:model-value="updateByArea"
          />
        </div>
        <!-- space -->
        <div class="col-5 row items-center">
          <q-btn
            label="Clear"
            @click="clearSizes"
            color="blue-1"
            text-color="black"
            flat
            v-if="
              unitForm.leaseCostInfo.areaM2 !== null ||
              unitForm.leaseCostInfo.netAreaM2 !== null ||
              unitForm.leaseCostInfo.pu !== null
            "
          />
        </div>
        <!-- ///// -->
        <!-- PU. for unit % -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.pu"
            type="number"
            label="PU. for unit %"
            @update:model-value="updateByPu"
            :rules="[(val) => val < 80 || 'PU can not be upper than 80%']"
          />
        </div>
        <!-- Net unit area m2  -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.netAreaM2"
            type="number"
            label="Net unit area m2"
            @update:model-value="updateByNet"
          />
        </div>
        <!-- Garden area m2  -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.gardenAreaM2"
            type="number"
            label="Garden area m2"
          />
        </div>
        <!-- Balconies area m2  -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.balconiesAreaM2"
            type="number"
            label="Balconies area m2"
          />
        </div>
      </div>
      <div class="col-12 row justify-around q-mt-lg">
        <!-- Rental price per m2 -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.rentalPriceParM2"
            type="number"
            label="Rental price per m2"
            @update:model-value="updateByRentalPriceParM2"
          />
        </div>
        <!-- space -->
        <div class="col-5"></div>
        <!-- ///// -->
        <!-- Monthly lease value -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.monthlyLease"
            type="number"
            label="Monthly lease value"
            @update:model-value="updateByMonthlyLease"
          />
        </div>
        <!-- Payment method -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.paymentMethod"
            type="number"
            label="Payment method"
          />
        </div>
        <!-- Annual rent value -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.annualRent"
            type="number"
            label="Annual rent value"
          />
        </div>
        <!-- Annual rent value -->
        <!-- <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.annualRent"
            type="number"
            label="Annual rent value"
          />
        </div> -->
        <!-- Insurance fee  -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.insurance"
            type="number"
            label="Insurance fee "
          />
        </div>
        <!-- Commission %  -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.commissionPercentage"
            type="number"
            label="Commission %"
            @update:model-value="updateByCommissionPercentage"
            decimals
          />
        </div>
        <!-- Commission %  -->
        <div class="input-width">
          <q-input
            v-model="unitForm.leaseCostInfo.commission"
            @update:model-value="updateBycommission"
            type="number"
            label="Commission"
            decimals
          />
        </div>
        <div class="input-width"></div>
      </div>
    </div>
    <!-- ///////// -->
    <!-- Amenities -->
    <!-- ///////// -->
    <div class="col-6">
      <div class="col-6 row">
        <div class="col-12 row justify-around q-mb-md">
          <div class="col-12 row justify-around q-mb-md">
            <div class="input-width title-style">Amenities & Bills</div>
            <div class="input-width"></div>
          </div>
          <!-- Add Amienitie -->
          <div class="col-11 row justify-end">
            <q-btn
              label="Add"
              @click="addAmienities"
              dense
              padding="0px 50px"
              outline
            />
          </div>
          <!-- Add teble -->
          <div class="col-11 row q-mx-auto q-my-md amienities-table">
            <div class="col-12 amienities-table__head"></div>
            <template v-if="unitForm.calculateAmenitiesUnit.length === 0">
              <div
                class="col-12 row justify-center amienities-table__body items-end"
              >
                There are no amenities
              </div>
            </template>
            <template v-else>
              <div
                class="col-12 row justify-between amienities-table__body items-end"
                v-for="(aminiate, i) in unitForm.calculateAmenitiesUnit"
                :key="i"
              >
                <div
                  class="col-1 under-line text-center"
                  style="margin-bottom: 20px"
                >
                  {{ i + 1 }}
                </div>
                <div class="col-3 col-line">
                  <q-select
                    v-model="aminiate.amenityId"
                    :options="amenity_list"
                    emit-value
                    dense
                    clearable
                    option-value="id"
                    map-options
                    label="Amenity"
                    :rules="[(val) => val || 'Aminiate is Required *']"
                  ></q-select>
                </div>
                <div class="col-3 col-line">
                  <q-select
                    v-model="aminiate.rentTypes"
                    :options="rentTypesOpstions"
                    emit-value
                    clearable
                    dense
                    map-options
                    label="Rent Types"
                    :input-style="{ fontSize: '10px' }"
                    :rules="[(val) => val || 'Rent type is Required *']"
                  ></q-select>
                </div>
                <div class="col-2 col-line row full-height">
                  <q-input
                    class="full-height"
                    v-if="aminiate.rentTypes == '3'"
                    v-model="aminiate.amount"
                    type="number"
                    label="Amount"
                    fill-input
                    dense
                    :rules="[(val) => !!val || 'Amount Required *']"
                  ></q-input>
                </div>
                <div class="col-2 col-line full-height">
                  <q-select
                    class="full-height"
                    v-if="aminiate.rentTypes == '3'"
                    v-model="aminiate.durationTypes"
                    :options="durationTypesOpstions"
                    emit-value
                    clearable
                    fill-input
                    dense
                    map-options
                    label="Duration type"
                    :rules="[(val) => !!val || 'Duration type is Required *']"
                  ></q-select>
                </div>
                <div
                  class="col-1 row justify-center items-center full-height text-center"
                >
                  <q-btn
                    icon="delete"
                    flat
                    color="red"
                    @click="deleteAmount(i)"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { unitForm } from "../form/unit-model-form.js";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
const { getAmenitysList, getDefaultAmenity } = useActions([
  "getAmenitysList",
  "getDefaultAmenity",
]);
const amenity_list = ref([]);
const getAmenity = () => {
  getAmenitysList()
    .then((res) => {
      console.log(res);
      amenity_list.value = res.value;
      console.log(res.value);
    })
    .catch((err) => {
      console.log(err);
    });
};
// const amienitiesScima = ref({
//   id: 0,
//   amenityId: 0,
//   rentTypes: 1,
//   durationTypes: 1,
//   amount: 0,
//   unitId: 0,
// });
const rentTypesOpstions = ref([
  { label: "Excluded", value: 1 },
  { label: "Free", value: 2 },
  { label: "Excluded (Fixed cost)", value: 3 },
  { label: "Unavailable", value: 4 },
]);
const durationTypesOpstions = ref([
  { label: "Annually", value: 1 },
  { label: "Biannual", value: 2 },
  { label: "Monthly", value: 3 },
  { label: "Quarterly", value: 4 },
  { label: "OneTime", value: 5 },
]);
const addAmienities = () => {
  const amienitiesScima = {
    id: 0,
    amenityId: null,
    rentTypes: null,
    durationTypes: null,
    amount: null,
    unitId: 0,
  };
  unitForm.value.calculateAmenitiesUnit.push(amienitiesScima);
};
const updateByPu = () => {
  if (unitForm.value.leaseCostInfo.areaM2 == "") {
    // /////////
    // get areaM2
    ////////////
    let puNum = Number(
      (unitForm.value.leaseCostInfo.pu * 100) /
        unitForm.value.leaseCostInfo.netAreaM2
    );
    unitForm.value.leaseCostInfo.areaM2 = Number(
      unitForm.value.leaseCostInfo.netAreaM2 - puNum
    );
  } else {
    // /////////
    // get netAreaM2 (TOTAL EARIA)
    ////////////
    let eariaBersentage = Number(100 - unitForm.value.leaseCostInfo.pu);
    unitForm.value.leaseCostInfo.netAreaM2 = Number(
      (unitForm.value.leaseCostInfo.areaM2 * 100) / eariaBersentage
    );
  }
};
const updateByArea = () => {
  if (unitForm.value.leaseCostInfo.netAreaM2 == "") {
    // /////////
    // get netAreaM2 (TOTAL EARIA)
    ////////////
    let eariaBersentage = 100 - unitForm.value.leaseCostInfo.pu;
    unitForm.value.leaseCostInfo.netAreaM2 = Number(
      (unitForm.value.leaseCostInfo.areaM2 * 100) / eariaBersentage
    );
  } else {
    // /////////
    // get PU
    ////////////
    let puNum =
      unitForm.value.leaseCostInfo.netAreaM2 -
      unitForm.value.leaseCostInfo.areaM2;
    unitForm.value.leaseCostInfo.pu = Number(
      (puNum * 100) / unitForm.value.leaseCostInfo.netAreaM2
    );
  }
};
const updateByNet = () => {
  if (unitForm.value.leaseCostInfo.areaM2 == "") {
    // /////////
    // get aeia
    ////////////
    let puNum = Number(
      (unitForm.value.leaseCostInfo.pu * 100) /
        unitForm.value.leaseCostInfo.netAreaM2
    );
    unitForm.value.leaseCostInfo.areaM2 = Number(
      unitForm.value.leaseCostInfo.netAreaM2 - puNum
    );
  } else {
    // /////////
    // get Pu
    ////////////
    let puNum =
      unitForm.value.leaseCostInfo.netAreaM2 -
      unitForm.value.leaseCostInfo.areaM2;
    unitForm.value.leaseCostInfo.pu = Number(
      (puNum * 100) / unitForm.value.leaseCostInfo.netAreaM2
    );
  }
};
const clearSizes = () => {
  // [
  unitForm.value.leaseCostInfo.netAreaM2 = null;
  unitForm.value.leaseCostInfo.areaM2 = null;
  unitForm.value.leaseCostInfo.pu = null;
  // ] = null;
};
const handelDefaultAmenity = () => {
  if (!unitForm.value.calculateAmenitiesUnit.length) {
    getDefaultAmenity().then((res) => {
      let defaultData = res.value;
      if (defaultData.length) {
        unitForm.value.calculateAmenitiesUnit = [
          ...defaultData,
          ...unitForm.value.calculateAmenitiesUnit,
        ];
      }
      // console.log(res);
    });
  }
};
const updateByMonthlyLease = () => {
  if (unitForm.value.leaseCostInfo.areaM2 !== "") {
    unitForm.value.leaseCostInfo.rentalPriceParM2 = Number(
      unitForm.value.leaseCostInfo.monthlyLease /
        unitForm.value.leaseCostInfo.areaM2
    );
  } else if (
    unitForm.value.leaseCostInfo.areaM2 === "" &&
    unitForm.value.leaseCostInfo.rentalPriceParM2 !== null
  ) {
    unitForm.value.leaseCostInfo.areaM2 = Number(
      unitForm.value.leaseCostInfo.monthlyLease /
        unitForm.value.leaseCostInfo.rentalPriceParM2
    );
  }
  unitForm.value.leaseCostInfo.annualRent =
    unitForm.value.leaseCostInfo.monthlyLease * 12;
};
const updateByRentalPriceParM2 = () => {
  if (unitForm.value.leaseCostInfo.areaM2 !== "") {
    unitForm.value.leaseCostInfo.monthlyLease = Number(
      unitForm.value.leaseCostInfo.areaM2 *
        unitForm.value.leaseCostInfo.rentalPriceParM2
    );
  } else if (
    unitForm.value.leaseCostInfo.areaM2 === "" &&
    unitForm.value.leaseCostInfo.monthlyLease !== null
  ) {
    unitForm.value.leaseCostInfo.areaM2 = Number(
      unitForm.value.leaseCostInfo.monthlyLease /
        unitForm.value.leaseCostInfo.rentalPriceParM2
    );
  }
};
const updateByCommissionPercentage = () => {
  if (unitForm.value.leaseCostInfo.annualRent !== null) {
    unitForm.value.leaseCostInfo.commission = Number(
      (unitForm.value.leaseCostInfo.commissionPercentage *
        unitForm.value.leaseCostInfo.annualRent) /
        100
    );
  }
};
const updateBycommission = () => {
  if (unitForm.value.leaseCostInfo.annualRent !== null) {
    unitForm.value.leaseCostInfo.commissionPercentage = Number(
      (unitForm.value.leaseCostInfo.commission * 100) /
        unitForm.value.leaseCostInfo.annualRent
    );
  }
};
const deleteAmount = (index) => {
  unitForm.value.calculateAmenitiesUnit.splice(index, 1);
};
//  totol * 1 - mokml alnsba
//  safy / mokml
onBeforeMount(() => {
  getAmenity();
  handelDefaultAmenity();
});
</script>

<style lang="scss" scoped>
.input-width {
  width: 40%;
}
.title-style {
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.aria-section {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 1px;
    background: rgba(0, 0, 0, 0.8);
  }
}
.title-style {
  font-size: 18px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
}
.amienities-table {
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  &__head {
    height: 40px;
    border-bottom: 1px solid #d9d9d9;
  }
}
.under-line {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #d9d9d9;
  }
}
.col-line {
  // position: relative;
  &::before {
    content: "";
    position: absolute;
    left: -10px;
    top: 0;
    width: 1px;
    height: 100%;
    background-color: #d9d9d9;
  }
}
</style>
