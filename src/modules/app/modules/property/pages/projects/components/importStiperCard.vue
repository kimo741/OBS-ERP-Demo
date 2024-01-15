<template>
  <q-card class="full-height" style="max-width: 80% !important">
    <div class="q-pa-md full-height q-ma-auto">
      <q-stepper
        class="full-height"
        v-model="step"
        ref="stepper"
        color="primary"
        animated
      >
        <q-step
          :name="1"
          :title="
            $t(
              'app.administration.charts.chartsProperty.import_stepr.step1_title'
            )
          "
          icon="eva-cloud-download-outline"
          :done="step > 1"
        >
          <div class="text-body1">
            {{
              $t(
                "app.administration.charts.chartsProperty.import_stepr.step1_hint"
              )
            }}
          </div>
          <div>
            <div class="col-12">
              <q-field
                @focus="downloadTemplateSteps"
                filled
                bottom-slots
                :title="
                  $t(
                    'app.administration.charts.chartsProperty.import_stepr.step1_title'
                  )
                "
                counter
              >
                <template v-slot:prepend>
                  <q-icon
                    name="eva-cloud-download-outline"
                    @click.stop.prevent
                  />
                </template>
                <!-- <template v-slot:hint> Field hint </template> -->
              </q-field>
            </div>
          </div>
        </q-step>

        <q-step
          :name="2"
          :title="
            $t(
              'app.administration.charts.chartsProperty.import_stepr.step2_title'
            )
          "
          caption="Optional"
          icon="cloud_upload"
          :done="step > 2"
          style="height: 100% !important"
        >
          <div class="text-body1">
            {{
              $t(
                "app.administration.charts.chartsProperty.import_stepr.step2_hint"
              )
            }}
          </div>
          <div>
            <q-file
              filled
              bottom-slots
              v-model="import_file"
              :label="
                $t(
                  'app.administration.charts.chartsProperty.import_stepr.upload_sheet'
                )
              "
              counter
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="import_file = null"
                  class="cursor-pointer"
                />

                <!-- {{ import_file }} -->
              </template>

              <!-- <template v-slot:hint> Field hint </template> -->
            </q-file>
          </div>
        </q-step>

        <q-step
          :name="3"
          :title="
            $t(
              'app.administration.charts.chartsProperty.import_stepr.upload_sheet'
            )
          "
          icon="app_registration"
          :done="step > 3"
          style="height: 100% !important"
        >
          <!-- ///////////// -->
          <!-- title -->
          <!-- //////////////// -->
          <div v-if="responsFromImport.length >= 1">
            <div class="text-body1">
              {{
                $t(
                  "app.administration.charts.chartsProperty.import_stepr.step3_hint"
                )
              }}
            </div>
            <div class="q-pa-md">
              <q-table
                v-if="responsFromImport.length >= 1"
                :rows="formImport"
                :columns="columns"
                row-key="name"
                inline
              >
                <template v-slot:body="props">
                  <q-tr
                    :props="props"
                    :class="props.row.errors.length > 1 ? 'err-row' : ''"
                  >
                    <!-- name -->
                    <q-td
                      :class="
                        props.row.errors.some((el) => el.propertyName == 'Name')
                          ? 'err-cel'
                          : ''
                      "
                      key="name"
                      :props="props"
                    >
                      {{ props.row.name }}
                      <q-popup-edit
                        v-model="props.row.name"
                        title="Name"
                        buttons
                        v-slot="scope"
                        persistent
                      >
                        <q-input v-model="scope.value" dense autofocus />
                      </q-popup-edit>
                    </q-td>
                    <!-- descraption -->
                    <q-td
                      :class="
                        props.row.errors.some(
                          (el) => el.propertyName == 'Descraption'
                        )
                          ? 'err-cel'
                          : ''
                      "
                      key="descraption"
                      :props="props"
                    >
                      {{ props.row.descraption }}
                      <q-popup-edit
                        title="Descraption"
                        v-model="props.row.descraption"
                        v-slot="scope"
                        buttons
                        persistent
                      >
                        <q-input
                          v-model="scope.value"
                          dense
                          autofocus
                          label="descraption"
                        />
                      </q-popup-edit>
                    </q-td>

                    <q-td
                      :class="
                        props.row.errors.some((el) => el.propertyName == 'City')
                          ? 'err-cel'
                          : ''
                      "
                      key="city"
                      :props="props"
                    >
                      {{ props.row.city }}
                      <q-popup-edit
                        v-model="props.row.city"
                        title="City"
                        buttons
                        persistent
                        v-slot="scope"
                      >
                        <q-input
                          v-model="scope.value"
                          dense
                          autofocus
                          label="City"
                        />
                      </q-popup-edit>
                    </q-td>
                    <q-td key="actions" :props="props">
                      <q-btn
                        icon="eva-trash-2-outline"
                        flat
                        color="red"
                        @click="handleDeleteSector(props.row)"
                      />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
              <div>
                <!-- <div class="text-h6 q-py-md">Erros List</div> -->
                <template v-for="record in formImport" :key="record">
                  <div
                    class="row bg-red-2 q-pa-md q-mb-sm border-radius"
                    v-if="record.errors?.length > 0"
                  >
                    <div class="col-1">
                      {{ record.index }}
                    </div>
                    <div class="col-11">
                      <div class="row">
                        <template v-for="error in record.errors" :key="error">
                          <div class="col-md-12 q-pa-sm">
                            <span class="text-bold"
                              >{{ error.propertyName }} :
                            </span>
                            <span class="text-grey-9">{{
                              error.errorMessage
                            }}</span>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <!-- ////////////// -->
            <!-- taple header -->
            <!-- ////////////// -->

            <!-- <div class="row justify-around text-center items-center">
              <div class="col-1 text-body2 text-bold q-my-md">Name</div>
              <div class="col-1 text-body2 text-bold q-my-md">No</div>
              <div class="col-1 text-body2 text-bold q-my-md">Main Group</div>
              <div class="col-1 text-body2 text-bold q-my-md">
                Creation Type Name
              </div>
              <div class="col-1 text-body2 text-bold q-my-md">Foot Size</div>
              <div class="col-1 text-body2 text-bold q-my-md">Meter Size</div>
              <div class="col-1 text-body2 text-bold q-my-md">
                Number Of Blocks
              </div>
              <div class="col-1 text-body2 text-bold q-my-md">
                parent Group No
              </div>
              <div class="col-1 text-body2 text-bold q-my-md">Policy</div>
              <div class="col-1 text-body2 text-bold q-my-md">ID Type</div>
            </div> -->
            <!-- ////////////////////// -->
            <!-- check error or correct -->
            <!-- ////////////////////// -->
          </div>
          <div v-else class="text-center text-h5">
            {{
              $t(
                "app.administration.charts.chartsProperty.import_stepr.no_data"
              )
            }}
          </div>
        </q-step>

        <q-step
          :name="4"
          :title="
            $t(
              'app.administration.charts.chartsProperty.import_stepr.step4_title'
            )
          "
          icon="manage_search"
        >
          <q-card v-if="checkErrPending">
            <q-card-section class="text-center">
              <q-circular-progress
                indeterminate
                rounded
                color="accent"
                size="50px"
                class="q-ma-xs"
              />
            </q-card-section>
          </q-card>
          <q-card v-else-if="chchErrorResult">
            <q-card-section class="text-center">
              <div class="text-h6 text-green">
                <div>
                  {{
                    $t(
                      "app.administration.charts.chartsProperty.import_stepr.correct_data"
                    )
                  }}
                </div>
                <q-icon color="green" name="eva-checkmark-circle-2-outline" />
              </div>
            </q-card-section>
          </q-card>
          <q-card v-else>
            <q-card-section class="text-center text-red text-red">
              {{
                $t(
                  "app.administration.charts.chartsProperty.import_stepr.chach_err"
                )
              }}
              <q-icon color="red" name="eva-alert-circle-outline" />
            </q-card-section>
          </q-card>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              @click="steperNext"
              color="primary"
              :label="
                step === 4
                  ? `${$t(
                      'app.administration.charts.chartsProperty.import_stepr.finish'
                    )}`
                  : `${$t(
                      'app.administration.charts.chartsProperty.import_stepr.continue'
                    )}`
              "
            />
            <q-btn
              v-if="step > 1"
              flat
              color="primary"
              @click="steperBack"
              :label="
                $t('app.administration.charts.chartsProperty.import_stepr.back')
              "
              class="q-ml-sm"
            />
            <q-btn :label="$t('global.close')" flat v-close-popup />
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-card>
</template>

