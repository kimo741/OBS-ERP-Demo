import { Notify, Loading, Dialog } from "quasar";
import { ref } from "vue";
// const q = useQuasar()
export const deleteDialog = (title, deleteApi, param, refechApi) => {
  Dialog.create({
    title: `Confirm to delete`,
    message: `Would you like to delete from ${title} ?`,
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      Loading.show();
      deleteApi([param])
        .then((res) => {
          Loading.hide();
          refechApi();
          Notify.create({
            message: `Success delete from ${title}`,
            textColor: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((err) => {
          Loading.hide();
          console.log(err);
          Notify.create({
            message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
            color: "red",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        });
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
  // return reafech
};
