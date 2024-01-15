<template>
  <q-card
    class="full-width"
    style="width: 1500px; max-width: 100vw; max-height: 90vh"
  >
    <q-card-section style="background-color: #edf4fc" class="row items-center">
      <div class="text-h6">
        {{
          isDialogEite
            ? `${$t("global.edit")}`
            : `${$t("app.administration.settings.add")}`
        }}
        {{ $t("app.administration.settings.property_unit.unit") }}
      </div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-form
      @submit.prevent="submitForm"
      @validation-error="getErrorValidation"
      autofocus
      greedy
    >
      <q-card-section class="row justify-between items-center">
        <!-- col for inputs -->
        <div class="col-9">
          <!-- genral data for unit -->
          <div class="row">
            <!-- ///////////// -->
            <!-- Property Name -->
            <!-- ///////////// -->
            <div class="col-12 row">
              <div class="col-6 q-px-sm q-my-md">
                <!-- {{ prpertyOptions }} -->
                <q-select
                  v-model="create_unit_scima.realEstateId"
                  :options="prpertyOptions"
                  emit-value
                  map-options
                  clearable
                  option-value="id"
                  option-label="name"
                  :label="$t('app.administration.settings.propert_name')"
                  :rules="[(val) => val || 'Property Is Required']"
                ></q-select>
              </div>
            </div>
            <!-- unit no -->
            <div class="col-6 q-px-sm q-my-md">
              <q-input
                v-model="create_unit_scima.no"
                type="number"
                :label="$t('app.administration.settings.property_unit.no')"
                :rules="[(val) => val > 0 || 'no is Required']"
              />
            </div>

            <!-- ///////// -->
            <!-- Unit Type -->
            <!-- ///////// -->
            <div class="col-6 q-px-sm q-my-md">
              <q-select
                v-model="create_unit_scima.unitsTypeId"
                :options="unit_type_option"
                emit-value
                clearable
                map-options
                option-value="id"
                :label="
                  $t('app.administration.settings.property_unit.unit_type')
                "
                :rules="[(val) => val || 'Unit type Is Required']"
              ></q-select>
              <!-- :rules="[(val) => val || 'Unit Type Is Required']" -->
            </div>
          </div>
          <!-- ////// -->
          <!-- unit name -->
          <!-- ////// -->
          <div class="row">
            <div class="col-12 q-px-sm q-my-md">
              <!-- <obs-text-field
                      name="fileAsBase64"
                      v-model="create_unit_scima.name"
                      label="Unit Name"
                    /> -->
              <q-input
                type="text"
                v-model="create_unit_scima.name"
                :label="
                  $t('app.administration.settings.property_unit.unit_name')
                "
                :rules="[(val) => val !== '' || 'Unit Name Is Required']"
              />
            </div>
          </div>
          <!-- ////// -->
          <!-- sapced -->
          <!-- ////// -->
          <div class="row">
            <div class="col-6 q-px-sm q-my-md">
              <q-input
                type="number"
                v-model="create_unit_scima.sizeMater"
                :label="
                  $t('app.administration.charts.chartsProperty.size_mater')
                "
                @update:model-value="updateSizeMeter"
              />
            </div>
            <!-- ///////// -->
            <!-- size foot -->
            <!-- ///////// -->
            <div class="col-6 q-px-sm q-my-md">
              <q-input
                type="number"
                v-model="create_unit_scima.sizeFoot"
                :label="
                  $t('app.administration.charts.chartsProperty.size_foot')
                "
                @update:model-value="updateSizeFoot"
              />
            </div>
            <div class="col-6 q-px-sm q-my-md">
              <q-select
                v-model="create_unit_scima.unitCategoryId"
                :options="unit_category_option"
                emit-value
                map-options
                clearable
                option-value="id"
                :label="
                  $t('app.administration.settings.property_unit.unit_category')
                "
              ></q-select>
              <!-- :rules="[(val) => val || 'Unit Category id Is Required']" -->
            </div>
            <div class="col-6 q-px-sm q-my-md">
              <q-select
                v-model="create_unit_scima.blockId"
                :options="blocks_option"
                emit-value
                map-options
                clearable
                option-value="id"
                :label="$t('app.administration.charts.chartsProperty.block')"
              ></q-select>
              <!-- :rules="[(val) => val || 'Block Is Required']" -->
            </div>
            <div class="col-6 q-px-sm q-my-md">
              <q-select
                v-model="create_unit_scima.floorId"
                :options="floors_option"
                emit-value
                map-options
                clearable
                option-value="id"
                :label="$t('app.administration.charts.chartsProperty.floor')"
              ></q-select>
              <!-- :rules="[(val) => val || 'Floor Is Required']" -->
            </div>
            <div class="col-6 q-px-sm q-my-md">
              <!-- < filled v-model="text" label="Filled" /> -->

              <q-input
                v-model="create_unit_scima.badrooms"
                :label="
                  $t('app.administration.settings.property_unit.badrooms')
                "
                type="number"
              />
              <!-- :rules="[
                        (val) =>
                          val < 30 ||
                          `${$t(
                            'app.administration.settings.property_unit.err_msg.badrooms'
                          )}`,
                      ]" -->
            </div>
            <div class="col-6 q-px-sm q-my-md">
              <q-input
                v-model="create_unit_scima.bathrooms"
                :label="
                  $t('app.administration.settings.property_unit.bathrooms')
                "
                type="number"
              />
              <!-- :rules="[
                        (val) =>
                          val < 12 ||
                          `${$t(
                            'app.administration.settings.property_unit.err_msg.bathrooms'
                          )}`,
                      ]" -->
            </div>
            <div class="col-6 q-px-sm q-my-md">
              <q-select
                v-model="create_unit_scima.amenityId"
                :options="amenity_option"
                emit-value
                clearable
                map-options
                option-value="id"
                :label="$t('app.administration.charts.chartsProperty.amenity')"
              ></q-select>
              <!-- :rules="[(val) => val || 'Amenity Is Required']" -->
            </div>
            <div class="col-6 q-px-sm q-my-md">
              <q-select
                v-model="create_unit_scima.status"
                :options="statusOptions"
                emit-value
                map-options
                option-value="id"
                :label="$t('app.administration.charts.chartsProperty.status')"
              ></q-select>
              <!-- :rules="[(val) => val || 'Unit Status Is Required']" -->
            </div>
          </div>
        </div>
        <!-- col for image upload -->
        <div class="col-3 q-mt-sm row justify-center items-center">
          <obs-avatar-field
            class="col"
            name="image"
            v-model="create_unit_scima.urlImage"
            :preview="create_unit_scima.urlImage"
          />
        </div>
      </q-card-section>
      <!-- //// -->
      <!-- taps -->
      <!-- //// -->
      <q-card-section>
        <q-tabs
          align="justify"
          v-model="ItemTab"
          dense
          class="bg-grey-2 text-black"
        >
          <q-tab
            name="owners"
            :label="
              $t('app.administration.settings.property_unit.taps.owner.title')
            "
          />
          <q-tab
            name="menagers"
            :label="
              $t(
                'app.administration.settings.property_unit.taps.menagers.title'
              )
            "
          />
          <!-- <q-tab
                  name="attachment"
                  :label="
                    $t(
                      'app.administration.settings.property_unit.taps.attach.title'
                    )
                  "
                /> -->
        </q-tabs>
        <q-tab-panels v-model="ItemTab" animated>
          <q-tab-panel name="owners">
            <!-- first row -->
            <transition-group
              v-if="create_unit_scima.owners !== null"
              name="slide-fade"
            >
              <div
                class="row"
                v-for="(owner, i) in create_unit_scima.owners"
                :key="i"
              >
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
                      $t(
                        'app.administration.settings.property_unit.taps.owner.col'
                      )
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
                      $t(
                        'app.administration.charts.chartsProperty.owner_ship_rate'
                      )
                    "
                    @keyup="handelMaxRate($event.target)"
                    :error="isAvilableRat"
                    :error-message="
                      avilableShipRat +
                      $t(
                        'app.administration.charts.chartsProperty.max_ship_rate_err'
                      )
                    "
                  >
                    <template v-slot:append>
                      <q-avatar size="lg"> % </q-avatar>
                    </template>
                  </q-input>
                  <!-- :rules="[
                        (val, role) =>
                          isAvilableRat ||
                          `${val} % is the remaining percentage only`,
                      ]" -->
                  <!-- isAvilableRat -->
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
                  :label="
                    $t(
                      'app.administration.settings.property_unit.taps.owner.add'
                    )
                  "
                  outline
                  :disable="isAvilableRat || avilableShipRat == 0"
                  color="primary"
                  @click="addOwner"
                />
                <div class="col-6"></div>
              </div>
            </transition-group>
          </q-tab-panel>
          <q-tab-panel name="menagers">
            <div
              v-if="create_unit_scima.contact !== null"
              class="row items-center"
            >
              <div class="col-6 q-my-sm q-pr-md">
                <q-input
                  v-model="create_unit_scima.contact['name']"
                  :label="$t('global.name')"
                  type="txet"
                />
              </div>
              <div class="col-6 q-my-sm q-pr-md">
                <q-input
                  v-model="create_unit_scima.contact['jopPostition']"
                  :label="
                    $t(
                      'app.administration.settings.property_unit.taps.menagers.jop_posetion'
                    )
                  "
                  type="txet"
                />
              </div>
              <div class="col-6 q-my-sm q-pr-md">
                <q-select
                  v-model="create_unit_scima.contact['idType']"
                  :options="idTypesOptions"
                  emit-value
                  map-options
                  clearable
                  option-value="id"
                  :label="
                    $t(
                      'app.administration.settings.property_unit.taps.menagers.id_type'
                    )
                  "
                ></q-select>
                <!-- :rules="[(val) => val || 'Id Type Is Required']" -->
              </div>
              <!-- <div class="col-6 q-my-sm q-pr-md">
                    <q-select
                      v-model="create_unit_scima.contact['contactType']"
                      :options="contentTypeOptions"
                      emit-value
                      map-options
                      option-value="id"
                      label="Contact Type"
                    ></q-select>
                  </div> -->
              <!-- <div class="col-6 q-my-sm q-pr-md">
                      <q-select
                        v-model="create_unit_scima.contact['companyId']"
                        :options="combany_options"
                        emit-value
                        map-options
                        clearable
                        option-value="id"
                        :label="
                          $t(
                            'app.administration.settings.property_unit.taps.menagers.conpany'
                          )
                        "
                      ></q-select>
                    </div> -->
              <div class="col-6 q-my-sm q-pr-md">
                <q-input
                  v-model="create_unit_scima.contact['idNo']"
                  type="number"
                  :label="
                    $t(
                      'app.administration.settings.property_unit.taps.menagers.id_no'
                    )
                  "
                ></q-input>
              </div>
              <div class="col-6 q-my-sm q-pr-md">
                <obs-text-field
                  name="email"
                  v-model="create_unit_scima.contact['email']"
                  rules="email"
                  :label="$t('global.email')"
                />
              </div>
              <div class="col-6 q-my-sm q-pr-md">
                <!-- <q-input
                        type="number"
                        :readonly="is_review_from_card"
                        v-model="create_unit_scima.contact['phoneNumber']"
                        :label="$t('global.phone')"
                      /> -->
                <obs-phone-field
                  name="phoneObj"
                  :readonly="is_review_from_card"
                  v-model="create_unit_scima.contact['phoneObj']"
                  :label="$t('global.phone')"
                />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card-section>
      <q-card-actions class="row">
        <!-- v-if="!isDialogEite" -->
        <q-btn
          unelevated
          style="border-radius: 10px"
          no-caps
          type="submit"
          size="lg"
          padding="10px 30px"
          :label="isDialogEite ? $t('global.edit') : $t('global.save')"
          outline
          :color="isDialogEite ? 'green' : 'primary'"
        />
        <q-btn
          class="q-mx-sm"
          flat
          size="lg"
          :label="$t('global.close')"
          @click="create_dialog = false"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
export default {};
</script>

<style>
</style>
