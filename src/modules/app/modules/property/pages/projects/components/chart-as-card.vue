<template>
  <q-card
    class="my-card card-chart"
    flat
    bordered
    @dblclick="handeldbClick"
    @click="$emit('passSelectedCard', data)"
  >
    <q-card-section class="row justify-around" style="height: 150px">
      <div class="col-12">
        <img
          :src="data.image ? data.image : 'images/placeholder-property.jpeg'"
          alt=""
          class="full-width full-height"
          style="max-width: 100%; max-height: 150px"
        />
      </div>
    </q-card-section>

    <q-card-section
      class="row"
      style="
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        color: #000000;
      "
    >
      <div class="col-8">{{ data.name }}</div>
    </q-card-section>
    <q-card-section
      class="row"
      style="
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        vcolor: rgba(0, 0, 0, 0.5);
      "
    >
      <div class="col-8">City:{{ data.city }}</div>
      <div class="col-8">State/Ragion:{{ data.regionName }}</div>
      <div class="col-8">Country:{{ data.countryName }}</div>
    </q-card-section>
    <!-- <q-item class="row justify- items-center">
      <q-item-section
        avatar
        class="col-6"

      >
        <q-avatar>
          <img src="images/placeholder-property.jpeg" />
        </q-avatar>
      </q-item-section>
      <q-item-section class="col-3">
        <div class="">
          <q-badge
            color="green "
            :label="$t('app.administration.charts.chartsProperty.active')"
            v-show="data.isActive"
          >
          </q-badge>
        </div>
        <div>
          <q-badge
            color="red"
            class="text-center"
            v-show="!data.isActive"
            :label="$t('app.administration.charts.chartsProperty.not_active')"
          />
        </div>
      </q-item-section>
      <q-item-section class="col-2">
        <q-icon
          v-if="data.isActive"
          size="sm"
          name="eva-star-outline"
          color="warning"
        />
        <q-icon v-else size="sm" name="eva-star" color="warning" />
      </q-item-section>
      <q-item-section class="col-1 row">
        <q-btn
          text-color="grey-6"
          class="col"
          color="grey-7"
          round
          flat
          icon="more_vert"
        >

          <q-menu
            fit
            auto-close
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list style="min-width: 200px">
              <q-item @click="$emit('duplicateSinglePropCard', data)" clickable>
                <q-item-section>{{ $t("global.duplicate") }}</q-item-section>
              </q-item>
              <q-item @click="$emit('singleGroupToEditCard', data)" clickable>
                <q-item-section>{{ $t("global.edit") }}</q-item-section>
              </q-item>
              <q-item @click="$emit('singleGroupToDelCard', data)" clickable>
                <q-item-section>{{ $t("global.delete") }}</q-item-section>
              </q-item>
              <q-item @click="$emit('copySinglePropertyCard', data)" clickable>
                <q-item-section>{{ $t("global.copy") }}</q-item-section>
              </q-item>
              <q-item @click="$emit('cutSinglePropertyCard', data)" clickable>
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
        <q-item-label class="q-my-sm text-bold">No: :</q-item-label>
        <q-item-label class="q-my-sm text-bold">Name :</q-item-label>
        <q-item-label class="q-my-sm text-bold"
          >{{
            $t("app.administration.charts.chartsProperty.type")
          }}
          :</q-item-label
        >
        <q-item-label class="q-my-sm text-bold"
          >{{
            $t("app.administration.charts.chartsProperty.unit_status")
          }}
          :</q-item-label
        >
      </q-card-section>
      <q-separator vertical />
      <q-card-section v-if="!isByGroupTaple" class="col q-pa-sm">
        <q-item-label class="q-my-sm block-wrab">{{
          data.no ? data.no : "N/A"
        }}</q-item-label>
        <q-item-label class="q-my-sm block-wrab">{{
          data.name ? data?.name : "N/A"
        }}</q-item-label>
        <q-item-label class="q-my-sm block-wrab">{{
          data.typeName ? data.typeName : "N/A"
        }}</q-item-label>
        <q-item-label class="q-my-sm block-wrab">
          <div class="col-12">
            <div class="row justify-around">
              <div class="col-3 text-center">({{ data.vacant }})</div>
              <div class="col-3 text-center">({{ data.underMaintenance }})</div>
              <div class="col-3 text-center">({{ data.occupied }})</div>
            </div>
          </div>
          <div class="col-12">
            <div class="row justify-around">
              <div class="col-3 text-center">
                <q-badge rounded color="green" />
              </div>
              <div class="col-3 text-center">
                <q-badge rounded color="warning" />
              </div>
              <div class="col-3 text-center">
                <q-badge rounded color="red" />
              </div>
            </div></div
        ></q-item-label>
      </q-card-section>
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
    </q-card-action> -->
  </q-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    isByGroupTaple: {
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
  setup(props, { emit }) {
    const handeldbClick = (card) => {
      // console.log("click");
      emit("handelDbClickCard", props.data);
    };
    return {
      handeldbClick,
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
  max-width: 20%;
  flex: 1 1 25%;
  justify-content: space-between;
  margin: 1.3%;
}
</style>
