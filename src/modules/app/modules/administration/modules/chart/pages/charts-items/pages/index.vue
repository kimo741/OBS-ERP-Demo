<template>
  <q-page padding>
    <!-- //////// -->
    <!-- top side -->
    <!-- //////// -->
    <q-card class="my-card">
      <div class="bg-white shadow-1 q-pa-lg q-mb-md">
        <div class="row q-mt-lg items-center user-select">
          <div class="col-md-4 col-12 text-bold">
            <h3>Chart Of Items</h3>
          </div>
          <!-- <div class="col-md-2"></div> -->
          <div class="col-md-8 col-12 q-pa-md select-component">
            <!-- //////////// -->
            <!-- input search -->
            <!-- //////////// -->
            <q-input
              outlined
              debounce="500"
              v-model="search"
              class="user-search"
              placeholder="Search"
            >
              <!-- <template v-slot:append>
                <q-btn
                  icon="eva-search-outline"
                  class="cursor-pointer"
                  flat
                  :label="$t('global.search')"
                  @click="glopalSearch"
                  />
              </template> -->
            </q-input>
            <!-- //////////// -->
            <!-- //////////// -->
            <!-- //////////// -->
          </div>
        </div>
        <!-- ///////////////////////// -->
        <!-- sellect to filter fillter -->
        <!-- ///////////////////////// -->
        <div
          class="row q-mt-lg items-center justify-end user-select select-component"
        >
          <div class="col-md-4 col-6 q-px-md">
            <q-select
              outlined
              multiple
              :options="filters"
              debounce="500"
              label="Filters"
              style="margin: 0 1rem 0 0"
            />
          </div>
          <div class="col-md-4 col-6 q-px-md">
            <!-- //////////////// -->
            <!-- sellect group by -->
            <!-- //////////////// -->
            <q-select
              outlined
              multiple
              :options="content"
              debounce="500"
              label="group by"
              style="margin: 0 1rem 0 0"
            />
          </div>
          <!-- //////////////// -->
          <!-- sellect companies -->
          <!-- //////////////// -->
          <!-- <div class="col-md-4">
            <q-select outlined multiple :options="companies" label="Company" />
          </div> -->
        </div>
      </div>
    </q-card>
    <!-- ////////////////////////////////// -->
    <!-- action taple (add , edit , delete) -->
    <!-- ////////////////////////////////// -->
    <q-card class="my-card">
      <div class="q-pa-lg">
        <div class="row">
          <div class="col-6 q-mb-md">
            <!-- //////////// -->
            <!-- edite action -->
            <!-- //////////// -->
            <q-btn
              outline
              class="btn-component-duplicate q-mr-md"
              padding="10px 25px"
            >
              <img src="/images/duplicate.svg" class="q-mr-sm" />
              Edit
            </q-btn>
            <!-- ////////////// -->
            <!-- duplica action -->
            <!-- ////////////// -->

            <q-btn
              @click="duplicateItem"
              outline
              class="btn-component-duplicate"
              padding="10px 25px"
            >
              <img src="/images/duplicate.svg" class="q-mr-sm" />
              Duplicate
            </q-btn>
          </div>
          <!-- <div class="col-4 q-mb-md q-px-lg"></div> -->
          <div class="col-6 q-mb-md row justify-end" style="flex-wrap: nowrap">
            <!-- ////////////// -->
            <!-- creat action -->
            <!-- ////////////// -->
            <q-btn
              :label="$t('global.create')"
              class="q-ml-md btn-2 btn-component"
              :padding="q.screen.lt.md ? ' 8px 50px' : '10px 60px'"
              size="md"
              unelevated
              :to="to"
              @click="createItemDialog = true"
              no-caps
            />
            <q-btn
              text-color="grey-6"
              color="grey-7"
              size="1.3em"
              round
              flat
              class="float-right col-2"
              icon="more_vert"
            >
              <!-- //////////////// -->
              <!-- menu more option -->
              <!-- //////////////// -->
              <q-menu
                fit
                auto-close
                transition-show="scale"
                transition-hide="scale"
              >
                <q-list style="min-width: 200px">
                  <q-item clickable>
                    <q-item-section>{{ $t("global.edit") }}</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>{{ $t("global.export") }}</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>{{ $t("global.Import") }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-10 col-9">
            <!-- taple -->
            <chart-tree
              :layout="layout"
              :data="groupListing"
              :filter="search"
              @duplicate-row="handleDuplicateItem"
            />
          </div>
          <!-- ///////////// -->
          <!-- sellect group -->
          <!-- ///////////// -->
          <div class="col-3 col-sm-2 select-group">
            <div
              class="row q-col-gutter-sm q-mb-md justify-between text-center"
            >
              <!-- //////////////////////////////////////////// -->
              <!-- sellected design for taple (tree or listed) -->
              <!-- //////////////////////////////////////////// -->
              <div
                class="col-6 custom-style-tabs"
                v-for="({ icon, id }, i) in layouts"
                :key="i"
              >
                <!-- class="q-pa-sm" -->
                <q-btn
                  :class="q.screen.lt.md ? 'q-pa-xs' : 'q-pa-sm'"
                  :size="q.screen.lt.md ? 'sm' : 'md'"
                  :outline="id == layout"
                  @click="layout = id"
                >
                  <img :src="icon" />
                </q-btn>
              </div>
            </div>
            <!-- ///////////////////// -->
            <!-- sellected group group -->
            <!-- ///////////////////// -->
            <q-btn
              flat
              @click="getAllItemGroupData()"
              style="width: 100%"
              class="q-mb-md q-pa-md list-buttons btn-trans text-bold border-add-main"
              :class="selectedGroup == null ? 'selected-group' : ''"
              color="white"
              text-color="black"
              >{{
                $t("app.administration.charts.chartsProperty.all_property")
              }}</q-btn
            >
            <q-btn
              v-for="data in groups"
              :key="data.index"
              flat
              @click="getItemGroupData(data.no)"
              style="width: 100%; font-size: 16px"
              class="q-mb-md q-pa-md list-buttons btn-trans row justify-between"
              :class="data.no == selectedGroup ? 'selected-group' : ''"
              color="white"
              text-color="black"
              >{{ data.no + " - " + data.translations[0].name }}</q-btn
            >
            <!-- //////////////// -->
            <!-- create group btn -->
            <!-- //////////////// -->
            <q-btn
              flat
              style="width: 100%"
              class="q-mb-md q-pa-lg list-buttons border-add-main"
              color="white"
              text-color="black"
              :label="$t('app.administration.charts.chartsItems.group.add')"
              @click="persistent = true"
            />
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
  <!-- /////////////////// -->
  <!-- dialog create group -->
  <!-- /////////////////// -->
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="set-dialog-bg" style="width: 800px">
      <q-card-section class="q-pa-lg">
        <div class="text-h3 text-white">
          {{ $t("app.administration.charts.chartsItems.group.create.title") }}
        </div>
      </q-card-section>

      <q-card-section class="text-h6 q-pt-none text-white q-pa-lg">
        {{
          $t("app.administration.charts.chartsItems.group.create.dicruption")
        }}
      </q-card-section>

      <q-card-section class="bg-white q-pa-lg">
        <obs-text-field
          v-model="groupNo"
          type="number"
          :label="
            $t(
              'app.administration.charts.chartsItems.group.create.group_number'
            )
          "
        />
        <obs-text-field
          v-model="groupName"
          :label="
            $t('app.administration.charts.chartsItems.group.create.group_name')
          "
        />
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal q-pa-md">
        <q-btn
          class="q-ml-md btn-component"
          padding="10px 20px"
          style="color: black"
          unelevated
          :to="to"
          no-caps
          :label="$t('global.cancel')"
          outline
          v-close-popup
          @click="persistent = false"
        />
        <q-btn
          class="q-ml-md btn-2 btn-component"
          padding="10px 20px"
          unelevated
          :to="to"
          no-caps
          :label="$t('global.Create')"
          v-close-popup
          @click="createGroup"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- /////////////////// -->
  <!-- item Create Dialog  -->
  <!-- /////////////////// -->
  <q-dialog
    v-model="createItemDialog"
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card
      class="set-dialog-bg create-item"
      style="width: 1500px; max-width: 110vw; max-height: 130vh"
    >
      <q-card-section class="q-px-xl q-py-lg">
        <div class="text-h5 text-white">
          {{ $t("app.administration.charts.chartsItems.create_item") }}
        </div>
      </q-card-section>

      <q-card-section class="bg-white q-pa-xl">
        <div class="row">
          <div class="col-md-8">
            <div class="row">
              <div class="col-6 q-pr-sm q-mb-sm">
                <q-select
                  v-model="model"
                  :options="options"
                  :label="
                    $t('app.administration.charts.chartsItems.main_group')
                  "
                  emit-value
                  map-options
                />
              </div>
              <div class="col-6 q-pl-sm q-mb-sm">
                <q-select
                  v-model="model"
                  :options="options"
                  :label="
                    $t('app.administration.charts.chartsItems.item_group')
                  "
                  emit-value
                  map-options
                />
              </div>
              <div class="col-4 q-pr-sm q-mt-lg">
                <obs-text-field name="email" label="Item No" />
              </div>
              <div class="col-4 q-px-sm q-mt-lg">
                <obs-text-field name="email" label="Barcode" />
              </div>
              <div class="col-4 q-pl-sm q-mt-lg">
                <q-select
                  v-model="model"
                  :options="options"
                  :label="$t('app.administration.charts.chartsItems.item_type')"
                  emit-value
                  map-options
                />
              </div>
              <div class="col-4 q-pr-sm q-mt-lg">
                <obs-text-field
                  name="email"
                  :label="$t('app.administration.charts.chartsItems.item_name')"
                />
              </div>
              <div class="col-4 q-px-sm q-mt-lg">
                <q-select
                  v-model="model"
                  :options="options"
                  label="UOM"
                  emit-value
                  map-options
                />
              </div>
              <div class="col-4 q-pl-sm q-mt-lg">
                <q-select
                  v-model="model"
                  :options="options"
                  :label="$t('app.administration.charts.chartsItems.catogory')"
                  emit-value
                  map-options
                />
              </div>

              <div class="col-8 q-pr-sm q-mt-lg">
                <q-select
                  v-model="modelMultiple"
                  multiple
                  :options="options"
                  use-chips
                  :label="
                    $t(
                      'app.administration.charts.chartsItems.allowed_selections'
                    )
                  "
                ></q-select>
              </div>

              <div class="col-4 q-pl-sm q-mt-lg">
                <q-select
                  v-model="model"
                  :options="options"
                  :label="$t('app.administration.charts.chartsItems.tags')"
                  emit-value
                  map-options
                />
              </div>
            </div>
          </div>
          <div class="col-sm-4 q-mt-sm">
            <q-badge
              class="absolute tag-style"
              outline
              color="secondary"
              label="Active"
            />
            <obs-avatar-field name="fileAsBase64" />
            <div class="text-center q-mt-lg">
              <q-checkbox
                v-model="teal"
                :label="$t('app.administration.charts.chartsItems.sales_item')"
                class="q-mr-md"
                color="blue"
              />
              <q-checkbox v-model="orange" label="Purchase Item" color="blue" />
            </div>
          </div>
        </div>
        <div class="row q-mt-xl">
          <div class="col-md-12">
            <q-tabs
              align="justify"
              v-model="ItemTab"
              dense
              class="bg-grey-2 text-black"
            >
              <q-tab
                name="general"
                :label="$t('app.administration.charts.chartsItems.tap.general')"
              />
              <q-tab
                name="purchase"
                :label="
                  $t('app.administration.charts.chartsItems.tap.purchase')
                "
              />
              <q-tab
                name="sales"
                :label="$t('app.administration.charts.chartsItems.tap.sales')"
              />
              <q-tab
                name="inventory"
                :label="
                  $t('app.administration.charts.chartsItems.tap.inventory')
                "
              />
              <q-tab
                name="accounting"
                :label="
                  $t('app.administration.charts.chartsItems.tap.accounting')
                "
              />
              <q-tab
                name="attachments"
                :label="
                  $t('app.administration.charts.chartsItems.tap.attachments')
                "
              />
            </q-tabs>

            <q-tab-panels v-model="ItemTab" animated>
              <q-tab-panel name="general">
                <div class="row">
                  <div class="col-6 q-pr-sm q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.allowed_selections'
                        )
                      "
                    ></q-select>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="purchase">
                <div class="row">
                  <div class="col-6 q-pr-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.purchase_unit'
                        )
                      "
                    ></q-select>
                  </div>
                  <div class="col-6 q-pl-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t('app.administration.charts.chartsItems.packing_unit')
                      "
                    ></q-select>
                  </div>
                  <div class="col-6 q-pr-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.purchase_taxes'
                        )
                      "
                    ></q-select>
                  </div>
                  <div class="col-6 q-pl-lg q-mt-lg">
                    <obs-text-field
                      name="email"
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.QTY_Per_Package'
                        )
                      "
                    />
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="sales">
                <div class="row">
                  <div class="col-6 q-pr-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t('app.administration.charts.chartsItems.packing_unit')
                      "
                    ></q-select>
                  </div>
                  <div class="col-6 q-pl-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.optional_items'
                        )
                      "
                    ></q-select>
                  </div>
                  <div class="col-6 q-pr-lg q-mt-lg">
                    <obs-text-field
                      name="email"
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.QTY_Per_Package'
                        )
                      "
                    />
                  </div>
                  <div class="col-6 q-pl-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.accessory_items'
                        )
                      "
                    ></q-select>
                  </div>
                  <div class="col-6 q-pr-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t('app.administration.charts.chartsItems.sales_taxes')
                      "
                    ></q-select>
                  </div>
                  <div class="col-6 q-pl-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.alternative_items'
                        )
                      "
                    ></q-select>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="inventory">
                <div class="row">
                  <div class="col-6 q-pr-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      label="Valuation method"
                    ></q-select>
                  </div>
                  <div class="col-6 q-pl-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t('app.administration.charts.chartsItems.item_control')
                      "
                    ></q-select>
                  </div>
                  <div class="col-6 q-mt-lg">
                    <q-checkbox
                      v-model="orange"
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.expiration_date'
                        )
                      "
                      color="blue"
                    />
                  </div>
                  <div class="col-12 q-mt-lg">
                    <div class="text-h5">
                      {{
                        $t(
                          "app.administration.charts.chartsItems.inventory_level"
                        )
                      }}
                    </div>
                  </div>
                  <div class="col-4 q-pr-lg q-mt-lg">
                    <obs-text-field
                      name="email"
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.QTY_Per_Package'
                        )
                      "
                    />
                  </div>
                  <div class="col-4 q-px-lg q-mt-lg">
                    <obs-text-field
                      name="email"
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.QTY_Per_Package'
                        )
                      "
                    />
                  </div>
                  <div class="col-4 q-pl-lg q-mt-lg">
                    <obs-text-field
                      name="email"
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.QTY_Per_Package'
                        )
                      "
                    />
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="accounting">
                <div class="row">
                  <div class="col-6 q-pr-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.income_account'
                        )
                      "
                    ></q-select>
                  </div>
                  <div class="col-6 q-pl-lg q-mt-lg">
                    <q-select
                      v-model="modelMultiple"
                      multiple
                      :options="options"
                      use-chips
                      :label="
                        $t(
                          'app.administration.charts.chartsItems.expense_account'
                        )
                      "
                    ></q-select>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="attachments">
                <div class="text-h6">Movies</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal q-px-xl q-py-lg">
        <q-btn
          class="q-ml-md btn-component"
          style="color: black"
          padding="10px 20px"
          unelevated
          :to="to"
          no-caps
          :label="$t('global.save')"
          v-close-popup
          outline
        />
        <q-btn
          class="q-ml-md btn-component"
          style="color: black"
          padding="10px 20px"
          unelevated
          :to="to"
          no-caps
          :label="$t('app.administration.charts.chartsItems.save_new')"
          v-close-popup
          outline
        />
        <q-btn
          class="q-ml-md btn-component"
          style="color: black"
          outline
          padding="10px 20px"
          unelevated
          :to="to"
          no-caps
          :label="$t('global.cancel')"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import chartTree from "../components/chart-tree.vue";
