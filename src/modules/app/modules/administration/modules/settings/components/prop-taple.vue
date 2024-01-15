<template>
  <div class="q-pa-md">
    <!-- {{ req_sellected_row }} -->
    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">
            <q-checkbox
              :true-value="rows"
              :false-value="sellected_row"
              :model-value="sellected_row"
              @click="sellectAll"
            />
            <!-- v-model="selectedRow" -->
          </th>
          <th class="text-left">#</th>
          <th v-for="(col, i) in mainColumn" :key="i" class="q-ml-lg text-left">
            {{ col }}
          </th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in rows" :key="i">
          <!-- v-model="selectedRow" -->
          <td class="text-left q-py-sm handel_height_row" style="width: 20px">
            <q-checkbox
              v-model="sellected_row"
              :val="row"
              @update:model-value="chooseActive(row)"
            />
          </td>
          <td class="text-left q-pr-xl handel_height_row">
            {{ i + 1 }}
          </td>
          <td v-if="row.label" class="text-left handel_height_row">
            {{ row.label }}
          </td>
          <td v-if="row.name" class="text-left handel_height_row">
            {{ row.name }}
          </td>
          <td
            v-if="!!row.urlFile || row.urlFile === ''"
            class="text-left handel_height_row"
          >
            <a
              class="text-black text-bold"
              style="text-decoration: none"
              :href="row.urlFile"
              target="_blank"
              rel="noreferrer noopener"
            >
              {{ !!row.urlFile ? "File link" : "" }}
            </a>
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
            style="padding: 0; direction: ltr !important"
            class="text-right flex justify-center items-center pagenation"
          >
            <span class="">{{ $t("global.recordes_Page") }}</span>
            <div class="q-mx-lg">
              <q-select
                style="max-width: 80px"
                dense
                flat
                behavior
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
                :disable="pagenation_page == maxPages"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>
<script>
import { computed, ref, watch } from "vue";
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
    req_sellected_row: {
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
    // const selectedRow = ref([]);
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
    // wach
    // watch(props.req_sellected_row, (val) => {
    //   console.log(val);
    //   if (val.length < 1) {
    //     selectedRow.value = [];
    //   }
    // });
    // methods
    const nextPage = () => {
      emit("nextPage");
    };
    const prevPage = () => {
      emit("privPage");
    };
    const sellectAll = () => {
      sellected_row.value !== props.rows
        ? (sellected_row.value = props.rows)
        : (sellected_row.value = []);
      // emit("passSellectedRow", sellected_row.value);
    };
    const chooseActive = () => {
      // emit("passSellectedRow", sellected_row.value);
    };

    return {
      options: [5, 10, 15, 20, 30, 50],
      // selectedRow,
      prevPage,
      nextPage,
      modelRecordes,
      sellected_row,
      chooseActive,
      mainColumn,
      sellectAll,
    };
  },
};
</script>
<style>
.maragin_name {
  margin-left: 30px;
}
.handel_height_row {
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
/* .pagenation {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
} */
</style>
