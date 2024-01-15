<template>
  <div class="q-pa-md full-height">
    <q-markup-table>
      <thead>
        <tr class="">
          <th class="text-left q-py-sm handel_height_row" style="width: 20px">
            <q-checkbox
              :true-value="rows"
              :false-value="sellected_row"
              :model-value="sellected_row"
              @click="sellectAll"
            />
            <!-- v-model="selectedRow" -->
          </th>
          <th class="text-left">#</th>
          <th v-for="(col, i) in mainColumn" :key="i" class="text-left">
            {{ col }}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <!-- v-model="selectedRow" -->
          <td class="text-left handel_height_row">
            <q-checkbox
              v-model="sellected_row"
              :val="row"
              @update:model-value="chooseActive(row)"
            />
          </td>
          <!-- <td class="text-left handel_height_row">{{ i + 1 }}</td> -->
          <td class="text-left">
            {{ row.name }}
          </td>
          <td v-if="row.status == 1" class="text-left handel_height_row">
            <q-badge class="text-body1" rounded color="green" label="Vacant" />
          </td>
          <td v-else-if="row.status == 3" class="text-left handel_height_row">
            <q-badge
              class="text-body1"
              rounded
              color="warning"
              label="Under maintenance"
            />
          </td>
          <td v-else-if="row.status == 2" class="text-left handel_height_row">
            <q-badge class="text-body1" rounded color="red" label="Occupied" />
          </td>
          <td v-else class="text-left handel_height_row">
            <q-badge
              class="text-body1"
              rounded
              color="grey"
              label="Out of service"
            />
          </td>

          <td class="text-right handel_height_row">
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
                transition-show="jump-down"
                transition-hide="jump-up"
              >
                <q-list style="min-width: 200px; margin-right: 30px">
                  <q-item clickable>
                    <q-item-section @click="$emit('passRowToDelte', row)">
                      {{ $t("global.delete") }}</q-item-section
                    >
                  </q-item>
                  <q-item clickable>
                    <q-item-section @click="$emit('passRowToEdit', row)">{{
                      $t("global.edit")
                    }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td
            style="padding: 0"
            class="text-right flex justify-center items-center"
          >
            <span class="">{{ $t("global.recordes_Page") }}</span>
            <div class="q-mx-lg">
              <q-select
                style="max-width: 80px"
                dense
                filled
                v-model="modelRecordes"
                :options="options"
              />
            </div>
            <span class=""
              >{{ pagenation_page + " " }} of {{ " " + maxPages }}
            </span>
            <div class="flex q-mx-lg">
              <q-btn
                flat
                @click="$emit('privpage')"
                icon="eva-arrow-circle-left-outline"
              />
              <q-btn
                flat
                @click="$emit('nextpage')"
                icon="eva-arrow-circle-right-outline"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
import { computed, ref } from "vue";
import { sellected_row } from "../composaple/requist";

export default {
  emits: ["passSellectedRow"],
  props: {
    rows: {
      type: Array,
      default: () => [],
    },
    column: {
      type: Array,
      default: () => [],
    },
    maxPages: {
      type: Number || String,
      default: 5,
    },
    pageSize: {
      type: Number || String,
    },
    pagenation_page: {
      type: Number || String,
      default: 1,
    },
  },
  setup(props, { emit }) {
    // state
    const selectedRow = ref([]);
    // computed
    const mainColumn = computed(() => {
      return props.column;
    });

    const modelRecordes = computed({
      get() {
        return props.pageSize;
      },
      set(val) {
        return emit("changePageSize", val);
      },
    });
    // methods
    // const nextPage = ()=>{
    //   emit('nextPage')
    // };
    // const prevPage = ()=>{
    //   emit('privPage')
    // };
    const sellectAll = () => {
      sellected_row.value !== props.rows
        ? (sellected_row.value = props.rows)
        : (sellected_row.value = []);
      // emit("passSellectedRow", selectedRow.value);
    };
    const chooseActive = async () => {
      // emit("passSellectedRow", selectedRow.value);
    };

    return {
      options: [5, 10, 15, 20, 30, 50],
      selectedRow,
      // prevPage,
      // nextPage,
      modelRecordes,
      chooseActive,
      sellected_row,
      mainColumn,
      sellectAll,
    };
  },
};
</script>
<style lang="scss">
// .handel-width {
//   width: min-content;
// }
.maragin_name {
  margin-left: 30px;
}
.handel_height_row {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
</style>
