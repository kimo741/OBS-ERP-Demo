<template>
  <div>
    <q-select
      v-if="isRequired"
      v-model="model"
      emit-value
      map-options
      :option-value="valueOpstion"
      :readonly="readonly"
      use-input
      :option-label="labelOpstion"
      :label="title"
      :options="options"
      :autofocus="autofocus"
      :option-disable="optionDisable"
      :multiple="multiple"
      @filter="filterFn"
      @update:model-value="$emit('valueUpdated', model)"
      :rules="[(val) => val || 'Required feild']"
    >
      <template v-slot:no-option>
        <q-item clickable>
          <q-item-section @click="careteNew" class="text-grey">
            <q-item-label class="text-blue-5"
              >Create new '{{ serchInput }}'</q-item-label
            >
          </q-item-section>
        </q-item>
      </template>
    </q-select>
    <!-- else -->
    <q-select
      v-else
      v-model="model"
      emit-value
      :autofocus="autofocus"
      map-options
      :multiple="multiple"
      :readonly="readonly"
      :option-value="valueOpstion"
      use-input
      :option-label="labelOpstion"
      :label="title"
      :options="options"
      :option-disable="optionDisable"
      @filter="filterFn"
      @update:model-value="$emit('valueUpdated', model)"
    >
      <template v-slot:no-option>
        <q-item clickable>
          <q-item-section @click="careteNew" class="text-grey">
            <q-item-label class="text-blue-5"
              >Create new '{{ serchInput }}'</q-item-label
            >
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>


<script>
import { computed, ref } from "vue";

// const stringOptions = [
//   'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
// ];

export default {
  props: {
    modelOpstions: {
      type: Array,
      default: () => [],
    },
    labelOpstion: {
      type: String,
      default: "label",
    },
    valueOpstion: {
      type: String,
      default: "id",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Number || String,
    },
    title: {
      type: String,
    },
    optionDisable: {
      type: Function,
      default: () => {},
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // const options = computed(() =>{
    //   return props.modelOpstions
    // })
    const options = ref(props.modelOpstions);
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(val) {
        emit("update:modelValue", val);
        console.log(val);
      },
    });
    const careteNew = () => {
      emit("emitCreateNew", serchInput.value);
    };
    const serchInput = ref("");
    // const model = ref(null);
    // const updateSelect = (val) => {
    //   console.log(val);
    // };
    return {
      serchInput,
      // updateSelect,
      careteNew,
      model,
      options,

      filterFn(val, update) {
        if (val === "") {
          update(() => {
            // c;
            options.value = props.modelOpstions;

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          });
          return;
        }

        update(() => {
          serchInput.value = val;
          const needle = val.toLowerCase();
          options.value = props.modelOpstions.filter(
            (v) => v[`${props.labelOpstion}`].toLowerCase().indexOf(needle) > -1
          );
        });
      },
    };
  },
};
</script>
<style>
</style>
