
import { ref } from 'vue';
import { Loading, Notify } from 'quasar';
export const unit_Categoty_opstions = ref([]);
export const usage_form_opstions = ref([]);
export const unit_type_opstions = ref([]);
// const {
//   addUnitCategory
// } = propertySetting([
//   "addUnitCategory"
// ]);

// get unit category
export const getUnitCategory = (api) => {
  api().then((req) => {

    return unit_Categoty_opstions.value = req.value;

  }).catch(err => console.log(err))
}
// get unit UsageForm
export const getUsageForm = (api) => {
  api().then((req) => {
    console.log(req);
    return usage_form_opstions.value = req.value;
  }).catch(err => console.log(err))
}
// get unit type
export const getUnitTypes = (api) => {
  api().then((req) => {
    console.log(req);
    return unit_type_opstions.value = req.data.value;
  }).catch(err => console.log(err))
}

/////////////////////////////////////////
export const getLabelById = (id, arr) => {
  let index = arr.findIndex(el => el.id == id)
  if (index !== -1) {
    return arr[index].label
  }
}
// export const submitCreateNewCategory = (api, value) => {
//   Loading.show();
//   api({ name: value })
//     .then((res) => {
//       floorList();
//       Loading.hide();
//       Notify.create({
//         message: "A category has been created",
//         color: "green",
//         classes: "notify-size",
//         position: "bottom",
//         timeout: 8000,
//       });
//     })
//     .catch((_error) => {
//       Loading.hide();
//       Notify.create({
//         message: _error.data.errorMessage
//           ? _error.data.errorMessage
//           : _error.data,
//         color: "red",
//         classes: "notify-size",
//         position: "bottom",
//         timeout: 8000,
//       });
//     });
// };
