<template>
  <q-card
    class="create-item"
    style="max-width: 90% !important; max-height: 90% !important"
  >
    <!-- <q-card-section class="full-width flex">
      <q-btn
        @click="create_item_model.isFavorite = !create_item_model.isFavorite"
        :icon="
          create_item_model.isFavorite ? 'eva-bookmark-outline' : 'eva-bookmark'
        "
        color="warning"
        flat
        size="lg"
      />
    </q-card-section> -->
    <q-card-section class="q-px-xl q-py-lg">
      <!-- <div v-if="is_review_from_card" class="text-h5 text-white">
        {{ $t("app.administration.charts.chartsProperty.review") }}
      </div>
      <div v-else-if="propToEdit" class="text-h5 text-white">
        {{ $t("app.administration.charts.chartsProperty.edite_item") }}
      </div>
      <div v-else class="text-h5 text-white">
        {{ $t("app.administration.charts.chartsProperty.create_item") }}
      </div> -->
    </q-card-section>
    <q-form
      @submit.prevent="submitForm"
      @validation-error="getErrorValidation"
      autofocus
      greedy
    >
      <q-card-actions
        style="position: sticky; bottom: 0; background-color: white"
        class="row justify-between items-center q-px-xl"
      >
        <div class="text-left text-h5">Property Details</div>
        <div class="col-6 test-right flex justify-end">
          <q-btn
            class="q-mx-sm"
            flat
            dense
            padding="10px 30px"
            label="Discard"
            v-close-popup
            @click="allLanguage_dialog = false"
          />
          <q-btn
            dense
            color="blue-5"
            padding="10px 30px"
            :label="propToEdit ? 'Update' : $t('global.save')"
            type="submit"
          />
        </div>
      </q-card-actions>
      <q-card-section class="bg-white q-pa-xl">
        <!-- genral form -->
        <div class="row">
          <div class="col-md-6">
            <div class="row">
              <div class="col-12 q-px-sm">
                <DialogAllLanguage
                  v-model:modelInput="create_item_model.translations[0].name"
                  v-model:modelLanguages="create_item_model.translations"
                  title="Name in all languages"
                  :propToEdit="false"
                  :is_review="is_review_from_card"
                />
              </div>
              <div class="col-12 q-px-sm">
                <q-input
                  :readonly="is_review_from_card"
                  type="text"
                  v-model="create_item_model.description"
                  label="Description"
                />
              </div>
              <!-- ////////// -->
              <!-- size meter -->
              <!-- ////////// -->
              <div class="row col-12">
                <div class="col-6 q-px-sm">
                  <q-select
                    class="q-my-sm"
                    clearable
                    :options="property_types"
                    emit-value
                    map-options
                    label="Property type"
                    option-value="id"
                    v-model="create_item_model.typeId"
                  />
                  <!-- :rules="[(val) => val || 'Type Id Is Required']" -->
                </div>

                <div class="col-3 q-ml-md">
                  <q-input
                    class="q-my-sm"
                    type="number"
                    v-model="create_item_model.depulicateNumber"
                    :label="$t('Recurring')"
                    :rules="[
                      (val) =>
                        (val < 100 && val !== '') ||
                        'max recur is 100 , Must type recurring number or leace it (0) ',
                    ]"
                  />
                </div>
              </div>

              <!-- /////////// -->
              <!-- check boxes -->
              <!-- /////////// -->
            </div>
          </div>
          <!-- //////////////////////////// -->
          <div class="col-sm-6 q-mt-sm row justify-center">
            <!-- <obs-avatar-field
              class="col-12"
              name="fileAsBase64"
              :disable="is_review_from_card"
              :square="true"
            /> -->
            <image-base-64
              class="col-12"
              :disable="is_review_from_card"
              :square="true"
              v-model:imageBase64="create_item_model.image"
              v-model:imageUrl="create_item_model.imageUrl"
            />
            <!-- padding="10px 0" -->
            <div class="col-4 row justify-center">
              <!-- class="full-width" -->
              <q-btn
                color="grey-5"
                :label="
                  $t('app.administration.charts.chartsProperty.is_active')
                "
                :disabled="is_review_from_card"
                style="border-radius: 8px; width: 245px"
                :outline="create_item_model.isActive"
                @click="
                  create_item_model.isActive = !create_item_model.isActive
                "
              />
            </div>
          </div>
        </div>
        <div class="row q-my-lg">
          <div class="col-md-12">
            <!-- //// -->
            <!-- taps -->
            <!-- //// -->
            <q-tabs
              align="justify"
              v-model="ItemTab"
              dense
              class="bg-grey-2 text-black"
            >
              <q-tab name="basic" :label="$t('Basic info')" />
              <!-- v-if="propToEdit" -->
              <q-tab
                name="units"
                :label="
                  $t('app.administration.charts.chartsProperty.tap.units')
                "
              />
              <q-tab
                name="owners"
                :label="
                  $t('app.administration.charts.chartsProperty.tap.owners')
                "
              />
              <q-tab
                name="contact"
                :label="
                  $t('app.administration.charts.chartsProperty.tap.contact')
                "
              />
              <q-tab name="blocks" :label="$t('Blocks & Floors')" />
              <q-tab name="location" :label="$t('location')" />

              <q-tab
                name="attachments"
                :label="
                  $t('app.administration.charts.chartsProperty.tap.attachments')
                "
              />
            </q-tabs>
            <!-- ////////////////////// -->
            <!-- taps content container -->
            <!-- ////////////////////// -->
            <q-tab-panels keep-alive v-model="ItemTab" animated>
              <!-- /////////////////// -->
              <!-- adress taps content -->
              <!-- /////////////////// -->
              <q-tab-panel name="basic">
                <div class="row full-width">
                  <div class="col-6 row justify-between">
                    <div class="col-5">
                      <q-input
                        class="q-my-sm"
                        type="number"
                        v-model="create_item_model.constructionYear"
                        :label="$t('Construction Year')"
                      />
                      <!-- :rules="[(val) => val < 1000 || 'max recur is 100']" -->
                    </div>
                    <div class="col-5"></div>
                    <div class="col-5">
                      <q-input
                        class="q-my-sm"
                        type="number"
                        v-model="create_item_model.landAreaM2"
                        :label="$t('Land Area m2')"
                      />
                    </div>
                    <div class="col-5">
                      <q-input
                        class="q-my-sm"
                        type="number"
                        v-model="create_item_model.buildingAreaM2"
                        :label="$t('Building Area m2')"
                      />
                    </div>
                    <div class="col-5">
                      <q-input
                        class="q-my-sm"
                        type="number"
                        v-model="create_item_model.gardenM2"
                        :label="$t('Garden m2')"
                      />
                    </div>
                    <div class="col-5">
                      <q-input
                        class="q-my-sm"
                        type="number"
                        v-model="create_item_model.surface"
                        :label="$t('Surface')"
                      />
                    </div>
                    <div class="col-5">
                      <q-input
                        class="q-my-sm"
                        type="number"
                        v-model="create_item_model.garage"
                        :label="$t('Garage')"
                      />
                    </div>
                    <div class="col-5">
                      <q-input
                        class="q-my-sm"
                        type="number"
                        v-model="create_item_model.elevators"
                        :label="$t('Elevators')"
                      />
                    </div>
                    <div class="col-12">
                      <q-select
                        multiple
                        clearable
                        :readonly="is_review_from_card"
                        v-model="create_item_model.tags"
                        :options="tag_list"
                        class="q-my-sm"
                        option-value="id"
                        emit-value
                        map-options
                        use-chips
                        :label="
                          $t('app.administration.charts.chartsProperty.tags')
                        "
                      />
                    </div>
                  </div>
                  <div class="col-6"></div>
                </div>
              </q-tab-panel>
              <q-tab-panel name="units">
                <unitTab
                  :propToEdit="propToEdit"
                  :is_review_from_card="is_review_from_card"
                />
              </q-tab-panel>
              <!-- //////////////////// -->
              <!-- contact taps content -->
              <!-- //////////////////// -->
              <q-tab-panel name="contact">
                <div class="row justify-start">
                  <div
                    class="col-6 row justify-between"
                    v-if="create_item_model.contact"
                  >
                    <!-- /////////// -->
                    <!-- name -->
                    <!-- /////////// -->
                    <div class="col-12 q-mx-sm">
                      <q-input
                        type="text"
                        :readonly="is_review_from_card"
                        v-model="create_item_model.contact['name']"
                        :label="$t('global.name')"
                      />
                    </div>
                    <!-- id type -->
                    <div class="col-5 q-mx-sm">
                      <q-select
                        v-model="create_item_model.contact['idType']"
                        :options="idTypesOptions"
                        option-value="id"
                        emit-value
                        map-options
                        clearable
                        :readonly="is_review_from_card"
                        :label="
                          $t('app.administration.charts.chartsProperty.id_type')
                        "
                      ></q-select>
                    </div>
                    <!-- id no -->
                    <div class="col-5 q-mx-sm">
                      <q-input
                        type="number"
                        v-model="create_item_model.contact['idNo']"
                        :label="
                          $t('app.administration.charts.chartsProperty.id_no')
                        "
                        :readonly="is_review_from_card"
                      />
                    </div>
                    <!-- jop posetion -->
                    <div class="col-5 q-mx-sm">
                      <q-input
                        type="text"
                        :readonly="is_review_from_card"
                        v-model="create_item_model.contact['jopPostition']"
                        :label="$t('Job posistion')"
                      />
                    </div>
                    <!-- title -->
                    <div class="col-5 q-mx-sm">
                      <!-- v-model="create_item_model.contact['contactType']" -->
                      <q-select
                        v-model="create_item_model.contact['contactType']"
                        :options="contentTypeOptions"
                        :readonly="is_review_from_card"
                        option-value="id"
                        map-options
                        clearable
                        emit-value
                        label="Title"
                      ></q-select>
                    </div>
                    <!-- department -->
                    <div class="col-5 q-mx-sm">
                      <q-input
                        type="text"
                        :readonly="is_review_from_card"
                        v-model="create_item_model.contact['department']"
                        :label="
                          $t(
                            'app.administration.charts.chartsProperty.department'
                          )
                        "
                      />
                    </div>
                    <!-- companyName -->
                    <div class="col-5 q-mx-sm">
                      <q-input
                        type="text"
                        :readonly="is_review_from_card"
                        v-model="create_item_model.contact['companyName']"
                        :label="
                          $t(
                            'app.administration.charts.chartsProperty.company_name'
                          )
                        "
                      />
                    </div>
                    <!-- email -->
                    <div class="col-5 q-mx-sm">
                      <obs-text-field
                        name="email"
                        v-model="create_item_model.contact['email']"
                        rules="email"
                        :readonly="is_review_from_card"
                        :label="
                          $t('app.administration.charts.chartsProperty.email')
                        "
                      />
                    </div>
                    <!-- phone -->
                    <div class="col-5 q-mx-sm">
                      <!-- name="phoneObj" -->
                      <obs-phone-field
                        :readonly="is_review_from_card"
                        v-model="create_item_model.contact.phoneObj"
                        :label="$t('global.phone')"
                      />
                    </div>
                    <!-- title for adre -->
                    <div
                      class="col-12 q-mb-md q-my-lg"
                      style="
                        font-style: normal;
                        font-weight: 500;
                        font-size: 16px;
                      "
                    >
                      Address
                    </div>
                    <!-- buildingNo -->
                    <div class="col-2">
                      <q-input
                        type="number"
                        v-model="create_item_model.address['buildingNo']"
                        label="B.No"
                        :readonly="is_review_from_card"
                      />
                    </div>
                    <!-- addressLine -->
                    <div class="col-9">
                      <q-input
                        v-model="create_item_model.address.addressLine"
                        class="col"
                        clearable
                        label="Address Line"
                      />
                    </div>
                    <!-- cityName -->
                    <div class="col-5">
                      <q-input
                        v-model="create_item_model.address.cityName"
                        class="col-5"
                        clearable
                        label="City"
                      />
                    </div>
                    <!-- P.O Code -->
                    <div class="col-5">
                      <q-input
                        v-model="create_item_model.address.zipCode"
                        class="col-5"
                        clearable
                        label="P.O Code"
                      />
                    </div>
                    <!-- countryId -->
                    <div class="col-5">
                      <q-select
                        v-model="create_item_model.address['countryId']"
                        :options="cuntries_List"
                        emit-value
                        map-options
                        clearable
                        option-value="id"
                        @update:model-value="checkSelectCuntrie"
                        :label="
                          $t('app.administration.charts.chartsProperty.country')
                        "
                        :readonly="is_review_from_card"
                      ></q-select>
                    </div>
                    <!-- countryId -->
                    <div class="col-5">
                      <q-select
                        v-model="create_item_model.address['regionId']"
                        :options="ragion_list"
                        :disable="!isSelectCuntry"
                        emit-value
                        clearable
                        map-options
                        option-value="id"
                        :readonly="is_review_from_card"
                        :label="
                          $t(
                            'app.administration.charts.chartsProperty.state_ragion'
                          )
                        "
                      ></q-select>
                    </div>
                  </div>
                </div>
              </q-tab-panel>
              <!-- /////////////////// -->
              <!-- owners taps content -->
              <!-- /////////////////// -->
              <q-tab-panel name="owners">
                <!-- add Owber -->
                <div class="row justify-end full-width">
                  <q-btn
                    :label="
                      $t('app.administration.charts.chartsProperty.add_owner')
                    "
                    dense
                    padding="5px 30px"
                    outline
                    :disable="
                      isAvilableRat ||
                      avilableShipRat == 0 ||
                      is_review_from_card
                    "
                    color="primary"
                    @click="addVendor"
                  />
                </div>
                <!-- table -->
                <div class="row">
                  <div style="8px" class="q-ma-md">#</div>
                  <div class="col-3 q-ma-md">Owner Name</div>
                  <div class="col-3 q-ma-md">Ownership %</div>
                </div>
                <q-separator class="full-width" color="grey-4" />
                <div v-if="create_item_model.owners !== null">
                  <transition-group name="slide-fade">
                    <div
                      class="row"
                      v-for="(owner, i) in create_item_model.owners"
                      :key="i"
                    >
                      <!-- vendorId -->
                      <div style="8px" class="q-mx-md q-my-sm">{{ i + 1 }}</div>
                      <div class="col-3 q-mx-md q-my-sm">
                        <q-select
                          v-model="owner.vendorId"
                          :options="vendors_list"
                          :readonly="is_review_from_card"
                          emit-value
                          clearable
                          dense
                          :option-disable="
                            (item) =>
                              create_item_model.owners.some(
                                (el) => item.id === el.vendorId
                              )
                          "
                          :rules="[(val) => val || 'vendorId Is Required']"
                          option-value="id"
                          map-options
                          :label="
                            $t('app.administration.charts.chartsProperty.owner')
                          "
                        ></q-select>
                        <!-- :option-disable="owner.vendorId.some(el => el.id ==  )" -->
                      </div>
                      <!-- ownerShipRate -->
                      <div class="col-3 q-mx-md q-my-sm">
                        <q-input
                          type="number"
                          v-model="owner.ownerShipRate"
                          :readonly="is_review_from_card"
                          dense
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
                      </div>
                      <div class="col-1">
                        <div class="col-2 q-px-sm q-mt-lg">
                          <q-btn
                            flat
                            :disable="is_review_from_card"
                            icon="eva-close-circle-outline"
                            @click="deleteOwner(i)"
                          />
                        </div>
                      </div>
                    </div>
                  </transition-group>
                </div>
              </q-tab-panel>

              <!-- //////////////////////// -->
              <!-- blocks taps content -->
              <!-- //////////////////////// -->

              <q-tab-panel name="blocks">
                <div class="row">
                  <div class="col-6 row">
                    <!-- //////////// -->
                    <!-- no of blocks -->
                    <!-- //////////// -->
                    <div class="col-12 q-px-sm q-my-md">
                      <q-input
                        type="number"
                        v-model="no_of_blocks"
                        :readonly="is_review_from_card"
                        :label="
                          $t(
                            'app.administration.charts.chartsProperty.no_of_blocks'
                          )
                        "
                      />
                    </div>
                    <keep-alive>
                      <div
                        v-if="create_item_model.blocksFloorsList"
                        class="col-12"
                      >
                        <transition-group name="slide-fade">
                          <div
                            class="row items-center justify-between"
                            v-for="(
                              block, blockIndex
                            ) in create_item_model.blocksFloorsList"
                            :key="blockIndex"
                          >
                            <!-- //// -->
                            <!-- blocks name -->
                            <!-- //// -->
                            <div
                              class="col-12 row justify-between items-center"
                            >
                              <!-- block -->
                              <div class="col-5">
                                <!-- <q-select
                                  v-model="block.blockId"
                                  clearable
                                  :options="blocks_options"
                                  :readonly="is_review_from_card"
                                  emit-value
                                  @update:model-value="blockChanges"
                                  map-options
                                  behavior
                                  autofocus
                                  option-value="id"
                                  :option-disable="
                                    (item) => (item.isSelected ? true : false)
                                  "
                                  :label="
                                    $t(
                                      'app.administration.charts.chartsProperty.blocks_name'
                                    )
                                  "
                                  lazy-rules="falseondemand"
                                  :rules="[(val) => val || 'Must Select Block']"
                                ></q-select> -->
                                <DropdownSearchCreate
                                  :modelOpstions="blocks_options"
                                  v-model="block.blockId"
                                  :autofocus="true"
                                  :readonly="is_review_from_card"
                                  @emitCreateNew="submitCreateBlock"
                                  valueOpstion="id"
                                  labelOpstion="label"
                                  :title="
                                    $t(
                                      'app.administration.charts.chartsProperty.blocks_name'
                                    )
                                  "
                                  :isRequired="true"
                                  @valueUpdated="blockChanges"
                                  :option-disable="
                                    (item) => (item.isSelected ? true : false)
                                  "
                                />
                              </div>
                              <div class="col-5">
                                <q-input
                                  class="q-pb-md"
                                  label="Number of Floors"
                                  :model-value="block.floors.length"
                                  disable
                                  behavior
                                />
                              </div>
                              <!-- block.floors.length -->
                            </div>
                            <!-- /////////// -->
                            <!-- name -->
                            <!-- /////////// -->
                            <div
                              class="col-12 row justify-between items-center"
                            >
                              <!-- <q-select
                                v-model="block.floors"
                                multiple
                                clearable
                                class="full-width"
                                use-chips
                                :options="floor_options"
                                :readonly="is_review_from_card"
                                emit-value
                                option-value="id"
                                map-options
                                :label="
                                  $t(
                                    'app.administration.charts.chartsProperty.floor_name'
                                  )
                                "
                              ></q-select> -->
                              <!-- :rules="[(val) => val || 'Floors Is Required']" -->
                              <DropdownSearchCreate
                                :modelOpstions="floor_options"
                                v-model="block.floors"
                                :autofocus="false"
                                :readonly="is_review_from_card"
                                @emitCreateNew="submitCreateFloor"
                                valueOpstion="id"
                                labelOpstion="label"
                                class="full-width"
                                :multiple="true"
                                :title="
                                  $t(
                                    'app.administration.charts.chartsProperty.floor_name'
                                  )
                                "
                                @valueUpdated="blockChanges"
                                :option-disable="
                                  (item) => (item.isSelected ? true : false)
                                "
                              />
                            </div>
                          </div>
                        </transition-group>
                      </div>
                    </keep-alive>
                  </div>
                </div>
              </q-tab-panel>
              <!-- //////// -->
              <!-- location -->
              <!-- //////// -->
              <q-tab-panel name="location">
                <div class="row">
                  <!-- ////// -->
                  <!-- adrsss -->
                  <!-- ////// -->
                  <div class="col-6 q-pa-lg">
                    <div
                      class="full-height"
                      style="
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                      "
                    >
                      <div>
                        <ObsAdress
                          v-model:cityName="create_item_model.address.city"
                          v-model:addressLine="
                            create_item_model.address.addressLine
                          "
                          v-model:zipCode="create_item_model.address.zipCode"
                          v-model:countryId="
                            create_item_model.address.countryId
                          "
                          v-model:regionId="create_item_model.address.regionId"
                          v-model:buildingNo="
                            create_item_model.address.buildingNo
                          "
                          :is_review_from_card="is_review_from_card"
                        />
                      </div>
                      <div class="q-my-lg">
                        <PropertyDirection
                          v-model:northernBorderBy="
                            create_item_model.northernBorderBy
                          "
                          v-model:southernBorderBy="
                            create_item_model.southernBorderBy
                          "
                          v-model:easternBorderBy="
                            create_item_model.easternBorderBy
                          "
                          v-model:westernBorderBy="
                            create_item_model.westernBorderBy
                          "
                        />
                        <q-input
                          class="q-my-md"
                          label="Location link"
                          v-model="create_item_model.address.locationUrl"
                        >
                          <template v-slot:prepend>
                            <q-icon name="place" />
                          </template>
                          <template v-slot:append>
                            <q-btn
                              icon="share"
                              flat
                              @click="shareLocation()"
                              class="cursor-pointer"
                            />
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </div>
                  <!-- //////// -->
                  <!-- location -->
                  <!-- //////// -->
                  <div class="col-6">
                    <!-- <location-map
                      @emitLocation="getLocationUrl"
                      @updateLatLon="updateLatLon"
                      :lat="create_item_model.address.longitude"
                      :long="create_item_model.address.latitude"
                    /> -->
                    <LocationGMap
                      @emitLocation="getLocationUrl"
                      @updateLatLon="updateLatLon"
                      :lat="create_item_model.address.longitude"
                      :long="create_item_model.address.latitude"
                    />
                  </div>
                </div>
              </q-tab-panel>
              <!-- //////////////////////// -->
              <!-- attachments taps content -->
              <!-- //////////////////////// -->
              <q-tab-panel name="attachments">
                <obs-attatchment
                  title="Attachment"
                  :attachmentData="create_item_model.attachments"
                  :isEdit="propToEdit"
                  @submitAttach="addToAttachment"
                />
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-card-section>
    </q-form>
    <q-dialog
      v-model="allLanguage_dialog"
      persistent
      transition-show="slide-down"
      transition-hide="slide-up"
    >
      <q-card class="" style="width: 500px">
        <q-card-section class="set-dialog-bg q-pa-md">
          <div class="text-h5 text-white">
            {{ $t("app.administration.charts.chartsProperty.Prop_Translat") }}
          </div>
        </q-card-section>
        <q-card-section v-if="propToEdit" class="row">
          <div
            class="col-12 row full-width justify-center items-center"
            v-for="(lang, index) in create_item_model.translations"
            :key="index"
          >
            <!-- <div class="q-pr-md">{{ lang.label }}</div> -->
            <!-- <div col-> -->

            {{ lang }}
            <q-input
              class="col-10 q-my-xs"
              type="text"
              v-model="lang.name"
              dense
              :readonly="
                is_review_from_card || checkTranslationIsTranslate(lang)
              "
              :label="getProperityName(lang)"
            />
            <!-- </div> -->
          </div>
        </q-card-section>
        <q-card-section v-else class="row">
          <div
            class="col-12 row full-width justify-center items-center"
            v-for="(lang, index) in language_options"
            :key="index"
          >
            <!-- <div class="q-pr-md">{{ lang.label }}</div> -->
            <!-- <div col-> -->
            <q-input
              class="col-10 q-my-xs"
              type="text"
              v-model="lang.name"
              dense
              :readonly="is_review_from_card || lang.translatable"
              :label="lang.label"
            />
            <!-- </div> -->
          </div>
        </q-card-section>
        <q-card-actions class="q-pa-lg row justify-end">
          <q-btn flat label="close" @click="allLanguage_dialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import {
  ref,
  reactive,
  watch,
  onBeforeMount,
  onMounted,
  computed,
  onUnmounted,
} from "vue";
import { Loading, Notify, useQuasar, LocalStorage } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import obsAttatchment from "../../../../components/obs-attachment.vue";
const { useActions: settingActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
import PropertyDirection from "../../../../components/property-direction.vue";
import { create_item_model } from "./property-form.js";
const { useActions: labguage } = createNamespacedHelpers("AppModule");
import { DEFAULT_COMPANY_LANG, COUNTRY_CODE } from "src/configs/language.js";
import DialogAllLanguage from "../../../../components/dialogAllLanguage.vue";
import {
  // var
  unit_Categoty_opstions,
  usage_form_opstions,
  unit_type_opstions,
  // fun api
  getUsageForm,
  getUnitTypes,
  getUnitCategory,
  // helper fun
  getLabelById,
} from "../../../charts-property/composables/use-unit";
import {
  drobDowns,
  // citys_list,
  translateOpstions,
  vendors_list,
  cuntries_List,
  ragion_list,
  customer_list,
  property_types,
  tag_list,
  blocks_options,
  cashed_block_options,
  floor_options,
  company_list,
  polices_list,
  no_of_blocks,
} from "../../../charts-property/composables/reaquist.js";
import locationMap from "../../components/create-taps/location-map.vue";
import unitTab from "./unit/index.vue";
import ObsAdress from "../../../../components/obs-adress.vue";
import ImageBase64 from "../../../../components/image-base64.vue";
import DropdownSearchCreate from "../../../../components/dropdownSearchCreate.vue";
import LocationGMap from "../../../../components/locationGMap.vue";
export default {
  components: {
    // locationMap,
    unitTab,
    obsAttatchment,
    DialogAllLanguage,
    ObsAdress,
    PropertyDirection,
    ImageBase64,
    DropdownSearchCreate,
    LocationGMap,
  },
  props: {
    propToEdit: {
      type: Boolean,
      required: false,
    },
    // tag_list: {
    //   type: Object,
    //   required: false,
    // },
    mainGroupOpsions: {
      type: Object,
      required: true,
    },
    is_review_from_card: {
      type: Boolean,
      required: false,
    },
  },
  setup(prop, { emit }) {
    const $q = useQuasar();
    const dialogAttachment = ref(false);
    const isSelectCuntry = ref(false);
    const attachmentForm = ref({
      id: 0,
      docName: "",
      docNum: "",
      date: "",
      fileBase64: "",
      url: "",
    });
    const avilableShipRat = ref(100);
    const ItemTab = ref("basic");
    const isAvilableRat = ref(false);

    // const allLanguage_dialog_unit = ref(false);
    const oldBlockOpstions = ref(false);
    const allLanguage_dialog = ref(false);
    const index_of_defulte_lang = ref(0);
    const block_list = ref([]);
    const isTranslate = ref(false);

    // const no_of_blocks = ref(null);
    const sizeMater = ref("");
    const sizeFoot = ref("");
    const language_options = ref([]);
    const selectedLang = ref("");
    // api
    const { getLaguages } = labguage(["getLaguages"]);
    const getLanguageOptions = async () => {
      try {
        let req = await getLaguages();
        language_options.value = req.data.value.map((el) => {
          return Object.assign(
            {},
            { languageId: el.id },
            { name: "" },
            { label: el.nativeName },
            { translatable: !el.translatable }
          );
        });
        console.log(req.data.value);
      } catch (err) {
        console.log(err);
      }
    };
    const {
      getAllUnitCategory,
      getReUsageForms,
      getAllUnitTypes,
      createBlock,
      createFloors,
    } = settingActions([
      "getAllUnitCategory",
      "getReUsageForms",
      "getAllUnitTypes",
      "createBlock",
      "createFloors",
    ]);
    const {
      getCitysList,
      getPolicesList,
      getBlockList,
      genteratNo,
      getTranslateList,
      getCountriesList,
      getRealestateTypes,
      getVendorsList,
      getRagionListById,
      propertyType,
      getCustomersList,
      getTagList,
      getCompanyList,
      getFloorList,
    } = useActions([
      "getCitysList",
      "getPolicesList",
      "getBlockList",
      "genteratNo",
      "getTranslateList",
      "getCountriesList",
      "getRealestateTypes",
      "getVendorsList",
      "getRagionListById",
      "propertyType",
      "getCustomersList",
      "getTagList",
      "getCompanyList",
      "getFloorList",
    ]);
    const {
      translate,
      floorList,
      blockList,
      cuntriesList,
      realestateTypes,
      vendorList,
      propertyTypes,
      // ragionList,
      customersList,
      companyList,
      tagList,
      // getMainGroupLookUps,
    } = drobDowns(
      getTranslateList,
      "", //polices //
      getCountriesList,
      getRealestateTypes,
      getVendorsList,
      "", //city //
      "",
      getCustomersList,
      propertyType,
      "",
      "",
      getCompanyList,
      getTagList,
      getBlockList,
      getFloorList,
      ""
      // dropdownListMainGroups
    );
    const submitCreateBlock = (value) => {
      Loading.show();
      createBlock({ name: value })
        .then((res) => {
          blockList();
          Loading.hide();
          Notify.create({
            message: "A block has been created",
            textColor: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.data.errorMessage
              ? _error.data.errorMessage
              : _error.data,
            textColor: "red",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        });
    };
    const submitCreateFloor = (value) => {
      Loading.show();
      createFloors({ name: value })
        .then((res) => {
          floorList();
          Loading.hide();
          Notify.create({
            message: "A Floor has been created",
            color: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.data.errorMessage
              ? _error.data.errorMessage
              : _error.data,
            color: "red",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        });
    };
    const getRagionList = async (id) => {
      getRagionListById(id)
        .then((res) => {
          ragion_list.value = res.data.value;
        })
        .catch((_error) => {
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const { policesList } = drobDowns(
      "",
      getPolicesList,
      "",
      "",
      "",
      // getCitysList,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      getBlockList
    );
    // computed
    const computedBlock = computed(() => {
      return prop.blocks_options;
    });
    // const characterOfProperty = computed(() => {
    //   return create_item_model.value.noStr;
    // });
    // const noOfProperty = computed(() => {
    //   return create_item_model.value.no;
    // });
    // const noAndCarcterInAll = computed(() => {
    //   if (
    //     create_item_model.value.no === "" ||
    //     create_item_model.value.noStr === ""
    //   ) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });

    // const getNameLangInEditCase = computed(() => {
    //   return prop.blocks_options;"getProperityName(language_options, lang.id)
    // });

    // watch
    watch(no_of_blocks, (val) => {
      let blockScima = {
        blockId: null,
        floors: [],
      };
      create_item_model.value.noOfBlocks = Number(val);
      create_item_model.value.blocksFloorsList = [];
      for (let i = 0; i < val; i++) {
        create_item_model.value.blocksFloorsList[i] = {
          blockId: "",
          floors: [],
        };
      }
    });
    // methodes
    const updateSizeFoot = () => {
      let objectModal = create_item_model.value;
      objectModal.sizeMater = (objectModal.sizeFoot * 3.28).toFixed(0);
    };
    const updateSizeMeter = () => {
      let objectModal = create_item_model.value;
      objectModal.sizeFoot = (objectModal.sizeMater / 3.28).toFixed(0);
    };
    //////////////////////
    // add block
    const addNewBlock = () => {
      let opj = create_item_model.value;
      let BlockScima = {
        blockId: "",
        floors: [],
      };
      opj.blocksFloorsList.push(BlockScima);
    };
    // delete Block
    const deleteBlock = (blockIndex) => {
      let opj = create_item_model.value;
      opj.blocksFloorsList.splice(blockIndex, 1);
    };
    // add floor
    const addNewFloor = (index) => {
      let opj = create_item_model.value;
      let floorScima = {
        name: "",
      };
      opj.blocksFloorsList[index].floors.push(floorScima);
    };
    // delete Floor
    const deleteFloor = (blockIndex, floorIndex) => {
      let opj = create_item_model.value;
      opj.blocksFloorsList[blockIndex].floors.splice(floorIndex, 1);
    };
    // delete owner
    const deleteOwner = (index) => {
      const obj = create_item_model.value;
      obj.owners.splice(index, 1);
    };
    // add vendor
    const addVendor = () => {
      const obj = create_item_model.value;
      const scima = {
        vendorId: "",
        ownerShipRate:
          avilableShipRat.value == 100 ? null : avilableShipRat.value,
      };
      obj.owners.push(scima);
    };
    const handelMaxRate = (e) => {
      let curentShipRat = 0;
      let opj = create_item_model.value;
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
    // toggle between cutomer and vendor
    // const chngeToCustomers = () => {
    //   let obj = create_item_model.value;
    //   // obj.contact.vendorId = "";
    // };
    const chngeToVendor = () => {
      let obj = create_item_model.value;
      // obj.contact.companyId = "";
    };
    const selectLang = (lang) => {
      create_item_model.value.translations[0].languageId = lang.id;
      selectedLang.value = lang.label;
      // console.log(lang);
    };
    const submitForm = () => {
      // if (!allNoValid.value) {
      // saveAllLanguage();
      if (prop.propToEdit) {
        emit("updatePropertyOfGroup", create_item_model.value);
      } else {
        emit("createPropertyOfGroup", create_item_model.value);
      }
    };
    const blockChanges = (val) => {
      let el = create_item_model.value.blocksFloorsList
        .map((el) => el.blockId)
        .filter((val) => val !== null && val !== "");
      // let el_length = el.lenght;
      let result = [...cashed_block_options.value];
      // console.log(cashed_block_options.value);
      for (let i = 0; i < el.length; i++) {
        // result.filter((obj) => obj.blockId !== Number(el[i]));
        let index = result.findIndex((obj) => obj.id == el[i]);
        console.log(index);
        // result.splice(index, 1);
        result[index] = { ...result[index], isSelected: true };
      }
      emit("changeSelectedBlock", result);
    };
    // const addNameInAllLanguages = () => {
    //   if (!prop.propToEdit) {
    //     // console.log(propToEdit.value + " ...." + "prop");
    //     if (!isTranslate.value) {
    //       language_options.value.forEach(
    //         (el) => (el.name = create_item_model.value.translations[0].name)
    //       );
    //       isTranslate.value = true;
    //     }
    //   }
    //   allLanguage_dialog.value = true;
    // };
    const shareLocation = () => {
      if (create_item_model.value.address.locationUrl == "") {
        Notify.create({
          message: `not found link to copy it`,
          color: "white",
          textColor: "red",
          classes: "notify-size",
          position: "bottom",
          timeout: 8000,
          icon: "error",
        });
      } else {
        navigator.clipboard.writeText(
          create_item_model.value.address.locationUrl
        );
        Notify.create({
          message: `Copyed`,
          color: "white",
          textColor: "green-8",
          classes: "notify-size",
          position: "bottom",
          timeout: 8000,
          icon: "content_copy",
        });
      }
    };
    const getErrorValidation = (val) => {
      console.log(val);
      Notify.create({
        message: `${val.label} is required`,
        color: "white",
        textColor: "red-8",
        position: "bottom",
        timeout: 8000,
        classes: "notify-size",
        icon: "copy",
      });
    };
    let getProperityName = (lang) => {
      let name = language_options.value.filter((obj) => {
        // console.log(obj);
        return obj.languageId === lang.languageId;
      })[0]?.label;
      return name;
    };
    let checkTranslationIsTranslate = (lang) => {
      let check = language_options.value.filter((obj) => {
        // console.log(obj);
        return obj.languageId === lang.languageId;
      })[0]?.translatable;
      return check;
    };
    const handleUploadAttchment = () => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.onchange = handleInputChange;
      input.click();
    };
    const handleInputChange = (event) => {
      const [file] = event.target.files;
      // emit("passAssFile", image);

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        attachmentForm.value.url = reader.readAsDataURL(file);
        reader.onload = () => {
          const { result } = reader;
          // previewData.value = result;
          // console.log(result);
          attachmentForm.value.fileBase64 = result;
        };
        // imgUrl.value = reader.readAsDataURL(image);
        reader.onerror = (error) => {};
      }
    };
    const addAttachment = () => {
      create_item_model.value.attachments.push(attachmentForm.value);
      dialogAttachment.value = false;
    };
    const getLocationUrl = (link) => {
      create_item_model.value.address.locationUrl = link;
      // console.log(obj);
    };
    const checkSelectCuntrie = (value) => {
      // contactModel.value.emailsList.splice(index, 1);

      if (value == "") {
        isSelectCuntry.value = false;
      } else {
        getRagionList(value);
        isSelectCuntry.value = true;
      }
    };
    const updateLatLon = (altlang) => {
      console.log(altlang);
      create_item_model.value.address.longitude = altlang.lng;
      create_item_model.value.address.latitude = altlang.lat;
      // console.log(obj);
    };

    // const generatNoOfProperty = async (id) => {
    //   genteratNo(id)
    //     .then((res) => {
    //       create_item_model.value.no = `${res.data.value}`;
    //       console.log(res.data.value);
    //     })
    //     .catch((_error) => {
    //       console.log(_error);
    //       Notify.create({
    //         message: _error.data.ErrorMessage
    //           ? _error.data.ErrorMessage
    //           : _error.data,
    //         ...errOptions,
    //       });
    //     });
    // };
    // const createPropertyOfGroup = () =>{
    // const rullMustFeild = (val) => {
    //   val.length > 1;
    // };
    // }
    // on mounted
    onBeforeMount(() => {
      // citysList();
      policesList();
      ItemTab.value = "blocks";
    });
    // onMounted(()=>{

    // })
    const addToAttachment = (obj) => {
      create_item_model.value.attachments.push(obj);
    };
    // ////////////////
    onMounted(() => {
      ItemTab.value = "basic";
      translate();
      floorList();
      blockList();
      cuntriesList();
      realestateTypes();
      checkSelectCuntrie();
      vendorList();
      propertyTypes();
      // ragionList();
      getUnitCategory(getAllUnitCategory);
      getUsageForm(getReUsageForms);
      getUnitTypes(getAllUnitTypes);
      customersList();
      companyList();
      // getUsageForm();
      tagList();
      // getMainGroupLookUps,

      getLanguageOptions();
      // if (prop.propToEdit) {
      //   create_item_model.value = prop.propToEdit;
      //   handelMaxRate();
      //   console.log(COUNTRY_CODE);
      // }
    });
    // unMounted
    onUnmounted(() => {
      create_item_model.value = {
        typeId: null,
        noOfBlocks: null,
        policiesId: null,
        isActive: true,
        isFavorite: true,
        depulicateNumber: 0,
        constructionYear: "",
        landAreaM2: null,
        buildingAreaM2: null,
        gardenM2: "",
        surface: "",
        garage: "",
        elevators: "",
        northernBorderBy: "",
        southernBorderBy: "",
        easternBorderBy: "",
        westernBorderBy: "",
        projectId: null,
        image: "",
        address: {
          addressLine: "",
          buildingNo: "",
          cityName: "",
          countryId: null,
          regionId: null,
          zipCode: "",
          unifiedNo: "",
          email: "",
          phoneObj: {
            longitude: 42.3528328,
            latitude: 25.6242618,
            locationUrl: "",
          },
          longitude: "",
          latitude: "",
        },
        contact: {
          name: "",
          contactType: null,
          jopPostition: "",
          companyName: "",
          department: "",
          idType: null,
          idNo: null,
          remarks: "",
          email: "",
          phoneObj: {
            phoneNumber: "",
            countryCode: "",
          },
        },
        tags: [],
        owners: [
          // {
          //   vendorId: null,
          //   ownerShipRate: null,
          // },
        ],
        translations: [
          {
            languageId: LocalStorage.getItem("defLanguage"),
            name: "",
          },
        ],
        attachments: [],
        blocksFloorsList: [
          {
            blockId: null,
            floors: [],
          },
        ],
        units: [],
      };
    });
    return {
      dialogAttachment,
      submitForm,
      unit_type_opstions,
      checkSelectCuntrie,
      addToAttachment,
      getUnitTypes,
      getLocationUrl,
      // maxShipRate,
      handelMaxRate,
      handleUploadAttchment,
      addAttachment,
      // isTranslateUnit,
      isSelectCuntry,
      updateLatLon,
      // addUnit,
      shareLocation,
      attachmentForm,
      // addNameInAllLanguagesUnit,
      // rullMustFeild,
      // saveAllLanguageUnit,
      deleteFloor,
      // saveAllLanguage,
      // unitDialog,
      // characterRull,
      blockChanges,
      // noRull,
      isTranslate,
      // addNameInAllLanguages,
      computedBlock,
      // allNoValid,
      allLanguage_dialog,
      submitCreateBlock,
      submitCreateFloor,
      getLabelById,
      oldBlockOpstions,
      // deleteUnit,
      // noAndCarcterInAll,
      selectedLang,
      // generatNoOfProperty,
      language_options,
      getRagionList,
      checkTranslationIsTranslate,
      getProperityName,
      blockList,
      // noOfProperty,
      no_of_blocks,
      selectLang,
      // characterOfProperty,
      // selected_block,
      getErrorValidation,
      avilableShipRat,
      // allLanguage_dialog_unit,
      // chngeToCustomers,
      deleteBlock,
      polices_list,
      block_list,
      unit_Categoty_opstions,
      getUnitCategory,
      // citys_list,
      getLanguageOptions,
      index_of_defulte_lang,
      chngeToVendor,
      isAvilableRat,
      updateSizeFoot,
      updateSizeMeter,
      addNewBlock,
      addNewFloor,
      deleteOwner,
      addVendor,
      sizeMater,
      usage_form_opstions,
      getUsageForm,
      // unitForm,
      sizeFoot,
      translateOpstions,
      vendors_list,
      cuntries_List,
      ragion_list,
      customer_list,
      property_types,
      tag_list,
      blocks_options,
      floor_options,
      company_list,
      ItemTab,
      create_item_model,
      content: ["p.type", "Unit Type", "group 3", "group 4", "group 5"],
      companies: [
        "company 1",
        "company 2",
        "company 3",
        "company 4",
        "company 5",
      ],
      filters: ["User Name", "User Type", "Email", "Language", "Company"],
      tab: ref("mails"),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      contentTypeOptions: ref([
        {
          label: "Main",
          id: 1,
        },
        { label: "Sub", id: 2 },
        { label: "Dashborad", id: 3 },
      ]),
      idTypesOptions: ref([
        {
          id: 1,
          label: "Driver License",
        },
        {
          id: 2,
          label: "Natinal Identity Card",
        },
        {
          id: 3,
          label: "Passport",
        },
        {
          id: 4,
          label: "Resident Card",
        },
        {
          id: 5,
          label: "Refugee Card",
        },
        {
          id: 6,
          label: "Refugee Card",
        },
        {
          id: 7,
          label: "BirthCartificate",
        },
        {
          id: 8,
          label: "Student Card",
        },
        {
          id: 9,
          label: "Loyalty Card",
        },
        {
          id: "Other",
          label: "Other",
        },
      ]),
    };
  },
};
</script>

<style scoped lang="scss">
.floor-container {
  border: 1px solid #9998;
  border-radius: 8px;
  margin: 20px 5px;
}
.unit-taple {
  &__head {
    background: white;
    font-weight: 700;
    font-size: 1rem;
    padding: 20px 0;
    border-bottom: 1px solid #9b9b9b46;
    z-index: 100;
  }
  &__body {
    font-size: 1rem;
    padding: 20px 0;
    color: #676767;
    font-weight: 500;
  }
}
</style>
