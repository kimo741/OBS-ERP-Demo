<template>
  <div class="full-width row items center main-taple">
    <q-card
      class="my-card card-chart"
      flat
      bordered
      v-for="(row, index) in data"
      :key="index"
      :class="sellected_group.includes(row) ? 'active-card' : ''"
    >
      <q-item class="row justify- items-center">
        <q-item-section
          avatar
          class="col-6"
          @click="passSelected(row)"
          v-for="(col, i) in colums"
          :key="i"
        >
          <template v-if="col.image">
            <q-avatar>
              <img :src="row[col.name]" />
            </q-avatar>
          </template>
        </q-item-section>
        <q-item-section class="col-3">
          <template v-if="colums.badge">
            <div @click="passSelected(row)" v-for="(col, i) in colums" :key="i">
              <div class="">
                <q-badge color="green " v-show="row[col.name]"> </q-badge>
              </div>
              <div>
                <q-badge
                  color="red"
                  class="text-center"
                  v-show="!row[col.name]"
                />
              </div>
            </div>
          </template>
        </q-item-section>
        <q-item-section class="col-2">
          <!-- <q-icon
            v-if="data.isActive"
            size="sm"
            name="eva-star-outline"
            color="warning"
          />
          <q-icon v-else size="sm" name="eva-star" color="warning" /> -->
        </q-item-section>
        <q-item-section class="col-1 row" v-if="colums.action">
          <q-btn
            text-color="grey-6"
            class="col"
            color="grey-7"
            round
            flat
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
                <q-item
                  @click="$emit('duplicateSinglePropCard', row)"
                  clickable
                >
                  <q-item-section>{{ $t("global.duplicate") }}</q-item-section>
                </q-item>
                <q-item @click="$emit('singleGroupToEditCard', row)" clickable>
                  <q-item-section>{{ $t("global.edit") }}</q-item-section>
                </q-item>
                <q-item @click="$emit('singleGroupToDelCard', row)" clickable>
                  <q-item-section>{{ $t("global.delete") }}</q-item-section>
                </q-item>
                <q-item @click="$emit('copySinglePropertyCard', row)" clickable>
                  <q-item-section>{{ $t("global.copy") }}</q-item-section>
                </q-item>
                <q-item @click="$emit('cutSinglePropertyCard', row)" clickable>
                  <q-item-section>{{ $t("global.cut") }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal @click="$emit('passSelectedCard', data)">
        <q-card-section class="col-5 q-pa-sm">
          <q-item-label
            class="q-my-sm text-bold"
            v-for="(col, i) in colums"
            :key="i"
          >
            <template v-if="col.name !== 'action' || col.name !== 'badge'">
              {{ col.name }} :
            </template>
          </q-item-label>
        </q-card-section>
        <q-separator vertical />
        <template v-if="!isByGroupTaple">
          <!-- v-if="!col.action || !col.badge" -->
          <q-card-section class="q-pa-sm full-width">
            <q-item-label
              class="full-width"
              v-for="(col, i) in colums"
              :key="i"
            >
              {{ row[col.name] ? row[col.name] : "N/A" }}
            </q-item-label>
          </q-card-section>
        </template>
      </q-card-section>
      <q-card-action>
        <q-btn
          class="full-width"
          icon="eva-book-open-outline"
          :label="$t('app.administration.charts.chartsProperty.review')"
          outline
          rounded
          color="grey"
          @click="$emit('passToReview', data)"
        />
      </q-card-action>
    </q-card>
  </div>
</template>

<script>
import { sellected_group } from "./use.js";
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    colums: {
      type: Array,
      default: () => [],
    },
    isByGroupTaple: {
      type: Boolean,
      default: false,
    },
    select: {
      type: Boolean,
      default: false,
    },
    moreBtn: {
      type: Boolean,
      default: false,
    },
    // layout: {
    //   type: String,
    //   default: "tree",
    // },
    // isByGroupTaple: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  setup(prop, { emit }) {
    const passSelected = () => {
      if (prop.select) {
        if (sellected_group.value.includes(row)) {
          var index = sellected_group.value.findIndex((el, i) => {
            return el.id == row.id;
          });
          sellected_group.value.splice(index, 1);
          // emit("passSellectedGroup", sellected_group.value);
        } else {
          sellected_group.value.push(row);
          // emit("passSellectedGroup", selectedGroup.value);
        }
      }
    };
    return {
      passSelected,
      sellected_group,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-chart {
  @media (max-width: $breakpoint-xs-max) {
    max-width: 90%;
  }
  // width: 10%;
  max-width: 30%;
  flex: 1 1 30%;
  margin: 1.3%;
}
</style>