import { ref, shallowRef, reactive } from "@vue/reactivity";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { Loading, Notify, useQuasar } from "quasar";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);

export default {
  components: {
    chartTree,
  },
  setup() {
    // Store
    const { getGroups, getUserListing, createMainGroup, duplicateData } =
      useActions([
        "getGroups",
        "getUserListing",
        "createMainGroup",
        "duplicateData",
      ]);
    // Lifecycle
    // ref
    const groups = ref([]);
    const q = useQuasar();
    const groupListing = ref([]);
    const search = ref("");
    const selectedGroup = ref();
    const groupNo = ref();
    const groupName = ref("");
    const persistent = ref(false);
    const createItemDialog = ref(false);
    const seletedItem = ref([]);

    // Mounted
    onMounted(() => {
      getItemGroupData();
    });
    // Watchers
    // Computed
    // Methods
    const getAllItemGroupData = () => {
      // getItemGroupData();
      selectedGroup.value = null;
    };
    const getItemGroupData = async (id) => {
      if (id === undefined) {
        let data = await getGroups();
        groups.value = data.data.value;
        id = groups.value[0].no;
      }
      selectedGroup.value = id;
      try {
        Loading.show();
        const { data } = await getUserListing(id);
        groupListing.value = data.value;
      } catch (error) {
        groupListing.value = error.value;
      } finally {
        Loading.hide();
      }
    };

    const createGroup = async () => {
      const data = {
        no: groupNo.value,
        translations: [
          {
            languageId: 1,
            name: groupName.value,
          },
        ],
      };
      try {
        Loading.show();
        await createMainGroup(data);
        getItemGroupData();
        groupNo.value = "";
        groupName.value = "";
      } catch (error) {
        Loading.hide();
        persistent.value = true;
        Notify.create({
          message: "Please Try with the different data.",
          color: "red",
          position: "top-right",
        });
      }
    };

    const handleDuplicateItem = (data) => {
      seletedItem.value = data;
    };

    const duplicateItem = async () => {
      if (seletedItem.value.length == 1) {
        Loading.show();
        const data = {
          id: seletedItem.value[0],
        };

        try {
          await duplicateData(data);
        } finally {
          Loading.hide();
        }
      }
    };

    // Some logics
    // Layout with tabs code here
    const layout = ref("list");
    const layouts = [
      {
        icon: "/images/list.svg",
        id: "list",
      },
      {
        icon: "/images/grid.svg",
        id: "grid",
      },
    ];

    // state and Method calling from DOM
    return {
      //using State
      groups,
      content: ["group 1", "group 2", "group 3", "group 4", "group 5"],
      companies: [
        "company 1",
        "company 2",
        "company 3",
        "company 4",
        "company 5",
      ],
      filters: ["User Name", "User Type", "Email", "Language", "Company"],
      tab: ref("mails"),
      groupListing,
      getAllItemGroupData,
      search,
      layouts,
      layout,
      q,
      selectedGroup,
      persistent,
      createItemDialog,
      groupNo,
      groupName,

      // CreateItemDialog
      teal: ref(true),
      orange: ref(true),
      model: ref(null),
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      modelMultiple: ref([]),
      ItemTab: ref("general"),

      // Methods
      getItemGroupData,
      createGroup,
      handleDuplicateItem,
      duplicateItem,
    };
  },
};
</script>
<style>
.custom-style-tabs .q-btn:before {
  box-shadow: unset;
}

.border-chart {
  border: 2px solid #e6e8ec !important;
  border-radius: 20px;
}

.list-buttons {
  background: #ffffff;
  box-shadow: 0px 4px 39px rgba(81, 69, 159, 0.09);
  border-radius: 8px;
}
.selected-group {
  background-color: #e8e8e8;
}
.set-dialog-bg {
  background-color: #2b4c6b;
}
.btn-trans {
  text-transform: unset;
}
.border-add-main {
  border: 1px solid black;
}
.create-item .avatar-picker-cover {
  font-size: 250px !important;
}
.create-item .q-tab__label {
  font-size: 15px;
}
.tag-style {
  right: 160px !important;
}
</style>