<script>
import { Notify, Dialog, Loading } from "quasar";
import { ref, onBeforeMount, computed, watch } from "vue";
// import { drobDowns, polices_list } from "../composables/reaquist.js";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useI18n } from "vue-i18n";

const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);

export default {
  props: {
    responsFromImport: {
      type: Array,
      defaulte: [],
    },
    mainGroub: {
      type: Array,
      defaulte: [],
    },
    property_types: {
      type: Array,
      defaulte: [],
    },
    chchErrorResult: {
      type: Boolean,
      defaulte: false,
    },
    checkErrPending: {
      type: Boolean,
      defaulte: false,
    },
    mainGroupNumberVal: {
      type: Array,
      defaulte: [],
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n();
    const columns = [
      { name: "name", align: "left", label: "name" },
      { name: "descraption", align: "left", label: "Descraption" },
      { name: "city", align: "left", label: "City" },
      {
        label: "actions",
        name: "actions",
        align: "center",
      },
    ];
    const confirmDeleteRow = (item) => {
      Dialog.create({
        title: `Confirm Deleting company`,
        message: "Would you like to delete this company?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        handleDeleteSector(item);
      });
    };
    const handleDeleteSector = (row) => {
      // console.log(row);
      // const { id } = row;
      emit("handleDeleteSectorImport", row);
      // const index = props.responsFromImport.findIndex((el) => el == row);
      // formImport.value.splice(index, 0);
    };
    const step = ref(1);
    const import_file = ref(null);
    // /////////////////////
    const formImport = computed(() => {
      return props.responsFromImport;
    });
    watch(props.chchErrorResult, (val) => {
      if (val === true) {
        step = 3;
      }
    });
    // methods
    const steperNext = () => {
      // first step
      if (step.value < 2) {
        step.value++;
      }
      // 2 step
      else if (step.value == 2) {
        if (import_file.value !== null) {
          emit("passFileToUpload", import_file.value);
          console.log(import_file.value);
          step.value++;
        } else {
          Notify.create({
            message: `must Upload File`,
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
        }
        // 3 step
      } else if (step.value === 3) {
        // let clearErrors = [...formImport.value];
        // for (let i = 0; i < formImport.value.length; i++) {
        //   delete clearErrors[i].errors;
        // }
        // console.log(clearErrors);
        emit("passDataToChech", formImport.value);
        step.value++;

        // last step
      } else if (step.value === 4) {
        if (props.chchErrorResult) {
          emit("closeImportDialog");
        } else {
          Notify.create({
            message: "NOTE:(your Data Not Saved)",
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
          emit("closeImportDialog");
        }
      }
    };
    const steperBack = () => {
      // first step
      if (step.value > 1) {
        step.value--;
      }
    };
    const downloadTemplateSteps = () => {
      emit("downloadTemplate");
      step.value++;
    };
    let getProperityName = (options, id) => {
      let name = options.filter((obj) => {
        return obj.id === id;
      })[0]?.name;
      return name;
    };
    let getProperityLbael = (options, id) => {
      let name = options.filter((obj) => {
        return obj.id === id;
      })[0]?.label;
      return name ? name : "N/A";
    };
    const desplayError = (arr, name) => {
      arr.some((el) => el.propertyName == name);
    };
    // const { getPolicesList } = useActions(["getPolicesList"]);
    // const { policesList } = drobDowns("", getPolicesList, "", "", "", "");
    onBeforeMount(() => {
      // policesList();
    });
    return {
      step,
      // policesList,
      downloadTemplateSteps,
      import_file,
      getProperityName,
      desplayError,
      steperNext,
      handleDeleteSector,
      t,
      formImport,
      getProperityLbael,
      // polices_list,
      confirmDeleteRow,
      steperBack,
      columns,
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
.import-row {
  border: 1px solid #ccc;
}
.error_border {
  border: 1px solid rgba(255, 0, 0, 0.731);
}
.import_row {
}
.import_row-col {
  width: calc(100% / 10);
}
.err-cel {
  /* border: 1px solid red; */
  // background-color: $red-2 !important;
  border: 1px solid $red-8;
  margin: auto -10px;
  border-radius: 8px;
}
.err-row {
  // border: 1px solid $red-5;
  background-color: $red-1;
}
</style>
